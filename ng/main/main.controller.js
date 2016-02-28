(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$rootScope', "Auth", "loginSvc"];

	function mainCtrl($scope, $rootScope, Auth, loginSvc) {
		$scope.title = 'controller2';

		$scope.auth = Auth;

		// any time auth status updates, add the user data to scope
		$scope.auth.$onAuth(function(authData) {
			$scope.authData = authData;
			$rootScope.authData = authData;
			if(authData){
				$rootScope.loginStatus = true;
				$scope.loginStatus = true;
			}
			else {
				$rootScope.loginStatus = false;
				$scope.loginStatus = false;
			}
		});

		$scope.doSocialLogin = function(provider, permissions){
			loginSvc
				.socialLogin(provider, permissions)
				.then(function(authData){
					console.log(authData);
				})
				.catch(function(error) {
					console.log(error);
				});
		};
		init();

		function init() { }
	}
})();
