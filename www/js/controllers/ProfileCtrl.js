angular.module('app')


.controller('ProfileCtrl', function($scope, $state, UserDataVerify, $ionicPopup, User, strings, $ionicLoading) {
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
		$ionicLoading.show();
		User.me("select avatar").then(function(response) {
			$ionicLoading.hide();
		}, function (err) {
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: "Error", template: "Could nod upload image"
			});
			console.error(err);
		});
	}
  $scope.save = function() {
		$ionicLoading.show();
    var userData = $scope.user;
		User.me("edit", userData).then(function(response) {
			$ionicLoading.hide();
		}, function (err) {
			$ionicLoading.hide();
			$ionicPopup.alert({
				title: "Error", template: err.join(",")
			});
		});
  }

})
