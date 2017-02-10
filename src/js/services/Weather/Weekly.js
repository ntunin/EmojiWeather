angular.module("app")

.service('Weekly', function(EndPoints, User, config) {
  return {
    adapter: adapter
  }
  function adapter( pack, response, command ) {
    var utilities = {
      denote: denote
    }
    var tempMetric = config.tempMetric;
    var result = [];
    var forecast = (command)? response : JSON.parse(response);
    for(var i = 0; i < forecast.length; i++) {
      var item = forecast[i];

      result[i] = (command)? utilities[command](item): getForecastItem(item);
    }
    return result;


      function getForecastItem(item) {
        item = {
          temp: {
            high: getTemp(item.temp.high),
            low: getTemp(item.temp.low)
          },
          temperatureMetric: tempMetric,
          condition: item.conditions.replace(/_/g, ' '),
          date: new Date( item.date + 'T12:00:00')
        }
        return item;
      }

      function getTemp(v) {
        switch (tempMetric) {
          case "C":
            return +v;
          case "F":
            return cToF(+v);
          default:
            return 0;
        }
      }

      function denote(item) {
        item.temp.high = convert(item.temp.high, item.temperatureMetric, tempMetric);
        item.temp.low = convert(item.temp.low, item.temperatureMetric, tempMetric);
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
