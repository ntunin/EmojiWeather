angular.module('app')


.controller('ProfileCtrl', function($scope, $state, UserDataVerify, $ionicPopup, User, strings, countedLoading) {
	reload();
	User.me("subscribe", reload);
	function reload() {
			var user = User.me();
			if(user) {
				$scope.user = {
			    name: user.name,
			    email: user.email,
					avatar: user.avatar,
			    password: "",
			    confirmPassword: "",
					OAuth: user.OAuth || false
			  };
			}
	}
	$scope.getAvatar = function() {
		countedLoading.show();
		User.me("select avatar").then(function(response) {
			countedLoading.hide();
		}, function (err) {
			countedLoading.hide();
			$ionicPopup.alert({
				title: "Error", template: err
			});
			console.error(err);
		});
	}
  $scope.save = function() {
		countedLoading.show();
    var userData = $scope.user;
		User.me("edit", userData).then(function(response) {
			countedLoading.hide();
		}, function (err) {
			countedLoading.hide();
			$ionicPopup.alert({
				title: "Error", template: err.join(",")
			});
		});
  }

})
