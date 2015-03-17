app.controller('HomeCtrl', ['homeFactory', 'projects', function (homeFactory, projects) {
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
}]);