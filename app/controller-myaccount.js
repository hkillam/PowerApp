'use strict';

// TODO:  BUG - click a row with +-, and it will expand, but it is also registered as a selection change.
// TODO:  BUG - +- on a meter doesn't work, must click in the row somewhere.

powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'accountListSrv', 'GraphData',
    function ($scope, $routeParams, $http, clientAccountSrv, accountListSrv, GraphData) {
        $scope.meterId = $routeParams.meterId;
        $scope.groupings = [];
        $scope.services = [];
        $scope.reports = [];
        $scope.template = getTemplates();
        $scope.clientAccount = clientAccountSrv.getData();
        $scope.GraphData = GraphData;

        if (!$scope.clientAccount) {
            // data not loaded - use promise...then to load asynchronous.
            clientAccountSrv.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
                GraphData.LoadGraphList($scope);
                var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
                GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', 'Billing Trend', 'Cost ($)');

                LoadGroupings($scope, $http, clientID);
                LoadReports($scope, $http, clientID);

            });
        } else {
            GraphData.LoadGraphList($scope);
            var chartData = GraphData.prepareBillingTrendForAllMeters($scope.clientAccount.trendData);
            GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', 'Billing Trend', 'Usage ($)');

            LoadGroupings($scope, $http, clientID);
            LoadReports($scope, $http, clientID);

        }

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
        }

        SetupGridOptions($scope, GraphData);

        // see if we need to force the data to load, and put the rest of the initialization inside the callback
        LoadAccountsAndUsages($http, $scope, accountListSrv);



        function LoadReports($scope, $http, clientID) {
            var settingsurl = 'settings/columns_' + clientID + '.json';
            $http({
                method: 'GET',
                url: settingsurl
            }).then(function successCallback(response) {
                //response.data.columnsets;
                $scope.reports.push(report_AllColumns);
                for (var x in response.data.columnsets) {
                    InitializeColumnSet(response.data.columnsets[x]);
                    $scope.reports.push(response.data.columnsets[x]);
                }

                // create a "reports" dropdown and initialize it to the first report
                $scope.selectedReport = $scope.reports[0];
                $scope.changedReport = function (item) {
                    $scope.gridOptions.columnDefs = $scope.selectedReport.columnList;
                }
            }, function errorCallback(response) {
                //alert ("failure");
            });
        }
    }]);

// load the groupings from the settings file, match to the account data.
// called from the controller during setup.
function LoadGroupings($scope, $http, clientID) {
    var settingsurl = 'settings/meterlist_' + clientID + '.json';

    $http.get(settingsurl).success(function (data) {
        // TODO - if metergroup has not been loaded yet, grab the callback and do it here.  Or make a promise.  or something.
        if (!$scope.metergroup)
            $scope.metergroup = CreateMeterListGrouping($scope.accountList.accounts);
        data.groupings.push($scope.metergroup);
        $scope.groupings = data.groupings;

        // connect the data to the grid
        $scope.gridOptions.data = $scope.groupings[0].list;

        // create a "groupings" dropdown and initialize it to the first group
        // TODO - initialize the groupings dropdown
        $scope.groupIndex = 0;
        $scope.selectedGrouping = $scope.groupings[0];
        $scope.changedGrouping = function (item) {
            $scope.gridOptions.data = $scope.selectedGrouping.list;
        }
        $scope.changedServices = function (item) {
            $scope.serviceIndex = 1;
            var gs = document.getElementById('serviceSelect').value;
        }


        MatchGroupingsToAccounts($scope);
    });

}

function LoadGraphList($scope) {
    $scope.graphs = [{name: "Usage"}, {name: "Amount"}, {name: "Temperature"}];
    $scope.currentGraph = "Amount";
    $scope.changedGraph = function (item) {
        $scope.currentGraph = document.getElementById('graphSelect').value;
        var chartData = prepareSelectedData($scope, $scope.currentGraph);
        GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.currentGraph + ' Trend', 'update this!');
    }
    $scope.secondgraphs = [{name: "<none>"}, {name: "Demand"}];
    $scope.currentSecondGraph = "<none>";
    $scope.changedSecondGraph = function (item) {
        $scope.currentGraph = document.getElementById('secondgraphSelect').value;
        var chartData = prepareSelectedData($scope, $scope.currentGraph);
        GraphData.loadAndDrawGoogleChart(chartData, 'report_chart_div', $scope.currentGraph + ' Trend', 'update this!');
    }
}

