app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var accountPage = {
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm',
    resolve: {
      changeToInfo: ['accountFactory',
        function(accountFactory) {
          accountFactory.setInfo();
        }
      ]
    }
  };

  var activityPage = {
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm',
    resolve: {
      changeToAct: ['accountFactory',
        function(accountFactory) {
          accountFactory.setActivity();
        }
      ]
    }
  }
  
  $routeProvider
  .when('/account', accountPage)
  .when('/account/info', accountPage)
  .when('/account/activity', activityPage)
  .when('/account/edit', {
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm',
    resolve: {
      changeToAct: ['accountFactory',
        function(accountFactory) {
          accountFactory.setEdit();
        }
      ]
    }
  });

}]);