from flask import Flask, render_template
import os
from . import models
from .extensions import db, migrate, config, oauth, assets, login_manager, bcrypt, mail
from .views.toolshed import toolshed
from .views.toolshed_admin import toolshed_admin, MyAdminIndexView, MyView, ProjectView
from .views.api import api
from flask_admin import Admin


DEBUG = False
SECRET_KEY = 'development-key'
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
SQLALCHEMY_DATABASE_URI = "postgres://localhost/toolshed"
# SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DB', silent=True)


def create_app():
    app = Flask('toolshed')
    app.config.from_object(__name__)
    app.register_blueprint(toolshed)
    app.register_blueprint(toolshed_admin)
    app.register_blueprint(api, url_prefix="/api/v1")

    admin = Admin(app, 'Python Clutch Admin', index_view=MyAdminIndexView(), base_template='my_master.html')

    config.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    oauth.init_app(app)
    assets.init_app(app)
    mail.init_app(app)

    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'toolshed_admin.login'
    admin.add_view(MyView(models.User, db.session, category="Account"))
    admin.add_view(MyView(models.AdminAccount, db.session, category="Account"))
    admin.add_view(ProjectView(models.Project, db.session, category="Libraries"))
    admin.add_view(MyView(models.ProjectLog, db.session, category="Libraries"))
    admin.add_view(MyView(models.Category, db.session, category="Libraries"))
    admin.add_view(MyView(models.Comment, db.session, category="Libraries"))
    admin.add_view(MyView(models.Group, db.session, category="Libraries"))
    admin.add_view(MyView(models.Like, db.session, category="Libraries"))


    return app
