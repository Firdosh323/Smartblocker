document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-button');
    const toggleLabel = document.getElementById('toggle-label');
    const protectionMessage = document.getElementById('protection-message');

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
