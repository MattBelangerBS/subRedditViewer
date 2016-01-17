app.controller('MainCtrl',MainCtrl);

function MainCtrl($state){

	this.dog;
	this.test1;
	this.search;
	
}



MainCtrl.prototype.click = function(search) {
	var that = this;

	reddit.hot(search).limit(5).fetch(function(res) {

    // res contains JSON parsed response from Reddit
    	console.log(res);
    	that.test1 = res.data.children;
    	console.log(that.test1);

    	});
    		
};








