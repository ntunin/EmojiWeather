angular.module('app')

   
.controller('mapCtrl', function($scope, $state, Map) {
	Map('map-canvas');
})