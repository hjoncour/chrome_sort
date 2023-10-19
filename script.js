document.getElementById("startSelection").addEventListener("click", function() {
  console.log("Button clicked. Sending startSelection message.");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { action: "startSelection" });
    window.close();
  });
});
