app.controller('hnCtrl', ['projects', 'appearFactory', 'projectFactory', function (projects, appearFactory, projectFactory) {
	var self = this;

	self.projects = projects;

	self.checkBox = function () {
    	appearFactory.checkBox();
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