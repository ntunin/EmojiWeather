angular.module('app')
.controller('OnboardingCtrl', function($scope, $element, $attrs, strings){
  var params =  $attrs.onboarding.split(' ');
  var selector = params[0];
  var delay = 0 || params[1]*1000;
  var duration = 3000 || params[2]*1000;

  var reference = $(selector);
  var element = $($element);
  var referenceOffset = reference.offset();
  var referenceHCenter = referenceOffset.left + reference.width()/2;
  var referenceVCenter = referenceOffset.top + reference.height()/2;
  var vLoc = "bottom"
  var vOffset = 0;
  setupContent();
  setupPointer();
  if(referenceVCenter > $('ion-content').height()/2) {
    vLoc = "top";
      vOffset = -2*element.height();
  }
  element.offset({top: (referenceVCenter - 44 + vOffset), left: 20});

  setTimeout(appear, delay);

  function defineIsUnderReference() {
    var screenCenter = $('ion-content').height()/2;
    return (vCenter < screenCenter);
  }
  function setupContent() {
    var onboardingContent = element.find('.onboarding-content');
    onboardingContent.html(strings(selector));
  }
  function setupPointer() {
    var pointer = element.find('.onboarding-pointer');
      var offset = {left: referenceHCenter};
      offset[vLoc] = 0;
      pointer.offset(offset);
  }
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

})
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
