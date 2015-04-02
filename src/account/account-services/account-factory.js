app.factory('accountFactory', function() {

    'use strict';

    var byInfo = true;

    var byEdit = false;

    return {

        byInfo: function() {
            return byInfo;
        },

        byEdit: function() {
            return byEdit;
        },

        setInfo: function() {
            byInfo = true;
            byEdit = false;
        },

        setActivity: function() {
            byInfo = false;
            byEdit = false;
        },

        setEdit: function() {
            byEdit = true;
        }

    };

});