app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var page = {
    templateUrl: 'static/footer/footer-pages/footer-pages.html',
    controller: 'FooterCtrl',
    controllerAs: 'vm',
    // resolve: {
		  // projects: ['projectServices',
	   //      function(projectServices) {
	   //        return projectServices.list();
	   //      }
	   //  ],
    //   groups: ['groupServices',
    //     function(groupServices) {
    //       return groupServices.list();
    //     }
    //   ],
    //   categories: ['groupServices',
    //     function(groupServices) {
    //       return groupServices.listCats();
    //     }
    //   ]
    // }
  };

  $routeProvider
  .when('/projectindex', page)
  .when('/about', page)
  .when('/contact', page)
}]);