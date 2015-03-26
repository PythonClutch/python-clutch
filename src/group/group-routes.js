app.config(['$routeProvider', function($routeProvider) {    
    var routeDefinition = {
      templateUrl: 'static/group/group.html',
      controller: 'GroupCtrl',
      controllerAs: 'vm',
      resolve: {
        projects: ['projectServices',
          function(projectServices) {
            return projectServices.list();
          }
        ],
        group: ['$route', 'groupServices',
          function($route, groupServices) {
            var routeParams = $route.current.params;
            return groupServices.getByGroupId(routeParams.groupid);
          }
        ]
      }
    };

    $routeProvider.when('/home/groups/:groupid', routeDefinition);

}]);