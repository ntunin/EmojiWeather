angular.module('app')

.service('Emojy', function(Pack, User, EndPoints, Sleep, AuthorizedRequest, PersistentCache) {
  var cache = {};
  var params = {
    "wunderground" : wundergroundAMPM,
    "open-weather-map" : openWeatherMapAMPM
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var emojy = Pack({
      available: 'get-bought-icon-packs',
      all: 'get-all-icon-packs',
      name: 'icons-pack',
      purchase: 'purchase-icon-pack'
    });

  emojy.image = function (pack, weather, type) {
    var cacheKey = getCacheKey;
    var cached = cache[cacheKey];
    if(cached) {
      return resolve(cached);
    }
    var request;
    return new Promise(function(resolve, reject) {
      var condition = (weather.condition || weather.conditions);
      var packId = pack.id;
      type = type || "wunderground";
      var time = params[type](weather);
      PersistentCache.emojy(packId, condition, time).then(function(result) {
        if(result && result.length) {
          result = result[0].src;
          resolve(result);
        } else {
          var url = EndPoints.action(type+'/get-icons') + getQueryParams(pack, weather, type, time);
          getBase64FromImageUrl(url).then(function(data) {
            PersistentCache.emojy(packId, condition, time, data);
            resolve(data);
          }, function(err) {
            console.log(JSON.stringify(err));
            resolve("img/undefined_weather.png");
          });

        }
      })

    });

    function getCacheKey() {
      return pack.id + ":" + (weather.condition || weather.conditions);
    }
	}
  return emojy;

  function getBase64FromImageUrl(url) {
    return new Promise(function(resolve, reject) {

      var img = new Image();

      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = function (response) {
          var canvas = document.createElement("canvas");
          canvas.width =this.width;
          canvas.height =this.height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0);

          resolve(canvas.toDataURL("image/png"));

      };

      img.onerror = function() {
        reject("Image loading error");
      }

      img.src = url;
    });
  }


  function getQueryParams(pack, weather, type, ampm) {
    try {
      var token = User.me().token;
      return "?condition=" + (weather.condition || weather.conditions).split(' ').join('_') +
         "&icon_pack_id="+pack.id +"&ampm="+ampm+"&token="+token;
    } catch (e) {
      return "";
    }
  }
  function openWeatherMapAMPM(weather) {
    return weather.ampm;
  }
  function wundergroundAMPM(weather) {
    var date = new Date(weather.date);
    date.setHours(date.getHours() + 2);
    return moment(date).format('A');
  }
});
