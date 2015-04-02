(function() {
	app.directive('accountActivity', function() {
		return {
			restrict: 'E',
			templateUrl: 'static/account/account-activity/account-activity.html'
		};
	});

	app.directive('accountInfo', function() {
		return {
			restrict: 'E',
			templateUrl: 'static/account/account-info.html'
		};
	});

	app.directive('editAccount', function() {
		return {
			restrict: 'E',
			templateUrl: 'static/account/edit-account.html'
		};
	});

	app.directive('activityProjects', function() {
		return {
			restrict: 'E',
			templateUrl: 'static/account/account-activity/activity-projects.html'
		};
	});

	app.directive('activityFeatured', function() {
		return {
			restrict: 'E',
			templateUrl: 'static/account/account-activity/activity-featured.html'
		};
	});
})();