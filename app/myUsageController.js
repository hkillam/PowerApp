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

                LoadGraphList($scope);
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', 'Billing Trend', 'Cost ($)');

                powerAppDataService.loadGroupings($scope, $scope.clientAccount.number);
                powerAppDataService.loadReports($scope, $scope.clientAccount.number);

            });
        } else {
            LoadGraphList($scope);
            var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
            GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', 'Billing Trend', 'Usage ($)');

            powerAppDataService.loadGroupings($scope, $scope.clientAccount.number);
            powerAppDataService.loadReports($scope, $scope.clientAccount.number);

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
        // Some raw data (not necessarily accurate)
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
                    var chartData = prepareSelectedData($scope, $scope.currentGraph.name);
                    GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.currentGraph + ' Trend', 'Cost ($)');
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
    function prepareSelectedData($scope, charttype) {
        // make and initialize an array:  rows for each month, columns for each year
        var chartArray = new Array(13);
        for (var i = 0; i < chartArray.length; i++) {
            chartArray[i] = new Array(4);
            chartArray[i][0] = "mon";
            for (var j = 1; j < chartArray[i].length; j++) {
                chartArray[i][j] = 0;
            }
        }
        chartArray[0][0] = "Month";
        var monthlabels = false;
        var yearlabels = false;

        var selected = $scope.gridApi.selection.getSelectedRows();

        for (var i in selected) {
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
                                for (var y in series) {
                                    for (var val in series[y].data) {
                                        chartArray[parseInt(val, 10) + 1][parseInt(y, 10) + 1] += series[y].data[val];
                                    }
                                }

                            }
                        }
                    }
                }

            }
        }
        return chartArray;

    }

    // prepare drop-down controls for the UI, that list all possible graphs
    function LoadGraphList($scope) {
        $scope.graphs = [{name: "Amount"}, {name: "Usage"}, {name: "Temperature"}];
        $scope.currentGraph = $scope.graphs[0];
        $scope.changedGraph = function (item) {
            //$scope.currentGraph = document.getElementById('graphSelect').value;
            var chartData = prepareSelectedData($scope, $scope.currentGraph.name);
            this.GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.currentGraph.name + ' Trend', 'update this!');
        };
        $scope.secondgraphs = [{name: "<none>"}, {name: "Demand"}];
        $scope.currentSecondGraph = $scope.secondgraphs[0];
        $scope.changedSecondGraph = function (item, GraphData) {
            //$scope.currentGraph = document.getElementById('secondgraphSelect').value;
            var chartData = prepareSelectedData($scope, $scope.currentGraph.name);
            this.GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.currentGraph.name + ' Trend', 'update this!');
        }
    }

});

