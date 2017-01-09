/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.user', ['angular-jwt'])
    .config(ConfigFN)
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['UserService', '$scope', '$filter', '$state'];


  function ConfigFN($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('loginUser', {
        url: "/users/login",
        cache: false,
        controller: 'UserCtrl as user',
        templateUrl: "templates/user/login-user.view.html"
      })
      .state('app.userProfile', {
        url: "/users/profile",
        cache: false,
        views: {
          'menuContent': {
            controller: 'UserCtrl as user',
            templateUrl: "templates/user/profile-user.view.html"
          }
        }

      })
      .state('app.userProfileModification', {
        url: "/users/profile/modification",
        cache: false,
        views: {
          'menuContent': {
            controller: 'UserCtrl as user',
            templateUrl: "templates/user/profile-modification.view.html"
          }
        }

      })
      .state('app.userPwd', {
        url: "/users/profile/modification/pwd",
        cache: false,
        views: {
          'menuContent': {
            controller: 'UserCtrl as user',
            templateUrl: "templates/user/profile-change-pwd.view.html"
          }
        }

      })
    ;


  }


  /* @ngInject */
  function UserCtrl(UserService, $scope, $filter, $state) {
    var vm = this;
    vm.title = 'UserCtrl';


    vm.signIn = function (username, pwd) {
      UserService.signIn(username, pwd).then(
        function (data) {
          vm.tokenToStore = data.authToken;
          UserService.saveToken(vm.tokenToStore);
          $state.go('app.events');
        },
        function (error) {
          console.log("Error Login : " + error);
          $state.go('loginUser');
        }
      );
    };

    vm.updateMyUser=function (user) {
      //$rootScope.currentUser.User=user;
      var res=UserService.updateUser(user,UserService.getToken());
      console.log(res);
      $state.reload();

    };


    vm.changePasswordCTRL = function (user, oldPwd, newPwd) {
      console.log(UserService.changePassword(user, oldPwd, newPwd, UserService.getToken()));
      $state.go('app.userProfile');
    };

  }


})();

