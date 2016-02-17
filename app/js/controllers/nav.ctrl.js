(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .controller('NavCtrl',NavCtrl);

    NavCtrl.$inject = ['$state','$scope','contentService'];
       
    function NavCtrl($state,$scope,contentService){
        
    }

})();