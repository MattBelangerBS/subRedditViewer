(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('contentService',ContentService);

    function ContentService(){
        var ctrl = this;
        
        ctrl.hoverImage;
    }

})();