app.factory('appearFactory', function () {

	'use strict';

	var target;

	return {

		checkBox: function (target) {
			target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
			if (target.prop('checked')) {
				target.prop('checked', false);
			} else {
				target.prop('checked', true);
			}
		}

	};

});