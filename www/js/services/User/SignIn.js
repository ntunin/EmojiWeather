angular.module('app')

.service('SignIn', function(EmailLogIn,  OAuth) {
  return function( data) {
    return (typeof data == "string")? OAuth(data) : EmailLogIn(data);
  }
});
