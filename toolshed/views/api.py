import json
from ..models import (User, UserSchema, Project, ProjectSchema,
                      Comment, CommentSchema, Category, CategorySchema,
                      Group, GroupSchema)
from flask import Blueprint, jsonify, request, abort, url_for
from ..extensions import db
from .toolshed import require_login, current_user
from datetime import datetime


api = Blueprint('api', __name__)

all_users_schema = UserSchema(many=True)
single_user_schema = UserSchema()
all_projects_schema = ProjectSchema(many=True)
single_project_schema = ProjectSchema()
comments_schema = CommentSchema(many=True)
single_category_schema = CategorySchema()
all_categories_schema = CategorySchema(many=True)
single_group_schema = GroupSchema()
all_groups_schema = GroupSchema(many=True)



def success_response(schema, data):
    results = schema.dump(data)
    return jsonify({"status": "success", "data": results.data})


def failure_response(reason, code):
    return jsonify({"status": "fail", "data": {"title": reason}}), code


@api.route('/user')
def get_user():
    name = current_user()
    user = User.query.filter_by(github_name=name).first()
    if user:
        return success_response(single_user_schema, user)
    else:
        return failure_response("User not logged in", 401)


@api.route("/users")
def users():
    users = User.query.all()
    if users:
        return success_response(all_users_schema, users)
    else:
        return failure_response("There are no users.", 404)


@api.route("/users/<int:id>")
def user(id):
    user = User.query.get(id)
    if user:
        return success_response(single_user_schema, user)
    else:
        return failure_response("There was no such user.", 404)


@api.route("/projects")
def projects():
    projects = Project.query.all()
    if projects:
        return success_response(all_projects_schema, projects)
    else:
        return failure_response("There are no projects.", 404)


@api.route("/projects/<int:id>")
def project(id):
    project = Project.query.get(id)
    if project:
        return success_response(single_project_schema, project)
    else:
        return failure_response("There was no such project.", 404)


@api.route("/categories")
def all_categories():
    categories = Category.query.all()
    if categories:
        return success_response(all_categories_schema, categories)
    else:
        return failure_response("There are no categories.", 404)


@api.route("/categories/<int:id>/projects")
def category_projects(id):
    category = Category.query.get(id)
    if category:
        return success_response(single_category_schema, category)
    else:
        return failure_response("There is no such category.", 404)


@api.route("/groups")
def all_groups():
    groups = Group.query.all()
    if groups:
        return success_response(all_groups_schema, groups)
    else:
        return failure_response("There are no groups.", 404)


@api.route("/groups/<int:id>/categories")
def group_categories(id):
    group = Group.query.get(id)
    if group:
        return success_response(single_group_schema, group)
    else:
        return failure_response("There is no group.", 404)


@api.route("/users/<int:id>/comments")
def user_comments(id):
    user = User.query.get(id)
    if user.comments:
        return success_response(comments_schema, user.comments)
    else:
        return failure_response("This user has no comments.", 404)


@api.route("/projects/<int:id>/comments")
def project_comments(id):
    project = Project.query.get(id)
    if project.comments:
        return success_response(comments_schema, project.comments)
    else:
        return failure_response("This project has no comments.", 404)


@api.route("/projects/<int:id>/comments", methods=["POST"])
def add_project_comment(id):
    user_name = current_user()
    user = User.query.filter_by(github_name=user_name).first()
    comment_data = request.get_json()
    project = Project.query.get(id)
    if project:
        comment = Comment(text=comment_data.text,
                          created=datetime.utcnow(),
                          project_id=project.id,
                          user_id=user.id)
        db.session.add(comment)
        db.session.commit()
        return success_response(comments_schema, comment)
    else:
        return failure_response("There was no such project", 404)









