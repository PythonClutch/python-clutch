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
  // .when('/home/categories', homePage)
  // .when('/projects', homePage)
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




app.controller('AccountCtrl', function () {
	var self = this;

	self.byInfo = true;

	self.setInfo = function () {
		self.byInfo = true;
	}

	self.setActivity = function () {
		self.byInfo = false;
	}
});
(function () {
	app.directive('accountActivity', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-activity.html'
	  };
	});

	app.directive('accountInfo', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-info.html'
	  };
	});
})();
app.controller('GroupCtrl', function () {
	
});
app.controller('HomeCtrl', ['homeFactory', 'projects', 'stringUtil', '$location', function (homeFactory, projects, stringUtil, $location) {
	var self = this;

	self.projects = projects;

	self.byProjects = homeFactory.byProjects();

	self.setProjects = function () {
		homeFactory.setProjects();
		self.byProjects = homeFactory.byProjects();
	}

	self.setCategories = function () {
		homeFactory.setCategories();
		self.byProjects = homeFactory.byProjects();
	}

    self.isActive = function (path) {
      // The default route is a special case.
      if (path === '/') {
        return $location.path() === '/';
      }

      console.log('active')

      return stringUtil.startsWith($location.path(), path);
    };
}]);
(function () {
	'use strict';

	// app.directive('homeGroups', function () {
	// 	return {
	// 		restrict: 'E',
	// 		templateUrl: 'static/home/home-groups/home-groups.html'
	// 	};
	// });

	app.directive('homeProjects', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-projects/home-projects.html'
		};
	});




})();
$(function () {
	console.log('test');

	$('.home-category-tab').on('click', function () {
		console.log('hey')
		console.log($('#tab-category'))
		$('#tab-category').attr('checked', true);
	});
});
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

app.controller('ProjectCtrl', ['project', function (project) {

	var self = this;

	self.project = project;
	
}]);
app.config(['$routeProvider', function($routeProvider) {    
    var routeDefinition = {
      templateUrl: 'static/project/project.html',
      controller: 'ProjectCtrl',
      controllerAs: 'vm',
      resolve: {
        project: ['$route', 'projectServices',
          function($route, projectServices) {
            var routeParams = $route.current.params;
            return projectServices.getByProjectId(routeParams.projectid);
          }]
      }
    };

    $routeProvider.when('/home/projects/:projectid', routeDefinition);

}]);



app.factory('homeFactory', function () {

	// var self = this;

	// self.byProjects = true;

	// self.setProjects = function () {
	// 	self.byProjects = true;
	// }

	// self.setCategories = function () {
	// 	console.log('cats')
	// 	self.byProjects = false;
	// 	console.log('cats')
	// 	console.log(self.byProjects)
	// }

	var byProjects = true;

	'use strict';

	return {
		byProjects: function () {
			return byProjects;
		},

		setProjects: function () {
			byProjects = true;
		},

		setCategories: function () {
			byProjects = false;
		}

	};

});
app.factory('projectServices', ['$http', '$log',
  function($http, $log) {

    function get(url) {
      return processAjaxPromise($http.get(url));
    }
    function post(url, share) {
      return processAjaxPromise($http.post(url, share));
    }
    function put(url, share) {
      return processAjaxPromise($http.put(url, share));
    }
    function remove(url) {
      return processAjaxPromise($http.delete(url));
    }
    function processAjaxPromise(p) {
      return p.then(function(result) {
        console.log(result.data.data)
        return result.data.data;
      })
      .catch(function(error) {
        $log.log(error);
      });
    }

    return {

      list: function () {
        return get('/api/v1/projects');
      },

      getByProjectId: function(projectId) {
        return get('/api/v1/projects/' + projectId);
      },

    };
  }
]);

// A little string utility... no biggie
app.factory('stringUtil', function() {
    return {
        startsWith: function(str, subStr) {
            str = str || '';
            console.log(str);
            console.log(subStr);
            return str.slice(0, subStr.length) === subStr;
        }
    };
});
app.controller('SubmitCtrl', function () {

	var self = this;

	self.byNew = true;

	self.setNew = function () {
		self.byNew = true;
	}

	self.setPending = function () {
		self.byNew = false;
	}
	
});
(function () {
	app.directive('newProject', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/submit/new-project.html'
	  };
	});
})();
app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);


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
      changeToCat: ['homeFactory',
        function(homeFactory) {
          homeFactory.setCategories();
        }
      ]
    }
  };

  $routeProvider
  .when('/home/categories', homePage)
}]);
app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

	self.setGroups = function () {
		self.byNames = false;
		console.log('hefy')
	}

	self.setNames = function () {
		self.byNames = true;
		console.log('hey')
	}
});
(function () {
	app.directive('homeNames', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-names/home-names.html'
	  };
	});

	app.directive('namesDetails', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-names/names-details.html'
	  };
	});

	app.directive('homeGroups', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/home-groups.html'
	  };
	});
})();
app.factory('homeFactory', function () {

	// var self = this;

	// self.byProjects = true;

	// self.setProjects = function () {
	// 	self.byProjects = true;
	// }

	// self.setCategories = function () {
	// 	console.log('cats')
	// 	self.byProjects = false;
	// 	console.log('cats')
	// 	console.log(self.byProjects)
	// }

	var byProjects = true;

	'use strict';

	return {
		byProjects: function () {
			return byProjects;
		},

		setProjects: function () {
			byProjects = true;
		},

		setCategories: function () {
			byProjects = false;
		}

	};

});
app.controller('hgCtrl', function () {
	
});
app.controller('hnCtrl', function () {
	// var self = this;

	// self.byNames = true;

	// self.setGroups = function () {
	// 	self.byNames = false;
	// 	console.log('hefy')
	// }

	// self.setNames = function () {
	// 	self.byNames = true;
	// 	console.log('hey')
	// }
});
//# sourceMappingURL=app.js.map