//@File: ajax_index.js
//@Author: Arreglo CAF.
//@Date: August 15, 2015
var app = angular.module('index', []);
app.controller('generateSomeEvents', function($scope, $http) {
	$http.get("http://localhost:8888/admin/event/getAll")
	    .success(function(response) {
	    	//$scope.eventList = response.events;
	    	//$scope.eventList.splice(4);
	    });
});



/*
$(document).ready(function() {
	
	var responseJSON = null;
	
	getAllEventsList();
	
	function getDummyData() {
		// Modify it... It's Dynamic!
		responseJSON = {eventList:[
		                           {eventName:"Wedding", eventDescription:"Romeo and Juliet together as one."},
		                           {eventName:"Birthday", eventDescription:"It's 20th Birthday of Juan!"},
		                           {eventName:"Party", eventDescription:"IntelliAgent is throwing a Par-Tay today!"},
		                           {eventName:"Fiesta", eventDescription:"From the good harvest of our barangay."},
		                           {eventName:"Music Fest", eventDescription:"Your favorite bands are here. Listen to them now."},
		                           {eventName:"Japanese Today", eventDescription:"Konnichiwa!"}
		                           ]
					   };
		
		// Try an Empty Response!
		//responseJSON = {eventList:[]};
	}
	
	function getAllEventsList() {
		$("#PrimaryEventListContainer").empty();
		getDummyData();    // Remove the getDummyData function if URL is ready.
		$.ajax({
			//url: 'url?', // Supply the url? if URL ready. Or just try what happens if you un.comment this line.
			url:'http://localhost:8888/admin/event/get', // MODIFIED
			data: responseJSON, // MODIFIED
			type: 'GET',
			success: function(data, status, jqXHR){
				var htmlFormattedListString = "";
				$.each(data.events, function(index, value) {// MODIFIED
					htmlFormattedListString += "<div class='col-lg-3 col-md-6 text-center'>" +
		                					   "<div class='service-box'>" +
		                					   "<a href='/event'>" + //Make the link dynamic if ready.
		                					   "<i class='fa fa-4x fa-diamond wow bounceIn text-primary'></i>" +
		                					   "</a>" +
		                					   "<h3>" + value.eventName +"</h3>" +// MODIFIED
		                    				   "<p class='text-muted'>" + value.description +"</p>" +// MODIFIED
		                    				   "</div></div>";
					return index < 3;
				});
				
				if(htmlFormattedListString == "")
				{
					htmlFormattedListString = "<div><h3>That was wierd? (0.o)</h3><br>There are no available events right now.</div>";
				}

				$("#PrimaryEventListContainer").html(htmlFormattedListString);
			},
			error: function(jqXHR, status, error) {;
				$("#PrimaryEventListContainer").html("<div><h3>Oops! We're sorry.</h3><br>Something wrong happened, but we will assure we can fix it soon.</div>");
			}
		});
	}
});*/