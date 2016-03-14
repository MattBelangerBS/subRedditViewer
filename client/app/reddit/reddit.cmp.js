
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('reddit',{
           templateUrl: 'app/reddit/reddit.html',
        bindings: {
            sub: '<',
            subIndex:'<',
            removeSub: '&',
            popUp:'&'
        },
        controllerAs:'ctrl',
        controller: function() {
        }
    });        
     
})();