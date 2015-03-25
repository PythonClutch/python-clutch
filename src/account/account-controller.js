app.controller('AccountCtrl', ['activeRoute', 'accountFactory', 'appearFactory', 'projectFactory',
	function (activeRoute, accountFactory, appearFactory, projectFactory) {
	var self = this;

	self.byInfo = accountFactory.byInfo();

	self.byEdit = accountFactory.byEdit();

	self.setInfo = function () {
		accountFactory.setInfo();
		self.byInfo = accountFactory.byInfo();
		self.byEdit = accountFactory.byEdit();
	};

	self.setActivity = function () {
		accountFactory.setActivity();
		self.byInfo = accountFactory.byInfo();
		self.byEdit = accountFactory.byEdit();
	};

	self.isActive = function (path) {
      return activeRoute.isActive(path);
    };

    self.setEdit = function () {
    	accountFactory.setEdit();
    	self.byEdit = accountFactory.byEdit();
    }

    self.chooseImg = function () {
    	
    }

    self.checkBox = function () {
    	console.log('checked')
    	appearFactory.checkBox();
    }

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