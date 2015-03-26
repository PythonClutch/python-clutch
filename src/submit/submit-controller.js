app.controller('SubmitCtrl', ['activeRoute', 'submitFactory', 'groupServices', 'projectServices',
	function (activeRoute, submitFactory, groupServices, projectServices) {

	var self = this;

	self.byNew = true;

	self.newProject = {};

	self.categories;

	groupServices.listCats().then(function (result) {
		self.categories = result;
		console.log(result);
	})

	self.createProject = function () {
		console.log(self.newProject);
		projectServices.addProject(self.newProject);
		self.newProject = {};
		console.log(self.newProject);
	}

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