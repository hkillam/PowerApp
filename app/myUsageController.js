//powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'accountListSrv', 'GraphData',
//    function ($scope, $routeParams, $http, clientAccountSrv, accountListSrv, GraphData) {


define([], function () {
    'use strict';

    function myUsageController($scope, powerAppDataService, GraphData) {
        $scope.groupings = [];
        $scope.services = [];
        $scope.reports = [];
        $scope.report_AllColumns = powerAppDataService.getAllColumnsReport();
        $scope.template = getTemplates();
        $scope.clientAccount = powerAppDataService.getAccountOverview();
        $scope.accountList = powerAppDataService.getAccountList();
        $scope.meterCount = 0;
        $scope.loadedMeters = 0;
        $scope.GraphData = GraphData;
        $scope.currentGraph = "Billing";
        $scope.showHelp = false;

        // use the legend to turn series of data on or off in the chart
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

        // this chart is wide, let people collapse the side menu
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

        // help icon
        $scope.help = function () {
            $scope.showHelp = !$scope.showHelp;
        };

        if (!$scope.clientAccount) {
            // data not loaded - use promise...then to load asynchronous.
            powerAppDataService.loadAccountOverview().then(function (promise) {
                $scope.clientAccount = promise.data;
                var d = new Date($scope.clientAccount.lastStatementDate);
                $scope.chartPeriod = "Statement on " + d.toLocaleDateString();

                LoadGraphList($scope);
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                $scope.legend.charttitle = 'Billing Trend';
                $scope.legend.axistitle = 'Cost ($)';
                $scope.legend.axis2title = "";
                // calculate totals to display in the legend
                for (var j = 1; j < 13; j++) {
                    $scope.legend.items[0].total += chartData[j][1];
                    $scope.legend.items[1].total += chartData[j][2];
                    $scope.legend.items[2].total += chartData[j][3];
                }

                GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend);

                powerAppDataService.loadGroupings($scope);
                powerAppDataService.loadReports($scope, $scope.clientAccount.number);
                powerAppDataService.matchGroupingsToAccounts($scope);

            });
        } else {
            LoadGraphList($scope);
            var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
            $scope.legend.charttitle = 'Billing Trend';
            $scope.legend.axistitle = 'Cost ($)';
            $scope.legend.axis2title = "";
            // calculate totals to display in the legend
            for (var j = 1; j < 13; j++) {
                $scope.legend.items[0].total += chartData[j][1];
                $scope.legend.items[1].total += chartData[j][2];
                $scope.legend.items[2].total += chartData[j][3];
            }

            GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend);

            powerAppDataService.loadGroupings($scope);
            powerAppDataService.loadReports($scope, $scope.clientAccount.number);
            powerAppDataService.matchGroupingsToAccounts($scope);


        }

        // create a "reporting period" dropdown and initialize it to the first on the list - last statement date
        $scope.reportPeriods = [{label: "Last Statement"}, {label: "Last Quarter"}, {label: "Year to Date"}];
        $scope.selectedPeriod = $scope.reportPeriods[0];
        $scope.changedPeriod = function (item) {
            if ($scope.selectedPeriod.label === "Last Statement") {
                var d = new Date($scope.clientAccount.lastStatementDate);
                $scope.chartPeriod = "Statement on " + d.toLocaleDateString();
            }
            if ($scope.selectedPeriod.label === "Last Quarter") {
                $scope.chartPeriod = "Last Quarter";
            }
            if ($scope.selectedPeriod.label === "Year to Date") {
                $scope.chartPeriod = "Year to Date";
            }
            alert("this does nothing yet " + $scope.selectedPeriod.label);
        }

        $scope.legendChanged = function () {
            var chartData = prepareSelectedData($scope);
            GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend, $scope.currentGraph.cumulative);
        }

        SetupGridOptions($scope, GraphData);
        powerAppDataService.loadAccountsAndUsages($scope);

    }

    myUsageController.$inject = ['$scope', 'powerAppDataService', 'GraphData'];

    return myUsageController;


    // triggered when a row selection changes.
