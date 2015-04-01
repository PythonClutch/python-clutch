app.factory('likeFactory', ['projectServices', function (projectServices) {

	'use strict';

	return {
		like: function (proj, likes, user) {
			self.likedHeart = true;

			var target = $(event.target);
			var likedId;
			var likeArray = likes;
			var checkUserMatch = function () {
				for (var i = likeArray.length - 1; i >= 0; i--) {
					if (likeArray[i].user_id === user.data.id) {
						likedId = likeArray[i].id;
						// likeArray.push({'user_id': user.data.id})
						console.log(likedId);
						return true;
					} else {
						return false;
					}
				};
			};
			var likeAmount = likeArray.length;
			if (checkUserMatch()) {
				target.addClass('fa-heart-o');	
				likeAmount -= 1
				target.parent().find('p').text(likeAmount);
				projectServices.removeLike(likedId).then(function (array) {
					likeArray.pop(array);
				})	
			} else {
				target.removeClass('fa-heart-o');
				target.addClass('fa-heart');
				console.log(likes);
				likeAmount += 1
				target.parent().find('p').text(likeAmount);
				projectServices.like(proj.id).then(function (array) {
					likeArray.push(array);
				})
			}
		},

		checkLike: function (project, user) {
			for (var i = project.show_likes.length - 1; i >= 0; i--) {
				if (project.show_likes[i].user_id === user.data.id) {
					console.log(true);
					return true;
				} else {
					return false;
				}
			};
		}
	};

}]);