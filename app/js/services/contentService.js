(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('contentService',contentService);

    function contentService(){
        this.hoverImage;
    }

})();