routerApp.controller('adminSearchController', [ '$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.customerselected = false;
    $scope.farmerselected = false;
    $scope.productselected = false;


    $scope.toggle = function(){
        if($scope.userinput == "customer"){
            $scope.customerselected = true;
            $scope.farmerselected = false;
            $scope.productselected = false;
        } else if ($scope.userinput == "farmer"){
            $scope.customerselected = false;
            $scope.farmerselected = true;
            $scope.productselected = false;
        } else if($scope.userinput == "product"){
            $scope.customerselected = false;
            $scope.farmerselected = false;
            $scope.productselected = true;
        }
    };



    // ssn errors
    $scope.ssn_number_error = true;
    $scope.ssn_empty_error = true;
    $scope.ssn_format_error = true;
    $scope.ssn_exists_error =  true;

    $scope.searchCustomer = function() {
        console.log($scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +$scope.user.customer_id_3);
        if($scope.user.customer_id_1=='' || $scope.user.customer_id_1==undefined || $scope.user.customer_id_2=='' || $scope.user.customer_id_2==undefined || $scope.user.customer_id_3=='' || $scope.user.customer_id_3==undefined)
        {
            $scope.ssn_number_error = true;
            $scope.ssn_empty_error = false;
            $scope.ssn_format_error = true;
            $scope.ssn_exists_error =  true;
        }  else if (isNaN($scope.user.customer_id_1) || isNaN($scope.user.customer_id_2)
            || isNaN($scope.user.customer_id_3)){
            $scope.ssn_number_error = false;
            $scope.ssn_empty_error = true;
            $scope.ssn_format_error = true;
            $scope.ssn_exists_error =  true;
        } else if($scope.user.customer_id_1.length!=3 || $scope.user.customer_id_2.length!=2
            || $scope.user.customer_id_3.length!=4){

            $scope.ssn_number_error = true;
            $scope.ssn_empty_error = true;
            $scope.ssn_format_error = false;
            $scope.ssn_exists_error =  true;
        } else {
            var ssn = "" + $scope.user.customer_id_1 + $scope.user.customer_id_2 +
                $scope.user.customer_id_3;

            $http({
                method: "POST",
                url: 'http://localhost:3000/getCustomerById',
                data: {
                    "ssn": ssn,
                }
            }).success(function (data) {

                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = true;
                // checking the response data for statusCode
                if (data.statusCode == 401) {
                    $scope.ssn_exists_error = true;
                    $scope.unexpected_error = true;
                    console.log("error:" + data.error);
                } else if (data.statusCode == 200) {
                    $scope.ssn_exists_error = true;
                    $scope.currentCustomer = data.results[0];
                    $('#customerModal').modal('show');
                } else if (data.statusCode == 201) {
                    $scope.ssn_exists_error = false;
                }
            }).error(function (error) {
                $scope.unexpected_error = true;
            });

        }
    };


    $scope.searchFarmer = function() {
        console.log($scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +$scope.user.customer_id_3);
        if($scope.user.customer_id_1=='' || $scope.user.customer_id_1==undefined || $scope.user.customer_id_2=='' || $scope.user.customer_id_2==undefined || $scope.user.customer_id_3=='' || $scope.user.customer_id_3==undefined)
        {
            $scope.ssn_number_error = true;
            $scope.ssn_empty_error = false;
            $scope.ssn_format_error = true;
            $scope.ssn_exists_error =  true;
        }  else if (isNaN($scope.user.customer_id_1) || isNaN($scope.user.customer_id_2)
            || isNaN($scope.user.customer_id_3)){
            $scope.ssn_number_error = false;
            $scope.ssn_empty_error = true;
            $scope.ssn_format_error = true;
            $scope.ssn_exists_error =  true;
        } else if($scope.user.customer_id_1.length!=3 || $scope.user.customer_id_2.length!=2
            || $scope.user.customer_id_3.length!=4){

            $scope.ssn_number_error = true;
            $scope.ssn_empty_error = true;
            $scope.ssn_format_error = false;
            $scope.ssn_exists_error =  true;
        } else {
            var ssn = "" + $scope.user.customer_id_1 + $scope.user.customer_id_2 +
                $scope.user.customer_id_3;

            $http({
                method : "POST",
                url : 'http://localhost:3000/getFarmerById',
                data : {
                    "ssn" : ssn,
                }
            }).success(function(data) {

                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = true;
                // checking the response data for statusCode
                if (data.statusCode == 401) {
                    $scope.ssn_exists_error =  true;
                    $scope.unexpected_error = true;
                    console.log("error:" + data.error);
                } else if(data.statusCode == 200) {
                    $scope.ssn_exists_error =  true;
                    $scope.currentFarmer = data.results[0];
                    $('#farmerModal').modal('show');
                } else if(data.statusCode == 201){
                    $scope.ssn_exists_error =  false;
                }
            }).error(function(error) {
                $scope.unexpected_error = true;
            });

        }
    };


    $scope.no_id_product = false;
    $scope.productId_type_error = true;
    $scope.productId_empty_error = true;
    $scope.productId_length_error = true;

    $scope.searchProduct  = function(){
        $scope.no_id_product = false;
        if($scope.product_id=='' || $scope.product_id==undefined )
        {
            $scope.productId_type_error = true;
            $scope.productId_empty_error = false;
            $scope.productId_length_error = true;
        }  else if (isNaN($scope.product_id) ){
            $scope.productId_type_error = false;
            $scope.productId_empty_error = true;
            $scope.productId_length_error = true;
        } else if($scope.product_id.length > 11 ){
            $scope.productId_type_error = true;
            $scope.productId_empty_error = true;
            $scope.productId_length_error = false;
        } else {

            $http({
                method: "POST",
                url: 'http://localhost:3000/getProductById',
                data: {
                    "productId": $scope.product_id
                }
            }).success(function (data) {
                console.log("sattus code" +  data.statusCode);
                $scope.productId_type_error = true;
                $scope.productId_empty_error = true;
                $scope.productId_length_error = true;
                // checking the response data for statusCode
                if (data.statusCode == 401) {
                    $scope.no_id_product = false;
                    $scope.unexpected_error = true;
                } else if (data.statusCode == 200) {
                    $scope.no_id_product = false;
                    $scope.unexpected_error = false;
                    $scope.currentProduct = data.product[0];
                    $('#productModal').modal('show');
                    $scope.currentProduct = data.results[0];
                } else if (data.statusCode == 201) {
                    $scope.no_id_product = true;
                    $scope.unexpected_error = false;


                }
            }).error(function (error) {
                $scope.unexpected_error = true;
            });
        }
    };
}]);
