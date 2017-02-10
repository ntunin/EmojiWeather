angular.module('app')

.controller('GetStartedCtrl', function($scope,
                                       $state,
                                       User,
                                       $ionicPopup,
                                       NetworkRequire,
                                       TokenService,
                                       LocationService,
                                       Weather,
                                       Backgrounds) {
  $scope.$on("$ionicView.enter", function() {
    if(localStorage.onboarded) {
      onboarded();
    } else {
      onboarding();
    }
  })

  function onboarded() {
    NetworkRequire(function() {
      refresh();
    }, function () {
      $ionicPopup.alert({
        title: "Error",
        template: "Could not run application without internet connection. The application will be close"
      }).then(function() {
          ionic.Platform.exitApp();
      });
    });
  }

  function onboarding() {
    localStorage.onboarded = true;
    $state.go("onboarding");
  }

  function refresh() {
    TokenService.refresh().then(function() {
      locationRequest();
    }, function() {
      $state.go("signIn");
    })
  }

  function locationRequest() {
      var location = LocationService("current location")
      if(location) {
        successLocationRequest(location)
      } else {
        LocationService("define location").then(
          function(location) {
            successLocationRequest(location);
          },
          function(err) {
            $state.go('app.changeLocation');
          }
        );
      }
  }

  function successLocationRequest(location) {
    var cnt = 0;
    Weather(location, "hourly").then(complete, complete);
    Weather(location, "forecast10day").then(complete, complete);
    Backgrounds.current().then(function(pack) {
      Backgrounds.image(pack).then(complete, complete);
    }, complete);

    function complete() {
      if(++cnt >= 3) {
          $state.go("app.forecast.current");
      }
    }
  }

})
