angular.module('app')
.service('Weather', function(AuthorizedRequest, EndPoints, Hourly, Weekly, Emojy, PersistentCache) {
	var adapters = {
		"hourly10day": Hourly.adapter,
		"hourly": Hourly.adapter,
		"forecast10day": Weekly.adapter
	}
	var utilites = {}
	var cache = {};
	return function weather(location, query, command) {
		return new Promise(function(resolve, reject) {
				Emojy.current().then(function(emojyPack) {
					var url = weatherQuery(location, query);
					var record = cache[query];
					if(record && url === record.url) {
						if(command) {
							useResponse(record.response);
						} else
							success(record.response);
						return;
					}
					AuthorizedRequest("GET", url ).then(useResponse,
						function(e) {
							if(e.error) {
								reject(e.error.description)
							} else {
								reject("Geo info is not enough");
							}
						});

					function useResponse(response) {
								if(~response.indexOf("error")) {
									reject("Invalid location");
									return;
								}
								var result = adapters[query](emojyPack, response, command);
									cache[query] = {
										url: url,
										response: result
									}
									setTimeout(function() {
										cache = [];
									}, 2*60*1000);
								success(result);
					}
						function success(result){
							var required = result.length;
							var processed = 0;
							result.forEach(function(weather) {
								Emojy.image(emojyPack, weather).then(function(img) {
									weather.icon = img;
									weather.sticker = {
										src: img,
										framesCount: 1,
										speed: 60*1000
									}
									if(weather.refresh) {
										weather.refresh();
									}
								}, function(err) {
									++processed;
									console.log(JSON.stringify(err))
								})
								resolve(result);
							});
							return;
						}
				}, function (err) {
					reject ("Could not load emojy");
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
