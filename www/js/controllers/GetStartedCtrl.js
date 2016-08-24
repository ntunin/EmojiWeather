angular.module('app')

.controller('GetStartedCtrl', function($scope, $state, UserData, $ionicLoading) {
  $scope.$on("$ionicView.enter", function() {
    var target = (UserData())? "app.forecast.current" : "welcome";
    $state.go(target);
  })
})
