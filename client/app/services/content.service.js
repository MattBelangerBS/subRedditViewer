(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('contentService',ContentService);

    ContentService.$inject = ['$q','ApiSrv'];
    
    function ContentService($q,ApiSrv){
        var hoverImage;
        var numResults = 10;
        
        var service = {
            redditGet : redditGet,
            updateReddits : updateReddits
        }
        return service;
        
        
        function redditGet(search) {
            var ctrl = this;
            var deferred = $q.defer();
                         
           reddit.hot(search).limit(numResults)
           .fetch(function (res) {
               var data = res.data.children;
                deferred.resolve(data);
           })
                
            return deferred.promise;
        }
        
        function updateReddits(subreddit) {
             var ctrl = this;
             var deferred = $q.defer();
             
             reddit.hot(subreddit).limit(numResults)
                .fetch(function(res){
                   var data = res.data.children;
                    deferred.resolve(data);
              });
             
            return deferred.promise;
        }
        
         
        
    }

})();