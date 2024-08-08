document.addEventListener("DOMContentLoaded", init);

function init() {
  document.getElementById("clear-data").addEventListener("click", () => {
    browser.storage.local.clear();
    browser.runtime.reload();
  });
}
