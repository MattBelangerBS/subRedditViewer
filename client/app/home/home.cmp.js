
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('home',{
            controller: HomeCtrl,
            controllerAs: 'ctrl',
            templateUrl:'app/home/home.html'

        });            
     
    HomeCtrl.$inject = ['$state','$scope','$uibModal','RedditSrv','$http','jwtHelper'];
    
    function HomeCtrl($state,$scope,$uibModal,RedditSrv,$http,jwtHelper){
        var ctrl = this;
        //injectables
        ctrl.$uibModal = $uibModal;
        ctrl.RedditSrv = RedditSrv;

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
       
        
   
        //watches (watches service for subreddit changes)
        $scope.$watch("ctrl.RedditSrv.subReddits",
            function handelNewRedditsNames(newvalue,oldvalue){
            updateState();
        });
        $scope.$watch("ctrl.RedditSrv.fullList",
            function handelNewRedditsData(newvalue,oldvalue){
            updateState();
        });
        
        ////////////////////////////
        
         function activate() {             
             if(localStorage.subReddits !== undefined){
                 
                ctrl.subReddits = JSON.parse(localStorage.subReddits);
                ctrl.RedditSrv.activate();
            }
                
         }   
         
         function updateState() {          
             ctrl.fullList = ctrl.RedditSrv.fullList;
             ctrl.subReddits = ctrl.RedditSrv.subReddits;
         }  
                       
        function popUp(pic) {
            var ctrl = this;
        
            if(pic!=="self" && pic !== ""){
                ctrl.RedditSrv.hoverImage = pic;
                ctrl.$uibModal
                    .open({
                        animation: true,
                        templateUrl: '/app/popUp/popUp.html',
                        controller: 'PopCtrl',
                        controllerAs: 'ctrl',
                        windowClass: 'app-modal-window',
                        size: "sm"
                    });
            }
        }
        
        function removeSub(indexToRemove) {
            var ctrl = this;
            ctrl.RedditSrv.removeSub(indexToRemove);
        }
        
    }
    
    
})();