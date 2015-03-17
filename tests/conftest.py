import pytest


from toolshed import create_app
from toolshed.extensions import db as _db
from toolshed.models import User



TEST_DATABASE_URI = "postgres://localhost/testdb"
TESTING = True
DEBUG = False
DEBUG_TB_ENABLED = False
DEBUG_TB_INTERCEPT_REDIRECTS = False
SQLALCHEMY_DATABASE_URI = TEST_DATABASE_URI
WTF_CSRF_ENABLED = False



@pytest.fixture
def app(request):
    app = create_app()
    app.config.from_object(__name__)

    return app


@pytest.fixture
def db(app, request):
    _db.app = app
    _db.drop_all()
    _db.create_all()
    return _db




@pytest.fixture
def user(db):
    user = User(github_name="cndreisbach",
                github_url="https://github.com/cndreisbach",
                email="clinton@dreisbach.us")
    db.session.add(user)
    db.session.commit()
    return user