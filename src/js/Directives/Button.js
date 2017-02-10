angular.module('app')

.directive('animatedUiSref', function() {
  return {
    restrict: 'A',
    scope: true,
    controller: function($scope, $state) {
      $scope.go = function() {
        $state.go($scope.ref);
      }
    },
    link: function ($scope, $element, $attrs) {
      $element = $($element);
      $scope.ref = $attrs.animatedUiSref;
    	animateAction($element, $scope.go);
    }
  }
})
.directive('animatedClick', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function ($scope, $element, $attrs) {
      $element = $($element);
      var mainScope = $scope;
      animateAction($element, getAction());

      function getAction() {
        var animatedClick = $attrs.animatedClick;
        var parsedClick = animatedClick.split(/\(|\)/);

        var method = getMethod();
        var attrs = getAttrs();

        return function() {
          method.apply(method, attrs);
        }
        function getMethod() {
          var name = parsedClick[0];
          return mainScope[name];
        }

        function getAttrs() {
          var attrs = [];
          parsedClick[1].split(/,/).forEach(
            function(element) {
              attrs.push(mainScope[element]);
            }
          );
          return attrs;
        }

      }
    }
  }
})

function animateAction($element, action) {

  $element.click(function(){
    var marker = $('<div class = "active-button-marker"></div>');
    $element.append(marker);
    var duration = 700;
    setTimeout(function(){marker.remove(); action()}, duration)
  });

}
