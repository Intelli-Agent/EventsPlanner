//@File: ajax_todoPage.js
//@Author: Caparoso, AJY & Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 27, 2015

//@File: ajax_todoPage.js
//@Author: Osias Ted Ian
//@Revision Date: August 31, 2015

var todoPageApp = angular.module('todoPageApp', []);
todoPageApp.controller('todoController', function($scope, $http) {
	$scope.todoList =  [];
	$scope.allEvents = [];
	$scope.tempTodoList = $scope.todoList; 
	$scope.searchedString = "";
	$scope.availableEvents = [];
	$scope.selectedEvents = [];
	$scope.todoInfo = {
			id:"",
			total_quantity:1,
			title:"",
			description:""
	};
	
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
	
	$scope.loadEvents = function (){
		$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.allEvents = response.events;
	    	$scope.availableEvents = $scope.allEvents;
	    });
	}
	$scope.initializeTodoInfo = function (){
		$scope.todoInfo = {
				id:"",
				total_quantity:1,
				title:"",
				description:""
		};
	}
	$scope.loadTodos = function (){
		$http.get("/admin/todo/getAllTodos")
	    .success(function(response) {
	    	$scope.todoList = response.todos;
			$scope.tempTodoList = $scope.todoList;
	    });
		
	};
	// Button Triggers
	$scope.loadModalData = function(todoID){
		$scope.todoInfo = $scope.getTodoById(todoID);
		
	};
	
	
	$scope.getTodoById = function (todoID){
		var result = null;
		for(var i=0;i<$scope.todoList.length;i++)
			if($scope.todoList[i].id === todoID){
				result = $scope.todoList[i];
				break;
			} 
		return result;
	};
	/// CRUD
	$scope.deleteTodo = function(todoId){
		var info = $scope.todoInfo;
		var deletePromise = $http.post('/admin/todo/removeTodo', {
			id : info.id,
			total_quantity:info.total_quantity,
			title:info.title,
			description:info.description
		});
		deletePromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
				$scope.initializeTodoInfo();
				$('#deleteModaNew').modal('toggle');
			}
			else
				alert("Something's wrong! Please try again later.");
		});
		deletePromise.error(function(data, status, headers, config) {
			alert("Can't connect to server.");
		});		
	}
	$scope.addTodo = function()
	{
		var info = $scope.todoInfo;
		var addPromise = $http.post('/admin/todo/AddTodo', {
					id : info.id,
					total_quantity:info.total_quantity,
					title:info.title,
					description:info.description
		});
		addPromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
				//$scope.initializeTodoInfo();
				$('#addModaNew').modal('toggle');
				for(var i=0; i < $scope.selectedEvents.length; i++){
					var data = {'eventID':$scope.selectedEvents[i].eventID, 'todoID': data.todo.id};
					var addPromise = $http.post('/admin/eventTodo/addEventTodo', data);
					addPromise.success(function(data, status, headers, config) {
						if(data.errorList.length == 0)
							alert("A new todo has been added.");
						else
							alert("Something's wrong! Please try again later.");
					});
					addPromise.error(function(data, status, headers, config) {
						alert("Not connected to server.");
					});
				}
			}
			else
				alert("Something's wrong! Please try again later.");
		});
		addPromise.error(function(data, status, headers, config) {
			alert("Can't connect to server.");
		});
		/*
		 * $scope.addTodoToThisEvent = function (todoID){
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
				alert("Adding of Todo was successful!");
			}
			else
				$scope.errorList = data.errorList;
			$scope.loadEvent();
		});
		addPromise.error(function(data, status, headers, config) {
			$scope.errorList = ['Not connected to server.'];
		});
		
	}
		 * 
		 * 
		$http(req).then(
				function(response){
					if(response.data.errorList.length == 0){
						$scope.loadTodos();
						$scope.initializeTodoInfo();
						$('#addModaNew').modal('toggle');
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);*/
		/*
		if(add_selected_event != null){
			req = {
					url: "http://localhost:8888/admin/eventTodo/addEventTodo",
					method:"POST",
					params:{
						'data':
							JSON.stringify({
									'eventID':add_selected_event,
									'todoID': "info.id",	
							})
						}
						
				};
				$http(req).then(
						function(response){
							if(response.data.errorList.length == 0){
								loadTodos();
								alert("Adding of Todo was successful!");
							}
							else
								alert("Something's wrong! Please try again later.");	
						},
						function(response){
							alert("Can't connect to server.");
						}
				);
			add_selected_event = null;
			
		}*/
	}
	$scope.editTodo = function()
	{
		var info = $scope.todoInfo;
		var editPromise = $http.post('/admin/todo/updateTodo', {
			id : info.id,
			total_quantity:info.total_quantity,
			title:info.title,
			description:info.description
		});
		editPromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
				$scope.initializeTodoInfo();
				$('#editModaNew').modal('toggle');
				console.log("Update was successful!");
				
			}
			else
				alert("Something's wrong! Please try again later.");
		});
		editPromise.error(function(data, status, headers, config) {
			alert("Can't connect to server.");
		});
	}
	// Radio Triggers
	$scope.getAll = function(){
		$scope.tempTodoList = $scope.todoList;
	};
	$scope.getAction = function(){
		var todos = [];
		for(var i=0;i<$scope.todoList.length;i++)
			{
				if($scope.todoList[i].total_quantity == 1)
					todos.push($scope.todoList[i]);
			}
		$scope.tempTodoList = todos;
	};
	$scope.getQuantity = function(){
		var todos = [];
		for(var i=0;i<$scope.todoList.length;i++)
			{
				if($scope.todoList[i].total_quantity >= 2)
					todos.push($scope.todoList[i]);
			}
		$scope.tempTodoList = todos;
	};
	
	$scope.checkSelected = function(id){
		var aEvents = [];
		var sEvents = [];
		
		for(var i=0;  i<$scope.selectedEvents.length; i++){
			sEvents.push($scope.selectedEvents[i]);
		}
		
		for(var i=0; i<$scope.availableEvents.length;i++){
			if($scope.availableEvents[i].eventID != id){
				aEvents.push($scope.availableEvents[i]);
			}
			else{
				sEvents.push($scope.availableEvents[i]);
			}
		}
		$scope.availableEvents=aEvents;
		$scope.selectedEvents=sEvents;
	};
	
	$scope.notSelected = function(id){
		var aEvents = [];
		var sEvents = [];
		
		for(var i=0;  i<$scope.availableEvents.length; i++){
			aEvents.push($scope.availableEvents[i]);
		}
		
		for(var i=0; i<$scope.selectedEvents.length;i++){
			if($scope.selectedEvents[i].eventID == id){
				aEvents.push($scope.selectedEvents[i]);
			}
			else{
				sEvents.push($scope.selectedEvents[i]);
			}
		}
		$scope.availableEvents=aEvents;
		$scope.selectedEvents=sEvents;
	};
	// Init
	$scope.initializeTodoInfo();
	$scope.loadTodos();
	$scope.loadEvents();
	
});