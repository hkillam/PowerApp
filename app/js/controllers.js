'use strict';

/* Controllers */

var powerControllers = angular.module('powerControllers', []);

// The login wil return the client ID.  For now, switch which line is active to view different sample accounts.
//var clientID = 6348558270;   // Airport:  three accounts, two groupings
var clientID = 555555;   // Campus:  one account
var googleChartsLoaded = false;  // so that the load stuff is only called once

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

powerControllers.filter('numberFilter', function () {
    return function (value, prefix, places, suffix) {
        if (value) {
            var dec = value.toFixed(places);
            dec = dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return prefix + dec + suffix;
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

function plotData($chartArray) {
    if (googleChartsLoaded == false) {
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(function () {
            drawGoogleChart($chartArray)
            googleChartsLoaded = true;
        })
    } else {
        drawGoogleChart($chartArray);
    }
}


function drawGoogleChart($chartArray) {

    try {
        var data = google.visualization.arrayToDataTable($chartArray);
    } catch (err) {
        alert(err.message);
    }

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
            plotData(chartData);
        } else {
            // data not loaded yet - use promise... and draw the chart when the data is done loading.
            clientAccountSrv.loadData().then(function (promise) {
                $scope.clientAccount = promise.data;
                var chartData = prepareTrendData($scope.clientAccount.trendData);
                plotData(chartData);
            });
        }

        // Trigger loading for all usage info, so that it loads in the background
        LoadAccountsAndUsages($http, $scope, accountListSrv);

        $scope.template = getTemplates();
        $scope.orderProp = 'age';
    }]);

powerControllers.controller('AccountDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.meterId = $routeParams.meterId;
    }]);

// TODO:  see if we need to make more asynch calls inside here
// Loading the AccountList is asynch, but loading each usage record is not.
function LoadAccountsAndUsages($http, $scope, accountListSrv) {
    $scope.accountList = accountListSrv.getData();
    if ($scope.accountList == null) {
        // data needss to be loaded - use promise...then to load asynchronous.
        accountListSrv.loadData().then(function (promise) {
            $scope.accountList = promise.data;
            $scope.metergroup = CreateMeterListGrouping($scope.accountList.accounts);
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
}


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


// the Settings page uses a different mechanism than the reports page.  the ui.grid in the reports
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


