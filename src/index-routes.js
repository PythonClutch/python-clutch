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