/**
 * Created by Ibrahim on 23/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .controller('EventDetailCtrl', EventDetailCtrl);

  EventDetailCtrl.$inject = ['EventService', '$state', '$stateParams', 'WishlistService'];

  /* @ngInject */
  function EventDetailCtrl(EventService, $state, $stateParams, WishlistService) {
    var vm = this;
    vm.title = 'EventDetailCtrl';
    vm.currentUser = 1;

    activate();

    ////////////////


    vm.addToWishlist = function (event) {
      if (vm.existInWishlist)
        WishlistService.removeFromWishlist(vm.currentUser, event.id);
      else
        WishlistService.addToWishlist(vm.currentUser, event.id);

      vm.existInWishlist = !vm.existInWishlist;

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

