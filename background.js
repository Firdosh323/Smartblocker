importScripts('adsList.js');

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1], // This is to clear existing rules with the same ID
    addRules: [
        {
            "id": 1,
            "priority": 1,
            "action": {
                "type": "block"
            },
            "condition": {
                "urlFilter": adDomains.join('|'),
                "resourceTypes": ["script", "image", "xmlhttprequest", "sub_frame"]
            }
        }
    ]
});
