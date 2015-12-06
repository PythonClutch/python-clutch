app.factory('submitFactory', function() {

    'use strict';

    var byNew = true;

    var byEdit = false;

    return {

        byNew: function() {
            return byNew;
        },

        byEdit: function() {
            return byEdit;
        },

        setNew: function() {
            byNew = true;
            byEdit = false;
        },

        setPending: function() {
            byNew = false;
            byEdit = false;
        },

        setEdit: function() {
            byEdit = true;
        }

    };

});