angular.module('app')

.service('PickImage', function($cordovaCamera, AuthData, $cordovaImagePicker) {
	return function(success, error) {
		var options = {
		 maximumImagesCount: 1,
		 width: 400,
		 height: 400,
		 quality: 30
		};

		$cordovaImagePicker.getPictures(options)
			.then(
				function (results) {
					success(results[0])
				},
				function(err){
					error("Cannot load image")
				});
		}
});
