routerApp.controller('orderController', ['$scope','$state','$http','$localStorage',function($scope,$state, $http, $localStorage) {
    $scope.cartItems=function () {
        $scope.productName=[];
        $scope.quantity=[];
        $scope.total=[];
        console.log($localStorage.cartObjects);
        for(var i=0;i<$localStorage.cartObjects.length;i++){
            $scope.productName.push($localStorage.cartObjects[i].productName);
            $scope.quantity.push($localStorage.cartObjects[i].quantity);
            $scope.total.push($localStorage.cartObjects[i].productPrice);
        }
        console.log($scope.quantity);
    $scope.total_price=$localStorage.total_price;
    }
    $scope.customerDetails=function() {
        console.log("in customer Details");
        $http({
            method: "get",
            url: 'http://localhost:3000/customerDetails',
            data: ''
        })
            .success(function (data) {
                console.log("success in order controller");

                $scope.address1=data[0].address1;
                $scope.address2=data[0].address2;
                $scope.city=data[0].city;
                $scope.state=data[0].state;
                $scope.card_num=data[0].card_num;
            }).error(function (error) {
            console.log("unexpected error");
            $scope.unexpected_error = false;
        });
    };
   
    $scope.placeOrder=function() {
        console.log("In ordercontroller" + $localStorage.ar_productId);
        $localStorage.ar_farmerId;
        $localStorage.ar_price;
        $localStorage.ar_quantity;
        $scope.addedToCartItems = $localStorage.cartObjects;
        for (var i = 0; i < $scope.addedToCartItems.length; i++) {

            console.log($scope.addedToCartItems[i].quantity);

        }
        console.log($localStorage.ar_farmerId+'  '+$localStorage.ar_price);
        $http({
            method: "POST",
            url: 'http://localhost:3000/placeOrder',
            data: {
                "ar_farmerId": $localStorage.ar_farmerId,
                "ar_price": $localStorage.ar_price,
                "ar_quantity": $localStorage.ar_quantity,
                "ar_productId": $localStorage.ar_productId,
                "total_price":$localStorage.total_price
            }
        }).success(function (data) {
            console.log("from order controller"+ data);
            $localStorage.cartObjects='';
            $localStorage.order_id=data;
            $state.transitionTo("app.bills", {}, {
                reload: true,
                inherit: false,
                notify: true
            });
        }).error(function(error) {
            console.log("unexpected error");
            $scope.unexpected_error = false;
        });
    };
}]);