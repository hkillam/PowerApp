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
            google.charts.setOnLoadCallback(drawVisualization);
        }
    };
});

function drawVisualization() {
    // Some raw data in the format it is received in the JSON data
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        ['2014', 165, 938, 522, 998, 450, 614.6],
        ['2015', 135, 1120, 599, 1268, 288, 682],
        ['2016', 157, 1167, 587, 807, 397, 623]
    ]);

    // google charts are grouped by row.  Our rows are by year.  We want it to be grouped by month.
    // we need to flip the table (╯°□°）╯︵ ┻━┻
    //var data2 = new google.visualization.DataTable();

// Declare columns
    //           data2.addColumn('string', 'Month');
    //           data2.addColumn('number', '2014');
    //           data2.addColumn('number', '2015');
    //           data2.addColumn('number', '2016');
    //           data2.addColumn('string', { role: 'style' });

// Add data.

    var d = new Date();
    var n = d.getFullYear();

    var data2 = google.visualization.arrayToDataTable([
        ['Month', '$n-2', (n - 1).toString(), n.toString()],
        ['Jan', 165, 135, 157],
        ['Feb', 938, 1120, 1167],
        ['Apr', 522, 599, 587]
    ]);

    var options = {
        title: 'Bill Trend',
        seriesType: 'bars',
        legend: {position: 'bottom'},
        colors: ['#c7e9e5', '#66c2d9', '#005b85']
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('bill_trend_chart_div'));
    chart.draw(data2, options);
}


powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http', 'clientAccountSrv',
    function ($scope, $http, clientAccountSrv) {



        // TODO This needs to be asynch.
        //$http.get('http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php?account=6348558270').success(function (data) {
        //    $scope.accountOverview = data;
        //});

        $scope.clientAccount = [];
        clientAccountSrv.getData().then(function (promise) {
            $scope.clientAccount = promise;
            clientAccountSrv.drawPlot($scope.clientAccount.data.trendData);
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



