angular.module('app')

   
.controller('addEmojisCtrl', ["$scope", "$state", "Background", function($scope, $state, Background) {
	Background.setup($scope, $state);

}])