'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <nav style={{ position: 'fixed', top: '24px', left: 0, right: 0, zIndex: 900, background: '#050f05', borderBottom: '1px solid #00ff41', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ background: '#020a02', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #00ff4133', fontSize: '11px' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ marginLeft: 8, color: '#00ff41', letterSpacing: '0.04em' }}>
          bash — <span style={{ color: '#00ff41', fontWeight: 700 }}>nicholas@sivaji-perez</span>: {pathname}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>

        {/* HIRE ME first so boomers see it immediately */}
        <Link href="/hire" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', textDecoration: 'none',
          background: '#00ff41', color: '#0a0a0a',
          fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em',
          textTransform: 'uppercase', whiteSpace: 'nowrap'
        }}>
          BOOK ME
        </Link>

        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
                padding: '6px 14px', minWidth: '90px',
                background: active ? '#00ff41' : 'transparent',
                color: active ? '#000' : '#00ff41',
                borderRight: '1px solid #00ff4133',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#00ff41'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#00ff41'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
              >
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.label}</span>
                <span style={{ fontSize: '9px', color: active ? '#000' : '#00dd44', marginBottom: 2 }}>{item.cmd}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
