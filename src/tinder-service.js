(function () {
	angular.module("retoheusser.ng-tinder", [])
	.constant("$tinderProxyUrl", "https://tinderroulette.appspot.com/proxy/")
	.provider("$tinder", function() {
		var Provider = this,
		profileId = null;
		accessToken = null;

		Provider.setAccessToken = function (token) {
			accessToken = token;
		};

		Provider.setProfileId = function (id) {
			profileId = id;
		}

		Provider.$get = function ($http, $tinderProxyUrl) {
			var Service = {
				getProfile: getProfile,
				updateProfile: updateProfile,
				getRecommendations: getRecommendations
			};

			function createRequest(endpoint, data) {
				request = {
					method: data ? "POST" : "GET",
					url: $tinderProxyUrl + endpoint,
					headers: {
						"Authorization": accessToken
					}
				};

				if (data) {
					request.data = data;
				}
				return request;
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

			return Service;
		};
	});
})();