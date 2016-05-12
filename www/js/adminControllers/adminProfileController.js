routerApp.controller('adminProfileController', [ '$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.unexpected_error = false;
    $scope.no_admin_error = false;


    $http({
        method : "GET",
        url : 'http://localhost:3000/getAdminProfileDetails'
    }).success(function(data) {
        // checking the response data for statusCode
        if (data.statusCode == 401) {
            $scope.unexpected_error = true;
            $scope.no_admin_error = false;
        } else if(data.statusCode == 200) {
            $scope.adminValues = data.results[0];
            $scope.unexpected_error = false;
            $scope.no_admin_error = false;
        } else if(data.statusCode == 201){
            $scope.unexpected_error = false;
            $scope.no_admin_error = true;
        }
    }).error(function(error) {
        $scope.unexpected_error = false;
    });
}]);
