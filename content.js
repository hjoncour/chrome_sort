let selectedElement = null;
let selecting = false;
let modifiedElements = [];  // To store all modified elements

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

    // Save the original color and element to the array
    modifiedElements.push({
        element: selectedElement,
        originalBackground: selectedElement.style.backgroundColor
    });
    
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

        sendResponse({ status: "selectionStarted" });
    } else if (request.action === "resetChanges") {
        console.log("Resetting changes.");

        // Iterate over all modified elements and reset their styles
        for (let item of modifiedElements) {
            item.element.style.background = item.originalBackground;
            item.element.style.outline = "";
        }

        // Clear the array after resetting
        modifiedElements = [];

        sendResponse({ status: "changesReset" });
    }
});

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "contentScript");
    port.onDisconnect.addListener(function() {
        console.log("Disconnected");
    });
});
