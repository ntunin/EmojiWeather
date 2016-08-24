angular.module('app')

.service('Backgrounds', function(Pack, User, EndPoints) {

  var backgrounds = Pack(
    {
      available: 'get-bought-background-packs',
      name: 'backrounds-pack',
      all: 'get-all-background-packs',
      purchase: 'purchase-background-pack'
    });

  backgrounds.image = function (pack) {
    var token = User.me().token;
    return EndPoints.action('get-background') + getQueryParams();

    function getQueryParams() {
    	var times = ["night", "morning", "day", "evening"];
    	var hour = new Date().getHours() - 2;
    	var devider = 24 / times.length;
    	var index = Math.floor(hour / devider);
      try {
          return "?background_pack_id="+pack.id+"&time_of_day="+times[index]+"&token="+token;
        } catch (e) {
          return "";
        }
      }
    }

  return backgrounds;
});
