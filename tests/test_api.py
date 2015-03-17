import json


def test_get_user_list(client, user):
    response = client.get("/api/v1/users")
    user_list = json.loads(str(response.data))
    user_data = user_list["data"][0]
    assert user_data["github_name"] == user.github_name
    assert user_data["github_url"] == user.github_url


def test_get_user(client, user):
    response = client.get("/api/v1/users/" + str(user.id))
    user_data = json.loads(str(response.data))
    assert user_data["github_name"] == user.github_name
    assert user_data["github_url"] == user.github_url