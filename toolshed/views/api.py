import json
from ..models import User, UserSchema, Project, ProjectSchema
from flask import Blueprint, jsonify, request, abort, url_for


api = Blueprint('api', __name__)

all_users_schema = UserSchema(many=True)
single_user_schema = UserSchema()
all_projects_schema = ProjectSchema(many=True)
single_project_schema = ProjectSchema()


def success_response(schema, data):
    results = schema.dump(data)
    return jsonify({"status": "success", "data": results.data})


def failure_response(reason, code):
    return jsonify({"status": "fail", "data": {"title": reason}}), code


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




