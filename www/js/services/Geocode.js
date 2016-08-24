angular.module('app')

.service('Geocode', function() {
	var requiredFields = {
		"country" : "country",
		"administrative_area_level_1": "state",
		"locality": "city",
		"administrative_area_level_2": "district"
	};

	return function(attr) {
		return new Promise(function(resolve, reject) {
				var location = {};
				configureAttr();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode(attr, useGeocode);

				function useGeocode(results, status) {
					 if (status === google.maps.GeocoderStatus.OK) {
						 getInfoFromGeocodes(results);
						 if(!location.city) location.city = location.district;
	 					 resolve(location);
					 } else {
						 reject('Geocode was not successful for the following reason: ' + status)
					 }
				}

				function getInfoFromGeocodes(results) {
					for(var i = 0; i < results.length; i++) {
						getInfoFromGeocode(results[i]);
					}
				}

				function getInfoFromGeocode(code) {
					if(!location.location && code.geometry) location.location = code.geometry.location;
					for(var j = 0; j < code.types.length; j++) {
						var type = code.types[j];
						if(code.address_components) {
							getInfoFromGeocodes(code.address_components);
							return;
						}
						if (!requiredFields[type]) continue;
						var value = code;
						setLocationInfo(type, value);
					}
				}

				function setLocationInfo(type, value) {
					var locationInfoType = requiredFields[type];
					location[locationInfoType] = value.long_name;
				}

				function configureAttr() {
					if(!attr) return;
					if(typeof attr == "string") {
						attr = {
							address: attr
						}
						return;
					}
					if(attr.location) {
						if(typeof attr.location == "object") {
							var lat = +attr.location.lat;
							var lng = +attr.location.lng;
							attr = {
								location: new google.maps.LatLng(lat, lng)
							}
						}
					} else {
						if(attr.description) {
							attr = {
								address: attr.description
							}
						}
					}
				}

			});
		}
})
