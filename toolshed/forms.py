from wtforms.fields.html5 import URLField
from wtforms.validators import url, DataRequired
from wtforms.fields import SelectField

from flask_wtf import Form


class SubmissionForm(Form):
    pypi_url = URLField('PyPi URL', validators=[url(), DataRequired()])
    github_url = URLField('GitHub URL', validators=[url()])
    category = SelectField('Category')
    docs_url = URLField('Documentation URL', validators=[url()])
    issues_url = URLField('Issues URL', validators=[url()])
