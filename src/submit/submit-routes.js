app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var submitPage = {
    templateUrl: 'static/submit/submit.html',
    controller: 'SubmitCtrl',
    controllerAs: 'vm',
    resolve: {
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
        }
      ],
      changeToNew: ['submitFactory',
        function(submitFactory) {
          submitFactory.setNew();
        }
      ]
    }
  };

  var pendingPage = {
    templateUrl: 'static/submit/submit.html',
    controller: 'SubmitCtrl',
    controllerAs: 'vm',
    resolve: {
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
        }
      ],
      changeToPen: ['submitFactory',
        function(submitFactory) {
          submitFactory.setPending();
        }
      ]
    }
  };
  
  $routeProvider
  .when('/submit', submitPage)
  .when('/submit/new', submitPage)
  .when('/submit/pending', pendingPage);
  // .when('/account/edit', {
  //   templateUrl: 'static/account/account.html',
  //   controller: 'SubmitCtrl',
  //   controllerAs: 'vm',
  //   resolve: {
  //     changeToAct: ['submitFactory',
  //       function(submitFactory) {
  //         submitFactory.setEdit();
  //       }
  //     ]
  //   }
  // });

}]);