
'use strict';

/* App Module */

var powerApp = angular.module('powerApp', [
    'ngRoute',
    'powerControllers',
    'ui.grid',
    'ui.grid.treeView',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns'
]);

powerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'templates/clientAccounts.html',
            controller: 'ClientAccountsCtrl'
        }).
        when('/clientAccount/:meterId', {
            templateUrl: 'partials/currentbillsummary.html',
            controller: 'AccountDetailCtrl'
        }).when('/detailReport', {
            templateUrl: 'templates/detailReport.html',
            controller: 'DetailReportCtrl'
        }).when('/settings', {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

























