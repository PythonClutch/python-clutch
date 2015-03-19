app.controller('SubmitCtrl', function () {

	var self = this;

	self.byNew = true;

	self.setNew = function () {
		self.byNew = true;
	};

	self.setPending = function () {
		self.byNew = false;
	};
	
});