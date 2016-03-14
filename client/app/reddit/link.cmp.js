
(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .component('redditlink',{
           templateUrl: 'app/reddit/link.html',
        bindings: {
            thing: '<',
            popUp:'&'
        },
        controllerAs:'ctrl',
        controller: function() {
            var ctrl = this;
            ctrl.url = "http://reddit.com"
        }
    });        
     
})();