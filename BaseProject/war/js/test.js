/**
 * 
 */
var app = angular.module('test', []);
app.controller('button', function($scope, $http) {
	$scope.addEvent = function(){
		var req = {
				url: "http://localhost:8888/admin/todo/addTodo",
				method: "POST",
				params : {
							'data':
							JSON.stringify({
								'title': 'Create Many Todos',
								'description': 'Use Test.html to create more todos',
								'total_quantity': 30
							})
						}
				}
		$http(req).then(
				function(response){
					alert("Todo Added!");
				},
				function(response){
					alert("Adding of Todo Failed!");
				}
		);
		
		
	}
	$scope.addTodo = function(){
		var req = {
				url: "http://localhost:8888/admin/todo/addTodo",
				method: "POST",
				params : {
							'data':
							JSON.stringify({
								'title': 'Create Many Todos',
								'description': 'Use Test.html to create more todos',
								'total_quantity': 30
							})
						}
				}
		$http(req).then(
				function(response){
					alert("Todo Added!");
				},
				function(response){
					alert("Adding of Todo Failed!");
				}
		);
		
	}
	$scope.addEventTodo = function(eventId, todoId ){
		var req = {
			url: "http://localhost:8888/admin/eventTodo/addEventTodo",
			method: "POST",
			params : {
						'data':
						JSON.stringify({
			
								'eventID':eventId,
								'todoID':todoId,	
						})
					}
			}
		$http(req).then(
				function(response){
					alert("Event Updated!");
				},
				function(response){
					alert("Event Update Failed!");
				}
		);
	}
});



