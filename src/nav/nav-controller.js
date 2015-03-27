app.controller('NavCtrl', ['$location', 'userServices', function ($location, userServices) {

	var self = this;

	self.loggedIn = true;

	self.currentUser;

	function checkLogIn () {
		userServices.currentUser().then(function (result) {
			self.currentUser = result;
			if (self.currentUser) {
				console.log('one');
				if (self.currentUser.status === "success") {
					self.loggedIn = true;
				} else {
					self.loggedIn = false;
				}
			} else {
				self.loggedIn = false;
			}
		}, function (err) {
			self.loggedIn = false;
		});
	}

	self.checkUser = function () {
		checkLogIn();
	}

	checkLogIn();

}]);
