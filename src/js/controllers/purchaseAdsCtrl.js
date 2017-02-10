angular.module('app')


.controller('purchaseAdsCtrl', function($scope, $state, Ads, countedLoading) {
  $scope.purchased = Ads.purchased();
  $scope.purchase = function() {
    countedLoading.show();
    Ads.purchase().then(function() {
      countedLoading.hide();
      $scope.purchased = Ads.purchased();
    }, function () {
      countedLoading.hide();
    });
  }
})
