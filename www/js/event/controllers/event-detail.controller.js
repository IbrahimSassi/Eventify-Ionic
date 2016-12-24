/**
 * Created by Ibrahim on 23/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .controller('EventDetailCtrl', EventDetailCtrl);

  EventDetailCtrl.$inject = ['EventService', '$state', '$stateParams', 'WishlistService','$ionicPopup','$timeout'];

  /* @ngInject */
  function EventDetailCtrl(EventService, $state, $stateParams, WishlistService,$ionicPopup,$timeout) {
    var vm = this;
    vm.title = 'EventDetailCtrl';
    vm.currentUser = 1;

    activate();

    ////////////////


    vm.addToWishlist = function (event) {
      var title = '';
      var template = '';
      if (vm.existInWishlist)
      {
        WishlistService.removeFromWishlist(vm.currentUser, event.id);
        title = 'Done';
        template = 'Removed ..';
      }
      else
      {
        WishlistService.addToWishlist(vm.currentUser, event.id);
        title = 'Added To Wishlist ..';
        template = 'Added To Wishlist ..';

      }
      vm.existInWishlist = !vm.existInWishlist;


      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });


      $timeout(function() {
        alertPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);



    }


    function activate() {


      vm.myPostion = EventService.myPostion;
      // EventService.ListingEventsInMap();

      vm.SelectedId = $stateParams.id;

      EventService.getEventById(vm.SelectedId).$promise.then(function (data) {
        vm.SelectedEvent = data;

        WishlistService.getWishlistsByUserAndEvent(vm.currentUser, vm.SelectedEvent.id).then(function (data) {
          if (data.wishlistPK)
            vm.existInWishlist = true;
        })

      })
    }
  }

})();

