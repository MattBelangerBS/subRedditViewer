(function() {
    
    angular
        .module('subReddit')
        .service('apiSrv',apiSrv);

    function apiSrv($http){
        this.http = $http;
        this.BASEURL= "http://reddit.com/r/";
        this.ENDPOINT= "/.json";
        
    }

    apiSrv.prototype.getRequest = function(sub) {
            return this.http.get(this.BASEURL + sub+ this.ENDPOINT);  
    }

})();