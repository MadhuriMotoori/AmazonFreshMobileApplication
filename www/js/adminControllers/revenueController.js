/**
 * Created by raghu on 4/22/2016.
 */
routerApp.controller('revenueController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.statistics=function() {
            console.log("revenue controller");
            $http({
                method: "get",
                url: 'http://localhost:3000/getRevenuePerDay',
                data: ''
            }).success(function (data) {
                $scope.date=[];
                $scope.price=[];
                console.log("success");
                console.log(JSON.stringify(data));
                console.log(JSON.stringify(data[0].order_placed_date));
                console.log(JSON.stringify(data[0].total_price));
                for(var i=0;i<data.length;i++){
                    $scope.price.push(data[i].total_price);
                    $scope.date.push(data[i].order_placed_date);
                }

                Highcharts.chart('container', {

                    xAxis: {
                        categories:$scope.date
                    },

                    series: [{
                        data: $scope.price
                    }]
                });
            }).error(function (error) {
                console.log("unexpected error");
                $scope.unexpected_error = false;
            });
        }
        $scope.categories=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        $scope.from1date='2016-12-31';
        $scope.to1date='2016-12-31';
    }]);