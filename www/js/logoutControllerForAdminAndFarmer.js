/**
 * Created by Vaibhav on 5/3/2016.
 */

routerApp.controller('logoutControllerForAdminAndFarmer', ['$scope','$state','$http',function($scope,$state, $http) {



$scope.logout=function(){

    $http({
        method: "GET",
        url: "http://localhost:3000/logout"
    }).success(function (data) {
        window.location.assign("/");

    }).error(function (error){
        console.log(error);
    });


}

}]);