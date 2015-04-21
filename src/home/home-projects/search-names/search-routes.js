app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        var homePage = {
            templateUrl: 'static/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
                projects: ['$route', 'projectServices',
                    function($route, projectServices) {
                        var routeParams = $route.current.params;
                        return projectServices.searchProjects(routeParams.word).then(function(results) {
                            return results.projects;
                        });
                    }
                ],
                groups: ['groupServices',
                    function(groupServices) {
                        return groupServices.listGroups();
                    }
                ],
                categories: ['groupServices',
                    function(groupServices) {
                        return groupServices.listCats();
                    }
                ],
                user: ['userServices',
                    function(userServices) {
                        return userServices.currentUser();
                    }
                ],
                setProj: ['homeFactory',
                    function(homeFactory) {
                        homeFactory.setProjects();
                    }
                ]
            }
        };

        $routeProvider
            .when('/home/search/:word', homePage);
    }
]);