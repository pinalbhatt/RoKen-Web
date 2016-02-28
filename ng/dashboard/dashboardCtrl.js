(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('dashboardCtrl', dashboardCtrl);

	dashboardCtrl.$inject = ['$location', 'currentAuth','$rootScope'];

	function dashboardCtrl($location, currentAuth, $rootScope) {

		var self = this;

		self.title = "asdfsd";
		if(currentAuth){
			self.currentUser = {
				displayName: currentAuth[currentAuth.provider].displayName,
				avatar: currentAuth[currentAuth.provider].profileImageURL
			};
		}



		init();

		function init() { }


	}
})();