(function() {
    
    angular
        .module('subReddit')
        .service('contentService',contentService);

    function contentService(){
        this.hoverImage;
    }

})();