//          popup js
//         =============
//		Author:   Karthik Samyak
//      Updated:  August 2017

var buttonOverlay = document.querySelector("#toggle_overlay");
var buttonNotify = document.querySelector("#toggle_notify");
function setToggle(checker) {	// this function checks overlay toggle button for correct transition on each time popup.html is called
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

function setToggleNotify(checker) {	// this function checks overlay toggle button for correct transition on each time popup.html is called
	if(checker == "checked"){
		console.log("checked! now unchecking...");
		buttonNotify.setAttribute("checked","checked");
		chrome.storage.local.set({"checkedNotifyButton": "checked"}, function(result){});		
	}
	else{
		console.log("unchecked! now checking...");
		buttonNotify.setAttribute("checked","");
		buttonNotify.removeAttribute("checked");
		buttonNotify.checked = false;
		chrome.storage.local.set({"checkedNotifyButton": "unchecked"}, function(result){});		
	}
}

function setToggle2(checker) {  // function to toggle between on/off on overlay button click
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

function setToggleNotify2(checker) {  // function to toggle between on/off on Notify button click
	if(checker == "unchecked"){
		console.log("unchecked! now checking...");
		buttonNotify.setAttribute("checked","checked");
		chrome.storage.local.set({"checkedNotifyButton": "checked"}, function(result){});
	}
	else{
		console.log("checked! now unchecking...");
		buttonNotify.setAttribute("checked","");
		buttonNotify.removeAttribute("checked");
		buttonNotify.checked = false;
		chrome.storage.local.set({"checkedNotifyButton": "unchecked"}, function(result){});
	}
}



$(document).ready(function(){

	chrome.storage.local.get("checked", function(data){
	  	setToggle(data.checked);
	});

	chrome.storage.local.get("checkedNotifyButton", function(data){	
	  	setToggleNotify(data.checkedNotifyButton);
    });

    buttonOverlay.onchange = function(){
	    console.log("buttonOverlay clicked");
	    chrome.storage.local.get("checked", function(data){	
	  		setToggle2(data.checked);
    	});

	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		 	chrome.tabs.sendMessage(tabs[0].id, {msg:"executeOverlay"}, function(response) {      
        	});
		});

    };

    buttonNotify.onchange = function(){
    	console.log("buttonNotify clicked");
    	chrome.storage.local.get("checkedNotifyButton", function(data){	
	  		setToggleNotify2(data.checkedNotifyButton);
    	});
    	
    	chrome.runtime.sendMessage({msg:"executeNotify"}, function(response){
    		console.log(response.msg);
    	});
    };

});

