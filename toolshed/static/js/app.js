// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute', 'angularUtils.directives.dirPagination']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);


// searchChange = function () {
// 	console.log('changed')
// }
app.controller('IndexCtrl', function () {
	console.log($('.home-project-search'));

	self.loggedIn = true;
});
(function () {
	'use strict';

	app.directive('navBar', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/nav/nav.html',
			controllerAs: 'vm',
			controller: 'NavCtrl'
		};
	});

	app.directive('footerBar', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/footer/footer.html',
			controllerAs: 'vm',
			controller: 'FooterCtrl'
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
          return projectServices.listPopular();
        }
      ],
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
  .when('/', homePage)
  .when('/home', homePage)
  .when('/home/projects', homePage)
  // .when('/home/search', homePage)
  .when('/submit', {
    templateUrl: 'static/submit/submit.html',
    controller: 'SubmitCtrl',
    controllerAs: 'vm'
  })
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




$(function () {
	// console.log(document.querySelector('.comment-content-section'))
	$('.comment-content-section').onclick = function () {
		console.log('hey')
	};
});
app.controller('AccountCtrl', ['activeRoute', 'accountFactory', 'appearFactory', 'projectFactory', 'user', 'userServices',
	function (activeRoute, accountFactory, appearFactory, projectFactory, user, userServices) {
	var self = this;

	self.byInfo = accountFactory.byInfo();

	self.byEdit = accountFactory.byEdit();

	self.user = user.data;

	self.accountUrls = {};

	self.postEdit = function () {
		console.log('post');
		console.log(self.accountUrls);
		userServices.addUserUrls(self.accountUrls);
		self.accountUrls = {};
	}

	self.setInfo = function () {
		accountFactory.setInfo();
		self.byInfo = accountFactory.byInfo();
		self.byEdit = accountFactory.byEdit();
	};

	self.setActivity = function () {
		accountFactory.setActivity();
		self.byInfo = accountFactory.byInfo();
		self.byEdit = accountFactory.byEdit();
	};

	self.isActive = function (path) {
      return activeRoute.isActive(path);
    };

    self.setEdit = function () {
    	accountFactory.setEdit();
    	self.byEdit = accountFactory.byEdit();
    }

    self.chooseImg = function () {
    	
    }

    self.checkBox = function () {
    	console.log('checked')
    	appearFactory.checkBox();
    }

    var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};

}]);
(function () {
	app.directive('accountActivity', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-activity/account-activity.html'
	  };
	});

	app.directive('accountInfo', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-info.html'
	  };
	});

	app.directive('editAccount', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/edit-account.html'
	  };
	});

	app.directive('activityProjects', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-activity/activity-projects.html'
	  };
	});

	app.directive('activityFeatured', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/account/account-activity/activity-featured.html'
	  };
	});
})();
app.config(['$routeProvider', function ($routeProvider) {
  'use strict';

  var accountPage = {
    templateUrl: 'static/account/account.html',
    controller: 'AccountCtrl',
    controllerAs: 'vm',
    resolve: {
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
        }
      ],
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
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
        }
      ],
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
      user: ['userServices',
        function(userServices) {
          return userServices.currentUser();
        }
      ],
      changeToAct: ['accountFactory',
        function(accountFactory) {
          accountFactory.setEdit();
        }
      ]
    }
  });

}]);
app.controller('FooterCtrl', ['projectServices', 'groupServices', function (projectServices, groupServices) {
	var self = this;

	projectServices.list().then(function (result) {
		self.projects = result;
	});

	groupServices.listCats().then(function (result) {
		self.categories = result;
	})

	groupServices.listGroups().then(function (result) {
		self.groups = result;
	})

	self.setPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	};

	self.bySiteMap = function () {
		if (window.location.hash === '#/projectindex') {
			return true;
		} else {
			return false;
		}
	};

	self.byAbout = function () {
		if (window.location.hash === '#/about') {
			return true;
		} else {
			return false;
		}
	};

	self.byContact = function () {
		if (window.location.hash === '#/contact') {
			return true;
		} else {
			return false;
		}
	};
}]);
(function () {
	app.directive('siteMap', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/site-map.html'
	  };
	});

	app.directive('about', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/about.html'
	  };
	});

	app.directive('contact', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/contact.html'
	  };
	});
})();
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
app.controller('GroupCtrl', ['group', 'projectFactory', 'appearFactory', 'graph',
	function (group, projectFactory, appearFactory, graph) {
	var self = this;
	self.group = group;
	
	console.log(group.projects);

	self.rotate = appearFactory.rotate();

    self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
	};

	var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.setPage = function () {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};

	function parse(spec) {
		vg.parse.spec(spec, function(chart) { 
			// function graphing (argument) {
			// 	// body...
			// }
			chart({el:".graph"}).width(document.querySelector('.graph').offsetWidth - 70).height(210).renderer("svg").update(); 
			if (window.innerWidth < 400) {
				chart({el:".graph"}).width(400).viewport([document.querySelector('.graph').offsetWidth, 249]).height(210).renderer("svg").update();
			}
		});
	}
	parse(graph);

}]);
app.config(['$routeProvider', function($routeProvider) {    
    var routeDefinition = {
      templateUrl: 'static/group/group.html',
      controller: 'GroupCtrl',
      controllerAs: 'vm',
      resolve: {
        graph: ['$route', 'groupServices',
          function($route, groupServices) {
            var routeParams = $route.current.params;
            return groupServices.getGraphByGroupId(routeParams.groupid);
          }
        ],
        group: ['$route', 'groupServices',
          function($route, groupServices) {
            var routeParams = $route.current.params;
            return groupServices.getByGroupId(routeParams.groupid);
          }
        ]
      }
    };

    $routeProvider.when('/home/groups/:groupid', routeDefinition);

}]);
app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
	'categories', 'user', 'likeFactory', 'appearFactory',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices, categories, user, likeFactory, appearFactory) {
	var self = this;

	self.categories = categories;

	self.projects = projects;

	self.changeTrue = function () {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		appearFactory.changeTrue();
	}

	self.groups = groups;

	console.log(categories)

	self.projectNumber = projects.length;

	self.searchChange = function () {
		var paragraphAmt = $(event.target).closest('home-names').find('.pagination-div p');
		if ($(event.target).val() !== '') {
			paragraphAmt.hide();
		} else {
			paragraphAmt.show();
		}
	}	

	self.setPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	self.byProjects = homeFactory.byProjects();

	self.setProjects = function () {
		homeFactory.setProjects();
		self.byProjects = homeFactory.byProjects();
	};

	self.setCategories = function () {
		homeFactory.setCategories();
		self.byProjects = homeFactory.byProjects();
	};


    self.isActive = function (path) {
      return activeRoute.isActive(path);
    };

    self.startsWith = function (path) {
      return activeRoute.startsWith(path);
    }

    // self.rotate = appearFactory.rotate();

 //    self.checkBox = function () {
 //    	appearFactory.checkBox();
 //    	self.rotate = appearFactory.rotate();
	// };

	self.like = function (proj, likes) {
		likeFactory.like(proj, likes, user);	
	};

	self.checkLike = function (project) {
		return likeFactory.checkLike(project, user);
	};

	var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};

	self.searchClicked = true;

	self.checkSearch = function () {
		self.searchClicked = false;
		$(event.target).parent().find('.home-project-search').focus();
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

	app.directive('pagination', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/pagination/pagination.html',
		};
	});

})();
$(function () {
	console.log('test');

	$('.home-category-tab').on('click', function () {
		console.log('hey');
		console.log($('#tab-category'));
		$('#tab-category').attr('checked', true);
	});

	console.log(window.location.href);

	if (window.location.href === 'http://localhost:5000/#/home') {
		window.location.href = 'http://localhost:5000/#/home' + '/projects';
	}

});
app.controller('NavCtrl', ['$location', 'userServices', 'projectServices',
	function ($location, userServices, projectServices) {

	var self = this;

	self.loggedIn = true;

	self.currentUser;

	self.word = '';

	self.searchProjects = function () {
		window.location.hash = "home/search/" + self.word;
	}

	function checkLogIn () {
		userServices.currentUser().then(function (result) {
			self.currentUser = result;
			if (self.currentUser) {
				console.log('one');
				if (self.currentUser.status === "success") {
					self.loggedIn = true;
				} else {
					self.loggedIn = false;
				}
			} else {
				self.loggedIn = false;
			}
		}, function (err) {
			self.loggedIn = false;
		});
	}

	self.checkUser = function () {
		checkLogIn();
	}

	checkLogIn();

}]);

