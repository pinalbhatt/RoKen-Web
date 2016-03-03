(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope','$location', 'currentAuth'];

	function loginCtrl($scope, $location, currentAuth) {

		var self = this;
		self.title = 'Login';

		var ref = new Firebase("https://roken.firebaseio.com");

		init();

		function init() { }

		self.doSocialLogin = function(provider, permissions){
			$scope.$parent.doSocialLogin(provider, permissions);
		};


	}
})();