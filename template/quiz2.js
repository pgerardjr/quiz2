(function() {
	
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.
	
	var items = [];
	$mouseover = $('.mouse-over');
	$click     = $('.click');
	$sub       = $('.submit');
	$timeout   = $('.timeout');
	var testApi = "http://www.mattbowytz.com/simple_api.json?data=quizData";
	var sId = readCookie('sessionId');
	$(document).ready(function() {
		
		/*
		  Wanted to make the fadeIn function work.
		  Decided to update the CSS via Javascript.
		 */
		
		$timeout.hide();
		$timeout.css('visibility','visible');
		setTimeout(function(){
			$timeout.fadeIn('slow');
			//console.log("Bow");
			}, 1000);
	}); //End Document Ready Function
	
	$mouseover.mouseover(function() {
		//console.log('Mouseover working');
		//$this = $(this);
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});//End of MouseOver Action

	$click.click('click', function() {
		$(this).html('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});//End of Click Action

	$sub.on('submit', function(e) {
		
		if ($(this).find('input[type="text"]').val() != '') {
			
			/* 
 			  Not sure if this is right, but it iterates twice since we have
			  two inputs
			*/
			$(this).find('input').each(function() {
				$(this).fadeOut("slow");
				//console.log('a');
			});
			
			$(this).html("<h2>Congratulations! You've entered some text!</h2>").hide().fadeIn('slow');
		}
		e.preventDefault();
	});//End of submistion

	//AJAX Request function
	var jqxhr = $.getJSON( testApi, function( data ) {
		
		
		//console.log(data.data.interests[1]);
	
		
		/* Here, we'll begin to collect the data stored in the api
		database in an array called list for both interest and programming */
			
		$.each(data.data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val  + "</li>" );
		//items.push(val);
		
		});
	
 
		
	});//End AJAX Response
	
		/*
		$("#button2").click('click', function(){
		var sId = "s234543245";
		writeCookie('sessionId', sId, 3);
		console.log('active');
	});//End of Session Storing button
	*/
	
	//Button Control Function
	$("#button1").click('click', function(){
			
	   // console.log(items);
		$( "<div>", {
		"id": "my-new-list",
		html: items.join( "" )
		}).appendTo( "#list" );
		
		$("#button1").html("Change It");


		
		var newButton = $('<button/>',
		{
			text: 'Test',
			click: function () { 	
			var sId = 's234543245';
			writeCookie('sessionId', sId, 3);
			//console.log('active'); 
			}
		});

		var parent = $('#list').append(newButton).end();
		
	});
	
	$("#button2").click('click', function(){
	
	});//End of Session Storing button
	
	
	//Scripts to write and read cookies. Currently not sure if it's working correctly
	//Scripts taken from webpage: http://www.quirksmode.org/js/cookies.html
	function writeCookie(name,value,days) {
		var date, expires;
		if (days) {
			date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires=" + date.toGMTString();
				}else{
			expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
		//console.log(name);
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
})();