angular.module('app')

.service('Background', function() {
	var _backgrounds;
	var _background;
	load();

	return {
		setup: setup,
		list: list,
		isSelected: isSelected
	} 

	function setup(scope, state) {
		scope.background = _background;
		scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
		    if (toState.name === state.current.name && _background !== scope.background) { 
		    	scope.background = _background;
		    }
	  	});
	  	return {
	  		set: set
	  	}
	  	function set( background ) {
	  		_background = background;
	  		scope.background = _background;
	  	}
	}
	function list() {
		return _backgrounds;
	}
	function load(success, error) {
		loadUserBackrounds();
		loadAppBackgrounds(success, error);
		_background = localStorage.userBackground || _backgrounds [0];
	}
	function loadUserBackrounds() {
		var backgrounds = localStorage.backgrounds;
		if(!backgrounds) return;
		backgrounds = backgrounds.split(' ');
		_backgrounds.concat(backgrounds);
	}
	function loadAppBackgrounds(success, error) {
		request(success, error);
		function request( success, error) {
			var i1 = "http://wallpaperscraft.ru/image/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg";
			var i2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEyIqhnqQgXLoL_Ho76-rXQvB5cKI_gyEHPgGYgp8nQC6OCGql";
			var i3 = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRX6J0BQoXqYPAoZNh2lq855jb7DcPb2oK6gMgK3lgTmgj8jsHL";
			var i4 = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSzgt2HXZ6g3jnJoUezcxqob8xLQmDyUlNG3CDICeeQ7td06a4a";
			
			var backgrounds =  [i1, i2, i3, i4];
			useResponse(backgrounds);
		}		


		function useResponse(backgrounds) {
			_backgrounds = _backgrounds || [];
			_backgrounds = _backgrounds.concat(backgrounds);
		}
		function useError() {

		}
	}
	function isSelected (item) {
		return _background === item;
	}
});