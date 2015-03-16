from wtforms.fields.html5 import URLField
from wtforms.validators import url

from flask_wtf import Form

class SubmissionForm(Form):
    pypi_url = URLField(validators=[url()])