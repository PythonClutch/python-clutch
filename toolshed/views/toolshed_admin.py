from flask import Blueprint, render_template, redirect, url_for, request
from flask_admin import BaseView, expose
from flask_admin.contrib.sqla import ModelView
from .. import models


toolshed_admin = Blueprint("toolshed_admin", __name__)


class AdminView(BaseView):
    @expose('/')
    def index(self):
        return self.render('myindex.html')

    @expose('/test/')
    def test_view(self):
        return self.render('test.html')

class UserAdmin(ModelView):
    inline_models = (models.User,)