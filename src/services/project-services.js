app.factory('projectServices', ['$http', '$log', '$q',
    function($http, $log, $q) {

        function get(url) {
            return processAjaxPromise($http.get(url));
        }

        function post(url, share) {
            return processAjaxPromise($http.post(url, share));
        }

        function put(url, share) {
            return processAjaxPromise($http.put(url, share));
        }

        function remove(url) {
            return processAjaxPromise($http.delete(url));
        }

        function processAjaxPromise(p) {
            return p.then(function(result) {
                    return result.data.data;
                })
                .catch(function(error) {
                    $log.log(error);
                });
        }

        var projects;
        var projectsNewest;
        var projectsPopular;
        var searchedProjects;

        function addProjects (len, url) {
            if (projects) {
               return projects.then(function (result) {
                    if (result.length < len) {
                        console.log('here');
                        projects = get('/api/v1/projects' + url);
                    }
                    return projects;
                }) 
            } else {
                projects = get('/api/v1/projects' + url);
                return projects;
            }
        };

        return {

            projects: function () {
                return projects;
            },

            list: function() {
                addProjects(101, '');
            },

            listCurrent: function(num) {
                projects = projects || get('/api/v1/projects/' + num + '/5');
                return projects;
            },

            listSecond: function() {
                addProjects(26, '/1/25');
            },

            listThird: function() {
                addProjects(99, '/1/100');
            },

            getGraphByProjectId: function(projectId) {
                return get('/api/v1/projects/' + projectId + '/graph');
            },

            listNewest: function() {
                projectsNewest = projectsNewest || get('/api/v1/projects/newest');
                return projectsNewest;
            },

            listPopular: function() {
                projectsPopular = projectsPopular || get('/api/v1/projects/popular');
                return projectsPopular;
            },

            getByProjectId: function(projectId) {
                return get('/api/v1/projects/' + projectId);
            },

            like: function(projectId) {
                return post('/api/v1/likes/projects/' + projectId);
            },

            removeLike: function(likedId) {
                return remove('/api/v1/likes/' + likedId);
            },

            addProject: function(project) {
                return post('/api/v1/projects', project);
            },

            addComment: function(projectId, comment) {
                return post('/api/v1/projects/' + projectId + '/comments', comment);
            },

            searchProjects: function(word) {
                console.log(word);
                return get('/api/v1/search?q="' + word + '"');
            },

        };
    }
]);