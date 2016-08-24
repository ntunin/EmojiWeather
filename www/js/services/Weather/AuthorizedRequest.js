angular.module('app')
.service('AuthorizedRequest', function(User, EndPoints, SingleRequest, $window, $state, $ionicLoading) {

  var request = new SingleRequest();
  var waitings = [];
  var processor;

  return function(method, url, data) {
    return new Promise(function(resolve, reject) {

      sendRequest(resolve, analize);

      function sendRequest(success, error) {
        	$.ajax({
              method: method,
        		  url: url,
        			success: success,
              data: data,
        			error: error,
        			beforeSend: function(xhr) {
        					xhr.setRequestHeader ("Authorization", "Bearer "+ User.me().token);
        			}
          	});
      }

      function analize(err) {

        if(err.status != 401) {
          apply("reject", err);
          return;
        }
        waitings.push(function() {
          sendRequest(resolve, reject);
        });
        if(processor) return;
        refresh();

      }

      function apply() {
        var processing = waitings;
        processor = false;
        waitings = [];
        processing.forEach(function(handler) {
          handler();
        });
      }
      function refresh() {
            processor = true;
            setTimeout(function() {
              processor = false;
            }, 60*1000);
            var user = User.me();
            $.ajax({
                method: "POST",
                url: EndPoints.action('refresh') + "?token="+User.me().token,
                success: function(response) {
                  user.token = response.token;
                  User.me(user);
                  apply();

                },
                error: function(err) {
                  processor = false;
                  $ionicLoading.hide();
                  User.signIn(user).then(function() {
                    apply();
                  }, function () {
                    $state.go("signIn");
                  });
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader ("Authorization", "Bearer "+ User.me().token);
                }
              });
              //$window.location.reload(true);
      }
    });
  }
});
