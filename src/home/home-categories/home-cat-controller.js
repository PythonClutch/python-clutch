app.controller('CategoryCtrl', ['appearFactory', function (appearFactory) {
	var self = this;

	self.rotate = appearFactory.rotate();
	
	self.checkBox = function () {
    	appearFactory.checkBox();
	};
}]);