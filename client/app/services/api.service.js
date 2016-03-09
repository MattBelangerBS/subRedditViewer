(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('ApiSrv',ApiSrv);

    ApiSrv.$inject = ['$http'];
    
    function ApiSrv($http){     
        var BASEURL = "http://localhost:80/reddit/";
        
       
        //////////////////
        function getRequest(sub) {
            return $http.get(BASEURL+sub)
                .then(getComplete)
                .catch(getFail);
                
                function getComplete(data, status, headers, config) {
                    var data2 = JSON.parse(data.data);
                    return data2;
                }
                
                function getFail(e) {
                     var newMessage = 'XHR Failed for getCustomer';
                    if (e.data && e.data.description) {
                        newMessage = newMessage + '\n' + e.data.description;
                    }
                    e.data.description = newMessage;
                    return $q.reject(e);
                }
        }
        
         var service = {
            getRequest : getRequest
        }
        return service;
                
        
    }

})();