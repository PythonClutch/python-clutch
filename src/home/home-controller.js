app.controller('HomeCtrl', function () {
	var self = this;

	self.byProjects = true;

	self.setProjects = function () {
		self.byProjects = true;
	}

	self.setCategories = function () {
		self.byProjects = false;
	}
});