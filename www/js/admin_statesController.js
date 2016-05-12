var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);

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
                    templateUrl: 'ejs/adminHomePage.ejs',
                },
                'footer': {
                    templateUrl: 'ejs/footer.ejs',
                }
            }
        })
        .state('app.statistics', {
            url: 'statistics',
            views: {
                'header': {
                    templateUrl: 'ejs/adminheader.ejs',
                },
                'content@': {
                    templateUrl: 'ejs/adminStatisticsPage.ejs',
                },
                'footer': {
                    templateUrl: 'ejs/footer.ejs',
                }
            }
        })

        .state('app.fetchFarmersCustomers', {
            url: 'fetchFarmersCustomers',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/fetchFarmersCustomersPage.ejs',
                }
            }
        })

        .state('app.rides', {
            url: 'rides',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/ridesGraphs.ejs',
                }
            }
        })

        .state('app.billDetails', {
            url: 'billDetails',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/billDetails.ejs',
                }
            }
        })

        .state('app.adminProfile', {
            url: 'adminProfile',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/adminProfile.ejs',
                }
            }
        })


        .state('app.search', {
            url: 'search',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/searchFarmersCustomersProductsbyId.ejs',
                }
            }
        })

        .state('app.deliveryStatus', {
            url: 'deliveryStatus',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/deliveryStatus.ejs',
                }
            }
        })
        .state('app.reviews',{
            url: 'reviews',
            views: {
                'content@': {
                    templateUrl: 'ejs/admin/reviews.ejs'
                }
            }
        })
});


