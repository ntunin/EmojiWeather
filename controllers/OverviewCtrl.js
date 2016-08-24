angular.module('app')

.controller('overviewCtrl', ["$scope", "$state", "Background", "UserData", "strings", "$ionicPopup", function($scope, $state, Background, UserData, strings, $ionicPopup) {
	$scope.user = UserData();
	if($scope.user) {
		$state.go('main');
	} else {
  	Background.setup($scope, $state);
    $scope.strings = strings;	
	}
}])
