/**
 * Created by Ibrahim on 23/12/2016.
 */

(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .controller('EventMapListCtrl', EventMapListCtrl);

  EventMapListCtrl.$inject = ['EventService', '$state', '$stateParams','$scope'];

  /* @ngInject */
  function EventMapListCtrl(EventService, $state, $stateParams,$scope) {
    var vm = this;
    vm.title = 'EventDetailCtrl';
    vm.myPostion =EventService.myPostion;
    activate();

    ////////////////


    $scope.$on('mapInitialized', function (event,map) {
      $scope.map = map;
    });


    vm.showEventDetail = function (event,myEvent) {
        vm.selectedEvent = myEvent;
        vm.selectedDistance = vm.getDistance
        (vm.myPostion.lat,
          vm.myPostion.long,
          vm.selectedEvent.latitude,
          vm.selectedEvent.longitude);
        console.log($scope.map);
        $scope.map.showInfoWindow.apply(this,[event,'marker-info']);
    }



    vm.getDirections = function (event) {
      console.log("Getting directions for cafe");
      var destination = [
        event.latitude,
        event.longitude
      ];

      var source = [
        vm.myPostion.lat,
        vm.myPostion.long
      ];

      launchnavigator.navigate(destination, source);
    };

    vm.getDistance = function (lat1,lon1,lat2,lon2) {
      var R = 6371e3; // metres
      var l1 = toRad(lat1);

      var l2 = toRad(lat2);
      var d1 = toRad(lat2-lat1);
      var d2 = toRad(lon2-lon1);

      var a = Math.sin(d1/2) * Math.sin(d1/2) +
        Math.cos(l1) * Math.cos(l2) *
        Math.sin(d2/2) * Math.sin(d2/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;
      return roundDecimal(d/1000,2);
    }


    function toRad(Value) {
      /** Converts numeric degrees to radians */
      return Value * Math.PI / 180;
    }

    function roundDecimal(nombre, precision) {
      var precision = precision || 2;
      var tmp = Math.pow(10, precision);
      return Math.round(nombre * tmp) / tmp;
    }


    function activate() {
      EventService.getAllEvents().then(function (data) {
        vm.events = data;
        console.log(data);
      });

      EventService.ListingEventsInMap();
      console.log(EventService.myPostion)

    }


  }

})();

