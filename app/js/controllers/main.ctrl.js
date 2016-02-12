
(function() {
    
    angular.module('subReddit')
        .controller('MainCtrl',MainCtrl);

    function MainCtrl($state,$q,$scope,contentService,$uibModal,apiSrv){
        this.$q = $q;
        this.$uibModal = $uibModal;
        this.contentService = contentService;
        this.apiSrv = apiSrv;
        
        this.search;
        this.fullList=[];
        this.$scope = $scope;
        this.subReddits = [];
        this.numResults = 10;
        
        if(localStorage.savedReddits){
            this.fullList = JSON.parse(localStorage.savedReddits);
            
        };
        if(localStorage.subReddits){
            this.subReddits = JSON.parse(localStorage.subReddits);
            this.updateReddits(0);
        };
                        
    }

    MainCtrl.prototype.click = function(search) {
        var that = this;
        var bool = false;
        for(i=0;i<that.subReddits.length;i++){

            if(that.subReddits[i]===search){
                bool = true;	
            }
        }
        if(!bool){
            that.subReddits.push(search);
            console.log(that.subReddits);
            that.reddit(search);
        }
    };

    MainCtrl.prototype.popUp = function(pic) {
        if(pic!=="self" && pic !== ""){
            this.contentService.hoverImage = pic;
            this.$uibModal.open({
                animation: true,
                templateUrl: 'templates/popUp.html',
                controller: 'popCtrl as ctrl',
                size: "sm"
            });
       }
    };

    MainCtrl.prototype.reddit = function(search){
        var that = this;

        reddit.hot(search).limit(that.numResults).fetch(function(res) {
                // res contains JSON parsed response from Reddit
                    console.log(res);
                    var temp = res.data.children;
                    that.fullList.push(temp);
                    console.log(temp);
                    that.$scope.$apply()
                    localStorage.subReddits = JSON.stringify(that.subReddits);
                    localStorage.savedReddits = JSON.stringify(that.fullList);
                    console.log(that.fullList);
                    that.search = "";
                });
    };

    MainCtrl.prototype.clearStorage = function() {
        localStorage.clear();
    };

    MainCtrl.prototype.removeSub = function(index) {
        var that = this;
        that.fullList.splice(index,1);
        that.subReddits.splice(index,1);
        localStorage.savedReddits = JSON.stringify(that.fullList);
        localStorage.subReddits = JSON.stringify(that.subReddits);
    };

    MainCtrl.prototype.updateReddits = function(index2) {
        var that = this;
        that.index2 = index2;

        reddit.hot(that.subReddits[that.index2]).limit(5).fetch(function(res){

                var temp = res.data.children;
                for(var i = 0; i < temp.length;i++){
                    that.fullList[that.index2][i].data = temp[i].data;
                }
                that.$scope.$apply()
                localStorage.savedReddits = JSON.stringify(that.fullList);
                    
                if((that.index2+1) < that.subReddits.length){
                    that.index2 = that.index2+1;
                    that.updateReddits(that.index2);
                }
        });
    };

})();