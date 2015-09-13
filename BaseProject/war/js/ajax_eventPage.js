//@File: ajax_searchtodo.js
//@Author: Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 23, 2015

// Revision History: 
//@Author: Ted Ian Osias
//@Revision Date: August 26, 2015

var app = angular.module('eventPage', []);
app.controller('eventController', function($scope, $http) {
	$scope.event = {};
	var todoList =[];
	$scope.tempTodoList = $scope.todoList; 
	$scope.allTodos = [];	
	$scope.currentTodo = null;
	
	function showProgress() {
		var progress = getProgess();
		$('progress').val(0).animate({ value: progress }, { duration: 2000, easing: 'easeOutCirc' });	
	};
	function getProgess() {
		var totalProgress = 0;
		var taskRatio = 100 / $scope.tempTodoList.length;
		for(var i = 0; i < $scope.tempTodoList.length; i++) {
			totalProgress += ($scope.tempTodoList[i].finished_quantity / $scope.tempTodoList[i].total_quantity) * taskRatio;
		}
		return totalProgress;
	};
	// USED for getting GET url parameters
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	function loadTodos(){
		$http.get("http://localhost:8888/admin/todo/getAllTodos")
	    .success(function(response) {
	    	$scope.allTodos = response.todos;
	    });
	};
	
	function loadEvent(){
		var eventId = getParameterByName('event');
		var eventInfoAJAX = {
					 method: 'GET',
					 url: 'http://localhost:8888/admin/event/get',
					 params: { 'eventId' : eventId }
					};
		$http(eventInfoAJAX).
		  then(function(response) {
			    $scope.event = response.data.event;
			  },
			  function(response) {
				    alert(response);
			  })
		   ;
		var todoInfoAJAX = {
			method: 'GET',
			url: 'http://localhost:8888/admin/eventTodo/getTodoList',
			params: { 'eventID' : eventId }	
		};
		
		$http(todoInfoAJAX).
		  then(function(response) {
			    todoList = response.data.todoList;
			    $scope.tempTodoList = todoList;
			    showProgress();
			  },
			  function(response) {
				    console.log("An error has occurred in loading the TODO list.");
			  })
		   ;
		
		
	}
	
	function getTodoByID (todoID){
		var todo = null;
		for(var i; i < todoList.length ; i++)
				if(todoList[i].id == todoID){
					todo = todoList[i];
					break;
				}
		return todo;
	};
	
	//Button triggers
	$scope.loadModalData = function(position){
		$scope.currentTodo = todoList[position];
	}
	
	//// DELETE
	$scope.removeTodo = function(){
		var todo = $scope.currentTodo;
		var req = {
				url: "http://localhost:8888/admin/eventTodo/removeEventTodo",
				method:"POST",
				params:{
					'data':
						JSON.stringify({
								'eventID':$scope.event.eventID,
								'eventTitle': $scope.event.eventTitle,
								'todoID':todo.id,
								'title':todo.title
						})
					}
					
			};
			$http(req).then(
					function(response){
						if(response.data.errorList.length == 0){
							loadTodos();
							loadEvent();
							alert("Todo Removal was successful!");
							$('#deleteModaNew').modal('toggle');
						}
						else
							alert("Something's wrong! Please try again later.");	
					},
					function(response){
						alert("Can't connect to server.");
					}
			);
	};
	///// EDIT
	$scope.updateTodo = function (position){
		var todo = $scope.tempTodoList[position];
		if(todo.finished_quantity == true)
			todo.finished_quantity = 1;
		var req = {
				url: "http://localhost:8888/admin/eventTodo/updateEventTodo",
				method:"POST",
				params:{
					'data':
						JSON.stringify({
								'eventID':$scope.event.eventID,
								'eventTitle': $scope.event.eventTitle,
								'todoID':todo.id,
								'finished_quantity':todo.finished_quantity,
								'title':todo.title,
								'description':todo.description,
								'total_quantity':todo.total_quantity
						})
					}
					
			};
			$http(req).then(
					function(response){
						if(response.data.errorList.length == 0){
							loadTodos();
							loadEvent();
							alert("Update was successful!");
						}
						else
							alert("Something's wrong! Please try again later.");	
					},
					function(response){
						alert("Can't connect to server.");
					}
			);
	};
	///// ADD
	$scope.addTodoToThisEvent = function (todoID){
		var req = {
			url: "http://localhost:8888/admin/eventTodo/addEventTodo",
			method:"POST",
			params:{
				'data':
					JSON.stringify({
							'eventID':$scope.event.eventID,
							'todoID':todoID,	
					})
				}
				
		};
		$http(req).then(
				function(response){
					if(response.data.errorList.length == 0){
						loadTodos();
						loadEvent();
						alert("Adding of Todo was successful!");
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);
	}
	loadEvent();
	loadTodos();
});
