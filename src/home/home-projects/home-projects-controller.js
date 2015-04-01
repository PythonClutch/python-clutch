app.controller('hpCtrl', ['projectServices', 'appearFactory', 'projectFactory',
    function (projectServices, appearFactory, projectFactory) {
	var self = this;

	self.byNames = true;

	self.rotate = function () {
		return appearFactory.rotate();
	};

	// function checkRotate () {
	// 	self.rotate = appearFactory.rotate();
	// }

	// setInterval(checkRotate, 1000);

	self.mobile = true;

	// function screenWidth () {
	// 	console.log(screenWidth);
	// };

	// appearFactory.checkWidth();

	// self.newestProjects = [];

	// self.popularProjects = [];

	self.setCommentPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 1100 }, 'fast');
	}

	self.setPage = function () {
		console.log('top')
		$('html, body').animate({ scrollTop: 0 }, 'fast');
	}

	self.checkBox = function () {
    	appearFactory.checkBox();
    	self.rotate = appearFactory.rotate();
	};

	// projectServices.searchNewestProjects().then(function (result){
	// 	self.newestSearchedProjects = result;
	// }, function () {
	// 	console.log('nothing there');
	// });

	// projectServices.searchProjects().then(function (result){
	// 	self.listSearchedProjects = result;
	// }, function () {
	// 	console.log('nothing there');
	// });

	// projectServices.listNewest().then(function (result){
	// 	self.newestProjects = result;
	// }, function () {
	// 	console.log('nothing there');
	// });

	// projectServices.list().then(function (result){
	// 	self.listProjects = result;
	// }, function () {
	// 	console.log('nothing there');
	// });

	self.setGroups = function () {
		self.byNames = false;
	};

	self.setNames = function () {
		self.byNames = true;
	};

	function selectedClass () {
		var closest = $(event.target).parent().parent().children();
		closest.each(function () {
			var fa = $(this).find('.fa');
			$(this).find('.fa').removeClass('fa-dot-circle-o');
			console.log($(this).find('.project-radio')[0]);
			$(this).find('.project-radio').prop('checked', false);
			if (!fa.hasClass('fa-circle-o')) {
				fa.addClass('fa-circle-o');
			}
		});
		$(event.target).parent().find('.fa').removeClass('fa-circle-o');
		$(event.target).parent().find('.fa').addClass('fa-dot-circle-o');
	}

	self.list = false;
	self.popular = true;
	self.newest = false;
	self.searched = false;

	self.setPopular = function () {
		selectedClass();
		self.popular = true;
		self.newest = false;
		self.list = false;
		self.searched = false;
		$('#project-popular-radio').prop('checked', true);
	};

	self.setNewest = function () {
		self.popular = false;
		self.newest = true;
		self.list = false;
		self.searched = false;
		selectedClass();
		$('#project-newest-radio').prop('checked', true);
	};

	self.setSearch = function () {
		console.log('eh');
	}

	self.setTrending = function () {
		selectedClass();
		$('#project-trending-radio').prop('checked', true);
	};

	self.setList = function () {
		self.popular = false;
		self.newest = false;
		self.list = true;
		console.log(self.list);
		selectedClass();
		$('#project-list-radio').prop('checked', true);
	};

	self.searchClicked = true;

	self.checkSearch = function () {
		self.searchClicked = false;
		$(event.target).parent().find('.home-project-search').focus();
	};

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



}]);