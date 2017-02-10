angular.module('app')

.service('UserData', function(UploadImage, EndPoints, config) {
  var subscribers = [];
	var commands = {
		"reset": reset,
		"select avatar": selectAvatar,
		"subscribe": subscribe,
		"edit": edit
	}
  var user;

	return function(data) {
		if(data) {
			if(typeof data === "string") {
				return command.apply(this, arguments);
			} else {
				setData(data);
			}
		} else {
			user = getData();
			return user;
		}
	}

	function getData() {
    if(user) return user;
		var userInfo = localStorage.ew_user;
		if(userInfo && userInfo != "undefined") {
			return JSON.parse(userInfo);
		}
    return {
      email: "guest@weatherwiggy.com",
      password: "x3AdM/eB",
      fake: true
    }
	}
	function setData(data) {
    user = data;
    localStorage.ew_user = JSON.stringify(data);
		apply();
	}

	function command(commandName) {
		var action = commands[commandName];
		if(action) {
			var args = [];
			for(var i = 1; i < arguments.length; i++) args.push(arguments[i]);
			return action.apply(this, args);
		}
	}

	function reset() {
    user = null;
		localStorage.removeItem("ew_user");
    apply();
	}
	function edit(newUserData) {
		return new Promise(function(resolve, reject) {
				$.ajax({
						method: "POST",
						url: EndPoints.action('edit-profile'),
						success: function(response) {
							if(response.status != "success") {
								var errors = [];
								for(var field in response.errors ) {
									response.errors[field].forEach(function(error) {
											switch(error) {
													case "email_id_required": {
														errors.push("Please type valid email");
														break;
													};
													case "email_is_not_valid" : {
														errors.push("Please type valid email");
														break;
													}
													case "passwords_do_not_match":
														errors.push("Passwords do not match");
														break;
											}
									});
								};
								reject(errors);
								return;
							}
							for(var field in {name: newUserData.name, email: newUserData.email, password: newUserData.password}) {
								if(newUserData[field] && user[field] != newUserData[field]) user[field] = newUserData[field];
							}
							setData(user);
							resolve("success");
						},
						data: {
							name: newUserData.name,
							email: newUserData.email,
							new_password: newUserData.password,
							confirm_password: newUserData.confirmPassword
						},
						error: function(err) {
							console.error(err);
							reject(["Internal Server Error"])
						},
						beforeSend: function(xhr) {
								xhr.setRequestHeader ("Authorization", "Bearer "+ user.token);
						}
					});
		});
	}
	function subscribe(subscriber) {
		subscribers.push(subscriber);
	}
	function apply() {
		subscribers.forEach(function(subscriber) {
			subscriber();
		});
	}
  function selectAvatar() {
		return new Promise(function(resolve, reject) {
      UploadImage( {headers : {
        "Authorization": "Bearer "+ user.token
      }}).then(
        function(uri) {
          user.avatar  = config.server + uri;
          console.log(user.avatar);
          setData(user);
          subscribers.forEach(function(subscriber) {
            subscriber();
          });
          resolve("success");
        },
        function(err) {
          alert(err);
          reject(err);
        }
      );
		});
  }
})
