routerApp.controller('navBarController', [ '$scope', '$localStorage', '$window','$http',
    function($scope, $localStorage, $window, $http) {

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

        $(window).unload(function(){
            localStorage.removeItem(tab);
        });

        $scope.initializeBar = function(){
            $localStorage.tab = 1;
            console.log($localStorage.tab);
            $scope.select(1);
        };

        $scope.tab = $localStorage.tab;

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            $localStorage.tab = $scope.tab;
            console.log("tab" + $scope.tab);
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };


}]);
