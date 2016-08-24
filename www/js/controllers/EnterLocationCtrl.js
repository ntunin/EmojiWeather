angular.module('app')


.controller('EnterLocationCtrl', function($scope, $state, LocationService, Geocode ) {
  $scope.location = "";
  $scope.allowGeolocation = LocationService("allowed auto define");
  $scope.userLocations = LocationService("user locations");
  $scope.addLocation = function(loc) {
    Geocode(loc).then(
      function (location) {
        $scope.userLocations = LocationService("user locations", location);
        $scope.$apply();
      },
      function (err) {
          throw err;
      }
    );
  }
  $scope.isSelected = function(item) {
    return LocationService("is current", item)? "item-selected": "";
  }
  $scope.remove = function(item) {
    $scope.userLocations = LocationService("remove user location", item);
  }
  $scope.select = function(item) {
    LocationService("current location", item);
  }
})
