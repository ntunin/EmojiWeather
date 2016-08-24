angular.module('app')
.service('Weather', function(AuthorizedRequest, EndPoints, Hourly, Weekly, Emojy) {
	var adapters = {
		"hourly10day": Hourly.adapter,
		"hourly": Hourly.adapter,
		"forecast10day": Weekly.adapter
	}
	var cache = {};
	return function weather(location, query) {
		return new Promise(function(resolve, reject) {
			Emojy.current().then(function(emojyPack) {
				var url = weatherQuery(location, query);
				var record = cache[query];
				if(record && url === record.url) success(record.response);
				AuthorizedRequest("GET", url ).then(
					function (response) {
						if(~response.indexOf("error")) {
							reject("Invalid location");
							return;
						}
						var result = adapters[query](emojyPack, response);
							cache[query] = {
								url: url,
								response: result
							}
							setTimeout(function() {
								cache = [];
							}, 60*60*1000);
						success(result);
					},
					function(e) {
						if(e.error) {
							reject(e.error.description)
						} else {
							reject("Geo info is not enough");
						}
					});
					function success(result){
						result.forEach(function(weather) {
							weather.icon = Emojy.image(emojyPack, weather);
						});
						resolve(result);
						return;
					}
			});
		});


		function weatherQuery(location, query) {

				var queryParams = getQueryParams();
				var url = EndPoints.action(query)+queryParams;
					return url;

					function getQueryParams() {
						location = location.location;
						var result = "?lat="+location.lat+"&lng="+location.lng;
						return encodeURI(result);
				}
		}
	}
})
