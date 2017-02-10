angular.module('app')

.controller('WelcomePageCtrl', function($scope, $state, User, $ionicPopup) {
  $scope.logInWith = function(service) {
    User.signIn(service).then(
      function( response ) {
        console.log(response);
        $state.go("app.forecast.current");
      },
      function ( err ) {
        $ionicPopup.alert({
          title: "Warning",
          template: JSON.stringify(err)
        });
      }
    );
  }
})
