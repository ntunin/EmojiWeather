angular.module('app')

.service('Purchase', function(AuthorizedRequest, EndPoints, AndroidBilling, StoreKit, $ionicPlatform) {
  var native;

  if($ionicPlatform.is('Android')) {
    native = AndroidBilling;
  }
  if($ionicPlatform.is('iOS')) {
    native = StoreKit;
  }

  return function(id) {
    if(!window.device) {
      return new Promise(function (resolve, reject) {
        resolve("success");
        return;
      });

    }

    return native.buy(id);

  }

});
