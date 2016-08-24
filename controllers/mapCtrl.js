angular.module('app')

   
.controller('mapCtrl', ["$scope", "$state", "Map", function($scope, $state, Map) {
	Map('map-canvas');
	// function getCoords() {
	//     var bounds = map.getBounds();
	//     var NE = bounds.getNorthEast();
	//     var SW = bounds.getSouthWest();
	//     Map(NE.lat(), NE.lng(), SW.lat(), SW.lng());
	// };
	  
	//   function initialize() {

	//     // Add interaction listeners to make weather requests

	//     // Sets up and populates the info window with details
	//     map.data.addListener('click', function(event) {
	//       infowindow.setContent(
	//        "<img src=" + event.feature.getProperty("icon") + ">"
	//        + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
	//        + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
	//        + "<br />" + event.feature.getProperty("weather")
	//        );
	//       infowindow.setOptions({
	//           position:{
	//             lat: event.latLng.lat(),
	//             lng: event.latLng.lng()
	//           },
	//           pixelOffset: {
	//             width: 0,
	//             height: -15
	//           }
	//         });
	//       infowindow.open(map);
	//     });
	//   }


	//   // Get the coordinates from the Map bounds


	//   var infowindow = new google.maps.InfoWindow();

	//   // For each result that comes back, convert the data to geoJSON
	//   var jsonToGeoJson = function (weatherItem) {
	//     var feature = {
	//       type: "Feature",
	//       properties: {
	//         city: weatherItem.name,
	//         weather: weatherItem.weather[0].main,
	//         temperature: weatherItem.main.temp,
	//         min: weatherItem.main.temp_min,
	//         max: weatherItem.main.temp_max,
	//         humidity: weatherItem.main.humidity,
	//         pressure: weatherItem.main.pressure,
	//         windSpeed: weatherItem.wind.speed,
	//         windDegrees: weatherItem.wind.deg,
	//         windGust: weatherItem.wind.gust,
	//         icon: "http://openweathermap.org/img/w/"
	//               + weatherItem.weather[0].icon  + ".png",
	//         coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
	//       },
	//       geometry: {
	//         type: "Point",
	//         coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
	//       }
	//     };
	//     // Set the custom marker icon
	//     map.data.setStyle(function(feature) {
	//       return {
	//         icon: {
	//           url: feature.getProperty('icon'),
	//           anchor: new google.maps.Point(25, 25)
	//         }
	//       };
	//     });

	//     // returns object
	//     return feature;
	//   };

	//   // Add the markers to the map
	//   var drawIcons = function (weather) {
	//      map.data.addGeoJson(geoJSON);
	//      // Set the flag to finished
	//      gettingData = false;
	//   };

	//   // Clear data layer and geoJSON
	//   var resetData = function () {
	//     geoJSON = {
	//       type: "FeatureCollection",
	//       features: []
	//     };
	//     map.data.forEach(function(feature) {
	//       map.data.remove(feature);
	//     });
	//   };

}])