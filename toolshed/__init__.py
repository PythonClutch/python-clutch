from flask import Flask, render_template

from . import models
from .extensions import db, migrate, config, oauth, assets
from .views import toolshed



SQLALCHEMY_DATABASE_URI = "postgres://localhost/toolshed"
DEBUG = True
SECRET_KEY = 'development-key'


def create_app():
    app = Flask('toolshed')
    app.config.from_object(__name__)
    app.register_blueprint(toolshed)

    config.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    oauth.init_app(app)
    assets.init_app(app)


    return app
