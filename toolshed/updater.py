import requests
import re
from datetime import datetime
from .extensions import db
from .importer import get_total_downloads, parse_github_url
from .models import ProjectLog


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')


# def difference_check(project_info, api_info):
#     if project_info != api_info:
#         project_info = api_info
#         db.session.commit()



def update_projects(projects):
    for project in projects:
        log_project(project)
        update_pypi(project)
        if project.github_url:
            update_github(project)
    return print("Update Complete.")


def update_pypi(project):
    pypi_info = requests.get(project.pypi_url + "/json").json()
    project.current_version =  pypi_info['info']['version']
    project.website = pypi_info['info']['home_page']
    project.current_version = pypi_info['info']['version'],
    project.summary = pypi_info['info']['summary']
    project.downloads_count = get_total_downloads(pypi_info)
    db.session.commit()


def update_github(project):
    github_api, project_stub = parse_github_url(project.github_url)
    github_info = requests.get(github_api).json()
    project.forks_count = github_info['forks_count']
    project.starred_count = github_info['stargazers_count']
    project.watchers_count = github_info['watchers_count']
    project.last_commit = datetime.strptime(github_info['updated_at'], "%Y-%m-%dT%H:%M:%SZ")
    project.open_issues_count = github_info['open_issues_count']
    db.session.commit()


def log_project(project):
    proj_log = {}
    print(project.forks_count)
    proj_log["forks_count"] = project.forks_count
    print(project.starred_count)
    proj_log["starred_count"] = project.starred_count
    print(project.watchers_count)
    proj_log["watchers_count"] = project.watchers_count
    print(project.current_version)
    proj_log["current_version"] = project.current_version
    print(project.last_commit)
    proj_log["last_commit"] = project.last_commit
    print(project.open_issues_count)
    proj_log["open_issues_count"] = project.open_issues_count
    print(project.downloads_count)
    proj_log["downloads_count"] = project.downloads_count
    print(project.contributors_count)
    proj_log["contributors_count"] = project.contributors_count
    proj_log["log_date"] = datetime.today()
    project_log = ProjectLog(**proj_log)
    project.logs.append(project_log)
    db.session.add(project_log)
    db.session.commit()
