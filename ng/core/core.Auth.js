(function () {
	'use strict';

	angular
		.module('RokenApp.Core')
		.factory('Auth', Auth);

	Auth.$inject = ['$firebaseAuth'];

	function Auth($firebaseAuth) {
		var ref = new Firebase(fbRoot);
		return $firebaseAuth(ref);
	}
})();
