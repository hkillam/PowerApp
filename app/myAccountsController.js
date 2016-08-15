define([], function (app) {
    'use strict';


    function myAccountsController($scope, $http, powerAppDataService, GraphData) {
        $scope.meterCount = 0;
        $scope.loadedMeters = 0;
        $scope.template = getTemplates();

        $scope.clientAccount = powerAppDataService.getAccountOverview();
        if ($scope.clientAccount != null) {
            var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
            GraphData.loadAndDrawGoogleChart(chartData, 'bill_trend_chart_div', 'Billing Trend', 'Cost ($)');
        } else {
            // data not loaded yet - use promise... and draw the chart when the data is done loading.
            powerAppDataService.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                GraphData.loadAndDrawGoogleChart(chartData, 'bill_trend_chart_div', 'Billing Trend', 'Cost ($)');
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
