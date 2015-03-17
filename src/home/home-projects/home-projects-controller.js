app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

	self.setGroups = function () {
		self.byNames = false;
	}

	self.setNames = function () {
		self.byNames = true;
	}
});