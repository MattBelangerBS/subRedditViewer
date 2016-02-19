(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('PopCtrl',PopCtrl);

    PopCtrl.$inject = ['contentService','$modalInstance'];
    
    function PopCtrl(contentService,$modalInstance){
        var ctrl = this;
        
        ctrl.image = contentService.hoverImage;
        
        ctrl.closeMod = closeMod;
        
        //////////////////////////////////////////////
        function closeMod() {
            var ctrl = this;;
            $modalInstance.close();
        }
	        
    }
  
})();