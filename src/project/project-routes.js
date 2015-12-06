app.config(['$routeProvider',
    function($routeProvider) {
        var routeDefinition = {
            templateUrl: 'static/project/project.html',
            controller: 'ProjectCtrl',
            controllerAs: 'vm',
            resolve: {
                user: ['userServices',
                    function(userServices) {
                        return userServices.currentUser();
                    }
                ],
                project: ['$route', 'projectServices',
                    function($route, projectServices) {
                        var routeParams = $route.current.params;
                        return projectServices.getByProjectId(routeParams.projectid);
                    }
                ],
                graph: ['$route', 'projectServices',
                    function($route, projectServices) {
                        var routeParams = $route.current.params;
                        return projectServices.getGraphByProjectId(routeParams.projectid);
                    }
                ],
            }
        };

        $routeProvider
            .when('/projects/:projectid', routeDefinition)
            .when('/home/projects/:projectid', routeDefinition);

    }
]);