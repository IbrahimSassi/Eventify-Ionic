(function () {
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
  angular.module('EventifyApp', [
    'ionic',
    // 'ionic.cloud',
    'ngCordova',
    'ngResource',
    'EventifyApp.home',
    'EventifyApp.event',
    'EventifyApp.wishlist',
    'EventifyApp.user',
    'EventifyApp.reservation',
    'EventifyApp.comments',
    'EventifyApp.rates',
    'EventifyApp.organization',
    'EventifyApp.transaction',
    'EventifyApp.ticket',
    'EventifyApp.bank',
    'EventifyApp.ticket',
    'EventifyApp.discussion',
    'EventifyApp.task'


  ])

    .config(ConfigFN)
    .run(function ($ionicPlatform, $rootScope,UserService,$state) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });

      /**Redirect if not login*/
      $rootScope.$on("$stateChangeStart", function (event, toState) {
        if (toState.authenticate && !UserService.isAuth()) {
          $rootScope.currentUser = null;

          $state.transitionTo("loginUser");
          event.preventDefault();
        }
        else if (!UserService.isAuth()) {
          $rootScope.currentUser = null;
        }
        else {
          $rootScope.currentUser = UserService.extractTokenData(UserService.getToken());
          $rootScope.logMeOut = function () {
            UserService.logout();
            $state.reload();
          }
        }
      });
      /**/
    });





  function ConfigFN($stateProvider, $urlRouterProvider,$ionicCloudProvider) {

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');


    //Ibra Push Notification Work
    $ionicCloudProvider.init({
      "core": {
        "app_id": "d1d31451"
      },
      "push": {
        "sender_id": "605887726842",
        "pluginConfig": {
          "ios": {
            "badge": true,
            "sound": true
          },
          "android": {
            "iconColor": "#343434"
          }
        }
      }
    });



  }


}());
