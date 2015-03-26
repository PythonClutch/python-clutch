app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
	'categories',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices, categories) {
	var self = this;

	self.categories = categories;
	console.log(categories);

	self.projects = projects;

	self.groups = groups;

	self.byProjects = homeFactory.byProjects();

	self.setProjects = function () {
		homeFactory.setProjects();
		self.byProjects = homeFactory.byProjects();
	};

	self.setCategories = function () {
		homeFactory.setCategories();
		self.byProjects = homeFactory.byProjects();
	};

	// self.toProject = function () {
	// 	if (window.location.href === 'http://localhost:5000/#/home') {
	// 		window.location.href = 'http://localhost:5000/#/home' + '/projects';
	// 	};
	// }

    self.isActive = function (path) {
      // The default route is a special case.
      return activeRoute.isActive(path);
    };

    self.rotate = appearFactory.rotate();

    self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
	};

	self.likedHeart = false;

	self.like = function (id) {
		self.likedHeart = true;
		var target = $(event.target);
		if (target.hasClass('fa-heart-o')) {
			target.removeClass('fa-heart-o');		
		} else {
			target.addClass('fa-heart-o');
			self.likedHeart = false;
		}
		projectServices.like(id);
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