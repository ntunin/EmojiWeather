angular.module('app')

.directive('background', function() {
  return {
    restrict: 'A',
    controller: function($scope, Backgrounds, EndPoints, User, $http, countedLoading) {
        $scope.background = "img/background.png";
        $scope.$on("$ionicView.enter",
        function(){
          console.log("enter");          
          update();
        });
        var subscribed;
        function update() {
          return new Promise(function(resolve, reject) {
            var timeout;
            if(!subscribed) {
              Backgrounds.subscribe(update);
              subscribe = true;
            }
            Backgrounds.current().then(function(pack) {
              Backgrounds.image(pack).then(function(background) {
                $scope.background = background;
                $scope.$apply();
                resolve();
              })
            }, function() {
              resolve();
            });
          });
        };
    },
    compile: function($element, $attrs) {
      $element.html(
        '<img ng-if = "background" class = "background" ng-src = "{{background}}"></img>'
      );
    }
  }
})
