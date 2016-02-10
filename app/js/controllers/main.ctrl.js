app.controller('MainCtrl',MainCtrl);

function MainCtrl($state,$q,$scope,contentService,$uibModal,apiSrv){
	this.$q = $q;
	this.$uibModal = $uibModal;
	this.apiSrv = apiSrv;
	this.test1;
	this.search;
	this.fullList=[];
	this.$scope = $scope;
	this.test2
	this.contentService = contentService;
	this.subReddits = [];
    this.numResults = 5;
    
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
		    	that.test1 = res.data.children;
		    	that.fullList.push(that.test1);
		    	console.log(that.test1);
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


MainCtrl.prototype.debug = function() {
	console.log(this.fullList);
	console.log(this.subReddits);
};

 // ctrl.apiSrv.getRequest(search)
 //    .then(function(response){ 
 //        console.log(res);
	// 	    	that.test1 = res.data.children;
	// 	    	that.fullList.push(that.test1);
	// 	    	console.log(that.test1);
	// 			that.$scope.$apply()
	// 			localStorage.subReddits = JSON.stringify(that.subReddits);
	// 	    	localStorage.savedReddits = JSON.stringify(that.fullList);

 //    });



MainCtrl.prototype.updateReddits = function(index2) {
	var that = this;
	that.index2 = index2;

	reddit.hot(that.subReddits[that.index2]).limit(5).fetch(function(res){

			that.test1 = res.data.children;
			console.log(that.test1);
				
			for(var i = 0; i < that.test1.length;i++){
				that.fullList[that.index2][i].data = that.test1[i].data;
			}

			console.log(that.fullList)
			that.$scope.$apply()
	    	localStorage.savedReddits = JSON.stringify(that.fullList);
    			
			if((that.index2+1) < that.subReddits.length){
				that.index2 = that.index2+1;
				that.updateReddits(that.index2);
			}
	});
};