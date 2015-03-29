import re
import requests
from datetime import datetime
import os

from .models import Project


github_search_regex = re.compile('github.com/(.*)')
github_match_regex = re.compile('((http(s)*://)*github.com/)')

bitbucket_search_regex = re.compile('bitbucket.org/(.*)')
bitbucket_match_regex = re.compile('((http(s)*://)*bitbucket.org/)')

pypi_search_regex = re.compile('((http(s)*://)*pypi.python.org/pypi/(.*))')


gitkey = os.environ['GITKEY']
auth=(gitkey, 'x-oauth-basic')


def parse_github_url(github_url):
    github_api_base = "https://api.github.com/repos/"
    github_stub = github_search_regex.search(github_url).groups()[0]
    if github_stub[-1] == "/":
        github_stub = github_stub[:-1:]
    return (github_api_base + github_stub), github_stub


def parse_bitbucket_url(bitbucket_url):
    bitbucket_api_base = "https://api.bitbucket.org/1.0/repositories/"
    bitbucket_stub = bitbucket_search_regex.search(bitbucket_url).groups()[0]
    if bitbucket_stub[-1] == "/":
        bitbucket_stub = bitbucket_stub[:-1:]
    return (bitbucket_api_base + bitbucket_stub), bitbucket_stub


def parse_pypi_url(pypi_url):
    pypi_stub = pypi_search_regex.search(pypi_url).groups()[-1]
    if pypi_stub[-1] == "/":
        pypi_stub = pypi_stub[:-1:]
    return pypi_stub



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
    proj_dict['contributors_url'] = github_info['contributors_url']
    proj_dict['forks_url'] = github_url + "/network"
    proj_dict['starred_url'] = github_url + "/stargazers"
    proj_dict['open_issues_url'] = github_url + "/issues"
    proj_dict['github_url'] = True
    proj_dict['bitbucket_url'] = False
    return proj_dict


def bitbucket_populate(proj_dict, bitbucket_url):
    bitbucket_api, project_stub = parse_bitbucket_url(bitbucket_url)
    bitbucket_info = requests.get(bitbucket_api).json()
    open_issues_api = bitbucket_api + "issues"
    payload = {'status': "open"}
    proj_dict['forks_count'] = bitbucket_info['forks_count']
    proj_dict['git_url'] = bitbucket_url
    proj_dict['project_stub'] = project_stub
    proj_dict['watchers_count'] = bitbucket_info['followers_count']
    proj_dict['last_commit'] = bitbucket_info['last_updated']
    proj_dict['first_commit'] = bitbucket_info['created_on']
    proj_dict['open_issues_url'] = bitbucket_url + "issues?status=new&status=open"
    open_issues_info = requests.get(open_issues_api, params=payload).json()
    if not open_issues_info['error']:
        proj_dict['open_issues_count'] = open_issues_info['count']
    proj_dict['github_url'] = False
    proj_dict['bitbucket_url'] = True
    return proj_dict

def release_parse(pypi_result):
    total_list = [[item['downloads'] for item in pypi_result['releases'][key]] for key in pypi_result['releases']]
    return sum([sum(list) for list in total_list]), len(total_list)

def python_three_check(pypi):
    py3_match_regex = re.compile('Programming Language :: Python :: 3(.*)')
    data = pypi['info']['classifiers']
    checker = ["passed" for snippet in data if py3_match_regex.search(snippet) is not None]
    return "passed" in checker

def parse_source(source_url, proj_dict):
    if github_match_regex.search(source_url):
        github_url = source_url
        proj_dict = github_populate(proj_dict, github_url)
        return proj_dict
    elif bitbucket_match_regex.search(source_url):
        bitbucket_url = source_url
        proj_dict = bitbucket_populate(proj_dict, bitbucket_url)
        return proj_dict


def create_project(pypi_url=None, git_url=None, docs_url=None, mailing_list_url=None, github_url=None,
                   bitbucket_url=None):
    if not pypi_url:
        return None
    pypi_api = pypi_url + "/json"
    pypi_info = requests.get(pypi_api).json()
    project = Project.query.filter_by(name=pypi_info['info']['name']).first()
    if project:
        return None
    proj_dict = {}
    if git_url:
        source_url = git_url
    elif github_url:
        source_url = github_url
    elif bitbucket_url:
        source_url = bitbucket_url
    elif pypi_info["info"]['home_page']:
        if github_match_regex.search(pypi_info["info"]['home_page']):
            source_url = pypi_info["info"]['home_page']
        elif bitbucket_match_regex.search(pypi_info['info']['home_page']):
            source_url = pypi_info['info']['home_page']


    if source_url:
        proj_dict = parse_source(source_url, proj_dict)
    else:
        proj_dict['github_url'] = False
        proj_dict['bitbucket_url'] = False


    proj_dict['name'] = pypi_info['info']['name']
    print(proj_dict['name'])
    proj_dict['current_version'] = pypi_info['info']['version']
    proj_dict['website'] = pypi_info['info']['home_page']
    proj_dict['summary'] = pypi_info['info']['summary']
    proj_dict['downloads_count'], proj_dict['release_count'] = release_parse(pypi_info)
    proj_dict['python_three_compatible'] = python_three_check(pypi_info)
    version_release_string = pypi_info['releases'][proj_dict['current_version']][0]['upload_time']
    proj_dict['current_version_release'] = datetime.strptime(version_release_string, "%Y-%m-%dT%H:%M:%S")
    proj_dict['status'] = False
    proj_dict['date_added'] = datetime.today()

    if docs_url:
        proj_dict['docs_url'] = docs_url

    else:
        if pypi_info['info']['docs_url']:
            proj_dict['docs_url'] = pypi_info['info']['docs_url']

    proj_dict['pypi_url'] = pypi_url
    proj_dict['mailing_list_url'] = mailing_list_url
    proj_dict['pypi_stub'] = parse_pypi_url(pypi_url)
    proj_dict['score'] = 0
    project = Project(**proj_dict)
    return project
