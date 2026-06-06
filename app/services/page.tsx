'use client';
import Link from 'next/link';
import MatrixRain from '../MatrixRain';

const services = [
  { id: 'mendix', cmd: './mendix-rescue --emergency', label: 'Mendix Dev / Rescue', color: '#ffb000', tag: 'SPECIALTY', desc: "Advanced certified. I fix the apps other devs gave up on. Microflows, nanoflows, domain modeling, CSS overrides, DOM surgery, responsive rebuilds, data migrations.", bullets: ['Full UI/UX redesigns on existing Mendix apps','Mobile responsiveness — eliminate dual-page hacks','Microflow / nanoflow optimization and refactoring','Domain model restructuring + production data migration','CSS/JS overrides on Atlas styling (the deep stuff)','API integrations (REST, OData, custom connectors)'] },
  { id: 'frontend', cmd: './frontend --css-wizard', label: 'Front End / CSS / Responsive', color: '#00aaff', tag: 'CORE SKILL', desc: "I live in the browser devtools. If your site looks broken on mobile, loads slow, has layout bugs, or just looks terrible — I fix it fast. React, Next.js, vanilla HTML/CSS/JS, TypeScript.", bullets: ['Responsive layout rebuilds (mobile-first)','CSS architecture and design system setup','React / Next.js component builds','Cross-browser bug fixes','Performance optimization (Core Web Vitals)','UI redesigns with full creative direction'] },
  { id: 'fullapp', cmd: './build --from-scratch', label: 'Full App Builds', color: '#00ff41', tag: 'END-TO-END', desc: "Architecture to deployment. I've built tax automation platforms, CTF security systems, and Kanban workflow tools from scratch. Bring me your idea and a budget.", bullets: ['Full-stack web apps (React + Node/Express + DB)','API design and third-party integrations','DocuSign, QuickBooks, Calendly, Stripe, and more','Database schema design (PostgreSQL, SQLite, Prisma)','CI/CD pipeline setup and deployment','Documentation and handoff'] },
  { id: 'python', cmd: './python --automate-everything', label: 'Python Automation & Scripts', color: '#ff3333', tag: 'EFFICIENCY', desc: "I use Python daily to make myself work faster. I can do the same for your business. Data pipelines, scraping, file processing, scheduled tasks, LLM integrations.", bullets: ['Workflow automation scripts','Web scraping and data extraction','File processing and batch operations','LLM/AI tool integrations (OpenAI, HuggingFace)','Scheduled task runners and cron jobs','CSV / JSON / API data pipelines'] },
  { id: 'devops', cmd: './devops --ship-it', label: 'DevOps & Deployment', color: '#7c3aed', tag: 'INFRA', desc: "Linux daily driver. Docker, CI/CD, server setup, proxies, SSL, environment config. I can take your app from 'it works on my machine' to live in production.", bullets: ['Docker containerization and compose setup','CI/CD pipeline configuration (GitHub Actions)','Linux server setup and hardening','Nginx / reverse proxy configuration','SSL, DNS, and domain setup','Environment management and secrets handling'] },
  { id: 'iot', cmd: './iot --raspberry-pi', label: 'IoT & Hardware Scripts', color: '#28c840', tag: 'HARDWARE', desc: "Raspberry Pi, Proxmox, hardware tinkering. I run home infrastructure on Linux and have built tunneled services, local AI runners, and automation scripts on low-power hardware.", bullets: ['Raspberry Pi project setup and scripting','Sensor data collection and logging','Local network services and tunneling','Proxmox / VM setup and management','Hardware + software integration scripts','Low-power / always-on automation systems'] },
];

const tiers = [
  { label: 'Quick Fix', price: '< $500', timeline: '1–3 days', color: '#007a1f', desc: 'Bug fixes, small scripts, CSS tweaks, quick automations.', examples: ['Fix broken mobile layout','Python automation script','CSS bug on existing site','Small Mendix microflow fix'] },
  { label: 'Small Project', price: '$500 – $2k', timeline: '1–2 weeks', color: '#00aaff', desc: 'A focused feature, tool, or redesign. Clear scope, fast delivery.', examples: ['Responsive redesign of existing app','Dev tool or utility build','API integration','Mendix page overhaul'] },
  { label: 'Medium Build', price: '$2k – $5k', timeline: '2–4 weeks', color: '#ffb000', desc: 'Multi-feature apps, full redesigns, or complex integrations.', examples: ['Full Mendix app rebuild','React app with backend','Multi-integration workflow','Full automation system'] },
  { label: 'Enterprise', price: '$5k+', timeline: 'Scoped per project', color: '#00ff41', desc: "Full application builds, long-term contracts, or ongoing retainer work. Let's talk.", examples: ['Full-stack app from scratch','Ongoing Mendix dev contract','DevOps + app build combo','Team augmentation'] },
];

