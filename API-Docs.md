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
| GET         | ```/api/v1//projects/<int:id>/comments```    | Get comments on project with project_id == id             |
| POST        | ```/api/v1//projects/<int:id>/comments```    | Create a comment on a project with current user as author |


## Example usage

### Send a GET to ```/users``` when there are no users
Get back:
```
{
    "data": {
        "title": "There are no users."
    },
    "status": "fail"
}
```