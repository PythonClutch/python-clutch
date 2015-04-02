app.factory('projectFactory', function() {

    'use strict';

    var pyMoreInfo = false;
    var ghMoreInfo = false;
    var target;

    return {

        byPy: function() {
            return pyMoreInfo;
        },

        byGh: function() {
            return ghMoreInfo;
        },

        pyInfo: function() {
            if (pyMoreInfo === true) {
                pyMoreInfo = false;
            } else {
                pyMoreInfo = true;
            };
        },

        ghInfo: function() {
            if (ghMoreInfo === true) {
                ghMoreInfo = false;
            } else {
                ghMoreInfo = true;
            }
            target = $(event.target).parent().parent().parent().find('.gh-checkbox');
            if (target.prop('checked')) {
                target.prop('checked', false);
            } else {
                target.prop('checked', true);
            };
        }

    };

});