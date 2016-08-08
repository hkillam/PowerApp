define([], function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'templates/myUsage.html', controller: 'myUsageController'})
            .when('/myaccounts', {templateUrl: 'templates/myAccounts.html', controller: 'myAccountsController'})
            .when('/mysettings', {templateUrl: 'templates/mySettings.html', controller: 'mySettingsController'})
            .when('/details/:id', {templateUrl: 'templates/ideaDetails.html', controller: 'ideaDetailsController'})
            .otherwise({redirectTo: '/home'});
    }

    config.$inject = ['$routeProvider'];

    return config;
});