// Check/uncheck the group when a meter changes, or the meters when a group changes.
    function RowSelectionChanged(row) {

        if (row.entity.type === "group") {
            setChildrenSelected(row, row.isSelected);
        }

        var parent = row.treeNode.parentRow;
        while (parent) {
            parent.isSelected = isSiblingsSelected(row);
            parent = parent.treeNode.parentRow;
        }
    }

    function setChildrenSelected(row, selected) {
        row.isSelected = selected;
        var children = row.treeNode.children;
        for (var i in children) {
            setChildrenSelected(children[i].row, selected);
        }
    }


    function isSiblingsSelected(row) {
        if (!row.isSelected)
            return false;

        var parent = row.treeNode.parentRow;
        if (parent) {
            var siblings = parent.treeNode.children;
            if (siblings) {
                for (var i in siblings) {
                    if (!siblings[i].row.isSelected)
                        return false;
                }
            }
        }
        return true;
    }

    function SetupGridOptions($scope, GraphData) {
        // TODO:  save changes in the column layout:  http://stackoverflow.com/questions/32346341/angular-ui-grid-save-and-restore-state
// Default view is to show all columns.  Every custom view starts by taking this and modifying values in it.  A json
// for a custom view will only need to have the column name and the fields that are changed.
// values to change:  display, displayName, width

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableColumnResizing: true,
            enableRowHeaderSelection: true,
            enableGridMenu: true,
            showTreeExpandNoChildren: false,
            treeIndent: 20,
            selectionRowHeaderWidth: 35,
            enableFullRowSelection: true,
            enableFooterTotalSelected: true,
            showGridFooter: true,
            enablePinning: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerDataChangeCallback(function () {
                    $scope.gridApi.treeBase.expandAllRows();
                    $scope.gridApi.selection.selectAllRows();
                });
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    RowSelectionChanged(row);
                    var chartData = prepareSelectedData($scope);
                    GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend, $scope.currentGraph.cumulative);
                });
            },
            columnDefs: $scope.report_AllColumns.columnList
        };
        $scope.currentReport = $scope.report_AllColumns.reportName;


    }


    function setLegendUnits($scope, items, prefix, units) {
        for (var i in items) {
            $scope.legend.items[items[i]].prefix = prefix;
            $scope.legend.items[items[i]].units = units;
        }
    }


    // createTitles
    // Consider the datasets and units to create meaningful titles.
    // Also set units for the legend
    function createTitles($scope) {
        var charttype = $scope.currentGraph.id;
        var linechart = $scope.currentSecondGraph.id;
        if ($scope.currentGraph.id === "Cost Cumulative") {
            charttype = "Amount";
        }

        // normal title adds "trend" but there are some customized.  OK, there is only one that is "normal"
        $scope.legend.charttitle = $scope.currentGraph.id + ' Trend';
        if ($scope.currentGraph.id === "Amount")
            $scope.legend.charttitle = "Billing Trend";
        if ($scope.currentGraph.id === "Cost Cumulative")
            $scope.legend.charttitle = "Cost (Cumulative)";

        // add the second axis to the graph title
        if ($scope.currentSecondGraph.id !== "none") {
            $scope.legend.charttitle += " with " + $scope.currentSecondGraph.name;
        }

        $scope.legend.axistitle = charttype;
        $scope.legend.axis2title = $scope.currentSecondGraph.name;

        if ($scope.legend.axistitle === "Amount") {
            $scope.legend.axistitle = "Cost ($)";
            setLegendUnits($scope, [0, 1, 2], '$', '');
        }
        if ($scope.legend.axistitle === "Usage") {
            $scope.legend.axistitle += " (kWh)";
            setLegendUnits($scope, [0, 1, 2], '', 'kWh');
        }
        if ($scope.legend.axis2title === "Budget") {
            $scope.legend.axis2title += " ($)";
            setLegendUnits($scope, [3, 4, 5], '$', '');
        }
        if ($scope.legend.axis2title === "Demand") {
            $scope.legend.axis2title += " (kW)";
            setLegendUnits($scope, [3, 4, 5], '', 'kW');
        }
    }


