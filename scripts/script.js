document.getElementById("startSelection").addEventListener("click", async function() {
  console.log("Button clicked. Sending startSelection message.");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "startSelection" });

  window.close();
});

document.getElementById("resetChanges").addEventListener("click", async function() {
  console.log("Reset button clicked. Sending reset message.");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "resetChanges" });

  window.close();
});

document.getElementById("getParentDiv").addEventListener("click", async function() {
  console.log("Get Parent Div button clicked. Sending getParentDivMessage.");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "awaitParentDivSelection" });

  window.close();
});
