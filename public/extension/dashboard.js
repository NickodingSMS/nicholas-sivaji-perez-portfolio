function xhrGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)); }
        catch (e) { resolve(xhr.responseText); }
      } else {
        resolve(null);
      }
    };
    xhr.onerror = () => resolve(null);
    xhr.send();
  });
}

function xhrPost(url, data) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
    xhr.onerror = () => resolve(false);
    xhr.send(JSON.stringify(data));
  });
}

// ===== Params =====
const params = new URLSearchParams(location.search);
const SCAN_ID = params.get('scanId');
let SERVER_URL = params.get('server') || 'http://localhost:8000';
if (!SERVER_URL.startsWith('http')) SERVER_URL = 'http://' + SERVER_URL;
const TARGET = params.get('target') || '';

// ===== State =====
let pollTimer = null;
let shownLogCount = 0;
let state = {
  status: 'loading',
  phases: [],
  logs: [],
  findings: [],
  summary: {},
  recon: null,
  grade: '?',
  scanId: SCAN_ID,
  topIssues: [],
  consultingCta: '',
  consultingContact: '',
  consultingUrl: '',
  reportAvailable: false,
};

// ===== DOM =====
const $ = id => document.getElementById(id);
const targetEl = $('scanTarget');
const targetUrlEl = $('scanTargetUrl');
const statusBadge = $('statusBadge');
const cancelBtn = $('cancelBtn');
const timelinePhases = $('timelinePhases');
const consoleLogs = $('consoleLogs');
const timelineSection = $('timelineSection');
const scanConsole = $('scanConsole');
const gradeHero = $('gradeHero');
const gradeLetter = $('gradeLetter');
const gradeScore = $('gradeScore');
const gradeLabel = $('gradeLabel');
const gradeSub = $('gradeSub');
const topIssuesSection = $('topIssuesSection');
const topIssuesList = $('topIssuesList');
const consultingCta = $('consultingCta');
const ctaText = $('ctaText');
const ctaContact = $('ctaContact');
const downloadSection = $('downloadSection');
const downloadPdfBtn = $('downloadPdfBtn');
const reportLink = $('reportLink');
const techDetails = $('techDetails');
const techCount = $('techCount');
const findingsCount = $('findingsCount');
const portsCount = $('portsCount');
const toolsCount = $('toolsCount');
const subdomainsCount = $('subdomainsCount');
const chartContainer = $('chartContainer');
const reconSection = $('reconSection');
const reconGrid = $('reconGrid');
const findingsBody = $('findingsBody');
const noFindings = $('noFindings');
const findingsSection = $('findingsSection');

const GRADE_COLORS = { A: '#34d399', B: '#22d3ee', C: '#fbbf24', D: '#f59e0b', F: '#ef4444' };
const GRADE_LABELS = {
  A: 'Your app looks solid. Minor improvements recommended.',
  B: 'Pretty good — but there are issues worth fixing.',
  C: 'Your app has meaningful security gaps. Should address soon.',
  D: 'Several security issues found. Your app is at risk.',
  F: 'Critical issues detected. Your app is vulnerable.',
};

// ===== Init =====
async function init() {
  targetEl.textContent = TARGET || 'VulnScan Pro';
  targetUrlEl.textContent = `Target: ${TARGET || 'N/A'} | Server: ${SERVER_URL}`;

  if (!SCAN_ID) {
    statusBadge.innerHTML = 'No active scan';
    addLog('error', 'No scan ID provided');
    return;
  }

  addLog('info', `Scan ID: ${SCAN_ID}`);
  addLog('info', `Target: ${TARGET || 'N/A'}`);

  cancelBtn.style.display = 'inline-flex';
  cancelBtn.addEventListener('click', cancelScan);

  downloadPdfBtn.addEventListener('click', downloadPdf);

  const existing = await fetchExistingScan();
  if (existing && (existing.status === 'completed' || existing.status === 'unknown')) {
    applyScanData(existing);
    return;
  }

  if (existing && existing.status === 'running') {
    addLog('info', 'Reconnecting to running scan...');
    startPolling();
    return;
  }

  addLog('info', 'Waiting for scan engine...');
  startPolling();
}

function startPolling() {
  state.status = 'connecting';
  renderStatus();
  pollTimer = setInterval(pollScan, 2000);
  pollScan();
}

