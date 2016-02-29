
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditnav', {
            
            controller: NavCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/layout/nav.html'
    });
            
       

    NavCtrl.$inject = ['$state','$scope','UpdateService'];
       
    function NavCtrl($state,$scope,UpdateService){
        var ctrl = this;
        //injetcable
        ctrl.UpdateService = UpdateService;
        //varaibles
        ctrl.search = "";
        ctrl.numResults = 10;
        
        
        //expose
        ctrl.getReddit = getReddit;
        ctrl.updateReddits = updateReddits;
        ctrl.clearStorage = clearStorage;
        
        //functions
        function getReddit(search) {
            ctrl.UpdateService.getReddit(search);
            ctrl.search = " ";
        }
        function updateReddits(index) {
            ctrl.UpdateService.updateReddits(index);
        }
        function clearStorage(params) {
             localStorage.clear();
        }
        
    }
    

})();