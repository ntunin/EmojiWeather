angular.module('app')

.service('StoreKit', function($ionicPlatform) {
  var purchaseProcess;
  var success;
  var error;
  init();

  return {
    buy: buy
  }

  function isPluginAvailabel() {
    return (window.device && device.platform == "iOS") && window.storekit;
  }

  function init() {
    $ionicPlatform.ready(function() {
      if((isPluginAvailabel())) {
        storekit.init({
            debug:    true,
            ready:    function() {
              console.log("StoreKitReady")
            },
            purchase: function(transactionId, productId, receipt) {
              alert("Purchased product id " + productId);
              success(productId);
            },
            restore:  function(transactionId, productId, transactionReceipt) {
              alert("Restored product id" +productId+ "purchase")
            },
            error:    function(errorCode, errorMessage) {
              alert("ERROR: " + errorMessage);
              error(errorMessage);
            }
          })

      } else {
        console.error("plugin not availabel");
        return;
      }
    });
  }


  function buy(packId) {
    return new Promise(function(resolve, reject) {
        success = resolve;
        error = reject;
        storekit.purchase(packId);
    });
  }

});
