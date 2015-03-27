app.factory('projectServices', ['$http', '$log',
  function($http, $log) {

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

    return {

      list: function () {
        return get('/api/v1/projects');
      },

      listNewest: function () {
        return get('/api/v1/projects/newest');
      },

      listPopular: function () {
        return get('/api/v1/projects/popular');
      },

      getByProjectId: function(projectId) {
        return get('/api/v1/projects/' + projectId);
      },

      like: function (projectId) {
        return post('/api/v1/likes/projects/' + projectId);
      },

      removeLike: function (likedId) {
        return remove('/api/v1/likes/' + likedId);
      },

      addProject: function (project) {
        return post('/api/v1/projects', project);
      },

      addComment: function (projectId, comment) {
        return post('/api/v1/projects/' + projectId +'/comments', comment);
      }

    };
  }
]);
