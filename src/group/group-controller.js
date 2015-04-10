app.controller('GroupCtrl', ['group', 'projectFactory', 'appearFactory', 'graph', 'likeFactory', 'user',
    function(group, projectFactory, appearFactory, graph, likeFactory, user) {
        var self = this;

        self.group = group;

        console.log(group.projects);

        self.rotate = appearFactory.rotate();

        self.checkBox = function() {
            appearFactory.checkBox();
            self.rotate = appearFactory.rotate();
        };

        var pf = projectFactory;

        self.pyMoreInfo = pf.byPy();

        self.pyInfo = function() {
            pf.pyInfo();
            self.pyMoreInfo = pf.byPy();
        };

        self.setPage = function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        };

        self.ghMoreInfo = pf.byGh();

        self.ghInfo = function() {
            pf.ghInfo();
            self.ghMoreInfo = pf.byGh();
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

        function parse(spec) {
            vg.parse.spec(spec, function(chart) {
                chart({
                    el: ".graph"
                }).width(document.querySelector('.graph').offsetWidth - 70).height(210).renderer("svg").update();
                if (window.innerWidth < 400) {
                    chart({
                        el: ".graph"
                    }).width(400).viewport([document.querySelector('.graph').offsetWidth, 249]).height(210).renderer("svg").update();
                }
            });
        }
        
        parse(graph);

    }
]);
