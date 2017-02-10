angular.module('app')

.controller('SettingsCtrl', function($scope, $state, config, User, RegistationRequired) {
  $scope.temp = config.tempMetric;
  $scope.changeTemp = function(v) {
    $scope.temp=v;
    config.setTempMetric(v);
  }
  $scope.confirm = RegistationRequired;
});