export default function Services() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px', margin: '0 auto', padding: '20px 20px 80px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#004d13' }}>nicholas@sivaji-perez:~$ ./services --list-all</div>
        <div style={{ marginBottom: '32px', fontSize: '11px', color: '#004d13' }}># 5+ years · remote · fast turnaround · actually available right now</div>

        <div style={{ border: '1px solid #00ff41', background: '#001a00', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff41', display: 'inline-block', boxShadow: '0 0 8px #00ff41' }} />
            <span style={{ color: '#00ff41', fontWeight: 700, fontSize: '14px' }}>AVAILABLE FOR NEW PROJECTS</span>
          </div>
          <div style={{ fontSize: '12px', color: '#007a1f' }}>Gainesville, FL · Remote · Quick start</div>
          <Link href="/hire" style={{ background: '#00ff41', color: '#0a0a0a', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700, padding: '8px 20px', textDecoration: 'none', letterSpacing: '0.05em' }}>→ BOOK A CALL</Link>
        </div>

        <div style={{ marginBottom: '12px', fontSize: '11px', color: '#004d13', letterSpacing: '0.1em' }}># what i do</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a', marginBottom: '40px' }}>
          {services.map(svc => (
            <div key={svc.id} style={{ background: '#0d0d0d', padding: '24px', borderLeft: `2px solid ${svc.color}` }}>
              <div style={{ fontSize: '10px', color: svc.color, letterSpacing: '0.1em', marginBottom: '8px' }}>[{svc.tag}]</div>
              <div style={{ fontSize: '10px', color: '#004d13', marginBottom: '6px' }}>$ {svc.cmd}</div>
              <div style={{ fontSize: '15px', color: '#00ff41', fontWeight: 700, marginBottom: '10px' }}>{svc.label}</div>
              <div style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.7, marginBottom: '14px' }}>{svc.desc}</div>
              <div style={{ borderTop: '1px solid #0a2a0a', paddingTop: '12px' }}>
                {svc.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '5px', fontSize: '11px' }}>
                    <span style={{ color: svc.color, flexShrink: 0 }}>▸</span>
                    <span style={{ color: '#007a1f' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '12px', fontSize: '11px', color: '#004d13', letterSpacing: '0.1em' }}># pricing — rough ranges, exact quotes after scoping call</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a', marginBottom: '40px' }}>
          {tiers.map(tier => (
            <div key={tier.label} style={{ background: '#0d0d0d', padding: '20px', borderTop: `2px solid ${tier.color}` }}>
              <div style={{ fontSize: '18px', color: tier.color, fontWeight: 700, marginBottom: '4px' }}>{tier.price}</div>
              <div style={{ fontSize: '13px', color: '#00cc33', fontWeight: 700, marginBottom: '4px' }}>{tier.label}</div>
              <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '12px', fontStyle: 'italic' }}>⏱ {tier.timeline}</div>
              <div style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.6, marginBottom: '12px' }}>{tier.desc}</div>
              <div style={{ borderTop: '1px solid #0a2a0a', paddingTop: '10px' }}>
                {tier.examples.map((ex, i) => <div key={i} style={{ fontSize: '11px', color: '#004d13', marginBottom: '4px' }}>— {ex}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>ready to start?</span>
          </div>
          <div className="term-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#00ff41', fontWeight: 700, marginBottom: '6px' }}>Let&apos;s scope your project.</div>
              <div style={{ fontSize: '12px', color: '#007a1f' }}>Book a free 30-minute call. No commitment. I&apos;ll tell you exactly what I can do and what it&apos;ll cost.</div>
            </div>
            <Link href="/hire" style={{ background: '#00ff41', color: '#0a0a0a', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 700, padding: '12px 28px', textDecoration: 'none', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>→ BOOK A CALL</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
