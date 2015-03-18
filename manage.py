#!/usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from flask.ext.script.commands import ShowUrls, Clean
from toolshed.models import Admin

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




if __name__ == '__main__':
    manager.run()
