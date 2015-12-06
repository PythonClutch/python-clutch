app.controller('NavCtrl', ['$location', 'userServices', 'projectServices',
    function($location, userServices, projectServices) {

        var self = this;

        self.loggedIn = true;

        self.currentUser;

        self.word = '';

        self.searchProjects = function() {
            window.location.hash = 'home/search/' + self.word;
        };

        function checkLogIn() {
            userServices.currentUser().then(function(result) {
                self.currentUser = result;
                if (self.currentUser) {
                    if (self.currentUser.status === "success") {
                        self.loggedIn = true;
                    } else {
                        self.loggedIn = false;
                    }
                } else {
                    self.loggedIn = false;
                }
            }, function(err) {
                self.loggedIn = false;
            });
        }

        self.checkUser = function() {
            checkLogIn();
        };

        checkLogIn();

    }
]);