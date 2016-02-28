(function () {
	"use strict";

	var config = {
		appErrorPrefix: '[RokenApp Error] ',
		appTitle: 'RokenApp'
	};

	angular
		.module('RokenApp.Core', [
			'ngRoute', 'ngAnimate', 'ngCookies', 'ngSanitize', //Angular modules
			'blocks.exception', 'blocks.logger', 'blocks.APIService', // Our reusable Angular modules
			'firebase', 'LocalStorageModule' // 3rd Party modules
		])

		.value('config', config)
		.config(configure);

	configure.$inject = ['$logProvider', 'exceptionHandlerProvider', 'localStorageServiceProvider'];

	function configure($logProvider, exceptionHandlerProvider, localStorageServiceProvider) {
		if ($logProvider.debugEnabled) {
			$logProvider.debugEnabled(false);
		}
		else {
			$logProvider.debugEnabled(true);
		}

		exceptionHandlerProvider.configure(config.appErrorPrefix);

		localStorageServiceProvider
			.setPrefix("RokenApp");

	}

})();
