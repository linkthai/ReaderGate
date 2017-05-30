(function () {
    'use strict';

    angular
        .module('readerGate')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $location) {
        $rootScope.$watch(function () {
                return $location.path();
            }
            , function (a) {
                console.log('url has changed: ' + a);
                ga('set', {
                    page: a
                });
                ga('send', 'pageview');
            });
        $log.debug('runBlock end');
    }

})();