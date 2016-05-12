var routerApp = angular.module('routerApp', ['ui.bootstrap','ui.router', 'ngStorage']);
routerApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        
        .state('app.productDetails', {
            url:'productDetails/:foo?productid',
            views: {
                'content@': {
                    templateUrl : 'ejs/products/productDetails.ejs',
                    controller  : 'productDetailsController'
                }
            }
        })
        .state('app.search', {
            url: 'searchResults/:query?key',
            views: {
                'header@': {
                    templateUrl: 'ejs/header3.ejs'
                },
                'content@': {
                    templateUrl: 'ejs/searchResults.ejs',
                    controller  : 'farmerProductsController'
                }
            }
        })
        .state('app.viewOrders',{
            url:'viewOrders',
            views:{
                'header@': {
                    templateUrl: 'ejs/header3.ejs'
                },
                'content@':{
                    templateUrl: 'ejs/viewOrdersPage.ejs',
                    controller:'viewOrdersController'
                },
                'footer@': {

                }
            }
        })

        .state('app.deleteCustomer',{
            url:'deleteCustomer',
            views:{
                'header@': {
                    templateUrl: 'ejs/header3.ejs'
                },
                'content@':{
                    templateUrl: 'ejs/deleteCustomer.ejs',
                    
                },
                'footer@': {

                }
            }
        })

        .state('app.admin', {
            url: 'admin',
            views: {
                'header@': {
                    templateUrl: 'ejs/header2.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/adminLoginPage.ejs',
                    controller: 'adminLoginController'
                }
            }
        })

        .state('app.farmerProducts', {
            url:'farmerProducts/:foo?farmerId',
            views: {
                'content@': {
                    templateUrl : 'ejs/farmersPage.ejs',
                    controller  : 'farmerProductsController'

                }
            }
        })

        .state('app.adminhome', {
            url: 'adminhome',
            views: {
                'header@': {
                    templateUrl: 'ejs/header2.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/adminHomePage.ejs',
                },
            }
        })

        .state('app.farmerhome', {
            url: 'farmerhome',
            views: {
                'header@': {
                    templateUrl: 'ejs/header2.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/farmerHomePage.ejs',
                },
            }
        })

        .state('app.orderPage', {
            url: 'orderPage',
            views: {
                'header@': {
                    templateUrl: 'ejs/header3.ejs',
                },
                'content@': {
                      templateUrl: 'ejs/orderPage.ejs',
                    controller: 'orderController'
                },
            }
        })
        
        .state('app.bills',{
            url: 'bills',
            views:{
                'header@': {
                    templateUrl: 'ejs/header3.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/billPlacedPage.ejs',
                    controller: 'billsController'
                },
                'footer@': {

                }
            }
        })

        .state('app.billsPage', {
            url: 'billsPage',
            views: {
                'header@': {
                    templateUrl: 'ejs/header3.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/billsPage.ejs',
                    controller: 'billsController'
                },
            }
        })

        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'ejs/header3.ejs'
                },
                'content': {
                    templateUrl: 'ejs/customerHomePage.ejs',
                    controller  : 'customerHomeController'
                },
                'footer': {
                    templateUrl: '/ejs/footer.ejs',
                }
            }
        })

});

routerApp.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});

