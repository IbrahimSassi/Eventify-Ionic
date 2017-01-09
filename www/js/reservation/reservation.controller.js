/**
 * Created by moham on 12/30/2016.
 */
(function () {
  'use strict';

  /**My Module init**/
   angular
    .module('EventifyApp.reservation', [
      'ui.router', 'monospaced.qrcode'
    ])
    .config(config)
    .controller('ReservationCtrl', ReservationCtrl);
  /**End My Module Init**/

  /**Injection**/
  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  ReservationCtrl.$inject = ['ReservationService', '$state', '$rootScope', '$scope'];
  /**End Of Injection**/


  /** Route Config **/
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider



      .state('app.reservations', {
        url: "/reservations",
        cache: false,
        views: {
          'menuContent': {
            controller: 'ReservationCtrl as reservationCtrl',
            templateUrl: "templates/reservation/myreservations.html"
          }
        }
      })

      .state('app.reservateForEvent', {
        url: '/booking',
        views: {
          'menuContent': {
        templateUrl: 'templates/reservation/eventBooking.html',
        controller: 'ReservationCtrl as createReservation',
        params: {
          eventIDD: null,
          tickets: null,   }
          }
        }
      })



    ;

  };
  /**End of Route Config**/


  function ReservationCtrl(ReservationService, $state, $rootScope, $scope) {


    var vm = this;

vm.getAllReservationByUser = function () {

  ReservationService.getReservationByIdUser({userId:$rootScope.currentUser.User.id}).then(function (data) {
    vm.allreservationsByUser = data;
    console.log("Event Participation By User: ",data)

  });


}


      }


})();
