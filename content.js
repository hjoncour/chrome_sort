let selectedElement = null;
let selecting = false;

document.addEventListener("mouseover", function(e) {
  if (!selecting) return;
  if (selectedElement) {
    selectedElement.style.outline = "";
  }
  selectedElement = e.target;
  selectedElement.style.outline = "2px solid blue";
});

document.addEventListener("click", function(e) {
  if (!selecting || !selectedElement) return;

  selectedElement.style.background = "red";
  selectedElement.style.outline = "";
  console.log("Selected element:", selectedElement);
  e.preventDefault();
  selecting = false; 
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "startSelection") {
    console.log("Message received. Starting element selection.");
    selecting = true;
  }
});
