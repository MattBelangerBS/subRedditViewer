(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('ApiSrv',ApiSrv);

    ApiSrv.$inject = ['$http'];
    
    function ApiSrv($http){     
        var BASEURL = "https://www.reddit.com/r/";
        
        var service = {
            getReddits : getReddits,
            getUsers : getUsers,
            updateUser:updateUser,
            checkUser:checkUser
        }
        return service;
        /////////////////////////////////
        function getReddits(sub,filter,limit) {
            return $http.get(BASEURL+sub+'/'+filter+''+'/.json?limit='+limit)
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                        return data; 
                }
                
                function getFail(e) {
                    return e;
                }
        }
        
        function getUsers() {
            return $http.get('/api/users')
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                        return data; 
                }
                
                function getFail(e) {
                    return e;
                }
        }
        
        function checkUser() {
            return $http.get('/api/users/check')
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                        return data; 
                }
                
                function getFail(e) {
                    return e;
                }
        }
        
        function updateUser(search) {
            
            var data = {
                data:search
            }
            var newData = JSON.stringify(data);
            
            return $http.put('/api/users/',newData)
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                        return data; 
                }
                
                function getFail(e) {
                    return e;
                }
        }
        
                
        
    }

})();