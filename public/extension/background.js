let state = {
  scanId: null,
  serverUrl: 'http://localhost:8000',
  status: null,
  target: null,
  mode: 'demo'
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'get_state') {
    sendResponse({ state });
  }
});
