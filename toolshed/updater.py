from .extensions import db

def update_projects(projects):
    for project in projects:
        update_pypi(project)
        if project.github_url:













def update_pypi(project):



def update_github(project):
