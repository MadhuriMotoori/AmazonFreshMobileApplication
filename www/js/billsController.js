/**
 * Created by raghu on 4/26/2016.
 */
routerApp.controller('billsController', [ '$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {
    $scope.show_rating = false;

    if($localStorage.show_flag){
        $scope.show_rating = true;
    }
    
    $scope.getBills=function(){
        console.log($localStorage.order_id);
        if($localStorage.order_status=="DELIVERED") {
            $scope.myVar = true;
        }
        $http({
            method: "POST",
            url: 'http://localhost:3000/getBills',
            data: {
               data:$localStorage.order_id
            }
        }).success(function (data) {
            console.log(JSON.stringify(data));
            console.log(data.length);
            var temp_billid=-1;
            var temp_product_id=[],temp_quantity=[],temp_price=[],temp_name=[];
            $scope.bills=[{}];


            temp_billid=-1;
            var bills2=[{}];
            var collection = [];
            for(var i=0;i<data.length;i++) {
                //if its a new bill
                if (data[i].bill_id !== temp_billid) {
                    // new and the first
                    if(temp_billid==-1) {
                        temp_billid=data[i].bill_id;

                        collection=[];
                        collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                    }
                    //if its a new but not the first
                        //bills2.push({"bill_id":temp_billid});
                    else {
                        bills2.push({"bill_id": temp_billid, "collection": collection});
                        temp_billid = data[i].bill_id;
                        collection = [];
                        collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                    }
                    //if its an existing one
                }
                else {
                    collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                }
            }
            bills2.push({"bill_id": temp_billid,"collection": collection});
           bills2.splice(0,1);
            console.log(JSON.stringify(bills2));
            $scope.bills2=bills2;
        }).error(function(error) {

        });
    };

    $scope.rateProduct = function (product,rating,comment) {
        $http({
            method: "POST",
            url: 'http://localhost:3000/api/postReview',
            data: {
                "productId":product,
                "productRating": rating,
                "comment":comment
            }

        }).success(function(data){
                if(data.statusCode===200)
                {
                 console.log("api:postReview;controller:billsContoller;status:success" );
                  alert("done");
                }
                else
                {
                console.log("some other error");
                }

        })
        .error(function(err){
            console.log("api:postReview;controller:BillsController;status:error" + err);
        });



    };

}]);