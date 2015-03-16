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
  };

  $routeProvider
  .when('/', homePage)
  .when('/home', homePage);
  // .when('/home/projects',    
  //   templateUrl: 'static/home/groups/groups.html',
  //   controller: 'IndexCtrl',
  //   controllerAs: 'vm')
}]);