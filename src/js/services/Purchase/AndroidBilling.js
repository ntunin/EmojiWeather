angular.module('app')

.service('AndroidBilling', function() {
  var purchases;
  init();
  return {
    buy: buy,
    purchases: purchases
  }
  function isPluginAvailabel() {
    return window.device && device.platform == "Android" && typeof inappbilling !== "undefined";
  }
  function init() {
      if(!isPluginAvailabel()) return;
      inappbilling.init(success, error);

      function success( response ) {
        purchases().then(function(response) {
          console.log("Android in-app billing initialized success");
        }, function (err) {
          console.log("Android in-app billing initialize fail occured");
        });
      }

      function error(err) {
        alert(JSON.stringify(err))
      }
  }
  function purchases() {
    return new Promise(function(resolve, reject) {
        if(purchases) {
          resolve(purchases);
          return;
        }
        inappbilling.getPurchases(success, error);

        function success(response) {
          resolve(response);
        }

        function error(err) {
          reject(err);
        }

    });
  }
  function getPurchases() {


    function success(response) {
      alert("PURCHASES " + JSON.stringify(response));
    }

    function error(err) {
      alert(JSON.stringify(err))
    }
  }

  function buy(sku) {
    return new Promise(function (resolve, reject) {
        inappbilling.consumePurchase(function() {
          inappbilling.buy(success, fail, sku);
        }, function() {
          inappbilling.buy(success, fail, sku);
        }, sku)

        function success(response) {
          resolve(response);
        }
        function fail(err) {
          reject(err);
        }
    });
  }


});
