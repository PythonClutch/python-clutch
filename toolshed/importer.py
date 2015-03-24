import re
import requests
from datetime import datetime
import os

from .models import Project


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')

bitbucket_search_regex = re.compile('bitbucket.org/(.*)')
bitbucket_match_regex = re.compile('((http(s)*://)*bitbucket.org/)')


gitkey = os.environ['GITKEY']
auth=(gitkey, 'x-oauth-basic')


def parse_github_url(github_url):
    github_api_base = "https://api.github.com/repos/"
    github_stub = github_search_regex.search(github_url).groups()[0]
    return (github_api_base + github_stub), github_stub


def parse_bitbucket_url(bitbucket_url):
    bitbucket_api_base = "https://api.bitbucket.org/1.0/repositories/"
    bitbucket_stub = bitbucket_search_regex.search(bitbucket_url).groups()[0]
    return (bitbucket_api_base + bitbucket_stub), bitbucket_stub


def github_populate(proj_dict, github_url):
    github_api, project_stub = parse_github_url(github_url)
    github_info = requests.get(github_api, auth=auth).json()
    proj_dict['forks_count'] = github_info['forks_count']
    proj_dict['git_url'] = github_url
    proj_dict['project_stub'] = project_stub
    proj_dict['starred_count'] = github_info['stargazers_count']
    proj_dict['watchers_count'] = github_info['watchers_count']
    proj_dict['watchers_url'] = github_url + "/watchers"
    proj_dict['last_commit'] = datetime.strptime(github_info['updated_at'], "%Y-%m-%dT%H:%M:%SZ")
    proj_dict['first_commit'] = datetime.strptime(github_info['created_at'], "%Y-%m-%dT%H:%M:%SZ")
    proj_dict['open_issues_count'] = github_info['open_issues_count']
    contributors = requests.get(github_info['contributors_url'], auth=auth).json()
    proj_dict['contributors_count'] = len(contributors)
    proj_dict['date_added'] = datetime.today()
    proj_dict['contributors_url'] = github_info['contributors_url']
    proj_dict['forks_url'] = github_url + "/network"
    proj_dict['starred_url'] = github_url + "/stargazers"
    proj_dict['open_issues_url'] = github_url + "/issues"
    return proj_dict


def bitbucket_populate(proj_dict, bitbucket_url):
    bitbucket_api, project_stub = parse_bitbucket_url(bitbucket_url)
    bitbucket_info = requests.get(bitbucket_api).json()
    print(bitbucket_api)
    open_issues_api = bitbucket_api + "issues"
    payload = {'status': "open"}
    open_issues_info = requests.get(open_issues_api, params=payload).json()
    print(open_issues_api)
    proj_dict['forks_count'] = bitbucket_info['forks_count']
    proj_dict['git_url'] = bitbucket_url
    proj_dict['project_stub'] = bitbucket_info['slug']
    proj_dict['watchers_count'] = bitbucket_info['followers_count']
    proj_dict['last_commit'] = bitbucket_info['last_updated']
    proj_dict['first_commit'] = bitbucket_info['created_on']
    proj_dict['open_issues_url'] = bitbucket_url + "issues?status=new&status=open"
    proj_dict['open_issues_count'] = open_issues_info['count']
    return proj_dict

def get_total_downloads(pypi_result):
    total_list = [[item['downloads'] for item in pypi_result['releases'][key]] for key in pypi_result['releases']]
    return sum([sum(list) for list in total_list])

def python_three_check(pypi):
    python_three = "Programming Language :: Python :: 3"
    return python_three in pypi['info']['classifiers']


def create_project(pypi_url=None, github_url=None, bitbucket_url=None, docs_url=None):
    proj_dict = {}
    pypi_api = pypi_url + "/json"
    pypi_info = requests.get(pypi_api).json()

    if github_url and github_url != '':
        proj_dict = github_populate(proj_dict, github_url)
    elif bitbucket_url:
        proj_dict = bitbucket_populate(proj_dict, bitbucket_url)
    elif github_match_regex.search(pypi_info["info"]['home_page']):
        github_url = pypi_info["info"]['home_page']
        proj_dict = github_populate(proj_dict, github_url)
    elif bitbucket_match_regex.search(pypi_info['info']['home_page']):
        bitbucket_url = pypi_info['info']['home_page']
        proj_dict = bitbucket_populate(proj_dict, bitbucket_url)

    proj_dict['name'] = pypi_info['info']['name']
    proj_dict['current_version'] = pypi_info['info']['version']
    proj_dict['website'] = pypi_info['info']['home_page']
    proj_dict['summary'] = pypi_info['info']['summary']
    proj_dict['downloads_count'] = get_total_downloads(pypi_info)
    proj_dict['python_three_compatible'] = python_three_check(pypi_info)
    proj_dict['status'] = False



    if docs_url:
        proj_dict['docs_url'] = docs_url

    else:
        if pypi_info['info']['docs_url']:
            proj_dict['docs_url'] = pypi_info['info']['docs_url']

    proj_dict['pypi_url'] = pypi_url

    project = Project(**proj_dict)
    return project
