from .extensions import db, bcrypt, login_manager
from marshmallow import Schema, fields, ValidationError
from flask.ext.login import UserMixin


@login_manager.user_loader
def load_admin(id):
    return Admin.query.get(id)

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
    like = db.relationship("Like", backref="user", lazy="dynamic", foreign_keys="Like.user_id",
                           cascade="all,delete")

    def __repr__(self):
        return "User: {}".format(self.github_name)


class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    @property
    def user_name(self):
        return self.user.github_name

    @property
    def project_name(self):
        return self.project.name

    def __repr__(self):
        return "{} likes {}".format(self.user.github_name, self.project.name)



class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Boolean)
    name = db.Column(db.String(255), nullable=False, unique=True)
    summary = db.Column(db.String(400))
    forks_count = db.Column(db.Integer)
    starred_count = db.Column(db.Integer)
    watchers_count = db.Column(db.Integer)
    watchers_url = db.Column(db.String)
    age = db.Column(db.DateTime)
    current_version = db.Column(db.String(20))
    last_commit = db.Column(db.DateTime)
    first_commit = db.Column(db.DateTime)
    open_issues_count = db.Column(db.Integer)
    project_stub = db.Column(db.String(400))
    downloads_count = db.Column(db.Integer)
    contributors_count = db.Column(db.Integer)
    python_three_compatible = db.Column(db.Boolean)
    website = db.Column(db.String(400))
    github_url = db.Column(db.String(400))
    pypi_url = db.Column(db.String(400))
    contributors_url = db.Column(db.String(400))
    mailing_list_url = db.Column(db.String(400))
    forks_url = db.Column(db.String(400))
    starred_url = db.Column(db.String)
    open_issues_url = db.Column(db.String(400))
    docs_url = db.Column(db.String(400))



    category_id = db.Column(db.Integer, db.ForeignKey("category.id"))
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"))

    comments = db.relationship("Comment", backref="project", lazy="dynamic", foreign_keys="Comment.project_id",
                               cascade="all,delete")
    user_likes = db.relationship("Like", backref="project", lazy="dynamic", foreign_keys="Like.project_id",
                                 cascade="all,delete")

    @property
    def number_of_comments(self):
        return len(Comment.query.filter_by(project_id=self.id).all())

    @property
    def number_of_likes(self):
        return len(Like.query.filter_by(project_id=self.id).all())

    def __repr__(self):
        return "{}".format(self.name)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(400))
    created = db.Column(db.DateTime)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"))

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

    projects = db.relationship("Project", backref="group", lazy="dynamic", foreign_keys="Project.group_id")
    categories = db.relationship("Category", backref="group", lazy="dynamic", foreign_keys="Category.group_id")

    def __repr__(self):
        return "Group: {}".format(self.name)

class Admin(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    admin_name = db.Column(db.String(255), nullable=False)
    encrypted_password = db.Column(db.String(60))

    def get_password(self):
        return getattr(self, "_password", None)

    def set_password(self, password):
        self._password = password
        self.encrypted_password = bcrypt.generate_password_hash(password)

    password = property(get_password, set_password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.encrypted_password, password)

    def __repr__(self):
        return "Admin {}".format(self.admin_name)


"""
Schemas

For schemas we need to figure out how to make them more restful by adding
the ability to display the api endpoints.
"""


class CommentSchema(Schema):
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
                  "docs_url", "category_id", "comments", "number_of_likes",
                  "number_of_comments")


class CategorySchema(Schema):
    projects = fields.Nested(ProjectSchema, many=True)
    class Meta:
        fields = ("id", "name", "projects", "group_id")


class GroupSchema(Schema):
    categories = fields.Nested(CategorySchema, many=True)
    class Meta:
        fields = ("id", "name", "categories")


class LikeSchema(Schema):
    class Meta:
        fields = ("id", "user_id", "project_id", "user_name", "project_name")
