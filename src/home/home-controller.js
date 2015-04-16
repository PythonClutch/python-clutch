app.controller('HomeCtrl', ['homeFactory', 'projectsCurrent', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
    'categories', 'user', 'likeFactory', 'groupServices',
    function(homeFactory, projectsCurrent, projectFactory, activeRoute, appearFactory, groups, projectServices,
        categories, user, likeFactory, groupServices) {
        var self = this;

        self.categories = categories;

        self.allProjects = false;

        self.projects;
        self.groups = groups;

        function getProjects () {
            return projectServices.projects().then(function (result) {
                self.projects = result;
            });
        };

        function getGroups () {
            return groupServices.groups().then(function (result) {
                self.groups = result;
            });
        };

        getProjects();

        var int = setInterval(function () {
           findProjects(); 
        }, 04);

        var int1 = setInterval(function () { 
           find100Projects();
        }, 04);

        var intG = setInterval(function () {
           findGroups(); 
        }, 10);

        function findProjects () {
            projectServices.projects().then(function (result) {
                if (result.length > 101) {
                    clearInterval(int);
                    getProjects();
                    self.allProjects = true;
                } else {
                    getProjects();
                }
            });
        }

        function find100Projects () {
            projectServices.projects().then(function (result) {
                if (result.length > 26) {
                    clearInterval(int1);
                    getProjects();
                } else {
                    getProjects();
                }
            });
        }

        function findGroups () {
            groupServices.groups().then(function (result) {
                if (result.length > 11) {
                    clearInterval(intG);
                    getGroups();
                } 
            });
        }

        self.changeTrue = function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
            appearFactory.changeTrue();
        };

        self.searchChange = function() {
            var paragraphAmt = $(event.target).closest('home-names').find('.pagination-div p');
            if ($(event.target).val() !== '') {
                paragraphAmt.hide();
            } else {
                paragraphAmt.show();
            }
        };

        self.setPage = function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        };

        self.byProjects = homeFactory.byProjects();

        self.setProjects = function() {
            homeFactory.setProjects();
            self.byProjects = homeFactory.byProjects();
        };

        self.setCategories = function() {
            homeFactory.setCategories();
            self.byProjects = homeFactory.byProjects();
        };


        self.isActive = function(path) {
            return activeRoute.isActive(path);
        };

        self.startsWith = function(path) {
            return activeRoute.startsWith(path);
        };

        self.like = function(proj, likes) {
            likeFactory.like(proj, likes, user);
        };

        self.checkLike = function(project) {
            if (user) {
                return likeFactory.checkLike(project, user);
            } else {
                return false;
            }    
        };

        self.searchClicked = true;

        self.checkSearch = function() {
            self.searchClicked = false;
            $(event.target).parent().find('.home-project-search').focus();
        };

    }
]);