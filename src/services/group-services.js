app.factory('groupServices', ['$http', '$log',
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

    var groups;
    var categories;

    return {

      getByGroupId: function (groupId) {
        return get('/api/v1/groups/' + groupId);
      },

      getGraphByGroupId: function (groupId) {
        return get('/api/v1/groups/' + groupId + '/graph');
      },

      listGroups: function () {
        groups = groups || get('/api/v1/groups');
        return groups;
      },

      listCats: function () {
        categories = categories || get('/api/v1/categories');
        return categories;
      }

    };
  }
]);