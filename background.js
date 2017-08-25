// write the code that you want to run all the time when corona is enabled!


chrome.storage.local.set({"toggle": false}, function() {
    // Notify that we saved.
    console.log('Settings saved for shader toggle');
});

chrome.storage.local.set({"checked": "unchecked"}, function(result){
	// Notify that we saved.
	console.log("Settings saved for button toggle");
});




