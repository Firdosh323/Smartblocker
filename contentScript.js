// Import adSelectors from adsList.js
importScripts('adsList.js');

// Function to hide ad elements
function hideAdElements() {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none'; // Hide the element
    });
  });
}

// Run the function to hide ad elements initially
hideAdElements();

// Optional: Use MutationObserver to watch for dynamically loaded ads
const observer = new MutationObserver(hideAdElements);
observer.observe(document.body, { childList: true, subtree: true });
