/**
 * Created by Ibrahim on 22/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event', [
      'angularMoment',
      'ngMap',
      'ngCordova',
    ])
    .config(ConfigFN)

    .controller('EventCtrl', EventCtrl);

  EventCtrl.$inject = ['EventService', '$scope', '$filter'];


  function ConfigFN($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app.events', {
        url: "/events",
        cache: false,
        views: {
          'menuContent': {
            controller: 'EventCtrl as event',
            templateUrl: "templates/event/events-listing.view.html"
          }
        }

      })
      .state('events-map', {
        url: "/events/map",
        cache: false,
        controller: 'EventMapListCtrl as EventMap',
        templateUrl: "templates/event/events-listing-map.view.html"
      })
      .state('events-details', {
        url: "/events/detail/:id",
        cache: false,
        controller: 'EventDetailCtrl as event',
        templateUrl: "templates/event/event-detail.view.html"
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/events');

  }


  /* @ngInject */
  function EventCtrl(EventService, $scope, $filter) {
    var vm = this;
    vm.title = 'EventCtrl';


    vm.events = [];


    //Getting All Events
    vm.getEvents = function () {
      EventService.getAllEvents().then(function (data) {
        vm.allEvents = data;
        console.log(data);
        vm.end = vm.allEvents.length - 3;
        vm.start = vm.allEvents.length;
        // $filter('orderBy')(vm.allEvents,'id');

        vm.loadMore();
      });

    };

    // vm.getEvents();
    vm.loadMore = function () {

      setTimeout(function () {
        for (var i = vm.allEvents.length - 1; i >= 0; i--) {
          if ((i <= vm.start) && (i > vm.end)) {

            // console.log(vm.allEvents[i])
            console.log(i)
            vm.events.push(vm.allEvents[i]);

          }
        }
        // $filter('orderBy')(vm.events, 'id');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        vm.start = vm.start - 3;
        vm.end = vm.end - 3;

      }, 2000);

    };


    vm.doRefresh = function () {
      vm.events = [];
      vm.getEvents();
      $scope.$broadcast('scroll.refreshComplete');

    };


  }


})();

