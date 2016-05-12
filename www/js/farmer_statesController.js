var routerApp = angular.module('routerApp', ['ngFileUpload','ui.router', 'ngStorage']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'ejs/adminheader.ejs',
                },
                'content': {
                    templateUrl: 'ejs/farmers/farmerHomePage.ejs',
                },
                'footer': {
                    templateUrl: 'ejs/footer.ejs',
                }
            }
        })

        .state('app.farmeraddProduct', {
            url: 'farmerAddProduct',
            views: {
                'content@': {
                    templateUrl: 'ejs/farmers/farmerAddProduct.ejs',
                    controller : 'farmerProfileController'
                },
            }
        })

        .state('app.farmerDeleteAccount', {
            url: 'deleteFarmer',
            views: {
                'content@': {
                    templateUrl: 'ejs/farmers/deleteFarmer.ejs',
                    controller : 'farmerProfileController'
                },
            }
        })

        .state('app.farmerDeleteProduct', {
            url: 'deleteProduct/:farmerId',
            views: {
                'content@': {
                    templateUrl: 'ejs/farmers/farmerDeleteProduct.ejs',
                    controller : 'farmerProductsController'
                },
            }
        })

        .state('app.farmerUpdateProduct', {
            url: 'updateProduct/:farmerId',
            views: {
                'content@': {
                    templateUrl: 'ejs/farmers/farmerUpdateProduct.ejs',
                    controller : 'farmerProductsController'
                },
            }
        })
});


