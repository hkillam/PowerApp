var powerApp = angular.module('powerApp', [
    'ngRoute',
    'powerappControllers'
]);


powerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/meters', {
            templateUrl: 'partials/currentbillsummary.html',
            controller: 'MeterListCtrl'
        }).when('/meters/:meterId', {
            templateUrl: 'partials/currentbillsummary.html',
            controller: 'MeterDetailCtrl'
        }).otherwise({
            redirectTo: '/meters'
        });
    }]);


























