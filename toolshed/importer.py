import re
import requests
import datetime

from .models import Project


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')


def parse_github_url(github_url):
    github_api_base = "https://api.github.com/repos/"
    github_stub = github_search_regex.search(github_url).groups()[0]
    return (github_api_base + github_stub), github_stub


def github_populate(proj_dict, github_url):
    github_api, project_stub = parse_github_url(github_url)
    github_info = requests.get(github_api).json()
    proj_dict['last_commit'] = datetime.datetime.strptime(github_info['updated_at'], "%Y-%m-%dT%H:%M:%SZ")
    proj_dict['forks'] = github_info['forks_count']
    proj_dict['github_url'] = github_url
    proj_dict['first_commit'] = datetime.datetime.strptime(github_info['created_at'], "%Y-%m-%dT%H:%M:%SZ")
    proj_dict['open_issues'] = github_info['open_issues_count']
    proj_dict['project_stub'] = project_stub
    return proj_dict


def get_total_downloads(pypi_result):
    total_list = [[item['downloads'] for item in pypi_result['releases'][key]] for key in pypi_result['releases']]
    return sum([sum(list) for list in total_list])


def create_project(pypi_url, github_url=None, docs_url=None):
    proj_dict = {}
    pypi_api = pypi_url + "/json"
    pypi_info = requests.get(pypi_api).json()


    if github_url:
        proj_dict = github_populate(proj_dict, github_url)
    else:
        if github_match_regex.search(pypi_info['website']):
            github_url = pypi_info['website']
            proj_dict = github_populate(proj_dict, github_url)

    proj_dict['name'] = pypi_info['info']['name']
    proj_dict['version'] = pypi_info['info']['version']
    proj_dict['website'] = pypi_info['info']['home_page']
    proj_dict['summary'] = pypi_info['info']['summary']


    proj_dict['downloads'] = get_total_downloads(pypi_info)

    if docs_url:
        proj_dict['docs_url'] = docs_url

    proj_dict['pypi_url'] = pypi_url

    project = Project(**proj_dict)
    return project


