angular.module('app')

.service('NetworkRequire', function( $http, $ionicPopup, $cordovaNetwork, config) {
	var waiting = [];
	var processing;
	var inspector;
	var popup;
	var repeater;
	var registered;
	return checkConnection;
	function checkConnection(success, error, text) {
		if(success)	waiting.push(success);
		if(!inspector) inspector = setTimeout(check, 100);
		function check () {
			inspector = null;
			if(!processing) {
				processing = waiting;
				waiting = [];
			}
			if(window.Connection) {
				if(navigator.connection.type == Connection.NONE) {
					requestError();
				} else {
					requestSuccess();
				}
			} else {
				$http.get("https://api.myjson.com/bins/3zw89").then(requestSuccess, requestError);
			}
		}
		function requestSuccess() {
			if(popup) {
				setTimeout(function() {
					$('.popup .button.button-positive').trigger("click");
				});
			}
			if(!processing) return;
			processing.forEach(function(success) {
				success();
			});
			processing = null;
			popup = null;
			startRepeater();
		}
		function requestError(err) {
			if(error) {
				error(err);
				return;
			}
			alert(JSON.stringify(err));
			console.log("error");
			clearRepeater();
			setTimeout(check, 500);
			var template = text || "Please check your internet connection!";
			if(!popup) {
				popup =	$ionicPopup.confirm({
					title: "Error",
					template: template,
					okText: "Try again"
				}).then(function(answer) {
					if(answer) {
						check();
					} else {
						exit();
					}
				});
			}
		}
	}

	function clearRepeater() {
		if(repeater) {
			clearTimeout(repeater);
			repeater = null;
		}
	}
	function startRepeater() {
		clearRepeater();
		repeater = setTimeout(checkConnection, 5*1000);
	}
	function exit() {
		ionic.Platform.exitApp();
	}
});
