app.controller('AccountCtrl', function () {
	var self = this;

	self.byInfo = true;

	self.setInfo = function () {
		self.byInfo = true;
	};

	self.setActivity = function () {
		self.byInfo = false;
	};
});