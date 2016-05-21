/**
 * Created by Heather Killam on 2016-05-19.
 */
'use strict';

var powerApp = angular.module('powerApp', []);

powerApp.controller('PhoneListCtrl', function ($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
        $scope.phones = data;
    });

    $scope.orderProp = 'age';
});

