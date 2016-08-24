angular.module('app')

   
.controller('backgroundSelectionCtrl', ["$scope", "$state", "Background", function($scope, $state, Background) {
	var backgroundSettings = Background.setup($scope, $state);
	$scope.backgrounds = Background.list();
	$scope.select = function(item) {
		backgroundSettings.set(item);
	}
	$scope.isSelected = function( item ) {
		return Background.isSelected(item)? "background-selected": "";
	}

}])
 