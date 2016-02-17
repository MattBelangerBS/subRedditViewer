(function() {
    'use strict';
    
    angular
        .module('subReddit')
        .directive("scroll",Scroll); 
            
    function Scroll ($window) {
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset > this.lastScrollTop) {
                    scope.boolChangeClass = true;
                } else {
                    scope.boolChangeClass = false;
                }
                this.lastScrollTop = this.pageYOffset;
                scope.$apply();
            });
        };
    };
    
})();