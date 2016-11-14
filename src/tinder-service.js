(function () {	
	angular.module("retoheusser.ng-tinder", [])
	.provider("$tinder", TinderProvider);

	function TinderProvider() {
		// the comment makes a diff
		var Provider = this,
			_proxy;

		/**
		* Pass an url which acts as a proxy for the tinder API. The path should be the same as for the tinder API,
		* the access token is sent with the Authorization header. Your proxy url must support the methods GET, POST
		* and OPTIONS and include Access-Control-Allow-Origin: * in the response header.
		*/
		Provider.useProxy = function (url) {
			_proxy = url;
		};

		Provider.$get = ["$http", TinderService];

		function TinderService ($http) {
			var _accessToken;

			var Service = {
				login: login,

				getProfile: getProfile,
				getRecommendations: getRecommendations,

				updateProfile: updateProfile,
				updatePosition: updatePosition,
				like: like,
				superLike: superLike,
				pass: pass,
			};

			function createRequest(endpoint, data) {
				request = {
					method: data ? "POST" : "GET",
					url: _proxy + endpoint,
					headers: {
						"Authorization": _accessToken
					}
				};

				if (data) {
					request.data = data;
				}
				return request;
			}

			function login(token) {
				_accessToken = token;
			}

			function responseData(response) {
				return response.data;
			}

			function getProfile(id) {
				return $http(createRequest(id ? "user/" + id : "profile")).then(responseData);
			}

			function updateProfile(properties) {
				return $http(createRequest("profile", properties)).then(responseData);
			}

			function getRecommendations() {
				return $http(createRequest("user/recs")).then(responseData);
			}

			function updatePosition(latitude, longitude) {
				return $http(createRequest("user/ping", {
					lat: latitude,
					lon: longitude
				})).then(responseData);
			}

			function pass(id) {
				return $http(createRequest("pass/" + id));
			}

			function like(id) {
				return $http(createRequest("like/" + id));
			}

			function superLike(id) {
				return $http(createRequest("like/" + id + "/super", {}));
			}

			return Service;
		}
	}
})();
