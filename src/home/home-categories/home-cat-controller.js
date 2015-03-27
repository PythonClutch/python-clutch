app.controller('CategoryCtrl', ['appearFactory', function (appearFactory) {
	var self = this;
	
	self.checkBox = function () {
    	appearFactory.checkBox();
	};
}]);