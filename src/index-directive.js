(function() {
    'use strict';

    app.directive('navBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/nav/nav.html',
            controllerAs: 'vm',
            controller: 'NavCtrl'
        };
    });

    app.directive('footerBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/footer/footer.html',
            controllerAs: 'vm',
            controller: 'FooterCtrl'
        };
    });

})();