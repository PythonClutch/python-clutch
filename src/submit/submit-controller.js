app.controller('SubmitCtrl', ['activeRoute', 'submitFactory', 'groupServices', 'projectServices', 'user',
	function (activeRoute, submitFactory, groupServices, projectServices, user) {

	var self = this;

	self.byNew = true;
	self.user = user;
	console.log(user.pending_submissions);

	self.newProject = {};

	groupServices.listCats().then(function (result) {
		self.categories = result;
		console.log(result);
	});

	self.createProject = function () {
		console.log(self.newProject);
		projectServices.addProject(self.newProject);
		self.newProject = {};
		console.log(self.newProject);
	};

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