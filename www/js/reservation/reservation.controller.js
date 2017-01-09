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
  ReservationCtrl.$inject = ['ReservationService', '$state', 'BankService', '$rootScope', '$scope', '$timeout', '$stateParams', 'TicketService', 'TransactionService', '$window'];
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

      .state('app.reservate', {
        url: '/reservate',
        views: {
          'menuContent': {
            templateUrl: 'templates/reservation/reservate.html',
            controller: 'ReservationCtrl as createReservation',
            params: {
              eventIDD: 1,
              tickets: null,   }
          }
        }
      })
      .state('app.thanks', {
        url: '/thanks',
        views: {
          'menuContent': {
        templateUrl: 'templates/reservation/thanks.html',
        controller: 'ReservationCtrl as reservationCompleted'
      }
        }
      })



    ;

  };
  /**End of Route Config**/


  function ReservationCtrl(ReservationService, $state, BankService, $rootScope, $scope, $timeout, $stateParams, TicketService, TransactionService, $window) {


    var vm = this;

vm.getAllReservationByUser = function () {

  ReservationService.getReservationByIdUser({userId:$rootScope.currentUser.User.id}).then(function (data) {
    vm.allreservationsByUser = data;
    console.log("Event Participation By User: ",data)

  });


}

vm.reservation = {
  user:{id:1},
  ticket:{id:1}
};


vm.addReservationD = function () {
  console.log("Event Participation By User: ");
  ReservationService.addReservation(vm.reservation).then(function (data) {
    vm.allreservationsByUser = data;
    console.log("Event Participation By User: ",data)
    $state.go('app.reservations');
  });

};


//*******************************************************************


    vm.ticketsToShow = $stateParams.tickets;
    vm.totals = angular.fromJson(sessionStorage.sales);


    //END init tickets value


    //TRYING TO SEVE IN LOCAL STORAGE
    var service = {

      model: {
        name: '',
        email: ''
      },

      SaveState: function () {
        sessionStorage.userService = angular.toJson(service.model);
      },

      RestoreState: function () {
        service.model = angular.fromJson(sessionStorage.userService);
      }
    }

    $rootScope.$on("savestate", service.SaveState);
    sessionStorage.userService = angular.toJson(service.model);
    console.log("Hey", angular.fromJson(sessionStorage.sales));
    //END TRYING TO SEVE IN LOCAL STORAGE


    /**Working with changing checkbox value*/
    var checkbox = false;
    vm.stateChanged = function () {
      if (checkbox == true) {
        checkbox = false;
      }
      else if (checkbox == false) {
        checkbox = true;
      }
      console.log("Payment checkbox value", checkbox);
      console.log($stateParams.eventIDD);
      console.log($stateParams.tickets);


    };
    /**END Working with changing checkbox value*/

    /**List Reservations**/
    vm.reservationsList = function () {
      console.log("called", ReservationService.getAllReservations());
      ReservationService.getAllReservations().then(function (data) {
        console.log("data", data);
        vm.reservations = data;
      });
    }


    /**Adding static values TODO **/

    vm.reservation = {

      reservationDate: new Date(),
      user: {id: 1},

    };

    vm.transaction = {};

    /**END Adding static values TODO **/


    /**Init After Paying Paypal*/


    this.paypalCompleted = function () {

      var tiki = angular.fromJson(sessionStorage.allticketstobuy);
      $rootScope.tickettoQR = angular.fromJson(sessionStorage.allticketstobuy);
      tiki.forEach(function (ticket) {

        vm.reservation = {
          ticket: ticket,
          amount: ticket.priceTicket,
          user: {id: $rootScope.currentUser.User.id},
          reservationDate: new Date(),
          paymentMethod: "Paypal"
        };

        /*
         vm.reservation.ticket = ticket;
         vm.reservation.amount = ticket.priceTicket;
         vm.reservation.paymentMethod = "Paypal";

         */
        ReservationService.addReservation(vm.reservation).then(function () {


        });

        ReservationService.getAllReservations().then(function (data) {

          data.forEach(function (reser) {



            //TRYING TO SEVE IN LOCAL STORAGE


            var idres = {

              id: reser.id


            }


            sessionStorage.lastRes = angular.toJson(idres);

            console.log("hh", angular.toJson(idres));


          });


        });
        var a = ((angular.fromJson(sessionStorage.lastRes)).id);

        vm.transaction = {
          token: "AFxccvF45hjg54fdf45q4f5FGJH",
          amount: ticket.priceTicket,
          reservation: {
            id: a++
          }
        };

        /*
         vm.transaction.token = "AFxccvF45hjg54fdf45q4f5FGJH";
         vm.transaction.amount = ticket.priceTicket;
         vm.transaction.reservation = {
         id: a.id
         }
         */
        console.log("haaha", angular.fromJson(sessionStorage.lastRes));
        TransactionService.addTransaction(vm.transaction).then(function () {

        });


      });


    }


    /**End of init paying after paypal*/


    /** Adding Reservation **/
    vm.add = function () {
      sessionStorage.allticketstobuy = angular.toJson(vm.ticketsToShow);
      if ($scope.counter != 0) {
        var bankResponse;
        /**FOR CREDIT CARD*/
        if (checkbox == true) {
          // bankResponse=  BankService.BankByData(vm.creditCard.name, vm.creditCard.num, vm.creditCard.expmonth, vm.creditCard.expyear, vm.creditCard.ccv);
          bankResponse = true;
          /**END FOR CREDIT CARD*/
          console.log("uuuuuuuuhh: ", bankResponse);
          if (bankResponse == true) {


            BankService.updateAmount(vm.creditCard.name, vm.totals.total);
            vm.ticketsToShow.forEach(function (ticket) {


              vm.reservation = {
                ticket: ticket,
                amount: ticket.priceTicket,
                paymentMethod: "Paypal"
              };


              ReservationService.addReservation(vm.reservation).then(function () {


              });

              ReservationService.getAllReservations().then(function (data) {

                data.forEach(function (reser) {



                  //TRYING TO SEVE IN LOCAL STORAGE
                  var idres = {

                    id: reser.id


                  }


                  sessionStorage.lastRes = angular.toJson(idres);

                  console.log("hh", angular.toJson(idres));


                });


              });
              var a = ((angular.fromJson(sessionStorage.lastRes)).id);
              vm.transaction = {
                token: "AFxccvF45hjg54fdf45q4f5FGJH",
                amount: ticket.priceTicket,
                reservation: {
                  id: a++
                } }

              console.log("haaha", angular.fromJson(sessionStorage.lastRes));
              TransactionService.addTransaction(vm.transaction).then(function () {
                $state.go('thanks');
              });


            });


          }

        }

        else {


          TransactionService.payReservation(vm.totals.total).then(function (data) {
            console.log("ti hayaaaa:", data.links[1].href);
            $window.location.href = data.links[1].href;

          });


        }


      }

      else {
        console.log("Ti mana 9olna l kabar wfé");
      }

    };
    /** END Adding Reservation **/


    /**Reservation Timer**/

    $scope.counter = 1200;


    $scope.onTimeout = function () {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout, 1000);
      if ($scope.counter == 0) {

        alert("Lkabar Wfé");
        $timeout.cancel(mytimeout);


        /** Update Ticket Numbers */



        $stateParams.tickets.forEach(function (ticket) {

          TicketService.updateNbTicket(ticket);


        });


        /**END Update Ticket Numbers */


      }
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);








      };





})();
