angular.module('app')


.controller('OnboardingCtrl', function($scope, $ionicHistory) {
  $ionicHistory.clearHistory();
  $scope.options = {
    loop: false,
    speed: 500,
  }
  $scope.slides = [
    {
      text: "Press the current weather tab at the bottom left to check weather conditions for the day.",
      image: "img/slide1.png"
    },
    {
      text: "Press the hourly weather button at the bottom center to check your hourly forecast. You’ll know when to bring an umbrella or wear shorts for the day.",
      image: "img/slide2.png"
    },
    {
      text: "The Weekly button on the lower right shows the weekly forecast so you can plan for the week.",
      image: "img/slide3.png"
    },
    {
      text: "Navigate to the menu icon in the upper left corner and select the sticker option to change/upgrade your Weather Wiggy to a package that’s more fun!",
      image: "img/slide4.png"
    },
    {
      text: "Select the Map feature and you can even view your weather conditions right on the map!",
      image: "img/slide5.png"
    }
  ];
  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.activeIndex;
    $scope.previousIndex = data.previousIndex;
  });
})
