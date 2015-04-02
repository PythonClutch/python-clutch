app.controller('HomeCtrl', ['homeFactory', 'projects', 'projectFactory', 'activeRoute', 'appearFactory', 'groups', 'projectServices',
    'categories', 'user', 'likeFactory', 
    function(homeFactory, projects, projectFactory, activeRoute, appearFactory, groups, projectServices,
        categories, user, likeFactory) {
        var self = this;

        self.categories = categories;

        self.projects = projects;

        self.changeTrue = function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
            appearFactory.changeTrue();
        };

        self.groups = groups;

        self.projectNumber = Math.ceil(projects.length / 5);

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