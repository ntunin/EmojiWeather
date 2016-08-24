angular.module('app')

.service('EndPoints', function(config) {
	var EndPoints = {
		action: action,
		url: url
	}
	return EndPoints;
	function url(url) {
		return config.server + url;
	}
	function action (point) {
		return config.server + 'api/' + point;
	}


})
