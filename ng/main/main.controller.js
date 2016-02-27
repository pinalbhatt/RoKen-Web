(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$rootScope', "Auth"];

	function mainCtrl($scope, $rootScope, Auth) {
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

		init();

		function init() { }
	}
})();
