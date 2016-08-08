define([], function (app) {
    'use strict';

    //  TODO:  have a session login that returns a client number.  Currently using a global variable for clientID.
// The login wil return the client ID.  For now, switch which line is active to view different sample accounts.
//var clientID = 6348558270;   // Airport:  three accounts, two groupings
    var clientID = 555555;   // Campus:  one account

    function factoryFunc($http, $resource) {
        var AccountOverview = null;
        var primaryAccountNumber = clientID;
        var accountList = null;

        var svc = {
            getAccountList: function getAccountList() {
                return accountList;
            },
            getAccountOverview: function getAccountOverview() {
                return AccountOverview;
            },

            loadAccountList: loadAccountList,
            loadAccountOverview: loadAccountOverview,
            loadGroupings: loadGroupings,
            loadReports: loadReports,
            loadAccountsAndUsages: loadAccountsAndUsages,
            loadAccountUsage: loadAccountUsage,
            getAllColumnsReport: getAllColumnsReport
        };

        return svc;

        function getURLs() {
            var sources = "stub";

            if (sources === "livesite") {
                return {
                    accountList: 'https://myaccount.xcelenergy.com/oam/user/getJsonAccounts.req'
                }
            }

            return {
                // data
                accountOverview: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountOverview.php',
                premiseList: 'http://powerstub.killamsolutions.ca/oam/user/getJsonPremiseOverview.php',  // Not needed - accountList gets teh same info, for every account.
                premiseUsages: 'http://powerstub.killamsolutions.ca/oam/user/getJsonAccountUsages.php',
                paymentHistory: 'http://powerstub.killamsolutions.ca/oam/user/getMyBillsAccounts.php',
                // settings
                accountList: 'settings/getJsonAccounts_' + clientID + '.json',  // not in stub because it is a crafted list for each sample client
                meterList: 'settings/meterlist_' + clientID + '.json'  // needs to be created by a settings page, currently crafted for demo
            };
        }

        function loadAccountList() {
            if (accountList == null) {

                var myurl = getURLs().accountList + '?account=' + clientID;
                var promise = $http({method: 'GET', url: myurl})
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


// load the groupings from the settings file, match to the account data.
// called from the controller during setup.
        function loadGroupings($scope, clientID) {
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
                };
                $scope.changedServices = function (item) {
                    $scope.serviceIndex = 1;
                    var gs = document.getElementById('serviceSelect').value;
                };
                MatchGroupingsToAccounts($scope);
            });
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


        function loadAccountOverview() {
            if (AccountOverview == null) {

                var myurl = getURLs().accountOverview + '?account=' + clientID;
                var promise = $http({
                    method: 'GET',
                    url: myurl
                })
                    .success(function (data, status, headers, config) {
                        AccountOverview = data;
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });
                return promise;
            } else {
                return AccountOverview;
            }
        }

        function GetDefaultColumnDefinition(name, report_AllColumns) {
            for (var y in report_AllColumns.columnList) {
                if (report_AllColumns.columnList[y].name === name) {
                    return report_AllColumns.columnList[y];
                }
            }
        }

// custom column sets do not have all of the information.  Find the rest in the original list, and copy it.
        function InitializeColumnSet(colset, rptAllColumns) {
            for (var x in colset.columnList) {
                var colDefault = GetDefaultColumnDefinition(colset.columnList[x].name, rptAllColumns);

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


        function loadReports($scope, clientID) {
            var settingsurl = 'settings/columns_' + clientID + '.json';
            $http({
                method: 'GET',
                url: settingsurl
            }).then(function successCallback(response) {
                //response.data.columnsets;
                $scope.reports.push($scope.report_AllColumns);
                for (var x in response.data.columnsets) {
                    InitializeColumnSet(response.data.columnsets[x], $scope.report_AllColumns);
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

// TODO:  see if we need to make more asynch calls inside here
// Loading the AccountList is asynch, but loading each usage record is not.
        function loadAccountsAndUsages($scope) {
            if (accountList == null) {
                // data needss to be loaded - use promise...then to load asynchronous.
                loadAccountList().then(function (promise) {
                    $scope.accountList = promise.data;
                    $scope.metergroup = CreateMeterListGrouping($scope.accountList.accounts);
                    // load usage data for each meter in each account
                    for (var i in $scope.accountList.accounts) {
                        for (var meterndx in $scope.accountList.accounts[i].premises) {
                            if ($scope.accountList.accounts[i].premises[meterndx].number) {
                                $scope.meterCount++;
                                loadAccountUsage($scope, $scope.accountList.accounts[i].premises[meterndx].number);
                            }
                        }
                    }
                });
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

        function calculateUsageBarLength($scope) {

            // zoom through the list of meters and find the largest values
            $scope.maxUsage = 0;
            for (var i in $scope.accountList.accounts) {
                for (var j in $scope.accountList.accounts[i].premises) {
                    if ($scope.accountList.accounts[i].premises[j].eAmount) {
                        $scope.maxUsage = Math.max($scope.maxUsage, $scope.accountList.accounts[i].premises[j].eAmount);
                    }
                }
            }

            // calculations
            for (var i in $scope.accountList.accounts) {
                for (var j in $scope.accountList.accounts[i].premises) {
                    if ($scope.accountList.accounts[i].premises[j].eAmount) {

                        // usage bar length:  max is 100, find proportions
                        $scope.accountList.accounts[i].premises[j].usageBarLength = Math.round($scope.accountList.accounts[i].premises[j].eAmount / $scope.maxUsage * 100);
                    } else {
                        $scope.accountList.accounts[i].premises[j].usageBarLength = 0;
                    }
                }
            }


        }


        function loadAccountUsage($scope, $meterid) {
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

                // When we have all the meters loaded, do some calculations.
                if ($scope.loadedMeters == $scope.meterCount) {
                    calculateUsageBarLength($scope);
                }

                var loadingbar = document.getElementById("counter");
                if (loadingbar && loadingbar.core) {
                    loadingbar.core.refresh();
                }
            })
        }

        function getAllColumnsReport() {
            return {
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
                        name: 'meter.addressLine1',
                        displayName: "Address",
                        visible: false,
                        enableFiltering: false,
                        minWidth: 100
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
            };
        }
    }

    factoryFunc.$inject = ['$http', '$resource'];

    return factoryFunc;
});


