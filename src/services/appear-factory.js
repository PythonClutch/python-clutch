app.factory('appearFactory', function () {

	'use strict';

	var target;
	var targetScore;
	var rotated = false;

	return {

		rotate: function () {
			return rotated;
		},

		checkBox: function (target) {
			target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
			targetScore = $(event.target).parent().find('.home-project-basic-info-score');
			console.log(targetScore);
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
			if (rotated === true) {
				rotated = false;
			} else {
				rotated = true;
			}
		}

	};

});