angular.module('app')

   
.controller('previewCtrl', function($scope, $state, Background, UserData) {
	Background.setup($scope, $state);
	$scope.user = UserData();
	$scope.submit = function() {
		$state.go('main');
	}
})