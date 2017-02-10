angular.module('app')


.controller('StickersStoreCtrl', function($scope, $state, strings, Emojy, $ionicPopup, countedLoading, User) {
	var emojy;
	update();
	var delay;
  User.me("subscribe", update);
	function update() {
		Emojy.all().then(function(list) {
			$scope.stickers = list;
			$scope.$apply();
		})
		Emojy.current().then(function(pack) {
			emojy = pack;
			$scope.$apply();
		});
	}
	$scope.select = function(item) {
		if(delay) return;
		delay = setTimeout(function() {
			delay = null;
		}, 250);
		countedLoading.show();
		Emojy.purchase(item).then(function() {
			update();
			countedLoading.hide();
		}, function () {
			countedLoading.hide();
		});
	}

})
