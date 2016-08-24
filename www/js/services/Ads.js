angular.module('app')

.service('Ads', function(AuthorizedRequest, Purchase, EndPoints) {
  var id;
  var subscribers = [];

	return {
    get: get,
    purchase: purchase,
    subscribe: subscribe,
    purchased: purchased
  }
  function subscribe(subscriber) {
    subscribers.push(subscriber);
  }
  function purchased () {
    return localStorage.ew_ads_purchased;
  }
  function purchase() {
    return new Promise(function(resolve, reject) {
        Purchase('com.rhinoda.weatherwiggy.removeads').then(
          function() {
            localStorage.ew_ads_purchased = "yes";
            apply();
            resolve();
          },
          function(err) {
            console.error(err);
            reject();
          }
        );
    });
  }
  function apply() {
    subscribers.forEach(function(subscriber) {  subscriber()  });
  }
  function get() {
    return new Promise(function(resolve, reject) {
        if(localStorage.ew_ads_purchased) {
          apply();
          return;
        }
        AuthorizedRequest("GET", EndPoints.action('get-advertising') + getParams()).then(success, reject);

        function getParams() {
          return (id)? "?current_ad_id=" + id : "";
        }

        function success(response) {
          id = response.id;
          resolve(response.html);
        }
    });
  }
});
