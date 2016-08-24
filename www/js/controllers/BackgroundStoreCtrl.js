angular.module('app')


.controller('backgroundStoreCtrl', function($scope, $state, Backgrounds, strings, $ionicPopup, $ionicLoading, User) {
  $scope.strings = strings;
  var background = {id: -1};
  User.me("subscribe", update);
  update();
  function update() {
      Backgrounds.current().then(function(pack) {
        background = pack;
        $scope.$apply();
      });
      Backgrounds.all().then(function(list) {
        $scope.backgrounds = list;
        $scope.$apply();
      });
  }
	$scope.select = function(item) {
    $ionicLoading.show();
		Backgrounds.purchase(item).then(function () {
      update();
      $ionicLoading.hide();
    }, function () {
      $ionicLoading.hide();
    });
	}
	$scope.isSelected = function( item ) {
		return (item.id == background.id)? "item-selected": "";
	}

})
