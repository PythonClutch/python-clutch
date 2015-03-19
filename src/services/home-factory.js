app.factory('homeFactory', function () {

	// var self = this;

	// self.byProjects = true;

	// self.setProjects = function () {
	// 	self.byProjects = true;
	// }

	// self.setCategories = function () {
	// 	console.log('cats')
	// 	self.byProjects = false;
	// 	console.log('cats')
	// 	console.log(self.byProjects)
	// }

	var byProjects = true;

	return {
		
		byProjects: function () {
			return byProjects;
		},

		setProjects: function () {
			byProjects = true;
		},

		setCategories: function () {
			byProjects = false;
		}

	};

});