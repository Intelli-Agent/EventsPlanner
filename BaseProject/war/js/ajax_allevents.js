//@File: ajax_allevent.js
//@Author: Arreglo CAF.
//@Date: August 15, 2015
var app = angular.module('allevents', []);
app.controller('events', function($scope, $http) {
    $scope.todos = [];  
    $scope.selectedTodo1 = 0;
    $scope.selectedTodo2 = 1;
    
    
    
    $scope.setSelected1 = function(todo){ $scope.selectedTodo1 = getTodoIndex(todo);}
    $scope.setSelected2 = function(todo){ $scope.selectedTodo2 = getTodoIndex(todo);}
    
    function getTodoIndex(todo){
    	for(var i=0;i<$scope.todos.length;i++)
    		if($scope.todos[i].id == todo.id)
    		{
    			return i;
    		}
    	return -1;
    	
    	
    }
    
    function addTodo(todoID,eventId)
    {
    	var data = {
				'eventID':eventId,
				'todoID':todoID,
			};
		var addPromise = $http.post('/admin/eventTodo/addEventTodo', data);
		addPromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.load();
			}
			else
				$scope.errorList = data.errorList;
			$scope.loadEvent();
		});
		addPromise.error(function(data, status, headers, config) {
			$scope.errorList = ['Not connected to server.'];
		});
		
    	
    };
    
    $scope.eventInfo = {
			eventName: '',	
			description:''
		};
	$scope.initializeEventInfo = function(){
			$scope.eventInfo = {
				eventName: '',	
				description:''
			};
		};
	$scope.load = function (){
		$http.get("/admin/event/getAll")
	    .success(function(response) {
	    	$scope.data = response.events;
	    });
		$http.get("/admin/todo/getAllTodos")
	    .success(function(response) {
	    	$scope.todos = response.todos;
	    });
	};
	
	$scope.add = function (){
		var addPromise = $http.post("/admin/event/addEvent",$scope.eventInfo);
		addPromise.success(function(response) {
			addTodo($scope.todos[$scope.selectedTodo1].id,response.EventId);
			addTodo($scope.todos[$scope.selectedTodo2].id,response.EventId);
			$scope.load();
			$('#addModal').toggle();
	    });
		addPromise.error(function(response) {
	    });
		
	};
	
	
	$scope.load();
});
