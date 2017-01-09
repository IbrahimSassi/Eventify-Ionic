/**
 * Created by Ibrahim on 22/12/2016.
 */
(function () {
    'use strict';

    angular
      .module('EventifyApp.event', [
        'angularMoment',
        'ngMap',
        'ionic.cloud'
      ])
      .config(ConfigFN)
      .controller('EventCtrl', EventCtrl);

    EventCtrl.$inject = ['EventService', '$scope', '$filter', 'WishlistService', '$ionicPush','$state'];


    function ConfigFN($stateProvider, $urlRouterProvider) {

      $stateProvider
      // On met app.events pck c une state imbriqué dans la state app que vous trouvez dans le home Controller
      // on fait comme ca , lorque on veut attacher cette state a notre side menu cree au niveau de state 'app'
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

        //ce type de state sont des etats indépendantes
        .state('app.events-map', {
          url: "/events/map",
          cache: false,
          views: {
            'menuContent': {
              controller: 'EventMapListCtrl as EventMap',
              templateUrl: "templates/event/events-listing-map.view.html"
            }
          }

        })


        .state('app.events-details', {
          url: "/events/detail/:id",
          cache: false,
          views: {
            'menuContent': {
              controller: 'EventDetailCtrl as event',
              templateUrl: "templates/event/event-detail.view.html"
            }
          }

        })
      ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/events');

    };


    /* @ngInject */
    function EventCtrl(EventService, $scope, $filter, WishlistService, $ionicPush,$state) {
      var vm = this;
      vm.title = 'EventCtrl';

      activate();
      vm.events = [];


      $scope.$on('cloud:push:notification', function(event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
      });


      function activate() {
        // WishlistService.getWishlistsByUserAndEvent()
        //Push Notification

        $ionicPush.register().then(function (t) {
          console.log("called notif token",t);

          // return $ionicPush.saveToken(t,{ignore_user: false});
          return $ionicPush.saveToken(t);
        }).then(function (t) {
          console.log('Token saved:', t.token);
        });

      }

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

      vm.currentUser = 1;

      vm.addToWishlist = function (event) {
        WishlistService.addToWishlist(vm.currentUser, event.id);
      };


      vm.reservate = function () {
        console.log("ggggggggggg");
        $state.go('app.reservate');

      };



    }


  })();

