routerApp.controller('AllCustomersController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.customer_requests = false;
        $scope.showCustomerFlag = false;
        $scope.customers= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.showCustomers = function(){
            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getAllCustomers',
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

        $scope.toggleButton = function(){
            if($scope.showCustomerFlag) {
                $scope.showCustomerFlag = false;
            } else {
                $scope.showCustomerFlag = true;
            }
        };


        $scope.currentValue = function(customer){
            $scope.currentCustomer = customer;
        };
    }]);
routerApp.controller('AllFarmersController', [ '$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
        $scope.database_error = false;
        $scope.farmer_requests = false;
        $scope.showFarmerFlag = false;
        $scope.farmers= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.currentValue = function(farmer){
            $scope.currentFarmer = farmer;
        };


        $scope.showFarmers = function(){

            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getAllFarmers',
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


        $scope.toggleButton = function(){
            if($scope.showFarmerFlag) {
                $scope.showFarmerFlag = false;
            } else {
                $scope.showFarmerFlag = true;
            }
        };
    }]);

routerApp.controller('AllProductsController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.product_requests = false;
        $scope.showProductFlag = false;

        $scope.products= [];
        $scope.page = 0;
        $scope.productsEmpty="";

        $scope.currentValue = function(product){
            $scope.currentProduct = product;
        };

        $scope.showProducts = function(){
            $scope.fetching = true;
            $http({
                method : "POST",
                url : 'http://localhost:3000/getAllProducts',
                data: {
                    page: $scope.page
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


        $scope.toggleButton = function(){
            if($scope.showProductFlag) {
                $scope.showProductFlag = false;
            } else {
                $scope.showProductFlag = true;
            }
        };
    }]);