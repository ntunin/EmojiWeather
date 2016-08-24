angular.module('app')


.controller('StickersSelectionCtrl', function($scope, $state, strings, Emojy, User) {
	var emojy;
	update();
  User.me("subscribe", update);
	function update() {
			Emojy.available().then(function(list) {
				$scope.stickers = list;
				$scope.$apply();
			})
			Emojy.current().then(function(pack) {
				emojy = pack;
				$scope.$apply();
			});
	}
	Emojy.subscribe(update);
	$scope.select = function(item) {
		emojy = item;
		Emojy.current(item);
	}
	$scope.isSelected = function( item ) {
		if(!emojy || item.id != emojy.id) return "";
		return "item-selected";
	}

})
