angular.module('app')

.service('SingleRequest', function() {
  return function() {
    var waiting = [];
    var processor;

    this.send = function(request) {
      return new Promise(function (resolve, reject) {
        waiting.push({resolve: resolve, reject: reject});
        if(processor) return;
        processor = setTimeout(function() {
          request().then(
            function (response) {
              apply('resolve', response);
            },
            function (err) {
              apply('reject', err);
            });
        });
      });

      function apply(action, response) {
        processor = null;
        var processing = waiting;
        waiting = [];

        processing.forEach(
          function(handler) {
            handler[action](response);
          });
        }
      }
    }
  });
