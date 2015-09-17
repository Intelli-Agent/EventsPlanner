//@File: ajax_todoPage.js
//@Author: Caparoso, AJY & Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 27, 2015

//@File: ajax_todoPage.js
//@Author: Osias Ted Ian
//@Revision Date: August 31, 2015

var todoPageApp = angular.module('todoPageApp', []);
todoPageApp.controller('todoController', function($scope, $http) {
	$scope.todoList =  [
                  
                 ];
	$scope.allEvents = [];
	$scope.tempTodoList = $scope.todoList; 
	$scope.searchedString = "";
	var add_selected_event = null;
	$scope.todoInfo = {
			id:"",
			total_quantity:1,
			title:"",
			description:""
	};
	
	$scope.loadEvents = function (){
		$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.allEvents = response.events;
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
		for(var i=0;i<todoList.length;i++)
			if($scope.todoList[i].id === todoID){
				result = $scope.todoList[i];
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
							$scope.loadTodos();
							$scope.initializeTodoInfo();
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
			url:'/admin/todo/AddTodo',
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
		var tweetPromise = $http.post(req.url, {
					id : info.id,
					total_quantity:info.total_quantity,
					title:info.title,
					description:info.description
		});
		tweetPromise.success(function(data, status, headers, config) {
			if(data.errorList.length == 0){
				$scope.loadTodos();
				$scope.initializeTodoInfo();
				$('#addModaNew').modal('toggle');
			}
			else
				alert("Something's wrong! Please try again later.");
		});
		tweetPromise.error(function(data, status, headers, config) {
			alert("Can't connect to server.");
		});
		/*
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
		var req = {
			url:'/admin/todo/updateTodo',
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
						$scope.loadTodos();
						$scope.initializeTodoInfo();
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
		add_selected_event = id;
	};
	
	
	// Init
	$scope.initializeTodoInfo();
	$scope.loadTodos();
	$scope.loadEvents();
	
});

	var citynames = new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('eventName'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  prefetch: 'http://localhost:8888/admin/event/getAll'
		});
		citynames.initialize();

		$('input').tagsinput({
		  typeaheadjs: {
		    name: 'eventName',
		    displayKey: 'eventName',
		    valueKey: 'eventID',
		    source: citynames.ttAdapter()
		  }
		});
		//http://twitter.github.io/typeahead.js/examples/
		//http://timschlechter.github.io/bootstrap-tagsinput/examples/