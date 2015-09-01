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
                  {id:1 ,total_quantity:"1", progress_quantity:"1", title:"Arrange Chairs", description:"A good party comes with good chairs."},
                  {id:2 ,total_quantity:"1", progress_quantity:"0", title:"Buy a Cake",  description:"Nothing is better than a cake."},
                  {id:3 ,total_quantity:"13", progress_quantity:"8", title:"Buy 13 Kinds of Round Fruits",  description:"To prosper your new year's life."},
                  {id:4 ,total_quantity:"5", progress_quantity:"2", title:"Buy 5 Cans of Soda",  description:"Party with friends is fun with poping sodas."},
                  {id:5 ,total_quantity:"1",  progress_quantity:"0", title:"Setup Wifi Network",  description:"Everybody loves to share their moments online."}
                 ];
	$scope.allEvents = [];
	$scope.tempTodoList = todoList; 
	$scope.searchedString = "";
	$scope.addTodoInfo = {
			total_quantity:0,
			title:"",
			description:""
	};
	$scope.editTodoInfo = {
			id:-1,
			total_quantity:0,
			title:"",
			description:""
	};
	$scope.deleteTodoId = "";
	
	function loadEvents(){
		$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	$scope.allEvents = response.events;
	    });
	}
	function loadTodos(){
		$http.get("http://localhost:8888/admin/todo/getAllTodos")
	    .success(function(response) {
	    	todoList = response.todos;
			$scope.tempTodoList = todoList;
	    });
		
	};
	// Button Triggers
	$scope.addTodo = function(){
		var obj =$scope.addTodoInfo; 
		alert(obj.title + ""+ obj.description + ""+ obj.description);
	};
	$scope.loadDeleteModalData = function(todoID){
		$scope.deleteTodoId = todoID;
	};
	$scope.loadEditModalData = function(todoID){
		var todo = null;
		for(var i=0;i<todoList.length;i++){
			if(todoList[i].id == todoID){
				todo = todoList[i];
				break;
			}
		}
		if(todo!=null){
			$scope.editTodoInfo.total_quantity  = todo.total_quantity;
			$scope.editTodoInfo.title  = todo.title;
			$scope.editTodoInfo.id  = todo.id;
			$scope.editTodoInfo.description  =  todo.description;
		}
	};
	
	/// CRUD
	$scope.deleteTodo = function(todoId){
		var req = {
				url:'',
				method:'POST',
				params: data =  JSON.stringify({
					id:$scope.deleteTodoId
				})
			};
			$http(req).then(
					function(response){
						if(response.data.errorList.length == 0)
							alert("Delete was successful!");
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
		var info = $scope.editTodoInfo;
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
						alert("Update was successful!");
						loadTodos();
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);
	}
	$scope.editTodo = function()
	{
		var info = $scope.editTodoInfo;
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
						alert("Update was successful!");
						loadTodos();
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
		alert("ALL Checked");
	};
	$scope.getAction = function(){
		var todos = [];
		for(var i=0;i<todoList.length;i++)
			{
				if(todoList[i].total_quantity == 1)
					todos.push($scope.tempTodoList[i]);
			}
		$scope.tempTodoList = todos;
		alert("Action Checked");
	};
	$scope.getQuantity = function(){
		var todos = [];
		for(var i=0;i<todoList.length;i++)
			{
				if(todoList[i].total_quantity >= 2)
					todos.push(todoList[i]);
			}
		$scope.tempTodoList = todos;
		alert("Quantity Checked");
	};
	
	// Init
	loadTodos();
	loadEvents();
	
});

