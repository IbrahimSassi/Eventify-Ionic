/**
 * Created by Ibrahim on 22/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .service('EventService', EventServiceFN);

  EventServiceFN.$inject = ['EventFactory', '$http', '$cordovaGeolocation', '$ionicPopup'];

  /* @ngInject */
  function EventServiceFN(EventFactory, $http, $cordovaGeolocation, $ionicPopup) {


    var vm = this;
    vm.myPostion = {
      lat: 36.806494799999996,
      long: 10.181531600000001
    };


    this.getAllEvents = getAllEventsFN;
    this.getEventById = getEventByIdFN;
    this.ListingEventsInMap = ListingEventsInMapFN;
    this.getMyRate = getMyRateFN;


    function getAllEventsFN() {
      return EventFactory.query().$promise;
    }

    function getEventByIdFN(id) {
      return EventFactory.get({id: id});
    }

    function getMyRateFN(id) {

      // console.log(EventFactory.getMyRate({idEvent:id}).$promise);
      return EventFactory.getMyRate({idEvent: id}).$promise;
    }



    function ListingEventsInMapFN() {
      ionic.Platform.ready(function () {
        $cordovaGeolocation
          .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
          .then(function (position) {
            console.log("position", position);

            vm.myPostion = {
              lat: position.coords.latitude,
              long: position.coords.longitude
            };


          }, function (err) {
            console.error("Error getting position");
            console.error(err);
            $ionicPopup.alert({
              'title': 'Please switch on geolocation',
              'template': "It seems like you've switched off geolocation for caffeinehit, please switch it on by going to you application settings."
            });
          })
      });
    };




  }

})();

