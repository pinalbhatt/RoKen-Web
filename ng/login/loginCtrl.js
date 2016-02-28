(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location', 'currentAuth', 'loginSvc'];

	function loginCtrl($location, currentAuth, loginSvc) {

		var self = this;
		self.title = 'Login';

		var ref = new Firebase("https://roken.firebaseio.com");

		init();

		function init() { }

		self.doSocialLogin = function(provider, permissions){
			//self.$parent.doSocialLogin(provider, permissions)
			loginSvc
				.socialLogin(provider, permissions)
				.then(function(authData){
					console.log(authData);
				})
				.catch(function(error) {
					console.log(error);
				});
		};


	}
})();