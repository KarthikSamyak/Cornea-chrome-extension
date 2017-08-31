//         background js
//         =============
//		  Karthik Samyak
//      Updated:  August 2017


chrome.storage.local.set({"toggle": false}, function() {    // Setting overlay variable 
    // Notify that we saved.
    console.log('Settings saved for shader toggle');
});

chrome.storage.local.set({"checked": "unchecked"}, function(result){  // Setting buttonOverlay variable
	// Notify that we saved.
	console.log("Settings saved for buttonOverlay toggle");
});

chrome.storage.local.set({"toggleNotify": false}, function() {  // setting Notify variable
    // Notify that we saved.
    console.log('Settings saved for Notify toggle');
});

chrome.storage.local.set({"checkedNotifyButton": "unchecked"}, function(result){  // Setting buttonNotify variable
	// Notify that we saved.
	console.log("Settings saved for buttonNotify toggle");
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){   // Recieves messages from other scripts
	
	if(request.msg == "executeNotify"){
		console.log("setting alarm");
		chrome.alarms.create("alarmNotify", {periodInMinutes:1});
		if (Notification.permission !== "granted"){
    		Notification.requestPermission();
    	}
		sendResponse({response_msg:"Done! alarmNotify set" });		
	}
	else if(request.msg == "removeNotify"){
		console.log("removing alarm");
		chrome.alarms.clearAll(function(){ });
		sendResponse({response_msg:"Done! alarmNotify removed" });
	}
});

chrome.alarms.onAlarm.addListener(function(alarm){
    notify();
});

function notify() {
	if (Notification.permission !== "granted")
    	Notification.requestPermission();
  	else {
    	var notification = new Notification('Rest your Eyes!', {
      	icon: 'cornea_big.png',
      	body: "Close your eyes and gently cup your palms over your closed eyes and rest them for 30 seconds"
    });
  }
}

