routerApp.controller('billDetailsNController', [ '$scope', '$http',
    function($scope, $http) {
        var regExpNumber=/^[0-9]*$/;
        $scope.customerselected = false;
        $scope.billIdselected = false;

        $scope.customerResults = true;
        $scope.billId_type_error = true;
        $scope.billId_empty_error = true;
        $scope.billId_length_error = true;
        $scope.unexpected_error = false;
        $scope.toggle = function(){
            if($scope.userinput == "customer"){
                $scope.customerselected = true;
                $scope.billIdselected = false;
            } else if($scope.userinput == "billId"){
                $scope.billid_no_error = false;
                $scope.customerselected = false;
                $scope.billIdselected = true;
            }
        }
        // ssn errors
        $scope.ssn_number_error = true;
        $scope.ssn_empty_error = true;
        $scope.ssn_format_error = true;
        $scope.ssn_exists_error =  true;
        
        $scope.no_customer_bills = false;
        $scope.billid_no_error = false;

        $scope.viewCustomerBillDetails = function() {
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
                    url : 'http://localhost:3000/getCustomerBillDetails',
                    data : {
                        "ssn" : ssn,
                    }
                }).success(function(data) {

                    // checking the response data for statusCode
                    if (data.statusCode == 401) {
                        $scope.no_customer_bills = false;
                        $scope.ssn_number_error = true;
                        $scope.ssn_empty_error = true;
                        $scope.ssn_format_error = true;
                        $scope.ssn_exists_error =  true;
                        $scope.unexpected_error = true;
                        console.log("error:" + data.error);
                    } else if(data.statusCode == 200) {
                        $scope.no_customer_bills = false;
                        $scope.ssn_number_error = true;
                        $scope.ssn_empty_error = true;
                        $scope.ssn_format_error = true;
                        $scope.ssn_exists_error =  true;
                        $scope.customerResults = false;
                        $scope.bills = data.results;
                        $scope.billid_no_error = true;
                    } else if(data.statusCode == 201){
                        $scope.ssn_number_error = true;
                        $scope.ssn_empty_error = true;
                        $scope.ssn_format_error = true;
                        $scope.ssn_exists_error =  true;
                        $scope.no_customer_bills = true;
                        $scope.customerResults = true;
                    }
                }).error(function(error) {
                    $scope.unexpected_error = true;
                });
            }
        };
        $scope.no_id_bills = false;
        
        $scope.viewBillDetailsById  = function(id){
            $scope.random_check = 1;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getBillDetailsById',
                data : {
                    "billId" : id,

                }
            }).success(function(data) {

                // checking the response data for statusCode
                if (data.statusCode == 401) {
                   $scope.unexpected_error = true;
                } else if(data.statusCode == 200) {
                     $scope.customerfirstname = data.results[0].customerfirstname;
                     $scope.customerlastname = data.results[0].customerlastname;
                     $scope.customeraddress = "" + data.results[0].customeraddress1 + "," +
                     data.results[0].customeraddress2 + "," +  data.results[0].customercity +
                     "," + data.results[0].customerzipcode;
                     $scope.farmerfirstname = data.results[0].farmerfirstname;
                     $scope.farmerlastname = data.results[0].farmerlastname;
                     $scope.farmeraddress = "" + data.results[0].farmeraddress1  + "," +
                     data.results[0].farmeraddress2 + "," +  data.results[0].farmercity +
                     "," +  data.results[0].farmerzipcode;


                    $scope.billdate = data.results[0].bill_date;
                    $scope.billIdValue = data.results[0].bill_id;
                    $scope.products = [];

                    for(var i =0 ; i < data.results.length; i++){
                        var productInfo = {"productname" : "",
                        "price" : "", "quantity": "", "productId": "" };

                        productInfo.productname = data.results[i].name;
                        productInfo.price = data.results[i].price;
                        productInfo.quantity = data.results[i].quantity;
                        productInfo.productId = data.results[i].product_id;

                        $scope.products.push(productInfo);
                    }
                    $scope.billid_no_error = true;

                    $('#BillIdRequests').modal('show');


                } else if(data.statusCode == 201){
                    $scope.no_id_bills = true;
                }
            }).error(function(error) {
                $scope.unexpected_error = true;
            });
        };

        $scope.viewBillDetails = function(){
            $scope.customerResults = true;
            $scope.viewBillDetailsById($scope.billId);
        }
        
    }]);