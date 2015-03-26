from toolshed.importer import create_project
from toolshed.updater import update_projects_score


def test_oauth_rankings():
    flask_dance = create_project(pypi_url="https://pypi.python.org/pypi/Flask-Dance", github_url="https://github.com/singingwolfboy/flask-dance")
    flask_oauth = create_project(pypi_url="https://pypi.python.org/pypi/Flask-OAuth", github_url="https://github.com/mitsuhiko/flask-oauth")
    flask_oauthlib = create_project(pypi_url="https://pypi.python.org/pypi/Flask-OAuthlib", github_url="https://github.com/lepture/flask-oauthlib")
    project_list = [flask_dance, flask_oauth, flask_oauthlib]
    update_projects_score(project_list)
    assert flask_oauthlib.score > flask_oauth.score and flask_oauth.score > flask_dance.score