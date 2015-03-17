app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var homePage = {
    templateUrl: 'static/home/home.html',
    controller: 'HomeCtrl',
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
  .when('/home', homePage)
  .when('/account', {   
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm'
  })
  .when('/submit', {   
    templateUrl: 'static/submit/submit.html',
    controller: 'SubmitCtrl',
    controllerAs: 'vm'
  });
}]);