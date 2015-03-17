from flask import Blueprint, render_template, redirect, url_for, request
from flask_admin import BaseView, expose, AdminIndexView, helpers
from flask_admin.contrib.sqla import ModelView
from .. import models
from ..forms import AdminLogin
from flask.ext.login import login_user, logout_user, login_required, current_user


toolshed_admin = Blueprint("toolshed_admin", __name__)




class MyView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated()

    def _handle_view(self, name, **kwargs):
        if not self.is_accessible():
            return redirect(url_for('login', next=request.url))


# @toolshed_admin.route("/admin/login", methods=["GET", "POST"])
# def admin_login():
#     form = AdminLogin()
#     if form.validate_on_submit():
#         admin = models.Admin.query.filter_by(admin_name=form.login_name.data).first()
#         if admin and admin.check_password(form.password.data):
#             login_user(admin)
#
#     return render_template("admin_login.html", form=form)



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
            admin = models.Admin.query.filter_by(admin_name=form.login_name.data).first()
            if admin and admin.check_password(form.password.data):
                login_user(admin)
                return redirect(url_for(".index"))
        return render_template("admin_login.html", form=form)

    @expose("/logout")
    def logout_view(self):
        logout_user()
        return redirect(url_for(".admin_login"))



