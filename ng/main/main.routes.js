(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.config(routeConfigs);


	routeConfigs.$inject = ['$routeProvider'];


	function routeConfigs($routeProvider) {

		$routeProvider
			.when("/", {
				redirectTo:'/dasboard'
			})
			.when("/dasboard", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "mainCtrl",
				controllerAs: "self",
				title: 'Dashboard'
			})
			.when("/login", {
				templateUrl: "/ng/login/login.html",
				controller: "loginCtrl",
				controllerAs: "self",
				title: 'Login'
			})
			.when("/play/kenken", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "mainCtrl",
				controllerAs: "self",
				title: 'Dashboard'
			})
			.when("/play/roken", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "mainCtrl",
				controllerAs: "self",
				title: 'Dashboard'
			})
			.when("/rules", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "mainCtrl",
				controllerAs: "self",
				title: 'Dashboard'
			})
			.when("/about", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "mainCtrl",
				controllerAs: "self",
				title: 'Dashboard'
			})

			.otherwise({
				redirectTo:'/'
			});

	}
})();
