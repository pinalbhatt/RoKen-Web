(function () {
	'use strict';

	angular
		.module('RokenApp.Core')
		.factory('dataSvc', dataSvc);

	dataSvc.$inject = ['$firebaseObject', '$q'];

	function dataSvc($firebaseObject, $q) {


		var service = {
			profile: {
				get: getProfile,
				set: insOrUpdProfile
			}

		};

		return service;

		function getProfile(uid){
			var deferred = $q.defer();
			var ref = fbRef.child("users").child(uid).child("profile");
			$firebaseObject(ref)
				.$loaded()
				.then(function(data) {
					if(data && data.uid && data.uid === uid){
						deferred.resolve(data);
					}
					else {
						deferred.reject({message: "profile not found", error:{}});
					}

				})
				.catch(function(error) {
					deferred.reject({message: "error getting profile", error: error});
				});

			return deferred.promise;
		}
		function insOrUpdProfile(uid, profileObj){
			var deferred = $q.defer();
			getProfile(uid)
				.then(function(data) {
					if(_hasProfileChanged(data, profileObj) === true){
						_insOrUpdProfile(profileObj)
							.then(function(success){
								deferred.resolve(data);
							})
							.catch(function(error){
								deferred.reject(error);
							});
					}
					else {
						deferred.resolve(data);
					}

				})
				.catch(function(error) {
					_insOrUpdProfile(profileObj)
						.then(function(success){
							deferred.resolve(profileObj);
						})
						.catch(function(error){
							deferred.reject(error);
						});

				});
			return deferred.promise;
		}

		function _insOrUpdProfile(profileObj){
			var deferred = $q.defer();
			var ref = fbRef.child("users").child(profileObj.uid).child("profile");
			var obj = $firebaseObject(ref);
			obj.$value = profileObj;

			obj
				.$save()
				.then(function(saveSuccess) {
					deferred.resolve(saveSuccess);
				}, function(error) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function _hasProfileChanged(dbProfile, newProfile){
			if(dbProfile.avatar !== newProfile.avatar || dbProfile.displayName !== newProfile.displayName) {
				return true;
			}
			else {
				return false;
			}

		}
	}
})();