
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditnav', {
            
            controller: NavCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/layout/nav.html'
    });
            
       

    NavCtrl.$inject = ['$state','$scope','RedditSrv','prompt','UserSrv','AuthSrv','$rootScope'];
       
    function NavCtrl($state,$scope,RedditSrv,prompt,UserSrv,AuthSrv,$rootScope){
        var ctrl = this;
        console.log($rootScope.$$listeners);
        //injectable
        ctrl.RedditSrv = RedditSrv;
        ctrl.UserSrv = UserSrv;
        ctrl.AuthSrv = AuthSrv;
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
        function updateReddits() {
            ctrl.RedditSrv.updateReddits(0);
        }
         function debug() {
            console.log(ctrl.RedditSrv.fullList);
            console.log(ctrl.RedditSrv.subReddits)
        }
        function getUsers(){
            ctrl.UserSrv.getUsers();
        }
         function logOut(){
            ctrl.AuthSrv.clearCookies();
            $state.go('auth');
        }

        function clearStorage(params) {
            var ctrl = this;
             //simple confirmation
            ctrl.prompt({
                title: 'Clear all saves?',
                message: 'Are you sure you want to do this?'
            }).then(function(){
               ctrl.AuthSrv.clearCookies();
               ctrl.RedditSrv.fullList = [];
               ctrl.RedditSrv.subReddits = [];
            });
        }
        
    }
    

})();