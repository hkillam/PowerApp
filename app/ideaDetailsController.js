define([], function (app) {
    'use strict';


    function ideaDetailsController($scope, $routeParams, powerAppDataService) {
        $scope.template = getTemplates();
        powerAppDataService.ideaDetails($routeParams.id)
            .then(function (result) {
                $scope.ideaDetails = result;
            });
    }

    ideaDetailsController.$inject = ['$scope', '$routeParams', 'powerAppDataService'];

    return ideaDetailsController;
});
