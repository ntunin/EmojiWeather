angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])


.directive('background', function() {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
    	$scope.$broadcast('scroll.resize');
    },
    compile: function($element, $attrs) {
      $element.html(
        '<div class = "background" style = "background-image: url({{background}});"></div>'
      );    
    }
  }
})