angular.module('app')

   
.controller('menuCtrl', ["$scope", "$state", "Background", function($scope, $state, Background) {
	Background.setup($scope, $state);
}])
   