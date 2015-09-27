//@File: ajax_searchtodo.js
//@Author: Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 23, 2015

// Revision History: 
//@Author: Ted Ian Osias
//@Revision Date: August 26, 2015

var app = angular.module('eventPage', []);
app.controller('eventController', function($scope, $http) {
	$scope.numericalProgress = 0;
	$scope.event = {};
	$scope.todoList= [];
	$scope.tempTodoList = $scope.todoList; 
	$scope.allTodos = [];	
	$scope.currentTodo = null;
	$scope.errorList = [];
	$scope.selectedTodos = [];
	$scope.selectedAll = false;
	
	$scope.change = function(s) {
		
        $scope.searchedString = angular.lowercase(s);
      };
      
	$scope.isValid = function(todoTitle){
		todoTitle = angular.lowercase(todoTitle);
		if(todoTitle.indexOf(angular.lowercase($scope.searchedString)) > -1){
			return true;
		}
		else{
			return false;
		}
	};
	
	$scope.checkSelectedAll = function(){
		for(var i = 0;i< $scope.selectedTodos.length ; i++)
			$scope.selectedTodos[i] = $scope.selectedAll;
	}
	
	$scope.showProgress = function () {
		var progress = $scope.getProgess();
		$('progress').val(0).animate({ value: progress }, { duration: 2000, easing: 'easeOutCirc' });
		
	};
	$scope.getProgess = function () {
		var totalProgress = 0;
		var taskRatio = 100 / $scope.tempTodoList.length;
		for(var i = 0; i < $scope.tempTodoList.length; i++) {
			totalProgress += ($scope.tempTodoList[i].todo.finished_quantity / $scope.tempTodoList[i].todo.total_quantity) * taskRatio;
		}
		$scope.numericalProgress = Math.round(totalProgress * 100) / 100;
		
		return totalProgress;
	};
	// USED for getting GET url parameters
	$scope.getParameterByName = function (name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	$scope.loadTodos = function (){
		$http.get("/admin/todo/getAllTodos")
	    .success(function(response) {
	    	$scope.allTodos = response.todos;
	    	for(var i=0;i<$scope.allTodos.length;i++)
	    		$scope.selectedTodos.push(false);
	    });
	};
	
	$scope.loadEvent = function(){
		
		var eventId = $scope.getParameterByName('event');
		var eventInfoAJAX = {
					 method: 'GET',
					 url: '/admin/event/get',
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
		var todoListPromise = $http.get('/admin/eventTodo/getTodoList?eventID='+ eventId );
		todoListPromise.success(function(response){
				$scope.todoList = response.todoList;
			    $scope.tempTodoList = $scope.todoList;
			    $scope.showProgress();
			});
		todoListPromise.error(function(response){
			$scope.errorList = ['Not connected to server.','An error has occurred in loading the TODO list.'];
		});
	}
	
	$scope.getTodoByID = function (eventTodoId){
		var todo = null;
		for(var i = 0; i < $scope.tempTodoList.length ; i++)
				if($scope.tempTodoList[i].id == eventTodoId){
					todo = $scope.tempTodoList[i];
					break;
				}
		return todo;
	};
	$scope.toggleCheckBoxThenUpdate = function(eventTodoId){
		for(var i = 0; i < $scope.tempTodoList.length ; i++)
			if($scope.tempTodoList[i].id == eventTodoId){
				var todo = $scope.tempTodoList[i].todo;
				var ok = todo.finished_quantity == 1;
				
				if( ok )
					$scope.tempTodoList[i].todo.finished_quantity = 0;
				else 
					$scope.tempTodoList[i].todo.finished_quantity = 1;
				break;
			}
		$scope.updateTodo(eventTodoId);
		
	}
	//Button triggers
	$scope.loadModalData = function(id){
		$scope.currentTodo = $scope.getTodoByID(id);
		$scope.errorList = [];
	}
	
	//// DELETE
	$scope.removeTodo = function(){
		$scope.errorList = [];
		if($scope.todoList.length <= 2){
			$scope.errorList.push("Sorry but an event must have atleast 2 TODOS.");
			$('#deleteModaNew').modal('toggle');
		}
		else{
			var todo = $scope.currentTodo;
			var data = {
					'id':todo.id
				};
			var deletePromise = $http.post('/admin/eventTodo/removeEventTodo', data);
			deletePromise.success(function(data, status, headers, config) {
				if(data.errorList.length == 0){
					$scope.loadTodos();
					$('#deleteModaNew').modal('toggle');
				}
				else
					$scope.errorList = data.errorList;
				$scope.loadEvent();
			});
			deletePromise.error(function(data, status, headers, config) {
				$scope.errorList = ['Not connected to server.'];
			});
		}
	};
	///// EDIT
	$scope.updateTodo = function (eventTodoId){
		$scope.errorList = [];
		var eventTodo = $scope.getTodoByID(eventTodoId)
		var updatePromise = $http.post('/admin/eventTodo/updateEventTodo', eventTodo);
		updatePromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
				console.log("Update was successful!");;
			}
			else
				$scope.errorList = data.errorList;
				$scope.loadEvent();
			});
		updatePromise.error(function(data, status, headers, config) {
			$scope.errorList = ['Not connected to server.'];
		});
		
	};
	///// ADD
	$scope.add = function(){
		for(var i=0;i<$scope.selectedTodos.length;i++){
			if($scope.selectedTodos[i] == true)
				$scope.addTodoToThisEvent($scope.allTodos[i].id);
		}
		$('#addModalNew').modal('toggle');
	};
	$scope.addTodoToThisEvent = function (todoID){
		$scope.errorList = [];
		var todo = $scope.currentTodo;
		var data = {
				'eventID':$scope.event.eventID,
				'todoID':todoID,
			};
		var addPromise = $http.post('/admin/eventTodo/addEventTodo', data);
		addPromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
			}
			else
				$scope.errorList = data.errorList;
			$scope.loadEvent();
		});
		addPromise.error(function(data, status, headers, config) {
			$scope.errorList = ['Not connected to server.'];
		});
		
	}
	$scope.loadEvent();
	$scope.loadTodos();
	$scope.contains = function (todo, todoList){
		var ok = false;
		for(var i = 0; i < todoList.length;i++){
			if(todoList[i].todo.id == todo.id){
				ok = true;
				break;
			}
		}
		return ok;
	}
});

