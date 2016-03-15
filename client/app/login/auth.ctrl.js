(function(){
	'use-strict';

	angular
		.module('subReddit')
		.controller('AuthCtrl',AuthCtrl);

	AuthCtrl.$inject = ['$http','$state'];

	function AuthCtrl($http,$state){
		var authVm = this;
        authVm.state = $state;
        console.log('hi');
		//buttons
		authVm.register_btn = 'Sign Up';
		authVm.auth_btn = "Log In";

		//Functions
		authVm.register = register;
		authVm.authenticate = authenticate;
        authVm.goToReg = goToReg;

		function register(){
			//check passwords
			if(authVm.password == authVm.repassword){
				var user = {
					email:authVm.email,
					password:authVm.password,
                    reddits:JSON.stringify(['aww'])
				}
				user = JSON.stringify(user);
				$http.post('/api/auth/register',user)
				.then(function(res){
					console.log(res);
					authVm.register_btn = res.data.msg;
				})
			}
			else{
				authVm.register_btn = "Passwords Don't Match";
			}
		}

        function goToReg() {
             authVm.state.go('register');
        }
		function authenticate(){
           
			var user = {
				email:authVm.email,
				password:authVm.password
			}

			user = JSON.stringify(user);
			$http.post('/api/auth/authenticate',user)
			.then(function(res){
                if(res.status==200){
                    console.log(res);
                    if(localStorage.subReddits === res.data.user.reddits){
                        console.log('we gottta match!');
                    }else{
                        localStorage.subReddits = res.data.user.reddits;
                    }
                    localStorage.loginEmail = authVm.email;
                    authVm.auth_btn = res.data.msg;
                    authVm.state.go('home');
                }
				
                
			})
		}
	}
})();