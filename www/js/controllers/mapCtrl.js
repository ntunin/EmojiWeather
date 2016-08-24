angular.module('app')


.controller('mapCtrl', function($scope, $state, Map, LocationService, Emojy, $ionicLoading, $ionicPopup) {
  var needCheckLocation = true;
  var map;
  $scope.findLocation = function(location) {
    address = location;
    map = Map('map-canvas', address);
  }
  $scope.location = "";
  $scope.$on("$ionicView.enter", function () {
    if(!needCheckLocation) return;
    var location = LocationService("current location");
    if(location) $scope.findLocation (location);
    else {
      $ionicLoading.show();
      LocationService("define location").then($scope.findLocation,
        function(err) {
          $ionicLoading.hide();
          $ionicPopup.alert({title: "Warning!", template: "There is not some user location info"});
          $state.go('app.changeLocation');
        }
      );
    }

  });
  Emojy.subscribe(function () {
    map.reset();
  });
  function getAdress(location) {
  		var address = [location.country, location.state, location.city].join(", ");
  		return address;
  }
})
