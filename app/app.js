'use strict';

// Declare app level module which depends on views, and components
var zoomTaskManagerApp = angular.module('zoomTaskManagerApp',['ngRoute','ngResource','angular-cache'])

.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/taskDetails',
    {
        templateUrl:'/app/taskDetails/taskDetails.html',

    });
  $routeProvider.otherwise({redirectTo: '/taskDetails'});



}])
