app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var homePage = {
    templateUrl: 'static/home/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'vm',
    resolve: {
      projects: ['$route', 'projectServices',
        function($route, projectServices) {
          var routeParams = $route.current.params;
          console.log(routeParams.word);
          return projectServices.searchProjects(routeParams.word).then(function (results) {
            console.log(results.projects);
            return results.projects;
          });
        }
      ],
      // newestProjects: ['$route', 'projectServices',
      //   function($route, projectServices) {
      //     var routeParams = $route.current.params;
      //     return projectServices.searchNewestProjects(routeParams.word).then(function (results) {
      //       console.log(results.projects);
      //       return results.projects;
      //     });
      //   }
      // ],
      // listProjects: ['$route', 'projectServices',
      //   function($route, projectServices) {
      //     var routeParams = $route.current.params;
      //     return projectServices.searchProjects(routeParams.word).then(function (results) {
      //       console.log(results.projects);
      //       return results.projects;
      //     });
      //   }
      // ],
      groups: ['groupServices',
        function(groupServices) {
          return groupServices.listGroups();
        }
      ],
      categories: ['groupServices',
        function(groupServices) {
          return groupServices.listCats();
        }
      ],
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
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
  // .when('/', homePage)
  // .when('/home', homePage)
  // .when('/home/projects', homePage)
  .when('/home/search/:word', homePage)
  // .when('/submit', {
  //   templateUrl: 'static/submit/submit.html',
  //   controller: 'SubmitCtrl',
  //   controllerAs: 'vm'
  // })
  // .when('/home/categories', homePage)
  // .when('/projects', homePage)
  // .when('/home/category', homePage)
  // .when('/group', {   
  //   templateUrl: 'static/group/group.html',
  //   controller: 'GroupCtrl',
  //   controllerAs: 'vm'
  // });
  // .when('/project', {   
  //   templateUrl: 'static/project/project.html',
  //   controller: 'ProjectCtrl',
  //   controllerAs: 'vm'
  // });
}]);



