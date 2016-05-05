angular.module('app')

   
.controller('searchCtrl', function($scope, $state, Background, Location) {
	Background.setup($scope, $state);
	$scope.location = {
		state: "",
		country: "",
		city: ""
	}
	$scope.submit = function() {
		Location($scope.location);
	}
})