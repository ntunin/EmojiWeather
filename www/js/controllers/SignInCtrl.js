angular.module('app')

.controller('SignInCtrl', function($scope, $state, User, Emojy, Backgrounds, $ionicLoading, $ionicPopup) {
  $scope.userData = {
    email: "admin@admin.com",
    password: "admin"
  }
	$scope.someParam = "param1";
  $scope.signIn = function() {
    $ionicLoading.show();
    User.signIn($scope.userData).then(
      function() {
        $state.go("app.forecast.current");
        $ionicLoading.hide();
      },
      function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({title: "Error", template: err});
      }
    );
  }
});
