app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory) {
	var self = this;

	self.projects = projects;

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

    self.checkBox = function () {
    	appearFactory.checkBox();
	};

	self.likedHeart = false;

	self.like = function () {
		self.likedHeart = true;
		var target = $(event.target);
		console.log(target);
		if (target.hasClass('fa-heart-o')) {
			target.removeClass('fa-heart-o');		
		} else {
			target.addClass('fa-heart-o');
			self.likedHeart = false;
		}
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

	self.left = function () {
		console.log(self.projects);
		console.log('left')
	};

	self.right = function () {
		console.log('right')
	};

}]);