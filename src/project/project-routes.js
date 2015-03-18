app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var projectPage = {
    templateUrl: '',
    controller: '',
    controllerAs: '',
    // resolve: {
    //   projects: ['',
    //     function() {
    //       return .list();
    //     }
    //   ]
    // }
  };

  $routeProvider
  .when('/', homePage)
  // .when('/account', {   
  //   templateUrl: '',
  //   controller: '',
  //   controllerAs: ''
  // });
}]);



