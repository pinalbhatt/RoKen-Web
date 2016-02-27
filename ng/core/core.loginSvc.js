(function () {
	'use strict';

	angular
		.module('RokenApp.Core')
		.factory('loginSvc', loginSvc);

	loginSvc.$inject = ['$q', 'Auth','dataSvc'];

	function loginSvc($q, Auth, dataSvc) {

		Auth.$onAuth(function(authData) {
			/*if (authData === null) {
				console.log('Not logged in yet');
			} else {
				var uData = getUserData(authData);
				if(uData){
					fbRef.child("users").child(uData.id).set(uData);
				}
				console.log('Logged in as', authData.uid);
			}*/

		});


		var service = {
			socialLogin: socialLogin,
			logout: logout
		};

		return service;


		function logout(){
			Auth.unauth();
		}

		function socialLogin(providerName, permissions) {
			var deferred = $q.defer();
			var providerPermissions = {
				scope: permissions
			};
			Auth
				.$authWithOAuthRedirect(providerName, providerPermissions)
				.then(function (authData) {
					deferred.resolve(authData);
				})
				.catch(function (error) {
					if (error.code === 'TRANSPORT_UNAVAILABLE') {
						Auth
							.$authWithOAuthPopup(providerName, providerPermissions)
							.then(function (authData) {
								deferred.resolve(authData);
							})
							.catch(function(error2){
								deferred.reject(error2);
							})
					}
					else {
						deferred.reject(error);
					}
				});
			return deferred.promise;
		}
	}
})();