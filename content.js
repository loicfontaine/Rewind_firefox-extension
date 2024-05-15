//const monitoredKeywords = ["example", "mozilla", "specificKeyword"]; // Add your keywords here
/*
let startTime = null;
let totalTimeSpent = 0;
console.log("content.js");

function isMonitoredUrl(url) {
  //return monitoredKeywords.some((keyword) => url.includes(keyword));
  return true;
}

function updateVisibilityState() {
  console.log("updateVisibilityState");
  if (document.visibilityState === "visible") {
    console.log("visible");
    // The page is visible, start timing
    startTime = Date.now();
  } else {
    // The page is hidden, calculate the time spent
    if (startTime) {
      console.log("calculate time spent");
      totalTimeSpent += Date.now() - startTime;
      startTime = null;
    }
  }
}

// Listen to visibility changes
document.addEventListener("visibilitychange", updateVisibilityState);

// Send a message to the background script on page unload
window.addEventListener("beforeunload", () => {
  console.log("beforeunload");
  if (startTime) {
    totalTimeSpent += Date.now() - startTime;
  }

  const currentUrl = window.location.href;

  // Send only if the URL contains monitored keywords
  if (isMonitoredUrl(currentUrl)) {
    browser.runtime.sendMessage({
      from: "contentScript",
      subject: "TimeSpentOnPage",
      timeSpent: totalTimeSpent,
      pageUrl: currentUrl,
    });
  }
});

// Initialize the timer
updateVisibilityState();
*/
