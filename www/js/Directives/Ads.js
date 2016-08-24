angular.module('app')

.directive('ads', function() {
  return {
    restrict: 'A',
    controller: function($scope, $sce, Ads) {
      getAds();
      var refresher = setInterval(getAds, 45*1000);
      $scope.sce = function(html) {
        return $sce.trustAsHtml(html);
      }
      Ads.subscribe(function() {
        $scope.html = "";
        $scope.$apply();
        clearInterval(refresher);

      });
      function getAds() {
        if(Ads.purchased()) {
          $('.has-ads').removeClass('has-ads');
        }
        Ads.get().then(function(html) {
          $scope.html = html;
          $scope.$apply();
        });
      }
    },
    compile: function($element, $attrs) {
      $element.html(
        '<div class = "ads" ng-bind-html = "sce(html)"></div>'
      );
    }
  }
})
