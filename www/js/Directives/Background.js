angular.module('app')

.directive('background', function() {
  return {
    restrict: 'A',
    controller: function($scope, Backgrounds, EndPoints, User, $http) {
        $scope.background = "img/background.png";
        $scope.$on("$ionicView.enter", update);
        var subscribed;
        function update() {
            var timeout;
            getPack();
            if(!subscribed) {
              Backgrounds.subscribe(getPack);
              subscribe = true;
            }
            function getPack() {
              Backgrounds.current().then(success, error);
            }
            function success(pack) {
                var background =  Backgrounds.image(pack);
                $scope.background = background;
                apply();

                function apply() {
                  if(timeout) clearTimeout(timeout);
                  timeout = setTimeout(update, 60*60*1000);
                  $scope.$apply();
                }
            }
            function error(err) {
                console.error(err);
            }

        };
    },
    compile: function($element, $attrs) {
      $element.html(
        '<div ng-if = "background" class = "background" style = "background-image: url({{background}});"></div>'
      );
    }
  }
})
