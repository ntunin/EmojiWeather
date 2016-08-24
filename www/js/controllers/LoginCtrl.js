angular.module('app')


.controller('loginCtrl', function($scope, $state, Background, UserDataVerify, strings, $ionicPopup, UserData) {
	$scope.strings = strings;
	Background.setup($scope, $state);
	$scope.user = {
		name: "",
    username: "",
    password: "",
    confirmPassword: "",

		location: {
			state: "",
			country: "",
			city: ""
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
})
