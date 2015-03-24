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
      ],
      setProj: ['homeFactory',
        function(homeFactory) {
          homeFactory.setProjects();
        }
      ]
    }
  };

  $routeProvider
  .when('/', homePage)
  .when('/home', homePage)
  .when('/home/projects', homePage)
  .when('/submit', {
    templateUrl: 'static/submit/submit.html',
    controller: 'SubmitCtrl',
    controllerAs: 'vm'
  })
  // .when('/home/categories', homePage)
  // .when('/projects', homePage)
  // .when('/home/category', homePage)
  .when('/group', {   
    templateUrl: 'static/group/group.html',
    controller: 'GroupCtrl',
    controllerAs: 'vm'
  });
  // .when('/project', {   
  //   templateUrl: 'static/project/project.html',
  //   controller: 'ProjectCtrl',
  //   controllerAs: 'vm'
  // });
}]);



