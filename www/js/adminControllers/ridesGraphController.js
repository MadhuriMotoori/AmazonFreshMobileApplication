routerApp.controller('customerRidesGraphController', [ '$scope', '$http',
    function($scope, $http) {
        var regExpCharacter=/^[a-z A-Z]*$/;
        $scope.customerselected = false;
        $scope.areaselected = false;
        $scope.driverselected = false;

        $scope.area_type_error = true;
        $scope.area_empty_error = true;
        $scope.area_length_error = true;
        $scope.no_values = true;
        $scope.no_trips = true;

        $scope.toggle = function(){
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: new google.maps.LatLng(42, -121),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            if($scope.userinput == "customer"){
                $scope.customerselected = true;
                $scope.areaselected = false;
                $scope.driverselected = false;
            } else if($scope.userinput == "area"){
                $scope.customerselected = false;
                $scope.areaselected = true;
                $scope.driverselected = false;
            } else if($scope.userinput == "driver"){
                $scope.customerselected = false;
                $scope.areaselected = false;
                $scope.driverselected = true;
            } else if ($scope.userinput == "allRides"){
                $scope.viewAllRidesGraph();
            }
        };
        // ssn errors
        $scope.ssn_number_error = true;
        $scope.ssn_empty_error = true;
        $scope.ssn_format_error = true;
        $scope.ssn_exists_error =  true;

        $scope.viewCustomerRidesGraph = function() {
            $scope.no_values = true;
            console.log($scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +$scope.user.customer_id_3);
            if($scope.user.customer_id_1=='' || $scope.user.customer_id_1==undefined || $scope.user.customer_id_2=='' || $scope.user.customer_id_2==undefined || $scope.user.customer_id_3=='' || $scope.user.customer_id_3==undefined)
            {
                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = false;
                $scope.ssn_format_error = true;
                $scope.ssn_exists_error =  true;
            }  else if (isNaN($scope.user.customer_id_1) || isNaN($scope.user.customer_id_2)
                || isNaN($scope.user.customer_id_3)){
                $scope.ssn_number_error = false;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = true;
                $scope.ssn_exists_error =  true;
            } else if($scope.user.customer_id_1.length!=3 || $scope.user.customer_id_2.length!=2
                || $scope.user.customer_id_3.length!=4){

                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = false;
                $scope.ssn_exists_error =  true;
            } else {
               var ssn = "" + $scope.user.customer_id_1 + $scope.user.customer_id_2 +
                    $scope.user.customer_id_3;

                   $http({
                        method : "POST",
                        url : 'http://localhost:3000/getCustomerRideGraphDetails',
                        data : {
                            "ssn" : ssn,
                        }
                    }).success(function(data) {
                       $scope.ssn_number_error = true;
                       $scope.ssn_empty_error = true;
                       $scope.ssn_format_error = true;
                       $scope.ssn_exists_error =  true;
                        // checking the response data for statusCode
                        if (data.statusCode == 401) {
                            console.log("error:" + data.error);
                        } else if(data.statusCode == 200) {

                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 8,
                                center: new google.maps.LatLng(data.results[0].deslat, data.results[0].deslong),
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            });
                            points = data.results;

                            for(var i=0; i< points.length; i++){
                                console.log("srclat:" + points[i].srclat + "srclong:" + points[i].srclong);
                                geocodeLineFunction(points[i].srclat, points[i].srclong,points[i].deslat, points[i].deslong);
                            }


                            function geocodeLineFunction(pointLat1, pointLon1,pointLat2,pointLon2)
                            {
                                var gc = new google.maps.Geocoder();



                                var source = new google.maps.LatLng(pointLat1, pointLon1);

                                // Draw a circle around the radius
                                var circle = new google.maps.Circle({
                                    center: source,
                                    radius: 3000, //convert miles to meters
                                    strokeColor: "#0000FF",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    fillColor: "#0000FF",
                                    fillOpacity: 0.7
                                });
                                circle.setMap(map);

                                var destination = new google.maps.LatLng(pointLat2, pointLon2);

                                // Draw a circle around the radius
                                var circle = new google.maps.Circle({
                                    center: destination,
                                    radius: 3000, //convert miles to meters
                                    strokeColor: "#FF0000",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    fillColor: "#FF0000",
                                    fillOpacity: 0.7
                                });
                                circle.setMap(map);

                                new google.maps.Polyline({
                                    path: [
                                        new google.maps.LatLng(pointLat1, pointLon1),
                                        new google.maps.LatLng(pointLat2, pointLon2)
                                    ],
                                    strokeColor: '#FF0000',
                                    strokeWeight: 2,
                                    geodesic: true,
                                    map: map
                                });
                            }
                        } else if(data.statusCode == 201){
                            $scope.no_values = false;
                        }
                    }).error(function(error) {
                        $scope.unexpected_error = false;
                    });
                }
            };

        $scope.viewAreaRidesGraph = function() {
            $scope.no_values = true;
            if($scope.area=='' || $scope.area==undefined)
            {
                $scope.area_type_error = true;
                $scope.area_empty_error = false;
                $scope.area_length_error = true;
            }  else if (!regExpCharacter.test($scope.area)){
                $scope.area_type_error = false;
                $scope.area_empty_error = true;
                $scope.area_length_error = true;
            } else if($scope.area.length > 34 ){
                $scope.area_type_error = true;
                $scope.area_empty_error = true;
                $scope.area_length_error = false;
            } else {

                $http({
                    method : "POST",
                    url : 'http://localhost:3000/getAreaRideGraphDetails',
                    data : {
                        "area" : $scope.area,
                    }
                }).success(function(data) {
                    $scope.area_type_error = true;
                    $scope.area_empty_error = true;
                    $scope.area_length_error = true;
                    // checking the response data for statusCode
                    if (data.statusCode == 401) {
                        console.log("error:" + data.error);
                    } else if(data.statusCode == 200) {

                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 8,
                            center: new google.maps.LatLng(data.results[0].deslat, data.results[0].deslong),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });
                        points = data.results;

                        for(var i=0; i< points.length; i++){
                            console.log("srclat:" + points[i].srclat + "srclong:" + points[i].srclong);
                            geocodeLineFunction(points[i].srclat, points[i].srclong,points[i].deslat, points[i].deslong);
                        }


                        function geocodeLineFunction(pointLat1, pointLon1,pointLat2,pointLon2)
                        {
                            var gc = new google.maps.Geocoder();



                            var source = new google.maps.LatLng(pointLat1, pointLon1);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: source,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#0000FF",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#0000FF",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            var destination = new google.maps.LatLng(pointLat2, pointLon2);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: destination,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            new google.maps.Polyline({
                                path: [
                                    new google.maps.LatLng(pointLat1, pointLon1),
                                    new google.maps.LatLng(pointLat2, pointLon2)
                                ],
                                strokeColor: '#FF0000',
                                strokeWeight: 2,
                                geodesic: true,
                                map: map
                            });
                        }
                    } else if(data.statusCode == 201){
                        $scope.no_values = false;
                    }
                }).error(function(error) {
                    $scope.unexpected_error = false;
                });
            }
        };


        $scope.viewDriverRidesGraph = function() {
            $scope.no_values = true;
            console.log($scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +$scope.user.customer_id_3);
            if($scope.user.customer_id_1=='' || $scope.user.customer_id_1==undefined || $scope.user.customer_id_2=='' || $scope.user.customer_id_2==undefined || $scope.user.customer_id_3=='' || $scope.user.customer_id_3==undefined)
            {
                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = false;
                $scope.ssn_format_error = true;
                $scope.ssn_exists_error =  true;
            }  else if (isNaN($scope.user.customer_id_1) || isNaN($scope.user.customer_id_2)
                || isNaN($scope.user.customer_id_3)){
                $scope.ssn_number_error = false;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = true;
                $scope.ssn_exists_error =  true;
            } else if($scope.user.customer_id_1.length!=3 || $scope.user.customer_id_2.length!=2
                || $scope.user.customer_id_3.length!=4){

                $scope.ssn_number_error = true;
                $scope.ssn_empty_error = true;
                $scope.ssn_format_error = false;
                $scope.ssn_exists_error =  true;
            } else {
                var ssn = "" + $scope.user.customer_id_1 + "-" + $scope.user.customer_id_2 + "-" +
                    $scope.user.customer_id_3;

                $http({
                    method : "POST",
                    url : 'http://localhost:3000/getDriverRideGraphDetails',
                    data : {
                        "ssn" : ssn
                    }
                }).success(function(data) {
                    $scope.ssn_number_error = true;
                    $scope.ssn_empty_error = true;
                    $scope.ssn_format_error = true;
                    $scope.ssn_exists_error =  true;
                    // checking the response data for statusCode
                    if (data.statusCode == 401) {
                        console.log("error:" + data.error);
                    } else if(data.statusCode == 200) {

                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 8,
                            center: new google.maps.LatLng(data.results[0].deslat, data.results[0].deslong),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });
                        points = data.results;

                        for(var i=0; i< points.length; i++){
                            console.log("srclat:" + points[i].srclat + "srclong:" + points[i].srclong);
                            geocodeLineFunction(points[i].srclat, points[i].srclong,points[i].deslat, points[i].deslong);
                        }


                        function geocodeLineFunction(pointLat1, pointLon1,pointLat2,pointLon2)
                        {
                            var gc = new google.maps.Geocoder();

                            var source = new google.maps.LatLng(pointLat1, pointLon1);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: source,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#0000FF",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#0000FF",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            var destination = new google.maps.LatLng(pointLat2, pointLon2);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: destination,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            new google.maps.Polyline({
                                path: [
                                    new google.maps.LatLng(pointLat1, pointLon1),
                                    new google.maps.LatLng(pointLat2, pointLon2)
                                ],
                                strokeColor: '#FF0000',
                                strokeWeight: 2,
                                geodesic: true,
                                map: map
                            });
                        }
                    } else if(data.statusCode == 201){
                        $scope.no_values = false;
                    }
                }).error(function(error) {
                    $scope.unexpected_error = false;
                });
            }
        };


        $scope.viewAllRidesGraph = function() {
            $scope.no_trips = true;
                $http({
                    method : "GET",
                    url : 'http://localhost:3000/getAllRideGraphDetails'
                }).success(function(data) {
                    if (data.statusCode == 401) {
                        console.log("error:" + data.error);
                    } else if(data.statusCode == 200) {

                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 8,
                            center: new google.maps.LatLng(data.results[0].deslat, data.results[0].deslong),
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });
                        points = data.results;

                        for(var i=0; i< points.length; i++){
                            console.log("srclat:" + points[i].srclat + "srclong:" + points[i].srclong);
                            geocodeLineFunction(points[i].srclat, points[i].srclong,points[i].deslat, points[i].deslong);
                        }


                        function geocodeLineFunction(pointLat1, pointLon1,pointLat2,pointLon2)
                        {
                            var gc = new google.maps.Geocoder();



                            var source = new google.maps.LatLng(pointLat1, pointLon1);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: source,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#0000FF",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#0000FF",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            var destination = new google.maps.LatLng(pointLat2, pointLon2);

                            // Draw a circle around the radius
                            var circle = new google.maps.Circle({
                                center: destination,
                                radius: 3000, //convert miles to meters
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.7
                            });
                            circle.setMap(map);

                            new google.maps.Polyline({
                                path: [
                                    new google.maps.LatLng(pointLat1, pointLon1),
                                    new google.maps.LatLng(pointLat2, pointLon2)
                                ],
                                strokeColor: '#FF0000',
                                strokeWeight: 2,
                                geodesic: true,
                                map: map
                            });
                        }
                    } else if (data.statusCode == 201){
                        $scope.no_trips = false;

                    }
                }).error(function(error) {
                    $scope.unexpected_error = false;
                });

        };
    }]);