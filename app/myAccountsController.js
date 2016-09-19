define([], function (app) {
    'use strict';


    function myAccountsController($scope, $http, powerAppDataService, GraphData) {
        $scope.meterCount = 0;
        $scope.loadedMeters = 0;
        $scope.template = getTemplates();

        // use the legend to turn series of data on or off in the chart
        // UGLY cut and paste.  TODO - make GraphData.loadAndDrawGoogleChart run with less junk.
        $scope.legend = {
            charttitle: "", axistitle: "", axis2title: "",
            items: [
                {
                    enabled: true, display: "", color: '#c7e9e5',
                    units: '', exists: true, total: 0, prefix: '$'
                },
                {
                    enabled: true, display: "", color: '#66c2d9',
                    units: '', exists: true, total: 0, prefix: '$'
                },
                {
                    enabled: true, display: "", color: '#005b85',
                    units: '', exists: true, total: 0, prefix: '$'
                },
                {
                    enabled: true, display: "", color: '#D8A4A2',
                    units: '', exists: false, total: 0, prefix: '$'
                },
                {
                    enabled: true, display: "", color: '#D87A77',
                    units: '', exists: false, total: 0, prefix: '$'
                },
                {
                    enabled: true, display: "", color: '#db504a',
                    units: '', exists: false, total: 0, prefix: '$'
                }]
        };
        $scope.legend.charttitle = 'Billing Trend';
        $scope.legend.axistitle = 'Cost ($)';
        $scope.legend.axis2title = "";


        $scope.clientAccount = powerAppDataService.getAccountOverview();
        if ($scope.clientAccount != null) {
            var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
            GraphData.loadAndDrawGoogleChart(chartData, 'bill_trend_chart_div', $scope.legend);
        } else {
            // data not loaded yet - use promise... and draw the chart when the data is done loading.
            powerAppDataService.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                GraphData.loadAndDrawGoogleChart(chartData, 'bill_trend_chart_div', $scope.legend);
            });
        }

        // Trigger loading for all usage info, so that it loads in the background
        powerAppDataService.loadAccountsAndUsages($http, $scope, powerAppDataService);

        $scope.showgraphSidebar = true;
        $scope.menucollapsebutton = "«";
        $scope.toggle = function () {
            $scope.showgraphSidebar = !$scope.showgraphSidebar;
            if ($scope.showgraphSidebar) {
                $scope.menucollapsebutton = "«";
            }
            else {
                $scope.menucollapsebutton = "»";
            }
        };


        // create a few charts to represent the data
        $scope.accountList = powerAppDataService.getAccountList();
        var usageData = prepareUsageData($scope);
        var demandData = prepareDemandData();
        GraphData.drawDemandChart(demandData);
        GraphData.drawUsageChart(usageData);


    }

    myAccountsController.$inject = ['$scope', '$http', 'powerAppDataService', 'GraphData'];

    return myAccountsController;

    function prepareUsageData($scope) {
        var data = [['Meter', 'kWh']];
        for (var i in $scope.accountList.accounts) {
            for (var j in $scope.accountList.accounts[i].premises) {
                if ($scope.accountList.accounts[i].premises[j].eAmount) {
                    data.push([$scope.accountList.accounts[i].premises[j].number, $scope.accountList.accounts[i].premises[j].eAmount]);
                }
            }
        }
        return google.visualization.arrayToDataTable(data);
    }

    function prepareDemandData() {
        // Some raw data (not anything close to accurate)
        var data = google.visualization.arrayToDataTable([
            ['Meter', 'kW', 'cost / sq. ft.'],
            ['Greenwood V.', 165, 938],
            ['North Building', 135, 1120],
            ['Studio A', 157, 1167],
            ['Studio B', 139, 1110],
            ['Side Annex', 136, 691]
        ]);
        return data;
    }


});
