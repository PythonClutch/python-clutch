(function () {
	app.directive('homeNames', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-names/home-names.html'
	  };
	});

	app.directive('namesDetails', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-names/names-details.html'
	  };
	});

	app.directive('homeGroups', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/home-groups.html'
	  };
	});

	app.directive('groupDetails', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/group-details.html'
	  };
	});	

	app.directive('groupDetailsProjects', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-groups/group-details-projects.html'
	  };
	});

	app.directive('homeFilters', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'static/home/home-projects/home-filters.html'
	  };
	});		
})();