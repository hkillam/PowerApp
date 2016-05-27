'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

powerControllers.factory("clientAccountSrv", function ($http) {
    return {
        getData: function () {
            var promise = $http({
                method: 'GET',
                url: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php?account=6348558270'
            })
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
        },
        drawPlot: function (d) {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                drawGoogleChart(d)
            })
        }
    };
});

function prepareTrendData($trendData) {

    // our data arrives as a combination of 0 (number) and "23.45" (string)
    // we need to clean it, to be all numbers, when building this array.
    // we also need to add the labels to the beginning of each row.
    // enumeration is important, so for-in can't be used (order isn't guaranteed)

    // google charts are grouped by row.  Our rows are by year.  We want it to be grouped by month.
    // we need to flip the table (╯°□°）╯︵ ┻━┻

    var chartArray = new Array($trendData.labels.length + 1);
    for (var i = 0; i < chartArray.length; i++) {
        chartArray[i] = new Array($trendData.series.length + 1);
    }
    chartArray[0][0] = "Month";

    for (var i = 0; i < $trendData.series.length; i++) {
        // a row has all the values for a year.
        var row = $trendData.series[i].data;
        var rlabel = $trendData.series[i].label;
        chartArray[0][i + 1] = rlabel;
        for (var j = 0; j < row.length; j++) {
            var clabel = $trendData.labels[j];
            chartArray[j + 1][0] = clabel;
            var item = parseFloat(row[j]);
            chartArray[j + 1][i + 1] = item;
        }
    }

    return chartArray;
}

function drawGoogleChart($chartArray) {

    var data = google.visualization.arrayToDataTable($chartArray);

    var options = {
        title: 'Bill Trend',
        seriesType: 'bars',
        legend: {position: 'bottom'},
        colors: ['#c7e9e5', '#66c2d9', '#005b85']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('bill_trend_chart_div'));
    chart.draw(data, options);
}


powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http', 'clientAccountSrv',
    function ($scope, $http, clientAccountSrv) {

        $scope.clientAccount = [];
        clientAccountSrv.getData().then(function (promise) {
            $scope.clientAccount = promise;
            var chartData = prepareTrendData($scope.clientAccount.data.trendData);
            clientAccountSrv.drawPlot(chartData);
        });


        $http.get('phones/phones.json').success(function (data) {
            $scope.phones = data;
        });


        $scope.template = {
            "home": "partials/home.html",
            "about": "partials/aboutus.html",
            "contact": "partials/contactus.html",
            "currentbill": "partials/currentbillsummary.html",
            "topbar": "partials/topbar.html",
            "accountmenu": "partials/accountmenu.html"
        };
        $scope.orderProp = 'age';
    }]);

powerControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);



