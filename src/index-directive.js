(function () {
	'use strict';

	app.directive('navBar', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/nav/nav.html',
			controllerAs: 'vm',
			controller: 'NavCtrl'
		};
	});





})();