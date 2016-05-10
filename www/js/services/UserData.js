angular.module('app')

.service('UserData', function() {
	var user;
	for(var field in localStorage) {
		localStorage.removeItem(field);
	}
	return function(data) {
		if(data) {
			setData(data);
		} else {
			user = getData();
			return user;
		}
	}

	function getData() {
		if(!user) {
			var userInfo = localStorage.ew_user;
			if(userInfo) {
				user = JSON.parse(userInfo);
			} 
		}
		return user;
	}
	function setData(data) {
		user = data;
		localStorage.ew_user = JSON.stringify(user);
	}
})