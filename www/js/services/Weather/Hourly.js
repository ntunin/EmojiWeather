angular.module("app")

.service('Hourly', function() {
  return {
    adapter: adapter
  }

  function adapter(pack, response ) {

          var items = response = JSON.parse(response);
          var result = [];
          if(!items) {
              reject(response);
              return;
          }
          items.forEach(function(item) {
              var forecast = getForecastItem(item);
              result.push(forecast);
          });
          return result;

      function getForecastItem(item) {
        item = {
          temp: +item.temp,
          condition: item.condition.replace(/_/g, ' '),
          date: new Date( item.date.replace(' ', 'T') ),
          feelsLike: +item.feelslike,
          humidity: item.humidity,
          wind: {
            speed: item.wind.speed,
            direction: getWindDirection()
          }
        }
        return item;
        function getWindDirection() {
          var directions = {
            'N': 'Nord',
            'W': 'West',
            'S': 'South',
            'E': 'East'
          }
          var res = "";
          var dir = item.wind.direction.dir;
          for(var i = 0; i < dir.length; i++) {
            res += directions[dir[i]] + ' ';
          }
          return {
            degrees: item.wind.direction.deg,
            name: res.trim()
          }
        }
      }
  }
});
