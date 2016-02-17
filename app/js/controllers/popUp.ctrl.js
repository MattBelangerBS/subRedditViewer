(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('popCtrl',PopCtrl);

    function PopCtrl($state,$q,$scope,contentService,$modalInstance){
        var ctrl = this;
        
        ctrl.$modalInstance = $modalInstance;
        ctrl.contentService = contentService;
        ctrl.image = ctrl.contentService.hoverImage;
	        
    }

    PopCtrl.prototype.closeMod = function () {
        var ctrl = ctrl;
        
        ctrl.$modalInstance.close();
            
};
  
})();