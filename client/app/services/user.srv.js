
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('UserSrv',UserSrv);
            
     
    
    UserSrv.$inject = ['ApiSrv','toastr','$state'];
    
    function UserSrv(ApiSrv,toastr,$state){
        var ctrl = this;
        //injectables
        ctrl.ApiSrv = ApiSrv;
        ctrl.state = $state;
           
        //Exports
         var service = {
            getUsers:getUsers,
            updateUser:updateUser,
            checkUser:checkUser
        }
        return service;
                
        /////////////////////////////
        function getUsers() {
            var ctrl = this;
            ApiSrv.getUsers().then(function(res){

            });
        }    
         function checkUser() {
            var ctrl = this;
           return ApiSrv.checkUser().then(function(res){
                return res;
            });
        }    
        
        function updateUser(search) {
            var ctrl = this;
            ApiSrv.updateUser(search).then(function(res){
                if(res.data.success === false){
                    localStorage.clear();
                    $state.go('auth');
                    
                }
            });
        }         
        
          
       
        
        

    } 

    
})();