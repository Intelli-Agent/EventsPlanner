//@File: ajax_allevent.js
//@Author: Arreglo CAF.
//@Date: August 15, 2015
var app = angular.module('allevents', []);
app.controller('generateEvents', function($scope, $http) {
      $http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.data = response.events;
	    	
	    });
});
