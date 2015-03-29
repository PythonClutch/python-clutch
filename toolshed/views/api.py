import os
import vincent
from ..models import (User, UserSchema, Project, Like, ProjectSchema,
                      Comment, CommentSchema, Category, CategorySchema,
                      Group, GroupSchema, LikeSchema,ProjectLog, LogSchema,
                      SearchSchema)
from flask import Blueprint, jsonify, request
from ..extensions import db, mail
from .toolshed import require_login, current_user
from datetime import datetime
from ..importer import create_project
from toolshed import mail
from flask_mail import Message
from datetime import datetime




api = Blueprint('api', __name__)



# Schemas

all_users_schema = UserSchema(many=True)
single_user_schema = UserSchema()
all_projects_schema = ProjectSchema(many=True, exclude=("logs",))
all_projects_with_logs = ProjectSchema(many=True)
single_project_schema = ProjectSchema()
single_comment_schema = CommentSchema()
all_comments_schema = CommentSchema(many=True)
single_category_schema = CategorySchema()
all_categories_schema = CategorySchema(many=True)
single_group_schema = GroupSchema()
all_groups_schema = GroupSchema(many=True)
single_like_schema = LikeSchema()
all_likes_schema = LikeSchema(many=True)
all_logs_schema = LogSchema(many=True)
single_log_schema = LogSchema()
search_schema = SearchSchema()


# grab line_style from env
try:
    line_style = os.environ['LINE_STYLE']
except:
    line_style = None


# response functions

def success_response(schema, data):
    results = schema.dump(data)
    return jsonify({"status": "success", "data": results.data})


def failure_response(reason, code):
    return jsonify({"status": "fail", "data": {"title": reason}}), code


# User routes

@api.route('/user')
def get_user():
    name = current_user()
    user = User.query.filter_by(github_name=name).first()
    if user:
        return success_response(single_user_schema, user)
    else:
        return failure_response("User not logged in", 401)


@api.route('/user/pending_submissions')
def get_user_pending():
    name = current_user()
    if name:
        user = User.query.filter_by(github_name=name).first()
        if user.submissions:
            pending = Project.query.filter_by(submitted_by_id=user.id).filter_by(status=False).all()
            return success_response(all_projects_schema, pending)
        else:
            return failure_response("No pending submissions.", 404)
    else:
        return failure_response("User not logged in", 401)



@api.route('/user', methods=["POST"])
def update_user():
    name = current_user()
    user = User.query.filter_by(github_name=name).first()
    if user:
        urls = request.get_json()
        def update_user(some_user, portfolio_url=None, linkedin_url=None):
            if linkedin_url:
                some_user.linkedin_url = linkedin_url
            if portfolio_url:
                some_user.portfolio_url = portfolio_url
            db.session.commit()
        update_user(user, **urls)
        return success_response(single_user_schema, user)
    else:
        failure_response("You are not logged in", 401)



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


@api.route("/users/<int:id>/pending_submissions")
def get_pending_submissions(id):
    user = User.query.get(id)
    if user.submissions:
        pending = Project.query.filter_by(submitted_by_id=user.id).filter_by(status=False).all()
        return success_response(all_projects_schema, pending)
    else:
        return failure_response("No pending submissions.", 404)


@api.route("/users/<int:id>/submissions")
def get_submissions(id):
    user = User.query.get(id)
    if user.submissions:
        submissions = Project.query.filter_by(submitted_by_id=user.id).filter_by(status=True).all()
        return success_response(all_projects_schema, submissions)
    else:
        return failure_response("No submissions.", 404)


# project routes

@api.route("/projects")
def projects():
    projects = Project.query.order_by(Project.name)
    if projects:
        return success_response(all_projects_schema, projects)
    else:
        return failure_response("There are no projects.", 404)


@api.route("/projects/newest")
def newest_projects():
    projects = Project.query.order_by(Project.date_added)
    if projects:
        return success_response(all_projects_schema, projects)
    else:
        return failure_response("There are no projects.", 404)


@api.route("/projects/popular")
def popular_projects():
    projects = Project.query.order_by(Project.score.desc())
    if projects:
        return success_response(all_projects_schema, projects)



@api.route("/projects/<int:id>")
def project(id):
    project = Project.query.get(id)
    if project:
        return success_response(single_project_schema, project)
    else:
        return failure_response("There was no such project.", 404)


