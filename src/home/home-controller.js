app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
	'categories', 'user', 'likeFactory',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices, categories, user, likeFactory) {
	var self = this;

	self.categories = categories;
	console.log(categories);

	self.projects = projects;

	self.groups = groups;
	console.log(groups);

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

}]);