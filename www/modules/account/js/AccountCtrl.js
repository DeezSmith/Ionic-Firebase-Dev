(function () {
  'use strict';

  angular
    .module('demoapp.controllers')
    .config(function ($stateProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
        .state('tab.account', {
          url: '/account',
          views: {
            'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
            }
          }
        });

    })
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AccountCtrl($scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'AccountCtrl';

    activate();

    ////////////////

    function activate() {
      $scope.settings = {
        enableFriends: true
      };
    }
  }
})();
