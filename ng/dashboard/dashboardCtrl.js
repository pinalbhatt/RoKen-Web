(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.controller('dashboardCtrl', dashboardCtrl);

	dashboardCtrl.$inject = ['$location'];

	function dashboardCtrl($location) {

		var self = this;
		self.title = 'dashboard';

		var ref = new Firebase("https://roken.firebaseio.com");

		init();

		function init() { }

		self.googleClick = function(){
			ref.authWithOAuthPopup("google", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			}, {
				remember: "sessionOnly",
				scope: "profile"
			});
		}

		self.twitterClick = function(){
			ref.authWithOAuthPopup("twitter", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			}, {
				remember: "sessionOnly"
			});
		}

		self.facebookClick = function(){
			ref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			}, {
				remember: "sessionOnly",
				scope: "email,public_profile"
			});
		}

		self.githubClick = function(){

			ref.authWithOAuthPopup("github", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}

			}, {
				remember: "sessionOnly",
				scope: ""
			});
		}
	}
})();