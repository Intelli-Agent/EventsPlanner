//@File: ajax_todoPage.js
//@Author: Caparoso, AJY & Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 27, 2015

//@File: ajax_todoPage.js
//@Author: Osias Ted Ian
//@Revision Date: August 31, 2015

var todoPageApp = angular.module('todoPageApp', []);
todoPageApp.controller('todoController', function($scope, $http) {
	todoList =  [
                  
                 ];
	$scope.allEvents = [];
	$scope.tempTodoList = todoList; 
	$scope.searchedString = "";
	var add_selected_event = null;
	$scope.todoInfo = null;
	
	function loadEvents(){
		$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.allEvents = response.events;
	    });
	}
	function initializeTodoInfo(){
		$scope.todoInfo = {
				id:"",
				total_quantity:1,
				title:"",
				description:""
		};
	}
	function loadTodos(){
		$http.get("/admin/todo/getAllTodos")
	    .success(function(response) {
	    	todoList = response.todos;
			$scope.tempTodoList = todoList;
	    });
		
	};
	// Button Triggers
	$scope.loadModalData = function(todoID){
		$scope.todoInfo = getTodoById(todoID);
		
	};
	
	
	function getTodoById(todoID){
		var result = null;
		for(var i=0;i<todoList.length;i++)
			if(todoList[i].id === todoID){
				result = todoList[i];
				break;
			} 
		return result;
	};
	/// CRUD
	$scope.deleteTodo = function(todoId){
		var todo = $scope.todoInfo;
		var req = {
				url:'http://localhost:8888/admin/todo/removeTodo',
				method:'POST',
				params: {
					'data':
						JSON.stringify({
							id : todo.id,
							total_quantity:todo.total_quantity,
							title:todo.title,
							description:todo.description
						})
				}
			};
		
			$http(req).then(
					function(response){
						if(response.data.errorList.length == 0){
							loadTodos();
							initializeTodoInfo();
							$('#deleteModaNew').modal('toggle');
						}
						else
							alert("Something's wrong! Please try again later.");	
					},
					function(response){
						alert("Can't connect to server.");
					}
			);
		
	}
	$scope.addTodo = function()
	{
		var info = $scope.todoInfo;
		var req = {
			url:'http://localhost:8888/admin/todo/AddTodo',
			method:'POST',
			params: {
				'data':
					JSON.stringify({
						id : info.id,
						total_quantity:info.total_quantity,
						title:info.title,
						description:info.description
					})
			}
		};
		$http(req).then(
				function(response){
					if(response.data.errorList.length == 0){
						initializeTodoInfo();
						$('#addModaNew').modal('toggle');
						loadTodos();
						
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);
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
		var req = {
			url:'http://localhost:8888/admin/todo/updateTodo',
			method:'POST',
			params: {
				'data':
					JSON.stringify({
						id : info.id,
						total_quantity:info.total_quantity,
						title:info.title,
						description:info.description
					})
			}
		};
		$http(req).then(
				function(response){
					if(response.data.errorList.length == 0){
						loadTodos();
						initializeTodoInfo();
						$('#editModaNew').modal('toggle');
						alert("Update was successful!");
						
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);
	}
	// Radio Triggers
	$scope.getAll = function(){
		$scope.tempTodoList = todoList;
	};
	$scope.getAction = function(){
		var todos = [];
		for(var i=0;i<todoList.length;i++)
			{
				if(todoList[i].total_quantity == 1)
					todos.push($scope.tempTodoList[i]);
			}
		$scope.tempTodoList = todos;
	};
	$scope.getQuantity = function(){
		var todos = [];
		for(var i=0;i<todoList.length;i++)
			{
				if(todoList[i].total_quantity >= 2)
					todos.push(todoList[i]);
			}
		$scope.tempTodoList = todos;
	};
	
	$scope.checkSelected = function(id){
		add_selected_event = id;
	};
	
	
	// Init
	initializeTodoInfo();
	loadTodos();
	loadEvents();
	
});