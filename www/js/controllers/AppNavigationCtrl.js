angular.module('app')


.controller('AppNavigationCtrl', function($scope, $rootScope, $state, $ionicSideMenuDelegate, User ) {
  $rootScope.mainPage = true;
  $rootScope.moment = moment;
  reload();
  User.me("subscribe", reload);
  function reload() {
    $scope.user = User.me();
  }
  $scope. getMenuButtonClass = function() {
    return ($ionicSideMenuDelegate.isOpen())? "ion-android-close" : "ion-navicon";
  }
  $scope.logOut = function() {
    User.logOut().then(
      function() {
        $state.go("welcome");
      },
      function( err ) {
        throw err;
      });
  }
})
