'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

powerControllers.factory("clientAccountSrv", function ($http) {
    var accountOverview = null;

    function getData() {
        return accountOverview;
    }

    return {
        getData: getData,
        loadData: function () {
            if (accountOverview == null) {

                var promise = $http({
                    method: 'GET',
                    url: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php?account=6348558270'
                })
                    .success(function (data, status, headers, config) {
                        accountOverview = data;

                        // TODO:  trigger more data loads here, to store on this service object, so that next pages load faster
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });
                return promise;
            } else {
                return accountOverview;
            }
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

        // if the data is already loaded, grab and draw
        $scope.clientAccount = clientAccountSrv.getData();
        if ($scope.clientAccount != null) {
            var chartData = prepareTrendData($scope.clientAccount.trendData);
            drawGoogleChart(chartData);
        } else {
            // data not loaded - use promise...then to load asynchronous.
            clientAccountSrv.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
                var chartData = prepareTrendData($scope.clientAccount.trendData);
                clientAccountSrv.drawPlot(chartData);
            });
        }

        $http.get('phones/phones.json').success(function (data) {
            $scope.phones = data;
        });


        $scope.template = {
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


function markGroupLevels(groups, level) {
    for (var group in groups) {
        groups[group].level = level;

        for (var meter in groups[group].meters)
            groups[group].meters[meter].level = level + 1;

        if (groups[group].groups)
            markGroupLevels(groups[group].groups, level + 1);

    }

}

powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv',
    function ($scope, $routeParams, $http, clientAccountSrv) {
        $scope.meterId = $routeParams.meterId;

        $scope.clientAccount = clientAccountSrv.getData();


        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            showTreeExpandNoChildren: false,
            treeIndent: 20,
            columnDefs: [
                {name: 'name', width: '30%'},
                {name: 'type', width: '20%', enableFiltering: false},
                {name: 'number', width: '20%'},
            ],
        }

        //row.treeNode.state === 'expanded'

//        $http.get('settings/meters.json').success(function (data) {
        $http.get('settings/meterlist.json').success(function (data) {
            $scope.meters = data;
            // todo:  expand all of the level 1 items
            $scope.gridOptions.data = data.list;
            // todo:  add background colours to group rows

        });

        $scope.template = {
            "topbar": "partials/topbar.html",
            "accountmenu": "partials/accountmenu.html",
            "groupofmeters": "partials/groupofmeters.html"
        };

    }]);

powerControllers.controller('SettingsCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv',
    function ($scope, $routeParams, $http, clientAccountSrv) {
        $scope.meterId = $routeParams.meterId;

        $scope.clientAccount = clientAccountSrv.getData();

        $http.get('settings/meters.json').success(function (data) {
            $scope.meters = data;

            // initialize expanded and indentation levels
            for (var account in $scope.meters.accounts) {
                $scope.meters.accounts[account].expanded = true;
                $scope.meters.children = $scope.meters.accounts[account].groups;
                markGroupLevels($scope.meters.accounts[account].groups, 1);
            }
        });

        $scope.template = {
            "topbar": "partials/topbar.html",
            "accountmenu": "partials/accountmenu.html",
            "groupofmeters": "partials/groupofmeters.html"
        };

    }]);


