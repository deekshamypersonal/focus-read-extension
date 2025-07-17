// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete') {


//         let overlayOn=false;
//         chrome.storage.sync.set({ 'overlayState': overlayOn });
//         chrome.storage.sync.set({ 'read': overlayOn });
//     }
// });

//-------------------

// background.js (MV3 service‑worker)


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ overlayState: false, read: false });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.set({ overlayState: false, read: false });
  }
});
