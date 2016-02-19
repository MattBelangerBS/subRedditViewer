(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('contentService',ContentService);

    ContentService.$inject = ['$q','ApiSrv'];
    
    function ContentService($q,ApiSrv){
        var hoverImage;
        
        var service = {
            redditGet : redditGet,
            updateReddits : updateReddits
        }
        return service;
        
        /////////////////////////////////////
        function redditGet(search,num) {
            var ctrl = this;
            var deferred = $q.defer();
                         
           reddit.hot(search).limit(num)
           .fetch(function (res) {
               var data = res.data.children;
                deferred.resolve(data);
           })
                
            return deferred.promise;
        }
        
        function updateReddits(subreddit,num) {
             var ctrl = this;
             var deferred = $q.defer();
             
             reddit.hot(subreddit).limit(num)
                .fetch(function(res){
                   var data = res.data.children;
                    deferred.resolve(data);
              });
             
            return deferred.promise;
        }
        
    }

})();