async function pollScan() {
  const base = SERVER_URL.replace(/\/+$/, '');
  const data = await xhrGet(`${base}/api/scan/${SCAN_ID}/live`);
  if (!data) {
    addLog('warning', 'Server unreachable, retrying...');
    return;
  }

  if (data.status === 'completed' || data.status === 'unknown') {
    stopPolling();
    addLog('success', 'Scan completed!');
    applyScanData(data);
    return;
  }

  if (data.status === 'cancelled' || data.status === 'error') {
    stopPolling();
    addLog('warning', `Scan ${data.status}`);
    applyScanData(data);
    return;
  }

  if (data.status === 'running' || data.status === 'not_found') {
    if (state.status === 'connecting' || state.status === 'not_found') {
      if (data.status === 'running') {
        addLog('info', '--- Scan engine connected ---');
      } else {
        state.status = 'not_found';
        renderStatus();
      }
    }

    if (data.logs) {
      if (shownLogCount > data.logs.length) {
        shownLogCount = 0;
        addLog('info', '--- log overflow ---');
      }
      for (let i = shownLogCount; i < data.logs.length; i++) {
        const entry = data.logs[i];
        if (!entry || !entry.message) continue;
        const isPhase = /Phase\s+\d+/i.test(entry.message);
        const level = entry.level === 'error' ? 'error'
                    : entry.level === 'warning' ? 'warning'
                    : isPhase ? 'highlight' : 'info';
        addLog(level, entry.message);
      }
      shownLogCount = data.logs.length;
    }

    if (data.phases && data.phases.length > 0) {
      const existingNames = new Set(state.phases.map(p => p.name));
      for (const p of data.phases) {
        const stepMatch = (p.name || '').match(/Phase\s+(\d+)/i);
        if (stepMatch && !existingNames.has(p.name)) {
          const step = parseInt(stepMatch[1]);
          state.phases.push({ step, name: p.name, status: 'active' });
          addLog('highlight', `→ ${p.name}`);
        }
      }
      renderTimeline();
    }

    if (data.status === 'running') state.status = 'running';
    renderStatus();
    cancelBtn.style.display = 'inline-flex';
  }
}

function stopPolling() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
}

async function fetchExistingScan() {
  const base = SERVER_URL.replace(/\/+$/, '');
  return await xhrGet(`${base}/api/scan/${SCAN_ID}`);
}

function applyScanData(data) {
  state.status = data.status === 'unknown' ? 'completed' : data.status;
  state.findings = data.findings || [];
  state.summary = data.summary || {};
  state.recon = data.recon || null;
  state.grade = data.grade || data.summary?.grade || '?';
  state.topIssues = data.summary?.top_issues || [];
  state.consultingCta = data.summary?.consulting_cta || '';
  state.consultingContact = data.summary?.consulting_contact || '';
  state.consultingUrl = data.summary?.consulting_url || '';
  state.reportAvailable = data.report_available || false;

  // Play back logs
  if (data.logs && data.logs.length > shownLogCount) {
    for (let i = shownLogCount; i < data.logs.length; i++) {
      const entry = data.logs[i];
      if (!entry || !entry.message) continue;
      addLog(entry.level === 'error' ? 'error' : 'info', entry.message);
    }
    shownLogCount = data.logs.length;
  }

  if (state.status === 'completed') {
    const severity_counts = data.summary?.severity_counts || {};
    addLog('info', `Summary: ${state.findings.length} findings (${severity_counts.critical || 0}C / ${severity_counts.high || 0}H / ${severity_counts.medium || 0}M / ${severity_counts.low || 0}L / ${severity_counts.info || 0}I)`);
  }

  renderAll();
}

// ===== Cancel =====
async function cancelScan() {
  const base = SERVER_URL.replace(/\/+$/, '');
  await xhrPost(`${base}/api/scan/${SCAN_ID}/cancel`, {});
  state.status = 'cancelled';
  stopPolling();
  addLog('warning', 'Scan cancelled');
  renderAll();
}

// ===== PDF Download =====
function downloadPdf() {
  const base = SERVER_URL.replace(/\/+$/, '');
  if (!SCAN_ID) return;
  // Use the PDF endpoint
  window.open(`${base}/api/report/${SCAN_ID}/pdf`, '_blank');
}

// ===== Render =====
function addLog(level, message) {
  if (!message) return;
  const line = document.createElement('div');
  line.className = `console-line ${level}`;
  line.textContent = message;
  consoleLogs.appendChild(line);
  consoleLogs.parentElement.scrollTop = consoleLogs.parentElement.scrollHeight;
}

