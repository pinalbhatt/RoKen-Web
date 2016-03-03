(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$rootScope', "Auth",  "dataSvc", "$location"];

	function mainCtrl($scope, $rootScope, Auth, dataSvc, $location) {
		$scope.title = 'controller2';



		// any time auth status updates, add the user data to scope
		Auth.$onAuth(function(authData) {
			$scope.authData = authData;
			$rootScope.authData = authData;
			if(authData){
				$rootScope.loginStatus = true;
				$scope.loginStatus = true;
				var profileObj = getProfileFromSocialData(authData);
				dataSvc.profile.set(authData.uid, profileObj)
					.then(function(success){
						$rootScope.user = success;
						$scope.user = success;
						$scope.user.displayTag = "<i class='fa fa-" + success.provider + "'></i> | " + success.displayName + " &nbsp; <span class='caret'></span>";
						$location.path("/dashboard");
					})
					.catch(function(error){
						console.log(error);
						$rootScope.user = null;
						$scope.user = null;
					});
			}
			else {
				$rootScope.loginStatus = false;
				$scope.loginStatus = false;
				$rootScope.user = null;
				$scope.user = null;
			}
		});

		$scope.doLogout = function() {
			logout();
			$location.path("/welcome");

		}
		$scope.doSocialLogin = function(provider, permissions){
			socialLogin(provider, permissions);

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

		function socialLogin(providerName, permissions) {

			var providerPermissions = {
				scope: permissions
			};
			Auth
				.$authWithOAuthRedirect(providerName, providerPermissions)
				.then(function (authData) {

				})
				.catch(function (error) {
					if (error.code === 'TRANSPORT_UNAVAILABLE') {
						Auth
							.$authWithOAuthPopup(providerName, providerPermissions)
							.then(function (authData) {

							})
							.catch(function (error) {
								console.error("Authentication failed with popup:", error);

							});
					}
					else {
						console.error("Authentication failed with redirect:", error);

					}
				});




		}
		function logout() {
			Auth.$unauth();
		}
	}
})();
