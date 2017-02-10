angular.module('app')

.controller('mainCtrl', function($scope,
															   $rootScope,
																 User,
																 $state,
																 LocationService,
																 Weather,
																 $ionicPopup,
																 Emojy,
																 config,
															   ResumeService) {
		var updater;
		var needCheckLocation = true;
		var locationAlertShown;
		var freeData;

    ResumeService.subscribe(load);
		$scope.$on("$ionicView.enter", load);
		LocationService("subscribe", load);
		Emojy.subscribe(load);

		function load() {
			return new Promise(function(resolve, reject) {
				if(!User.me()) return;
				if(freeData) return;
				freeData = true;
				setTimeout(function() {
					freeData = false;
				}, 5 * 1000);
				var location = LocationService("current location");
				if(!location) {
					locationRequest();
				} else {
					successLocationRequest(location);
				}

				resolve();
			});
		}
		function locationRequest() {
				if(!needCheckLocation) return;
				var location = LocationService("current location")
				if(location) {
					successLocationRequest(location)
				} else {
					LocationService("define location").then(
						function(location) {
							successLocationRequest(location);
						},
						function(err) {
							$state.go('app.changeLocation');
						}
					);
				}
		}

		function successLocationRequest(location) {
			needCheckLocation = false;
			$rootScope.location = LocationService("current location");
			Weather(location, "hourly").then(successWeatherRequest, errorWeatherRequest);
			config.subscribe(function() {
				Weather(location, "hourly", "denote").then(successWeatherRequest, errorWeatherRequest);
			})
		}

		function requireLocation(err) {
			var title = "Error!";
			var template = "Cannot define your geoposition. " + err;
			$ionicPopup.alert({title: title, template: template});
		}

		function successWeatherRequest(weather) {
			$scope.weather = weather;
			weather[0].refresh = function() {
				$scope.$apply();
			}
			$scope.$apply();
		}

		function errorWeatherRequest(error) {
			//$ionicPopup.alert({title: "Error", template: "Cannot get weather. " + error});
		}
})
