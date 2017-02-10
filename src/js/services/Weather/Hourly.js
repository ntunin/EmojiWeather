angular.module("app")

.service('Hourly', function(config) {
  return {
    adapter: adapter
  }

  function adapter(pack, response, command ) {
          var tempMetric = config.tempMetric;

          var items = response = (command)? response : JSON.parse(response);
          var result = [];
          var utilities = {
            denote: denote
          }
          if(!items) {
              reject(response);
              return;
          }
          items.forEach(function(item) {
              var forecast = (command)? utilities[command](item) : getForecastItem(item);
              result.push(forecast);
          });
          return result;

      function getForecastItem(item) {
        item = {
          temp: getTemp(item.temp),
          temperatureMetric: tempMetric,
          condition: item.condition.replace(/_/g, ' '),
          date: new Date( item.date.replace(' ', 'T') ),
          feelsLike: getTemp(item.feelslike),
          humidity: item.humidity,
          wind: {
            speed: item.wind.speed,
            direction: getWindDirection()
          }
        }
        return item;
        function getTemp(v) {
          switch (tempMetric) {
            case "C":
              return +v;
            case "F":
              return cToF(v)
            default:
              return 0;
          }
        }


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


            function denote(item) {
              item.temp = convert(item.temp, item.temperatureMetric, tempMetric);
              item.feelsLike = convert(item.feelsLike, item.temperatureMetric, tempMetric);
              item.temperatureMetric = tempMetric;
              return item;
            }

            function convert(v, from, to) {
              var converters = {
                'C-F': cToF,
                'F-C': fToC
              };
              var type = from+'-'+to
              var converter = converters[type];
              if(typeof converter != "function") {
                return v;
              }
              return converter(v);
            }
            function cToF(c) {
              return Math.round(1.38*c + 32).toFixed(0);
            }
            function fToC(f) {
              return Math.round((f-32)/1.8);
            }

  }
});
