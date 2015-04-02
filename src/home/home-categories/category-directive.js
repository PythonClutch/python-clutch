(function() {
    app.directive('homeCategories', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/home/home-categories/home-categories.html'
        };
    });

    app.directive('homeCatFilters', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/home/home-categories/category-details/home-cat-filters.html'
        };
    });

    app.directive('categoryDetails', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/home/home-categories/category-details/category-details.html',
        };
    });

    app.directive('catDetailsGroups', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/home/home-categories/category-details/cat-details-groups.html'
        };
    });
})();