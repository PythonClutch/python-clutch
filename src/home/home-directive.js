(function () {
	'use strict';

	// app.directive('homeGroups', function () {
	// 	return {
	// 		restrict: 'E',
	// 		templateUrl: 'static/home/home-groups/home-groups.html'
	// 	};
	// });

	app.directive('homeProjects', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-projects/home-projects.html'
		};
	});

	app.directive('pagination', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/pagination/pagination.html',
		};
	});

})();