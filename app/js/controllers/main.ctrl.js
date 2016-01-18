app.controller('MainCtrl',MainCtrl);

function MainCtrl($state,$q,$scope,contentService,$uibModal){
	this.$q = $q;
	this.$uibModal = $uibModal;
	this.test1;
	this.search;
	this.fullList=[];
	this.$scope = $scope;
	this.test2
	this.contentService = contentService;



	if(localStorage.savedReddits){
		this.fullList = JSON.parse(localStorage.savedReddits);	
	};
		
		

	// this.setWatches();
}

MainCtrl.prototype.click = function(search) {
	var that = this;

	reddit.hot(search).limit(5).fetch(function(res) {
    // res contains JSON parsed response from Reddit
    	console.log(res);
    	that.test1 = res.data.children;
    	that.fullList.push(that.test1);
    	console.log(that.test1);
		that.$scope.$apply()
    	localStorage.savedReddits = JSON.stringify(that.fullList);

    	});
    		
};


// MainCtrl.prototype.setWatches = function(){
// 	var that = this;
	
// 	that.$scope.$watch(function(){
//     	return that.test1;
// 	}, function (newValue) {
// 	    that.fullList.push(that.test1);
// 	    console.log('test');
// 	});

// }

MainCtrl.prototype.popUp = function(pic) {

	this.contentService.hoverImage = pic;

	this.$uibModal.open({
      animation: true,
      templateUrl: 'templates/popUp.html',
      controller: 'popCtrl as ctrl',
      size: "sm"
      
    });
};

MainCtrl.prototype.clearStorage = function() {
	localStorage.clear();
};