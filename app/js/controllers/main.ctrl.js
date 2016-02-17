
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('MainCtrl',MainCtrl);

    function MainCtrl($state,$q,$scope,contentService,$uibModal,apiSrv){
        var ctrl = this;
        ctrl.$q = $q;
        ctrl.$uibModal = $uibModal;
        ctrl.contentService = contentService;
        ctrl.apiSrv = apiSrv;
        
        ctrl.search;
        ctrl.fullList=[];
        ctrl.$scope = $scope;
        ctrl.subReddits = [];
        ctrl.numResults = 10;
        
        if(localStorage.savedReddits){
            ctrl.fullList = JSON.parse(localStorage.savedReddits);
            
        };
        if(localStorage.subReddits){
            ctrl.subReddits = JSON.parse(localStorage.subReddits);
            ctrl.updateReddits(0);
        };
                        
    }

    MainCtrl.prototype.click = function(search) {
        var ctrl = this;
        var bool = false;
        
        for(var i=0;i<ctrl.subReddits.length;i++){

            if(ctrl.subReddits[i]===search){
                bool = true;	
            }
        }
        if(!bool){
            ctrl.subReddits.push(search);
            console.log(ctrl.subReddits);
            ctrl.reddit(search);
        }
    };

    MainCtrl.prototype.popUp = function(pic) {
        var ctrl = this;
        
        if(pic!=="self" && pic !== ""){
            ctrl.contentService.hoverImage = pic;
            ctrl.$uibModal.open({
                animation: true,
                templateUrl: 'templates/popUp.html',
                controller: 'popCtrl as ctrl',
                size: "sm"
            });
       }
    };

    MainCtrl.prototype.reddit = function(search){
        var ctrl = this;

        reddit.hot(search).limit(ctrl.numResults).fetch(function(res) {
                // res contains JSON parsed response from Reddit
                    console.log(res);
                    var temp = res.data.children;
                    ctrl.fullList.push(temp);
                    console.log(temp);
                    ctrl.$scope.$apply()
                    localStorage.subReddits = JSON.stringify(ctrl.subReddits);
                    localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                    console.log(ctrl.fullList);
                    ctrl.search = "";
                });
    };

    MainCtrl.prototype.clearStorage = function() {
        var ctrl = this;
        
        localStorage.clear();
    };

    MainCtrl.prototype.removeSub = function(index) {
        var ctrl = this;
        
        ctrl.fullList.splice(index,1);
        ctrl.subReddits.splice(index,1);
        localStorage.savedReddits = JSON.stringify(ctrl.fullList);
        localStorage.subReddits = JSON.stringify(ctrl.subReddits);
    };

    MainCtrl.prototype.updateReddits = function(index2) {
        var ctrl = this;
        ctrl.index2 = index2;

        reddit.hot(ctrl.subReddits[ctrl.index2]).limit(5).fetch(function(res){

                var temp = res.data.children;
                for(var i = 0; i < temp.length;i++){
                    ctrl.fullList[ctrl.index2][i].data = temp[i].data;
                }
                ctrl.$scope.$apply()
                localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                    
                if((ctrl.index2+1) < ctrl.subReddits.length){
                    ctrl.index2 = ctrl.index2+1;
                    ctrl.updateReddits(ctrl.index2);
                }
        });
    };

})();