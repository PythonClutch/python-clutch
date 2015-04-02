app.factory('homeFactory', function() {

    var byProjects = true;

    'use strict';

    return {
        byProjects: function() {
            return byProjects;
        },

        setProjects: function() {
            byProjects = true;
        },

        setCategories: function() {
            byProjects = false;
        }

    };

});