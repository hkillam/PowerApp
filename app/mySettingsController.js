define([], function (app) {
    'use strict';


    function mySettingsController($scope, $http, powerAppDataService) {
        $scope.clientAccount = powerAppDataService.getAccountOverview();

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
    }

    mySettingsController.$inject = ['$scope', '$http', 'powerAppDataService', 'GraphData'];
    return mySettingsController;

});
