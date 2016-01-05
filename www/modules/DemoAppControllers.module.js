(function () {
  'use strict';

  angular
    .module('demoapp.controllers', [])
    .config(function ($urlRouterProvider) {
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

    });
})();
