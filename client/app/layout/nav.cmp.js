
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditnav', {
            
            controller: NavCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/layout/nav.html'
    });
            
       

    NavCtrl.$inject = ['$state','$scope','UpdateService','prompt'];
       
    function NavCtrl($state,$scope,UpdateService,prompt){
        var ctrl = this;
        //injetcable
        ctrl.UpdateService = UpdateService;
        ctrl.prompt = prompt;
        //varaibles
        ctrl.search = "";
        
        
        //expose
        ctrl.getReddit = getReddit;
        ctrl.updateReddits = updateReddits;
        ctrl.clearStorage = clearStorage;
        ctrl.tryReddit = tryReddit;
        
        //functions
        function getReddit(search) {
            ctrl.UpdateService.getReddit(search);
            ctrl.search = " ";
        }
        function updateReddits(index) {
            ctrl.UpdateService.updateReddits(index);
        }
        function tryReddit() {
            ctrl.UpdateService.tryReddit();;
        }
        function clearStorage(params) {
            var ctrl = this;
             //simple confirmation
            ctrl.prompt({
                title: 'Clear all saves?',
                message: 'Are you sure you want to do this?'
            }).then(function(){
               localStorage.clear();
               ctrl.UpdateService.fullList = [];
               ctrl.UpdateService.subReddits = [];
            });
        }
        
    }
    

})();