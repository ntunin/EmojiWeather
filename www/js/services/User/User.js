angular.module('app')

.service('User', function(SignIn, SignUp, UserData, EndPoints) {
  return {
    signIn: signIn,
    signUp: signUp,
    logOut: logOut,
    me: UserData
  }

  function signIn(data) {
    return new Promise(
      function( resolve, reject ) {
        SignIn(data).then(
          function( response ) {
            UserData(response);
            resolve(response);
          },
          function (error ) {
            reject(error);
          }
        );
      }
    );
  }

  function signUp() {
    return new Promise(
      function(resolve, reject) {
        SignUp()
      }
    );
  }
  function logOut() {
    return new Promise(function (resolve, reject) {
      UserData("reset");
      resolve();
    });
  }

});
