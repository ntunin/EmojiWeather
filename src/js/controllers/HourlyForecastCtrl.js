angular.module('app')

.controller('HourlyForecastCtrl', function($scope,
																					 $rootScope,
																					 User,
																					 $state,
																					 $ionicPopup,
																					 Weather,
																					 LocationService,
																					 Emojy,
																					 config,
																				   ResumeService) {

  var freeData;
  ResumeService.subscribe(load);
	Emojy.subscribe(load);
	document.addEventListener("resume", load, false);
	LocationService("subscribe", load);
	LocationService("define location").then(successLocationRequest, errorLocationRequest);
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name == "app.forecast.hourly") {
			$rootScope.mainPage = true;
			load();
		}
	});
	function load() {
		return new Promise(function(resolve, reject) {
			if(!User.me()) return;
			if(freeData) return;
			freeData = true;
			setTimeout(function() {
				freeData = false;
			}, 5 * 1000);
			successLocationRequest(LocationService("current location"));
			resolve();
		});
	}
	function successLocationRequest(location) {
		Weather(location, "hourly").then(successWeatherRequest, errorWeatherRequest);
		config.subscribe(function() {
			Weather(location, "hourly", "denote").then(successWeatherRequest, errorWeatherRequest);
		});
	}
	function errorLocationRequest(error) {
		throw error;
	}

	function successWeatherRequest(weather) {
		$scope.hourlyForecast = sortByDays(weather);
		for(var fieldName in $scope.hourlyForecast) {
			var arr = $scope.hourlyForecast[fieldName];
			arr.forEach(function(item) {
				item.refresh = function() {
					$scope.$apply();
				}
			});
		}

		$scope.$apply();
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
	}

})