@api.route("/projects", methods=["POST"])
def make_project():
    urls = request.get_json()
    project = create_project(**urls)
    if not project:
        return failure_response("This project already exists.", 409)
    user_name = current_user()
    if not user_name:
        return failure_response("You must log in to post projects.", 407)
    user = User.query.filter_by(github_name=user_name).first()
    project.submitted_by_id = user.id
    user.submissions.append(project)
    db.session.add(project)
    message = Message("New Submission",
                      sender="pythonclutch@gmail.com",
                      recipients=["pythonclutch@gmail.com"])
    message.body = "Hello, there has been a new project submitted. It is called " + project.name +"" \
                           " and was submitted by, " + user.github_name + " at " + str(datetime.utcnow()) + "."
    mail.send(message)
    db.session.commit()
    return success_response(single_project_schema, project)


# Logs routes


@api.route("/projects/logs")
def logs():
    all_the_logs = ProjectLog.query.all()
    if all_the_logs:
        return success_response(all_logs_schema, all_the_logs)
    else:
        return failure_response("There are no projects", 404)


@api.route("/projects/<int:id>/logs")
def project_logs(id):
    desired_project = Project.query.get(id)
    desired_logs = desired_project.logs
    if desired_logs:
        return success_response(all_logs_schema, desired_logs)
    else:
        return failure_response("There was no such project.", 404)


# Group routes


@api.route("/groups")
def all_groups():
    groups = Group.query.order_by(Group.name).all()
    if groups:
        return success_response(all_groups_schema, groups)
    else:
        return failure_response("There are no groups.", 404)


@api.route("/groups/<int:id>")
def group_projects(id):
    group = Group.query.get(id)
    if group.projects:
        return success_response(single_group_schema, group)
    else:
        return failure_response("There is no such group.", 404)


# Category routes

@api.route("/categories")
def all_categories():
    categories = Category.query.order_by(Category.name).all()
    if categories:
        return success_response(all_categories_schema, categories)
    else:
        return failure_response("There are no categories.", 404)


@api.route("/categories/<int:id>")
def group_categories(id):
    category = Category.query.get(id)
    if category:
        return success_response(single_category_schema, category)
    else:
        return failure_response("There is no such category.", 404)


# Comment routes

@api.route("/users/<int:id>/comments")
def user_comments(id):
    user = User.query.get_or_404(id)
    if user.comments:
        return success_response(all_comments_schema, user.comments)
    else:
        return failure_response("This user has no comments.", 404)


@api.route("/projects/<int:id>/comments")
def project_comments(id):
    project = Project.query.get(id)
    if project.comments:
        return success_response(all_comments_schema, project.comments)
    else:
        return failure_response("This project has no comments.", 404)


@api.route("/projects/<int:id>/comments", methods=["POST"])
@require_login
def add_project_comment(id):
    user_name = current_user()
    user = User.query.filter_by(github_name=user_name).first()
    comment_data = request.get_json()
    project = Project.query.get(id)
    if project:
        comment = Comment(text=comment_data['text'],
                          created=datetime.utcnow(),
                          project_id=project.id,
                          user_id=user.id)

        user.comments.append(comment)
        db.session.add(comment)
        db.session.commit()
        return success_response(single_comment_schema, comment)
    else:
        return failure_response("There was no such project", 404)


@api.route("/comments/<int:id>", methods=["PUT"])
def edit_comment(id):
    user_name = current_user()
    user = User.query.filter_by(github_name=user_name).first()
    comment = Comment.query.get_or_404(id)
    comment_data = request.get_json()
    if comment.user_id != user.id:
        return failure_response("You are not authorized to edit this comment.")
    comment.text = comment_data['text']
    db.session.commit()
    return success_response(single_comment_schema, comment)



