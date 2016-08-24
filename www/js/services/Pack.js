angular.module('app')

.service('Pack', function(EndPoints, AuthorizedRequest, SingleRequest, Purchase, User) {
  return function(options) {
    var pack;
    var subscribers = [];
    var required = [
      {name: 'available', message: "Available packs action required"},
      {name: 'all', message: "All packs action required"},
      {name: 'name', message: "Name required"},
      {name: 'purchase', message: "Purchase action required"}];

    required.forEach(function(requirement) {
      if(!options[requirement.name]) throw requirement.message;
    })
    var lists = {};
    User.me("subscribe", function() {
          pack = null;
          lists = {};
    });
    var request = new SingleRequest();
    return {
      all: function() {
        return list(options.all);
      },
      available: function() {
        return list(options.available);
      },
      current: current,
      subscribe: subscribe,
      purchase: purchase
    }

    function subscribe(subscriber) {
      subscribers.push(subscriber);
    }

      function list(action) {
        return new Promise(
          function(resolve, reject) {

            if(lists[action]) {
              resolve(lists[action]);
              return;
            }

                var url = EndPoints.action(action);
                AuthorizedRequest("GET", url).then(
                    function(response) {
                      var packsList = [];
                      for(var field in response) {
                        var item = response[field];
                        if(Array.isArray(item)) {
                            item.forEach(function(item) {
                              var pack = {
                                name: item.name,
                                id: item.id,
                                picture: EndPoints.url(item.preview_img),
                              }
                              if(typeof item.cost != "undefined") pack.cost = item.cost;
                              if(typeof item.available != "undefined") pack.available = +item.available;
                              if(typeof item.sku != "undefined") pack.sku = item.sku;
                              packsList.push(pack);
                            });
                        }
                      }
                      lists[action] = packsList;
                      resolve(packsList);
                    },

                    function (err) {
                      reject(err);
                    }
                );
          }
        );
      }

      var currentPack;
      function current( data ) {
        if(typeof data == "undefined") {
          return getCurrentPack();
        } else {
          setCurrentPack(data);
        }

        function getCurrentPack() {
            return new Promise(function(resolve, reject) {
              if(currentPack) {
                resolve(currentPack);
                return;
              }

              list(options.available).then(
                function( list ) {
                  var packName = localStorage[options.name] || "Default";

                  list.forEach(function(item) {
                      if(packName == item.name) pack = item;
                  });

                  setCurrentPack(pack);
                  resolve(pack);
                },
                reject
              );
            });
          }

          function setCurrentPack(pack) {
            if(!pack) return;
            currentPack = pack;
            localStorage[options.name] = pack.name;
            apply();
          }


      }
      function apply() {
          subscribers.forEach(function(subscriber) {
            subscriber();
          });
      }
      function purchase( item ) {
          return new Promise(function(resolve, reject) {
                Purchase(item.sku).then( sendAboutPurchase, reject);

                function sendAboutPurchase() {
                    AuthorizedRequest("POST", url(), {sku: item.sku}).then(managePurchased, reject);

                    function url() {
                        return EndPoints.action(options.purchase);
                    }
                }

                function managePurchased() {
                    var all = lists[options.all];
                    var index = all.indexOf(item);
                    all.splice(index, 1);
                    lists[options.available].push(item);
                    apply();
                    resolve();
                }
          });


      }
  }
});
