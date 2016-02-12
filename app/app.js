(function(){
var app = angular.module('subReddit', ['ui.router','ui.bootstrap','ngAnimate']);

    app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

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
                        controller: 'MainCtrl as ctrl'
                    }
            }  
        })
    });

})();
