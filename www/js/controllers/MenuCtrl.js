angular.module('app')

   
.controller('menuCtrl', function($scope, $state, Background) {
	Background.setup($scope, $state);
})
   