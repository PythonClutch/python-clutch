app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        var homePage = {
            templateUrl: 'static/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
                projects: ['projectServices',
                    function(projectServices) {
                        return projectServices.list();
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
            .when('/', homePage)
            .when('/home', homePage)
            .when('/home/projects', homePage)
            .when('/submit', {
                templateUrl: 'static/submit/submit.html',
                controller: 'SubmitCtrl',
                controllerAs: 'vm'
            })
    }
]);