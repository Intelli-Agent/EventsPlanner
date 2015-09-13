//@File: ajax_index.js
//@Author: Arreglo CAF.
//@Date: August 15, 2015
var app = angular.module('index', []);
app.controller('generateSomeEvents', function($scope, $http) {
	$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.eventList = response.events;
	    	$scope.eventList.splice(4);
	    });
});
