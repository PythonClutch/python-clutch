app.controller('NavCtrl', ['$location', function ($location) {

	var self = this;

	self.toProject = function () {
		console.log('works');
		if (window.location.href === 'http://localhost:5000/#/home') {
			console.log('true');
			window.location.href = 'http://localhost:5000/#/home' + '/projects';
		}
	};

	console.log('is this real life?');

	self.isActive = function (path) {
	  // The default route is a special case.
	  if (path === '/') {
	    return $location.path() === '/';
	  }

	  return function () {
	  	// $location.path() = $location.path() || '';
        return $location.path().slice(0, path.length) === path;
	  };
	};

}]);
