routerApp.controller('farmerProfileController', ['$scope','$http','$localStorage', function($scope, $http, $localStorage) {
    $http({
        method: "GET",
        url: "http://localhost:3000/getFarmerDetails"
    }).success(function (data) {
        if (data.statusCode ==  401) {
            console.log('error');
        } else {
            $scope.farmer = data.farmer;
            $localStorage.farmer_gen_id=data.farmer.gen_id;
        }
    }).error(function (error){
        console.log(error);
    });

    $scope.updateFarmerProfile=function() {
        $scope.success=false;
        $http({
            method: "POST",
            url: "/updateFarmerProfile",
            data: {
                firstname: $scope.farmer.firstname,
                lastname: $scope.farmer.lastname,
                address1:$scope.farmer.address1,
                address2:$scope.farmer.address2,
                city:$scope.farmer.city,
                state:$scope.farmer.state,
                zipcode:$scope.farmer.zipcode,
                phone_number:$scope.farmer.phone_number
            }
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    $scope.success=true;
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

    $scope.farmerAddProduct=function() {
        console.log($scope.file.$ngfDataUrl);
        $scope.success=false;

       $http({
            method: "POST",
            url: "http://localhost:3000/farmerAddProduct",
            data: {
                gen_id: $localStorage.farmer_gen_id,
                price: $scope.productPrice,
                name:$scope.productName,
                description:$scope.productDescription,
                image:$scope.file.$ngfDataUrl
            }
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    $scope.success=true;
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

    $scope.deleteFarmer=function() {

        $http({
            method: "GET",
            url: "http://localhost:3000/deleteAccountFarmerPage"
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    window.location.assign("/");
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

/*tesing*/
    $scope.addMedia = function(){


        $http({
            method:'POST',
            url:'http://localhost:3000/api/addVideo',
            data:{
                media: document.getElementById("hiddenvideo").value,

            }
        }).success(function(data){

            if(data.statusCode===200)
            {
                console.log("finally success");

            }
            else
            {

            }

        }).error(function(error){
            console.log('err');
        });
    };

    function readURLVideo(input) {

        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#profilevideo')
                    .attr('src', e.target.result)
                    .width(270)
                    .height(200);

                document.getElementById('hiddenvideo').value = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $scope.getVideo = function(){

        $http({
            method:'POST',
            url:'http://localhost:3000/api/getFarmerVideo',
            data:{
                farmeremail:''

            }
        }).success(function(data){

            if(data.statusCode===200)
            {
                $scope.myVideo = data.result[0].video;
                document.getElementById("myvideo").src = data.result[0].video;
            }
            else
            {
                console.log("some other video");
            }

        }).error(function(error){
            console.log('err');
        });

    };

}]);
