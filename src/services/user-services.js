app.factory('userServices', ['$http', '$q', '$log',
    function($http, $q, $log) {
        function get(url) {
          return processAjaxPromise($http.get(url));
        }
        function post(url, user) {
          return processAjaxPromise($http.post(url, user));
        }
        function remove(url) {
          return processAjaxPromise($http.delete(url));
        }
        function processAjaxPromise(p) {
          return p.then(function(result) {
            console.log(result.data)
            return result.data;
          })
          .catch(function(error) {
            $log.log(error);
          });
        }

        return {
            list: function() {
                return get('/api/v1/users');
            },

            getByUserId: function(userId) {
                if (!userId) {
                    throw new Error('getByUserId requires a user id');
                }

                return get('/api/v1/users/' + userId);
            },

            currentUser: function() {
                return get('/api/v1/user');
            },

            // login: function (user) {
            //     // console.log(user);
            //     return post('/api/login', user)
            // }

            // api/register
            // api/login
        };
    }
]);