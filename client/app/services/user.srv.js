
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('UserSrv',UserSrv);
            
     
    
    UserSrv.$inject = ['ApiSrv','toastr','$state'];
    
    function UserSrv(ApiSrv,toastr,$state){
           
        //Exports
         var service = {
            getUsers:getUsers,
            updateUser:updateUser,
            checkUser:checkUser
        }
        return service;
                
        /////////////////////////////
        function getUsers() {
            ApiSrv.getUsers().then(function(res){

            });
        }    
         function checkUser() {
           return ApiSrv.checkUser().then(function(res){
                return res;
            });
        }    
        
        function updateUser(search) {
            ApiSrv.updateUser(search).then(function(res){
                if(res.data.success === false){
                    localStorage.clear();
                    $state.go('auth');
                    
                }
            });
        }         
        
          
       
        
        

    } 

    
})();