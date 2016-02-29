
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('home',{
            controller: HomeCtrl,
            controllerAs: 'ctrl',
            templateUrl:'app/home/home.html'

        });            
     
    HomeCtrl.$inject = ['$state','$scope','contentService','$uibModal','UpdateService'];
    
    function HomeCtrl($state,$scope,contentService,$uibModal,UpdateService){
        var ctrl = this;
        //injectables
        ctrl.$uibModal = $uibModal;
        ctrl.contentService = contentService;
        ctrl.UpdateService = UpdateService;

        //view variables
        ctrl.search;
        ctrl.fullList=[];
        ctrl.$scope = $scope;
        ctrl.subReddits = [];
        ctrl.numResults = 10;
        
        // functions
        ctrl.popUp = popUp;
        ctrl.removeSub = removeSub;
        ctrl.updateState = updateState;
        
       //init function calls
       activate();
        
        //watches ( watches service for subreddit changes)
        $scope.$watch("ctrl.UpdateService.subReddits",
            function handelNewReddits1(newvalue,oldvalue){
            console.log(newvalue);
            updateState();
        });
        $scope.$watch("ctrl.UpdateService.fullList",
            function handelNewReddits2(newvalue,oldvalue){
            console.log(newvalue);
            updateState();
        });
        
        ////////// functions
        
         function activate() {             
             if(localStorage.savedReddits || localStorage.subReddits){
                ctrl.fullList = JSON.parse(localStorage.savedReddits);
                ctrl.subReddits = JSON.parse(localStorage.subReddits);
                ctrl.UpdateService.activate();
            };
         }   
         
         function updateState() {          
             ctrl.fullList = ctrl.UpdateService.fullList;
             ctrl.subReddits = ctrl.UpdateService.subReddits;
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
        
        function removeSub(index) {
            var ctrl = this;
            console.log('remove');
            ctrl.UpdateService.removeSub(index);
        }
        
    }
    
    
})();