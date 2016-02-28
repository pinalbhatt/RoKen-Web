(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$rootScope', "Auth", "loginSvc", "dataSvc"];

	function mainCtrl($scope, $rootScope, Auth, loginSvc, dataSvc) {
		$scope.title = 'controller2';

		$scope.auth = Auth;

		// any time auth status updates, add the user data to scope
		$scope.auth.$onAuth(function(authData) {
			$scope.authData = authData;
			$rootScope.authData = authData;
			if(authData){
				$rootScope.loginStatus = true;
				$scope.loginStatus = true;
				var profileObj = getProfileFromSocialData(authData);
				dataSvc.profile.set(authData.uid, profileObj)
					.then(function(success){
						console.log(success);
					})
					.catch(function(error){
						console.log(error);
					});
			}
			else {
				$rootScope.loginStatus = false;
				$scope.loginStatus = false;
			}
		});

		$scope.doLogout = function() {
			loginSvc.logout();

		}
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

		function getProfileFromSocialData(authData){
			var profileObj =  null;
			if(authData && authData.uid){
				profileObj = {
					uid: authData.uid,
					provider: authData.provider,

				};
				var providerData = authData[authData.provider];
				profileObj.displayName =  providerData.displayName;
				profileObj.email = providerData.email || "";
				profileObj.avatar = providerData.profileImageURL || "";

			}
			return profileObj;
		}
	}
})();
