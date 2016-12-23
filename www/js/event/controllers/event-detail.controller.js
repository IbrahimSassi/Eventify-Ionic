/**
 * Created by Ibrahim on 23/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .controller('EventDetailCtrl', EventDetailCtrl);

  EventDetailCtrl.$inject = ['EventService','$state','$stateParams'];

  /* @ngInject */
  function EventDetailCtrl(EventService,$state,$stateParams) {
    var vm = this;
    vm.title = 'EventDetailCtrl';

    activate();

    ////////////////

    function activate() {


      vm.myPostion =EventService.myPostion;
      // EventService.ListingEventsInMap();

      vm.SelectedId = $stateParams.id;
      vm.SelectedEvent = EventService.getEventById(vm.SelectedId);

    }
  }

})();

