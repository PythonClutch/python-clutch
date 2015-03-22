app.controller('HomeCtrl', ['homeFactory', 'projects', 'stringUtil', '$location', 'projectFactory', 
	function (homeFactory, projects, stringUtil, $location, projectFactory) {
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
      if (path === '/') {
        return $location.path() === '/';
      }
      
      return stringUtil.startsWith($location.path(), path);
    };

    self.checkBox = function () {
    	var target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
		if (target.prop('checked')) {
			target.prop('checked', false);
		} else {
			target.prop('checked', true);
		}
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

}]);