#!/usr/bin/env python
import os
import csv
import random
import datetime
from faker import Factory

fake = Factory.create()

from flask.ext.script import Manager, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean
from toolshed.models import AdminAccount, Project, ProjectLog
from toolshed.updater import update_projects, update_projects_score, log_project
from toolshed import create_app, db, models
from toolshed.importer import create_project

HERE = os.path.abspath(os.path.dirname(__file__))
TEST_PATH = os.path.join(HERE, 'tests')

app = create_app()
manager = Manager(app)
manager.add_command('server', Server())
manager.add_command('db', MigrateCommand)
manager.add_command('show-urls', ShowUrls())
manager.add_command('clean', Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app, db=db, models=models)


@manager.command
def createdb():
    """Creates the database with all model tables.
    Migrations are preferred.
    """
    db.create_all()


@manager.command
def test():
    """Run tests."""
    import pytest
    exit_code = pytest.main([TEST_PATH, '--verbose'])


@manager.command
def create_admin():
    admin = AdminAccount(admin_name="joel",
                         password="password")
    db.session.add(admin)
    db.session.commit()


@manager.command
def update():
    projects = Project.query.all()
    update_projects(projects)
    return "Projects updated."


@manager.command
def update_score():
    projects = Project.query.all()
    for project in projects:
        log_project(project)

    update_projects_score(projects)
    return "Scores updated."


@manager.command
def fake_some_logs():
    projects = Project.query.all()
    for project in projects:
        for _ in range(0, random.randrange(2, 7)):
            log = ProjectLog()
            log.previous_score = random.uniform(0, 1)
            rand_date = random.choice(range(10, 30))
            log.log_date = datetime.date(2015, 3, rand_date)
            log.project_id = project.id
            db.session.add(log)

    db.session.commit()


@manager.command
def seed_db(file):
    """ Takes a csv file as an argument, adds the listed urls to the database.
    """
    with open(file) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            list = []
            for url in row:
                list.append(url)
            project = create_project(pypi_url=str(list[0]), github_url=str(list[1]), bitbucket_url=str(list[2]))
            if project:
                db.session.add(project)
        db.session.commit()


if __name__ == '__main__':
    manager.run()