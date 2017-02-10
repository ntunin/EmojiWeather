angular.module('app')

.service('LocalObserverService', function() {
  var subscribers = {};

  return {
    subscribe: subscribe,
    notufy: notify
  }

  function subscribe(handle, subscriber) {
    subscribers[handle] = subscribers[handle] || [];
    subscribers[handle].push(subscriber);
  }

  function notify(handle, data) {
    var arr = subscribers[handle];
    for(var i = 0; i < arr.length; i++) {
      var subscriber = arr[i];
      subscriber(data);
    }
  }
});
