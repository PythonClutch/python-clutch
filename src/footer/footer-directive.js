(function () {
	app.directive('siteMap', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/site-map.html'
	  };
	});

	app.directive('about', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/about.html'
	  };
	});

	app.directive('contact', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/footer/footer-pages/about.html'
	  };
	});
})();