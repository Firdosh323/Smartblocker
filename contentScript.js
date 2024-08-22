// List of CSS selectors for ad elements to block
const adSelectors = [
    "iframe[src*='ads']",
    "iframe[src*='doubleclick']",
    "div[id*='ad']",
    "div[class*='ad']",
    "img[src*='ads']",
    "img[src*='doubleclick']",
    // Add more selectors as needed
];

// Function to hide ad elements
function hideAdElements() {
    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.display = 'none'; // Hide the element
        });
    });
}

// Run the function to hide ad elements
hideAdElements();

// Use MutationObserver to watch for dynamically loaded ads
const observer = new MutationObserver(hideAdElements);
observer.observe(document.body, { childList: true, subtree: true });