function renderAll() {
  renderStatus();
  if (state.status === 'completed') {
    // Hide scan UI, show results
    timelineSection.style.display = 'none';
    scanConsole.style.display = 'none';
    renderGradeHero();
    renderTopIssues();
    renderConsultingCta();
    renderDownloadButtons();
    renderTechDetails();
  }
}

function renderStatus() {
  if (state.status === 'running' || state.status === 'connecting' || state.status === 'not_found') {
    statusBadge.className = 'badge running';
    statusBadge.innerHTML = '<span class="badge-dot running"></span> Running';
    cancelBtn.style.display = 'inline-flex';
  } else if (state.status === 'completed') {
    statusBadge.className = 'badge completed';
    statusBadge.innerHTML = '<span class="badge-dot completed"></span> Completed';
    cancelBtn.style.display = 'none';
  } else if (state.status === 'cancelled') {
    statusBadge.className = 'badge cancelled';
    statusBadge.innerHTML = 'Cancelled';
    cancelBtn.style.display = 'none';
  } else {
    statusBadge.className = 'badge error';
    statusBadge.innerHTML = state.status || 'Error';
    cancelBtn.style.display = 'none';
  }
}

function renderGradeHero() {
  gradeHero.style.display = 'flex';
  const grade = state.grade || '?';
  const score = state.summary.security_score || 0;
  const color = GRADE_COLORS[grade] || '#64748b';
  const label = GRADE_LABELS[grade] || '';
  const total = state.findings.length || state.summary.total_findings || 0;
  const sev = state.summary.severity_counts || {};
  const parts = [];
  if (sev.critical) parts.push(`${sev.critical} critical`);
  if (sev.high) parts.push(`${sev.high} high`);
  if (sev.medium) parts.push(`${sev.medium} medium`);
  if (sev.low) parts.push(`${sev.low} low`);
  const sub = parts.length ? `${total} findings (${parts.join(', ')})` : `${total} findings`;

  gradeLetter.textContent = grade;
  gradeLetter.style.color = color;
  gradeScore.textContent = `${score} / 100`;
  gradeLabel.textContent = label;
  gradeSub.textContent = sub;
}

function renderTopIssues() {
  if (!state.topIssues || state.topIssues.length === 0) {
    topIssuesSection.style.display = 'none';
    return;
  }
  topIssuesSection.style.display = 'block';
  let html = '';
  for (const ti of state.topIssues) {
    const severityColors = { critical: '#ef4444', high: '#f59e0b', medium: '#eab308', low: '#22d3ee', info: '#64748b' };
    const sevColor = severityColors[ti.severity] || '#64748b';
    html += `<div class="issue-card">
      <div class="issue-header">
        <span class="issue-severity" style="background:${sevColor}15;color:${sevColor};border-color:${sevColor}30">${ti.severity}</span>
        <span class="issue-title">${escHtml(ti.issue)}</span>
      </div>
      <div class="issue-explanation">${escHtml(ti.explanation)}</div>
      <div class="issue-fix"><strong>Fix:</strong> ${escHtml(ti.fix)}</div>
    </div>`;
  }
  topIssuesList.innerHTML = html;
}

function renderConsultingCta() {
  if (!state.consultingCta) {
    consultingCta.style.display = 'none';
    return;
  }
  consultingCta.style.display = 'block';
  ctaText.textContent = state.consultingCta;
  ctaContact.href = state.consultingUrl || '#';
  ctaContact.textContent = state.consultingContact;
}

function renderDownloadButtons() {
  if (state.reportAvailable && SCAN_ID) {
    downloadSection.style.display = 'block';
    const base = SERVER_URL.replace(/\/+$/, '');
    reportLink.href = `${base}/api/report/${SCAN_ID}`;
  } else {
    downloadSection.style.display = 'none';
  }
}

function renderTechDetails() {
  techDetails.style.display = 'block';
  const findings = state.findings || [];
  techCount.textContent = `(${findings.length} findings)`;

  // Counters
  const summary = state.summary || {};
  const sev = summary.severity_counts || {};
  findingsCount.textContent = findings.length || summary.total_findings || 0;
  portsCount.textContent = summary.ports_open || 0;
  toolsCount.textContent = summary.tools_executed || 0;
  const subCt = (state.recon?.subdomains?.length) || summary.subdomains_found || 0;
  subdomainsCount.textContent = subCt;

  // Chart
  renderChart();
  // Recon
  renderRecon();
  // Findings
  renderFindingsTable();
}

