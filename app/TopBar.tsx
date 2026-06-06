'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: '~', href: '/', cmd: 'cd ~' },
  { label: 'about', href: '/about', cmd: 'cat about.md' },
  { label: 'experience', href: '/experience', cmd: 'ls experience/' },
  { label: 'certifications', href: '/certifications', cmd: 'ls certs/' },
  { label: 'tools', href: '/tools', cmd: './tools' },
  { label: 'references', href: '/references', cmd: 'cat refs.txt' },
  { label: 'services', href: '/services', cmd: './services' },
];

export default function TopBar() {
  const pathname = usePathname();
  const [contactOpen, setContactOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: '24px', left: 0, right: 0, zIndex: 900,
      background: '#050f05',
      borderBottom: '1px solid #00ff41',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {/* Titlebar row */}
      <div style={{
        background: '#020a02',
        padding: '4px 12px',
        display: 'flex', alignItems: 'center', gap: '6px',
        borderBottom: '1px solid #00ff4133',
        fontSize: '11px',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ marginLeft: 8, color: '#00dd44', letterSpacing: '0.04em' }}>
          bash — <span style={{ color: '#00ff41', fontWeight: 700 }}>nicholas@sivaji-perez</span>: {pathname}
        </span>
      </div>

      {/* Nav row */}
      <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '6px 14px',
              color: active ? '#000' : '#00dd44',
              background: active ? '#00ff41' : 'transparent',
              textDecoration: 'none',
              fontSize: '12px', letterSpacing: '0.05em',
              borderRight: '1px solid #00ff4122',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#00ff41'; (e.currentTarget as HTMLElement).style.background = '#001a00'; } }}
            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#00dd44'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
            >
              <span style={{ fontSize: '9px', color: active ? '#000' : '#00aa33', marginBottom: 2 }}>{item.cmd}</span>
              <span style={{ fontWeight: active ? 700 : 500 }}>{item.label}/</span>
            </Link>
          );
        })}

        <div style={{ flex: 1 }} />

        {/* HIRE ME */}
        <Link href="/hire" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 20px', textDecoration: 'none',
          background: pathname === '/hire' ? '#00ff41' : 'transparent',
          borderLeft: '1px solid #00ff41',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (pathname !== '/hire') (e.currentTarget as HTMLElement).style.background = '#001a00'; }}
        onMouseLeave={e => { if (pathname !== '/hire') (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <span style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            color: pathname === '/hire' ? '#000' : '#00ff41',
            textShadow: pathname === '/hire' ? 'none' : '0 0 10px #00ff41, 0 0 20px #00ff4166',
          }}>● HIRE ME</span>
        </Link>

        {/* Contact dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button onClick={() => setContactOpen(!contactOpen)} style={{
            background: contactOpen ? '#001a00' : 'transparent',
            border: 'none', borderLeft: '1px solid #00ff4122',
            color: '#00dd44',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px', padding: '0 16px', cursor: 'pointer',
            letterSpacing: '0.05em', height: '100%', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00ff41'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#00dd44'; }}
          >
            ./contact {contactOpen ? '▲' : '▼'}
          </button>
          {contactOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 1px)',
              background: '#050f05', border: '1px solid #00ff41',
              minWidth: '300px', zIndex: 100,
              boxShadow: '0 0 30px rgba(0,255,65,0.15)',
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #00ff4122', fontSize: '10px', color: '#00aa33', letterSpacing: '0.1em' }}>
                # contact information
              </div>
              {[
                { label: 'EMAIL', value: 'nicholassivaji@gmail.com', href: 'mailto:nicholassivaji@gmail.com' },
                { label: 'PHONE', value: '(954) 736-6645', href: 'tel:9547366645' },
                { label: 'LINKEDIN', value: '/in/nicholas-sivaji-perez', href: 'https://www.linkedin.com/in/nicholas-sivaji-perez/' },
                { label: 'GITHUB', value: 'github.com/nicholassivaji', href: 'https://github.com' },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', gap: '16px', padding: '10px 12px',
                  borderBottom: '1px solid #00ff4111', textDecoration: 'none', transition: 'background 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#001a00'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <span style={{ color: '#00aa33', fontSize: '11px', minWidth: 65, letterSpacing: '0.05em' }}>{item.label}</span>
                  <span style={{ color: '#00aaff', fontSize: '12px' }}>{item.value}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