//
// Create the default grouping from the list of accounts & premises.
// called from report controller  CreateMeterListGrouping($scope.accountList.accounts);
function CreateMeterListGrouping(accounts) {
    // create default groupings from the meter list.
    var meterlistgrouping = {name: 'Meters', list: []};
    meterlistgrouping.list.push({type: "group", name: "totals", $$treeLevel: 0});
    for (var i in accounts) {
        meterlistgrouping.list.push({
            type: "account",
            number: accounts[i].number,
            name: accounts[i].number,
            $$treeLevel: 1
        });
        for (var j in accounts[i].premises) {
            var meter = accounts[i].premises[j];
            meterlistgrouping.list.push({type: "meter", number: meter.number, name: meter.number});
        }
    }
    return meterlistgrouping;
}

function SetupGridOptions($scope, GraphData) {
    // TODO:  save changes in the column layout:  http://stackoverflow.com/questions/32346341/angular-ui-grid-save-and-restore-state

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
        columnDefs: report_AllColumns.columnList
    };
    $scope.currentReport = report_AllColumns.reportName;

}

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

// Find each meter in the groupings list, and match it to real meter data.
// This must be done after both lists are loaded.
// Square footage come from groupings; do calculations with this now.
// Get group totals too.
function MatchGroupingsToAccounts($scope) {
    // todo:  compare premise list to grouping list, find new/deleted meters

    // match meters in the groupings to the account list
    for (var grp in $scope.groupings) {
        for (var meterndx in $scope.groupings[grp].list) {
            if ($scope.groupings[grp].list[meterndx].number) {
                var meter = getMeterFromID($scope, $scope.groupings[grp].list[meterndx].number);
                if (meter) {
                    $scope.groupings[grp].list[meterndx].meter = meter;
                    if ($scope.groupings[grp].list[meterndx].squareFootage > 0) {
                        meter.squareFootage = $scope.groupings[grp].list[meterndx].squareFootage;
                        if (meter.eAmount) {
                            meter.usagesqft = meter.eAmount / meter.squareFootage;
                        }
                        if (meter.totalcost) {
                            meter.costsqft = meter.totalcost / meter.squareFootage;
                        }
                    }
                }
            }
        }
        CalculateGroupTotals($scope.groupings[grp].list);
    }

}