app.controller('ProjectCtrl', ['project', 'projectFactory', 'projectServices', 'user', 'likeFactory', 'graph',
	function (project, projectFactory, projectServices, user, likeFactory, graph) {

	var self = this;

	self.project = project;

	self.graph = graph;

	var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.setCommentPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 1100 }, 'fast');
	}

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};

	self.comments = project.comments;
	console.log(self.comments);

	self.comment = {};

	console.log(user);
	
	self.addComment = function () {
		console.log(self.comment);
		console.log(self.project.id);
		projectServices.addComment(self.project.id, self.comment);
		var tempComment = {
			'created_display': 'seconds ago',
			'project_id': project.id,
			'text': self.comment.text,
			'user_avatar': user.data.avatar_url,
			'user_id': user.data.id,
			'user_name': user.data.github_name
		}
		self.comments.push(tempComment);
		console.log(self.comments);
		self.comment = {};
	};

	self.like = function (proj, likes) {
		likeFactory.like(proj, likes, user);	
	};

	self.checkLike = function (project) {
		return likeFactory.checkLike(project, user);
	};

	function parse(spec) {
		vg.parse.spec(spec, function(chart) { 
			// function graphing (argument) {
			// 	// body...
			// }
			chart({el:".graph"}).width(document.querySelector('.graph').offsetWidth - 70).height(210).renderer("svg").update(); 
			if (window.innerWidth < 400) {
				chart({el:".graph"}).width(400).viewport([document.querySelector('.graph').offsetWidth, 249]).height(210).renderer("svg").update();
			}
		});
	}
	parse(graph);


}]);
(function () {
	app.directive('projectComments', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/project/project-comments.html'
	  };
	});
})();
app.config(['$routeProvider', function($routeProvider) {    
    var routeDefinition = {
      templateUrl: 'static/project/project.html',
      controller: 'ProjectCtrl',
      controllerAs: 'vm',
      resolve: {
        user: ['userServices',
          function(userServices) {
            return userServices.currentUser();
          }
        ],
        project: ['$route', 'projectServices',
          function($route, projectServices) {
            var routeParams = $route.current.params;
            return projectServices.getByProjectId(routeParams.projectid);
          }
        ],
        graph: ['$route', 'projectServices',
          function($route, projectServices) {
            var routeParams = $route.current.params;
            return projectServices.getGraphByProjectId(routeParams.projectid);
          }
        ],
      }
    };

    $routeProvider
    .when('/projects/:projectid', routeDefinition)
    .when('/home/projects/:projectid', routeDefinition);

}]);



