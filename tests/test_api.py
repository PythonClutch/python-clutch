import json


def test_get_user_list(client, user):
    response = client.get("/api/v1/users")
    user_list = json.loads(response.get_data().decode("utf-8"))
    user_data = user_list["data"][0]
    assert user_data["github_name"] == user.github_name
    assert user_data["github_url"] == user.github_url


def test_get_user(client, user):
    response = client.get("/api/v1/users/" + str(user.id))
    user_data = json.loads(response.get_data().decode("utf-8"))["data"]
    assert user_data["github_name"] == user.github_name
    assert user_data["github_url"] == user.github_url


def test_get_empty_projects(client, db):
    response = client.get("api/v1/projects")
    response_data = json.loads(response.get_data().decode("utf-8"))
    assert response_data["status"] == "fail"
    assert response_data["data"]["title"] == "There are no projects."


def test_get_project_list(client, project):
    response = client.get("api/v1/projects")
    response_data = json.loads(response.get_data().decode("utf-8"))
    project_data = response_data["data"][0]

    assert project_data['name'] == project.name

def test_get_project(client, project):
    response = client.get("api/v1/projects/" + str(project.id))
    response_data = json.loads(response.get_data().decode("utf-8"))
    assert response_data['status'] == "success"
