angular.module('app')
  
  
.controller('loginCtrl', function($scope, $state, Background, UserData, Location) {
	Background.setup($scope, $state);
	$scope.user = {
		name: "nik",

		location: {
			state: "siberia",
			country: "russia",
			city: "omsk"
		}
	}
	$scope.submit = function() {
		UserData($scope.user);
		Location($scope.user.location);
	}
})