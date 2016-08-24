angular.module('app')


.controller('backgroundSelectionCtrl', function($scope, $state, Backgrounds, strings, User) {
  $scope.strings = strings;
  var background = {id: -1};
  update();
  User.me("subscribe", update);
  Backgrounds.subscribe(update);
  function update() {
      Backgrounds.current().then(function(pack) {
        background = pack;
        $scope.$apply();
      });
      Backgrounds.available().then(function(list) {
        $scope.backgrounds = list;
        $scope.$apply();
      });
  }
	$scope.select = function(item) {
		Backgrounds.current(item);
    background = item;
	}
	$scope.isSelected = function( item ) {
		return (item.id == background.id)? "item-selected": "";
	}

})
