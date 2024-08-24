document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-button');
    const toggleLabel = document.getElementById('toggle-label');
    const protectionMessage = document.getElementById('protection-message');
    const websiteNameElement = document.getElementById('website-name');
    const faviconElement = document.getElementById('favicon');
    const blockedAdsElement = document.getElementById('blocked-ads');
    const totalAdsElement = document.getElementById('total-ads');

    let totalAdsBlocked = 0;
    
    // Fetch the current website's name and favicon
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        const url = new URL(tab.url);
        const websiteName = url.hostname;
        const faviconUrl = tab.favIconUrl || 'icons/default-favicon.png';

        websiteNameElement.textContent = websiteName;
        faviconElement.src = faviconUrl;
    });

    // Get total ads blocked from storage
    chrome.storage.local.get('totalAdsBlocked', function (data) {
        totalAdsBlocked = data.totalAdsBlocked || 0;
        totalAdsElement.textContent = `Total: ${totalAdsBlocked}`;
    });

    // Listen to the content script to update blocked ads count
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'updateBlockedAds') {
            animateCount(blockedAdsElement, request.blockedAdsCount);
            totalAdsBlocked += request.blockedAdsCount;
            totalAdsElement.textContent = `Total: ${totalAdsBlocked}`;
            
            // Save total ads blocked to storage
            chrome.storage.local.set({ totalAdsBlocked: totalAdsBlocked });
        }
    });

    // Animation for counting numbers
    function animateCount(element, newValue) {
        const currentCount = parseInt(element.textContent.replace('Blocked: ', ''));
        const duration = 1000; // 1 second
        const startTime = performance.now();

        function updateCount(timestamp) {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const count = Math.floor(progress * (newValue - currentCount) + currentCount);
            element.textContent = `Blocked: ${count}`;
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    toggleButton.addEventListener('change', function () {
        if (toggleButton.checked) {
            toggleLabel.textContent = 'ON';
            protectionMessage.textContent = 'You are protected against the tracker & ads';
            protectionMessage.className = 'protection-on';

            // Enable ad blocking
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ['dynamic_rules']
            });

            // Inject the content script
            chrome.scripting.executeScript({
                target: { allFrames: true },
                files: ['contentScript.js']
            });

        } else {
            toggleLabel.textContent = 'OFF';
            protectionMessage.textContent = 'You are NOT protected';
            protectionMessage.className = 'protection-off';

            // Disable ad blocking
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ['dynamic_rules']
            });

            // Disable the content script
            chrome.scripting.removeCSS({
                target: { allFrames: true }
            });
        }
    });
});
