angular.module('app')

.controller('SignInCtrl', function($scope, $state, User, Emojy, Backgrounds, countedLoading, $ionicPopup) {
  $scope.userData = {
    email: "",
    password: ""
  }
	$scope.someParam = "param1";
  $scope.signIn = function() {
    countedLoading.show();
    User.signIn($scope.userData).then(
      function() {
        $state.go("app.forecast.current");
        countedLoading.hide();
      },
      function(err) {
        countedLoading.hide();
        $ionicPopup.alert({title: "Error", template: err});
      }
    );
  }
});
