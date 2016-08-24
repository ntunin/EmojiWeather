angular.module('app')

.service('EmailLogIn', function($http, EndPoints, config) {
  return function (data) {
    return new Promise(function(resolve, reject) {
      $.ajax({
          method: "POST",
          dataType: "json",
          data: data,
          crossDomain: true,
          url: EndPoints.action('authenticate'),
          success: success,
          error: error
      });
      function success ( response ) {
        var user = response.user;
        resolve ({
          email: data.email,
          password: data.password,
          avatar: config.server + user.avatar_url,
          name: user.name,
          token: response.token
        });
      }
      function error ( err ) {
        var message;
        message = (err.status == 401)?
          "Invalid username or password" :
          "Invalid request";
        reject( message );
      }
    });
  }
});
