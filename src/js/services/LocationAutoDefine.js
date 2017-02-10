angular.module('app')

.service('LocationAutoDefine', function($cordovaGeolocation, Geocode) {
	var requiredFields = {
		"country" : "country",
		"administrative_area_level_1": "state",
		"sublocality": "city"
	};

	return function() {
		return new Promise(function(resolve, reject) {
			try {
				autoDefineLocation();

				function autoDefineLocation() {
					$cordovaGeolocation.getCurrentPosition().then(defineLocationByCoords, geolocationError);
				}

				function defineLocationByCoords(position) {
					var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var geocoder = new google.maps.Geocoder();
					Geocode({'location': latLng}).then(
						function(location) {
							resolve(location);
						},
					 	function(err){
							reject(err);
						});
				}

				function geolocationError(err) {
					reject("Unable to define your location");
				}

			} catch (e) {
				reject(e);
			}
		});
	}


})
