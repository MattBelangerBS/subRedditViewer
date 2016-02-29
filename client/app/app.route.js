(function(){
    'use strict';
    
    angular.module('subReddit')
        .config(config);

        config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];
        
        function config($stateProvider, $httpProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider

            .state('home', {
                url: '/home',
                views: {
                        nav: {
                            template: '<redditnav></redditnav>'
                        },
                        content: {
                             template:'<home></home>'
                        }
                }
            });
        };
       
})();
