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

        // use the legend to turn series of data on or off in the chart
        $scope.legend = {
            charttitle: "", axistitle: "", axis2title: "",
            items: [
                {enabled: true, display: "", color: '#c7e9e5'},
                {enabled: true, display: "", color: '#66c2d9'},
                {enabled: true, display: "", color: '#005b85'},
                {enabled: true, display: "", color: '#db504a'},
                {enabled: true, display: "", color: '#D87A77'},
                {enabled: true, display: "", color: '#D8A4A2'}
            ]
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

        if (!$scope.clientAccount) {
            // data not loaded - use promise...then to load asynchronous.
            powerAppDataService.loadAccountOverview().then(function (promise) {
                $scope.clientAccount = promise.data;
                var d = new Date($scope.clientAccount.lastStatementDate);
                $scope.chartPeriod = d.toLocaleDateString();

                LoadGraphList($scope);
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                $scope.legend.charttitle = 'Billing Trend';
                $scope.legend.axistitle = 'Cost ($)';
                $scope.legend.axis2title = "";

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
                $scope.chartPeriod = d.toLocaleDateString();
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

        $scope.legend.charttitle = $scope.currentGraph.id + ' Trend';
        $scope.legend.axistitle = charttype;
        $scope.legend.axis2title = $scope.currentSecondGraph.name;

        // make and initialize an array:  rows for each month, columns for each year
        var chartArray = new Array(13);
        for (var i = 0; i < chartArray.length; i++) {
            if (linechart === "none") {
                chartArray[i] = new Array(4);
            } else {
                chartArray[i] = new Array(5);
            }
            chartArray[i][0] = "mon";
            for (var j = 1; j < chartArray[i].length; j++) {
                chartArray[i][j] = 0;
            }
        }

        // some labels
        chartArray[0][0] = "Month";
        if (chartArray[0].length == 5) {
            chartArray[0][4] = $scope.currentSecondGraph.name;
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
                            for (var r in reads) {
                                //var d = new Date(str);  //converts the string into date object
                                var d = new Date(reads[r].lastReadDate);
                                var mon = d.getMonth() + 1; //get the value of month
                                var details = reads[r].details;
                                for (var det in details) {
                                    if (details[det].label === "Actual Demand") {
                                        chartArray[mon][4] += details[det].amount;
                                    }
                                    // other values:  "Billable Demand" "Electric Charges", "Total Electric Charges", "Total Electric Charges / Day", "Average Temperature", "Cooling Degree Days", "Heating Degree Days"

                                }

                            }
                        }
                    }
                }

                // this needs to be separate functions...  but why start now?
                if (linechart === "budget") {
                    for (var j = 1; j < 13; j++) {
                        if (selected[i].meter.monthlyBudget > 0)
                            chartArray[j][4] += selected[i].meter.monthlyBudget;
                    }
                }


            }
        }

        // There isn't a built-in cumulative function in google charts.
        // go through the chart, and for each column add the values from the previous column.
        if ($scope.currentGraph.cumulative) {
            for (j = 2; j < 13; j++) {
                chartArray[j][1] += chartArray[j - 1][1];
                chartArray[j][2] += chartArray[j - 1][2];
                chartArray[j][3] += chartArray[j - 1][3];
                if (chartArray[j].length == 5 && linechart === "budget")
                    chartArray[j][4] += chartArray[j - 1][4];
            }
        }

        // There may be hidden values (user clicked legend to hide/display)
        // Remove them from the data.
        // Not done in live data via jquery because there were no classes and ids - too many assumptions being made.
        for (i = chartArray[0].length - 1; i > 0; i--) {
            if ($scope.legend.items[i].enabled == false) {
                for (j in chartArray) {
                    chartArray[j].splice(i + 1, 1);   // this is some ugly codes
                }
            }
        }


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

