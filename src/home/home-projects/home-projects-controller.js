app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

	self.setGroups = function () {
		self.byNames = false;
		console.log('hefy')
	}

	self.setNames = function () {
		self.byNames = true;
		console.log('hey')
	}
});