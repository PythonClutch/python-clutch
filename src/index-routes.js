app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        var homePage = {
            templateUrl: 'static/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
        
                groups: ['groupServices',
                    function(groupServices) {
                        return groupServices.listCurrentGroups();
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
                projects: ['projectServices',
                    function(projectServices) {
                        return projectServices.listSecond();
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
            });
    }
]);