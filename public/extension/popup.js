const domainEl = document.getElementById('currentDomain');
const cookieCountEl = document.getElementById('cookieCount');
const consentCheck = document.getElementById('consentCheck');
const serverUrlInput = document.getElementById('serverUrl');
const scanBtn = document.getElementById('scanBtn');
const statusEl = document.getElementById('status');
const recentScansEl = document.getElementById('recentScans');
const legalScroll = document.getElementById('legalScroll');

let currentDomain = '';
let cookies = '';
let consentScrolled = false;
let consentTimestamp = null;

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = `status ${type}`;
}

function hideStatus() {
  statusEl.className = 'status';
}

async function getDomainAndCookies() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab || !tab.url) {
      domainEl.textContent = 'No active tab';
      return;
    }
    const url = new URL(tab.url);
    currentDomain = url.hostname;
    domainEl.textContent = currentDomain;

    const allCookies = await chrome.cookies.getAll({ domain: currentDomain });
    cookieCountEl.textContent = allCookies.length;

    if (allCookies.length > 0) {
      const cookiePairs = allCookies.map(c => `${c.name}=${c.value}`);
      cookies = cookiePairs.join('; ');
    } else {
      cookies = '';
    }

    checkCanStart();
  } catch (err) {
    domainEl.textContent = 'Error loading tab';
    cookieCountEl.textContent = '0';
  }
}

function checkCanStart() {
  const hasConsent = consentCheck.checked && consentScrolled;
  scanBtn.disabled = !hasConsent || !currentDomain || currentDomain === 'Loading...';
}

// Scroll-to-accept: checkbox enables only after full scroll
legalScroll.addEventListener('scroll', () => {
  const atBottom = legalScroll.scrollHeight - legalScroll.scrollTop - legalScroll.clientHeight < 5;
  if (atBottom && !consentScrolled) {
    consentScrolled = true;
    consentCheck.disabled = false;
    consentCheck.focus();
    showStatus('Scroll complete — agree above to continue', 'info');
  }
});

consentCheck.addEventListener('change', () => {
  if (consentCheck.checked) {
    consentTimestamp = new Date().toISOString();
  } else {
    consentTimestamp = null;
  }
  checkCanStart();
});

function xhrRequest(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      try {
        const parsed = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(parsed);
        else reject(new Error(parsed.detail || `HTTP ${xhr.status}`));
      } catch (e) {
        reject(new Error(`HTTP ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('NetworkError when attempting to fetch resource'));
    xhr.send(JSON.stringify(data));
  });
}

scanBtn.addEventListener('click', async () => {
  if (scanBtn.disabled) return;
  let serverUrl = (serverUrlInput.value.trim() || 'http://localhost:8000').replace(/\/+$/, '');
  if (!serverUrl.startsWith('http')) serverUrl = 'http://' + serverUrl;

  scanBtn.disabled = true;
  scanBtn.textContent = 'Starting...';
  showStatus('Starting scan...', 'info');

  try {
    const body = { target: currentDomain };
    if (cookies) body.cookies = cookies;

    const data = await xhrRequest(`${serverUrl}/api/scan`, body);
    const scanId = data.scan_id;

    showStatus(`Scan started! ID: ${scanId}`, 'success');
    scanBtn.textContent = 'Opening dashboard...';

    // Save to recent scans
    const { recentScans = [] } = await chrome.storage.local.get('recentScans');
    recentScans.unshift({
      scanId,
      target: currentDomain,
      server: serverUrl,
      time: new Date().toLocaleTimeString()
    });
    await chrome.storage.local.set({ recentScans: recentScans.slice(0, 20) });

    const extUrl = chrome.runtime.getURL(`dashboard.html?scanId=${scanId}&server=${encodeURIComponent(serverUrl)}&target=${encodeURIComponent(currentDomain)}`);
    await chrome.tabs.create({ url: extUrl });
    window.close();
  } catch (err) {
    showStatus(`Error: ${err.message}`, 'error');
    scanBtn.disabled = false;
    scanBtn.textContent = 'Start Scan';
  }
});

async function loadRecentScans() {
  const result = await chrome.storage.local.get('recentScans');
  const scans = result.recentScans || [];
  if (scans.length === 0) return;

  recentScansEl.innerHTML = `<div class="tab-info-label" style="margin:12px 0 6px">Recent scans</div>`;
  const recent = scans.slice(0, 5);
  for (const s of recent) {
    const el = document.createElement('div');
    el.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:11px;border-bottom:1px solid #1e293b20';
    el.innerHTML = `
      <span style="color:#64748b">${s.target}</span>
      <div>
        <span style="color:#475569;margin-right:8px">${s.time}</span>
        <a href="#" data-scanid="${s.scanId}" data-server="${s.server}" class="resume-link" style="color:#06b6d4;text-decoration:none">Open</a>
      </div>
    `;
    recentScansEl.appendChild(el);
  }

  document.querySelectorAll('.resume-link').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const scanId = el.dataset.scanid;
      const server = el.dataset.server;
      const extUrl = chrome.runtime.getURL(`dashboard.html?scanId=${scanId}&server=${encodeURIComponent(server)}&target=${encodeURIComponent(s.target)}`);
      await chrome.tabs.create({ url: extUrl });
      window.close();
    });
  });
}

getDomainAndCookies();
loadRecentScans();