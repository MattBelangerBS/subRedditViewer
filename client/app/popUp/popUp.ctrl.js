(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('PopCtrl',PopCtrl);

    PopCtrl.$inject = ['RedditSrv','$modalInstance'];
    
    function PopCtrl(RedditSrv,$modalInstance){
        var ctrl = this;
        //injectables
        ctrl.RedditSrv = RedditSrv;
        ctrl.$modalInstance = $modalInstance
        
        //viewvariable
        ctrl.image = RedditSrv.hoverImage;
        
        //functions
        ctrl.closeMod = closeMod;
        
        //////////////////////////////////////////////
        function closeMod() {
            var ctrl = this;;
            ctrl.$modalInstance.close();
        }
	        
    }
  
})();