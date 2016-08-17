define(['app/config',
        'app/powerAppDataService',
        'app/myUsageController',
        'app/myAccountsController',
        'app/mySettingsController',
        'app/ideaDetailsController',
        'app/GraphData'],
    function (config, powerAppDataService, myUsageController, myAccountsController, mySettingsController, ideaDetailsController, GraphData) {
        'use strict';

        var app = angular.module('powerApp', ['ngRoute', 'ngResource',
            'ui.grid.treeView', 'ui.grid.resizeColumns', 'ui.grid.moveColumns',
            'ui.grid.pinning', 'ui.grid.selection', 'dndLists']);

        app.filter('numberFilter', function () {
            return function (value, prefix, places, suffix) {
                if (value) {
                    var dec = value.toFixed(places);
                    dec = dec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return prefix + dec + suffix;
                }
            };
        });

        app.config(config);
        app.factory('powerAppDataService', powerAppDataService);
        app.factory('GraphData', GraphData);
        app.controller('myUsageController', myUsageController);
        app.controller('myAccountsController', myAccountsController);
        app.controller('ideaDetailsController', ideaDetailsController);
        app.controller('mySettingsController', mySettingsController);
    });

function getTemplates() {
    return {
        "topbar": "./partials/topbar.html",
        "accountmenu": "./partials/accountmenu.html",
        "groupofmeters": "./partials/groupofmeters.html",
        "currentbill": "./partials/currentbillsummary.html",
        "tipbar": "./partials/tipbar.html"
    };
}