// calculate totals for groups, and for subgroups, and for subgroups of subgroups
function CalculateGroupTotals(meters) {
    if (meters.length < 1)
        return;

    // current level is in the top item of the list
    var curlevel = meters[0].$$treeLevel;
    var siblings = [];
    var slicebegin = 0;

    // every item that is at the same level as the current is the beginning of a sibling list.
    // divide the list into siblings
    for (var i in meters) {
        if (meters[i].$$treeLevel == curlevel && i > slicebegin) {
            siblings.push(meters.slice(slicebegin, i));
            slicebegin = i;
        }
    }
    siblings.push(meters.slice(slicebegin, meters.length));

    // with each sublist...
    // get totals and put them in the top item
    // recurse, so that subgroups have subtotals.
    for (var j in siblings) {
        var totals = siblings[j].reduce(function (a, b) {
            if (b.type === "meter") {
                return {
                    eAmount: b.meter.eAmount ? a.eAmount + b.meter.eAmount : a.eAmount,
                    eCost: b.meter.eCost ? a.eCost + b.meter.eCost : a.eCost,
                    gAmount: b.meter.gAmount ? a.gAmount + b.meter.gAmount : a.gAmount,
                    gCost: b.meter.gCost ? a.gCost + b.meter.gCost : a.gCost,
                    kbtu: b.meter.kbtu ? a.kbtu + b.meter.kbtu : a.kbtu,
                    totalcost: b.meter.totalcost ? a.totalcost + b.meter.totalcost : a.totalcost,
                    totalEmissions: b.meter.totalEmissions ? a.totalEmissions + b.meter.totalEmissions : a.totalEmissions
                };
            } else {
                return ( a );
            }
        }, {
            eAmount: 0,
            eCost: 0,
            gAmount: 0,
            gCost: 0,
            kbtu: 0,
            totalcost: 0,
            totalEmissions: 0
        });

        siblings[j][0].meter = totals;
    }

    // recurse into subgroups
    for (var j in siblings) {
        // drop the current group, and any meters at this level, we only want the child groups
        var kids = siblings[j].slice(1, siblings[j].length);
        while (kids.length > 0 && kids[0].type === "meter") {
            kids = kids.slice(1, kids.length);
        }
        CalculateGroupTotals(kids);
    }
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


// Default view is to show all columns.  Every custom view starts by taking this and modifying values in it.  A json
// for a custom view will only need to have the column name and the fields that are changed.
// values to change:  display, displayName, width
var report_AllColumns = {
    reportName: "Complete",
    columnList: [
        {
            name: 'name', displayName: "Name", pinnedLeft: true, minWidth: 50, width: 200,
            filter: {
                placeholder: 'Name'
            },
            cellTooltip: function (row, col) {
                if (row.entity.number || row.entity.meter.addressLine1) {
                    return 'Accunt Number: ' + row.entity.number + ' Address: ' + row.entity.meter.addressLine1;
                }
            },
            cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                if (row.entity.type === "meter") {
                    return row.entity.meter.services;
                }
                return row.entity.type;
                // row.entity.meter.services[0].
            }
        },
        {
            name: 'number', visible: false, enableFiltering: false
        }
        ,
        {
            name: 'meter.addressLine1', displayName: "Address", visible: false, enableFiltering: false, minWidth: 100
        }
        ,
        {
            name: 'meter.eAmount',
            displayName: "Usage (kWh)",
            minWidth: 50, width: 110,
            cellClass: 'align-right usage ',
            enableFiltering: false,
            cellFilter: "numberFilter:'':0:' kWh'",
//            cellTemplate: '<div class="ui-grid-cell-contents visible_{{COL_FIELD}}" ><div class="usage-bar" style="width: 70px; height: 3px; background-color: #13678E; "></div>{{COL_FIELD}}</div>'
            cellTemplate: '<div class="ui-grid-cell-contents visible_{{COL_FIELD}}" ><div class="usage-bar {{row.entity.type}}" style="width: {{row.entity.meter.usageBarLength}}px; height: 3px; background-color: #13678E; "></div>{{COL_FIELD}}</div>'
        }
        ,
        {
            name: 'meter.usageChange',
            displayName: "Usage Change vs. Last Month",
            minWidth: 30, width: 60,
            cellFilter: "numberFilter:'':1:'%'",
            enableFiltering: false,
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.billableDemand',
            displayName: "Demand",
            minWidth: 30, width: 70,
            enableFiltering: false,
            cellFilter: "numberFilter:'':0:' kW'",
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.actualDemand',
            displayName: "Actual Demand",
            visible: false,
            enableFiltering: false,
            minWidth: 30, width: 70,
            cellFilter: "numberFilter:'':0:' kW'",
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.gAmount',
            displayName: "Therms",
            enableFiltering: false,
            minWidth: 30, width: 130,
            cellClass: 'align-right',
            cellFilter: "numberFilter:'':0:' Therms'"
        }
        ,
        {
            name: 'meter.kbtu',
            displayName: "kBTU",
            enableFiltering: false,
            minWidth: 30, width: 130,
            cellClass: 'align-right',
            cellFilter: "numberFilter:'':0:' kBTU'"
        }
        ,
        {
            name: 'meter.squareFootage',
            displayName: "Square Footage",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellClass: 'align-right',
            cellFilter: "numberFilter:'':0:''",
            cellTemplate: '<div class="ui-grid-cell-contents visible_{{COL_FIELD}}" >{{COL_FIELD}} ft<sup>2</sup></div>'
        }
        ,
        {
            name: 'meter.usagesqft',
            displayName: "Usage / Sq.Ft.",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellClass: 'align-right',
            cellTemplate: '<div class="ui-grid-cell-contents visible_{{COL_FIELD}}" >{{COL_FIELD.toFixed(2)}} kWh/ft<sup>2</sup></div>'
        }
        ,
        {
            name: 'meter.eCost',
            displayName: "Electricity Cost",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellFilter: "numberFilter:'$':2:''",
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.gCost',
            displayName: "Gas Cost",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellFilter: "numberFilter:'$':2:''",
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.totalcost',
            displayName: "Total Cost",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellFilter: "numberFilter:'$':2:''",
            cellClass: 'align-right'
        }
        ,
        {
            name: 'meter.costsqft',
            displayName: "Cost / Sq.Ft.",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellTemplate: '<div class="ui-grid-cell-contents align-right visible_{{COL_FIELD}}" >{{COL_FIELD.toFixed(3)}} $/ft<sup>2</sup></div>'
        }
        ,
        {
            name: 'meter.lastMoEUsage',
            displayName: "Previous Month Usage",
            minWidth: 30, width: 110,
            enableFiltering: false,
            cellClass: 'align-right',
            cellFilter: "numberFilter:'':0:' kWh'"
        }
        ,
        {
            name: 'meter.totalEmissions',
            displayName: "Emissions",
            minWidth: 30, width: 100,
            enableFiltering: false,
            cellClass: 'align-right',
            cellFilter: "numberFilter:'':0:' tons'"
        }
    ]
}

