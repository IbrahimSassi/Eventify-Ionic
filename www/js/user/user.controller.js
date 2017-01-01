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

  UserCtrl.$inject = ['UserService', '$scope', '$filter','$state'];


  function ConfigFN($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('loginUser', {
        url: "/users/login",
        cache: false,
        controller: 'UserCtrl as user',
        templateUrl: "templates/user/login-user.view.html"
      })
    ;


  }


  /* @ngInject */
  function UserCtrl(UserService, $scope, $filter,$state) {
    var vm = this;
    vm.title = 'UserCtrl';


    vm.signIn = function (username, pwd) {
      UserService.signIn(username, pwd).then(
        function (data) {
          vm.tokenToStore = data.authToken;
          UserService.saveToken(vm.tokenToStore);
          $state.go('app.home');
        },
        function (error) {
          console.log("Error Login : " + error);
          $state.go('loginUser');
        }
      );
    };




  }


})();

