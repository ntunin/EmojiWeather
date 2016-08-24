angular.module('app')

.controller('hourlyForecastCtrl', ["$scope", "$state", "Background", "Weather", "UserData", function($scope, $state, Background, Weather, UserData) {
	Background.setup($scope, $state);
	var user = UserData();
	Weather(user.location, 'hourly').then(success, error);
	$scope.moment = moment;
	function success(response) {
		$scope.hourlyForecast = response;
	} 
	function error(e) {

	}

}])
   