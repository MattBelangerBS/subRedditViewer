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
        
        ctrl.closeMod = closeMod;
        
        function closeMod() {
            var ctrl = this;;
            ctrl.$modalInstance.close();
        }
	        
    }
  
})();