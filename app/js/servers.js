/**
 * Created by Heather on 2016-06-23.
 *
 *  Load the data once, and share it with all of the controllers.  Trigger background loading as soon as possible.
 *
 */

//  TODO:  have a session login that returns a client number.  Currently using a global variable for clientID.
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


