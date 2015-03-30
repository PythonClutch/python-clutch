app.controller('FooterCtrl', ['projectServices', 'groupServices', function (projectServices, groupServices) {
	var self = this;

	projectServices.list().then(function (result) {
		self.projects = result;
	});

	groupServices.listCats().then(function (result) {
		self.categories = result;
	})

	groupServices.listGroups().then(function (result) {
		self.groups = result;
	})

	self.setPage = function () {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	self.bySiteMap = function () {
		if (window.location.hash === '#/projectindex') {
			return true;
		} else {
			return false;
		}
	};

	self.byAbout = function () {
		if (window.location.hash === '#/about') {
			return true;
		} else {
			return false;
		}
	};

	self.byContact = function () {
		if (window.location.hash === '#/contact') {
			return true;
		} else {
			return false;
		}
	};
}]);