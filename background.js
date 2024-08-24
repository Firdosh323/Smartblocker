chrome.runtime.onInstalled.addListener(() => {
    console.log("Ad Blocker Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBlockedAds') {
        // Handle updating the total ads blocked if needed
    }
});
