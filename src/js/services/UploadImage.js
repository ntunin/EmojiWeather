angular.module('app')

.service('UploadImage', function($cordovaImagePicker, $cordovaFileTransfer, $cordovaFile, $cordovaCamera, EndPoints, config,  $timeout) {
	return function(customOptions) {
		return new Promise(function(resolve, reject) {
				if(typeof device == "undefined") {
					reject({text: "err"});
					return;
				}
				var options = {
					destinationType: Camera.DestinationType.FILE_URI,
      		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				}
				$cordovaCamera.getPicture(options).then(
					function(uri) {
						if(!uri || !uri.length) {
							reject("You select nothing");
							return;
						}
						if(typeof uri == "object") {
							uri = uri[0];
						}
						var options = new FileUploadOptions();
						if(customOptions) {
								for (var variable in customOptions) {
									if (customOptions.hasOwnProperty(variable)) {
										options[variable] = customOptions[variable];
									}
								}
						}
						$cordovaFile.checkFile(uri, '').then(function(entry) {
	            entry.file(function(data){
								options.fileKey = 'file';
								options.fileName = data.name;
								options.mimeType = data.type;
								options.chunkedMode = false;
								options.headers["Content-Length"] = data.size;
								var transfer = new FileTransfer();
								transfer.upload(uri, EndPoints.action('upload-avatar'), success, error, options);
		          }, function(err) {
								reject("Could not get access to file");
							});
          }, function (err) {
            reject("Could not check a file");
          })


						function success(response) {
							if(response.responseCode != 200) {
								error(response);
							}
							var uri = JSON.parse(response.response).avatar_url;
							if(uri[0] == '/') uri = uri.substr(1, uri.length);
							resolve(uri);
						}
						function error(err) {
							alert(JSON.stringify(err));
							reject("Could not upload image")
						}

					},
					function(err) {
						reject("Could not upload image");
					}
				)
			});

			function getFileName(uri) {
				var start = uri.lastIndexOf('/') + 1;
				var length = uri.length;
				return uri.slice(start, uri.lastIndexOf('.'));
			}
	}
})
