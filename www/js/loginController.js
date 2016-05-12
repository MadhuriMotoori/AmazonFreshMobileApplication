routerApp.controller('loginController', [ '$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.not_approved_error = true;
	$scope.password_incorrect_error = true;
	$scope.email_not_found_error = true;
	$scope.unexpected_error = true;
	$scope.login = function(){
		console.log("email:" + $scope.email + "pwd:" + $scope.password);
		if($scope.usertype == "farmer"){
			$http({
				method : "POST",
				url : 'http://localhost:3000/farmerLogIn',
				data: {
					"username": $scope.email,
					"password": $scope.password
				}

			}).success(function(data) {
				// checking the response data for statusCode
				if (data.statusCode == 401) {
					console.log("error:" + data.error);
					if (data.error === "password error") {
						$scope.not_approved_error = true;
						$scope.password_incorrect_error = false;
						$scope.email_not_found_error = true;
						$scope.unexpected_error = true;
					} else if (data.error === "Email doesnot exist") {
						$scope.not_approved_error = true;
						$scope.password_incorrect_error = true;
						$scope.email_not_found_error = false;
						$scope.unexpected_error = true;
					} else if(data.error === "Not approved"){
						$scope.not_approved_error = false;
						$scope.password_incorrect_error = true;
						$scope.email_not_found_error = true;
						$scope.unexpected_error = true;
					}
				} else {
					window.location.assign("http://localhost:3000/farmerIndexHomePage");
				}
			}).error(function(error) {
				$scope.unexpected_error = false;
			});
		} else {
			$http({
				method : "POST",
				url : 'http://localhost:3000/customerLogIn',
				data: {
					"username": $scope.email,
					"password": $scope.password
				}
			}).success(function(data) {
				if (data.statusCode == 401) {
					console.log("error:" + data.error);
					if (data.error === "password error") {
						$scope.not_approved_error = true;
						$scope.password_incorrect_error = false;
						$scope.email_not_found_error = true;
						$scope.unexpected_error = true;
					} else if (data.error === "Email doesnot exist") {
						$scope.not_approved_error = true;
						$scope.password_incorrect_error = true;
						$scope.email_not_found_error = false;
						$scope.unexpected_error = true;
					} else if(data.error === "Not approved"){
						$scope.not_approved_error = false;
						$scope.password_incorrect_error = true;
						$scope.email_not_found_error = true;
						$scope.unexpected_error = true;
					}
				} else {
					window.location.assign("http://localhost:3000/customerIndexHomePage");
				}
			}).error(function(error) {
				$scope.unexpected_error = false;
			});
		}
	};

}]);
