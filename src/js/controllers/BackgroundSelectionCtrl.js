angular.module('app')


.controller('backgroundSelectionCtrl', function($scope,
                                                $state,
                                                Backgrounds,
                                                strings,
                                                User,
                                                $ionicLoading) {
  $scope.strings = strings;
  var delay;
  var background = {id: -1};
  update();
  User.me("subscribe", update);
  Backgrounds.subscribe(update);
  function update() {
    return new Promise(function(resolve, reject) {
      Backgrounds.current().then(function(pack) {
        background = pack;
        $scope.$apply();
        resolve();
      });
      Backgrounds.available().then(function(list) {
        $scope.backgrounds = list;
        $scope.$apply();
      });
    });
  }
	$scope.select = function(item) {
		if(delay) return;
		delay = setTimeout(function() {
			delay = null;
		}, 250);
    $ionicLoading.show();
		Backgrounds.current(item).then(function() {
        $ionicLoading.hide();
    });
    background = item;
	}
	$scope.isSelected = function( item ) {
		return (item.id == background.id)? "item-selected": "";
	}

})
