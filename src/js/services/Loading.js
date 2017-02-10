angular.module('app')

.service('countedLoading', function($ionicLoading) {
  var count = 0;
  return {
    show: function() {
      if(0 < count++) return;
      $ionicLoading.show();
    },
    hide: function() {
      if(count) count--;
      if(!count) $ionicLoading.hide();
    }
  }
});
