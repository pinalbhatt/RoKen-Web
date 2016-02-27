(function () {
	'use strict';

	angular
		.module('RokenApp.Core')
		.factory('dataSvc', dataSvc);

	dataSvc.$inject = ['$firebaseObject'];

	function dataSvc($firebaseObject) {
		var service = {
			profile: {
				get: getProfile,
				set: insOrUpdProfile
			}

		};

		return service;

		function getProfile(uid){

		}
		function insOrUpdProfile(uid, profileObj){

		}
	}
})();