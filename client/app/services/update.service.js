
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('UpdateService',UpdateService);
            
     
    
    UpdateService.$inject = ['contentService','ApiSrv','toastr'];
    
    function UpdateService(contentService,ApiSrv,toastr){
        var ctrl = this;
        //injectables
        ctrl.contentService = contentService;
        ctrl.ApiSrv = ApiSrv;
        
        //view variables
        ctrl.search;
        ctrl.fullList=[];
        ctrl.subReddits = [];
        var limit = 10;
        var filter = 'hot';
                
        /////////////////////////////
        function activate() {
            var ctrl = this;
            ctrl.fullList = JSON.parse(localStorage.savedReddits);
            ctrl.subReddits = JSON.parse(localStorage.subReddits);
            ctrl.updateReddits(0);
            
        }         
        
        function getReddit (search) {
            var ctrl = this;
            var bool = false;
            
            for (var i=0;i<ctrl.subReddits.length;i++) {
                if(ctrl.subReddits[i]===search){
                    bool = true;	
                }
            }
            
            if (!bool) {
                ApiSrv.getRequest(search,filter,limit)
                .then (function (data) {
                    if (data.data && !data.data.error) {
                        var temp = data.data.data.children;
                        ctrl.fullList.push(temp);
                        ctrl.subReddits.push(search);
                        localStorage.subReddits = JSON.stringify(ctrl.subReddits);
                        localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                        ctrl.search = "";
                    } else {
                         toastr.error('Please enter a valid subreddit name. Remember no spaces allowed', 'Error');
                    }
                });
                                 
            };
            
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
            if (ctrl.subReddits[index]) {

                ApiSrv.getRequest(ctrl.subReddits[ctrl.index],filter,limit)
                    .then (function(res) {
                        var temp = res.data.data.children;
                        //update local varibale with no ones
                        for (var i = 0; i < temp.length;i++) {
                            if ((ctrl.fullList[ctrl.index][i])) {
                                ctrl.fullList[ctrl.index][i].data = temp[i].data;
                            }
                        }   
                        
                        localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                        
                        //recursive call
                        if ((ctrl.index+1) < ctrl.subReddits.length) {
                            ctrl.index = ctrl.index+1;
                            ctrl.updateReddits(ctrl.index);
                        }
                });
            }
        }
        
        //Exports
         var service = {
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