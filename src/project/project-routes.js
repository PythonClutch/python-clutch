app.config(['$routeProvider', function($routeProvider) {    
    var routeDefinition = {
      templateUrl: 'static/project/project.html',
      controller: 'ProjectCtrl',
      controllerAs: 'vm',
      resolve: {
        project: ['$route', 'projectServices',
          function($route, projectServices) {
            var routeParams = $route.current.params;
            return projectServices.getByProjectId(routeParams.projectid);
          }]
      }
    };

    $routeProvider.when('/home/projects/:projectid', routeDefinition);

}]);


