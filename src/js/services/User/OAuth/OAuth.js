angular.module('app')

.run(function($ionicPlatform, config) {
    hello.init({
    	'twitter' : config.twitterAppId,
      'facebook': config.facebookAppId,
      'google': config.googleAppKey
    },
    {
      oauth_proxy : config.oauthProxy,
      response_type: 'token',
      oauth_version: '2.0a',
      redirect_uri: "http://adodson.com/hello.js/redirect.html"
    });
})

.service('OAuth', function(config, EndPoints) {
  return function ( network ) {
    return new Promise(
      function (resolve, reject) {
          var service = hello(network);
          service.login({scope: "email"}).then(function(response) {
              response = response.authResponse;
              var access_token = response.access_token;
              console.log(JSON.stringify(response));
              $.ajax({
                  method: "POST",
                  url: EndPoints.action(network+'-authentication'),
                  data: {
                    "access_token": access_token
                  },
                    success: function(response) {
                      var user = response.user;
                      resolve ({
                          email: user.email,
                          avatar: config.server + user.avatar_url,
                          name: user.name,
                          token: response.token,
                          OAuth: true
                      });
                    },
                    error: reject
              });
          });

      }
    );
  }
});
