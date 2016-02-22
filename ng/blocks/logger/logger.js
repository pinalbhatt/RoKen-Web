(function () {
	'use strict';

	angular
		.module('blocks.logger', [])
		.factory('logger', logger);

	logger.$inject = ['$log'];

	function logger($log) {
		var loggerEnabled =  true;


		var service = {
			error: error,
			info: info,
			warn: warning,
			debug: debug,
			log: log,
			enable: enableLogs,
			disable: disableLogs
		};

		return service;
		/////////////////////

		function enableLogs(){
			loggerEnabled = true;
		}
		function disableLogs() {
			loggerEnabled = false;
		}
		function error(message, data) {
			if (loggerEnabled) {
				$log.error(message, data);
			}
		}

		function info(message, data) {
			if (loggerEnabled) {
				$log.info(message, data);
			}
		}

		function debug(message, data) {
			if (loggerEnabled) {
				$log.debug(message, data);
			}
		}

		function warning(message, data) {
			if (loggerEnabled) {
				$log.warn(message, data);
			}
		}

		function log(message, data) {
			if (loggerEnabled) {
				$log.log(message, data);
			}
		}

	}
}());

/*
 * Source: https://raw.githubusercontent.com/johnpapa/ng-demos/master/modular/src/client/app/blocks/logger/logger.js
 * Date: 28/Jul/2015
 * */