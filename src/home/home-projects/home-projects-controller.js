app.controller('hpCtrl', ['projectServices', 'appearFactory', function (projectServices, appearFactory) {
	var self = this;

	self.byNames = true;

	self.rotate = appearFactory.rotate();

	// function checkRotate () {
	// 	self.rotate = appearFactory.rotate();
	// }

	// setInterval(checkRotate, 1000);

	self.mobile = true;

	// function screenWidth () {
	// 	console.log(screenWidth);
	// };

	// appearFactory.checkWidth();

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

	projectServices.listNewest().then(function (result){
		self.newestProjects = result;
	});

	projectServices.list().then(function (result){
		self.listProjects = result;
	});

	self.setGroups = function () {
		self.byNames = false;
	};

	self.setNames = function () {
		self.byNames = true;
	};

	function selectedClass () {
		var closest = $(event.target).parent().parent().children();
		console.log(closest);
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
		selectedClass();
		$('#project-list-radio').prop('checked', true);
	};

	self.searchClicked = true;

	self.checkSearch = function () {
		self.searchClicked = false;
		$(event.target).parent().find('.home-project-search').focus();
	};



}]);