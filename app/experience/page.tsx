'use client';
import MatrixRain from '../MatrixRain';

const jobs = [
  {
    title: 'Front End Contractor',
    company: 'NC State University',
    dates: 'Nov 2025 – Present',
    status: 'ACTIVE',
    stack: ['Mendix', 'CSS3', 'JavaScript', 'pgAdmin', 'SQL'],
    color: '#00ff41',
    bullets: [
      'Eliminated dual mobile/desktop page architecture across a 14-year production platform',
      'Rebuilt every view as a single responsive layout using CSS + viewport-based JS math',
      'DOM surgery on Mendix\'s 50-layer SCSS output to restore layout integrity',
      'Built SQL test environments; migrated production domain model data via microflows',
      'Delivered reusable CSS component library to standardize the entire platform',
    ],
  },
  {
    title: 'Front End / Mendix Developer',
    company: 'Megavue Marketing LLC',
    dates: 'Feb 2025 – Jun 2025',
    status: 'COMPLETED',
    stack: ['Mendix', 'CSS3', 'JavaScript', 'UI/UX'],
    color: '#00aaff',
    bullets: [
      'Full creative control — shipped a fantasy-game-themed UI for a nonprofit app',
      'Replaced flat non-responsive layout with rich, immersive cross-device experience',
      'Converted legacy Atlas overrides to modular component-level CSS',
      'Worked directly with CTO on product direction and delivery',
    ],
  },
  {
    title: 'Mendix CTF Security Engineer',
    company: 'Paradigm Solutions',
    dates: 'Jan 2025 – Apr 2025',
    status: 'COMPLETED',
    stack: ['Express.js', 'SQLite', 'Cypress', 'Mendix', 'Security'],
    color: '#ff3333',
    bullets: [
      'Co-built the official Mendix CTF competition platform for a major industry event',
      'Automated penetration testing engine that graded candidate apps for vulns in real time',
      'Flag-based scoring API: Express.js + SQLite + Cypress automated execution',
      'Collaborated with René von Hofwegen, Scott Perkins, Jon Higginbottom',
    ],
  },
  {
    title: 'Solutions Engineer / Architect',
    company: 'Solutions Made Simple',
    dates: 'Feb 2023 – Dec 2024',
    status: 'COMPLETED',
    stack: ['React', 'Mendix', 'DocuSign', 'QuickBooks', 'Calendly', 'CSS3'],
    color: '#ffb000',
    bullets: [
      'Architected full-stack tax automation platform from scratch — replaced outsourced vendor system',
      'React Kanban board as core UI; DocuSign + QuickBooks + Calendly integrations',
      'Led production data migration from legacy vendor with zero data loss',
      'Built reusable React widget library adopted across multiple projects',
      'Mentored junior devs; reported directly to CEO on architecture decisions',
    ],
  },
  {
    title: 'Mendix Low-Code Developer',
    company: 'S4-Digital (Mendix Partner)',
    dates: 'Jul 2021 – Jan 2023',
    status: 'COMPLETED',
    stack: ['Mendix', 'REST APIs', 'Prisma', 'OQL', 'CI/CD', 'Siemens', 'Salesforce'],
    color: '#007a1f',
    bullets: [
      'Built Mendix apps for industrial clients; integrated Siemens + Salesforce connectors',
      'Implemented CI/CD pipelines; managed relational DBs with Prisma and OQL',
      'Refactored legacy codebases to reduce technical debt across client projects',
      'Earned all 3 Mendix certifications during this tenure',
      'Agile sprints with QA, product managers, and security analysts',
    ],
  },
];

export default function Experience() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>

        <div style={{ marginBottom: '20px', fontSize: '11px', color: '#004d13', letterSpacing: '0.1em' }}>
          nicholas@sivaji-perez:~$ ls -la experience/
        </div>

        {/* Summary stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a', marginBottom: '20px',
        }}>
          {[
            { label: 'YEARS EXP', value: '5+' },
            { label: 'COMPANIES', value: '5' },
            { label: 'CONTRACTS', value: '4' },
            { label: 'CERTS', value: '4' },
            { label: 'DEGREE', value: 'N/A' },
            { label: 'REMOTE', value: '100%' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#0d0d0d', padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '22px', color: '#00ff41', fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: '10px', color: '#004d13', letterSpacing: '0.1em', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        {jobs.map((job, i) => (
          <div key={i} className="term-window" style={{ marginBottom: '12px' }}>
            <div className="term-titlebar" style={{ borderLeft: `3px solid ${job.color}` }}>
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8, flex: 1 }}>
                {job.title} @ {job.company}
              </span>
              <span style={{
                fontSize: '10px', padding: '1px 8px',
                background: job.status === 'ACTIVE' ? '#00ff41' : '#1a3a1a',
                color: job.status === 'ACTIVE' ? '#0a0a0a' : '#007a1f',
                fontWeight: 700, marginLeft: 'auto',
              }}>
                {job.status}
              </span>
            </div>
            <div className="term-body">
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ color: job.color, fontWeight: 700, fontSize: '15px' }}>{job.title}</span>
                  <span style={{ color: '#004d13', fontSize: '13px' }}> @ </span>
                  <span style={{ color: '#00cc33', fontSize: '13px' }}>{job.company}</span>
                </div>
                <span style={{ color: '#007a1f', fontSize: '11px', fontStyle: 'italic' }}>{job.dates}</span>
              </div>

              {/* Stack tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {job.stack.map(s => (
                  <span key={s} style={{
                    fontSize: '10px', padding: '2px 8px',
                    border: `1px solid ${job.color}33`,
                    color: job.color, letterSpacing: '0.05em',
                  }}>{s}</span>
                ))}
              </div>

              {/* Bullets */}
              {job.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '6px', fontSize: '12px', lineHeight: 1.6 }}>
                  <span style={{ color: job.color, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#007a1f' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