@api.route("/comments/<int:id>", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return success_response(single_comment_schema, comment)

# Like Routes

@api.route("/likes/projects/<int:id>", methods=["POST"])
def like_project(id):
    project = Project.query.get_or_404(id)
    user_name = current_user()
    user = User.query.filter_by(github_name=user_name).first()
    new_like = Like(user_id=user.id,
                     project_id=project.id)
    user.likes.append(new_like)
    db.session.add(new_like)
    db.session.commit()
    return success_response(single_like_schema, new_like)


@api.route("/likes/<int:id>", methods=["DELETE"])
def unlike_project(id):
    like = Like.query.get_or_404(id)
    db.session.delete(like)
    db.session.commit()
    return success_response(single_like_schema, like)


@api.route("/users/<int:id>/likes")
def get_user_likes(id):
    user = User.query.get_or_404(id)
    if user.likes:
        return success_response(all_likes_schema, user.likes)
    else:
        return failure_response("User has no likes", 404)


@api.route("/projects/<int:id>/likes")
def get_project_likes(id):
    project = Project.query.get_or_404(id)
    if project.user_likes:
        return success_response(all_likes_schema, project.user_likes)
    else:
        return failure_response("Project has no likes.", 404)


# Search Bar Routes


class Search:
    def __init__(self, query, projects):
        self.query = query
        self.projects = projects


@api.route("/search")
def search():
    text = request.args.get('q')
    if text:
        projects = Project.query.search(text).all()

        search = Search(query=text,
                        projects=projects)
        return success_response(search_schema, search)
    else:
        return failure_response("You must enter a query.", 400)


# Magic Visualization Routes

@api.route("/projects/<int:id>/graph")
def graph(id):
    project = Project.query.get_or_404(id)
    logs = project.logs
    log_number = len([1 for log in logs])
    if project.logs and log_number > 1:
        logs = project.logs.order_by(ProjectLog.log_date)

        x = [datetime.combine(log.log_date, datetime.min.time()).timestamp() * 1000
                 for log in logs]
        y = [log.previous_score for log in logs]

        multi_iter = {'x': x,
                     'data': y}
        line = vincent.Line(multi_iter, iter_idx='x')

        line.scales['x'] = vincent.Scale(name='x', type='time', range='width',
                                         domain=vincent.DataRef(data='table', field="data.idx"))
        line.scales['y'] = vincent.Scale(name='y', range='height', nice=True,
                                         domain=[0, 1])
        line.scales['color'] = vincent.Scale(name='color', range=['#12897D'], type='ordinal')
        line.axes['y'].ticks = 3
        line.axes['x'].ticks = 7
        # line.marks['group'].marks[0].properties.enter["interpolate"] = {"value": "monotone"}
        # marks[0].properties.update.fill.value
        if line_style:
            line.marks['group'].marks[0].properties.enter.interpolate = vincent.ValueRef(value=line_style)



        return jsonify({"status": "success", "data": line.grammar()})
    else:
        return failure_response("No history for this project", 404)


@api.route("/groups/<int:id>/graph")
def graph_group(id):
    group = Group.query.get_or_404(id)
    log_list = [proj.logs.all() for proj in group.projects.all()]
    scores = []
    for item in log_list:
        for log in item:
            scores.append((log.log_date, log.previous_score))

    date_set = {item[0] for item in scores}
    avg_scores = []
    for date in date_set:
        date_scores = [item[1] for item in scores if item[0] == date]
        score_avg = sum(date_scores)/len(date_scores)
        avg_scores.append((date, score_avg))


    if len(avg_scores) > 1:
        avg_scores.sort(key=lambda x: x[0])

        x = [datetime.combine(item[0], datetime.min.time()).timestamp() * 1000
                 for item in avg_scores]
        y = [item[1] for item in avg_scores]

        multi_iter = {'x': x,
                     'data': y}
        line = vincent.Line(multi_iter, iter_idx='x')

        line.scales['x'] = vincent.Scale(name='x', type='time', range='width',
                                         domain=vincent.DataRef(data='table', field="data.idx"))
        line.scales['y'] = vincent.Scale(name='y', range='height', nice=True,
                                         domain=[0, 1])
        line.scales['color'] = vincent.Scale(name='color', range=['#12897D'], type='ordinal')
        line.axes['y'].ticks = 3
        line.axes['x'].ticks = 7

        if line_style:
            line.marks['group'].marks[0].properties.enter.interpolate = vincent.ValueRef(value=line_style)



        return jsonify({"status": "success", "data": line.grammar()})
    else:
        return failure_response("No history for this group", 404)

@api.route("/scoredist")
def graph_distribution():
    projects = Project.query.all()
    scores = [project.score for project in projects]
    maximum_value = max(scores)
    minimum_value = min(scores)
    bin_number = 30
    bin_width = (maximum_value - minimum_value) / bin_number
    x = []
    y = []
    curr_bin = minimum_value
    for _ in range(bin_number):
        count = len([score for score in scores
                    if score > curr_bin
                    if score < curr_bin + bin_width])
        x.append(curr_bin)
        y.append(count)
        curr_bin += bin_width

    data = {'x': x,
            'y': y}
    bar = vincent.Bar(data, iter_idx='x')

    return bar.to_json()

@api.route("/groups/<int:id>/binned")
def graph_group_diff(id):
    group = Group.query.get_or_404(id)
    projects = group.projects.all()
    projects.sort(key=lambda x: x.score)
    data = {project.name: project.score for project in projects}
    bar_graph = vincent.Bar(data)

    return bar_graph.to_json()

