'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

// The login wil return the client ID.  For now, switch which line is active to view different sample accounts.
//var clientID = 6348558270;   // Airport:  three accounts, two groupings
var clientID = 555555;   // Campus:  one account

function getURLs() {
    var sources = "stub";

    if (sources === "livesite") {
        return {
            accountList: 'https://myaccount.xcelenergy.com/oam/user/getJsonAccounts.req'
        }
    }

    return {
        accountOverview: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php',
        accountList: 'settings/getJsonAccounts_' + clientID + '.json',  // not in stub because it is a crafted list for each sample client
        premiseList: 'http://powerstub.killamsolutions.ca/oam/user/getJsonPremiseOverview.php',  // Not needed - accountList gets teh same info, for every account.
        premiseUsages: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php',
        paymentHistory: 'http://powerstub.killamsolutions.ca/oam/user/getMyBillsAccounts.php',
        meterList: 'settings/meterlist_' + clientID + '.json'  // needs to be created by a settings page, currently crafted for demo
    };
}

powerControllers.filter('currencyFilter', function () {
    return function (value) {
        if (value) {
            var dec = value.toFixed(2);
            return '$' + dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };
});
powerControllers.filter('fractionFilter', function () {
    return function (value, places) {
        if (value) {
            var dec = value.toFixed(places);
            return dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };
});
powerControllers.filter('percentFilter', function () {
    return function (value, places) {
        if (value) {
            return value.toFixed(places) + '%';
        }
    };
});

powerControllers.factory("clientAccountSrv", ['$http', function ($http) {
    var accountOverview = null;

    function getData() {
        return accountOverview;
    }

    return {
        getData: getData,
        loadData: function () {
            if (accountOverview == null) {

                var myurl = getURLs().accountOverview + '?account=' + clientID;
                var promise = $http({
                    method: 'GET',
                    url: myurl
                })
                    .success(function (data, status, headers, config) {
                        accountOverview = data;
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
}]);

powerControllers.factory("accountListSrv", function ($http) {
    var primaryAccountNumber = clientID;
    var accountList = null;

    return {
        getData: function getData() {
            return accountList;
        },

        loadData: function () {
            if (accountList == null) {

                var myurl = getURLs().accountList + '?account=' + clientID;
                var promise = $http({
                    method: 'GET',
                    url: myurl
                })
                    .success(function (data, status, headers, config) {
                        accountList = data;
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });
                return promise;
            } else {
                return accountList;
            }
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


powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http', 'clientAccountSrv', 'accountListSrv',
    function ($scope, $http, clientAccountSrv, accountListSrv) {
        $scope.meterCount = 0;
        $scope.loadedMeters = 0;

        // if the account data is already loaded, grab and draw
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

        // make sure the premise list is loaded
        $scope.accountList = accountListSrv.getData();
        if ($scope.accountList == null) {
            // data needss to be loaded - use promise...then to load asynchronous.
            accountListSrv.loadData().then(function (promise) {
                $scope.accountList = promise.data;
                // load usage data for each meter in each account
                for (var i in $scope.accountList.accounts) {
                    for (var meterndx in $scope.accountList.accounts[i].premises) {
                        if ($scope.accountList.accounts[i].premises[meterndx].number) {
                            $scope.meterCount++;
                            getJsonAccountUsages($http, $scope, $scope.accountList.accounts[i].premises[meterndx].number);
                        }
                    }
                }
            });
        }

        $scope.template = getTemplates();
        $scope.orderProp = 'age';
    }]);

powerControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);


// Try to turn tree-view of json into flat view with $$level defined.
// treeview might be helpful in organizing groupings.  flat view is currently
// used to show the account report.
function markGroupLevels(groups, level) {
    for (var group in groups) {
        groups[group].level = level;

        for (var meter in groups[group].meters)
            groups[group].meters[meter].level = level + 1;

        if (groups[group].groups)
            markGroupLevels(groups[group].groups, level + 1);
    }
}

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



powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'accountListSrv',
    function ($scope, $routeParams, $http, clientAccountSrv, accountListSrv) {
        $scope.meterId = $routeParams.meterId;
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

        // TODO:  save changes in the column layout:  http://stackoverflow.com/questions/32346341/angular-ui-grid-save-and-restore-state

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableColumnResizing: true,
            enableGridMenu: true,
            showTreeExpandNoChildren: false,
            treeIndent: 20,
            columnDefs: [
                {
                    name: 'name', displayName: "Name", pinnedLeft: true, minWidth: 200,
                    cellTooltip: function (row, col) {
                        if (row.entity.number || row.entity.meter.addressLine1) {
                            return 'Accunt Number: ' + row.entity.number + ' Address: ' + row.entity.meter.addressLine1;
                        }
                    },
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        return row.entity.type;
                    }
                },
                {name: 'number', visible: false},
                {name: 'meter.addressLine1', displayName: "Address", visible: false, minWidth: 100},
                {
                    name: 'meter.eAmount',
                    displayName: "Usage (kWh)",
                    minWidth: 80,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                },
                {
                    name: 'meter.usageChange',
                    displayName: "Usage Change vs. Last Month",
                    minWidth: 60,
                    cellFilter: 'percentFilter:1',
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.billableDemand',
                    displayName: "Demand",
                    minWidth: 60,
                    enableFiltering: false,
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.actualDemand',
                    displayName: "Actual Demand",
                    visible: false,
                    minWidth: 60,
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.gAmount',
                    displayName: "Therms",
                    minWidth: 70,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                },
                {
                    name: 'meter.kbtu',
                    displayName: "kBTU",
                    minWidth: 100,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                },
                {
                    name: 'meter.squareFootage',
                    displayName: "Square Footage",
                    minWidth: 100,
                    enableFiltering: false,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                },
                {
                    name: 'meter.usagesqft',
                    displayName: "Usage / Sq.Ft.",
                    minWidth: 100,
                    enableFiltering: false,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:2'
                },
                {
                    name: 'meter.eCost',
                    displayName: "Electricity Cost",
                    minWidth: 100,
                    cellFilter: 'currencyFilter',
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.gCost',
                    displayName: "Gas Cost",
                    minWidth: 100,
                    cellFilter: 'currencyFilter',
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.totalcost',
                    displayName: "Total Cost",
                    minWidth: 100,
                    cellFilter: 'currencyFilter',
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.costsqft',
                    displayName: "Cost / Sq.Ft.",
                    minWidth: 100,
                    cellFilter: 'fractionFilter:3',
                    cellClass: 'align-right'
                },
                {
                    name: 'meter.lastMoEUsage',
                    displayName: "Previous Month Usage",
                    minWidth: 100,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                },
                {
                    name: 'meter.totalEmissions',
                    displayName: "Emissions",
                    minWidth: 100,
                    cellClass: 'align-right',
                    cellFilter: 'fractionFilter:0'
                }
            ]
        };


        // todo let the scrollbar for the page control the table as well, and don't use a second
        // scroll bar for the table.  Seems impossible with this tool.

        // todo: use the row type to create a class, then use icons for meters.  Groups have > adn v arrows.

        // make sure the account list has been loaded
        if (!$scope.accountList) {
            $scope.accountList = accountListSrv.getData();
        }

        // see if we need to force the data to load.
        if (!$scope.accountList) {
            // data not loaded - use promise...then to load asynchronous.
            accountListSrv.loadData().then(function (promise) {
                $scope.accountList = promise.data;
                CreateMeterListGrouping($scope.accountList.accounts);
            });
        }

        $scope.groupings = [];
        if ($scope.accountList) {
            $scope.metergroup = CreateMeterListGrouping($scope.accountList.accounts);
        }

        // load the groupings from the settings file, match to the account data.
        // TODO - split into separate function, because this one is a runon sentence
        $http.get('settings/meterlist_' + clientID + '.json').success(function (data) {
            data.groupings.push($scope.metergroup);
            $scope.groupings = data.groupings;

            // connect the data to the grid
            $scope.gridOptions.data = data.groupings[0].list;

            // create a "groupings" dropdown and initialize it to the first group
            $scope.groupIndex = 0;
            $scope.changedGrouping = function (item) {
                $scope.groupIndex = 1;
                var gs = document.getElementById('groupingSelect').value;
                for (var i in data.groupings) {
                    if (data.groupings[i].name === gs) {
                        $scope.groupIndex = i;
                    }
                }
                $scope.gridOptions.data = data.groupings[$scope.groupIndex].list;
            }

            // todo:  expand all of the level 1 items


            // todo:  compare premise list to grouping list, find new/deleted meters

            // match meters in the groupings to the account list
            for (var grp in data.groupings) {
                for (var meterndx in data.groupings[grp].list) {
                    if (data.groupings[grp].list[meterndx].number) {
                        var meter = getMeterFromID($scope, data.groupings[grp].list[meterndx].number);
                        data.groupings[grp].list[meterndx].meter = meter;
                        if (data.groupings[grp].list[meterndx].squareFootage > 0) {
                            meter.squareFootage = data.groupings[grp].list[meterndx].squareFootage;
                            if (meter.eAmount) {
                                meter.usagesqft = meter.eAmount / meter.squareFootage;
                            }
                            if (meter.totalcost) {
                                meter.costsqft = meter.totalcost / meter.squareFootage;
                            }
                        }
                    }
                }
                CalculateGroupTotals(data.groupings[grp].list);
            }
        });

        $scope.template = getTemplates();
    }]);


//-----------------------------------------
// Iterates through the data to find the specified number
function getMeterFromID($scope, $meterid) {
    //$scope.accountList.accounts[i].premises[meterndx].number
    for (var i in $scope.accountList.accounts) {
        for (var j in $scope.accountList.accounts[i].premises) {
            if ($scope.accountList.accounts[i].premises[j].number == $meterid) {
                return $scope.accountList.accounts[i].premises[j];
            }
        }
    }
}

function getJsonAccountUsages($http, $scope, $meterid) {
    // everyone should have a live salsa band playing while they do programming.  Just maybe not in the same room.
    var theurl = getURLs().premiseUsages + '?account=' + $meterid;
    $http.get(theurl).success(function (data) {
        var $meterid = data.number;
        var $meter = getMeterFromID($scope, $meterid);

        $meter.kbtu = 0;
        for (var index in data.overview) {
            if (data.overview[index].type === "ELECTRICITY-1") {
                $meter.eCost = data.overview[index].cost;
                $meter.eEmissions = data.overview[index].emissions;
                $meter.eAmount = data.overview[index].usage.amount;
                $meter.eUnits = data.overview[index].usage.unit;
                if ($meter.squareFootage > 0) {
                    $meter.usagesqft = $meter.eAmount / $meter.squareFootage;
                }
                $meter.kbtu += data.overview[index].usage.amount * 3.4121416416;  // formula: http://www.rapidtables.com/convert/energy/kWh_to_BTU.htm
            }
            if (data.overview[index].type === "NATURAL GAS-1") {
                $meter.gCost = data.overview[index].cost;
                $meter.gEmissions = data.overview[index].emissions;
                $meter.gAmount = data.overview[index].usage.amount;
                $meter.gUnits = data.overview[index].usage.unit;
                $meter.kbtu += data.overview[index].usage.amount * 100;  // formula: https://en.wikipedia.org/wiki/Therm
            }
        }
        $meter.kbtu = Math.round($meter.kbtu);
        $meter.totalcost = 0;
        if ($meter.eCost) {
            $meter.totalcost += $meter.eCost;
        }
        if ($meter.gCost) {
            $meter.totalcost += $meter.gCost;
        }
        $meter.totalEmissions = 0;
        if ($meter.eEmissions) {
            $meter.totalEmissions += $meter.eEmissions;
        }
        if ($meter.gEmissions) {
            $meter.totalEmissions += $meter.gEmissions;
        }
        if ($meter.squareFootage > 0) {
            $meter.costsqft = $meter.totalcost / $meter.squareFootage;
        }

        // demand: meter.usage.services[0].reads[0].details[0].amount
        for (var index in data.services) {
            if (data.services[index].name === "ELECTRICITY-1") {
                // most recent read is reads[0]
                for (var z in data.services[index].reads[0].details) {
                    if (data.services[index].reads[0].details[z].label === "Actual Demand") {
                        $meter.actualDemand = data.services[index].reads[0].details[z].amount;
                    }
                    if (data.services[index].reads[0].details[z].label === "Billable Demand") {
                        $meter.billableDemand = data.services[index].reads[0].details[z].amount;
                    }
                }
                // previous month
                $meter.lastMoEUsage = data.services[index].reads[1].usage.amount;
                for (var z in data.services[index].reads[1].details) {
                    if (data.services[index].reads[1].details[z].label === "Actual Demand") {
                        $meter.lastMoActualDemand = data.services[index].reads[1].details[z].amount;
                    }
                    if (data.services[index].reads[1].details[z].label === "Billable Demand") {
                        $meter.lastMoBillableDemand = data.services[index].reads[1].details[z].amount;
                    }
                }
            }
        }

        if ($meter.eAmount && $meter.lastMoEUsage) {
            $meter.usageChange = ($meter.lastMoEUsage - $meter.eAmount) / $meter.lastMoEUsage * 100;
        }

        $scope.loadedMeters++;
        $meter.usage = data;

        var loadingbar = document.getElementById("counter");
        if (loadingbar && loadingbar.core) {
            loadingbar.core.refresh();
        }
    })
}

function getTemplates() {
    return {
        "topbar": "partials/topbar.html",
        "accountmenu": "partials/accountmenu.html",
        "groupofmeters": "partials/groupofmeters.html",
        "currentbill": "partials/currentbillsummary.html"
    };
}

function CalculateGroupTotals(meters) {
    if (meters.length < 1)
        return;

    // check top item in list to find out current level
    var curlevel = meters[0].$$treeLevel;
    var siblings = [];
    var slicebegin = 0;

    //divide this list into a set of lists beginning at this level, breaking each time an item is found at the current level
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


// the Settings page uses a different mechcanism than the reports page.  the ui.grid in the reports
// will not allow items to be moved, or expanded and edited.  There will need to be some sort of reworking
// or conversion to use the actual meterList.
powerControllers.controller('SettingsCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv',
    function ($scope, $routeParams, $http, clientAccountSrv) {
        $scope.meterId = $routeParams.meterId;

        $scope.clientAccount = clientAccountSrv.getData();

        $http.get('settings/meters.json').success(function (data) {
            $scope.groupings = data.groupings;

            // initialize expanded and indentation levels
            for (var account in $scope.groupings.accounts) {
                $scope.groupings.accounts[account].expanded = true;
                $scope.groupings.children = $scope.groupings.accounts[account].groups;
                markGroupLevels($scope.groupings.accounts[account].groups, 1);
            }
        });

        $scope.template = getTemplates();

    }]);


