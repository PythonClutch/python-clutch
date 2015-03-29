app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
	'categories', 'user', 'likeFactory', 'appearFactory',
	function (homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices, categories, user, likeFactory, appearFactory) {
	var self = this;

	self.categories = categories;

	console.log(projects);

	self.projects = projects;

	self.changeTrue = function () {
		appearFactory.changeTrue();
	}

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