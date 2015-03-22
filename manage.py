#!/usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean
from toolshed.models import Admin, Project
from toolshed.updater import update_projects
from toolshed import create_app, db

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

    return dict(app=app, db=db)


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
    admin = Admin(admin_name="joel",
                  password="password")
    db.session.add(admin)
    db.session.commit()


@manager.command
def update():
    projects = Project.query.all()
    update_projects(projects)
    return "Projects Updated."


@manager.command
def seed_db():
 with open('better_projects.csv') as csvfile:
     reader = csv.DictReader(csvfile)
     for row in reader:
         list = []
         for key, value in row.items():
             list.append(value)
         if len(list) == 2:
             print(list[0], list[1])
             project = create_project(pypi_url=str(list[0]), github_url=str(list[1]))
             db.session.add(project)
         elif len(list) == 1:
             project = create_project(pypi_url=list[0])
             db.session.add(project)
     db.session.commit()


if __name__ == '__main__':
    manager.run()
