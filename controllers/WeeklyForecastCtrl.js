angular.module('app')

.controller('weeklyForecastCtrl', ["$scope", "$state", "Background", "Weather", "UserData", function($scope, $state, Background, Weather, UserData) {
	Background.setup($scope, $state);
	var user = UserData();
	Weather(user.location, 'hourly10day').then(success, error);
	$scope.moment = moment;

	function success(response) {
		$scope.forecast = sortByDays(response);

		function sortByDays(list) {
			var days = {};
			var currentKey;
			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				var key = getKeyFor(item);
				days[key] = days[key] || [];

				days[key].push(item);
			}
			return days;

			function getKeyFor( item ) {
				return moment(item.date).format("ddd");				
			}
		}
	} 
	function error(e) {

	}

}])