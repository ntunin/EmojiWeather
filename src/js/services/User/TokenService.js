angular.module('app')

.service('TokenService', function( $ionicPopup, User, EndPoints ) {
  this.refresh = function() {
    return new Promise(function(resolve, reject) {
      var user = User.me();
      if(typeof user != "object") {
        return reject();
      }
      var url = EndPoints.action('refresh') + "?token="+user.token;
      $.ajax({
        method: "POST",
        url: url,
        success: success,
        error: refreshError,
        beforeSend: beforeSend
      })

      function beforeSend(xhr) {
          xhr.setRequestHeader ("Authorization", "Bearer "+ user.token);
      }

      function success(response) {
        user.token = fetchTokenFromResponse(response);
        User.me(user);
        resolve();
      }

      function fetchTokenFromResponse(response) {
        if(typeof response == "string" && ~response.indexOf("<script>")) {
          response = $(response);
          return response.find("span").html();
        } else if(typeof response == "object") {
          return response.token;
        }
      }

      function refreshError(err) {
        var logInData = (user.OAuth)? user.service :  user;
        User.signIn(logInData).then(function() {
          resolve();
        }, function (err) {
          User.me("reset");
          reject();
        });
      }
    });
  }
  return this;
});
