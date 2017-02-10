angular.module('app')

.service('EmailSignUp', function($http, EndPoints, UserDataVerify) {
  return function (data) {
    return function(resolve, reject) {
      UserDataVerify(data, ["name", "email", "password"]).then(signUp, reject);

      function signUp() {
        $.ajax({
          method: "POST",
          data: data,
          crossDomain: true,
          url: EndPoints.action('register'),
          success: success,
          error:  error
        });

        function success( response ) {
            if(response && response.error) {
              error(response.error);
            } else {
              resolve();
            }
        }

        function error( err ) {
            var message = getErrorMessage();
            reject( message );

            function getErrorMessage() {
                var message = "";
                for(var key in err) {
                    var issue = "";
                    var issues = err[key];
                    for(var i = 0; i < issues.length; i++) {
                        issue += issues[i] + "\n";
                    }
                    message += issue + "\n";
                }
                return message;
            }
        }
      }
    }
  }
});
