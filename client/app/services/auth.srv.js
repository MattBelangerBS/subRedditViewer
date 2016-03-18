(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('AuthSrv',AuthSrv);

    AuthSrv.$inject = ['$cookies'];
    
    function AuthSrv($cookies){     
        
        
        var service = {
            setCookie:setCookie,
            getCookie:getCookie,
            clearCookies:clearCookies
        }
        return service;
        /////////////////////////////////
       
        
         function setCookie(path,data) {
            var now = new Date(),
            exp = new Date(now.getFullYear(), now.getMonth(), now.getDate()+3);
            
            if(path==="token"){
                $cookies.put(path,data,{expires:exp});
            } else {
                
                $cookies.putObject(path,data,{expires:exp});
            }
            console.log($cookies.get(path));
         }  
         
         function getCookie(path) {
             var cookie = $cookies.get(path);
             if (path ==='token'){ 
                 return cookie;
            } else {
                return JSON.parse(cookie);
             }
         } 
            
         function clearCookies() {
             $cookies.remove('token');
             $cookies.remove('subReddits');
         }        
        
    }

})();