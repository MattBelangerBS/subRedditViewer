var app = angular.module('subReddit', ['ui.router','ui.bootstrap','ngAnimate']);



app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    .state('home', {
        url: '/home',
        views: {
                content: {
                    templateUrl: 'templates/home.html',
                    controller: 'MainCtrl as ctrl'
                }

        }  

    })

});


