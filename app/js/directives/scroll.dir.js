(function() {
    'use strict';
    
    /**
* @desc scroll directive that gets scroll poisition and adds class if scolling down or removes it when scrolling up
* @example <nav  scroll  ng-class="{min:boolChangeClass, min2:boolChangeClass&&!isCollapsed}">
*/
    angular
        .module('subReddit')
        .directive("scroll",Scroll);
        
    Scroll.$inject = ['$window'];
    
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