
'use strict';

/* App Module */

var powerApp = angular.module('powerApp', [
    'ngRoute',
    'powerControllers'
]);

powerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/clientAccount', {
            templateUrl: 'partials/clientAccounts.html',
            controller: 'ClientAccountsCtrl'
        }).
        when('/clientAccount/:meterId', {
            templateUrl: 'partials/currentbillsummary.html',
            controller: 'AccountDetailCtrl'
        }).
        when('/sample', {
            templateUrl: 'partials/sample.html',
            controller: 'AccountDetailCtrl'
        }).
        otherwise({
            redirectTo: '/clientAccount'
        });
    }]);

























