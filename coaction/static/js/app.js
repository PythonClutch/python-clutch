// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);

app.controller('IndexCtrl', function () {

});
app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var homePage = {
    templateUrl: 'static/home/home.html',
    controller: 'IndexCtrl',
    controllerAs: 'vm'
    // resolve: {
    //  apiTasks: ['taskService',
    //         function(taskService) {
    //             return taskService.list();
    //         }
    //     ],
    //     apiUsers: usersResolve
  }

  $routeProvider
  .when('/', homePage)
  .when('/home', homePage)

 //    var usersResolve = ['userService',
 //        function(userService) {
 //            return userService.list();
 //        }
 //    ];
	// var homePage = {
	// 	templateUrl: 'static/main/main.html',
 //        controller: 'AddTask',
 //        controllerAs: 'vm',
 //        resolve: {
 //        	apiTasks: ['taskService',
 //                function(taskService) {
 //                    return taskService.list();
 //                }
 //            ],
 //            apiUsers: usersResolve
 //        }
	// };
	// $routeProvider
	// .when('/', homePage)
	// .when('/main', homePage)
	// .when('/register', {
	// 	templateUrl: 'static/main/register.html',
 //        controller: 'RegisterUser',
 //        controllerAs: 'vm',
 //        resolve: {
 //            apiUsers: usersResolve
 //        }
	// });
}]);
app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

//# sourceMappingURL=app.js.map