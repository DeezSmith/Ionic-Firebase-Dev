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

      // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: '../view/tabs.html'
        });
    })
    .controller('LayoutCtrl', LayoutCtrl);

  LayoutCtrl.$inject = [''];

  /* @ngInject */
  function LayoutCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'LayoutCtrl';

    activate();

    ////////////////

    function activate() {
    }
  }
})();
