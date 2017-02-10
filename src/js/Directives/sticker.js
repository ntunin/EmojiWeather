angular.module('app')
.directive('sticker', function() {
  var load;
  return {
    restrict: 'E',
    templateUrl: 'templates/sticker.html',
    scope: {
      info: "=info"
    },
    controller: function($scope) {
      $scope.ready = function() {
        if($scope.info) {
          var element = $scope.element;
          var img = $(element).find("img");
          var framesCount = $scope.info.framesCount;
          var speed = $scope.info.speed;
          var frame = 0;
          var offset = 100/framesCount;
          loop();

          function loop() {
            if(frame >= framesCount) frame = 0;
            img.css("transform", "translate(-"+(frame++)*offset+"%, 0px)");
            setTimeout(loop, speed);
          }
        }
      }
    },
    link: function(scope, element, attrs) {
      scope.element = $(element);
      scope.ready();
    },
  };
});
