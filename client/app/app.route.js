(function(){
    'use strict';
    
    angular.module('subReddit')
    	.constant('HOST_BASE_URL', 'http://localhost:8080')
        .config(config);

        config.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider']
        
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
               resolve: {
                        auth:function($state,jwtHelper,AuthSrv){
                            try{
                                jwtHelper.decodeToken(AuthSrv.getCookie('token'));
                            }
                            catch(err){
                                var ctrl = this;
                                ctrl.$state.go('auth');
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
                        controllerAs:'ctrl'    
                    }
                }
			})
			.state('register',{
				url:'/register',
                views:{
                    content:{
                        templateUrl:'app/login/register.html',
                        controller:'AuthCtrl',
                        controllerAs:'ctrl'
                    }
                }
			})
            
            $httpProvider.interceptors.push(function(jwtHelper,AuthSrv){
			return {
				request:function(config){
                    if(config.url.indexOf('reddit')<0){
                        var cookieToken = AuthSrv.getCookie('token');
                        if(cookieToken !== 'undefined'){
                            config.headers.authentication = cookieToken;
                        }
                    }
                    return config;
				},
				response:function(response){
					var auth_token = response.headers('authentication');
					if(auth_token){
						var decrypt_token = jwtHelper.decodeToken(auth_token);
						if(decrypt_token.email){
                           AuthSrv.setCookie('token',auth_token);	
						}
						
					}
					return response;
				}
			}
		});
        };
       
})();
