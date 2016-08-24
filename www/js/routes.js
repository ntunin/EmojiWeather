angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


.state('getStarted', {
      url: '/getStarted',
      controller: 'GetStartedCtrl'
    })
.state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/getStarted.html',
      controller: 'WelcomePageCtrl'
    })
  .state('signIn', {
      url: '/signIn',
      templateUrl: 'templates/signIn.html',
      controller: 'SignInCtrl'
  })

  .state('signUp', {
      url: '/signUp',
      templateUrl: 'templates/signUp.html',
      controller: 'SingUpCtrl'
  })
  .state('app', {
      url: '/app',
      templateUrl: 'templates/sideMenu.html',
      controller: 'AppNavigationCtrl'
  })

  .state('app.forecast', {
      url: '/forecast',
      abstract: true,
      templateUrl: 'templates/forecast.html',
      controller: 'AppNavigationCtrl'
  })
  .state('app.forecast.current', {
      url: '/forecast/current',
      views: {
        'current': {
          templateUrl: 'templates/main.html',
          controller: 'mainCtrl'
        }
      }
  })

    .state('app.forecast.weekly', {
      url: '/weekly',
      views: {
        'weekly': {
          templateUrl: 'templates/weeklyForecast.html',
          controller: 'WeeklyForecastCtrl'
        }
      }
    })

    .state('app.forecast.hourly', {
      url: '/hourly',
      views: {
        'hourly': {
          templateUrl: 'templates/hourlyForecast.html',
          controller: 'HourlyForecastCtrl'
        }
      }
    })

  .state('app.settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'AppNavigationCtrl'
  })
  .state('app.profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'ProfileCtrl'
  })
  .state('app.changeLocation', {
      url: '/location',
      templateUrl: 'templates/changeLocation.html',
      controller: 'EnterLocationCtrl'
  })

  .state('app.changeBackround', {
      url: '/background',
      templateUrl: 'templates/backgroundSelection.html',
      controller: 'backgroundSelectionCtrl'
  })

  .state('app.changeStickers', {
      url: '/stickers',
      templateUrl: 'templates/stickers.html',
      controller: 'StickersSelectionCtrl'
  })

  .state('app.map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'mapCtrl'
  })

  .state('addEmojis', {
    url: '/add_emojis',
    templateUrl: 'templates/addEmojis.html',
    controller: 'addEmojisCtrl'
  })


  .state('backgroundSelection', {
    url: '/page12',
    templateUrl: 'templates/backgroundSelection.html',
    controller: 'backgroundSelectionCtrl'
  })

  .state('app.store', {
      url: '/store',
      abstract: true,
      templateUrl: 'templates/store.html',
      controller: 'AppNavigationCtrl'
  })
  .state('app.store.stickers', {
      url: '/stickers',
      views: {
        'stickers': {
          templateUrl: 'templates/stickersStore.html',
          controller: 'StickersStoreCtrl'
        }
      }
  })

    .state('app.store.backgrounds', {
      url: '/background',
      views: {
        'backgrounds': {
          templateUrl: 'templates/backgroundStore.html',
          controller: 'backgroundStoreCtrl'
        }
      }
    })

    .state('app.store.ads', {
      url: '/ads',
      views: {
        'ads': {
          templateUrl: 'templates/ads.html',
          controller: 'purchaseAdsCtrl'
        }
      }
    })
    .state('app.about', {
        url: '/about',
        templateUrl: 'templates/about.html'
    })
$urlRouterProvider.otherwise('/getStarted')



});
