from flask import Blueprint, render_template, redirect, url_for, flash, session, request
from toolshed.extensions import oauth
from functools import wraps
from ..models import User
from ..extensions import db

toolshed = Blueprint("toolshed", __name__, static_folder="../static")


github = oauth.remote_app(
    'github',
    base_url='https://api.github.com',
    request_token_url=None,
    access_token_method='POST',
    authorize_url='https://github.com/login/oauth/authorize',
    access_token_url='https://github.com/login/oauth/access_token',
    app_key='GITHUB',
    request_token_params={'scope': 'user:email,repo,user:follow'}
)

@toolshed.route("/")
def index():
    return toolshed.send_static_file("index.html")

@github.tokengetter
def get_github_token(token=None):
    return session.get('github_token')


def current_user():
    if 'github_token' in session:
        me = github.get('/user')
        return me.data['name']
    else:
        return None


def require_login(view):
    @wraps(view)
    def decorated_view(*args, **kwargs):
        if 'github_token' in session:
            return view(*args, **kwargs)
        else:
            return redirect(url_for("toolshed.login"))

    return decorated_view


@toolshed.route("/login")
def login():
    return render_template("login.html")

@toolshed.route("/logout")
def logout():
    session.pop('github_token', None)
    return redirect(url_for("toolshed.index"))


@toolshed.route("/github/login")
def github_login():
    session.pop('github_token', None)
    return github.authorize(callback=url_for('.github_authorized',
                                             _external=True,
                                             next=request.args.get('next') or url_for("toolshed.index")))


@toolshed.route('/login/github/authorized', methods=["GET", "POST"])
def github_authorized():
    next_url = request.args.get('next') or url_for('toolshed.index')
    resp = github.authorized_response()
    if resp is None:
        flash('You denied the request to sign in.')
        return redirect(next_url)

    session['github_token'] = (resp['access_token'],)
    me = github.get('/user')
    session['github_name'] = me.data['name']

    if not User.query.filter_by(github_name=me.data['name']).first():
        user = User(github_name=me.data['name'],
                    email=me.data['email'],
                    github_url=me.data['html_url'],
                    avatar_url=me.data['avatar_url'],
                    public_repos=me.data['public_repos'])
        db.session.add(user)
        db.session.commit()

    flash('You were signed in as %s' % repr(me.data['name']))
    return redirect(next_url)
