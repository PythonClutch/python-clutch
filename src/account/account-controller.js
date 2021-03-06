app.controller('AccountCtrl', ['activeRoute', 'accountFactory', 'appearFactory', 'projectFactory', 'user', 'userServices',
    function(activeRoute, accountFactory, appearFactory, projectFactory, user, userServices) {
        var self = this;

        self.byInfo = accountFactory.byInfo();

        self.byEdit = accountFactory.byEdit();

        self.user = user.data;

        self.accountUrls = {};

        self.postEdit = function() {
            console.log('post');
            console.log(self.accountUrls);
            userServices.addUserUrls(self.accountUrls);
            self.accountUrls = {};
        };

        self.setInfo = function() {
            accountFactory.setInfo();
            self.byInfo = accountFactory.byInfo();
            self.byEdit = accountFactory.byEdit();
        };

        self.setActivity = function() {
            accountFactory.setActivity();
            self.byInfo = accountFactory.byInfo();
            self.byEdit = accountFactory.byEdit();
        };

        self.isActive = function(path) {
            return activeRoute.isActive(path);
        };

        self.setEdit = function() {
            accountFactory.setEdit();
            self.byEdit = accountFactory.byEdit();
        };

        self.checkBox = function() {
            appearFactory.checkBox();
        };

        var pf = projectFactory;

        self.pyMoreInfo = pf.byPy();

        self.pyInfo = function() {
            pf.pyInfo();
            self.pyMoreInfo = pf.byPy();
        };

        self.ghMoreInfo = pf.byGh();

        self.ghInfo = function() {
            pf.ghInfo();
            self.ghMoreInfo = pf.byGh();
        };

    }
]);