app.factory('activeRoute', ['stringUtil', '$location', function (stringUtil, $location) {

	'use strict';

	return {

		isActive: function (path) {
	      // The default route is a special case.
	      if (path === '/') {
	        return $location.path() === '/';
	      }
	      
	      return stringUtil.isOnly($location.path(), path);
	    },

	    startsWith: function (path) {
	      // The default route is a special case.
	      if (path === '/') {
	        return $location.path() === '/';
	      }
	      
	      return stringUtil.startsWith($location.path(), path);
	    }

	};

}]);
app.factory('appearFactory', function () {

	'use strict';

	var target;
	var targetScore;
	var rotated = true;
	function rotateThis () {
		rotated = true;
	}
	setInterval(rotateThis, 5000);

	return {

		screenWidth: function () {
			console.log($(window).width());
		},

		rotate: function () {
			console.log(rotated);
			return rotated;
		},

		checkBox: function (target) {
			target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
			targetScore = $(event.target).parent().find('.home-project-basic-info-score');
			if (target.prop('checked')) {
				target.prop('checked', false);
				// targetScore.css({
				// 	'margin-right': 0
				// });
			} else {
				target.prop('checked', true);
				// targetScore.css({
				// 	'margin-right': '10px'
				// });
			}
			if (target.prop('checked')) {
				rotated = false;
			} else {
				rotated = true;
			}
		},

		changeTrue: function () {
			rotated = true;
		}

	};

});
app.filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});
app.factory('groupServices', ['$http', '$log',
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
        return result.data.data;
      })
      .catch(function(error) {
        $log.log(error);
      });
    }

    var groups;
    var categories;

    return {

      getByGroupId: function (groupId) {
        return get('/api/v1/groups/' + groupId);
      },

      getGraphByGroupId: function (groupId) {
        return get('/api/v1/groups/' + groupId + '/graph');
      },

      listGroups: function () {
        groups = groups || get('/api/v1/groups');
        return groups;
      },

      listCats: function () {
        categories = categories || get('/api/v1/categories');
        return categories;
      }

    };
  }
]);
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
app.factory('likeFactory', ['projectServices', function (projectServices) {

	'use strict';

	return {
		like: function (proj, likes, user) {
			self.likedHeart = true;

			var target = $(event.target);
			var likedId;
			var likeArray = likes;
			var checkUserMatch = function () {
				for (var i = likeArray.length - 1; i >= 0; i--) {
					if (likeArray[i].user_id === user.data.id) {
						likedId = likeArray[i].id;
						// likeArray.push({'user_id': user.data.id})
						console.log(likedId);
						return true;
					} else {
						return false;
					}
				};
			};
			var likeAmount = likeArray.length;
			if (checkUserMatch()) {
				target.addClass('fa-heart-o');	
				likeAmount -= 1
				target.parent().find('p').text(likeAmount);
				projectServices.removeLike(likedId).then(function (array) {
					likeArray.pop(array);
				})	
			} else {
				target.removeClass('fa-heart-o');
				target.addClass('fa-heart');
				console.log(likes);
				likeAmount += 1
				target.parent().find('p').text(likeAmount);
				projectServices.like(proj.id).then(function (array) {
					likeArray.push(array);
				})
			}
		},

		checkLike: function (project, user) {
			for (var i = project.user_likes.length - 1; i >= 0; i--) {
				if (project.user_likes[i].user_id === user.data.id) {
					return true;
				} else {
					return false;
				}
			};
		}
	};

}]);
app.factory('projectFactory', function () {

	'use strict';

	var pyMoreInfo = false;
	var ghMoreInfo = false;
	var target;

	return {

		byPy: function () {
			return pyMoreInfo;
		},

		byGh: function () {
			return ghMoreInfo;
		},

		pyInfo: function () {
			if (pyMoreInfo === true) {
				pyMoreInfo = false;
			} else {
				pyMoreInfo = true;
			};
		},

		ghInfo: function () {
			if (ghMoreInfo === true) {
				ghMoreInfo = false;
			} else {
				ghMoreInfo = true;
			}
			target = $(event.target).parent().parent().parent().find('.gh-checkbox');
			if (target.prop('checked')) {
				target.prop('checked', false);
			} else {
				target.prop('checked', true);
			};
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
        return result.data.data;
      })
      .catch(function(error) {
        $log.log(error);
      });
    }

    var projects;
    var projectsNewest;
    var projectsPopular;
    var searchedProjects;

    return {

      list: function () {
        projects = projects || get('/api/v1/projects');
        return projects;
      },

      getGraphByProjectId: function (projectId) {
        return get('/api/v1/projects/' + projectId + '/graph');
      },

      listNewest: function () {
        projectsNewest = projectsNewest || get('/api/v1/projects/newest');
        return projectsNewest;
      },

      listPopular: function () {
        projectsPopular = projectsPopular || get('/api/v1/projects/popular');
        return projectsPopular;
      },

      getByProjectId: function(projectId) {
        return get('/api/v1/projects/' + projectId);
      },

      like: function (projectId) {
        return post('/api/v1/likes/projects/' + projectId);
      },

      removeLike: function (likedId) {
        return remove('/api/v1/likes/' + likedId);
      },

      addProject: function (project) {
        return post('/api/v1/projects', project);
      },

      addComment: function (projectId, comment) {
        return post('/api/v1/projects/' + projectId +'/comments', comment);
      },

      searchProjects: function (word) {
        console.log(word);
        return get('/api/v1/search?q="' + word + '"');
      }

    };
  }
]);

