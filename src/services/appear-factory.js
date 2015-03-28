app.factory('appearFactory', function () {

	'use strict';

	var target;
	var targetScore;
	var rotated = true;
	function rotateThis () {
		rotated = true;
	}
	setInterval(rotateThis, 5000);

	return {

		rotate: function () {
			console.log(rotated);
			return rotated;
		},

		checkBox: function (target) {
			target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
			targetScore = $(event.target).parent().find('.home-project-basic-info-score');
			if (target.prop('checked')) {
				target.prop('checked', false);
				// targetScore.css({
				// 	'margin-right': 0
				// });
			} else {
				target.prop('checked', true);
				// targetScore.css({
				// 	'margin-right': '10px'
				// });
			}
			if (target.prop('checked')) {
				rotated = false;
			} else {
				rotated = true;
			}
		}

	};

});