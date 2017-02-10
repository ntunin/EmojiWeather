angular.module('app')

.service('Subscription', function( ) {
  return function() {
    return new Subscription();

    function Subscription() {
      this.subscribers = [];
      this.subscribe = function(subscriber) {
        this.subscribers.push(subscriber);
      }
      this.send = function() {
        this.subscribers.forEach(function(subscriber) {
          subscriber();
        });
      }
    }
  }
});
