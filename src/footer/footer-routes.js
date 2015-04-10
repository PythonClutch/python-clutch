app.config(['$routeProvider',
    function($routeProvider) {
        'use strict';

        var page = {
            templateUrl: 'static/footer/footer-pages/footer-pages.html',
            controller: 'FooterCtrl',
            controllerAs: 'vm',
        };

        $routeProvider
            .when('/projectindex', page)
            .when('/about', page)
            .when('/contact', page);
    }
]);