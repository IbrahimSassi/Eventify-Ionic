/**
 * Created by Ibrahim on 23/12/2016.
 */
(function () {
  'use strict';

  angular
    .module('EventifyApp.event')
    .controller('EventDetailCtrl', EventDetailCtrl);

  EventDetailCtrl.$inject = [
    'EventService', '$state', '$stateParams',
    'WishlistService', '$ionicPopup', '$timeout',
    'CommentsService', 'ratesService', '$rootScope'];

  /* @ngInject */
  function EventDetailCtrl(EventService, $state, $stateParams,
                           WishlistService, $ionicPopup, $timeout,
                           CommentsService, ratesService, $rootScope) {
    var vm = this;
    vm.title = 'EventDetailCtrl';
    vm.currentUser = 1;

    activate();

    ////////////////


    vm.addToWishlist = function (event) {
      var title = '';
      var template = '';
      if (vm.existInWishlist) {
        WishlistService.removeFromWishlist(vm.currentUser, event.id);
        title = 'Done';
        template = 'Removed ..';
      }
      else {
        WishlistService.addToWishlist(vm.currentUser, event.id);
        title = 'Added To Wishlist ..';
        template = 'Added To Wishlist ..';

      }
      vm.existInWishlist = !vm.existInWishlist;


      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });


      $timeout(function () {
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

      });

      getCommentByEventId();
    }


    //Mourad Workk


    vm.idUserCTRLParamUrl = $stateParams.idUserCTRL;
    vm.idEventCTRLParamUrl = $stateParams.idEventCTRL;

    if (vm.idUserCTRLParamUrl && vm.idEventCTRLParamUrl) {
      CommentsService.getCommentByUserIdAndEventIdService(vm.idUserCTRLParamUrl, vm.idEventCTRLParamUrl).then(function (success) {
          vm.Comment = success;
        },
        function (error) {
          vm.Comment = null;
          console.log(error);
        }
      );
      console.error(vm.Comment);
    }


    if ($rootScope.currentUser != null) {
      vm.comment = {
        "user": null,
        "event": null,
        "contain": "",
        "commentPK": {
          "idUser": $rootScope.currentUser.User.id,
          "idEvent": vm.SelectedId
        },

      };

    }
    vm.addCommentCTRL = function () {

      CommentsService.addCommentService(vm.comment).then(function () {
        getCommentByEventId();
      });


      vm.myRate = {
        "ratePK": {
          "idUser": $rootScope.currentUser.User.id,
          "idEvent": vm.SelectedId
        },
        "note": ((parseInt(vm.rate.price) + parseInt(vm.rate.organization) + parseInt(vm.rate.staff) + parseInt(vm.rate.place)) / 4),
      };
      ratesService.addRate(vm.myRate)

    }


     function getCommentByEventId() {

      CommentsService.getCommentByIdEvent(vm.SelectedId).then(function (data) {
        vm.commentList = data;
        console.log(vm.commentList);
      });
    }

    vm.deleteComment = function (iduser, idevent) {

      CommentsService.deleteCommentService(iduser, idevent);

      vm.getCommentByEventId();
    }

    ratesService.getRateByEvent(vm.SelectedId).then(function (data) {
      console.log("rate", data.data);
    });


  }

})();

