(function () {
    'use strict';

    angular
        .module('demoapp.controllers')
      .config(function($stateProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
          .state('tab.chats', {
            url: '/chats',
            views: {
              'tab-chats': {
                templateUrl: '../view/tab-chats.html',
                controller: 'ChatsCtrl'
              }
            }
          })
          .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
              'tab-chats': {
                templateUrl: '../view/chat-detail.html',
                controller: 'ChatDetailCtrl'
              }
            }
          });
      })
      .controller('ChatsCtrl', function($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
          Chats.remove(chat);
        };
      })
      .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
      });

})();
