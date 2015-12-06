app.factory('appearFactory', function() {

    'use strict';

    var target;
    var targetScore;
    var rotated = true;

    function rotateThis() {
        rotated = true;
    }
    setInterval(rotateThis, 5000);

    return {

        rotate: function() {
            return rotated;
        },

        checkBox: function(target) {
            target = $(event.target).parent().parent().parent().find('.names-details-checkbox');
            targetScore = $(event.target).parent().find('.home-project-basic-info-score');
            if (target.prop('checked')) {
                target.prop('checked', false);
            } else {
                target.prop('checked', true);
            }
            if (target.prop('checked')) {
                rotated = false;
            } else {
                rotated = true;
            }
        },

        changeTrue: function() {
            rotated = true;
        }

    };

});