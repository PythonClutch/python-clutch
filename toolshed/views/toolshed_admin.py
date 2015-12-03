from flask import Blueprint, render_template, redirect, url_for, request
from flask_admin import BaseView, expose, AdminIndexView, helpers
from flask_admin.contrib.sqla import ModelView, filters
from .. import models
from ..forms import AdminLogin
from flask.ext.login import login_user, logout_user, login_required, current_user
from flask_admin.actions import action
from flask_admin.babel import lazy_gettext, ngettext
from flask_admin.contrib.sqla.tools import get_query_for_ids
from flask import flash
from ..updater import update_single_project
from ..models import Project

toolshed_admin = Blueprint("toolshed_admin", __name__)


class MyView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated()

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login', next=request.url))


class GroupView(MyView):

    column_searchable_list = ('name')



class ProjectView(ModelView):

    column_searchable_list = ('name', 'summary')

    column_list = ("status", "name", "summary", "pypi_url", "git_url", "score",
                   "group", "category", "date_added")


    def is_accessible(self):
        return current_user.is_authenticated()

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login', next=request.url))

    @action('confirm', lazy_gettext('Confirm'))
    def action_confirm(self, ids):
        count = 0

        query = get_query_for_ids(self.get_query(), self.model, ids)

        def confirm(project):
            project.status = "True"
            self.session.commit()
            return True

        for project in query.all():
            if confirm(project):
                count += 1
        self.session.commit()

        flash(ngettext('Record was successfully confirmed.',
                       '%(count)s records were successfully confirmed.', count, count=count))

    @action('update', lazy_gettext('Update'))
    def action_update(self, ids):
        count = 0

        query = get_query_for_ids(self.get_query(), self.model, ids)

        def update(project):
            update_single_project(project)
            self.session.commit()
            return True

        for project in query.all():
            if update_single_project(project):
                count += 1
        self.session.commit()

        flash(ngettext('Record was successfully updated.',
                       '%(count)s records were successfully updated.', count, count=count))




class ProjectsView(MyView):
    column_list = ("status", "name", "summary", "pypi_url", "git_url", "category")


class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        if not current_user.is_authenticated():
            return redirect(url_for(".admin_login"))
        return super(MyAdminIndexView, self).index()



    @expose("/login", methods=["GET", "POST"])
    def admin_login(self):
        form = AdminLogin()
        if form.validate_on_submit():
            admin = models.AdminAccount.query.filter_by(admin_name=form.login_name.data).first()
            if admin and admin.check_password(form.password.data):
                login_user(admin)
                return redirect(url_for(".index"))
        return render_template("admin_login.html", form=form)


    @expose("/logout")
    def logout_view(self):
        logout_user()
        return redirect(url_for(".admin_login"))
