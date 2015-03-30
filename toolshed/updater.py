import requests
import re
import math
import os
from datetime import datetime
from .extensions import db
from .importer import release_parse, parse_github_url, parse_bitbucket_url
from .models import ProjectLog, Project


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')

bitbucket_search_regex = re.compile('bitbucket.org/(.*)')
bitbucket_match_regex = re.compile('((http(s)*://)*bitbucket.org/)')


gitkey = os.environ['GITKEY']
auth=(gitkey, 'x-oauth-basic')

try:
    github_lambda = os.environ['GITHUB_LAMBDA']
    pypi_lambda = os.environ['PYPI_LAMBDA']
    score_multiplier = os.environ['SCORE_SCALE']
    use_log = os.environ['USE_LOG']
    source_weight = float(os.environ['SOURCE_WEIGHT'])
except:
    github_lambda = 0.005
    pypi_lambda = 0.005
    score_multiplier = 1
    use_log = True
    source_weight = 0.5


def update_single_project(project):
    update_pypi(project)
    if project.github_url:
        update_github(project)
    elif project.bitbucket_url:
        update_bitbucket(project)
    return print("Update Complete.")



def update_projects(projects):
    for project in projects:
        log_project(project)
        update_pypi(project)
        if project.github_url:
            update_github(project)
        elif project.bitbucket_url:
            update_bitbucket(project)
    # update_projects_score(projects)
    return print("Update Complete.")


def update_pypi(project):
    pypi_info = requests.get(project.pypi_url + "/json").json()
    project.current_version =  pypi_info['info']['version']
    project.website = pypi_info['info']['home_page']
    version_release_string = pypi_info['releases'][project.current_version][0]['upload_time']
    project.current_version_release = datetime.strptime(version_release_string, "%Y-%m-%dT%H:%M:%S")
    project.current_version = pypi_info['info']['version']
    project.summary = pypi_info['info']['summary']
    project.downloads_count, project.release_count = release_parse(pypi_info)
    project.pypi_stub = parse_pypi_url(project.pypi_url)
    db.session.commit()


def update_github(project):
    github_api, project_stub = parse_github_url(project.git_url)
    github_info = requests.get(github_api, auth=auth).json()
    project.forks_count = github_info['forks_count']
    project.starred_count = github_info['stargazers_count']
    project.watchers_count = github_info['watchers_count']
    project.last_commit = datetime.strptime(github_info['updated_at'], "%Y-%m-%dT%H:%M:%SZ")
    project.open_issues_count = github_info['open_issues_count']
    db.session.commit()


def update_bitbucket(project):
    bitbucket_api, project_stub = parse_bitbucket_url(project.git_url)
    bitbucket_info = requests.get(bitbucket_api).json()
    open_issues_api = bitbucket_api + "issues"
    payload = {'status': "open"}
    project.forks_count = bitbucket_info['forks_count']
    project.watchers_count = bitbucket_info['followers_count']
    project.last_commit = bitbucket_info['last_updated']
    open_issues_info = requests.get(open_issues_api, params=payload).json()
    if not open_issues_info['error']:
        project.open_issues_count = open_issues_info['count']
    db.session.commit()


def log_project(project):
    proj_log = {}
    proj_log["forks_count"] = project.forks_count
    proj_log["starred_count"] = project.starred_count
    proj_log["watchers_count"] = project.watchers_count
    proj_log["current_version"] = project.current_version
    proj_log["last_commit"] = project.last_commit
    proj_log["open_issues_count"] = project.open_issues_count
    proj_log["downloads_count"] = project.downloads_count
    proj_log["release_count"] = project.release_count
    proj_log["contributors_count"] = project.contributors_count
    proj_log["previous_score"] = project.score
    proj_log["log_date"] = datetime.utcnow()
    proj_log["current_version_release"] = project.current_version_release
    proj_log["likes_count"] = project.number_of_likes
    project_log = ProjectLog(**proj_log)
    project.logs.append(project_log)
    db.session.add(project_log)
    db.session.commit()


def update_projects_score(projects):

    def raw_github_score(project):
        num_forks = project.forks_count
        num_watch = project.watchers_count
        time_delta = datetime.now() - project.last_commit
        days_since_last_commit = time_delta.days
        github_score = (num_forks + num_watch) * math.exp(-1 * days_since_last_commit * github_lambda)
        if use_log:
            if github_score < 0:
                github_score = 0
            else:
                github_score = math.log(github_score)
        return github_score

    def raw_pypi_score(project):
        num_download = project.downloads_count
        time_delta = datetime.now() - project.current_version_release
        days_since_last_release = time_delta.days
        pypi_score = num_download * math.exp(-1 * days_since_last_release * pypi_lambda)
        if use_log:
            if pypi_score < 0:
                pypi_score = 0
            else:
                pypi_score = math.log(pypi_score)
        return pypi_score

    def get_best_pypi(projects):
        downloads = [raw_pypi_score(project) for project in projects]
        return max(downloads)

    def get_best_github(projects):
        git_projects = [project for project in projects
                        if project.git_url]
        git_score = [raw_github_score(project)
                     for project in git_projects]
        return max(git_score)

    def set_scores(projects):
        best_pypi = get_best_pypi(projects)
        best_github = get_best_github(projects)
        for project in projects:
            score = raw_pypi_score(project) / best_pypi
            if project.git_url:
                git_score = raw_github_score(project) / best_github
            else:
                git_score = 0
            score = (score * (1-source_weight)) + (git_score * source_weight)
            project.score = score * score_multiplier
        db.session.commit()
    set_scores(projects)



