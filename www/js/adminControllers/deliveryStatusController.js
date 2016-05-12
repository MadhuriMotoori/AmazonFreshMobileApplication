routerApp.controller('deliveryStatusController', [ '$scope', '$http',
    function($scope, $http) {
        var regExpNumber=/^[0-9]*$/;

        $scope.no_id_product = false;
        $scope.productId_type_error = true;
        $scope.productId_empty_error = true;
        $scope.productId_length_error = true;
        $scope.order_delivered = false;

        $scope.deliverOrder  = function(){
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
                    url: 'http://localhost:3000/updateDeliveryStatus',
                    data: {
                        "orderId": $scope.product_id
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
                        $scope.order_delivered = true;
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