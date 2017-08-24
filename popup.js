//          popup js
//         =============
//		Author:   Karthik Samyak
//      Updated:  August 2017

var button = document.querySelector("#toggle");
function setToggle(checker) {	// this function checks toggle button for correct transition on each time popup.html is called
	if(checker == "checked"){
		button.setAttribute("checked","checked");
		chrome.storage.local.set({"checked": "checked"}, function(result){});
	}
	else{
		button.setAttribute("checked","");
		button.removeAttribute("checked");
		button.checked = false;
		chrome.storage.local.set({"checked": "unchecked"}, function(result){});
	}

}

function setToggle2(checker) {  // function to toggle between on/off on button click
	if(checker == "unchecked"){
		button.setAttribute("checked","checked");
		chrome.storage.local.set({"checked": "checked"}, function(result){});
	}
	else{
		button.setAttribute("checked","");
		button.removeAttribute("checked");
		button.checked = false;
		chrome.storage.local.set({"checked": "unchecked"}, function(result){});
	}
}






$(document).ready(function(){

	chrome.storage.local.get("checked", function(data){
	  	setToggle(data.checked);
	});

    button.onchange = function(){
	    console.log("buttonchanged");
	    chrome.storage.local.get("checked", function(data){	
	  		setToggle2(data.checked);
    	});

	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		 	chrome.tabs.sendMessage(tabs[0].id, {"simple": true}, function(response) {      
        	});
		});

    }; 


});

