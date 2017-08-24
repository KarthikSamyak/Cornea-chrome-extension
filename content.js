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
	    chrome.storage.local.get("toggle", function(data){
	  		chrome.storage.local.set({"toggle": !data.toggle}, function(result){
    	    	console.log('Settings saved');
    	    	chrome.storage.local.get("toggle", function(data){
    	    		shader(data.toggle);
    	    	});
  	       });    
		});
	});	
});





