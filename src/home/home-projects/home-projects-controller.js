app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

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
		$(event.target).removeClass('fa-circle-o');
		$(event.target).addClass('fa-dot-circle-o');
	}

	self.setPopular = function () {
		selectedClass();
		$('#project-popular-radio').prop('checked', true);
	};

	self.setNewest = function () {
		selectedClass();
		$('#project-newest-radio').prop('checked', true);
	};

	self.setTrending = function () {
		selectedClass();
		$('#project-trending-radio').prop('checked', true);
	};

	self.setList = function () {
		selectedClass();
		$('#project-list-radio').prop('checked', true);
	};

	self.searchClicked = true;

	self.checkSearch = function () {
		self.searchClicked = false;
		$(event.target).parent().find('.home-project-search').focus();
	};



});