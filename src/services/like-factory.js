app.factory('likeFactory', ['projectServices', function (projectServices) {

	'use strict';

	return {
		like: function (proj, likes, user) {
			self.likedHeart = true;

			var target = $(event.target);
			var likedId;
			var checkUserMatch = function () {
				for (var i = likes.length - 1; i >= 0; i--) {
					if (likes[i].user_id === user.data.id) {
						likedId = likes[i].id;
						console.log(likedId);
						return true;
					} else {
						return false;
					}
				};
			};
			if (checkUserMatch()) {
				target.addClass('fa-heart-o');	
				projectServices.removeLike(likedId);	
			} else {
				target.removeClass('fa-heart-o');
				target.addClass('fa-heart');
				projectServices.like(proj.id);
			}
		},

		checkLike: function (project, user) {
			for (var i = project.user_likes.length - 1; i >= 0; i--) {
				if (project.user_likes[i].user_id === user.data.id) {
					return true;
				} else {
					return false;
				}
			};
		}
	};

}]);