// A little string utility... no biggie
app.factory('stringUtil', function() {
    return {
        isOnly: function(str, subStr) {
            str = str || '';
            return str === subStr;
        },
        
        startsWith: function(str, subStr) {
            str = str || '';
            return str.slice(0, subStr.length) === subStr;
        }
    };
});
app.factory('userServices', ['$http', '$q',
    function($http, $q) {
        function get(url) {
          return processAjaxPromise($http.get(url));
        }
        function post(url, user) {
          return processAjaxPromise($http.post(url, user));
        }
        function remove(url) {
          return processAjaxPromise($http.delete(url));
        }
        function processAjaxPromise(p) {
          return p.then(function(result) {
            console.log(result.data);
            return result.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        }

        var currentUser;

        return {
            list: function() {
                return get('/api/v1/users');
            },

            getByUserId: function(userId) {
                if (!userId) {
                    throw new Error('getByUserId requires a user id');
                }

                return get('/api/v1/users/' + userId);
            },

            currentUser: function() {
                currentUser = currentUser || get('/api/v1/user');
                return currentUser;
            },

            addUserUrls: function(urls) {
                return post('/api/v1/user', urls)
            },

            // login: function (user) {
            //     // console.log(user);
            //     return post('/api/login', user)
            // }

            // api/register
            // api/login
        };
    }
]);
app.controller('SubmitCtrl', ['activeRoute', 'submitFactory', 'groupServices', 'projectServices', 'user',
	function (activeRoute, submitFactory, groupServices, projectServices, user) {

	var self = this;

	self.byNew = true;
	self.user = user.data;
	console.log(user.data.pending_submissions);

	self.newProject = {};

	self.createProject = function () {
		console.log(self.newProject);
		projectServices.addProject(self.newProject);
		self.newProject = {};
		console.log(self.newProject);
	};

	self.setNew = function () {
		self.byNew = true;
	};

	self.setPending = function () {
		self.byNew = false;
	};

	self.isActive = function (path) {
      return activeRoute.isActive(path);
    };

    var sf = submitFactory;

    self.byNew = sf.byNew();

	self.byEdit = sf.byEdit();

	self.setNew = function () {
		sf.setNew();
		self.byNew = sf.byNew();
		self.byEdit = sf.byEdit();
	};

	self.setPending = function () {
		sf.setPending();
		self.byNew = sf.byNew();
		self.byEdit = sf.byEdit();
	};
	
}]);
(function () {
	app.directive('newProject', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/submit/new-project.html'
	  };
	});
})();
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
app.factory('accountFactory', function () {

	'use strict';

	var byInfo = true;

	var byEdit = false;

	return {
		
		byInfo: function () {
			return byInfo;
		},

		byEdit: function () {
			return byEdit;
		},

		setInfo: function () {
			byInfo = true;
			byEdit = false;
		},

		setActivity: function () {
			byInfo = false;
			byEdit = false;
		},

		setEdit: function () {
			byEdit = true;
		}

	};

});
app.controller('Error404Ctrl', ['$location', function ($location) {
  this.message = 'Could not find: ' + $location.url();
}]);

