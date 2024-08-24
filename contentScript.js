// List of CSS selectors for ad elements to remove
const adSelectors = [
    "iframe[src*='ads']",
    "iframe[src*='doubleclick']",
    "div[id*='ad']",
    "div[class*='ad']",
    "img[src*='ads']",
    "img[src*='doubleclick']",
    // Add more selectors as needed
];

// Function to remove ad elements from the DOM
function removeAdElements() {
    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            console.log(`Removing ad element:`, element);
            element.remove(); // Remove the element from the DOM
        });
    });
}

// Run the function to remove ad elements
removeAdElements();

// Use MutationObserver to watch for dynamically loaded ads
const observer = new MutationObserver(removeAdElements);
observer.observe(document.body, { childList: true, subtree: true });

console.log("AdBlocker script running");
