angular.module('app')


.controller('loginCtrl', ["$scope", "$state", "Background", "UserDataVerify", "strings", "$ionicPopup", "UserData", function($scope, $state, Background, UserDataVerify, strings, $ionicPopup, UserData) {
	$scope.strings = strings;
	Background.setup($scope, $state);
	$scope.user = {
		name: "nik",
    username: "n_tunin",
    password: "ziromu80",
    confirmPassword: "ziromu80",

		location: {
			state: "siberia",
			country: "Russia",
			city: "Omsk"
		}
	}
	$scope.submit = function() {
    UserDataVerify($scope.user).then(success, error);
		function success() {
			UserData($scope.user);
			$state.go("preview");
		}
		function error(e) {
			$ionicPopup.alert({title: "Warning", template: e})
		}
	}
}])
