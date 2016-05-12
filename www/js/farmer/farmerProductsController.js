/**
 * Created by Akash on 4/19/2016.
 */
routerApp.controller('farmerProductsController', ['$scope','$state','$http','$localStorage',function($scope,$state, $http, $localStorage) {

    $scope.addedToCartItems;

    var farmerId=$state.params.farmerId;
    var key = $state.params.key;

    $scope.searchPage = 0;
    if(key!=undefined){


        $scope.searchResults = [];

        $scope.searchMore = function(){
            $http({
                url: 'http://localhost:3000/api/searchProducts',
                method: 'POST',
                data: {
                    "search": key,
                    "searchPage": $scope.searchPage
                }
            }).success(function (data) {
                    if (data.statusCode === 200) {
                        $scope.searchPage++;
                        if (data.result.length > 0) {
                            $scope.searchResults = $scope.searchResults.concat(data.result);
                            console.log("api:/api/searchProducts;controller:farmerProductsController;status:success");
                        }
                        else {
                            $scope.disabled = true;
                            $scope.message = data.defaultMsg;
                        }

                    }
                    else {
                        console.log("some other error");
                    }

                })
                .error(function (err) {
                    console.log("api:searchProducts;controller:farmerProductsController;status:error" + err);
                });
        };
    }


    if($localStorage.cartObjects){

        $scope.addedToCartItems=$localStorage.cartObjects;
    }else {
        $scope.addedToCartItems = [];
    }

/*    $http({
            url:'/api/getFarmerProducts',
            method:'POST',
            data:{
                    "farmerId":farmerId
                }
            }).success(function(data){
                if(data.statusCode===200)
                {
                    console.log("api:getFarmerProducts;controller:farmerProductsController;status:success" );
                    $scope.images=data.result;
                }
                else
                {
                console.log("some other error");
                }

             })
            .error(function(err){
                console.log("api:getFarmerProducts;controller:farmerProductsController;status:error" + err);
             });*/

    $scope.page = 0;
    $scope.productsEmpty="";
    $scope.images = [];
    $scope.fetching = false;
    $scope.disabled = false;

    $scope.loadMore = function(){

        $scope.fetching = true;

        $http({
            url:'http://localhost:3000/api/getFarmerProducts',
            method:'POST',
            data:{
                "farmerId":farmerId,
                "page":$scope.page
            }
        }).success(function(data){
                $scope.fetching = false;
                $scope.page++;


                if(data.statusCode===200)
                {
                    if (data.result.length>0) {
                        $scope.images = $scope.images.concat(data.result);
                        console.log("api:/api/getFarmerProducts;controller:customerHomeController;status:success");
                        //$scope.customerDetails=data.result;
                        console.log()
                    }
                    else {
                        $scope.disabled = true;
                       // console.log("hello test");
                        $scope.productsEmpty = "disabled";
                    }
                    //console.log("api:getFarmerProducts;controller:farmerProductsController;status:success" );
                    //$scope.images=data.result;
                }
                else
                {
                    console.log("some other error");
                }

            })
            .error(function(err){
                console.log("api:getFarmerProducts;controller:farmerProductsController;status:error" + err);
            });
    };

    $scope.addToCart=function(product) {

        var productObject;

        if(product!=undefined && product!='') {
            var count = 0;
            $scope.totalAmount = 0;
            $scope.totalQuantity = 0;


            for (var i = 0; i < $scope.addedToCartItems.length; i++) {
                if ($scope.addedToCartItems[i].productId == product.productId) {
                    //Each time add to cart is clicked one quantity is added
                    var quantity = $scope.addedToCartItems[i].quantity+1;
                    $scope.addedToCartItems[i].quantity=quantity;
                    var amount = quantity * (product.productPrice);
                    $scope.addedToCartItems[i].productPrice = amount.toFixed(2);
                    
                    count++;
                }
            }

            if (count == 0) {
                alert(product.productName);
                productObject = {productName: product.productName, quantity: 1, productPrice: product.productPrice,productId:product.productId,farmerId:product.farmer_gen_id,
                    priceOfOne:product.productPrice};
                $scope.addedToCartItems.push(productObject);

            }

            $localStorage.cartObjects=$scope.addedToCartItems;

            /*for (var i = 0; i < $scope.addedToCartItems.length; i++) {
             $scope.totalAmount += $scope.addedToCartItems[i].amount;
             $scope.totalQuantity += $scope.addedToCartItems[i].quantity;
             }*/
        }

    }

    $scope.removeFromCart=function(product) {

        if(product!=undefined && product!='') {

           var indexToRemove;
            for (var i = 0; i < $scope.addedToCartItems.length; i++) {
                if ($scope.addedToCartItems[i].productId == product.productId) {
                    //Each time add to cart is clicked one quantity is added
                    indexToRemove=i;
                    break;
                }
            }
            //Removing the specified object from the array
            $scope.addedToCartItems.splice(indexToRemove,1);

            $localStorage.cartObjects=$scope.addedToCartItems;
        }

    }

    $scope.changeQuantity=function(product,incOrDesc){
        for (var i = 0; i < $scope.addedToCartItems.length; i++) {
            if ($scope.addedToCartItems[i].productId == product.productId) {
                if (incOrDesc == 1) {
                    var quantity = $scope.addedToCartItems[i].quantity + 1;
                    $scope.addedToCartItems[i].quantity = quantity;

                    var amount = quantity * ($scope.addedToCartItems[i].priceOfOne);
                    $scope.addedToCartItems[i].productPrice = amount.toFixed(2);
                    $localStorage.cartObjects=$scope.addedToCartItems;
                    break;
                }else{
                    var quantity = $scope.addedToCartItems[i].quantity -1;
                    if(quantity==0){
                        $scope.removeFromCart(product);
                    }else {
                        $scope.addedToCartItems[i].quantity = quantity;

                        var amount = quantity * ($scope.addedToCartItems[i].priceOfOne);
                        $scope.addedToCartItems[i].productPrice = amount.toFixed(2);

                        $localStorage.cartObjects=$scope.addedToCartItems;
                    }
                    break;
                }
            }
        }

    }

    $scope.checkout=function(){
        $state.transitionTo("app.orderPage", {}, {
            reload: true,
            inherit: false,
            notify: true
        });
        //console.log($scope.addedToCartItems);
        var items=$scope.addedToCartItems;
        var ar_productId='';
        var ar_quantity='';
        var ar_price='';
        var ar_farmerId='';
        var total_price='';
        $localStorage.ar_productId='';
        $localStorage.ar_price='';
        $localStorage.ar_farmerId='';
        $localStorage.ar_quantity='';
        for(var i=0;i<items.length;i++){
            if(ar_productId=='') {
                ar_productId = ar_productId + items[i].productId;

                var temp=items[i].productPrice/items[i].quantity;
                ar_price=ar_price+temp;
                ar_farmerId=ar_farmerId+items[i].farmerId;
                ar_quantity=ar_quantity+items[i].quantity;
            }
            else{
                ar_productId = ar_productId +','+ items[i].productId;
                var temp=items[i].productPrice/items[i].quantity;
                ar_price=ar_price+','+temp;
                ar_farmerId=ar_farmerId+','+items[i].farmerId;
                ar_quantity=ar_quantity+','+items[i].quantity;
            }
        }
        for(var j=0;j<items.length;j++) {
            total_price=+total_price+ +items[j].productPrice;
        }
        console.log("total_price"+total_price);
        console.log('productarray'+ar_productId+'farmer'+ar_farmerId+'price'+ar_price,'quantity'+ar_quantity);
        $localStorage.ar_productId=ar_productId;
        $localStorage.ar_farmerId=ar_farmerId;
        $localStorage.ar_price=ar_price;
        $localStorage.ar_quantity=ar_quantity;
        $localStorage.total_price=total_price;
        //test
    console.log($localStorage.ar_farmerId);
    console.log($localStorage.ar_price);
    }

    $scope.deleteProduct=function(product){
        $http({
            url:'http://localhost:3000/deleteProductFarmerPage',
            method:'POST',
            data:{
                "productId":product.productId
            }
        }).success(function(data){
                if(data.statusCode===200)
                {
                    $state.transitionTo("app.farmerDeleteProduct", {farmerId:farmerId}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
                else
                {
                    console.log("some other error");
                }

            })
            .error(function(err){
                console.log(err);
            });

    }

    $scope.fetchProductDetails=function(product){

        $scope.updateProductFlag=false;

        $http({
            url:'http://localhost:3000/api/getProductInfo',
            method:'POST',
            data:{
                "id":product.productId
            }
        }).success(function(data){
                if(data.statusCode===200)
                {
                    console.log("api:/api/getProductInfo;controller:ProductDetailsController;status:success");
                    $scope.productValues=data.result[0];
                    $scope.updateProductFlag=true;
                }
                else
                {
                    console.log("some other error");
                }

            })
            .error(function(err){
                console.log("api:/api/getProductInfo;controller:ProductDetailsController;status:error" + err);
            });

    }

    $scope.farmerUpdateProduct=function() {
        $http({
            method: "POST",
            url: "http://localhost:3000/updateProductFarmerPage",
            data: {
                productId: $scope.productValues.productId,
                price: $scope.productValues.productPrice,
                name:$scope.productValues.productName,
                description:$scope.productValues.productDescription,
                image:$scope.productValues.image.$ngfDataUrl
            }
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    $state.transitionTo("app.farmerUpdateProduct", {farmerId:farmerId}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

    $scope.logout=function(){
        $localStorage.cartObjects='';

        $http({
            method: "GET",
            url: "http://localhost:3000/logout"
        }).success(function (data) {
            window.location.assign("/");

        }).error(function (error){
            console.log(error);
        });


    }

    $scope.showRealAmazonPrice=function(price){
        if(price){
            return true;
        }else{
            return false;
        }
    }

}]);
