app.config(['$routeProvider',
    function($routeProvider) {
        var routeDefinition = {
            templateUrl: 'static/group/group.html',
            controller: 'GroupCtrl',
            controllerAs: 'vm',
            resolve: {
                user: ['userServices',
                    function(userServices) {
                        return userServices.currentUser();
                    }
                ],
                graph: ['$route', 'groupServices',
                    function($route, groupServices) {
                        var routeParams = $route.current.params;
                        return groupServices.getGraphByGroupId(routeParams.groupid);
                    }
                ],
                group: ['$route', 'groupServices',
                    function($route, groupServices) {
                        var routeParams = $route.current.params;
                        return groupServices.getByGroupId(routeParams.groupid);
                    }
                ]
            }
        };
        $routeProvider.when('/home/groups/:groupid', routeDefinition);
    }
]);