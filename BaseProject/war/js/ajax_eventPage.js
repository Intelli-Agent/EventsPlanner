//@File: ajax_searchtodo.js
//@Author: Arreglo, CAF
//@Date: August 15, 2015
//@Revision Date: August 23, 2015

// Revision History: 
//@Author: Ted Ian Osias
//@Revision Date: August 26, 2015

var app = angular.module('eventPage', []);
app.controller('eventController', function($scope, $http) {
	$scope.event = {
			eventId : 1,
			eventTitle: "TEst Title",
			eventDescription: "Test Description"
			};
	todoList =[
                      {total_quantity:1, finished_quantity:1, title:"Arrange Chairs", description:"A good party comes with good chairs."},
                      {total_quantity:1, finished_quantity:0, title:"Buy a Cake",  description:"Nothing is better than a cake."},
                      {total_quantity:13, finished_quantity:8, title:"Buy 13 Kinds of Round Fruits",  description:"To prosper your new year's life."},
                      {total_quantity:5, finished_quantity:2, title:"Buy 5 Cans of Soda",  description:"Party with friends is fun with poping sodas."},
                      {total_quantity:1,  finished_quantity:0, title:"Setup Wifi Network",  description:"Everybody loves to share their moments online."}
                     ];
	$scope.tempTodoList = $scope.todoList; 
	$scope.allTodos = [];	
	
	
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
			    $scope.tempTodoList = response.data.todoList;
			    showProgress();
			  },
			  function(response) {
				    console.log("An error has occurred in loading the TODO list.");
			  })
		   ;
		
		
	}
	//// DELETE
	$scope.removeTodoAt = function (position){
		$scope.todoList.splice(position,1);
	}
	///// EDIT
	$scope.editTodoAt = function (position){
		$("#myModal").show();
		
	}
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
						alert("Update was successful!");
						loadEvent();
					}
					else
						alert("Something's wrong! Please try again later.");	
				},
				function(response){
					alert("Can't connect to server.");
				}
		);
	}
	loadTodos();
	loadEvent();
});

$(document).ready(function() {
	/*var responseJSON = null;
	var array0fObj_todoList = [];
	
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
		"<td><b>Status</b></td>" +
		"<td></td>" +
		"</tr>";
		if(array0fObj_todoList.length == 0) {
			htmlFormattedListString += "<tr><td colspan='5' align='center'><br>There are no available todos right now.<br><br></td></tr><tr><td colspan='4'></td></tr>";
		}
		else {
			for(var i = 0; i < array0fObj_todoList.length; i++) {
				htmlFormattedListString += 	"<tr><td>";
				if(array0fObj_todoList[i].todoQuantity > 1){
					htmlFormattedListString += "<input type='number' value='" + array0fObj_todoList[i].todoProgressQuantity + "' style='width:40px;' min='0' max='" + array0fObj_todoList[i].todoQuantity + "'> ";
				}
				else {
					htmlFormattedListString += "<input type='checkbox' ";
					if(array0fObj_todoList[i].todoProgressQuantity == array0fObj_todoList[i].todoQuantity) {
						htmlFormattedListString += "checked";
					}
					htmlFormattedListString += " >";
				}												
				htmlFormattedListString += "</td>" +
				"<td>" + array0fObj_todoList[i].todoName + "</td>" +
				"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
				"<td><select>" +
				"<option value='new' ";
				if(array0fObj_todoList[i].todoProgressQuantity == 0) {
					htmlFormattedListString += "selected";
				}
				htmlFormattedListString +=">New</option>" +
				"<option value='progress' ";
				if(array0fObj_todoList[i].todoProgressQuantity != 0) {
					htmlFormattedListString += "selected";
				}
				htmlFormattedListString +=">In-progress</option>" +
				"<option value='finished'" ;
				if(array0fObj_todoList[i].todoProgressQuantity == array0fObj_todoList[i].todoQuantity) {
					htmlFormattedListString += "selected";
				}
				htmlFormattedListString +=">Finished</option>" +
				"</select></td>" +
				"<td>" + //Need for implementations below...
				"<input type='submit' value='Edit' class='btn btn-primary' style='background:#6f6f6f;color:white;width:60px;'> " +
				"<input type='submit' value='X' class='btn btn-primary' style='background:#cc3333;color:white;width:35px;'>" +
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
			"<td><b>Status</b></td>" +
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
						if(array0fObj_todoList[i].todoQuantity > 1){
							htmlFormattedListString += "<input type='number' value='" + array0fObj_todoList[i].todoProgressQuantity + "' style='width:40px;' min='0' max='" + array0fObj_todoList[i].todoQuantity + "'> ";
						}
						else {
							htmlFormattedListString += "<input type='checkbox' ";
							if(array0fObj_todoList[i].todoProgressQuantity == array0fObj_todoList[i].todoQuantity) {
								htmlFormattedListString += "checked";
							}
							htmlFormattedListString += " >";
						}												
						htmlFormattedListString += "</td>" +
						"<td>" + array0fObj_todoList[i].todoName + "</td>" +
						"<td>" + array0fObj_todoList[i].todoDescription + "</td>" +
						"<td><select>" +
						"<option value='new' ";
						if(array0fObj_todoList[i].todoProgressQuantity == 0) {
							htmlFormattedListString += "selected";
						}
						htmlFormattedListString +=">New</option>" +
						"<option value='progress' ";
						if(array0fObj_todoList[i].todoProgressQuantity != 0) {
							htmlFormattedListString += "selected";
						}
						htmlFormattedListString +=">In-progress</option>" +
						"<option value='finished'" ;
						if(array0fObj_todoList[i].todoProgressQuantity == array0fObj_todoList[i].todoQuantity) {
							htmlFormattedListString += "selected";
						}
						htmlFormattedListString +=">Finished</option>" +
						"</select></td>" +
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
	*/
});