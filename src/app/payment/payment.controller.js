(function() {
    'use strict';

    angular
      .module('readerGate')
      .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController($rootScope, $location, $scope, $timeout, bookService, $anchorScroll) {
      var vm = this;
         vm.method=0;
         
         vm.setMethod = function(num) {
           vm.method = num;   
         };
         
         $anchorScroll();
     
  }
})();
