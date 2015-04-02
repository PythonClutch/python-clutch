app.factory('homeFactory', function() {

    var byProjects = true;

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