// Use the table to see which meters are being used.
// Add data found in the details for each meter, for each year available.
// Chart types:  "Usage", "Temperature", "Amount"
// But we really do not want the TOTAL temperature - not sure how to apply this one
    function prepareSelectedData($scope) {
        var charttype = $scope.currentGraph.id;
        var linechart = $scope.currentSecondGraph.id;
        if ($scope.currentGraph.id === "Cost Cumulative") {
            charttype = "Amount";
        }
        createTitles($scope);

        // make and initialize an array:  rows for each month, columns for each year
        var chartArray = new Array(13);
        for (var i = 0; i < chartArray.length; i++) {
            switch (linechart) {
                case "none":
                    chartArray[i] = new Array(4);
                    break;
                case "budget":
                    chartArray[i] = new Array(5);
                    break;  // one year of budget data
                case "demand":
                    chartArray[i] = new Array(6);
                    break;  // we usually have data from two years
            }
            chartArray[i][0] = "Month";
            for (var j = 1; j < chartArray[i].length; j++) {
                chartArray[i][j] = 0;
            }
        }

        // hide items in the second row of the legend.
        if (linechart === "none") {
            $scope.legend.items[3].exists = false;
            $scope.legend.items[4].exists = false;
            $scope.legend.items[5].exists = false;
        }

        // some labels
        chartArray[0][0] = "Month";
        if (chartArray[0].length > 4) {
            chartArray[0][4] = $scope.currentSecondGraph.name;
        }
        if (chartArray[0].length > 5) {
            chartArray[0][5] = $scope.currentSecondGraph.name;
        }

        var monthlabels = false;
        var yearlabels = false;

        var selected = $scope.gridApi.selection.getSelectedRows();

        for (i in selected) {
            if (selected[i].type === "meter") {
                var usage = selected[i].meter.usage.data;
                if (!monthlabels) {
                    for (var m in usage.labels) {
                        chartArray[parseInt(m, 10) + 1][0] = usage.labels[m];
                    }
                    monthlabels = true;
                }
                for (var s in usage.services) {
                    if (usage.services[s].name === "ELECTRICITY-1") {
                        for (var t in usage.services[s].data) {
                            if (usage.services[s].data[t].name === charttype) {
                                var series = usage.services[s].data[t].series.sort(function (a, b) {
                                    return a.label - b.label
                                });
                                if (!yearlabels) {
                                    for (var y in series) {
                                        chartArray[0][parseInt(y, 10) + 1] = series[y].label;
                                    }
                                    yearlabels = true;
                                }
                                for (var y in series) { // y in the series is a year
                                    for (var val in series[y].data) {  // each val is for a month
                                        chartArray[parseInt(val, 10) + 1][parseInt(y, 10) + 1] += series[y].data[val];
                                    }
                                }

                            }
                        }
                    }
                }

                // look in the actual reads on each meter for more information
                // add another column of data if there is a line graph added on.
                if (linechart === "demand") {
                    var services = selected[i].meter.usage.services;
                    for (var srv in services) {
                        if (services[srv].name === "ELECTRICITY-1") {
                            var reads = services[srv].reads;
                            var now = new Date();
                            var thisyear = now.getFullYear();
                            for (var r in reads) {
                                //var d = new Date(str);  //converts the string into date object
                                var d = new Date(reads[r].lastReadDate);
                                var mon = d.getMonth() + 1; //get the value of month
                                var year = d.getFullYear();
                                var details = reads[r].details;
                                for (var det in details) {
                                    if (details[det].label === "Actual Demand") {
                                        if (year === thisyear) {
                                            chartArray[mon][5] += details[det].amount;
                                            $scope.legend.items[5].exists = true;
                                        } else {
                                            chartArray[mon][4] += details[det].amount;
                                            $scope.legend.items[4].exists = true;
                                        }
                                    }
                                    // other values:  "Billable Demand" "Electric Charges", "Total Electric Charges", "Total Electric Charges / Day", "Average Temperature", "Cooling Degree Days", "Heating Degree Days"

                                }

                            }
                        }
                    }
                }

                // this needs to be separate functions...  but why start now?
                if (linechart === "budget") {
                    $scope.legend.items[5].exists = true;
                    for (var j = 1; j < 13; j++) {
                        if (selected[i].meter.monthlyBudget > 0)
                            chartArray[j][4] += selected[i].meter.monthlyBudget;
                    }
                }


            }
        }

        // clear the totals in the legend
        for (i in $scope.legend.items) {
            $scope.legend.items[i].total = 0;
        }

        // Get totals (or maximums) for the legend and for cumulative charts
        // There isn't a built-in cumulative function in google charts.
        // go through the chart, and for each column add the values from the previous column.
        if ($scope.currentGraph.cumulative) {
            for (j = 2; j < 13; j++) {
                chartArray[j][1] += chartArray[j - 1][1];
                chartArray[j][2] += chartArray[j - 1][2];
                chartArray[j][3] += chartArray[j - 1][3];
                if (chartArray[j].length == 5 && linechart === "budget")
                    chartArray[j][4] += chartArray[j - 1][4];
                if (chartArray[j].length == 6 && linechart === "demand") {
                    $scope.legend.items[4].total = Math.max($scope.legend.items[4].total, chartArray[j][4]);
                    $scope.legend.items[5].total = Math.max($scope.legend.items[5].total, chartArray[j][5]);
                }
            }
            for (j = 0; j < 3; j++) {
                $scope.legend.items[j].total = chartArray[12][j + 1];
            }
            if (chartArray[j].length == 5 && linechart === "budget") {
                $scope.legend.items[5].total = chartArray[12][5];
            }
        } else {
            // calculate totals for the legend
            for (j = 1; j < 13; j++) {
                $scope.legend.items[0].total += chartArray[j][1];
                $scope.legend.items[1].total += chartArray[j][2];
                $scope.legend.items[2].total += chartArray[j][3];
                if (chartArray[j].length == 5 && linechart === "budget")
                    $scope.legend.items[5].total += chartArray[j][4];
                if (chartArray[j].length == 6 && linechart === "demand") {
                    $scope.legend.items[4].total = Math.max($scope.legend.items[4].total, chartArray[j][4]);
                    $scope.legend.items[5].total = Math.max($scope.legend.items[5].total, chartArray[j][5]);
                }
            }
        }

        // There may be hidden values (user clicked legend to hide/display)
        // Remove them from the data.
        // Not done in live data via jquery because there were no classes and ids - too many assumptions being made.
        // second row first, this gets even uglier.
        if (linechart === "demand") {
            for (i = 5; i >= 4; i--) {
                if ($scope.legend.items[i].enabled == false && $scope.legend.items[i].exists == true) {
                    for (j in chartArray) {
                        chartArray[j].splice(i, 1);   // this is some ugly codes
                    }
                }
            }
        }
        if (linechart === "budget") {
            if ($scope.legend.items[i].enabled == false && $scope.legend.items[i].exists == true) {
                for (j in chartArray) {
                    chartArray[j].splice(4, 1);   // this is getting even worse.  I'm so not happy with this.
                }
            }
        }
        // now the first row of the legend
        for (i = 2; i >= 0; i--) {
            if ($scope.legend.items[i].enabled == false) {
                for (j in chartArray) {
                    chartArray[j].splice(i + 1, 1);   // this is some ugly codes
                }
            }
        }

        // Grab the totals, we need these for the legend


        return chartArray;

    }

    // prepare drop-down controls for the UI, that list all possible graphs
    function LoadGraphList($scope) {
        $scope.graphs = [{name: "Cost", id: "Amount", cumulative: false},
            {name: "Usage", id: "Usage", cumulative: false},
            {name: "Cost (Cumulative)", id: "Cost Cumulative", cumulative: true}
        ];
        $scope.currentGraph = $scope.graphs[0];
        $scope.changedGraph = function (item) {
            var chartData = prepareSelectedData($scope);
            this.GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend, $scope.currentGraph.cumulative);
        };
        $scope.secondgraphs = [{name: "<none>", id: "none"}, {name: "Budget", id: "budget"}, {
            name: "Demand",
            id: "demand"
        }];
        // "id":"3","name":"Option C"
        $scope.currentSecondGraph = $scope.secondgraphs[0];
        $scope.changedSecondGraph = function (item, GraphData) {
            var chartData = prepareSelectedData($scope);
            this.GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.legend, $scope.currentGraph.cumulative);
        }
    }


});

