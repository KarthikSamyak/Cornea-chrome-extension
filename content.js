//          Content js
//         =============
//		  Karthik Samyak
//      Updated:  August 2017

function shader(passedToggle){
	console.log("executing shader");
	console.log(passedToggle);
	if(passedToggle){	
		$("html").append( "<div id='overlay'></div>" );
		$("html").append( "<div id='overlayBehind'></div>" ); // appending div element to body with an id overlay
		$("#overlay").css({								// specifying CSS properties for the overlay div element
			"position" : "fixed",
			"width" : "100%",
			"height" : "100%",
			"z-index" : "88888",		
			"background": "rgb(255,129,0)",
			"opacity": "0.7",
			"top" : "0",
			"left" : "0",
			"pointer-events": "none",				// allow users to interact with webpage without blocking pointer events 
			"mix-blend-mode": "multiply"		
		});

		$("#overlayBehind").css({					// specifying CSS properties for the overlayBehind div element ( it helps in achieving multily blend mode)
			"position" : "fixed",
			"width" : "100%",
			"height" : "100%",
			"z-index" : "88887",		
			"background": "black",
			"opacity": "0.5",
			"top" : "0",
			"left" : "0",
			"pointer-events": "none",
		});
				
	}
	else{
		$("#overlay").remove();		// remove overlay div element
		$("#overlayBehind").remove();
	}	
}

function opacity(passedOpacity){
	console.log("executing opacity" + passedOpacity);
	passedOpacity = passedOpacity/100;
	$("#overlay").css({
		"opacity": passedOpacity
	});
}

function blueIntensity(passedIntensity){
	console.log("executing intensity" + passedIntensity);
	var red = passedIntensity;
	chrome.storage.local.get("opacity",function(data){
		
	});
	$("#overlay").css({
		"background": "rgb("+red+",129,0)"
	});
}




$(document).ready(function(){
	chrome.storage.local.get("toggle", function(result){
    console.log("document onload");
    shader(result.toggle);
    chrome.storage.local.get("opacity", function(data){
	    	opacity(data.opacity);
	    });
    chrome.storage.local.get("intensity", function(data){
			blueIntensity(data.intensity);
		});
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
		else if(request.msg == "set_opacity"){
			chrome.storage.local.get("opacity", function(data){
	    	    opacity(data.opacity);
	    	});
		}
		else if(request.msg == "set_intensity"){
			chrome.storage.local.get("intensity", function(data){
				blueIntensity(data.intensity);
			});
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




