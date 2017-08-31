//          popup js
//         =============
//		  Karthik Samyak
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

function setToggleNotify(checker) {	// this function checks notify toggle button for correct transition on each time popup.html is called
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

function notify_all_tabs(request) 
{
	chrome.windows.getAll({populate: true}, function(windows) {
		windows.forEach(function(win) {
			win.tabs.forEach(function(tab) {
				chrome.tabs.sendMessage(tab.id, request);
			});
		});
	});
}

function reset() {
	
	chrome.storage.local.get("opacity", function(data){		
		$('#opacity_slider').slider("value", data.opacity);
		console.log("after reset:" + data.opacity);
		$("#slider1_value").text("Intensity : " + data.opacity);
	});
	chrome.storage.local.get("intensity",function(data){
		$('#intensity_slider').slider("value", data.intensity);
		$("#slider2_value").text("Tune : " + data.intensity);
	});
}

/*----------------jQuery begin------------*/

$(document).ready(function(){

	$("#opacity_slider").slider({
		range: "min",
		max: 90,
		min: 0,
		step: 1,
		value: 30,
		slide: function(event, ui) {
			var value = $("#opacity_slider").slider( "value" );
			chrome.storage.local.set({"opacity":value}, function(data){});
			notify_all_tabs({msg: "set_opacity"});
			console.log("opacity: " + value);
			$("#slider1_value").text("Intensity : " + value);
		}
	});

	$("#intensity_slider").slider({
		range: "min",
		max: 255,
		min: 150,
		step: 2,
		value: 255,
		slide: function(event, ui) {
			var value = $("#intensity_slider").slider( "value" );
			chrome.storage.local.set({"intensity":value}, function(data){});
			notify_all_tabs({msg: "set_intensity"});
			console.log("intensity: " + value);
			$("#slider2_value").text("Tune : " + value);
		}
	});

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

   reset();

   chrome.storage.local.get("checked",function(data){
		if(data.checked == "checked"){
	  		console.log("inside if");
   			$("#sliders").slideDown();
   		}
   		else{
   			console.log("inside else");
   			$("#sliders").hide();
   		}
	});


}); // -------------------- End jQuery -----------------------------

function Button(buttonName){   // button constructor
	this.name = buttonName;
}

Button.prototype.setToggleOnChange = function(checker,button){  // prototype method to toggle between on/off on button change
	if(checker == "unchecked"){
		console.log("unchecked! now checking...");
		this.name.setAttribute("checked","checked");
		if(button == "buttonOverlay"){
			chrome.storage.local.set({"checked": "checked"}, function(result){
				chrome.storage.local.get("checked",function(data){
					if(data.checked == "checked"){
				  		console.log("inside slideDown");
			   			$("#sliders").slideDown();
			   		}
			   		
				});
			});
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
			chrome.storage.local.set({"checked": "unchecked"}, function(result){
				chrome.storage.local.get("checked",function(data){
					console.log("inside slideUp");
			   		$("#sliders").slideUp();
				});
			});
		}
		else{
			chrome.storage.local.set({"checkedNotifyButton": "unchecked"}, function(result){});
		}
	}
};

var button_1 = new Button(buttonOverlay);  // buttonOverlay object
var button_2 = new Button(buttonNotify);  // buttonNotify object


