angular.module('app')

.controller('mainCtrl', function($scope, $rootScope, $state, $ionicLoading, LocationService, Weather, $ionicPopup, Emojy) {
		var updater;
		var needCheckLocation = true;
		$scope.$on("$ionicView.enter", locationRequest);
		LocationService("subscribe", load);
		Emojy.subscribe(load);
		function load() {
			successLocationRequest(LocationService("current location"));
		}
		function locationRequest() {
				if(!needCheckLocation) return;
				$ionicLoading.show();
				var location = LocationService("current location")
				if(location) {
					successLocationRequest(location)
				} else {
					LocationService("define location").then(
						function(location) {
							successLocationRequest(location);
						},
						function(err) {
							$ionicLoading.hide();
							$ionicPopup.alert({title: "Warning!", template: "There is not some user location info"});
							$state.go('app.changeLocation');
						}
					);
				}
		}
		function successLocationRequest(location) {
			needCheckLocation = false;
			Weather(location, "hourly").then(successWeatherRequest, errorWeatherRequest);
			if(updater) clearTimeout(updater);
			updater = setTimeout(load, 60*60*1000);
		}

		function requireLocation(err) {
			var title = "Error!";
			var template = "Cannot define your geoposition. " + err;
			$ionicPopup.alert({title: title, template: template});
		}

		function successWeatherRequest(weather) {
			$rootScope.location = LocationService("current location");
			$scope.weather = weather;
			$scope.$apply();
			$ionicLoading.hide();
		}

		function errorWeatherRequest(error) {
			console.log(JSON.stringify(error));
			$ionicPopup.alert({title: "Error", template: "Cannot get weather. " + error});
			$ionicLoading.hide();
		}
})
