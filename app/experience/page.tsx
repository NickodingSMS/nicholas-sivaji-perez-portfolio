'use client';
import MatrixRain from '../MatrixRain';
import TermWindow from '../TermWindow';

const jobs = [
  { title: 'VulnScan Pro — Browser Extension Scanner', company: 'Personal Project', dates: '2026 – Present', status: 'PASSION', url: '/security/download', stack: ['Python', 'FastAPI', 'Next.js', 'Docker', 'Nmap', 'Network Security', 'Pen Testing', 'OSINT', 'Linux', 'Bash'], color: '#7c3aed', bullets: [
    'Built VulnScan Pro: browser extension (Chrome/Firefox) that orchestrates 25+ OSS security tools for on-demand website scanning',
    '6-phase scanning engine: CDN bypass / origin-IP discovery, frontend JS secret analysis, OSINT, port + vuln scanning, web fuzzing, report generation',
    'Custom CDN origin-IP discovery via certificate transparency logs (crt.sh), DNS probing, SSL cert SANs, and subdomain enumeration',
    'Automated API key / secret detection in JavaScript bundles (AWS, Google, Firebase, Stripe, GitHub tokens, etc.)',
    'Security scoring engine (0–100) with letter grades and plain-English fix recommendations for each finding',
    'Manifest V3 extension with legal consent flow, audit logging, and dashboard for viewing results',
    'Runs locally — bring your own backend (Python/FastAPI) with Docker Compose or CLI',
    'In the process of publishing to the Chrome Web Store and Firefox Add-ons marketplace'
  ] },
  { title: 'CTO — DineBotics', company: 'DineBotics Inc.', dates: 'Apr 2026 – Present', status: 'ACTIVE', url: 'https://dinebotics.ai', stack: ['React', 'Express.js', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Docker', 'WebSocket', 'RBAC', 'Linux'], color: '#ffb000', bullets: [
    'Full-stack restaurant management platform for multi-location chains: menu, orders, inventory, reservations, staff',
    'Express.js + TypeScript backend with Drizzle ORM on PostgreSQL; React 19 + Vite + Tailwind CSS frontend',
    'Multi-org RBAC system: org-level (chain) and restaurant-level role assignments with UUID-based security',
    'Real-time WebSocket system for order updates, shift swaps, and inventory changes per restaurant room',
    'Deployed with Docker on Linux VPS; built CI/CD pipeline, automated backups, and monitoring',
    'Comprehensive security: helmet, rate limiting, CORS, Semgrep SAST scanning, session-based auth via Passport.js',
    'Built staff management with auto-email generation, shift swap requests, and org-level restaurant switching'
  ] },
  { title: 'Front End Contractor', company: 'NC State University', dates: 'Nov 2025 – May 2026', status: 'COMPLETED', stack: ['Mendix', 'CSS3', 'JavaScript', 'pgAdmin', 'SQL'], color: '#00ff41', bullets: ['Eliminated dual mobile/desktop page architecture across a 14-year production platform','Rebuilt every view as a single responsive layout using CSS + viewport-based JS math','DOM surgery on Mendix\'s 50-layer SCSS output to restore layout integrity','Built SQL test environments; migrated production domain model data via microflows','Delivered reusable CSS component library to standardize the entire platform'] },
  { title: 'Front End / Mendix Developer', company: 'Megavue Marketing LLC', dates: 'Feb 2025 – Jun 2025', status: 'COMPLETED', stack: ['Mendix', 'CSS3', 'JavaScript', 'UI/UX'], color: '#00aaff', bullets: ['Full creative control — shipped a fantasy-game-themed UI for a nonprofit app','Replaced flat non-responsive layout with rich immersive cross-device experience','Converted legacy Atlas overrides to modular component-level CSS','Worked directly with CTO on product direction and delivery'] },
  { title: 'Mendix CTF Security Engineer', company: 'Paradigm Solutions', dates: 'Jan 2025 – Apr 2025', status: 'COMPLETED', stack: ['Express.js', 'SQLite', 'Cypress', 'Mendix', 'Security'], color: '#ff3333', bullets: ['Co-built the official Mendix CTF competition platform for a major industry event','Automated penetration testing engine that graded candidate apps for vulns in real time','Flag-based scoring API: Express.js + SQLite + Cypress automated execution','Collaborated with Rene von Hofwegen, Scott Perkins, Jon Higginbottom'] },
  { title: 'Solutions Engineer / Architect', company: 'Solutions Made Simple', dates: 'Feb 2023 – Dec 2024', status: 'COMPLETED', stack: ['React', 'Mendix', 'DocuSign', 'QuickBooks', 'Calendly', 'CSS3'], color: '#ffb000', bullets: ['Architected full-stack tax automation platform from scratch replacing outsourced vendor system','React Kanban board as core UI; DocuSign + QuickBooks + Calendly integrations','Led production data migration from legacy vendor with zero data loss','Built reusable React widget library adopted across multiple projects','Mentored junior devs; reported directly to CEO on architecture decisions'] },
  { title: 'Mendix Low-Code Developer', company: 'S4-Digital (Mendix Partner)', dates: 'Jul 2021 – Jan 2023', status: 'COMPLETED', stack: ['Mendix', 'REST APIs', 'Prisma', 'OQL', 'CI/CD', 'Siemens', 'Salesforce'], color: '#007a1f', bullets: ['Built Mendix apps for industrial clients; integrated Siemens + Salesforce connectors','Implemented CI/CD pipelines; managed relational DBs with Prisma and OQL','Refactored legacy codebases to reduce technical debt across client projects','Earned all 3 Mendix certifications during this tenure'] },
];

