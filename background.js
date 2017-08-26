// write the code that you want to run all the time when corona is enabled!


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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	if(request.msg == "executeNotify"){
		console.log("setting alarm");
		chrome.alarms.create("alarmNotify", {periodInMinutes:1});
		sendResponse({response_msg:"Done! alarmNotify set" });		
	}
	else if(request.msg == "removeNotify"){
		console.log("removing alarm");
		chrome.alarms.clearAll(function(){ });
		sendResponse({response_msg:"Done! alarmNotify removed" });
	}
});

chrome.alarms.onAlarm.addListener(function(alarm){
    alert("Alarm Ringing!!!!!");
});

