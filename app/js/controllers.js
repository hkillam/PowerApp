/**
 * Created by Heather Killam on 2016-05-19.
 */

var powerappControllers = angular.module('powerappControllers', []);

powerappControllers.controller('MeterListCtrl', ['$scope', '$http',
    function ($scope, $http) {
//        $http.get('meters/meters.json').success(function(data) {
//            $scope.phones = data;
//        });

        $scope.meters = 'this should be json data';
        $scope.orderProp = 'age';
    }]);

powerappControllers.controller('MeterDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);
