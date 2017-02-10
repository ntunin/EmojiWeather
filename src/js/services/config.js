angular.module('app')

.service('config', function($ionicPlatform) {
  var subscribers = [];
  var platform = "browser";
  if(window.cordova) {
  	["ios", "android", "browser"].forEach(function(item) {
      if($ionicPlatform.is(item)) platform = item;
  	});
  }
	var settings = {
    cacheDBName: "cache.db",
    appId: "com.rhinoda.weatherWiggy",
    appAlias: "Weather Wiggy",
		openWeatherApiKey: "7d7815cd5721b778c79d97dff92ea533",
		wundergroundApiKey: "a7f3e44e9dfd4036",
		server: "http://weather.rhinoda.ru/",
		facebookAppId: '998953410224967',
		facbookAppSecret: '7865d4c46ebef4a8bbea3ef8dd245272',
		googleAppKey : {
      "ios": '302892683317-4608t711qkgohlg20qa89egdal1gvgmp.apps.googleusercontent.com',
      "android": '302892683317-k2oupm4a6bpbjaha2j4rqds7ts14lgae.apps.googleusercontent.com',
      "browser": '302892683317-7abkar3075t8g9hiie06l0fgmr6u6stt.apps.googleusercontent.com'
    }["browser"],
		twitterAppId: "9wg1OLo2jXnj9Y6foOsxKAQWT",
		twitterAppSecret: "VZaId0DpPla0oLSyaALKnW7K7J5WGYnK7hHoeajY2s64JHvWyZ",
		twitterAccessToken: "756094328909471744-vD011XrPTUeGlTKxio2FGgQkzz8vEig",
		twitterAccessTokenSecret: "	bxL20muzOBQEZF6Hqan0DKOiB3Yzu1ZonmQJ25WrrtHSz",
		oauthRedirectURL: 'http://localhost:8100/oauthcallback.html',
		oauthProxy: 'https://auth-server.herokuapp.com/proxy',
		pickedImage: {
		 maximumImagesCount: 1,
		 width: 400,
		 height: 400,
		 quality: 30
   },
    tempMetric: localStorage.tempMetric || 'C',
    setTempMetric: setTempMetric,
    subscribe: subscribe
	}
  return settings;

  function setTempMetric(v) {
    localStorage.tempMetric = settings.tempMetric = v;
    callSubscribers();
  }
  function subscribe(callback) {
    subscribers.push(callback);
  }
  function callSubscribers() {
    subscribers.forEach(function(callback) {
      callback();
    });
  }
})
