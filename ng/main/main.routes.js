(function () {
	'use strict';

	angular
		.module('RokenApp.Main')
		.config(routeConfigs)
		.run(routeChangeError);


	routeChangeError.$inject = ['$rootScope', '$location'];

	function routeChangeError($rootScope,$location){
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
			// We can catch the error thrown when the $requireAuth promise is rejected
			// and redirect the user back to the home page
			if (error === "AUTH_REQUIRED") {
				$location.path("/login");
			}
		});
	}

	routeConfigs.$inject = ['$routeProvider'];


	function routeConfigs($routeProvider) {

		$routeProvider
			.when("/", {
				redirectTo:'/welcome'
			})
			.when("/welcome", {
				templateUrl: "/ng/welcome/welcome.html",
				controller: "welcomeCtrl",
				controllerAs: "self",
				title: 'welcome',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}]
				}
			})
			.when("/login", {
				templateUrl: "/ng/login/login.html",
				controller: "loginCtrl",
				controllerAs: "self",
				title: 'Login',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}]
				}
			})
			.when("/kenken", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "dashboardCtrl",
				controllerAs: "self",
				title: 'Dashboard',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}]
				}
			})
			.when("/roken", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "dashboardCtrl",
				controllerAs: "self",
				title: 'Dashboard',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$requireAuth();
					}]
				}
			})
			.when("/dashboard", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "dashboardCtrl",
				controllerAs: "self",
				title: 'Dashboard',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$requireAuth();
					}]
				}
			})
			.when("/rules", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "dashboardCtrl",
				controllerAs: "self",
				title: 'Dashboard',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}]
				}
			})
			.when("/about", {
				templateUrl: "/ng/dashboard/dashboard.html",
				controller: "dashboardCtrl",
				controllerAs: "self",
				title: 'Dashboard',
				resolve: {
					"currentAuth": ["Auth", function(Auth) {
						return Auth.$waitForAuth();
					}]
				}
			})

			.otherwise({
				redirectTo:'/'
			});

	}
})();
