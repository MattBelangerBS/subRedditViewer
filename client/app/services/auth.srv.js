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
                 
            $cookies.put(path,data,{expires:exp});
            console.log($cookies.get(path));
         }  
         
         function getCookie(path) {
             var cookie = $cookies.get(path);
             return cookie;
         }    
         function clearCookies() {
             $cookies.remove('token');
             $cokkies.remove('subreddits');
         }        
        
    }

})();