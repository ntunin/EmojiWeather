angular.module('app')
  
.controller('overviewCtrl', function($scope, $state, Background, UserData) {
	Background.setup($scope, $state);
	if(UserData()) {
		$state.go('main');
	}
})