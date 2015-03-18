app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var homePage = {
    templateUrl: 'static/home/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'vm',
    resolve: {
      projects: ['projectServices',
        function(projectServices) {
          return projectServices.list();
        }
      ]
    }
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
  })
  // .when('/home/category', homePage)
  .when('/account', {   
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm'
  })
  .when('/group', {   
    templateUrl: 'static/group/group.html',
    controller: 'GroupCtrl',
    controllerAs: 'vm'
  })
  .when('/project', {   
    templateUrl: 'static/project/project.html',
    controller: 'ProjectCtrl',
    controllerAs: 'vm'
  });
}]);



