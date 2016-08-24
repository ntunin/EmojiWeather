angular.module('app')

.service('SignUp', function( EmailSignUp ) {
  return function(type, data) {
    var services = {
      email: EmailSignUp
    }
    return new Promise(services[type](data));
  }
});
