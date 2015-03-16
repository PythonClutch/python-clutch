import json
from ..models import User, UserSchema
from flask import Blueprint, jsonify, request, abort, url_for


api = Blueprint('api', __name__)

all_users_schema = UserSchema(many=True)
single_user_schema = UserSchema()

def success_response(schema, data):
    results = all_users_schema.dump(data)
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

