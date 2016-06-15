'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

function getURLs() {
    var sources = "stub";

    return {
        accountOverview: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php',
        accountUsages: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php',
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

                var promise = $http({
                    method: 'GET',
                    url: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php?account=6348558270'
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


powerControllers.controller('ClientAccountsCtrl', ['$scope', '$http', 'clientAccountSrv',
    function ($scope, $http, clientAccountSrv) {

        // if the data is already loaded, grab and draw
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

        $http.get('phones/phones.json').success(function (data) {
            $scope.phones = data;
        });


        $scope.template = getTemplates();
        $scope.orderProp = 'age';
    }]);

powerControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);


function markGroupLevels(groups, level) {
    for (var group in groups) {
        groups[group].level = level;

        for (var meter in groups[group].meters)
            groups[group].meters[meter].level = level + 1;

        if (groups[group].groups)
            markGroupLevels(groups[group].groups, level + 1);
    }
}

powerControllers.controller('DetailReportCtrl', ['$scope', '$routeParams', '$http', 'clientAccountSrv',
    function ($scope, $routeParams, $http, clientAccountSrv) {
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
                {name: 'addressLine1', width: '15%', displayName: "Address"},
                {name: 'eAmount', width: '7%', displayName: "kWh"},
                {name: 'eCost', width: '15%', displayName: "Electricity Cost"},
                {name: 'gAmount', width: '10%', displayName: "Therms"},
                {name: 'gCost', width: '12%', displayName: "Gas Cost"}
            ]
        };

        // todo let the scrollbar for the page control the table as well, and don't use a second scroll bar for the table.
        //row.treeNode.state === 'expanded'

//        $http.get('settings/meters.json').success(function (data) {
        $http.get('settings/meterlist.json').success(function (data) {
            $scope.meters = data;

            // create a dropdown and initialize it to the first group
            //$scope.selectedGrouping = data.groupings[0].name;
            $scope.groupIndex = 0;
            $scope.selectedGrouping = data.groupings[0];
            $scope.changedGrouping = function (item) {
                $scope.groupIndex = 1;
                $scope.gridOptions.data = data.groupings[1].list;
            }

            // todo:  expand all of the level 1 items

            $scope.gridOptions.data = data.groupings[0].list;


            // todo:  load account info and compare it to meter list, find new/deleted meters

            // load usage data for each meter
            for (var meterndx in data.groupings[0].list) {
                if (data.groupings[0].list[meterndx].number) {
                    $scope.meterCount++;
//                    wait(2000);
                    getJsonAccountUsages($http, $scope, meterndx);
                }
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
    var $meter = $scope.meters.groupings[0].list[meterndx];
    var $meterid = $meter.number;
    // everyone should have a live salsa band playing while they do programming.  Just maybe not in the same room.
    var theurl = 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php?account=' + $meterid;
    $http.get(theurl).success(function (data) {
        //$http.get('http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php?account='+$meterid).success(function (data) {
        $meter.overview = data;
        $meter.addressLine1 = data.addressLine1;

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
        if ($scope.loadedMeters == $scope.meterCount) {
            CalculateGroupTotals($scope.meters.groupings[0].list);
        }

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
                    eAmount: a.eAmount + b.eAmount,
                    eCost: a.eCost + b.eCost,
                    gAmount: a.gAmount + b.gAmount,
                    gCost: a.gCost + b.gCost
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

        siblings[j][0].eAmount = totals.eAmount;
        siblings[j][0].eCost = totals.eCost;
        siblings[j][0].gAmount = totals.gAmount;
        siblings[j][0].gCost = totals.gCost;
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


