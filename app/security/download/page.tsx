'use client';
import MatrixRain from '@/app/MatrixRain';
import TermWindow from '@/app/TermWindow';

const EXT_BASE = '/extension';

const steps = [
  {
    title: 'Download the extension',
    color: '#7c3aed',
    lines: [
      'The extension files are hosted right here:',
      '',
      `  <a href="${EXT_BASE}/" target="_blank" style="color:#00ff41">/extension/</a>`,
      '',
      'Download the entire folder or clone the repo.',
    ],
  },
  {
    title: 'Load in Chrome (unpacked)',
    color: '#00aaff',
    lines: [
      '1. Open Chrome and go to chrome://extensions',
      '2. Enable "Developer mode" (toggle top-right)',
      '3. Click "Load unpacked"',
      `4. Select the <span style="color:#00ff41">extension/</span> folder`,
      '5. Pin VulnScan Pro to your toolbar',
    ],
  },
  {
    title: 'Load in Firefox (temporary)',
    color: '#ffb000',
    lines: [
      '1. Open Firefox and go to about:debugging',
      '2. Click "This Firefox"',
      '3. Click "Load Temporary Add-on"',
      `4. Select <span style="color:#00ff41">${EXT_BASE}/manifest.json</span>`,
      '',
      'For permanent install, sign the extension via AMO.',
    ],
  },
  {
    title: 'Run the backend',
    color: '#00ff41',
    lines: [
      'The extension needs the VulnScan Pro API server running on your machine.',
      '',
      '<span style="color:#007a1f"># Backend source — coming soon to GitHub</span>',
      '<span style="color:#004d13">github.com/Nickoding/vulnscan-pro (not yet published)</span>',
      '',
      'The backend is a Python / FastAPI server that orchestrates',
      'nmap, nikto, nuclei, whatweb, and other security tools.',
      '',
      'For now, the extension can connect to any VulnScan Pro',
      'server you set up — default is <span style="color:#00ff41">http://localhost:8000</span>.',
    ],
  },
  {
    title: 'Start scanning',
    color: '#ff3333',
    lines: [
      '1. Navigate to any website',
      '2. Click the VulnScan Pro icon in your toolbar',
      '3. Read and accept the legal consent',
      '4. Verify the server URL (default: http://localhost:8000)',
      '5. Click "Start Scan"',
      '',
      'Results open in the extension dashboard.',
      'Full HTML/PDF reports are generated on completion.',
    ],
  },
];

export default function SecurityDownload() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#004d13' }}>nicholas@sivaji-perez:~$ ./vulnscan --install-guide</div>
        <div style={{ marginBottom: '24px', fontSize: '11px', color: '#004d13' }}># VulnScan Pro — browser extension installation</div>

        <TermWindow title="manifest.json" borderColor="#7c3aed" style={{ marginBottom: '24px' }}>
          <div className="term-body" style={{ fontSize: '12px', lineHeight: '1.8' }}>
            <div style={{ color: '#007a1f', marginBottom: '12px' }}>
              <span style={{ color: '#7c3aed' }}>name:</span> VulnScan Pro<br />
              <span style={{ color: '#7c3aed' }}>version:</span> 1.1.0<br />
              <span style={{ color: '#7c3aed' }}>description:</span> Full vulnerability scanner UI in your browser<br />
              <span style={{ color: '#7c3aed' }}>manifest:</span> V3<br />
              <span style={{ color: '#7c3aed' }}>permissions:</span> cookies, storage, tabs, activeTab
            </div>
            <div style={{ borderTop: '1px solid #1a3a1a', paddingTop: '12px' }}>
              <a href="/extension/manifest.json" target="_blank" style={{ color: '#00ff41', textDecoration: 'underline' }}>
                → View full manifest.json
              </a>
            </div>
          </div>
        </TermWindow>

        {steps.map((step, i) => (
          <TermWindow key={i} title={`${i + 1}. ${step.title}`} borderColor={step.color} style={{ marginBottom: '12px' }}>
            <div className="term-body" style={{ fontSize: '13px', lineHeight: '1.8', color: '#00dd44' }}>
              {step.lines.map((line, j) => (
                <div key={j} style={{ minHeight: '20px' }} dangerouslySetInnerHTML={{ __html: line || '&zwnj;' }} />
              ))}
            </div>
          </TermWindow>
        ))}

        <TermWindow title="— tips" borderColor="#007a1f" style={{ marginTop: '24px' }}>
          <div className="term-body" style={{ fontSize: '12px', lineHeight: '1.8', color: '#00dd44' }}>
            <div>▸ The backend requires <span style={{ color: '#00ff41' }}>nmap</span>, <span style={{ color: '#00ff41' }}>nikto</span>, <span style={{ color: '#00ff41' }}>nuclei</span>, and other tools — Docker handles these automatically.</div>
            <div>▸ Running locally means <span style={{ color: '#00ff41' }}>no third party</span> ever sees your scan data.</div>
            <div>▸ All scan requests are audit-logged with timestamps and IPs.</div>
          </div>
        </TermWindow>
      </div>
    </div>
  );
}
