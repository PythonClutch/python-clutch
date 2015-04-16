app.controller('FooterCtrl', ['projectServices', 'groupServices',
    function(projectServices, groupServices) {
        var self = this;

        self.allProjects = false;

        self.projects;

        function getProjects () {
            return projectServices.projects().then(function (result) {
                self.projects = result;
            });
        };

        getProjects();

        var int = setInterval(function () {
           findProjects(); 
        }, 600);

        function findProjects () {
            projectServices.projects().then(function (result) {
                if (result.length > 101) {
                    clearInterval(int);
                    getProjects();
                    self.allProjects = true;
                    self.projects = result;
                    self.firstColumn = Math.ceil(result.length / 3);
                    self.firstColumnPlus = self.firstColumn + 1;
                    self.secondColumn = Math.ceil(result.length / 1.5);
                    self.secondColumnPlus = self.secondColumn + 1;
                    self.thirdColumn = result.length;
                }
            });
        }

        self.setPage = function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        };

        self.bySiteMap = function() {
            if (window.location.hash === '#/projectindex') {
                return true;
            } else {
                return false;
            }
        };

        self.byAbout = function() {
            if (window.location.hash === '#/about') {
                return true;
            } else {
                return false;
            }
        };

        self.byContact = function() {
            if (window.location.hash === '#/contact') {
                return true;
            } else {
                return false;
            }
        };
    }
]);