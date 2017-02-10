window.placeTools = angular.module('ion-place-tools', []);
placeTools.directive('ionGooglePlace', [
        '$ionicTemplateLoader',
        '$ionicPlatform',
        '$q',
        '$timeout',
        '$rootScope',
        '$document',
        function($ionicTemplateLoader, $ionicPlatform, $q, $timeout, $rootScope, $document) {
            return {
                require: ['?ngModel', '?submit'],
                restrict: 'E',
                templateUrl: 'templates/autocomplete.html',
                replace: true,
                scope: {
                    searchQuery: '=ngModel',
                    locationChanged: '&',
                    radius: '=',
                    super: '=submit',
                    submitted: '=submitted'
                },
                controller: function($scope, $http, LocationService) {
                  $scope.current = LocationService("current location");

                  $scope.submit = function() {
                    $scope.submitted = true;
                    $scope.super($scope.current);
                    $scope.$apply();
                  }

                  $scope.service = {
                    getQueryPredictions: function(req, callback) {

                      $.ajax({
                      url:"http://autocomplete.wunderground.com/aq?cb=call=?",
                      dataType: "jsonp",
                      data:{
                      "query":req.input
                      },
                      crossDomain: true,
                      success: function (json) {
                        var locations = [];
                        json.RESULTS.forEach(function(item){
                          if(item.type != "city") return;
                          var location = item.ll.split(" ");
                          locations.push({
                            description: item.name,
                            location: {
                              lat: location[0],
                              lng: location[1]
                            }
                          })
                        })
                        callback(locations, 200);
                      },
                      error: function(err) {
                        throw err;
                      }
                    })
                  }
                }
              },

                compile: function(element, attrs) {
                  var input = element.find('input');
                  var button = element.find('button');
                  button.html(attrs.title);
                  button.attr("ng-hide", "submitted");

                  return {
                    pre: function(scope) {
                      scope.submitted = true;
                      scope.dropDownActive = true;
                      var searchEventTimeout = undefined;
                      var latLng = null;

                      navigator.geolocation.getCurrentPosition(function (position) {
                          latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                      });

                      var searchInputElement = angular.element(element.find('input'));

                      scope.selectLocation = function(location) {
                          scope.dropDownActive = false;
                          scope.searchQuery = location.description;
                          scope.current = location;
                      };
                      if (!scope.radius) {
                          scope.radius = 1500000;
                      }

                      scope.locations = []

                      scope.$watch('searchQuery', function(query) {
                          if (!query) {
                              query = '';
                          }
                          scope.dropDownActive = (query.length >= 3 && scope.locations.length);
                          if (searchEventTimeout) $timeout.cancel(searchEventTimeout);
                          searchEventTimeout = $timeout(function() {
                              scope.$apply();
                              if(!query) return;
                              if (query.length < 3) {
                                  scope.locations = [];
                                  return;
                              };
                              scope.submitted = false;
                              var req = {};
                              req.input = query;
                              if (latLng) {
                                  req.location = latLng;
                                  req.radius = scope.radius;
                              }
                              scope.service.getQueryPredictions(req, function (predictions, status) {
                                  if (status == 200) {
                                      scope.locations = predictions;
                                      scope.dropDownActive = true;
                                      scope.submitted = false;
                                      scope.$digest();
                                  }
                              });
                          }, 350); // we're throttling the input by 350ms to be nice to google's API
                      });

                      var onClick = function(e) {
                          e.preventDefault();
                          e.stopPropagation();
                          scope.dropDownActive = true;
                          scope.submitted = false;
                          scope.$digest();
                          searchInputElement[0].focus();
                          setTimeout(function(){
                              searchInputElement[0].focus();
                          },0);
                      };

                      var onCancel = function(e){
                          setTimeout(function () {
                              scope.dropDownActive = false;
                              scope.$digest();
                          }, 200);
                      };

                      input.bind('click', onClick);
                      input.bind('blur', onCancel);
                      input.bind('touchend', onClick);


                      if(attrs.placeholder){
                          input.attr('placeholder', attrs.placeholder);
                      }

                    }
                  }
                }
            };
        }
    ]);
