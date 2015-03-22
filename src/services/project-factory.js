app.factory('projectFactory', function () {

	'use strict';

	var pyMoreInfo = false;
	var ghMoreInfo = false;

	return {

		byPy: function () {
			return pyMoreInfo;
		},

		byGh: function () {
			return ghMoreInfo;
		},

		pyInfo: function () {
			if (pyMoreInfo === true) {
				pyMoreInfo = false;
			} else {
				pyMoreInfo = true;
			}	
		},

		ghInfo: function () {
			if (ghMoreInfo === true) {
				ghMoreInfo = false;
			} else {
				ghMoreInfo = true;
			}
		}

	};

});