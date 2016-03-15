(function(){
    'use strict';
    
    angular.module('subReddit')
    	.constant('HOST_BASE_URL', 'http://localhost:8080')
        .config(config);

        config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];
        
        function config($stateProvider, $httpProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

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
                },
                resolve:{
                    test: function ($state) {
                        if(localStorage.authToken){
                            return true;
                        } else {
                            $state.go('auth');
                        }
                    }
                }
            })
            .state('auth',{
				url:'/login',
                views:{
                    content:{
                        templateUrl:'app/login/auth.html',
                        controller:'AuthCtrl',
                        controllerAs:'authVm'    
                    }
                },
                // resolve:{
                //     test: function ($state) {
                //         if(!localStorage.authToken){
                //            return true;
                //         } else {
                //             console.log('yoyoyooyoyoyo');
                //             $state.go('home');   
                //         }
                //     }
                // }
				
			})
			.state('register',{
				url:'/register',
                views:{
                    content:{
                        templateUrl:'app/login/register.html',
                        controller:'AuthCtrl',
                        controllerAs:'authVm'
                    }
                }
			})
            
            $httpProvider.interceptors.push(function(jwtHelper){
			return {
				request:function(config){
					// console.log(config);
                    // console.log(config.url.indexOf('reddit'));
                    if(config.url.indexOf('reddit')<0){
                        
                        if(localStorage.authToken !== 'undefined'){
                            config.headers.authentication = localStorage.authToken;
                        }
                    }
                    // console.log(config);
                    return config;
				},
				response:function(response){
					var auth_token = response.headers('authentication');
					if(auth_token){
						var decrypt_token = jwtHelper.decodeToken(auth_token);
						// console.log(decrypt_token);
						if(decrypt_token.email){
							localStorage.authToken = auth_token;
						}
						
					}
					return response;
				}
			}
		});
        };
       
})();
