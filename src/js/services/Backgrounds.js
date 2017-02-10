angular.module('app')

.service('Backgrounds', function(Pack, User, EndPoints, Sleep, PersistentCache) {
  var cache = {};
  var times = ["night", "morning", "day", "evening"];
  var backgrounds = Pack(
    {
      available: 'get-bought-background-packs',
      name: 'backrounds-pack',
      all: 'get-all-background-packs',
      purchase: 'purchase-background-pack'
    });

  backgrounds.image = function (pack) {
    return new Promise(function(resolve, reject) {
      var token = User.me().token;
      var time = getTime();
      var cacheKey = getCacheKey;
      var cached = cache[cacheKey];
      if(cached) {
        return resolve(cached);
      }

      PersistentCache.background(pack.id, time).then(function(result) {
        if(result && result.length) {
          result = result[0].src;
          cache[cacheKey] = result;
          resolve(result);
        } else {
          var url = EndPoints.action('get-background') + getQueryParams(pack, time, token);
          getBase64FromImageUrl(url).then(function(data) {
            PersistentCache.background(pack.id, time, data);
            resolve(data);
          }, function(err) {
            resolve("img/background.png");
          });

        }
      })

    });

    function getCacheKey() {
      return pack.id + ":" + time;
    }

    function getQueryParams(pack, time, token) {
        return "?background_pack_id="+pack.id+"&time_of_day="+time+"&token="+token;
    }
  }

  return backgrounds;

  function getTime() {
    var hour = new Date().getHours() - 2;
    var devider = 24 / times.length;
    var index = Math.floor(hour / devider);
    return times[index];
  }

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
});
