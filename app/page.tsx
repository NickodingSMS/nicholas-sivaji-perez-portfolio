'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MatrixRain from './MatrixRain';
import TermWindow from './TermWindow';

const BOOT_LINES = [
  { text: 'NSP-OS v2.0.1 (Gainesville, FL)', delay: 0, color: '#00ff41', bold: true },
  { text: 'Copyright (C) Nicholas Sivaji Perez. All rights reserved.', delay: 120, color: '#007a1f' },
  { text: '', delay: 200 },
  { text: 'Checking system integrity...', delay: 350, color: '#007a1f' },
  { text: '[OK] 5+ years experience loaded', delay: 600, color: '#00ff41' },
  { text: '[OK] React / Next.js / TypeScript initialized', delay: 750, color: '#00ff41' },
  { text: '[OK] Mendix Advanced Certification verified', delay: 900, color: '#00ff41' },
  { text: '[OK] CSS architecture module ready', delay: 1050, color: '#00ff41' },
  { text: '[OK] Python automation + IoT scripts available', delay: 1200, color: '#00ff41' },
  { text: '[OK] DevOps / Linux environment detected', delay: 1350, color: '#00ff41' },
  { text: '[!!] No degree found — compensating with results', delay: 1500, color: '#ffb000' },
  { text: '', delay: 1700 },
  { text: 'Checking availability...', delay: 1900, color: '#007a1f' },
  { text: '[██] STATUS: AVAILABLE FOR HIRE — remote · immediate start', delay: 2100, color: '#00ff41', bold: true },
  { text: '', delay: 2400 },
  { text: 'Welcome. Select a module below or book a call.', delay: 2600, color: '#00ff41', bold: true },
];

const MODULES = [
  { cmd: './services --list', href: '/services', label: 'services/', desc: 'Mendix, front end, full builds, Python automation, DevOps, IoT.', tag: 'HIRE ME', color: '#00ff41' },
  { cmd: './hire-me --schedule', href: '/hire', label: 'hire/', desc: 'Book a free 30-min scoping call. No commitment.', tag: 'BOOK A CALL', color: '#ffb000' },
  { cmd: 'cat about.md', href: '/about', label: 'about/', desc: 'Self-taught dev. Video games → AP CS → production systems.', tag: 'PERSONAL', color: '#00aaff' },
  { cmd: 'ls -la experience/', href: '/experience', label: 'experience/', desc: '5 companies. NC State, Megavue, Paradigm, SMS, S4-Digital.', tag: 'CAREER', color: '#007a1f' },
  { cmd: 'ls certs/', href: '/certifications', label: 'certifications/', desc: 'Mendix Advanced + Intermediate + Rapid + Low-Code Academy.', tag: 'CERTS', color: '#7c3aed' },
  { cmd: './tools --list', href: '/tools', label: 'tools/', desc: 'AI chat, CSS playground, JSON formatter, regex tester + more.', tag: 'INTERACTIVE', color: '#ff3333' },
  { cmd: 'cat references.txt', href: '/references', label: 'references/', desc: 'Past co-workers and leads who can vouch.', tag: 'CONTACTS', color: '#28c840' },
];

export default function Home() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => { setInputActive(true); }, 300);
        }
      }, line.delay);
    });
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '30px' }}>
      <MatrixRain opacity={0.12} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ opacity: 0, animation: 'fadeInUp 0.4s ease 0.1s forwards', marginBottom: '24px' }}>
          <div style={{ marginBottom: '12px', fontSize: '11px', color: '#004d13', letterSpacing: '0.1em' }}># available modules — click or type the command above</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a' }}>
            {MODULES.map((mod) => {
              const isHire = mod.href === '/hire';
              return (
                <Link key={mod.href} href={mod.href} style={{ textDecoration: 'none', display: 'flex' }}>
                  <div style={{ background: isHire ? '#001a00' : '#0d0d0d', padding: '20px', cursor: 'pointer', transition: 'background 0.15s', borderLeft: `2px solid ${mod.color}`, flex: 1 }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isHire ? '#002a00' : '#111'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = isHire ? '#001a00' : '#0d0d0d'}>
                    <div style={{ fontSize: '10px', color: mod.color, letterSpacing: '0.1em', marginBottom: '6px' }}>[{mod.tag}]{isHire && <span style={{ marginLeft: '8px', fontSize: '9px', color: '#00ff41' }}>● FREE</span>}</div>
                    <div style={{ fontSize: '10px', color: '#004d13', marginBottom: '4px' }}>$ {mod.cmd}</div>
                    <div style={{ fontSize: '15px', color: '#00ff41', fontWeight: 700, marginBottom: '6px' }}>{mod.label}</div>
                    <div style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.5 }}>{mod.desc}</div>
                    {isHire && <div style={{ marginTop: '10px', fontSize: '11px', color: mod.color, fontWeight: 700 }}>→ book now</div>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <TermWindow title="bash — nicholas@sivaji-perez: ~ — 120×40" style={{ marginBottom: '24px' }}>
          <div className="term-body" style={{ minHeight: '300px' }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="animate-scan-in" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: line.color || '#007a1f', fontWeight: line.bold ? 700 : 400, minHeight: '20px', lineHeight: '1.7' }}>
                {line.text}
              </div>
            ))}
            {inputActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                <span style={{ color: '#00ff41', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '13px' }}>
                  <span style={{ color: '#00ff41' }}>nicholas</span><span style={{ color: '#007a1f' }}>@sivaji-perez</span><span style={{ color: '#007a1f' }}>:</span><span style={{ color: '#00aaff' }}>~</span><span style={{ color: '#00ff41' }}>$</span>
                </span>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { const cmd = inputVal.trim().toLowerCase(); setInputVal(''); const match = MODULES.find(m => m.cmd.toLowerCase().includes(cmd) || m.label.replace('/', '').includes(cmd)); if (match) window.location.href = match.href; } }}
                  className="term-input" placeholder="type a command and press enter..." autoFocus spellCheck={false} style={{ fontSize: '13px' }} />
              </div>
            )}
          </div>
        </TermWindow>
      </div>
    </div>
  );
}
