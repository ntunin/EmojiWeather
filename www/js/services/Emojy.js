angular.module('app')

.service('Emojy', function(Pack, User, EndPoints) {
  var emojy = Pack({
      available: 'get-bought-icon-packs',
      all: 'get-all-icon-packs',
      name: 'icons-pack',
      purchase: 'purchase-icon-pack'
    });

  emojy.image = function (pack, weather, type) {
  		var token = User.me().token;
      type = type || "wunderground";
  		return EndPoints.action(type+'/get-icons') + getQueryParams();

  		function getQueryParams() {
        var params = {
          "wunderground" : wundergroundAMPM,
          "open-weather-map" : openWeatherMapAMPM
        }
        try {
  			     return "?condition=" + (weather.condition || weather.conditions).split(' ').join('_') +
             "&icon_pack_id="+pack.id +"&ampm="+params[type]()+"&token="+token;
        } catch (e) {
          return "";
        }

          function openWeatherMapAMPM() {
            return weather.ampm;
          }
          function wundergroundAMPM() {
            var date = new Date(weather.date);
            date.setHours(date.getHours() + 2);
            return moment(date).format('A');
          }
  		}
	}
  return emojy;
});
