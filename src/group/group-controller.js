app.controller('GroupCtrl', ['projects', 'group', 'projectFactory', 'appearFactory', function (projects, group, projectFactory, appearFactory) {
	var self = this;

	self.projects = projects;

	self.group = group;
	
	console.log(group.projects);

	self.rotate = appearFactory.rotate();

    self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
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