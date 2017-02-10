angular.module('app')

.service('Sleep', function( ) {
  return function(millis) {
      var date = new Date();
      var curDate = null;
      do { curDate = new Date(); }
      while(curDate-date < millis);
  }
});