export default function Experience() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '20px', fontSize: '11px', color: '#00cc33' }}>nicholas@sivaji-perez:~$ ls -la experience/</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a', marginBottom: '20px' }}>
          {[['YEARS EXP','5+'],['COMPANIES','5'],['CONTRACTS','4'],['CERTS','4'],['DEGREE','N/A'],['REMOTE','100%']].map(([label, value]) => (
            <div key={label} style={{ background: '#0d0d0d', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', color: '#00ff41', fontWeight: 700 }}>{value}</div>
              <div style={{ fontSize: '10px', color: '#00aa33', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {jobs.map((job, i) => (
          <TermWindow key={i} title={`${job.title} @ ${job.company}`} borderColor={job.color} style={{ marginBottom: '12px' }}>
            <div className="term-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ color: job.color, fontWeight: 700, fontSize: '15px' }}>{job.title}</span>
                  <span style={{ color: '#00aa33', fontSize: '13px' }}>@</span>
                  <span style={{ color: '#00dd44', fontSize: '13px' }}>{job.company}</span>
                  {job.url && (
                    <a href={job.url} target={job.url.startsWith('http') ? '_blank' : undefined} rel={job.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: '10px', padding: '2px 10px', background: job.color, color: '#0a0a0a', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>
                      {job.url.startsWith('http') ? '↗ ' : '⬇ '}OPEN
                    </a>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#007a1f', fontSize: '11px', fontStyle: 'italic' }}>{job.dates}</span>
                  <span style={{ fontSize: '10px', padding: '1px 8px', background: job.status === 'ACTIVE' ? '#00ff41' : '#1a3a1a', color: job.status === 'ACTIVE' ? '#0a0a0a' : '#00aa33', fontWeight: 700 }}>{job.status}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {job.stack.map(s => (
                  <span key={s} style={{ fontSize: '10px', padding: '2px 8px', border: `1px solid ${job.color}33`, color: job.color, letterSpacing: '0.05em' }}>{s}</span>
                ))}
              </div>
              {job.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '6px', fontSize: '12px', lineHeight: 1.6 }}>
                  <span style={{ color: job.color, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#00dd44' }}>{b}</span>
                </div>
              ))}
            </div>
          </TermWindow>
        ))}
      </div>
    </div>
  );
}
