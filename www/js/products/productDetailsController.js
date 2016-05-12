
routerApp.controller('productDetailsController', ['$scope','$http','$state','$localStorage',function($scope,$http,$state, $localStorage) {

	$scope.addedToCartItems;
	var id=$state.params.productid;


	$http({
		url:'http://localhost:3000/api/getProductInfo',
		method:'POST',
		data:{
			"id":id
		}
	}).success(function(data){
			if(data.statusCode===200)
			{
				
				$scope.product=data.result[0];
				console.log($scope.product);
			}
			else
			{
				console.log("some other error");
			}

		})
		.error(function(err){
			console.log("api:/api/getProductInfo;controller:ProductDetailsController;status:error" + err);
		});

	if($localStorage.cartObjects){
		$scope.addedToCartItems=$localStorage.cartObjects;
	}else {
		$scope.addedToCartItems = [];
	}

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
		//console.log("hi"+$localStorage.ar_farmerId);
		//console.log("ji"+$localStorage.ar_price);
	}


/*		$scope.ratings = [{
			current: 3,
			max: 5
		}, {
			current: 4,
			max: 5
		}];*/


	$scope.currentPage = 0;
	$scope.pageSize = 2;
	$scope.data = [];
	$scope.numberOfPages=function(){
		return Math.ceil($scope.data.length/$scope.pageSize);
	}
	for (var i=0; i<45; i++) {
		$scope.data.push("x "+i);
	}

}]);