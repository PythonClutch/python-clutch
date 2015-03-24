app.controller('CategoryCtrl', ['appearFactory', function (appearFactory) {
	var self = this;

	self.categories = [{
			'name': 'peter',
	
		}]
	
	self.checkBox = function () {
    	appearFactory.checkBox();
	};
}]);