define([], function (app) {
    'use strict';


    function mySettingsController($scope, $http, powerAppDataService) {
        $scope.template = getTemplates();
        $scope.showgraphSidebar = true;
        $scope.clientAccount = powerAppDataService.getAccountOverview();
        powerAppDataService.loadGroupings($scope);

        groupingsToDND($scope);

        $scope.$watch('models.dropzones', function (model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    }

    mySettingsController.$inject = ['$scope', '$http', 'powerAppDataService'];
    return mySettingsController;


    // Converts the data structure of groupings so that the drag and drop tool can use it
    // the ui.grid tree is a flat list, using $$treeLevel to generate tree information
    // the drag and drop data has to be tree shaped, so conversion is needed to reshape the same data to use in two tools.
    function groupingsToDND($scope) {

        $scope.models = {
            selected: null,
            templates: [
                {type: "group", id: "New Group", columns: [[]]}
            ],
            dropzones: {
                "A": []
            },
            sourcezones: {
                "src": []
            }
        };

        createDropzone($scope.models.dropzones.A, $scope.selectedGrouping.list);
        for (var i in $scope.groupings) {
            if ($scope.groupings[i].name === "Meters") {
                createDropzone($scope.models.sourcezones.src, $scope.groupings[i].list);
            }
        }
    }

    function createDropzone(dz, grouping) {
        var currlevel = -1;
        var currgrp = dz;
        for (var i in grouping) {
            var item = grouping[i];
            if (item.name !== "TOTALS") {
                var newitem = {
                    "type": item.type,
                    "id": item.number,
                    "name": item.name
                };
                if (item.squareFootage) newitem.squareFootage = item.squareFootage;
                if (item.annualBudget) newitem.annualBudget = item.annualBudget;
                if (item.meter.services) newitem.services = item.meter.services;

                // see if we need a different branch
                if (item.type === "group" || item.$$treeLevel <= currlevel) {
                    currgrp = dz;
                    for (var j = 1; j < item.$$treeLevel; j++) {
                        currgrp = currgrp[currgrp.length - 1].columns[0];
                    }
                }

                currgrp.push(newitem);

                // hold on to the most recent group created, so we can add things.
                if (item.type === "group") {
                    currlevel = item.$$treeLevel;
                    newitem.columns = [[]];
                    currgrp = newitem.columns[0];
                }
            }
        }
    }


});
