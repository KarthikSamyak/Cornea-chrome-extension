//          popup js
//         =============
//		Author:   Karthik Samyak
//      Updated:  August 2017

var buttonOverlay = document.querySelector("#toggle_overlay");
var buttonNotify = document.querySelector("#toggle_notify");
function setToggle(checker) {	// this function checks toggle button for correct transition on each time popup.html is called
	if(checker == "checked"){
		console.log("checked! now unchecking...");
		buttonOverlay.setAttribute("checked","checked");
		chrome.storage.local.set({"checked": "checked"}, function(result){});
		
		
	}
	else{
		console.log("unchecked! now checking...");
		buttonOverlay.setAttribute("checked","");
		buttonOverlay.removeAttribute("checked");
		buttonOverlay.checked = false;
		chrome.storage.local.set({"checked": "unchecked"}, function(result){});		
	}

}

function setToggle2(checker) {  // function to toggle between on/off on button click
	if(checker == "unchecked"){
		console.log("unchecked! now checking...");
		buttonOverlay.setAttribute("checked","checked");
		chrome.storage.local.set({"checked": "checked"}, function(result){});
	}
	else{
		console.log("checked! now unchecking...");
		buttonOverlay.setAttribute("checked","");
		buttonOverlay.removeAttribute("checked");
		buttonOverlay.checked = false;
		chrome.storage.local.set({"checked": "unchecked"}, function(result){});
	}
}






$(document).ready(function(){

	chrome.storage.local.get("checked", function(data){
	  	setToggle(data.checked);
	});

    buttonOverlay.onchange = function(){
	    console.log("buttonOverlay clicked");
	    chrome.storage.local.get("checked", function(data){	
	  		setToggle2(data.checked);
    	});

	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		 	chrome.tabs.sendMessage(tabs[0].id, {"simple": true}, function(response) {      
        	});
		});

    };

    buttonNotify.onchange = function(){
    	console.log("buttonNotify clicked");
    	chrome.runtime.sendMessage("executeNotify", function(){
    		
    	});
    };

});

