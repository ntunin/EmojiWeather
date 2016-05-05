angular.module('app')

.service('UserData', function() {
	var user;
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
			console.log(userInfo);
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