
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditnav', {
            
            controller: NavCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/layout/nav.html'
    });
            
       

    NavCtrl.$inject = ['$state','$scope','RedditSrv','prompt','UserSrv'];
       
    function NavCtrl($state,$scope,RedditSrv,prompt,UserSrv){
        var ctrl = this;
        //injectable
        ctrl.RedditSrv = RedditSrv;
        ctrl.UserSrv = UserSrv;
        ctrl.prompt = prompt;
        //varaibles
        ctrl.search = "";
        
        
        //expose
        ctrl.getReddit = getReddit;
        ctrl.updateReddits = updateReddits;
        ctrl.clearStorage = clearStorage;
        ctrl.debug = debug;
        ctrl.getUsers = getUsers;
        ctrl.logOut = logOut;
        
        //functions
        function getReddit(search) {
            ctrl.RedditSrv.getReddit(search);
            ctrl.search = " ";
        }
        function updateReddits(index) {
            ctrl.RedditSrv.updateReddits(index);
        }
         function debug() {
            console.log(ctrl.RedditSrv.fullList);
            console.log(ctrl.RedditSrv.subReddits)
        }
        function getUsers(){
            console.log('yo');
            ctrl.UserSrv.getUsers();
        }
         function logOut(){
             localStorage.clear();
            $state.go('auth');
        }

        function clearStorage(params) {
            var ctrl = this;
             //simple confirmation
            ctrl.prompt({
                title: 'Clear all saves?',
                message: 'Are you sure you want to do this?'
            }).then(function(){
               localStorage.clear();
               ctrl.RedditSrv.fullList = [];
               ctrl.RedditSrv.subReddits = [];
            });
        }
        
    }
    

})();