$(document)
.ready(function()
{
	$('#signin').click(function(){
	var username = $(#username).val();
	var password = $(#password).val();
	var jsonData = {
			data: JSON.stringify({
				username: username,
				password: password
			})
		};
		$.ajax({
			url: '/login',
			type: 'POST',
			data: jsonData,
			dataType: 'json',
			success: function(data, status, jqXHR){
				if(validate()){
					alert('Sign in successful');
				} else{
				
				}
			}
			error: function(jqXHR, status, error) {
		
			}
		});
	});
	
});

function validate(){
	if($(#username).val() == ''){
		alert("Must provide a username");
		$("#username").focus();
		return false;
	}
	if($(#password).val() == ''){
		alert("Must provide a password")
		$("#password").focus();
		return false;
	}
	return true;
}