//create a module myApp
var myApp = angular.module('myApp', ['ngRoute']);

//Now Configure  our  routing
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
    /** set route for the index page and it load uirouter.html
     *in ng-view and activate RouteCtrl
     **/
        .when('/', {
            controller: 'RouteCtrl',
            templateUrl: 'uirouter.html'
        })
        // if not match with any route config then send to home page
        .otherwise({
            redirectTo: '/home'
        });
});

// create the controller and inject Angular's $scope
// set for Route Controller
myApp.controller('RouteCtrl', function($scope) {
    /** create $scope.template **/
    $scope.template = {
        "home": "partials/home.html",
        "about": "partials/aboutus.html",
        "contact": "partials/contactus.html"
    }

    $scope.message={

        "home":"Message from home template",
        "about":"Message from about template",
        "contact":"Message from contact template"

    }

    /** now after this ng-include in uirouter.html set and take template from their respective path **/
});
