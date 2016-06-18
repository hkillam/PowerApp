'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

function getURLs() {
    var sources = "stub";

    if ("sources" === "livesite") {
        return {
            accountList: 'https://myaccount.xcelenergy.com/oam/user/getJsonAccounts.req'
        }
    }

    return {
        accountOverview: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php',
        accountList: 'settings/getJsonAccounts.json',  // TODO move this to stub
        premiseList: 'http://powerstub.killamsolutions.ca/oam/user/getJsonPremiseOverview.php',  // Not needed - accountList gets teh same info, for every account.
        premiseUsages: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php',
        paymentHistory: 'http://powerstub.killamsolutions.ca/oam/user/getMyBillsAccounts.php',
        meterList: 'settings/meterlist.json'
    };


}

powerControllers.factory("clientAccountSrv", ['$http', function ($http) {
    var accountOverview = null;

    function getData() {
        return accountOverview;
    }

    return {
        getData: getData,
        loadData: function () {
            if (accountOverview == null) {

                var myurl = getURLs().accountOverview + '?account=6348558270';
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
    var primaryAccountNumber = 6348558270;  // TODO - this should be returned at login, not by hard coding.
    var accountList = null;

    return {
        getData: function getData() {
            return accountList;
        },

        loadData: function () {
            if (accountList == null) {

                var myurl = getURLs().accountList + '?account=6348558270';
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

powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'accountListSrv',
    function ($scope, $routeParams, $http, clientAccountSrv, accountListSrv) {
        $scope.meterId = $routeParams.meterId;
        $scope.clientAccount = clientAccountSrv.getData();

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableColumnResizing: true,
            showTreeExpandNoChildren: false,
            treeIndent: 20,
            columnDefs: [
                {name: 'name'},
                {name: 'number'},
                {name: 'meter.addressLine1', displayName: "Address", maxWidth: 200, minWidth: 70},
                {name: 'meter.eAmount', displayName: "kWh", maxWidth: 200, minWidth: 70},
                {name: 'meter.eCost', displayName: "Electricity Cost"},
                {name: 'meter.gAmount', displayName: "Therms"},
                {name: 'meter.gCost', displayName: "Gas Cost"}
            ]
        };

        // todo let the scrollbar for the page control the table as well, and don't use a second
        // scroll bar for the table.  Seems impossible with this tool.

        // make sure the account list has been loaded
        if (!$scope.accountList) {
            $scope.accountList = accountListSrv.getData();
        }

        // create default groupings from the meter list.
        $scope.groupings = {name: 'Accounts', list: []};
        for (var i in $scope.accountList.accounts) {
            var acct = $scope.accountList.accounts[i];
            $scope.groupings.list.push({type: "account", number: acct.number, name: acct.number, $$treeLevel: 0});
            for (var j in acct.premises) {
                var meter = acct.premises[j];
                $scope.groupings.list.push({type: "meter", number: meter.number, name: meter.number});
            }
        }

        // load the groupings from the settings file, match to the account data.
        // TODO - split into separate function
        $http.get('settings/meterlist.json').success(function (data) {
            data.groupings.push($scope.groupings);
            $scope.groupings = data.groupings;

            // create a "groupings" dropdown and initialize it to the first group
            $scope.groupIndex = 0;
            $scope.gridOptions.data = data.groupings[$scope.groupIndex].list;
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
                        data.groupings[grp].list[meterndx].meter = getMeterFromID($scope, data.groupings[grp].list[meterndx].number);
                    }
                }
                CalculateGroupTotals(data.groupings[grp].list);
            }
        });

        $scope.template = getTemplates();
    }]);

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

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

        for (var index in data.overview) {

            if (data.overview[index].type === "ELECTRICITY-1") {
                $meter.eCost = data.overview[index].cost;
                $meter.eEmissions = data.overview[index].emissions;
                $meter.eAmount = data.overview[index].usage.amount;
                $meter.eUnits = data.overview[index].usage.unit;
            }
            if (data.overview[index].type === "NATURAL GAS-1") {
                $meter.gCost = data.overview[index].cost;
                $meter.gEmissions = data.overview[index].emissions;
                $meter.gAmount = data.overview[index].usage.amount;
                $meter.gUnits = data.overview[index].usage.unit;
            }
        }

        $scope.loadedMeters++;
        $meter.usage = data;

        var loadingbar = document.getElementById("counter");
        if (loadingbar && loadingbar.core) {
            loadingbar.core.refresh();
        }
    });
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
                    eAmount: a.eAmount + b.meter.eAmount,
                    eCost: a.eCost + b.meter.eCost,
                    gAmount: a.gAmount + b.meter.gAmount,
                    gCost: a.gCost + b.meter.gCost
                };
            } else {
                return ( a );
            }
        }, {
            eAmount: 0,
            eCost: 0,
            gAmount: 0,
            gCost: 0
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


