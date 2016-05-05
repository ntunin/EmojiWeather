angular.module('app')
  
.controller('mainCtrl', function($scope, $state, Background, $stateParams, UserData, Weather, Location, $ionicPopup) {
	Background.setup($scope, $state);

	$scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
	    if (toState.name === "main") { 
	    	update();
	    }
	});
	
	function update() {
		$scope.moment = moment; 
		var user = UserData();
		$scope.username = user.name;
		$scope.location = Location();
		var time = setInterval(function(){
			$scope.date = new Date();
			$scope.$apply();
		}, 1000);
		Weather($scope.location, "hourly").then(success, error);

		function success(respose) {
			$scope.hourlyForecast = respose;
		}

		function error(e) {
			$ionicPopup.alert({title: "Warning", template: e})
		}
	}


})