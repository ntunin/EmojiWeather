angular.module('app')

.service('ResumeService', function(EmailLogIn,  OAuth) {
  var subscribers = [];
  document.addEventListener("resume", resume, false);

  this.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }

  return this;

  function resume() {
    subscribers.forEach(function(subscriber) {
      subscriber();
    })
  }
});
