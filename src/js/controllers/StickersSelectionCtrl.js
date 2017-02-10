angular.module('app')


.controller('StickersSelectionCtrl', function($scope, $state, strings, Emojy, User) {
	var emojy;
	var delay;
	update();
  User.me("subscribe", update);
	function update() {
			return new Promise(function(resolve, reject) {
				Emojy.available().then(function(list) {
					$scope.stickers = list;
					$scope.$apply();
				})
				Emojy.current().then(function(pack) {
					emojy = pack;
					$scope.$apply();
					resolve();
				});
			});
	}
	Emojy.subscribe(update);
	$scope.select = function(item) {
		if(delay) return;
		delay = setTimeout(function() {
			delay = null;
		}, 250);
		emojy = item;
		Emojy.current(item);
	}
	$scope.isSelected = function( item ) {
		if(!emojy || item.id != emojy.id) return "";
		return "item-selected";
	}

})
