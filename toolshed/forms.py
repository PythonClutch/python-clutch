from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired


class AdminLogin(Form):
    login_name = StringField(255, validators=[DataRequired()])
    password = PasswordField(255, validators=[DataRequired()])