function renderChart() {
  const sev = (state.summary?.severity_counts) || {};
  const items = [
    { label: 'Critical', count: sev.critical || 0, color: '#ef4444' },
    { label: 'High', count: sev.high || 0, color: '#f59e0b' },
    { label: 'Medium', count: sev.medium || 0, color: '#eab308' },
    { label: 'Low', count: sev.low || 0, color: '#22d3ee' },
    { label: 'Info', count: sev.info || 0, color: '#64748b' },
  ];
  const total = items.reduce((s, i) => s + i.count, 0);
  if (total === 0) {
    chartContainer.innerHTML = '<div style="text-align:center;padding:20px;color:#475569">No findings to chart</div>';
    return;
  }
  let html = '';
  for (const item of items) {
    const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
    html += `<div class="chart-row">
      <span class="chart-label">${item.label}</span>
      <div class="chart-bar-bg">
        <div class="chart-bar-fill" style="width:${pct}%;background:${item.color}"></div>
      </div>
      <span class="chart-pct">${pct}%</span>
      <span class="chart-count">${item.count}</span>
    </div>`;
  }
  chartContainer.innerHTML = html;
}

function renderRecon() {
  if (!state.recon) return;
  reconSection.style.display = 'block';
  const r = state.recon;
  let html = '';
  if (r.behind_cdn !== undefined) {
    html += reconCard('Behind CDN', r.behind_cdn ? 'Yes' : 'No');
  }
  if (r.candidate_origins?.length) {
    html += reconCard('Origin IPs', r.candidate_origins.map(o => o.ip).join(', '));
  }
  if (r.dns_a?.length) {
    html += reconCard('DNS A Records', r.dns_a.join(', '));
  }
  if (r.cname) {
    html += reconCard('CNAME', r.cname);
  }
  if (r.subdomains?.length) {
    html += reconCard('Subdomains', r.subdomains.length + ' found');
  }
  reconGrid.innerHTML = html;
}

function reconCard(label, value) {
  return `<div class="recon-card">
    <div class="recon-card-label">${label}</div>
    <div class="recon-card-value">${value}</div>
  </div>`;
}

function renderFindingsTable() {
  const findings = state.findings || [];
  if (findings.length === 0) {
    noFindings.style.display = 'block';
    findingsBody.innerHTML = '';
    return;
  }
  noFindings.style.display = 'none';

  const sorted = [...findings].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
    return (order[a.severity?.toLowerCase()] ?? 5) - (order[b.severity?.toLowerCase()] ?? 5);
  });

  let html = '';
  for (const f of sorted) {
    const sevClass = (f.severity || 'info').toLowerCase();
    const title = f.title || f.name || f.finding || f.message || 'Unknown';
    const detail = f.detail || f.description || f.remediation || f.recommendation || '';
    const id = f.id || Math.random().toString(36).slice(2, 8);
    html += `<tr>
      <td><span class="finding-severity ${sevClass}">${sevClass}</span></td>
      <td>
        <div class="finding-title" onclick="toggleFinding('${id}')">${escHtml(title)}</div>
        <div class="finding-detail" id="detail-${id}">${escHtml(detail)}</div>
      </td>
    </tr>`;
  }
  findingsBody.innerHTML = html;
}

function toggleFinding(id) {
  const el = document.getElementById(`detail-${id}`);
  if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function renderTimeline() {
  const activeStep = state.phases.length > 0 ? state.phases[state.phases.length - 1].step : 0;
  const dots = timelinePhases.querySelectorAll('.phase-dot');
  const labels = timelinePhases.querySelectorAll('.phase-label');

  dots.forEach((dot, i) => {
    const step = i + 1;
    dot.className = 'phase-dot';
    labels[i].className = 'phase-label';
    if (state.status === 'cancelled') {
      if (step === activeStep) dot.classList.add('cancelled');
      else if (step < activeStep) { dot.classList.add('completed'); labels[i].classList.add('completed'); }
    } else if (step < activeStep || (step === activeStep && state.status === 'completed')) {
      dot.classList.add('completed');
      labels[i].classList.add('completed');
    } else if (step === activeStep) {
      dot.classList.add('active');
      labels[i].classList.add('active');
    }
  });
}

function escHtml(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

init();
