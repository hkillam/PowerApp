'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('phones/phones.json').success(function(data) {
            $scope.phones = data;
        });

        $scope.orderProp = 'age';
    }]);

powerControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);
