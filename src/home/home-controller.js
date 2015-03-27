app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
	'categories', 'user', 'likeFactory',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices, categories, user, likeFactory) {
	var self = this;

	self.categories = categories;

	self.projects = projects;

	self.groups = groups;

	self.projectNumber = projects.length;

	self.searchChange = function () {
		var paragraphAmt = $(event.target).closest('home-names').find('.pagination-div p');
		if ($(event.target).val() !== '') {
			paragraphAmt.hide();
		} else {
			paragraphAmt.show();
		}
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

    self.rotate = appearFactory.rotate();

    self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
	};

	// self.likeNumber = projects;
	// console.log(self.likeNumber)

	self.like = function (proj, likes) {
		// self.likeNumber = proj.user_likes;
		// console.log(self.likeNumber);
		likeFactory.like(proj, likes, user);
		// projectServices.like(proj.id).then(function (array) {
		// 	console.log(array);
		// 	// console.log(self.likeNumber);
		// 	// self.likeNumber
		// })	
		self.checkLike(proj);
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