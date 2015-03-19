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