(function () {
	app.directive('homeCategories', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/home-categories.html'
			// resolve: {
			//   groups: ['groupServices',
		 //        function(groupServices) {
		 //          return groupServices.list();
		 //        }
		 //      ],
		 //      categories: ['groupServices',
		 //        function(groupServices) {
		 //          return groupServices.listCats();
		 //        }
		 //      ],
		 //    },
		    // controller: 'CategoryCtrl',
		    // controllerAs: 'vm',

		};
	});

	app.directive('homeCatFilters', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/home-cat-filters.html'
		};
	});

	app.directive('categoryDetails', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/category-details.html',
			// scope: {category: '='},
			// controller: 'testctrl',
			// controllerAs: 'vm'
		};
	});

	app.directive('catDetailsGroups', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/cat-details-groups.html'
		};
	});
})();
app.controller('CategoryCtrl', ['appearFactory', function (appearFactory) {
	var self = this;

	self.rotate = appearFactory.rotate();
	
	self.checkBox = function () {
    	appearFactory.checkBox();
	};
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
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        // named module does not exist, so create one
        module = angular.module(moduleName, []);
    }

    module
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:[^|]*/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            paginationService.setCollectionLength(paginationId, collection.length);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === Node.ELEMENT_NODE) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === Node.ELEMENT_NODE) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // if the current-page attribute was not set, we'll make our own
                var defaultCurrentPage = paginationId + '__currentPage';
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        return {
            restrict: 'AE',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            },
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                throw 'pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive.';
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch(function() {
                return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                return (paginationService.getItemsPerPage(paginationId));
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                return paginationService.getCurrentPage(paginationId);
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (isValidPageNumber(num)) {
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            function goToPage(num) {
                if (isValidPageNumber(num)) {
                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as an argument
                    if (scope.onPageChange) {
                        scope.onPageChange({ newPageNumber : num });
                    }
                }
            }

            function generatePagination() {
                var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;

                scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                scope.pagination.current = page;
                scope.pagination.last = scope.pages[scope.pages.length - 1];
                if (scope.pagination.last < scope.pagination.current) {
                    scope.setCurrent(scope.pagination.last);
                } else {
                    updateRangeValues();
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                var currentPage = paginationService.getCurrentPage(paginationId),
                    itemsPerPage = paginationService.getItemsPerPage(paginationId),
                    totalItems = paginationService.getCollectionLength(paginationId);

                scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                scope.range.total = totalItems;
            }

            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (collection instanceof Array) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                return collection.slice(start, end);
            } else {
                return collection;
            }
        };
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'static/home/pagination/dirPagination.tpl.html';

        this.setPath = function(path) {
            templatePath = path;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    }
})();
app.controller('hpCtrl', ['projectServices', 'appearFactory', function (projectServices, appearFactory) {
	var self = this;

	self.byNames = true;

	self.rotate = appearFactory.rotate();

	// function checkRotate () {
	// 	self.rotate = appearFactory.rotate();
	// }

	// setInterval(checkRotate, 1000);

	self.mobile = true;

	// function screenWidth () {
	// 	console.log(screenWidth);
	// };

	// appearFactory.checkWidth();

	self.setCommentPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 1100 }, 'fast');
	}

	self.setPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
	};

	projectServices.listNewest().then(function (result){
		self.newestProjects = result;
	});

	projectServices.list().then(function (result){
		self.listProjects = result;
	});

	self.setGroups = function () {
		self.byNames = false;
	};

	self.setNames = function () {
		self.byNames = true;
	};

	function selectedClass () {
		var closest = $(event.target).parent().parent().children();
		console.log(closest);
		closest.each(function () {
			var fa = $(this).find('.fa');
			$(this).find('.fa').removeClass('fa-dot-circle-o');
			console.log($(this).find('.project-radio')[0]);
			$(this).find('.project-radio').prop('checked', false);
			if (!fa.hasClass('fa-circle-o')) {
				fa.addClass('fa-circle-o');
			}
		});
		$(event.target).parent().find('.fa').removeClass('fa-circle-o');
		$(event.target).parent().find('.fa').addClass('fa-dot-circle-o');
	}

	self.list = false;
	self.popular = true;
	self.newest = false;
	self.searched = false;

	self.setPopular = function () {
		selectedClass();
		self.popular = true;
		self.newest = false;
		self.list = false;
		self.searched = false;
		$('#project-popular-radio').prop('checked', true);
	};

	self.setNewest = function () {
		self.popular = false;
		self.newest = true;
		self.list = false;
		self.searched = false;
		selectedClass();
		$('#project-newest-radio').prop('checked', true);
	};

	self.setSearch = function () {
		console.log('eh');
	}

	self.setTrending = function () {
		selectedClass();
		$('#project-trending-radio').prop('checked', true);
	};

	self.setList = function () {
		self.popular = false;
		self.newest = false;
		self.list = true;
		selectedClass();
		$('#project-list-radio').prop('checked', true);
	};

	self.searchClicked = true;

	self.checkSearch = function () {
		self.searchClicked = false;
		$(event.target).parent().find('.home-project-search').focus();
	};



}]);
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
	    templateUrl: 'static/home/home-projects/home-names/names-details.html',
	    // resolve: {
	    //   projects: ['projectServices',
	    //     function(projectServices) {
	    //       return projectServices.list();
	    //     }
	    //   ]
	    // },
	    // controller: 'hnCtrl',
	    // controllerAs: 'vm'
	    controller: 'hpCtrl',
	    controllerAs: 'hp'
	  };
	});

	app.directive('homeGroups', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/home-groups.html'
	  };
	});

	app.directive('groupDetails', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/group-details.html',
	    controller: 'hpCtrl',
	    controllerAs: 'hp'
	  };
	});	

	app.directive('groupDetailsProjects', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/group-details-projects.html'
	  };
	});

	app.directive('homeFilters', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-filters.html'
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
app.factory('submitFactory', function () {

	'use strict';

	var byNew = true;

	var byEdit = false;

	return {
		
		byNew: function () {
			return byNew;
		},

		byEdit: function () {
			return byEdit;
		},

		setNew: function () {
			byNew = true;
			byEdit = false;
		},

		setPending: function () {
			byNew = false;
			byEdit = false;
		},

		setEdit: function () {
			byEdit = true;
		}

	};

});
app.controller('hgCtrl', ['group', function (group) {
	var self = this;

	self.group = group;

	console.log(group);



}]);
app.controller('hnCtrl', ['projects', 'appearFactory', 'projectFactory', function (projects, appearFactory, projectFactory) {
	var self = this;

	self.projects = projects;

	self.checkBox = function () {
    	appearFactory.checkBox();
	};

	var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};


}]);
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
          return projectServices.searchProjects(routeParams.word).then(function (results) {
            console.log(results.projects);
            return results.projects;
          });
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




//# sourceMappingURL=app.js.map