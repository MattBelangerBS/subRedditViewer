
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('HomeCtrl',HomeCtrl);
    
    HomeCtrl.$inject = ['$state','$scope','contentService','$uibModal','ApiSrv','redditPrep'];
    
    function HomeCtrl($state,$scope,contentService,$uibModal,ApiSrv,redditPrep){
        var ctrl = this;
        console.log(redditPrep);
        //injectables
        ctrl.$uibModal = $uibModal;
        ctrl.contentService = contentService;
        ctrl.ApiSrv = ApiSrv;

        
        //view variables
        ctrl.search;
        ctrl.fullList=[];
        ctrl.$scope = $scope;
        ctrl.subReddits = [];
        ctrl.numResults = ctrl.contentService.numResults;
        
        // functions
        ctrl.click = click;
        ctrl.popUp = popUp;
        ctrl.clearStorage = clearStorage;
        ctrl.removeSub = removeSub;
        ctrl.updateReddits = updateReddits;
        
        $scope.$watch(' ctrl.numResults', function(current, original) {
            ctrl.contentService.numResults = current;
            console.log("yo");
        });
        
       //init function calls
        activate();
        
        // functions
         function activate() {             
             if(localStorage.savedReddits){
                ctrl.fullList = JSON.parse(localStorage.savedReddits);
            };
            if(localStorage.subReddits){
                ctrl.subReddits = JSON.parse(localStorage.subReddits);
                ctrl.updateReddits(0);
            };
         }     
                       
        function click (search) {
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
                ctrl.contentService.redditGet(search)
                .then(function (data) {
                    console.log(data);
                    var temp = data;
                    ctrl.fullList.push(temp);
                    console.log(temp);
                   // ctrl.$scope.$apply()
                    //set localsotrage
                    localStorage.subReddits = JSON.stringify(ctrl.subReddits);
                    localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                    console.log(ctrl.fullList);
                    ctrl.search = "";
                });                   
            };
            
        }
        
        
        function popUp(pic) {
            var ctrl = this;
        
            if(pic!=="self" && pic !== ""){
                ctrl.contentService.hoverImage = pic;
                ctrl.$uibModal
                    .open({
                        animation: true,
                        templateUrl: '/app/popUp/popUp.html',
                        controller: 'PopCtrl',
                        controllerAs: 'ctrl',
                        size: "sm"
                    });
            }
        }
        
        // function redditGet(search) {
        //     var ctrl = this;

        //     reddit.hot(search).limit(ctrl.numResults)
        //         .fetch(function(res) {
        //         // res contains JSON parsed response from Reddit
        //             console.log(res);
        //             var temp = res.data.children;
        //             ctrl.fullList.push(temp);
        //             console.log(temp);
        //             ctrl.$scope.$apply()
        //             //set localsotrage
        //             localStorage.subReddits = JSON.stringify(ctrl.subReddits);
        //             localStorage.savedReddits = JSON.stringify(ctrl.fullList);
        //             console.log(ctrl.fullList);
        //             ctrl.search = "";
        //         });
        // }
        
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
            
            ctrl.contentService.updateReddits(ctrl.subReddits[ctrl.index])
                .then(function(res){
                    var temp = res;
                    
                    for(var i = 0; i < temp.length;i++){
                        ctrl.fullList[ctrl.index][i].data = temp[i].data;
                    }
                    
                    localStorage.savedReddits = JSON.stringify(ctrl.fullList);
                        
                    if((ctrl.index+1) < ctrl.subReddits.length){
                        ctrl.index = ctrl.index+1;
                        console.log((ctrl.index+1)+ " reddit updated!" )
                        ctrl.updateReddits(ctrl.index);
                    }
              });
        }
    }
})();