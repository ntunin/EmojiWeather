angular.module('app')

.controller('SingUpCtrl', function($scope, $state, $ionicPopup, countedLoading, LocationService, Geocode, SignUp) {
  countedLoading.show();

  $scope.userData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  LocationService("define location").then(
    function(loc) {
      countedLoading.hide();
      $scope.location = loc.city + ", " + loc.state + ", " + loc.country;
    },
    function (err) {
      countedLoading.hide();
      $ionicPopup.alert({title: "Warning", template: "Cannot difine your location"});
    }
  );


  $scope.setLocation = function(loc) {
    Geocode(loc).then(
      function (location) {
        LocationService("user locations", location);
      },
      function (err) {
          $ionicPopup.alert({title: "Error", template: "Location is required"});
      }
    );
  }



  $scope.signUp = function() {
    SignUp("email", $scope.userData).then(
      function (response) {
        $state.go("signIn");
      },
      function (err) {
        $ionicPopup.alert({title: "Error", template: err});
      }
    );
  }
})
