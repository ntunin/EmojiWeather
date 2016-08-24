angular.module('app')


.controller('previewCtrl', ["$scope", "$state", "Background", "UserData", "Login", "$ionicPopup", "strings", function($scope, $state, Background, UserData, Login, $ionicPopup, strings) {
	Background.setup($scope, $state);
	$scope.user = UserData();
	$scope.submit = function() {
		Login($scope.user).then(success, error);
    function success() {
      $state.go("main");
    }

    function error(e) {
			$ionicPopup.alert({title: "Warning", template: e});
    }

	}
}])
