var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url:'/',
            views: {
                'header': {
                    templateUrl : 'ejs/header.ejs',
                },
                'content': {
                    templateUrl : 'ejs/homepage.ejs',
                },
                'footer': {
                    templateUrl : 'ejs/footer.ejs',
                }
            }

        })

        .state('app.login', {
            url:'login',
            views: {
                'header@': {
                    templateUrl : 'ejs/header2.ejs',
                },
                'content@': {
                    templateUrl : 'ejs/login.ejs',
                    controller  : 'loginController'
                }
            }
        })

        .state('app.signup', {
            url:'signup',
            views: {
                'content@': {
                    templateUrl : 'ejs/customerSignup.ejs',
                    controller  : 'signupController'
                }
            }
        })

        .state('app.signupDetails', {
            url:'signupDetails',
            views: {
                'content@': {
                    templateUrl : 'ejs/customerSignupPage2.ejs',
                    controller  : 'signupController'
                }
            }
        })

        .state('app.cardDetails', {
            url:'cardDetails',
            views: {
                'content@': {
                    templateUrl : 'ejs/cardDetails.ejs',
                    controller  : 'signupController'
                }
            }
        })


});


