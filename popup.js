// Retrieve the history data with time spent
/*
function getHistoryWithTimeSpent() {
  return new Promise((resolve) => {
    browser.runtime.sendMessage(
      {
        from: "popup",
        subject: "GetHistoryWithTimeSpent",
      },
      resolve
    );
  });
}

// Display the data in the popup
async function displayHistoryWithTimeSpent() {
  const historyItems = await getHistoryWithTimeSpent();
  const container = document.getElementById("history-container");

  container.innerHTML = "";
  historyItems.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.title || "No title"}</strong> - <a href="${
      item.url
    }" target="_blank">${item.url}</a><br>
      Time Spent: ${item.timeSpentInSeconds} seconds <br>
      Last Visit: ${new Date(item.lastVisitTime).toLocaleString()}<hr>
    `;
    container.appendChild(div);
  });
}

// Load data when the popup is opened
document.addEventListener("DOMContentLoaded", displayHistoryWithTimeSpent);
*/
