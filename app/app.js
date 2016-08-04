
'use strict';

/* App Module */

var powerApp = angular.module('powerApp', [
    'ngRoute',
    'powerControllers',
    'GraphData',
    'ui.grid',
    'ui.grid.treeView',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.pinning',
    'ui.grid.selection'
]);

powerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: './templates/myaccount.html',
            controller: 'DetailReportCtrl'
        }).
        when('/clientAccount/:meterId', {
            templateUrl: './partials/currentbillsummary.html',
            controller: 'AccountDetailCtrl'
        }).when('/myaccount', {
            templateUrl: './templates/clientAccounts.html',
            controller: 'ClientAccountsCtrl'
        }).when('/settings', {
            templateUrl: './templates/settings.html',
            controller: 'SettingsCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

























