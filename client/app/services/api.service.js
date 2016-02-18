(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('ApiSrv',ApiSrv);

    ApiSrv.$inject = ['$http'];
    
    function ApiSrv($http){     
        var BASEURL = "http://reddit.com/r/";
        var ENDPOINT = "/.json";
        
        var service = {
            getRequest : getRequest
        }
        return service;
        
        //////////////////
        function getRequest(sub) {
            return $http.get(ctrl.BASEURL + sub+ ctrl.ENDPOINT)
                .then(getComplete)
                .catch(getFail);
                
                
                
                function getComplete(data, status, headers, config) {
                    return data.data;
                }
                
                function getFail(e) {
                     var newMessage = 'XHR Failed for getCustomer';
                    if (e.data && e.data.description) {
                        newMessage = newMessage + '\n' + e.data.description;
                    }
                    e.data.description = newMessage;
                    logger.error(newMessage);
                    return $q.reject(e);
                }
        }
                
        
    }

})();