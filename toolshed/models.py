from .extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    github_name = db.Column(db.String(255), nullable=False)
    github_url = db.Column(db.String(400))
    email = db.Column(db.String(255))

    comments = db.relationship("Comment", backref="user", lazy="dynamic", foreign_keys="Comment.user")
    #liked_projects = db.relationship('Project', backref='owner', lazy='dynamic', foreign_keys="Project.id")


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    github_url = db.Column(db.String(400))
    website = db.Column(db.String(400))
    pypi_url = db.Column(db.String(400))
    forks = db.Column(db.Integer)
    starred = db.Column(db.Integer)
    watchers = db.Column(db.Integer)
    age = db.Column(db.DateTime)
    version = db.Column(db.String(20))
    last_commit = db.Column(db.DateTime)
    open_issues = db.Column(db.Integer)
    issues_url = db.Column(db.String(400))
    docs_url = db.Column(db.String(400))

    category = db.Column(db.Integer, db.ForeignKey("category.id"))
    comments = db.relationship("Comment", backref="project", lazy="dynamic", foreign_keys="Comment.project")


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(400))
    created = db.Column(db.DateTime)

    user = db.Column(db.Integer, db.ForeignKey("user.id"))
    project = db.Column(db.Integer, db.ForeignKey("project.id"))

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))

    projects = db.relationship("Project", backref="category", lazy="dynamic", foreign_keys="Project.category")
    group = db.Column(db.Integer, db.ForeignKey("group.id"))


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))

    categories = db.relationship("Category", backref="group", lazy="dynamic", foreign_keys="Category.group")
