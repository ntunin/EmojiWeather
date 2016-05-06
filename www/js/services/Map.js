angular.module('app')
.service('Map', function($http, config, Location, $cordovaGeolocation) {
	return function(canvas) {		

		
	  	$cordovaGeolocation.getCurrentPosition().then(initialize);

	  	function initialize(position) {
		  	var map;
		  	var geoJSON;
		  	var request;
		  	var gettingData = false;
		  	var openWeatherMapKey = config.openWeatherApiKey;

		    var mapOptions = {
		      zoom: 4,
		      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		    };
		    canvas = document.getElementById(canvas);
		    map = new google.maps.Map(canvas,  mapOptions);

		    google.maps.event.addListener(map, 'idle', checkIfDataRequested);

		    function checkIfDataRequested() {
				while (gettingData === true) {
      				gettingData = false;
    			}
    			getCoords();
  			};

  			function getCoords() {
			    var bounds = map.getBounds();
			    var NE = bounds.getNorthEast();
			    var SW = bounds.getSouthWest();
			    getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
  			};

  			function getWeather(northLat, eastLng, southLat, westLng) {
			    gettingData = true;
			    var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
			                        + westLng + "," + northLat + "," //left top
			                        + eastLng + "," + southLat + "," //right bottom
			                        + map.getZoom()
			                        + "&cluster=yes&format=json"
			                        + "&APPID=" + openWeatherMapKey;

			    $http.get(requestString).then(success, error);

			    function success(response) {
			    	var results = response.data;
				    
				    if (results.list.length > 0) {
				        resetData();
				        for (var i = 0; i < results.list.length; i++) {
				          geoJSON.features.push(jsonToGeoJson(results.list[i]));
				        }

				        drawIcons(geoJSON);
				    }

			    }

			    function error() {

			    }
  			};

  			function jsonToGeoJson(weatherItem) {
			    var feature = {
			      type: "Feature",
			      properties: {
			        city: weatherItem.name,
			        weather: weatherItem.weather[0].main,
			        temperature: weatherItem.main.temp,
			        min: weatherItem.main.temp_min,
			        max: weatherItem.main.temp_max,
			        humidity: weatherItem.main.humidity,
			        pressure: weatherItem.main.pressure,
			        windSpeed: weatherItem.wind.speed,
			        windDegrees: weatherItem.wind.deg,
			        windGust: weatherItem.wind.gust,
			        icon: "http://openweathermap.org/img/w/"
			              + weatherItem.weather[0].icon  + ".png",
			        coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
			      },
			      geometry: {
			        type: "Point",
			        coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
			      }
			    };
			    // Set the custom marker icon
			    map.data.setStyle(function(feature) {
			      return {
			        icon: {
			          url: feature.getProperty('icon'),
			          anchor: new google.maps.Point(25, 25)
			        }
			      };
			    });

			    // returns object
			    return feature;
			}

			function drawIcons(weather) {
		    	map.data.addGeoJson(geoJSON);
		     // Set the flag to finished
		     	gettingData = false;
		  	};
  // Clear data layer and geoJSON
  			function resetData() {
			    geoJSON = {
			      type: "FeatureCollection",
			      features: []
			    };
			    map.data.forEach(function(feature) {
			      map.data.remove(feature);
    			});
  			};

		}
	}
});