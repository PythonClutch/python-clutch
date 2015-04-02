app.controller('ProjectCtrl', ['project', 'projectFactory', 'projectServices', 'user', 'likeFactory', 'graph',
    function(project, projectFactory, projectServices, user, likeFactory, graph) {

        var self = this;

        self.project = project;

        self.graph = graph;

        var pf = projectFactory;

        self.pyMoreInfo = pf.byPy();

        self.setCommentPage = function() {
            $('html, body').animate({
                scrollTop: 1100
            }, 'fast');
        }

        self.pyInfo = function() {
            pf.pyInfo();
            self.pyMoreInfo = pf.byPy();
        };

        self.ghMoreInfo = pf.byGh();

        self.ghInfo = function() {
            pf.ghInfo();
            self.ghMoreInfo = pf.byGh();
        };

        self.comments = project.show_comments;

        self.comment = {};

        self.addComment = function() {
            projectServices.addComment(self.project.id, self.comment);
            var tempComment = {
                'created_display': 'seconds ago',
                'project_id': project.id,
                'text': self.comment.text,
                'user_avatar': user.data.avatar_url,
                'user_id': user.data.id,
                'user_name': user.data.github_name
            }
            self.comments.push(tempComment);
            self.comment = {};
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