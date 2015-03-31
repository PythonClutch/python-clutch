app.controller('SubmitCtrl', ['activeRoute', 'submitFactory', 'groupServices', 'projectServices', 'user',
	function (activeRoute, submitFactory, groupServices, projectServices, user) {

	var self = this;

	self.byNew = true;
	self.user = user.data;
	console.log(user.data.pending_submissions);

	self.newProject = {};

	self.createProject = function () {
		console.log(self.newProject);
		projectServices.addProject(self.newProject);
		self.newProject = {};
		console.log(self.newProject);
		window.location.hash = "#/submit/pending";
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