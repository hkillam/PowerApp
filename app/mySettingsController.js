define([], function (app) {
    'use strict';


    function mySettingsController($scope, $http, powerAppDataService) {
        $scope.template = getTemplates();
        $scope.showgraphSidebar = true;
        $scope.clientAccount = powerAppDataService.getAccountOverview();
        powerAppDataService.loadGroupings($scope);


        // replace scope.models.dropzones[A] with scope.groupings[0]
        // do not need dropzones
        // re-label templates

        $scope.models2 = {
            selected: null,
            templates: [
                {type: "meter", id: 2},
                {type: "group", id: 1, columns: [[], []]}
            ],
            dropzones: {
                "A": [
                    {
                        "type": "group",
                        "id": "Totals",
                        "columns": [
                            [
                                {
                                    "type": "group",
                                    "id": "Greenwood Village Office",
                                    "columns": [

                                        {
                                            "type": "meter",
                                            "id": "Greenwood Village Electric"
                                        },
                                        {
                                            "type": "meter",
                                            "id": "Greenwood Village Gas"
                                        }
                                    ]
                                },
                                {
                                    "type": "group",
                                    "id": "School of Dance",
                                    "columns": [

                                        {
                                            "type": "meter",
                                            "id": "North Building"
                                        },
                                        {
                                            "type": "meter",
                                            "id": "Greenwood Village Gas"
                                        }
                                    ]
                                }
                            ]

                        ]
                    },
                    {
                        "type": "meter",
                        "id": "4"
                    },
                    {
                        "type": "group",
                        "id": "2",
                        "columns": [
                            [
                                {
                                    "type": "meter",
                                    "id": "9"
                                }
                            ],
                            [
                                {
                                    "type": "meter",
                                    "id": "12"
                                },
                                {
                                    "type": "group",
                                    "id": "3",
                                    "columns": [
                                        [
                                            {
                                                "type": "meter",
                                                "id": "13"
                                            }
                                        ],
                                        [
                                            {
                                                "type": "meter",
                                                "id": "14"
                                            }
                                        ]
                                    ]
                                },
                                {
                                    "type": "meter",
                                    "id": "15"
                                },
                                {
                                    "type": "meter",
                                    "id": "16"
                                }
                            ]
                        ]
                    },
                    {
                        "type": "meter",
                        "id": 16
                    }
                ]
            }
        };

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
                {type: "meter", id: 2},
                {type: "group", id: 1, columns: [[], []]}
            ],
            dropzones: {
                "A": []
            }
        };

        var currlevel = -1;

        var dz = $scope.models.dropzones.A;
        var currgrp = dz;
        for (var i in $scope.selectedGrouping.list) {
            var item = $scope.selectedGrouping.list[i];
            if (item.name !== "TOTALS") {
                var newitem = {
                    "type": item.type,
                    "id": item.name
                };
                if (item.squareFootage) newitem.squareFootage = item.squareFootage;
                if (item.annualBudget) newitem.annualBudget = item.annualBudget;

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
