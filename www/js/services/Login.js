angular.module('app')

.service('SignIn', function(UserDataVerify, UserData, Location) {

    return function(userInfo) {
        if(typeof userInfo == "string") {

        } else
        return new Promise(function(resolve, reject) {
            UserData(userInfo);
            Location(userInfo.location);
            resolve();

          function error(e) {
            reject(e);
          }
        });

    }
});
