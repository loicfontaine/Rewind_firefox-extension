//const monitoredKeywords = ["example", "mozilla", "specificKeyword"]; // Add your keywords here
/*
function isMonitoredUrl(url) {
  //return monitoredKeywords.some((keyword) => url.includes(keyword));
  return true;
}

// Store the time spent data locally
function storeTimeSpent(pageUrl, timeSpent) {
  console.log("storeTimeSpent", "pageUrl", pageUrl, "timeSpent", timeSpent);
  browser.storage.local.get("timeSpentData").then((result) => {
    const timeSpentData = result.timeSpentData || {};

    if (timeSpentData[pageUrl]) {
      timeSpentData[pageUrl] += timeSpent;
    } else {
      timeSpentData[pageUrl] = timeSpent;
    }

    browser.storage.local.set({ timeSpentData });
  });
}

// Receive messages from the content script
browser.runtime.onMessage.addListener((message) => {
  if (
    message.from === "contentScript" &&
    message.subject === "TimeSpentOnPage"
  ) {
    const pageUrl = message.pageUrl;
    const timeSpent = message.timeSpent;

    storeTimeSpent(pageUrl, timeSpent);
  }
});

// Fetch browsing history and combine it with the time spent data
function getHistoryWithTimeSpent(callback) {
  browser.history.search({ text: "", maxResults: 100 }).then((historyItems) => {
    browser.storage.local.get("timeSpentData").then((result) => {
      const timeSpentData = result.timeSpentData || {};
      const combinedData = historyItems
        .filter((item) => isMonitoredUrl(item.url))
        .map((item) => {
          const timeSpent = timeSpentData[item.url] || 0;
          return {
            ...item,
            timeSpent,
            timeSpentInSeconds: (timeSpent / 1000).toFixed(2),
          };
        });

      callback(combinedData);
    });
  });
}


*/

let startTime = null;
let totalTimeSpent = 0;
let currentUrl = "";

function startTimer(url) {
  startTime = Date.now();
  currentUrl = url;
}

function stopTimer() {
  if (startTime) {
    totalTimeSpent += Date.now() - startTime;
    startTime = null;
    // Enregistrer le temps passé sur l'URL actuelle
    storeTimeSpent(currentUrl, totalTimeSpent);
    totalTimeSpent = 0; // Réinitialiser pour la prochaine utilisation
  }
}

function storeTimeSpent(pageUrl, timeSpent) {
  console.log(`Time spent on ${pageUrl}: ${timeSpent / 1000} seconds`);
  browser.storage.local.get("timeSpentData").then((result) => {
    const timeSpentData = result.timeSpentData || {};

    if (timeSpentData[pageUrl]) {
      timeSpentData[pageUrl] += timeSpent;
    } else {
      timeSpentData[pageUrl] = timeSpent;
    }

    browser.storage.local.set({ timeSpentData });
  });
}

browser.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === browser.windows.WINDOW_ID_NONE) {
    // Le navigateur a perdu le focus
    isBrowserFocused = false;
    stopTimer();
  } else {
    // Le navigateur a reçu le focus
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        isBrowserFocused = true;
        startTimer(tabs[0].url);
      }
    });
  }
});

// Écouter les changements d'onglet
browser.tabs.onActivated.addListener((activeInfo) => {
  stopTimer(); // Arrêter le timer sur l'ancien onglet
  browser.tabs.get(activeInfo.tabId, (tab) => {
    startTimer(tab.url); // Démarrer le timer sur le nouvel onglet
  });
});

// Écouter les mises à jour d'onglet (pour les changements d'URL dans le même onglet)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    stopTimer(); // Arrêter le timer car l'URL a changé
    startTimer(changeInfo.url); // Démarrer le timer avec la nouvelle URL
  }
});

// Make the data retrievable for the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (
    message.from === "popup" &&
    message.subject === "GetHistoryWithTimeSpent"
  ) {
    getHistoryWithTimeSpent(sendResponse);
    return true; // Required to use asynchronous `sendResponse`
  }
});
