# Using the API Endpoints

| HTTP Method | URL                                              |  Action                                                       |
|-------------|--------------------------------------------------|---------------------------------------------------------------|
| GET         | ```/api/v1/user```                               | Get the current user                                          |
| GET         | ```/api/v1/users```                              | Get a list of all users                                       |
| GET         | ```/api/v1/users/<int:id>```                     | Get user with user_id == id                                   |
| GET         | ```/api/v1/users/<int:id>/pending_submissions``` | Get a user's (user_id == id) pending submissions              |
| GET         | ```/api/v1/users/<int:id>/submissions```         | Get a user's (user_id == id) submissions                      |
| GET         | ```/api/v1/projects```                           | Get a list of all projects                                    |
| GET         | ```/api/v1/projects/newest```                    | Get a list of all projects, sorted by date added, newest first|
| GET         | ```/api/v1/projects/popular```                   | Get a list of all projects, sorted by score                   |
| GET         | ```/api/v1/projects/<int:id>```                  | Get project with project_id == id                             |
| GET         | ```/api/v1/categories```                         | Get a list of all categories                                  |
| GET         | ```/api/v1/categories/<int:id>         ```       | Get category and its projects with category_id == id          |
| GET         | ```/api/v1/groups```                             | Get a list of all groups                                      |
| GET         | ```/api/v1/groups/<int:id>```                    | Get group with group_id == id                                 |
| GET         | ```/api/v1/users/<int:id>/comments```            | Get comments made by user with user_id == id                  |
| GET         | ```/api/v1/projects/<int:id>/comments```         | Get comments on project with project_id == id                 |
| POST        | ```/api/v1/projects/<int:id>/comments```         | Create a comment on a project with current user as author     |
| PUT         | ```/api/v1/comments/<int:id>```                  | Edit a comment with comment_id == id                          |
| DELETE      | ```/api/v1/comments/<int:id>```                  | Delete a comment with comment_id == id                        |
| POST        | ```/api/v1/likes/projects/<int:id>```            | Like a project                                                |
| DELETE      | ```/api/v1/likes/<int:id>```                     | Delete a like on a project with like_id == id                 |
| GET         | ```/api/v1/users/<int:id>/likes```               | Get the likes for a user with user_id == id                   |
| GET         | ```/api/v1/projects/<int:id>/likes```            | Get the likes for a project with project_id == id             |
| POST        | ```/api/v1/projects```                           | Submit a new project                                          |


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
        "bitbucket_url": false,
        "category_id": null,
        "comments": [ ],
        "contributors_count": 30,
        "contributors_url": "https://api.github.com/repos/pydata/pandas/contributors",
        "current_version": "0.16.0",
        "date_added": "2015-03-26T15:24:31.995908+00:00",
        "docs_url": null,
        "downloads_count": 2208523,
        "first_commit": "2010-08-24T01:37:33+00:00",
        "first_commit_display": "4 years ago",
        "forks_count": 1499,
        "forks_url": "https://github.com/pydata/pandas/network",
        "git_url": "https://github.com/pydata/pandas",
        "github_url": true,
        "group_id": null,
        "id": 5,
        "last_commit": "2015-03-26T16:46:51+00:00",
        "last_commit_display": "2 hours ago",
        "logs": [ ],
        "mailing_list_url": null,
        "name": "pandas",
        "open_issues_count": 1342,
        "open_issues_url": "https://github.com/pydata/pandas/issues",
        "project_stub": "pydata/pandas",
        "pypi_url": "https://pypi.python.org/pypi/pandas",
        "python_three_compatible": true,
        "starred_count": 4191,
        "starred_url": "https://github.com/pydata/pandas/stargazers",
        "status": false,
        "summary": "Powerful data structures for data analysis, time series,and statistics",
        "user_likes": [ ],
        "watchers_count": 4191,
        "watchers_url": "https://github.com/pydata/pandas/watchers",
        "website": "http://pandas.pydata.org"
    },
    "status": "success"
}
```
