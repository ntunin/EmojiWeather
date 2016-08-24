angular.module('app')

.service('UserDataVerify', function(strings) {
    return function (data, required) {
        var alerts = [exists, empty, password];
        return new Promise(function(resolve, reject) {
          for(var i = 0; i < alerts.length; i++) {
            var alert = alerts[i]();
            if (alert) {
              reject(alert);
            }
          }
          resolve();
        });

        function exists() {
          if(!data) {
            return strings("needsUserInfo");
          }
        }
        function empty() {
          for(var i = 0; i < required.length; i++) {
            var field = required[i];
            var value = data[field];
            if(!value || !value.length) {
              return strings(field)+strings('isRequired');
            }
          }
        }

        function password() {
          if(!data.password || data.password !== data.confirmPassword) {
            return "Password not confirmed";
          }
        }
    }
});
