app.controller('hpCtrl', function () {
	var self = this;

	self.byNames = true;

	self.setGroups = function () {
		self.byNames = false;
		$(event.target).closest('.home-project-a-name').removeClass('project-active');
		$(event.target).addClass('project-active');
	};

	self.setNames = function () {
		self.byNames = true;
		var close = $(event.target).closest('.home-project-a-group');
		console.log(close);
		$(event.target).closest('.home-project-a-group').removeClass('project-active');
		$(event.target).addClass('project-active');
	};

	self.setPopular = function () {
		$('#project-popular-radio').attr('checked', true);
	}

	self.setNewest = function () {
		$('#project-newest-radio').attr('checked', true);
	}
});