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
            return $http.get(ctrl.BASEURL + sub+ ctrl.ENDPOINT);   
        }
    }

})();