angular.module('app')

.service('UploadImage', function($cordovaImagePicker, $cordovaFileTransfer, EndPoints, $ionicLoading, config,  $timeout) {
	return function(customOptions) {
		return new Promise(function(resolve, reject) {
				if(!device) {
					reject({text: "err"});
					return;
				}
				$cordovaImagePicker.getPictures(config.pickedImage).then(
					function(uri) {
						uri = uri[0];
						var options = new FileUploadOptions();
						options.fileKey = 'file';
						options.fileName = getFileName(uri);
						options.mimeType = 'image/jpeg';
						if(customOptions) {
								for (var variable in customOptions) {
									if (customOptions.hasOwnProperty(variable)) {
										options[variable] = customOptions[variable];
									}
								}						}
						var transfer = new FileTransfer();



						$ionicLoading.show();
							transfer.upload(uri, EndPoints.action('upload-avatar'), success, error, options);
						function success(response) {
							$ionicLoading.hide();
							if(response.responseCode != 200) {
								error(response);
							}
							var uri = JSON.parse(response.response).avatar_url;
							if(uri[0] == '/') uri = uri.substr(1, uri.length);
							resolve(uri);
						}
						function error(err) {
							$ionicLoading.hide();
							alert(JSON.stringify(err));
							reject(err)
						}
						function progress(progress) {
        			$timeout(function () {
          			alert(progress.loaded / progress.total) * 100;
        			});
      			}

					},
					function(err) {
						reject(err);
					}
				)
			});

			function getFileName(uri) {
				var start = uri.lastIndexOf('/') + 1;
				var length = uri.length - start;
				return uri.substr(start, length);
			}
	}
})
