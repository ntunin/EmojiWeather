angular.module('app')
.controller('OnboardingCtrl', ["$scope", "$element", "$attrs", "strings", function($scope, $element, $attrs, strings){
  var params =  $attrs.onboarding.split(' ');
  var selector = params[0];
  var delay = 0 || params[1]*1000;
  var duration = 3000 || params[2]*1000;

  var reference = $(selector);
  var element = $($element);
  var referencePosition = reference.position();
  setupContent();
  setupPointer();
  function setupContent() {
    var onboardingContent = element.find('.onboarding-content');
    onboardingContent.html(strings(selector));
  }
  function setupPointer() {
    var pointer = element.find('.onboarding-pointer');
    pointer[0].style = "top: 0px; left:"+referencePosition.left + reference.width()/2+"px;";
  }
  setTimeout(appear, delay);
  function appear() {
    fade();
    setTimeout(remove, duration);
    element.click(remove);

    function fade() {
      element.fadeTo(1000, 1);
    }
  }
  var destroy = function() {
    element.remove()
  };
  function remove() {
      fade();
      setTimeout(destroy, 1000);
      function fade() {
        element.fadeTo(1000, 0);
      }
  }


  element[0].style = "top: "+(referencePosition.top+reference.height()/2)+"px; left: 20px;";

}])
.directive('onboarding', function() {
  return {
    restrict: 'A',
    compile: function($element, $attrs) {
      $element.addClass('onboarding');
      $element.html(
        "<div class = 'onboarding-content'></div>"+
        "<div class = 'onboarding-pointer'></div>"
      );
    },
    controller: 'OnboardingCtrl'
  }
})
