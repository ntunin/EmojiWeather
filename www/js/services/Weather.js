angular.module('app')
.service('Weather', function($http, config) {
	function weather(location, query) {
		return new Promise(function(resolve, reject) {
			var url = getURL();
			$http.get(url).then(useResponse, useError);

			function getURL() {
				var queryString = getQueryString();
				var url = "http://api.wunderground.com/api/"+config.wundergroundApiKey+queryString;
		    	return url;

		    	function getQueryString() {
		    		var result = "/"+query+"/q";
		    		var fields = ["country", "state", "city"];

		    		for(var i = 0; i < fields.length; i++) {
		    			var field = fields[i];
		    			if(location[field] && location[field].length > 0) {
		    				result+= "/"+location[field];
		    			}
		    		}
		    		return result + ".json";
		    	}
			}

			function useResponse(response) {
				var result = [];
				var items = response.data.hourly_forecast;
				if(!items) {
					useError(response.data.response);
					return;
				}
				for(var i = 0; i< items.length; i++) {
					var item = items[i];
					var forecast = getForecast();
					result.push(forecast);
					function getForecast() {
						return {
							condition: item.condition,
							icon: item.icon_url,
							date: new Date( item.FCTTIME.epoch*1000)
						}
					}
				}
				resolve(result);
			}
			function useError(e) {
				if(e.error) {
					reject(error.description)
				} else {
					reject("Geo info is not enough");
				}
			}

		});
	}
	return weather;
		
})