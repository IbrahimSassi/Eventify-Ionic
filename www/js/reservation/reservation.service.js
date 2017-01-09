/**
 * Created by moham on 12/30/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.reservation')
    .service('ReservationService', ReservationServiceFN);

  ReservationServiceFN.$inject = ['ReservationFactory', '$filter','TicketService'];


  function ReservationServiceFN(ReservationFactory, $filter,$rootScope,TicketService) {

    this.getAllReservations = function () {
      return ReservationFactory.query().$promise;
    };



    this.getReservationByIdUser = function (userId) {
      return ReservationFactory.getUsersByReservation(userId).$promise;
    };



    this.addReservation =  function (reservation) {
      console.log(reservation);

      return ReservationFactory.save(reservation).$promise;
    }

    this.CountReservations = function () {








      var cnt;
      var reser= ReservationFactory.query();
      reser.forEach(function (reser) {
        cnt++;
        $scope.cnt=vm.cnt;
        console.log("zeeeeeeeeeb");

      });
      return cnt; };


  }


})();

