


var app = angular.module('addTodoApp', []);

app.controller('generateEvents', function($scope, $http) {
	$http({
	    url: "http://localhost:8888/admin/eventTodo/addEventTodo",
	    method: "POST",
	    data: {"eventID": 1
	    	, "eventTitle": "happy"}
	    }
	}).success(function(data, status, headers, config) {
	    $scope.data = data;
	}).error(function(data, status, headers, config) {
	    $scope.status = status;
	});
	