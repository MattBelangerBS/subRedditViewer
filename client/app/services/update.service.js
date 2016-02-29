
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('UpdateService',UpdateService);
            
     
    
    UpdateService.$inject = ['contentService'];
    
    function UpdateService(contentService){
        var ctrl = this;
        //injectables
        ctrl.contentService = contentService;
        
        //view variables
        ctrl.search;
        ctrl.fullList=[];
        ctrl.subReddits = [];
        ctrl.numResults = 10;
                
        // functions 
         
        function activate() {
            var ctrl = this;
            ctrl.fullList = JSON.parse(localStorage.savedReddits);
            ctrl.subReddits = JSON.parse(localStorage.subReddits);
            ctrl.updateReddits(0);
            
        }           
        function getReddit (search) {
            var ctrl = this;
            var bool = false;
            
            for(var i=0;i<ctrl.subReddits.length;i++){
                if(ctrl.subReddits[i]===search){
                    bool = true;	
                }
            }
            if(!bool){
                ctrl.subReddits.push(search);
                contentService.redditGet(search,ctrl.numResults)
                .then(function (data) {
                    var temp = data;
                    ctrl.fullList.push(temp);
                    localStorage.subReddits = JSON.stringify(ctrl.subReddits);
                    localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                    ctrl.search = "";
                });                   
            };
            
        }
          
        function clearStorage() {
            localStorage.clear();
        }
        
        function removeSub(index) {
            var ctrl = this;
        
            ctrl.fullList.splice(index,1);
            ctrl.subReddits.splice(index,1);
            
            localStorage.savedReddits = JSON.stringify(ctrl.fullList);
            localStorage.subReddits = JSON.stringify(ctrl.subReddits);
        }
        
        function updateReddits(index) {
            var ctrl = this;
            ctrl.index = index;
            
            contentService.updateReddits(ctrl.subReddits[ctrl.index],ctrl.numResults)
                .then(function(res){
                    var temp = res;
                    
                    for(var i = 0; i < temp.length;i++){
                        if((ctrl.fullList[ctrl.index][i])){
                            ctrl.fullList[ctrl.index][i].data = temp[i].data;
                        }
                    }   
                    
                    localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                    if((ctrl.index+1) < ctrl.subReddits.length){
                        ctrl.index = ctrl.index+1;
                        ctrl.updateReddits(ctrl.index);
                    }
              });
        }
        
         var service = {
            clearStorage: clearStorage,
            getReddit:getReddit,
            removeSub:removeSub,
            updateReddits : updateReddits,
            fullList: ctrl.fullList,
            subReddits: ctrl.subReddits,
            numResults: ctrl.numResults,
            activate:activate
        }
        return service;
        
        
    } 

    
})();