angular.module("app")

.service('Weekly', function(EndPoints, User) {
  return {
    adapter: adapter
  }

  function adapter( pack, response ) {

    var result = [];
    var forecast = JSON.parse(response);
    for(var i = 0; i < forecast.length; i++) {
      var item = forecast[i];
      result[i] = getForecastItem(item);
    }
    return result;


      function getForecastItem(item) {
        item = {
          temp: {
            high: +item.temp.high,
            low: +item.temp.low
          },
          condition: item.conditions.replace(/_/g, ' '),
          date: new Date( item.date + 'T12:00:00')
        }
        return item;
      }
  }
});
