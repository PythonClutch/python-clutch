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
| GET         | ```/api/v1/search?q="<word>"```                  | Search database for any projects, categories, or groups, and  |
|             |                                                  | returns them all.                                             |

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

#### GET to ```/Search?q="Zope"```
```
{
data: {
    categories: [ ],
    groups: [ ],
    projects: [
    {
    age_display: "2 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 14,
    contributors_url: "https://api.github.com/repos/zopefoundation/zope.deprecation/contributors",
    current_version: "4.1.2",
    date_added: "2015-03-27T11:08:51.929831+00:00",
    docs_url: null,
    downloads_count: 1150480,
    first_commit: "2013-01-07T22:49:23+00:00",
    first_commit_display: "2 years ago",
    forks_count: 2,
    forks_url: "https://github.com/zopefoundation/zope.deprecation/network",
    git_url: "https://github.com/zopefoundation/zope.deprecation",
    github_url: true,
    group_id: null,
    id: 627,
    last_commit: "2015-02-27T12:17:59+00:00",
    last_commit_display: "a month ago",
    logs: [
    {
    contributors_count: 14,
    current_version: "4.1.2",
    download_difference: 0,
    downloads_count: 1150480,
    forks_count: 2,
    forks_difference: 0,
    id: 63,
    last_commit: "2015-02-27T12:17:59+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 1,
    project_id: 627,
    starred_count: 2,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.deprecation",
    open_issues_count: 1,
    open_issues_url: "https://github.com/zopefoundation/zope.deprecation/issues",
    project_stub: "zopefoundation/zope.deprecation",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.deprecation/4.1.2",
    python_three_compatible: true,
    score: 0.395415571554726,
    starred_count: 2,
    starred_url: "https://github.com/zopefoundation/zope.deprecation/stargazers",
    status: false,
    summary: "Zope Deprecation Infrastructure",
    user_likes: [ ],
    watchers_count: 2,
    watchers_url: "https://github.com/zopefoundation/zope.deprecation/watchers",
    website: "http://pypi.python.org/pypi/zope.deprecation"
    },
    {
    age_display: "",
    bitbucket_url: null,
    category_id: null,
    comments: [ ],
    contributors_count: 0,
    contributors_url: "",
    current_version: "4.0.3",
    date_added: "2015-03-27T11:09:23.974582+00:00",
    docs_url: null,
    downloads_count: 700820,
    first_commit: null,
    first_commit_display: "",
    forks_count: 0,
    forks_url: "",
    git_url: "",
    github_url: null,
    group_id: null,
    id: 714,
    last_commit: null,
    last_commit_display: "",
    logs: [
    {
    contributors_count: 0,
    current_version: "4.0.3",
    download_difference: 0,
    downloads_count: 700820,
    forks_count: 0,
    forks_difference: 0,
    id: 149,
    last_commit: null,
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 0,
    project_id: 714,
    starred_count: 0,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.event",
    open_issues_count: 0,
    open_issues_url: "",
    project_stub: "",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.event/4.0.3",
    python_three_compatible: true,
    score: 0.0536991358892274,
    starred_count: 0,
    starred_url: "",
    status: false,
    summary: "Very basic event publishing system",
    user_likes: [ ],
    watchers_count: 0,
    watchers_url: "",
    website: "http://pypi.python.org/pypi/zope.event"
    },
    {
    age_display: "3 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 30,
    contributors_url: "https://api.github.com/repos/plone/plone.recipe.zope2instance/contributors",
    current_version: "4.2.16",
    date_added: "2015-03-27T11:10:48.449935+00:00",
    docs_url: null,
    downloads_count: 532595,
    first_commit: "2011-09-21T20:20:49+00:00",
    first_commit_display: "3 years ago",
    forks_count: 11,
    forks_url: "https://github.com/plone/plone.recipe.zope2instance/network",
    git_url: "https://github.com/plone/plone.recipe.zope2instance",
    github_url: true,
    group_id: null,
    id: 795,
    last_commit: "2015-02-19T09:25:06+00:00",
    last_commit_display: "a month ago",
    logs: [
    {
    contributors_count: 30,
    current_version: "4.2.16",
    download_difference: 0,
    downloads_count: 532595,
    forks_count: 11,
    forks_difference: 0,
    id: 54,
    last_commit: "2015-02-19T09:25:06+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 0,
    project_id: 795,
    starred_count: 3,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "plone.recipe.zope2instance",
    open_issues_count: 0,
    open_issues_url: "https://github.com/plone/plone.recipe.zope2instance/issues",
    project_stub: "plone/plone.recipe.zope2instance",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/plone.recipe.zope2instance/4.2.16",
    python_three_compatible: false,
    score: 0.127464498296084,
    starred_count: 3,
    starred_url: "https://github.com/plone/plone.recipe.zope2instance/stargazers",
    status: false,
    summary: "Buildout recipe for creating a Zope 2 instance",
    user_likes: [ ],
    watchers_count: 3,
    watchers_url: "https://github.com/plone/plone.recipe.zope2instance/watchers",
    website: "http://pypi.python.org/pypi/plone.recipe.zope2instance"
    },
    {
    age_display: "2 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 30,
    contributors_url: "https://api.github.com/repos/zopefoundation/zope.component/contributors",
    current_version: "4.2.1",
    date_added: "2015-03-27T11:09:14.447329+00:00",
    docs_url: null,
    downloads_count: 872306,
    first_commit: "2013-01-07T22:50:44+00:00",
    first_commit_display: "2 years ago",
    forks_count: 2,
    forks_url: "https://github.com/zopefoundation/zope.component/network",
    git_url: "https://github.com/zopefoundation/zope.component",
    github_url: true,
    group_id: null,
    id: 685,
    last_commit: "2015-02-25T15:26:18+00:00",
    last_commit_display: "a month ago",
    logs: [
    {
    contributors_count: 30,
    current_version: "4.2.1",
    download_difference: 0,
    downloads_count: 872306,
    forks_count: 2,
    forks_difference: 0,
    id: 120,
    last_commit: "2015-02-25T15:26:18+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 10,
    project_id: 685,
    starred_count: 4,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.component",
    open_issues_count: 10,
    open_issues_url: "https://github.com/zopefoundation/zope.component/issues",
    project_stub: "zopefoundation/zope.component",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.component/4.2.1",
    python_three_compatible: true,
    score: 0.0673419526605706,
    starred_count: 4,
    starred_url: "https://github.com/zopefoundation/zope.component/stargazers",
    status: false,
    summary: "Zope Component Architecture",
    user_likes: [ ],
    watchers_count: 4,
    watchers_url: "https://github.com/zopefoundation/zope.component/watchers",
    website: "http://pypi.python.org/pypi/zope.component"
    },
    {
    age_display: "2 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 30,
    contributors_url: "https://api.github.com/repos/zopefoundation/zope.testing/contributors",
    current_version: "4.1.3",
    date_added: "2015-03-27T11:09:40.864343+00:00",
    docs_url: null,
    downloads_count: 564199,
    first_commit: "2013-01-07T23:05:37+00:00",
    first_commit_display: "2 years ago",
    forks_count: 1,
    forks_url: "https://github.com/zopefoundation/zope.testing/network",
    git_url: "https://github.com/zopefoundation/zope.testing",
    github_url: true,
    group_id: null,
    id: 752,
    last_commit: "2015-01-28T20:12:45+00:00",
    last_commit_display: "2 months ago",
    logs: [
    {
    contributors_count: 30,
    current_version: "4.1.3",
    download_difference: 0,
    downloads_count: 564199,
    forks_count: 1,
    forks_difference: 0,
    id: 11,
    last_commit: "2015-01-28T20:12:45+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 0,
    project_id: 752,
    starred_count: 1,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.testing",
    open_issues_count: 0,
    open_issues_url: "https://github.com/zopefoundation/zope.testing/issues",
    project_stub: "zopefoundation/zope.testing",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.testing/4.1.3",
    python_three_compatible: true,
    score: 0.0433765459344596,
    starred_count: 1,
    starred_url: "https://github.com/zopefoundation/zope.testing/stargazers",
    status: false,
    summary: "Zope testing helpers",
    user_likes: [ ],
    watchers_count: 1,
    watchers_url: "https://github.com/zopefoundation/zope.testing/watchers",
    website: "http://pypi.python.org/pypi/zope.testing"
    },
    {
    age_display: "2 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 12,
    contributors_url: "https://api.github.com/repos/zopefoundation/zope.sqlalchemy/contributors",
    current_version: "0.7.5",
    date_added: "2015-03-27T11:09:46.580323+00:00",
    docs_url: null,
    downloads_count: 558242,
    first_commit: "2013-01-29T15:43:09+00:00",
    first_commit_display: "2 years ago",
    forks_count: 10,
    forks_url: "https://github.com/zopefoundation/zope.sqlalchemy/network",
    git_url: "https://github.com/zopefoundation/zope.sqlalchemy",
    github_url: true,
    group_id: null,
    id: 757,
    last_commit: "2015-03-20T19:00:07+00:00",
    last_commit_display: "7 days ago",
    logs: [
    {
    contributors_count: 12,
    current_version: "0.7.5",
    download_difference: 0,
    downloads_count: 558242,
    forks_count: 10,
    forks_difference: 0,
    id: 16,
    last_commit: "2015-03-20T19:00:07+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 3,
    project_id: 757,
    starred_count: 8,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.sqlalchemy",
    open_issues_count: 3,
    open_issues_url: "https://github.com/zopefoundation/zope.sqlalchemy/issues",
    project_stub: "zopefoundation/zope.sqlalchemy",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.sqlalchemy/0.7.5",
    python_three_compatible: true,
    score: 0.0687764083757298,
    starred_count: 8,
    starred_url: "https://github.com/zopefoundation/zope.sqlalchemy/stargazers",
    status: false,
    summary: "Minimal Zope/SQLAlchemy transaction integration",
    user_likes: [ ],
    watchers_count: 8,
    watchers_url: "https://github.com/zopefoundation/zope.sqlalchemy/watchers",
    website: "http://pypi.python.org/pypi/zope.sqlalchemy"
    },
    {
    age_display: "2 years ago",
    bitbucket_url: false,
    category_id: null,
    comments: [ ],
    contributors_count: 30,
    contributors_url: "https://api.github.com/repos/zopefoundation/zope.schema/contributors",
    current_version: "4.4.2",
    date_added: "2015-03-27T11:09:58.839598+00:00",
    docs_url: null,
    downloads_count: 557088,
    first_commit: "2013-01-07T22:50:03+00:00",
    first_commit_display: "2 years ago",
    forks_count: 5,
    forks_url: "https://github.com/zopefoundation/zope.schema/network",
    git_url: "https://github.com/zopefoundation/zope.schema",
    github_url: true,
    group_id: null,
    id: 764,
    last_commit: "2015-01-28T20:09:14+00:00",
    last_commit_display: "2 months ago",
    logs: [
    {
    contributors_count: 30,
    current_version: "4.4.2",
    download_difference: 0,
    downloads_count: 557088,
    forks_count: 5,
    forks_difference: 0,
    id: 23,
    last_commit: "2015-01-28T20:09:14+00:00",
    likes_difference: 0,
    log_date: "2015-03-27",
    open_issues_count: 11,
    project_id: 764,
    starred_count: 3,
    watchers_difference: 0
    }
    ],
    mailing_list_url: null,
    name: "zope.schema",
    open_issues_count: 11,
    open_issues_url: "https://github.com/zopefoundation/zope.schema/issues",
    project_stub: "zopefoundation/zope.schema",
    pypi_stub: "https://pypi.python.org/pypi",
    pypi_url: "https://pypi.python.org/pypi/zope.schema/4.4.2",
    python_three_compatible: true,
    score: 0.0999549109034397,
    starred_count: 3,
    starred_url: "https://github.com/zopefoundation/zope.schema/stargazers",
    status: false,
    summary: "zope.interface extension for defining data schemas",
    user_likes: [ ],
    watchers_count: 3,
    watchers_url: "https://github.com/zopefoundation/zope.schema/watchers",
    website: "http://pypi.python.org/pypi/zope.schema"
    }
    ],
    query: "zope"
    },
status: "success"
}
```