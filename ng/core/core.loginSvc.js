(function () {
	'use strict';

	angular
		.module('RokenApp.Core')
		.factory('loginSvc', loginSvc);

	loginSvc.$inject = ['$q', 'Auth', 'dataSvc'];

	function loginSvc($q, Auth, dataSvc) {

		/*Auth.$onAuth(function(authData) {
		 console.log(authData);
		 if (authData === null) {
		 console.log('Not logged in yet');
		 } else {
		 var uData = getUserData(authData);
		 if(uData){
		 fbRef.child("users").child(uData.id).set(uData);
		 }
		 console.log('Logged in as', authData.uid);
		 }

		 });*/


		var service = {
			socialLogin: socialLogin,
			logout: logout
		};

		return service;


		function logout() {
			Auth.$unauth();
		}

		function socialLogin(providerName, permissions) {
			var deferred = $q.defer();
			var providerPermissions = {
				scope: permissions
			};
			Auth
				.$authWithOAuthRedirect(providerName, providerPermissions)
				.then(function (authData) {
					deferred.resolve(true);
				})
				.catch(function (error) {
					if (error.code === 'TRANSPORT_UNAVAILABLE') {
						Auth
							.$authWithOAuthPopup(providerName, providerPermissions)
							.then(function (authData) {
								deferred.resolve(true);
							})
							.catch(function (error) {
								console.error("Authentication failed with popup:", error);
								deferred.reject(false);
							});
					}
					else {
						console.error("Authentication failed with redirect:", error);
						deferred.reject(false);
					}
				});



			return deferred.promise;
		}
	}
})();