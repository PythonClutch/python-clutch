from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import url, DataRequired
from wtforms.fields import SelectField
from wtforms.fields.html5 import URLField


class AdminLogin(Form):
    login_name = StringField("User", validators=[DataRequired()])
    password = PasswordField("Pass", validators=[DataRequired()])


class SubmissionForm(Form):
    pypi_url = URLField('PyPi URL', validators=[url(), DataRequired()])
    github_url = URLField('GitHub URL', validators=[url()])
    category = SelectField('Category')
    docs_url = URLField('Documentation URL', validators=[url()])
    issues_url = URLField('Issues URL', validators=[url()])

