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
      groups: ['groupServices',
        function(groupServices) {
          return groupServices.list();
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
      changeToCat: ['homeFactory',
        function(homeFactory) {
          homeFactory.setCategories();
        }
      ]
    }
  };

  $routeProvider

  .when('/home/categories', homePage);
}]);