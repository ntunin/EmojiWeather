angular.module('app')

.directive('ads', function() {
  return {
    restrict: 'A',
    controller: function($scope, $sce, Ads) {
      var refresher = setInterval(getAds, 45*1000);
      $scope.$on("$ionicView.enter", getAds);
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
        } else {
          Ads.get().then(
            function(html) {
              if(Ads.purchased()) {
                $('.has-ads').removeClass('has-ads');
                $scope.html = null;
              } else {
                $scope.html = html;
              }
              $scope.$apply();
            }
          );
        }
      }
    },
    compile: function($element, $attrs) {
      $element.html(
        '<div class = "ads" ng-bind-html = "sce(html)"></div>'
      );
    }
  }
})
