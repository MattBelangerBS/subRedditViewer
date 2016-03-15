
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .service('UserSrv',UserSrv);
            
     
    
    UserSrv.$inject = ['ApiSrv','toastr'];
    
    function UserSrv(ApiSrv,toastr){
        var ctrl = this;
        //injectables
        ctrl.ApiSrv = ApiSrv;
           
        //Exports
         var service = {
            getUsers:getUsers,
            updateUser:updateUser
        }
        return service;
                
        /////////////////////////////
        function getUsers() {
            var ctrl = this;
            ApiSrv.getUsers().then(function(res){
                console.log(res);
            });
        }    
        
        function updateUser(search) {
            var ctrl = this;
            ApiSrv.updateUser(search).then(function(res){
                console.log(res);
            });
        }         
        
          
       
        
        

    } 

    
})();