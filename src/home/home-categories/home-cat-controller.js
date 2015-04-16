app.controller('CategoryCtrl', ['appearFactory', '$q', 'projectServices', 'groupServices',
    function(appearFactory, $q, projectServices, groupServices) {
        var self = this;

        self.rotate = appearFactory.rotate();

        self.checkBox = function() {
            appearFactory.checkBox();
        };


        var myPromise = $q.defer();

        myPromise.promise.then(function () {
            groupServices.listGroups();
            projectServices.listThird();
            setTimeout(function () {
                projectServices.list();
            }, 0);
        });

        myPromise.resolve();

    }
]);