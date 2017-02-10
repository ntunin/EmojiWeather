angular.module('app')


.controller('backgroundStoreCtrl', function($scope, $state, Backgrounds, strings, $ionicPopup, countedLoading, User) {
  $scope.strings = strings;
  var delay;
  var background = {id: -1};
  User.me("subscribe", update);
  update();
  function update() {
      clearTimeout(delay);
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
		if(delay) return;
		delay = setTimeout(function() {
			delay = null;
		}, 250);
    countedLoading.show();
		Backgrounds.purchase(item).then(function () {
      update();
      countedLoading.hide();
    }, function () {
      countedLoading.hide();
    });
	}
	$scope.isSelected = function( item ) {
		return (item.id == background.id)? "item-selected": "";
	}

})
