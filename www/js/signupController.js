routerApp.controller('signupController', [ '$scope', '$http', '$state','$window', '$localStorage',
	function($scope, $http, $state, $window, $localStorage) {
		//$scope.user = signupDetailsService.getDetails();
		$(window).unload(function(){
			localStorage.removeItem(user);
		});
		$scope.initialize = function() {
			$localStorage.user = "";
			console.log("Initial set of user:" +  $localStorage.user);
		};

		$scope.initsecondPage = function(){
			if($localStorage.user.usertype === "customer"){
				$scope.vendorname_value = true;
			}
		};


		$scope.user = $localStorage.user;
		$scope.email_error = true;
		$scope.values_error = true;
		$scope.unexpected_error = true;

		var error = false;
		var regExpNumber=/^[0-9]*$/;
		var regExpCharacter=/^[a-z A-Z]*$/;
		// cover errors for all the fields (to-do)

		// ssn errors
		$scope.ssn_number_error = true;
		$scope.ssn_empty_error = true;
		$scope.ssn_format_error = true;
		$scope.ssn_exists_error =  true;


		//creditcardnumber errors
		$scope.creditcardno_size_error = true;
		$scope.creditcardno_type_error = true;

		//creditcardname errors
		$scope.cardholdername_type_error = true;

		//vendorname errors
		$scope.vendorname_type_error = true;
		$scope.vendorname_empty_error = true;
		$scope.vendorname_exists_error = true;
		$scope.vendorname_length_error = true;



		$scope.continuesignup = function() {
			console.log("initial continuesignup page1 details" + $scope.user);
			$localStorage.user = $scope.user;
			//signupDetailsService.setDetails($scope.user);
			//console.log($scope.user);
			if($scope.user.usertype === "farmer"){
					$http({
						method : "POST",
						url : 'http://localhost:3000/checkFarmerEmail',
						data : {
							"email" : $scope.user.email
						}
					}).success(function(data) {
						// checking the response data for statusCode
						if (data.statusCode == 401) {
							console.log("error:" + data.error);
							if (data.error === "Email not defined") {
								$scope.email_error = true;
								$scope.values_error = false;
								$scope.unexpected_error = true;
							} else if (data.error === "Email exists") {
								$scope.email_error = false;
								$scope.values_error = true;
								$scope.unexpected_error = true;
							}
						} else {
							$state.go('app.signupDetails');
						}
					}).error(function(error) {
						$scope.unexpected_error = false;
					});
			} else {
				$http({
					method : "POST",
					url : 'http://localhost:3000/checkCustomerEmail',
					data : {
						"email" : $scope.user.email
					}
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 401) {
						console.log("error:" + data.error);
						if (data.error === "Email not defined") {
							$scope.email_error = true;
							$scope.values_error = false;
							$scope.unexpected_error = true;
						} else if (data.error === "Email exists") {
							$scope.email_error = false;
							$scope.values_error = true;
							$scope.unexpected_error = true;
						}
					} else {
						$state.go('app.signupDetails');
					}
				}).error(function(error) {
					$scope.unexpected_error = false;
				});
			}
		};

		$scope.continuedetailssignup = function() {
			console.log($scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +$scope.user.customer_id_3);

			locationvalue = "" + $scope.user.streetaddress +  "," + $scope.user.streetaddressOptional +
				"," + $scope.user.city + "," + $scope.user.state + "," + $scope.user.zipcode;

			console.log(locationvalue);
 			if($scope.user.customer_id_1=='' || $scope.user.customer_id_1==undefined || $scope.user.customer_id_2=='' || $scope.user.customer_id_2==undefined || $scope.user.customer_id_3=='' || $scope.user.customer_id_3==undefined)
			{
				$scope.ssn_number_error = true;
				$scope.ssn_empty_error = false;
				$scope.ssn_format_error = true;
				$scope.ssn_exists_error =  true;

				$scope.vendorname_type_error = true;
				$scope.vendorname_empty_error = true;
				$scope.vendorname_exists_error = true;
				$scope.vendorname_length_error = true;
			}  else if (isNaN($scope.user.customer_id_1) || isNaN($scope.user.customer_id_2)
				|| isNaN($scope.user.customer_id_3)){
				$scope.ssn_number_error = false;
				$scope.ssn_empty_error = true;
				$scope.ssn_format_error = true;
				$scope.ssn_exists_error =  true;
				$scope.vendorname_type_error = true;
				$scope.vendorname_empty_error = true;
				$scope.vendorname_exists_error = true;
				$scope.vendorname_length_error = true;
			} else if($scope.user.customer_id_1.length!=3 || $scope.user.customer_id_2.length!=2
				|| $scope.user.customer_id_3.length!=4){

				$scope.ssn_number_error = true;
				$scope.ssn_empty_error = true;
				$scope.ssn_format_error = false;
				$scope.ssn_exists_error =  true;
				$scope.vendorname_type_error = true;
				$scope.vendorname_empty_error = true;
				$scope.vendorname_exists_error = true;
				$scope.vendorname_length_error = true;
			} else {
				var ssn = "" + $scope.user.customer_id_1 + $scope.user.customer_id_2 +
					$scope.user.customer_id_3;
				//signupDetailsService.setDetails($scope.user);
				$localStorage.user = $scope.user;
				console.log($scope.user);
				getCoordinates(locationvalue, function(result, status){
					if(status == "OK"){
						$scope.user.latitude = result[0];
						$scope.user.longitude = result[1];
						if($scope.user.usertype === "farmer"){

							if($scope.user.vendorname == "" || $scope.user.vendorname == undefined){
								$scope.ssn_number_error = true;
								$scope.ssn_empty_error = true;
								$scope.ssn_format_error = true;
								$scope.ssn_exists_error =  true;
								$scope.vendorname_type_error = true;
								$scope.vendorname_empty_error = false;
								$scope.vendorname_exists_error = true;
								$scope.vendorname_length_error = true;
							} else if( !regExpCharacter.test($scope.user.vendorname)) {
								$scope.ssn_number_error = true;
								$scope.ssn_empty_error = true;
								$scope.ssn_format_error = false;
								$scope.ssn_exists_error =  true;
								$scope.vendorname_type_error = false;
								$scope.vendorname_empty_error = true;
								$scope.vendorname_exists_error = true;
								$scope.vendorname_length_error = true;
							} else if($scope.user.vendorname.length > 44){
								$scope.ssn_number_error = true;
								$scope.ssn_empty_error = true;
								$scope.ssn_format_error = false;
								$scope.ssn_exists_error =  true;s
								$scope.vendorname_type_error = true;
								$scope.vendorname_empty_error = true;
								$scope.vendorname_exists_error = true;
								$scope.vendorname_length_error = false;
							}else {
								$http({
									method: "POST",
									url: 'http://localhost:3000/createFarmer',
									data: {
										"farmer": $scope.user,
									}
								}).success(function (data) {
									// checking the response data for statusCode
									if (data.statusCode == 401) {
										console.log("error:" + data.error);
										if (data.error === "ssn not defined") {
											$scope.ssn_number_error = true;
											$scope.ssn_empty_error = false;
											$scope.ssn_format_error = true;
											$scope.ssn_exists_error = true;
											$scope.vendorname_exists_error = true;
										} else if (data.error === "ssn exists") {
											$scope.ssn_number_error = true;
											$scope.ssn_empty_error = true;
											$scope.ssn_format_error = true;
											$scope.ssn_exists_error = false;
											$scope.vendorname_exists_error = true;
										} else if (data.error === "unexpected error") {
											$scope.ssn_number_error = true;
											$scope.ssn_empty_error = true;
											$scope.ssn_format_error = true;
											$scope.ssn_exists_error = true;
											$scope.unexpected_error = true;
											$scope.vendorname_exists_error = true;
										} else if (data.error === "vendor name exists") {
											$scope.ssn_number_error = true;
											$scope.ssn_empty_error = true;
											$scope.ssn_format_error = true;
											$scope.ssn_exists_error = true;
											$scope.unexpected_error = true;
											$scope.vendorname_exists_error = false;
										}
									} else {
										$localStorage.user = $scope.user;
										$state.go('app.login');
									}
								}).error(function (error) {
									$scope.unexpected_error = false;
								});
							}
						} else {

							$http({
								method : "POST",
								url : 'http://localhost:3000/checkCustomerSSN',
								data : {
									"ssn" : ssn,
								}
							}).success(function(data) {
								// checking the response data for statusCode
								if (data.statusCode == 401) {
									console.log("error:" + data.error);
									if (data.error === "ssn not defined") {
										$scope.ssn_number_error = true;
										$scope.ssn_empty_error = false;
										$scope.ssn_format_error = true;
										$scope.ssn_exists_error =  true;
									} else if (data.error === "ssn exists") {
										$scope.ssn_number_error = true;
										$scope.ssn_empty_error = true;
										$scope.ssn_format_error = true;
										$scope.ssn_exists_error =  false;
									}
								} else {

									$localStorage.user = $scope.user;
									$state.go('app.cardDetails');
								}
							}).error(function(error) {
								$scope.unexpected_error = false;
							});
						}

					}
				});

			};
		};


		$scope.signup = function() {
			console.log("values in the end" + $scope.user);
			if($scope.user.creditcardno.length!=16){
				$scope.creditcardno_size_error = false;
				$scope.creditcardno_type_error = true;
			} else if(!regExpNumber.test($scope.user.creditcardno)) {

				$scope.creditcardno_size_error = true;
				$scope.creditcardno_type_error = false;
			}else {
				$http({
					method : "POST",
					url : 'http://localhost:3000/createCustomer',
					data : {
						"user" : $scope.user
					}
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 401) {
						$state.go('app');
						$localStorage.user = "";
					} else {
						$state.go('app.login');
						$localStorage.user = "";
					}
					// Making a get call to the '/redirectToHomepage' API
					// window.location.assign("/homepage");
				}).error(function(error) {
					$scope.unexpected_error = false;
					$localStorage.user = "";
				});
			}
		};
	} ]);