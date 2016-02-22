(function () {
	"use strict";

	angular
		.module('blocks.APIService', [])
		.factory('APIService', APIService);

	APIService.$inject = ['$http', '$q'];

	function APIService($http, $q) {

		var service = {
			get: get,
			post: post
		};

		return service;

		function _addProfileParameterToUrl(url) {
			var returnUrl = url;
			if (url.indexOf("?") > -1) {
				returnUrl = url.replace("?", "?P&");
			}
			else {
				returnUrl = returnUrl + "?P";
			}
			return returnUrl;
		}

		function _makeHttpCall(options) {
			/*options = {
			 method: "",
			 data: "",
			 url: "",
			 needsProfile: false,
			 enableCaching: false
			 }*/
			var deferred = $q.defer();
			var apiUrl = window.wwLocale.baseUrl + "/api/" + options.url;
			if (options.needsProfile === true) {
				apiUrl = _addProfileParameterToUrl(apiUrl);
			}
			var req = {
				method: options.method,
				url: apiUrl,
				headers: {
					"Content-Type": "application/json"
				}
			};
			if (options.data !== undefined) {
				req.data = options.data;
			}
			if (options.enableCaching === true) {
				req.headers["Cache-Control"] = "public";
			}
			if (options.enableCaching === false) {
				req.headers["Cache-Control"] = "private";
			}

			$http(req)
				.then(function (response) {
						deferred.resolve(response);
					},
					function (error) {
						deferred.reject(error);
					});
			return deferred.promise;
		}

		function get(partialUrl, needsProfile, enableCaching) {
			if (needsProfile === undefined) {
				needsProfile = false;
			}
			if (enableCaching === undefined) {
				enableCaching = false;
			}
			var options = {
				method: "GET",
				url: partialUrl,
				needsProfile: needsProfile,
				enableCaching: enableCaching
			};
			var deferred = $q.defer();
			_makeHttpCall(options)
				.then(function (response) {
						if (response.status === 200) {
							deferred.resolve(response);
						}
						else {
							deferred.reject(response);
						}
					},
					function (error) {
						deferred.reject(error);
					});
			return deferred.promise;
		}

		function post(partialUrl, data, needsProfile, enableCaching) {
			if (needsProfile === undefined) {
				needsProfile = false;
			}
			if (enableCaching === undefined) {
				enableCaching = false;
			}
			var options = {
				method: "POST",
				url: partialUrl,
				needsProfile: needsProfile,
				enableCaching: enableCaching,
				data: data
			};
			var deferred = $q.defer();
			_makeHttpCall(options)
				.then(function (response) {
						if (response.status === 200) {
							deferred.resolve(response);
						}
						else {
							deferred.reject(response);
						}
					},
					function (error) {
						deferred.reject(error);
					});
			return deferred.promise;
		}
	}

})();
