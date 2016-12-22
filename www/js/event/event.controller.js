/**
 * Created by Ibrahim on 22/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event', [])
    .config(ConfigFN)

    .controller('EventCtrl', EventCtrl);

  EventCtrl.$inject = ['EventService'];

  /* @ngInject */
  function EventCtrl(EventService) {
    var vm = this;
    vm.title = 'EventCtrl';




    //Getting All Events
    // vm.getEvents = function () {
      EventService.getAllEvents().then(function (data) {
        vm.events = data;
        console.log(data);
      });


    // };

  }



  function ConfigFN($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('events', {
        url: "/events",
        cache: false,
        controller: 'EventCtrl as event',
        templateUrl: "templates/event/events-listing.view.html"
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/events');

  }
})();

