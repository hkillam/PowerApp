'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

function getURLs() {
    var sources = "stub";

    return {
        accountOverview: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php',
        premiseList: 'http://powerstub.killamsolutions.ca/oam/user/getJsonPremiseOverview.php',
        premiseUsages: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php',
        paymentHistory: 'http://powerstub.killamsolutions.ca/oam/user/getMyBillsAccounts.php',
        meterList: 'settings/meterlist.json'
    };
}

powerControllers.factory("clientAccountSrv", function ($http) {
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

                        // TODO:  trigger more data loads here, to store on this service object, so that next pages load faster
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
});

powerControllers.factory("premiseListSrv", function ($http) {
    var premiseList = null;

    function getData() {
        return premiseList;
    }

    return {
        getData: getData,
        loadData: function () {
            if (premiseList == null) {

                var myurl = getURLs().premiseList + '?account=6348558270';
                var promise = $http({
                    method: 'GET',
                    url: myurl
                })
                    .success(function (data, status, headers, config) {
                        premiseList = data;
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });
                return promise;
            } else {
                return premiseList;
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


powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http', 'clientAccountSrv', 'premiseListSrv',
    function ($scope, $http, clientAccountSrv, premiseListSrv) {

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
        $scope.premiseList = premiseListSrv.getData();
        if ($scope.premiseList == null) {
            // data not loaded - use promise...then to load asynchronous.
            premiseListSrv.loadData().then(function (promise) {
                $scope.premiseList = promise.data;
                // load usage data for each meter
                for (var meterndx in $scope.premiseList.premises) {
                    if ($scope.premiseList.premises[meterndx].number) {
                        $scope.meterCount++;
                        getJsonAccountUsages($http, $scope, meterndx);
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
function markGroupLevels(groups, level) {
    for (var group in groups) {
        groups[group].level = level;

        for (var meter in groups[group].meters)
            groups[group].meters[meter].level = level + 1;

        if (groups[group].groups)
            markGroupLevels(groups[group].groups, level + 1);
    }
}

powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv', 'premiseListSrv',
    function ($scope, $routeParams, $http, clientAccountSrv, premiseListSrv) {
        $scope.meterId = $routeParams.meterId;

        $scope.clientAccount = clientAccountSrv.getData();
        $scope.meterCount = 0;
        $scope.loadedMeters = 0;

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            showTreeExpandNoChildren: false,
            treeIndent: 20,
            columnDefs: [
                {name: 'name', width: '15%'},
                {name: 'number', width: '15%'},
                {name: 'meter.addressLine1', width: '15%', displayName: "Address"},
                {name: 'meter.eAmount', width: '7%', displayName: "kWh"},
                {name: 'meter.eCost', width: '15%', displayName: "Electricity Cost"},
                {name: 'meter.gAmount', width: '10%', displayName: "Therms"},
                {name: 'meter.gCost', width: '12%', displayName: "Gas Cost"}
            ]
        };

        // todo let the scrollbar for the page control the table as well, and don't use a second scroll bar for the table.

        $http.get('settings/meterlist.json').success(function (data) {
            $scope.meters = data;
            if (!$scope.premiseList) {
                $scope.premiseList = premiseListSrv.getData();
            }

            // create a dropdown and initialize it to the first group
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

            // match meters in the groupings to the premise list
            for (var grp in data.groupings) {
                for (var meterndx in data.groupings[grp].list) {
                    if (data.groupings[grp].list[meterndx].number) {
                        for (var i in $scope.premiseList.premises) {
                            if ($scope.premiseList.premises[i].number == data.groupings[grp].list[meterndx].number) {
                                data.groupings[grp].list[meterndx].meter = $scope.premiseList.premises[i];
                            }
                        }
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

function getJsonAccountUsages($http, $scope, meterndx) {
    var $meter = $scope.premiseList.premises[meterndx];
    var $meterid = $meter.number;
    // everyone should have a live salsa band playing while they do programming.  Just maybe not in the same room.
    //var theurl = 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php?account=' + $meterid;
    var theurl = getURLs().premiseUsages + '?account=' + $meterid;
    $http.get(theurl).success(function (data) {
        //var $meter = $scope.premiseList.premises[meterndx];
        var $meterid = data.number;
        $meter.overview = data;
        //$meter.addressLine1 = data.addressLine1;

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

//        $scope.$apply();
        var loadingbar = document.getElementById("counter");
        if (loadingbar && loadingbar.core) {
            loadingbar.core.refresh();
        }
        //document.getElementById("grid1").core.refresh();
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
            $scope.meters = data;

            // initialize expanded and indentation levels
            for (var account in $scope.meters.accounts) {
                $scope.meters.accounts[account].expanded = true;
                $scope.meters.children = $scope.meters.accounts[account].groups;
                markGroupLevels($scope.meters.accounts[account].groups, 1);
            }
        });

        $scope.template = getTemplates();

    }]);


