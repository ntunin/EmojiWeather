angular.module('app')
.service('AuthorizedRequest', function(User,
                                       EndPoints,
                                       SingleRequest,
                                       $window,
                                       $state,
                                       $ionicLoading,
                                       NetworkRequire) {

  var request = new SingleRequest();
  var waitings = [];
  var processor;
  var redirected;


  User.me("subscribe", function() {
    user = User.me()
  });

  return function(method, url, data, before) {
    return new Promise(function(resolve, reject) {
      NetworkRequire(function() {
        sendRequest(resolve, analize);
      });

      function sendRequest(success, error) {
        try {
        	$.ajax({
              method: method,
        		  url: url,
        			success: function (res) {
                redirected = false;
                success(res);
              },
              data: data,
        			error: error,
        			beforeSend: function(xhr) {
        					xhr.setRequestHeader ("Authorization", "Bearer "+ User.me().token);
                  if(before) before(xhr);
        			}
          	});
          } catch (e) {
            if(!redirected) redirect();
          }
      }

      function analize(err) {
        if(err.status != 400 && err.status != 401) {
          reject(err);
          return;
        }
        waitings.push(function() {
          sendRequest(resolve, reject);
        });
        if(processor) return;
        refresh();

      }

      function apply() {
        try {
          var processing = waitings;
          processor = false;
          waitings = [];
          processing.forEach(function(handler) {
            handler();
          });
        } catch (e) {
          $window.location.reload(true);
        }
      }
      function refresh() {
            processor = true;
            setTimeout(function() {
              processor = false;
            }, 60*1000);

            $.ajax({
                method: "POST",
                url: EndPoints.action('refresh') + "?token="+User.me().token,
                success: function(response) {
                  console.log(typeof response);
                  console.log(response);
                  var user = User.me();
                  user.token = response.token;
                  User.me(user);
                  apply();
                },
                error: function(err) {;
                  processor = false;
                  if(!User.me()) {
                    redirect();
                    return;
                  }
                  var user = User.me();
                  var logInData = (user.OAuth)? user.service :  user;
                  User.signIn(logInData).then(function() {
                    apply();
                  }, function (err) {
                    User.me("reset");
                    $ionicLoading.hide();
                    redirect();
                  });
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader ("Authorization", "Bearer "+ User.me().token);
                }
              });
              //$window.location.reload(true);
      }

      function redirect() {
        $ionicLoading.hide();
        if(User.me()) {
          $state.go("welcome");
          redirected = true;
          reject("You are not authorized");
          User.me("reset");
        }
      }
    });
  }

});
