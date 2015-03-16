from flask import Flask, render_template

from . import models
from .extensions import db, migrate, config, oauth, assets, admin
from .views.toolshed import toolshed
from .views.toolshed_admin import toolshed_admin, AdminView
from flask_admin.contrib import sqla


SQLALCHEMY_DATABASE_URI = "postgres://localhost/toolshed"
DEBUG = True
SECRET_KEY = 'development-key'


def create_app():
    app = Flask('toolshed')
    app.config.from_object(__name__)
    app.register_blueprint(toolshed)
    app.register_blueprint(toolshed_admin)

    config.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    oauth.init_app(app)
    assets.init_app(app)
    admin.add_view(sqla.ModelView(models.User, db.session))
    admin.add_view(sqla.ModelView(models.Project, db.session))
    admin.add_view(sqla.ModelView(models.Category, db.session))
    admin.add_view(sqla.ModelView(models.Comment, db.session))
    admin.add_view(sqla.ModelView(models.Group, db.session))

    admin.init_app(app)

    return app
