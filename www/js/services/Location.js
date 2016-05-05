angular.module('app')

.service('Location', function(UserData) {
	var location;
	var user = UserData();
	if(user) {
		location = user.location;
	}
	return function(data) {
		if (data) {
			location = data
		} else {
			return location;
		}
	}
}) 