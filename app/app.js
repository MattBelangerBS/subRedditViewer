(function(){
    'use strict';
    
    angular.module('subReddit', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate'
        ])
        .config(config);

        config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];
        
        function config($stateProvider, $httpProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider

            .state('home', {
                url: '/home',
                views: {
                        // nav: {
                        //     templateUrl: 'templates/nav.html',
                        //     controller: 'MainCtrl as ctrl'
                        // },
                        content: {
                            templateUrl: 'templates/home.html',
                            controller: 'MainCtrl',
                            controllerAs: 'ctrl'
                        }
                }  
            })
        };

})();
