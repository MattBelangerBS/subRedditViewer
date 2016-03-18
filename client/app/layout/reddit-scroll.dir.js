(function() {
    'use strict';
    
    /**
* @desc scroll directive that gets scroll poisition and adds class if scolling down or removes it when scrolling up
* @example <nav  scroll  ng-class="{minimizeSlow:slide, minimizeFast:slide&&!isCollapsed}"">
*/
    angular
        .module('subReddit')
        .directive("scroll",Scroll);
        
    Scroll.$inject = ['$window'];
    
    function Scroll ($window) {
        return function(scope, element, attrs) {
                    
            angular.element($window).bind("scroll",scrollAction); 
            
            function scrollAction(){
                    if (this.pageYOffset > this.lastScrollTop) {
                        scope.slide = true;
                    } else {
                        scope.slide = false;
                    }
                    this.lastScrollTop = this.pageYOffset;
                    scope.$apply();
            }
            
            scope.$on('$destroy', function() {
                angular.element($window).unbind("scroll", scrollAction);
            })
        };
    };
    
})();