(function() {
    'use strict';

    angular
        .module('blocks.exception', ['blocks.logger'])
        .factory('exception', exception)
		.provider('exceptionHandler', exceptionHandlerProvider)
		.config(config);

    exception.$inject = ['logger'];

    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

		function catcher(message) {
			return function(reason) {
				logger.error(message, reason);
			};
		}
    }

	/**
	 * Must configure the exception handling
	 * @return {[type]}
	 */
	function exceptionHandlerProvider() {
		/* jshint validthis:true */
		this.config = {
			appErrorPrefix: undefined
		};

		this.configure = function (appErrorPrefix) {
			this.config.appErrorPrefix = appErrorPrefix;
		};

		this.$get = function() {
			return {config: this.config};
		};
	}



	/**
	 * Configure by setting an optional string value for appErrorPrefix.
	 * Accessible via config.appErrorPrefix (via config value).
	 * @param  {[type]} $provide
	 * @return {[type]}
	 * @ngInject
	 */
	config.$inject = ['$provide'];
	function config($provide) {
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}


	/**
	 * Extend the $exceptionHandler service to also display a toast.
	 * @param  {Object} $delegate
	 * @param  {Object} exceptionHandler
	 * @param  {Object} logger
	 * @return {Function} the decorated $exceptionHandler service
	 */
	extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];
	function extendExceptionHandler($delegate, exceptionHandler, logger) {
		return function(exception, cause) {
			var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
			var errorData = {exception: exception, cause: cause};
			exception.message = appErrorPrefix + exception.message;
			$delegate(exception, cause);
			/**
			 * Could add the error to a service's collection,
			 * add errors to $rootScope, log errors to remote web server,
			 * or log locally. Or throw hard. It is entirely up to you.
			 * throw exception;
			 *
			 * @example
			 *     throw { message: 'error message we added' };
			 */
			logger.error(exception.message, errorData);
		};
	}

})();

(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['$q', 'logger'];

    function exception($q, logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(e) {
                var thrownDescription;
                var newMessage;
                if(e.data && e.data.description) {
                    thrownDescription = '\n' + e.data.description;
                    newMessage = message + thrownDescription;
                }
                e.data.description = newMessage;
                logger.error(newMessage);
                return $q.reject(e);
            };
        }
    }
})();

/*
 * Source: https://github.com/johnpapa/generator-hottowel/blob/master/app/templates/src/client/app/blocks/exception/exception.js
 * Date: 28/Jul/2015
 * */