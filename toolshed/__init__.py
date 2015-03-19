from flask import Flask, render_template

from . import models
from .extensions import db, migrate, config, oauth, assets, login_manager, bcrypt
from .views.toolshed import toolshed
from .views.toolshed_admin import toolshed_admin, MyAdminIndexView, MyView
from .views.api import api
from flask_admin import Admin


SQLALCHEMY_DATABASE_URI = "postgres://localhost/toolshed"
DEBUG = True
SECRET_KEY = 'development-key'


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

    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'toolshed_admin.login'
    admin.add_view(MyView(models.User, db.session))
    admin.add_view(MyView(models.Project, db.session))
    admin.add_view(MyView(models.Category, db.session))
    admin.add_view(MyView(models.Comment, db.session))
    admin.add_view(MyView(models.Group, db.session))
    admin.add_view(MyView(models.Like, db.session))

    return app
