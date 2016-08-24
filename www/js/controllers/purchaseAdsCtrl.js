angular.module('app')


.controller('purchaseAdsCtrl', function($scope, $state, Ads, $ionicLoading) {
  $scope.purchased = Ads.purchased();
  $scope.purchase = function() {
    $ionicLoading.show();
    Ads.purchase().then(function() {
      $ionicLoading.hide();
      $scope.purchased = Ads.purchased();
    }, function () {
      $ionicLoading.hide();
    });
  }
})
