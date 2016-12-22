/**
 * Created by Ibrahim on 22/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .service('EventService', EventServiceFN);

    EventServiceFN.$inject = ['EventFactory','$http'];

    /* @ngInject */
    function EventServiceFN(EventFactory,$http) {




      this.getAllEvents = getAllEventsFN;



        function getAllEventsFN() {
            return EventFactory.query().$promise;
        }



    }

})();

