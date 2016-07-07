'use strict';


powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'accountListSrv',
    function ($scope, $routeParams, $http, clientAccountSrv, accountListSrv) {
        $scope.meterId = $routeParams.meterId;
        $scope.groupings = [];
        $scope.services = [];
        $scope.reports = [];
        $scope.template = getTemplates();
        $scope.clientAccount = clientAccountSrv.getData();
        if (!$scope.clientAccount) {
            // data not loaded - use promise...then to load asynchronous.
            clientAccountSrv.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
            });
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

        SetupGridOptions($scope);

        // see if we need to force the data to load, and put the rest of the initialization inside the callback
        LoadAccountsAndUsages($http, $scope, accountListSrv);

        // create a few charts to represent the data
        if (googleChartsLoaded == false) {
            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(function () {
                var usageData = prepareUsageData();
                var demandData = prepareDemandData();
                drawDemandChart(demandData);
                drawUsageChart(usageData);
                googleChartsLoaded = true;
            })
        } else {
            var usageData = prepareUsageData();
            var demandData = prepareDemandData();
            drawDemandChart(demandData);
            drawUsageChart(usageData);
        }

        LoadGroupings($scope, $http, clientID);
        LoadReports($scope, $http, clientID);

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
                $scope.reportIndex = 0;
                $scope.changedReport = function (item) {
                    $scope.reportIndex = 1;
                    var rpt = document.getElementById('reportSelect').value;
                    for (var i in $scope.reports) {
                        if ($scope.reports[i].reportName === rpt) {
                            $scope.reportIndex = i;
                        }
                    }
                    $scope.gridOptions.columnDefs = $scope.reports[$scope.reportIndex].columnList;
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
        $scope.changedGrouping = function (item) {
            $scope.groupIndex = 1;
            var gs = document.getElementById('groupingSelect').value;
            for (var i in $scope.groupings) {
                if ($scope.groupings[i].name === gs) {
                    $scope.groupIndex = i;
                }
            }
            $scope.gridOptions.data = $scope.groupings[$scope.groupIndex].list;
        }
        $scope.changedServices = function (item) {
            $scope.serviceIndex = 1;
            var gs = document.getElementById('serviceSelect').value;
        }

        MatchGroupingsToAccounts($scope);
    });

}

//
// Create the default grouping from the list of accounts & premises.
// called from report controller  CreateMeterListGrouping($scope.accountList.accounts);
function CreateMeterListGrouping(accounts) {
    // create default groupings from the meter list.
    var meterlistgrouping = {name: 'Accounts', list: []};
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

function SetupGridOptions($scope) {
    // TODO:  save changes in the column layout:  http://stackoverflow.com/questions/32346341/angular-ui-grid-save-and-restore-state

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        enableColumnResizing: true,
        enableGridMenu: true,
        showTreeExpandNoChildren: false,
        treeIndent: 20,
        enablePinning: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerDataChangeCallback(function () {
                $scope.gridApi.treeBase.expandAllRows();
            });
        },
        columnDefs: report_AllColumns.columnList
    };
    $scope.currentReport = report_AllColumns.reportName;

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

function prepareUsageData() {
    var data = google.visualization.arrayToDataTable([
        ['Meter', 'kWh'],
        ['Greenwood Village Electric', 11],
        ['North Building', 2],
        ['Studio A', 2],
        ['Studio B', 2],
        ['Side Annex', 7]
    ]);
    return data;
}

function prepareDemandData() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Meter', 'kW', 'cost / sq. ft.'],
        ['Greenwood Village Electric', 165, 938],
        ['North Building', 135, 1120],
        ['Studio A', 157, 1167],
        ['Studio B', 139, 1110],
        ['Side Annex', 136, 691]
    ]);
    return data;
}

function drawUsageChart($chartArray) {
    var options = {
        title: 'Usage (kWh)',
        //legend: {position: 'bottom'},
        is3D: true,
        legend: 'none',
        pieSliceText: 'label',
        colors: ['#0093B4', '#50e500', '#edfd00', '#f00034', '#8b00bd', '#ffc600', '#FF7F00', '#1200c3'],
        animation: {
            startup: true,
            easing: "in",
            duration: 500
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('usage_chart_div'));
    chart.draw($chartArray, options);
}

function drawDemandChart($chartArray) {
    var options = {
        title: 'Demand + Cost pre square foot',
        vAxis: {title: 'kW'},
        seriesType: 'bars',
        legend: {position: 'bottom'},
        colors: ['#66c2d9', '#005b85'],
        series: {
            1: {
                type: 'line',
                targetAxisIndex: 1
            }
        },
        vAxes: {
            1: {
                title: 'Cost / sq. ft.',
                textStyle: {color: '#005b85'}
            }
        },
        animation: {
            startup: true,
            easing: "in",
            duration: 500
        }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('demand_chart_div'));
    chart.draw($chartArray, options);
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
            cellClass: 'align-right',
            enableFiltering: false,
            cellFilter: "numberFilter:'':0:' kWh'"
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
