routerApp.controller('approveCustomerRequestsController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.customer_requests = false;
        $scope.showCustomerFlag = true;

        $scope.customers= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.currentValue = function(customer){
            $scope.currentCustomer = customer;
        };


        $scope.showCustomerRequests = function(){
            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getCustomerRequests',
                data: {
                    page: $scope.page
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.customer_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.customer_requests = true;
                } else {
                    $scope.fetching = false;
                    $scope.page++;
                    if (data.customers.length>0) {
                        $scope.customers = $scope.customers.concat(data.customers);
                    }
                    else {
                        $scope.disabled = true;
                        $scope.productsEmpty = "disabled";
                    }
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.approveCustomer = function(customer_id){
            $http({
                method : "POST",
                url : 'http://localhost:3000/approveCustomer',
                data : {
                    "customer_id" : customer_id
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                } else if (data.statusCode == 200) {
                    $window.location.reload();
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.toggleButton = function(){
            if($scope.showCustomerFlag) {
                $scope.showCustomerFlag = false;
            } else {
                $scope.showCustomerFlag = true;
            }
        };
    }]);

routerApp.controller('approveFarmerRequestsController', [ '$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
        $scope.database_error = false;
        $scope.farmer_requests = false;
        $scope.showFarmerFlag = true;

        $scope.farmers= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.currentValue = function(farmer){
            $scope.currentFarmer = farmer;
        };


        $scope.showFarmerRequests = function(){
            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getFarmerRequests',
                data: {
                    page: $scope.page
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.farmer_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.farmer_requests = true;
                } else {
                    $scope.fetching = false;
                    $scope.page++;
                    if (data.farmers.length>0) {
                        $scope.farmers = $scope.farmers.concat(data.farmers);
                    }
                    else {
                        $scope.disabled = true;
                        $scope.productsEmpty = "disabled";
                    }
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.approveFarmer = function(farmer_id){
            $http({
                method : "POST",
                url : '/approveFarmer',
                data : {
                    "farmer_id" : farmer_id,
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                } else if (data.statusCode == 200) {
                    $window.location.reload();
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.toggleButton = function(){
            if($scope.showFarmerFlag) {
                $scope.showFarmerFlag = false;
            } else {
                $scope.showFarmerFlag = true;
            }
        };
    }]);

routerApp.controller('approveProductRequestsController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.product_requests = false;
        $scope.showProductFlag = true;

        $scope.products= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.currentValue = function(product){
            $scope.currentProduct = product;
        };


        $scope.showProductRequests = function(){
            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getProductRequests',
                data : {
                    "page" : $scope.page
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.product_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.product_requests = true;
                } else {
                    $scope.fetching = false;
                    $scope.page++;
                    if (data.products.length>0) {
                        $scope.products = $scope.products.concat(data.products);
                    }
                    else {
                        $scope.disabled = true;
                        $scope.productsEmpty = "disabled";
                    }
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.approveProduct = function(product_id){
            $http({
                method : "POST",
                url : 'http://localhost:3000/approveProduct',
                data : {
                    "product_id" : product_id
                }
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                } else if (data.statusCode == 200) {
                    $window.location.reload();
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.toggleButton = function(){
            if($scope.showProductFlag) {
                $scope.showProductFlag = false;
            } else {
                $scope.showProductFlag = true;
            }
        };
    }]);