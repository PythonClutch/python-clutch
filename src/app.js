// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute', 'angularUtils.directives.dirPagination']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);


// searchChange = function () {
// 	console.log('changed')
// }