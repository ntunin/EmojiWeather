angular.module('app')

.controller('WeeklyForecastCtrl', function($scope,
																					 $rootScope,
																					 $state,
																					 User,
																					 $ionicPopup,
																					 LocationService,
																					 Weather,
																					 Emojy,
																					 config,
																				   ResumeService) {
  var freeData;
	ResumeService.subscribe(load);
	$scope.moment = moment;
	document.addEventListener("resume", load, false);
	Emojy.subscribe(load);
	LocationService("subscribe", load);
	$scope.$on('$ionicView.enter', load);

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
		Weather(location, "forecast10day").then(successWeatherRequest, errorWeatherRequest);
		config.subscribe(function() {
			Weather(location, "forecast10day", "denote").then(successWeatherRequest, errorWeatherRequest);
		});
	}
	function errorLocationRequest(error) {
		throw error;
	}

	function successWeatherRequest(weather) {
		$scope.forecast = weather;
		weather.forEach(function(item) {
			item.refresh = function() {
				$scope.$apply();
			}
		});
		$scope.$apply();
	}

	function errorWeatherRequest(error) {
		$ionicPopup.alert({title: "Error", template: "Cannot get weather. " + error});
	}

})
