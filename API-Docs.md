# Using the API Endpoints

| HTTP Method | URL                                          |  Action                                                   |
|-------------|----------------------------------------------|-----------------------------------------------------------|
| GET         | ```/api/v1/user```                           | Get the current user                                      |
| GET         | ```/api/v1/users```                          | Get a list of all users                                   |
| GET         | ```/api/v1/users/<int:id>```                 | Get user with user_id == id                               |
| GET         | ```/api/v1/projects```                       | Get a list of all projects                                |
| GET         | ```/api/v1/projects/<int:id>```              | Get project with project_id == id                         |
| GET         | ```/api/v1/categories```                     | Get a list of all categories                              |
| GET         | ```/api/v1/categories/<int:id>/projects```   | Get category and its projects with category_id == id      |
| GET         | ```/api/v1/groups```                         | Get a list of all groups                                  |
| GET         | ```/api/v1/groups/<int:id>/categories```     | Get group with group_id == id                             |
| GET         | ```/api/v1/users/<int:id>/comments```        | Get comments made by user with user_id == id              |
| GET         | ```/api/v1/projects/<int:id>/comments```     | Get comments on project with project_id == id             |
| POST        | ```/api/v1/projects/<int:id>/comments```     | Create a comment on a project with current user as author |
| PUT         | ```/api/v1/comments/<int:id>```              | Edit a comment with comment_id == id                      |
| DELETE      | ```/api/v1/comments/<int:id>```              | Delete a comment with comment_id == id                    |
| POST        | ```/api/v1/likes/projects/<int:id>```        | Like a project                                            |
| DELETE      | ```/api/v1/likes/<int:id>```                 | Delete a like on a project with like_id == id             |
| GET         | ```/api/v1/users/<int:id>/likes```           | Get the likes for a user with user_id == id               |
| GET         | ```/api/v1/projects/<int:id>/likes```        | Get the likes for a project with project_id == id         |
| POST        | ```/api/v1/projects```                       | Submit a new project                                      |


## Example usage

#### Send a GET to ```/users``` when there are no users
Get back:
```
{
    "data": {
        "title": "There are no users."
    },
    "status": "fail"
}
```
#### Send a GET to ```/users``` with a user in the database.

```
{
    "data": [
        {
            "comments": [ ],
            "email": "cndreisbach@clintondontusenoemail.com",
            "github_name": "cndreisbach",
            "github_url": "https://github.com/cndreisbach",
            "id": 1
        }
    ],
    "status": "success"
}
```


#### POST to ```/projects```

send JSON like:
```
{
    "pypi_url": "https://pypi.python.org/pypi/pandas",
    "github_url": "https://github.com/pydata/pandas"
    
}
```

and get back: 

```
{
    "data": {
        "age_display": "4 years ago",
        "category_id": null,
        "comments": [ ],
        "contributors_count": 30,
        "contributors_url": "https://api.github.com/repos/pydata/pandas/contributors",
        "current_version": "0.16.0",
        "docs_url": null,
        "downloads_count": 2183076,
        "first_commit": "2010-08-24T01:37:33+00:00",
        "forks_count": 1492,
        "forks_url": "https://github.com/pydata/pandas/network",
        "github_url": "https://github.com/pydata/pandas",
        "group_id": null,
        "id": 2,
        "last_commit": "2015-03-23T16:40:46+00:00",
        "last_commit_display": "an hour ago",
        "logs": [ ],
        "mailing_list_url": null,
        "name": "pandas",
        "open_issues_count": 1332,
        "open_issues_url": "https://github.com/pydata/pandas/issues",
        "project_stub": "pydata/pandas",
        "pypi_url": "https://pypi.python.org/pypi/pandas",
        "python_three_compatible": true,
        "starred_count": 4174,
        "starred_url": "https://github.com/pydata/pandas/stargazers",
        "status": false,
        "summary": "Powerful data structures for data analysis, time series,and statistics",
        "user_likes": [ ],
        "watchers_count": 4174,
        "watchers_url": "https://github.com/pydata/pandas/watchers",
        "website": "http://pandas.pydata.org"
    },
    "status": "success"
}
```