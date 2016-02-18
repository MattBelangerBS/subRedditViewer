(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('contentService',ContentService);

    ContentService.$inject = ['ApiSrv'];
    
    function ContentService(ApiSrv){
        var hoverImage;
    }

})();