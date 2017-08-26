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
	sendResponse({msg:"Done!" });
	if(request.msg == "executeNotify"){

		
	}
});

