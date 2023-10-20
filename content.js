let selectedElement = null;
let selecting = false;
let awaitParentDivSelection = false;
let modifiedElements = [];  // To store all modified elements

document.addEventListener("mouseover", function(e) {
    if (!selecting) return;

    e.stopPropagation(); // Prevents this event from bubbling up to other listeners

    if (selectedElement) {
        selectedElement.style.outline = "";  // Reset the outline of the previously hovered element
    }
    selectedElement = e.target;
    selectedElement.style.outline = "2px solid blue";  // Set the outline for the currently hovered element
});

document.addEventListener("click", function(e) {
    if (selecting) {
        e.preventDefault();
        if (!selectedElement) return;

        if (awaitParentDivSelection) {
            sortDivsBySelectedElement();
            awaitParentDivSelection = false;
        } else {
            modifiedElements.push({
                element: selectedElement,
                originalBackground: selectedElement.style.backgroundColor
            });

            selectedElement.style.background = "red";
            selectedElement.style.outline = "";
            console.log("Selected element:", selectedElement);
        }

        selecting = false;
        enablePointerEvents();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startSelection") {
        console.log("Message received. Starting element selection.");
        selecting = true;
        disablePointerEvents();
        sendResponse({ status: "selectionStarted" });
    } else if (request.action === "resetChanges") {
        console.log("Resetting changes.");
        for (let item of modifiedElements) {
            item.element.style.background = item.originalBackground;
            item.element.style.outline = "";
        }
        modifiedElements = [];
        sendResponse({ status: "changesReset" });
    } else if (request.action === "awaitParentDivSelection") {
        console.log("Awaiting element selection for getParentDiv.");
        selecting = true;
        awaitParentDivSelection = true;
        disablePointerEvents();
    }
});

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "contentScript");
    port.onDisconnect.addListener(function() {
        console.log("Disconnected");
    });
});

function sortDivsBySelectedElement() {
    console.log("sortDivsBySelectedElement function called!");

    if (selectedElement) {
        let parentDiv = selectedElement.closest("div");
        
        // Logging the text content of the selected element
        console.log("Selected element content:", selectedElement.textContent.trim());

        if (parentDiv) {
            console.log("Parent div of the selected element:", parentDiv);
            // Logging the text content of the parent div
            console.log("Parent div content:", parentDiv.textContent.trim());
        } else {
            console.log("Selected element does not have a parent div.");
        }
    } else {
        console.log("No element has been selected.");
    }
}

function disablePointerEvents() {
    const style = document.createElement('style');
    style.id = 'disable-pointer-events-style';
    style.innerHTML = `* { pointer-events: none; }`;
    document.head.appendChild(style);
}

function enablePointerEvents() {
    const style = document.getElementById('disable-pointer-events-style');
    if (style) {
        style.remove();
    }
}
