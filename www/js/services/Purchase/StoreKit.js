angular.module('app')

.service('StroreKit', function() {
  var purchaseProcess;
  if((isPluginAvailabel())) {
      init();
  } else {
    console.error("plugin not availabel");
    return;
  }
  var success;
  var error;

  return {
    buy: buy
  }

  function isPluginAvailabel() {
    return window.device && device.platform == "iOS" && typeof storekit !== "undefined";
  }
  function init() {
    storekit.init({
        debug:    true,
        ready:    function() {
        },
        purchase: function(transactionId, productId, receipt) {
          console.log("Purchased product id " + productId);
          success(productId);
        },
        restore:  function(transactionId, productId, transactionReceipt) {
          console.log("Restored product id" +productId+ "purchase")
        },
        error:    function(errorCode, errorMessage) {
          console.log("ERROR: " + errorMessage);
          error(errorMessage);
        }
      })
    }


  function buy() {
    return new Promise(function(resolve, reject) {
        storekit.purchase('default_background_pack');
        success = resolve;
        error = reject;
    });
  }

});
