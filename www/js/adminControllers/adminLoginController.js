routerApp.controller('adminLoginController', [ '$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.password_incorrect_error = true;
    $scope.email_not_found_error = true;
    $scope.unexpected_error = true;
    $scope.login = function(){
        console.log("email:" + $scope.email + "pwd:" + $scope.password);
            $http({
                method : "POST",
                url : 'http://localhost:3000/adminLogIn',
                data : {
                    "email" : $scope.email,
                    "password" : $scope.password
                }
            }).success(function(data) {
                console.log("here am ");
                // checking the response data for statusCode
                if (data.statusCode == 401) {
                    console.log("error:" + data.error);
                    if (data.error === "password error") {
                        $scope.not_approved_error = true;
                        $scope.password_incorrect_error = false;
                        $scope.email_not_found_error = true;
                        $scope.unexpected_error = true;
                    } else if (data.error === "Email doesnot exist") {
                        $scope.not_approved_error = true;
                        $scope.password_incorrect_error = true;
                        $scope.email_not_found_error = false;
                        $scope.unexpected_error = true;
                    }
                } else {
                    console.log("entered");
                    window.location.assign('/adminIndexHomePage');
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
    };

}]);
