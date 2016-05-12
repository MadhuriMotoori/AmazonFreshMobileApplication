/**
 * Created by raghu on 4/28/2016.
 */
routerApp.controller('deleteCustomerController', ['$scope','$http','$localStorage','$state',function($scope, $http, $localStorage,$state) {
    console.log("inside delete");
    $scope.deleteCustomer = function() {
        $http({
            url: 'http://localhost:3000/deleteCustomer',
            method: 'get',
            data: {}
        }).success(function (data) {
                if (data.statusCode == 200) {
                    window.location.assign("/");
                }
                else {
                    console.log("error");
                }
            })
            .error(function (err) {

            });
    }
}]);