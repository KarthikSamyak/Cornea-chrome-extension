//          Content js
//         =============
//		Author:   Karthik Samyak
//      Updated:  August 2017

function shader(passedToggle){
	console.log("executing shader");
	console.log(passedToggle);
	if(passedToggle){	
		$("body").append( "<div id='overlay'></div>" ); // appending div element to body with an id overlay
		$("#overlay").css({								// specifying CSS properties for the overlay div element
			"position" : "fixed",
			"width" : "100%",
			"height" : "100%",
			"z-index" : "88888",		
			"background": "#000",
			"opacity": "0.5",
			"top" : "0",
			"left" : "0",
			"pointer-events": "none"		// allow users to interact with webpage without blocking pointer events 
		});
				
	}
	else{
		$("#overlay").remove();		// remove overlay div element
	}	
}

$(document).ready(function(){
	chrome.storage.local.get("toggle", function(result){
    console.log("document onload");
    shader(result.toggle);
	}); 


	console.log("just before listening");
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
		console.log("Listening....");
		if(request.msg == "executeOverlay"){
		    chrome.storage.local.get("toggle", function(data){
		  		chrome.storage.local.set({"toggle": !data.toggle}, function(result){
	    	    	console.log('Settings saved');
	    	    	chrome.storage.local.get("toggle", function(data){
	    	    		shader(data.toggle);
	    	    	});
	  	       });    
			});
		}
		else if(request.msg == "executeFullscreen"){
			fullscreen();
			sendResponse({response_msg:"executed Fullscreen"});
		}
	});	

	
	
});

function fullscreen() {
	document.documentElement.webkitRequestFullScreen();
}

function notify() {
	if (Notification.permission !== "granted")
    	Notification.requestPermission();
  	else {
    	var notification = new Notification('Notification title', {
      	icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      	body: "Hey there! You've been notified!",
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
    };

  }
}




