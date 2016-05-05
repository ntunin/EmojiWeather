angular.module('app')

   
.controller('addEmojisCtrl', function($scope, $state, Background) {
	Background.setup($scope, $state);

})