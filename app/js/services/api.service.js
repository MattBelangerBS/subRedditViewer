(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('apiSrv',ApiSrv);

    function ApiSrv($http){
        var ctrl = this;
        
        ctrl.http = $http;
        ctrl.BASEURL= "http://reddit.com/r/";
        ctrl.ENDPOINT= "/.json";
        
    }

    ApiSrv.prototype.getRequest = function(sub) {
        var ctrl = ctrl;
        
        return ctrl.http.get(ctrl.BASEURL + sub+ ctrl.ENDPOINT);  
    }

})();