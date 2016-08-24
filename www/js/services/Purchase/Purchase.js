angular.module('app')

.service('Purchase', function(AuthorizedRequest, EndPoints, AndroidBilling, StroreKit, $ionicPlatform) {
  var native;
  return function(id) {
    if(!window.device) {
      return new Promise(function (resolve, reject) {
        resolve("success");
        return;
      });

    }


      if($ionicPlatform.is('Android')) {
        native = AndroidBilling;
      }
      if($ionicPlatform.is('iOS')) {
        native = StoreKit;
      }

    return native.buy(id);

  }

});
