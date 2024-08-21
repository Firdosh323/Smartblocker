// Array of ad domains/URLs to be blocked
const adDomains = [
    "doubleclick.net",
    "googleadservices.com",
    "googlesyndication.com",
    "adservice.google.com",
    "ads.yahoo.com",
    "adclick.g.doubleclick.net",
    "adnxs.com",
    "ads.twitter.com",
    "ads.facebook.com",
    "amazon-adsystem.com",
    "pubmatic.com",
    "rubiconproject.com",
    "criteo.com",
    "adform.net",
    "adroll.com",
    "appnexus.com",
    "outbrain.com",
    "taboola.com",
    "openx.net",
    "zedo.com",
    "revcontent.com",
    "adtech.de",
    "triplelift.com"
    // Add more ad domains as needed
];

// Array of CSS selectors for ad elements to block
const adSelectors = [
    "iframe[src*='ads']",
    "iframe[src*='doubleclick']",
    "div[id*='ad']",
    "div[class*='ad']",
    "img[src*='ads']",
    "img[src*='doubleclick']",
    // Add more selectors as needed
];
