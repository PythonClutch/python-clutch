import pytest

from toolshed import create_app
from toolshed.extensions import db as _db


TEST_DATABASE_URI = "postgres://localhost/testdb"
TESTING = True
DEBUG = False
DEBUG_TB_ENABLED = False
DEBUG_TB_INTERCEPT_REDIRECTS = False
SQLALCHEMY_DATABASE_URI = TEST_DATABASE_URI
WTF_CSRF_ENABLED = False



@pytest.fixture
def app():
    app = create_app()
    app.config.from_object(__name__)
    return app


@pytest.fixture
def db(app, request):
    def teardown():
        _db.drop_all()

    _db.app = app
    _db.create_all()

    request.addfinalizer(teardown)

    _db.app = app
    return _db