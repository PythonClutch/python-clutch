app.controller('NavCtrl', ['$location', function ($location) {

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
