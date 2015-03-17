from .extensions import db
from marshmallow import Schema, fields, ValidationError


"""
Models
"""

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    github_name = db.Column(db.String(255), nullable=False)
    github_url = db.Column(db.String(400))
    email = db.Column(db.String(255))
    comments = db.relationship("Comment", backref="user", lazy="dynamic", foreign_keys="Comment.user_id",
                               cascade="all,delete")

    def __repr__(self):
        return "User: {}".format(self.github_name)

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

    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    comments = db.relationship("Comment", backref="project", lazy="dynamic", foreign_keys="Comment.project_id",
                               cascade="all,delete")

    def __repr__(self):
        return "Project: {}".format(self.name)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(400))
    created = db.Column(db.DateTime)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"))
    project_id = db.Column(db.Integer, db.ForeignKey("project.id", ondelete="CASCADE"))

    def __repr__(self):
        return "Comment: {}".format(self.text)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))

    projects = db.relationship("Project", backref="category", lazy="dynamic", foreign_keys="Project.category_id")
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"))

    def __repr__(self):
        return "Category: {}".format(self.name)


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))

    categories = db.relationship("Category", backref="group", lazy="dynamic", foreign_keys="Category.group_id")

    def __repr__(self):
        return "Group: {}".format(self.name)


"""
Schemas

For schemas we need to figure out how to make them more restful by adding
the ability to display the api endpoints.
"""


class CommentSchema(Schema):
    text = fields.String(required=True)
    class Meta:
        fields = ("id", "text", "created", "user_id",
                  "project_id")


class UserSchema(Schema):
    comments = fields.Nested(CommentSchema, many=True)
    class Meta:
        fields = ("id", "github_name", "github_url", "email", "comments")


class ProjectSchema(Schema):
    comments = fields.Nested(CommentSchema, many=True)
    class Meta:
        fields = ("id", "name", "github_url", "website",
                  "pypi_url", "forks", "starred", "watchers",
                  "age", "version", "last_commit", "open_issues",
                  "docs_url", "category_id", "comments")


class CategorySchema(Schema):
    projects = fields.Nested(ProjectSchema, many=True)
    class Meta:
        fields = ("id", "name", "projects", "group_id")


class GroupSchema(Schema):
    categories = fields.Nested(CategorySchema, many=True)
    class Meta:
        fields = ("id", "name", "categories")



