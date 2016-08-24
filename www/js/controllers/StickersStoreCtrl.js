angular.module('app')


.controller('StickersStoreCtrl', function($scope, $state, strings, Emojy, $ionicPopup, $ionicLoading, User) {
	var emojy;
	update();
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
		$ionicLoading.show();
		Emojy.purchase(item).then(function() {
			update();
			$ionicLoading.hide();
		}, function () {
			$ionicLoading.hide();
		});
	}

})
