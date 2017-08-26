//          popup js
//         =============
//		Author:   Karthik Samyak
//      Updated:  August 2017

var buttonOverlay = document.querySelector("#toggle_overlay");
var buttonNotify = document.querySelector("#toggle_notify");
function setToggle(checker) {	// this function checks overlay toggle button for correct transition on each time popup.html is called
	if(checker == "checked"){
		console.log("checked! now again checking...");
		buttonOverlay.setAttribute("checked","checked");
		chrome.storage.local.set({"checked": "checked"}, function(result){});		
	}
	else{
		console.log("unchecked! now again  unchecking...");
		buttonOverlay.setAttribute("checked","");
		buttonOverlay.removeAttribute("checked");
		buttonOverlay.checked = false;
		chrome.storage.local.set({"checked": "unchecked"}, function(result){});		
	}
}

function setToggleNotify(checker) {	// this function checks overlay toggle button for correct transition on each time popup.html is called
	if(checker == "checked"){
		console.log("checked! now again checking...");
		buttonNotify.setAttribute("checked","checked");
		chrome.storage.local.set({"checkedNotifyButton": "checked"}, function(result){});		
	}
	else{
		console.log("unchecked! now again unchecking...");
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
	  		button_1.setToggleOnChange(data.checked,"buttonOverlay");
    	});

	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  		 	chrome.tabs.sendMessage(tabs[0].id, {msg:"executeOverlay"}, function(response) {      
        	});
		});

    };

    buttonNotify.onchange = function(){
    	console.log("buttonNotify clicked");

    	chrome.storage.local.get("checkedNotifyButton", function(data){	
    		console.log("Inside first function");
	  		button_2.setToggleOnChange(data.checkedNotifyButton,"buttonNotify", function(){

	  		});	  		
    	});

    	setTimeout( function(){
	    	console.log("Now executing...after 1 sec");
		  	chrome.storage.local.get("checkedNotifyButton", function(data){
				if(data.checkedNotifyButton == "checked"){
					chrome.runtime.sendMessage({msg:"executeNotify"}, function(response){
					    console.log(response.response_msg);
					});
				}
				else if(data.checkedNotifyButton == "unchecked"){
					chrome.runtime.sendMessage({msg:"removeNotify"}, function(response){
					    console.log(response.response_msg);
					});
				}	
	    	});
	    },1000);
    };

}); // -------------------- End jQuery -----------------------------

function Button(buttonName){   // button constructor
	this.name = buttonName;
}

Button.prototype.setToggleOnChange = function(checker,button){  // function to toggle between on/off on button change
	if(checker == "unchecked"){
		console.log("unchecked! now checking...");
		this.name.setAttribute("checked","checked");
		if(button == "buttonOverlay"){
			chrome.storage.local.set({"checked": "checked"}, function(result){});
		}
		else{
			chrome.storage.local.set({"checkedNotifyButton": "checked"}, function(result){});
		}
	}
	else{
		console.log("checked! now unchecking...");
		this.name.setAttribute("checked","");
		this.name.removeAttribute("checked");
		this.name.checked = false;
		if(button == "buttonOverlay"){
			chrome.storage.local.set({"checked": "unchecked"}, function(result){});
		}
		else{
			chrome.storage.local.set({"checkedNotifyButton": "unchecked"}, function(result){});
		}
	}
};

var button_1 = new Button(buttonOverlay);  // buttonOverlay object
var button_2 = new Button(buttonNotify);  // buttonNotify object
