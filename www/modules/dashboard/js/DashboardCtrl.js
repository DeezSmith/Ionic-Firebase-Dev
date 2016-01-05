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
        .state('tab.dash', {
          url: '/dash',
          views: {
            'tab-dash': {
              templateUrl: '../view/dashboard.html ',
              controller: 'DashCtrl'
            }
          }
        });

    })
    .controller('DashCtrl', DashboardController);

  DashboardController.$inject = ['$scope'];

  /* @ngInject */
  function DashboardController($scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'DashboardController';

    activate();

    ////////////////

    function activate() {
    }
  }
})();
