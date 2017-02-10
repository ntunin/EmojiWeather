angular.module('app')

.service('LocationService', function(LocationAutoDefine) {


	var requiredFields = {
		"country" : "country",
		"administrative_area_level_1": "state",
		"sublocality": "city"
	};
	var subscribers = [];
	var services = {
		"allowed auto define": allowedAutoDefineService,
		"define location": defineLocationService,
		"current location": myLocationService,
		"user locations": userLocationsService,
		"remove user location": removeUserLocationService,
		"is current": isCurrent,
		"subscribe": subscribe
	}
	function subscribe(subscriber) {
		subscribers.push(subscriber);
	}
	return function(name, value) {
		var service = getService(name);
		return service(value);
	}

	function getService(name) {
		var service = services[name];
		if(!service) throw "There is not requested service";
		return service;
	}
	function defineLocationService(value) {
		return defineLocation();
	}
	function allowedAutoDefineService(value) {
		if(localStorage.ew_autodefine === undefined) localStorage.ew_autodefine = true;
		return apply(localStorage, "ew_autodefine", value);
	}

	function myLocationService(value) {
		if(value) return setUserLocation(value);
		return getUserLocation();
	}

	function apply(source, key, value) {
		if(value !== undefined) {
			source[key] = value;
		} else {
			return source[key];
		}
	}

	function defineLocation() {
		return new Promise(function(resolve, reject) {
				var location = getUserLocation();
				if(location) {
					resolve(location);
					return;
				}
				LocationAutoDefine().then(successLocationDefine, errorLocationDefine);
				var rejected;
				var timeOut = setTimeout(function(){
					errorLocationDefine("Location service do not responce");
				}, 30000)
				function successLocationDefine(location) {
						setUserLocation(location);
						resolve(location);
				}

				function errorLocationDefine(error) {
						reject(error);
				}
			}
		);
	}

	function userLocationsService(value) {
		if(value) {
			return setUserLocation(value);
		} else {
			return getUserLocations();
		}
	}
	function setUserLocation(value) {
		localStorage.ew_current_location = JSON.stringify(value);
		var locations = getUserLocations();
		subscribers.forEach(function(subscriber) {
			subscriber();
		});
		if(~indexOf(locations, value)) return locations;
		locations.push(value);
		localStorage.ew_user_locations = JSON.stringify(locations);
		return locations;
	}
	function getUserLocation() {
		var value = localStorage.ew_current_location;
		if(value)	return JSON.parse(value);
	}
	function removeUserLocationService(value) {
		var locations = getUserLocations();
		var index = indexOf(locations, value);
		if(index < 0) return locations;
		locations.splice(index, 1);
		localStorage.ew_user_locations = JSON.stringify(locations);
		return locations;
	}
	function indexOf(locations, value) {
		var result = -1;
		locations.forEach(function(element, index) {
			if (isEqual(element, value)) result = index;
		});
		return result;
	}
	function getUserLocations() {
		var locations = localStorage.ew_user_locations;
		if(!locations) return [];
		return JSON.parse(locations);
	}

	function isCurrent(value) {
		var stored = localStorage.ew_current_location;
		if(!stored) return false;
		var location = JSON.parse(stored);
		return isEqual(value, location);
	}

	function isEqual(a, b) {
		if(!a || !b) return false;
		var result = true;
		["city", "country", "state"].forEach(function(element){
			if(a[element] != b[element]) result = false;
		});
		return result;
	}
})
