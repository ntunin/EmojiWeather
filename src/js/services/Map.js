angular.module('app')
.service('Map', function($http, config, Geocode, EndPoints, AuthorizedRequest, Emojy) {
	var requestTimeout;
	return function(canvas, address) {
			var map;
			Geocode(address).then(useGeocode)
			return {
				reset: function() {
					map.reset();
				}
			}
			function useGeocode(geocode) {
				position = geocode.location;
				if(map) {
					map.center = position;
				} else {
					initialize(position);
				}
			}
	  	function initialize(position) {
		  	var geoJSON;
		  	var request;
		  	var openWeatherMapKey = config.openWeatherApiKey;
		    canvas = document.getElementById(canvas);

				createNativeMap();

				function createNativeMap() {
						map = new google.maps.Map(canvas,  {
							zoom: 8,
							center: position
						});
						google.maps.event.addListener(map, 'idle', checkIfDataRequested);
						map.reset = function() {
							reset();
							getCoords();
						}
				}

		    function checkIfDataRequested() {
					if(requestTimeout) return;
    			getCoords();
  			};

  			function getCoords() {
			    var bounds = map.getBounds();
			    var NE = bounds.getNorthEast();
			    var SW = bounds.getSouthWest();
					getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
  			};

  			function getWeather(northLat, eastLng, southLat, westLng) {
					var requestString = EndPoints.action("get-forecast-cities-within-rectangle-zone") +
						"?lon_left=" + westLng +
						"&lat_bottom=" + southLat +
						"&lon_right="+ eastLng+
						"&lat_top="+ northLat +
						"&zoom=" + map.getZoom();
						AuthorizedRequest("GET", requestString).then(success, error);

			    function success(response) {
						clearTimeout(requestTimeout);
						requestTimeout = setTimeout(function() {
							requestTimeout = null;
						}, 1000);
						Emojy.current().then(
							function (pack) {
									reset();
									var count = response.length;
							    if (response.length > 0) {
							        for (var i = 0; i < count && i < 10; i++) {
												try {
							          	jsonToGeoJson(response[i], pack)
												} catch (e) {
													continue;
												}
							        }
							    }
							},
							function (err) {
								throw err;
							}
						);

			    }

			    function error() {

			    }
  			};
				var markers = [];
  			function jsonToGeoJson(weatherItem, pack) {
					var icon = weatherItem.weather[0].icon;
					var ampm = {"n":"AM", "d":"PM"}[icon.substr(icon.length - 1, 1)];
					var image = {
						  url: Emojy.image(
								pack,
								{
									ampm: ampm,
									condition: weatherItem.weather[0].main
								},
								'open-weather-map'
							),
						  size: new google.maps.Size(60, 60),
						  origin: new google.maps.Point(0, 0),
						  anchor: new google.maps.Point(30, 30),
						  scaledSize: new google.maps.Size(60, 60)
						};

					var marker = new google.maps.Marker({
            position: {lat: weatherItem.coord.lat, lng: weatherItem.coord.lon},
            icon: image,
						optimized: false,
						map: map
          });
					marker.setMap(map);
					markers.push(marker);
					element = "<div class = 'city-weather blank'>";
					[
						{name: "City", value: weatherItem.name},
						{name: "Weather", value: weatherItem.weather[0].main},
						{name: "Temperature", value: weatherItem.main.temp + "&deg;C"},
						{name: "Pressure", value: weatherItem.main.pressure+ "hb"},
						{name: "Humidity", value: weatherItem.main.humidity+"%"},
						{name: "Wind Speed", value: weatherItem.wind.speed+"m/s"},
						{name: "Wind Degree", value: weatherItem.wind.deg + "&deg;"},
					].forEach(function(item) {
						element += "<div>"+item.name +" : "+item.value+"</div>";
					});
					element += "</div>"

					var infowindow = new google.maps.InfoWindow({
						content: element
					});
					google.maps.event.addDomListener(marker, "mousedown", function() {
						clearTimeout(requestTimeout);
						requestTimeout = setTimeout(function() {
							requestTimeout = null;
						}, 2*1000);
	          infowindow.open(map, marker);
					});

			}

			function reset() {
				markers.forEach(function(marker) {
					marker.setMap(null);
				});
				markers = [];
			}

		}
	}
});
