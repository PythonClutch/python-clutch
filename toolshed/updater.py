import requests
import re
from datetime import datetime
from .extensions import db
from .importer import get_total_downloads, parse_github_url


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')


def difference_check(project_info, api_info):
    if project_info != api_info:
        project_info = api_info
        return True
    else:
        return False


def update_projects(projects):
    for project in projects:
        update_pypi(project)
        if project.github_url:
            update_github(project)
    db.session.commit()
    return print("Update Complete.")


def update_pypi(project):
    pypi_info = requests.get(project.pypi_url + "/json").json()
    update_fields = [[project.current_version, pypi_info['info']['version']],
                     [project.website, pypi_info['info']['home_page']],
                     [project.current_version, pypi_info['info']['version']],
                     [project.summary, pypi_info['info']['summary']],
                     [project.downloads_count, get_total_downloads(pypi_info)]]
    field_update = []
    for field in update_fields:
        field_update.append(difference_check(list[0], list[1]))
    if True in field_update:
        return True
    return False


def update_github(project):

    github_api, project_stub = parse_github_url(project.github_url)
    github_info = requests.get(github_api).json()
    difference_check(project.forks_count, github_info['forks_count'])
    difference_check(project.starred_count, github_info['stargazers_count'])
    difference_check(project.watchers_count, github_info['watchers_count'])
    difference_check(project.last_commit, datetime.datetime.strptime(github_info['updated_at'], "%Y-%m-%dT%H:%M:%SZ"))
    difference_check(project.open_issues_count, github_info['open_issues_count'])
    contributors = requests.get(project.contributors_url).json()
    project.contributors_count = len(contributors)