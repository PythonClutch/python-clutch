app.controller('ProjectCtrl', ['project', 'projectFactory', 'projectServices', function (project, projectFactory, projectServices) {

	var self = this;

	self.project = project;

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

	self.comment = {};
	
	self.addComment = function () {
		console.log(self.comment);
		console.log(self.project.id);
		projectServices.addComment(self.project.id, self.comment);
		self.comment = {};
	};

}]);