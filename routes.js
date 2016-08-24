angular.module('app.routes', [])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('overview', {
    url: '/overview',
    templateUrl: 'templates/overview.html',
    controller: 'overviewCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('preview', {
    url: '/preview',
    templateUrl: 'templates/preview.html',
    controller: 'previewCtrl'
  })

  .state('error', {
    url: '/login_error',
    templateUrl: 'templates/error.html',
    controller: 'errorCtrl'
  })

  .state('main', {
    url: '/main_screen',
    templateUrl: 'templates/main.html',
    controller: 'mainCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('weeklyForecast', {
    url: '/weekly',
    templateUrl: 'templates/weeklyForecast.html',
    controller: 'weeklyForecastCtrl'
  })

  .state('hourlyForecast', {
    url: '/hourly',
    templateUrl: 'templates/hourlyForecast.html',
    controller: 'hourlyForecastCtrl'
  })

  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'mapCtrl'
  })

  .state('addEmojis', {
    url: '/add_emojis',
    templateUrl: 'templates/addEmojis.html',
    controller: 'addEmojisCtrl'
  })

  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'searchCtrl'
  })

  .state('backgroundSelection', {
    url: '/page12',
    templateUrl: 'templates/backgroundSelection.html',
    controller: 'backgroundSelectionCtrl'
  })

$urlRouterProvider.otherwise('/overview')

  

}]);