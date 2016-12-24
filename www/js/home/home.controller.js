/**
 * Created by Ibrahim on 23/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.home', ['EventifyApp.event'])
    .config(ConfigFN)

    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];


  function ConfigFN($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/home/sideMenu/menu.html',
        controller: 'HomeCtrl'
      })
      .state('app.home', {
        url: '/home',
        authenticate: true,
        views: {
          'menuContent': {
            controller: 'HomeCtrl as home',
            templateUrl: "templates/home/sideMenu/home.view.html"
          }
        }
      })
    ;
  }


  /* @ngInject */
  function HomeCtrl() {
    var vm = this;
    vm.title = 'Home';


  }


})();

