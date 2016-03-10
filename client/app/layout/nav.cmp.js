
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditnav', {
            
            controller: NavCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/layout/nav.html'
    });
            
       

    NavCtrl.$inject = ['$state','$scope','UpdateService','prompt','contentService'];
       
    function NavCtrl($state,$scope,UpdateService,prompt,contentService){
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
        ctrl.debug = debug;
        
        //functions
        function getReddit(search) {
            ctrl.UpdateService.getReddit(search);
            ctrl.search = " ";
        }
        function updateReddits(index) {
            ctrl.UpdateService.updateReddits(index);
        }
         function debug() {
            console.log(ctrl.UpdateService.fullList);
            console.log(ctrl.UpdateService.subReddits)
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