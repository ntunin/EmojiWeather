angular.module('app')

.service('RegistationRequired', function($ionicPopup, User, $state) {
  return function (target) {
    if(!User.me().fake) {
      $state.go(target);
      return;
    }
  $ionicPopup.confirm({title: "Registration required", template: "To use this functional you need to create weather wiggy profile or login with social network."}).then(
    function(answer) {
      if(!answer) return;
      $state.go("welcome");
    });
  }
});
