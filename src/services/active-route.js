app.factory('activeRoute', ['stringUtil', '$location', function (stringUtil, $location) {

	'use strict';

	return {

		isActive: function (path) {
	      // The default route is a special case.
	      if (path === '/') {
	        return $location.path() === '/';
	      }
	      
	      return stringUtil.startsWith($location.path(), path);
	    }

	};

}]);