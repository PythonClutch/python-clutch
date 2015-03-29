app.controller('ProjectCtrl', ['project', 'projectFactory', 'projectServices', 'user', 'likeFactory', 'graph',
	function (project, projectFactory, projectServices, user, likeFactory, graph) {

	var self = this;

	self.project = project;

	self.graph = graph;

	var pf = projectFactory;

	self.pyMoreInfo = pf.byPy();

	self.pyInfo = function () {
		pf.pyInfo();
		self.pyMoreInfo = pf.byPy(); 
	};

	self.ghMoreInfo = pf.byGh();

	self.ghInfo = function () {
		pf.ghInfo();
		self.ghMoreInfo = pf.byGh();
	};

	self.comment = {};
	
	self.addComment = function () {
		console.log(self.comment);
		console.log(self.project.id);
		projectServices.addComment(self.project.id, self.comment);
		self.comment = {};
	};

	self.like = function (proj, likes) {
		likeFactory.like(proj, likes, user);	
	};

	self.checkLike = function (project) {
		return likeFactory.checkLike(project, user);
	};

	function parse(spec) {
		vg.parse.spec(spec, function(chart) { 
			// function graphing (argument) {
			// 	// body...
			// }
			chart({el:".graph"}).width(document.querySelector('.graph').offsetWidth - 70).height(210).renderer("svg").update(); 
			if (window.innerWidth < 400) {
				chart({el:".graph"}).width(400).viewport([document.querySelector('.graph').offsetWidth, 249]).height(210).renderer("svg").update();
			}
		});
	}
	parse(graph);


}]);