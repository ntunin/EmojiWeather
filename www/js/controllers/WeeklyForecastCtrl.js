angular.module('app')

.controller('WeeklyForecastCtrl', function($scope, $rootScope, $state, $ionicLoading, $ionicPopup, LocationService, Weather, Emojy) {

	$ionicLoading.show();
	Emojy.subscribe(load);
	LocationService("subscribe", load);
	LocationService("define location").then(successLocationRequest, errorLocationRequest);
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name == "app.forecast.weekly") {
			$ionicLoading.show();
			load();
			setTimeout(load, 60*60*1000);
		}
	});

	function load() {
			successLocationRequest(LocationService("current location"));
	}
	function successLocationRequest(location) {
		Weather(location, "forecast10day").then(successWeatherRequest, errorWeatherRequest);
	}
	function errorLocationRequest(error) {
		$ionicLoading.hide();
		throw error;
	}

	function successWeatherRequest(weather) {
		$ionicLoading.hide();
		$scope.forecast = weather;
		$scope.moment = moment;
	}

	function errorWeatherRequest(error) {
		$ionicPopup.alert({title: "Error", template: "Cannot get weather. " + error});
		$ionicLoading.hide();
	}

})
