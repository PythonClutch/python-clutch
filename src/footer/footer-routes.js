app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        var page = {
            templateUrl: 'static/footer/footer-pages/footer-pages.html',
            controller: 'FooterCtrl',
            controllerAs: 'vm',
            resolve: {
                projects: ['projectServices',
                    function(projectServices) {
                        return projectServices.list();
                    }
                ],
            }
        };

        $routeProvider
            .when('/projectindex', page)
            .when('/about', page)
            .when('/contact', page);
    }
]);