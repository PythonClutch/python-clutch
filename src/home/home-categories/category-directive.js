(function () {
	app.directive('homeCategories', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/home-categories.html'
			// resolve: {
			//   groups: ['groupServices',
		 //        function(groupServices) {
		 //          return groupServices.list();
		 //        }
		 //      ],
		 //      categories: ['groupServices',
		 //        function(groupServices) {
		 //          return groupServices.listCats();
		 //        }
		 //      ],
		 //    },
		    // controller: 'CategoryCtrl',
		    // controllerAs: 'vm',

		};
	});

	app.directive('homeCatFilters', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/home-cat-filters.html'
		};
	});

	app.directive('categoryDetails', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/category-details.html',
			// scope: {category: '='},
			// controller: 'testctrl',
			// controllerAs: 'vm'
		};
	});

	app.directive('catDetailsGroups', function () {
		return {
			restrict: 'E',
			templateUrl: 'static/home/home-categories/category-details/cat-details-groups.html'
		};
	});
})();