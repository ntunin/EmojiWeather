angular.module('app')

.controller('HourlyForecastCtrl', function($scope, $rootScope, $state, $ionicLoading, $ionicPopup, Weather, LocationService, Emojy) {
	$ionicLoading.show();
	Emojy.subscribe(load);
	LocationService("subscribe", load);
	LocationService("define location").then(successLocationRequest, errorLocationRequest);
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name == "app.forecast.hourly") {
			$rootScope.mainPage = true;
			$ionicLoading.show();
			load();
			setTimeout(load, 60*60*1000);
		}
	});
	function load() {
		successLocationRequest(LocationService("current location"));
	}
	function successLocationRequest(location) {
		Weather(location, "hourly").then(successWeatherRequest, errorWeatherRequest);
	}
	function errorLocationRequest(error) {
		$ionicLoading.hide();
		throw error;
	}

	function successWeatherRequest(weather) {
		$ionicLoading.hide();
		$scope.hourlyForecast = sortByDays(weather);
	}
	function sortByDays(weather) {
		var sorted = {};
		for(var i = 0; i < weather.length; i++) {
			if(i == 24) break;
			var value = weather[i];
			var key = moment(value.date).format("dddd");
			sorted[key] = sorted[key] || [];
			sorted[key].push(value);
		}
		return sorted;
	}
	function errorWeatherRequest(error) {
		$ionicPopup.alert({title: "Error", template: "Cannot get weather. " + error});
		$ionicLoading.hide();
	}

})
