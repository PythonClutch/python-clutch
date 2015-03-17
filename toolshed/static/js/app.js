// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);

app.controller('IndexCtrl', function () {
	
});
(function () {
	'use strict';

	app.directive('navBar', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/nav/nav.html'
		};
	});





})();
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
app.controller('AccountCtrl', function () {
	
});
app.controller('HomeCtrl', function () {
	var self = this;

	self.byProjects = true;

	self.setProjects = function () {
		self.byProjects = true;
	}

	self.setCategories = function () {
		self.byProjects = false;
	}
});
(function () {
	'use strict';

	app.directive('homeGroups', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-groups/home-groups.html'
		};
	});

	app.directive('homeProjects', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-projects/home-projects.html'
		};
	});




})();
app.controller('NavCtrl', ['$location', function ($location) {

	self.isActive = function (path) {
	  // The default route is a special case.
	  if (path === '/') {
	    return $location.path() === '/';
	  }

	  return function () {
	  	// $location.path() = $location.path() || '';
        return $location.path().slice(0, path.length) === path;
	  };
	};

}]);

app.controller('SubmitCtrl', function () {
	
});
app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);


app.controller('hgCtrl', function () {
	
});
app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

	self.setGroups = function () {
		self.byNames = false;
	}

	self.setNames = function () {
		self.byNames = true;
	}
});
//# sourceMappingURL=app.js.map