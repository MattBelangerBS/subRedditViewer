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
                        // nav: {
                        //     templateUrl: 'app/layout/nav.html',
                        //     controller: 'MainCtrl as ctrl'
                        // },
                        content: {
                            templateUrl: 'app/home/home.html',
                            controller: 'HomeCtrl',
                            controllerAs: 'ctrl'
                        }
                },
                resolve: {
                    redditPrep: redditPrep
                }  
            })
        };
        
        function redditPrep() {
            return 'reddit';
        }

})();
