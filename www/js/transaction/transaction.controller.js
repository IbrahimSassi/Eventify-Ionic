/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.transaction', [
            'ui.router',
        ])
        .config(config)
        .controller('TransactionCtrl', TransactionCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TransactionCtrl.$inject = ['TransactionService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.listTransactions', {
                url: '/transactions',
              views: {
                'menuContent': {
                templateUrl: 'templates/transaction/listTransactions.html',
                controller: 'TransactionCtrl as transaction'
                }}})


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function TransactionCtrl(TransactionService, $state) {


        var vm = this;


        /**List Transactions**/
        vm.transactionsList = function () {
            console.log("called",TransactionService.getAllTransactions());
            TransactionService.getTransactions().then(function (data) {
                console.log("data",data);
                vm.transactions = data;
            });
        }



    };

    /**End UserCtrlFunction**/

})();

