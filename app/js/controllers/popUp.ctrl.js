(function() {
    
    angular
        .module('subReddit')
        .controller('popCtrl',popCtrl);

    function popCtrl($state,$q,$scope,contentService,$modalInstance){
        this.$modalInstance = $modalInstance;
        this.contentService = contentService;
        this.image = this.contentService.hoverImage;
	        
    }

    popCtrl.prototype.closeMod = function () {
                this.$modalInstance.close();
            
};
  
})();