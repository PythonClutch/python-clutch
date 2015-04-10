app.factory('projectFactory', function() {

    'use strict';

    var pyMoreInfo = false;
    var ghMoreInfo = false;
    var target;
    var chevron;
    window.setTimeout(function() {
        ghMoreInfo = false;
    }, 200);

    return {

        byPy: function() {
            return pyMoreInfo;
        },

        byGh: function() {
            console.log(ghMoreInfo);
            return ghMoreInfo;
        },

        pyInfo: function() {
            if (pyMoreInfo === true) {
                pyMoreInfo = false;
            } else {
                pyMoreInfo = true;
            }
        },

        ghInfo: function() {
            target = $(event.target).parent().parent().parent().find('.gh-checkbox');
            chevron = $(event.target).closest('.home-project-header-bottom').find('.fa');
            console.log(chevron);
            if (target.prop('checked')) {
                target.prop('checked', false);
                ghMoreInfo = false;
            } else {
                target.prop('checked', true);
                ghMoreInfo = true;
            }
        }

    };

});