/*
var array0fObj_todoList = [];

$(document).ready(function() {
	var responseJSON = null;
	getTodoList();
	
	function getDummyData() {
		// Modify it... It's Dynamic!
		responseJSON = {todoList:[
		                           {total_quantity:"1", progress_quantity:"1", title:"Arrange Chairs", description:"A good party comes with good chairs."},
		                           {total_quantity:"1", progress_quantity:"0", title:"Buy a Cake",  description:"Nothing is better than a cake."},
		                           {total_quantity:"13", progress_quantity:"8", title:"Buy 13 Kinds of Round Fruits",  description:"To prosper your new year's life."},
		                           {total_quantity:"5", progress_quantity:"2", title:"Buy 5 Cans of Soda",  description:"Party with friends is fun with poping sodas."},
		                           {total_quantity:"1",  progress_quantity:"0", title:"Setup Wifi Network",  description:"Everybody loves to share their moments online."}
		                          ]
					   };
		// Try an Empty Response!
		//responseJSON = {todoList:[]};
	}
			
	function getTodoList() {	
		getDummyData();    // Remove the getDummyData function if URL is ready.
		$.ajax({
			//url: 'url?', // Supply the url? if URL ready. Or just try what happens if you un.comment this line.
			//url: 'http://localhost:8888/admin/todo/getAllTodos',//MODIFIED
			data: responseJSON,//MODIFIED
			type: 'GET',
			success: function(data, status, jqXHR){				
				$.each(responseJSON.todoList, function(index, value) {
					//For One-Time GET of the Todo List Entries.
					//Create a new object in every todo list entry and assign the values from the JSON Response.
					var obj_todoListEntry =  {todoQuantity:value.total_quantity, todoProgressQuantity:value.progress_quantity, todoName:value.title, todoDescription:value.description};
					//Push the new todo list entry to the array of todos.
					array0fObj_todoList.push(obj_todoListEntry);
					//This list is accessible trough this example... array0fObj_todoList[0].todoName;  <- The code will return Arrange Chairs.
				});
				showAllTodos();
				showProgress();
			},
			error: function(jqXHR, status, error) {;
				$("#TodoListContainer").html("<div align='center'><h3>Oops! We're sorry.</h3><br>Something wrong happened, but we will assure we can fix it soon.</div><br><br><br>");
			}
		});
	}
	
	function showAllTodos() {
		$("#TodoListContainer").empty();
		var htmlFormattedListString = "<table class='table' align='center' style='width:1200px;'>" +
		"<tr>" +
		"<td></td>" +
		"<td><b>Name</b></td>" +
		"<td><b>Description</b></td>" +
		"<td></td>" +
		"</tr>";
		if(array0fObj_todoList.length == 0) {
			htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos right now.<br><br></td></tr><tr><td colspan='4'></td></tr>";
		}
		else {
			for(var i = 0; i < array0fObj_todoList.length; i++) {
				htmlFormattedListString += 	"<tr><td>";											
				htmlFormattedListString += "</td>" +
				"<td>" + array0fObj_todoList[i].todoName + "</td>" +
				"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
				"<td>" + //Need for implementations below...
				"<a href='#editModal'>"+
				"<button type='button' value='Edit' class='btn btn-primary' style='background:#6f6f6f;color:white;width:60px;' onClick='editScript("+ i +")'>Edit</button>" +
				"</a> "+
				"<a href='#deleteModal'>"+
				"<input type='submit' value='X' class='btn btn-primary' style='background:#cc3333;color:white;width:35px;'>" +
				"</a>"+
				"</td></tr>";
			}
		}
		htmlFormattedListString += "</table>";
		$("#TodoListContainer").html(htmlFormattedListString);
	}
	
	function showProgress() {
		var progress = getProgess();
		$('progress').val(0).animate({ value: progress }, { duration: 2000, easing: 'easeOutCirc' });	
	}
	
	function getProgess() {
		var totalProgress = 0;
		var taskRatio = 100 / array0fObj_todoList.length;
		for(var i = 0; i < array0fObj_todoList.length; i++) {
			totalProgress += (array0fObj_todoList[i].todoProgressQuantity / array0fObj_todoList[i].todoQuantity) * taskRatio;
		}
		return totalProgress;
	}

	//Function for the Search Bar	
	 $('#search').on('input',function(e){
	     var searchString = $('#search').val();
	     if(searchString == "") {
	    	 showAllTodos();
	     }
	     else {
	    	 showSearchedTodo(searchString);
	     }
	 });
	 
	 function showSearchedTodo(searchString) {
			$("#TodoListContainer").empty();
			var initString = "<table class='table' align='center' style='width:1200px;'>" +
			"<tr>" +
			"<td></td>" +
			"<td><b>Name</b></td>" +
			"<td><b>Description</b></td>" +
			"<td><b></b></td>" +
			"<td></td>" +
			"</tr>";
			var htmlFormattedListString = initString;
			if(array0fObj_todoList.length == 0) {
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos right now.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			else {
				for(var i = 0; i < array0fObj_todoList.length; i++) {
					if(array0fObj_todoList[i].todoName.indexOf(searchString) > -1) {
						htmlFormattedListString += 	"<tr><td>";
																
						htmlFormattedListString += "</td>" +
						"<td>" + array0fObj_todoList[i].todoName + "</td>" +
						"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
						"<td>" +
						
						"<td>" + //Need for implementations below...
						"<input type='submit' value='Edit' class='btn btn-primary' style='background:#6f6f6f;color:white;width:60px;'> " +
						"<input type='submit' value='X' class='btn btn-primary' style='background:#cc3333;color:white;width:35px;'>" +
						"</td></tr>";
					}
				}
			}
			if(htmlFormattedListString == initString){
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos with the right match.<br>Tip: Search is case-sensitive.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			htmlFormattedListString += "</table>";
			$("#TodoListContainer").html(htmlFormattedListString);
		}
	 
	 
	 //Radio button	
	 $('#Action').click(function(){
		 $("#TodoListContainer").empty();
			var initString = "<table class='table' align='center' style='width:1200px;'>" +
			"<tr>" +
			"<td></td>" +
			"<td><b>Name</b></td>" +
			"<td><b>Description</b></td>" +
			"<td><b></b></td>" +
			"<td></td>" +
			"</tr>";
			var htmlFormattedListString = initString;
			if(array0fObj_todoList.length == 0) {
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos right now.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			else {
				for(var i = 0; i < array0fObj_todoList.length; i++) {
					if(array0fObj_todoList[i].todoQuantity == "1"){
						htmlFormattedListString += 	"<tr><td>";
																
						htmlFormattedListString += "</td>" +
						"<td>" + array0fObj_todoList[i].todoName + "</td>" +
						"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
						"<td>" +
						
						"<td>" + //Need for implementations below...
						"<input type='submit' value='Edit' class='btn btn-primary' style='background:#6f6f6f;color:white;width:60px;'> " +
						"<input type='submit' value='X' class='btn btn-primary' style='background:#cc3333;color:white;width:35px;'>" +
						"</td></tr>";
					}
					//}
				}
			}
			if(htmlFormattedListString == initString){
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos with the right match.<br>Tip: Search is case-sensitive.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			htmlFormattedListString += "</table>";
			$("#TodoListContainer").html(htmlFormattedListString);
	 });
	 
	 $('#All').click(function(){
		 
		 showAllTodos();
	 });

	 $('#Quantity').click(function(){	 
		 $("#TodoListContainer").empty();
			var initString = "<table class='table' align='center' style='width:1200px;'>" +
			"<tr>" +
			"<td></td>" +
			"<td><b>Name</b></td>" +
			"<td><b>Description</b></td>" +
			"<td><b></b></td>" +
			"<td></td>" +
			"</tr>";
			var htmlFormattedListString = initString;
			if(array0fObj_todoList.length == 0) {
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos right now.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			else {
				for(var i = 0; i < array0fObj_todoList.length; i++) {
					if(array0fObj_todoList[i].todoQuantity != "1"){
						htmlFormattedListString += 	"<tr><td>";
																
						htmlFormattedListString += "</td>" +
						"<td>" + array0fObj_todoList[i].todoName + "</td>" +
						"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
						"<td>" +
						
						"<td>" + //Need for implementations below...
						"<input type='submit' value='Edit' class='btn btn-primary' style='background:#6f6f6f;color:white;width:60px;'> " +
						"<input type='submit' value='X' class='btn btn-primary' style='background:#cc3333;color:white;width:35px;'>" +
						"</td></tr>";
					}
					//}
				}
			}
			if(htmlFormattedListString == initString){
				htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos with the right match.<br>Tip: Search is case-sensitive.<br><br></td></tr><tr><td colspan='4'></td></tr>";
			}
			htmlFormattedListString += "</table>";
			$("#TodoListContainer").html(htmlFormattedListString);
	 });
});


function editScript(indexNumber) {
	$('#todoQuantity').val(array0fObj_todoList[indexNumber].todoQuantity);
	$('#todoTitle').val(array0fObj_todoList[indexNumber].todoName);
	$('#todoDescription').val(array0fObj_todoList[indexNumber].todoDescription);
}
*/