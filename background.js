let startTime = null;
let totalTimeSpent = 0;
let currentUrl = "";
let currentTitle = "";

function startTimer(url, title) {
  startTime = Date.now();
  currentUrl = url;
  currentTitle = title;
}

function stopTimer() {
  if (startTime) {
    totalTimeSpent += Date.now() - startTime;
    startTime = null;
    if (totalTimeSpent > 1000) {
      storeTimeSpent(currentUrl, totalTimeSpent);
    }
    totalTimeSpent = 0;
  }
}

function storeTimeSpent(pageUrl, timeSpent) {
  browser.storage.local.get("timeSpentData").then((result) => {
    const timeSpentData = result.timeSpentData || [];
    timeSpentData.push({
      pageUrl: pageUrl,
      timeSpent: timeSpent,
      title: currentTitle,
      startTime: Date.now() - timeSpent,
      endTime: Date.now(),
    });
    browser.storage.local.set({ timeSpentData });
  });
}

browser.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === browser.windows.WINDOW_ID_NONE) {
    isBrowserFocused = false;
    stopTimer();
  } else {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        isBrowserFocused = true;
        startTimer(tabs[0].url, tabs[0].title);
      }
    });
  }
});

browser.tabs.onActivated.addListener((activeInfo) => {
  stopTimer();
  browser.tabs.get(activeInfo.tabId, (tab) => {
    startTimer(tab.url, tab.title);
  });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    stopTimer();
    startTimer(changeInfo.url, changeInfo.title);
  }
});