// custom column sets do not have all of the information.  Find the rest in the original list, and copy it.
function InitializeColumnSet(colset) {
    for (var x in colset.columnList) {
        var colDefault = GetDefaultColumnDefinition(colset.columnList[x].name);

        // first group: provide defaults only if the new one does not have a definition.
        if (typeof colset.columnList[x].displayName === 'undefined')
            colset.columnList[x].displayName = colDefault.displayName;
        if (typeof colset.columnList[x].width === 'undefined')
            colset.columnList[x].width = colDefault.width;
        if (typeof colset.columnList[x].visible === 'undefined')
            colset.columnList[x].visible = colDefault.visible;

        // second group: grab defaults when they exist.
        if (typeof colDefault.enableFiltering !== 'undefined')
            colset.columnList[x].enableFiltering = colDefault.enableFiltering;
        if (typeof colDefault.cellClass !== 'undefined')
            colset.columnList[x].cellClass = colDefault.cellClass;

    }
}


function GetDefaultColumnDefinition(name) {
    for (var y in report_AllColumns.columnList) {
        if (report_AllColumns.columnList[y].name === name) {
            return report_AllColumns.columnList[y];
        }
    }
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

    // our data arrives as a combination of 0 (number) and "23.45" (string)
    // we need to clean it, to be all numbers, when building this array.
    // we also need to add the labels to the beginning of each row.
    // enumeration is important, so for-in can't be used (order isn't guaranteed)

    // google charts are grouped by row.  Our rows are by year.  We want it to be grouped by month.
    // we need to flip the table (╯°□°）╯︵ ┻━┻
    /*
     var chartArray = new Array($trendData.labels.length + 1);
     for (var i = 0; i < chartArray.length; i++) {
     chartArray[i] = new Array($trendData.series.length + 1);
     }
     chartArray[0][0] = "Month";

     for (i = 0; i < $trendData.series.length; i++) {
     // a row has all the values for a year.
     var row = $trendData.series[i].data;
     chartArray[0][i + 1] = $trendData.series[i].label;
     for (var j = 0; j < row.length; j++) {
     chartArray[j + 1][0] = $trendData.labels[j];
     chartArray[j + 1][i + 1] = parseFloat(row[j]);
     }
     }

     return chartArray;
     */
}

