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
        <span style={{ marginLeft: 8, color: '#00dd44', letterSpacing: '0.04em' }}>
          bash — <span style={{ color: '#00ff41', fontWeight: 700 }}>nicholas@sivaji-perez</span>: {pathname}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>

        {/* HIRE ME first so boomers see it immediately */}
        <Link href="/hire" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', textDecoration: 'none',
          background: pathname === '/hire' ? '#00ff41' : '#001a00',
          borderRight: '1px solid #00ff41',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (pathname !== '/hire') (e.currentTarget as HTMLElement).style.background = '#002a00'; }}
        onMouseLeave={e => { if (pathname !== '/hire') (e.currentTarget as HTMLElement).style.background = '#001a00'; }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: pathname === '/hire' ? '#000' : '#00ff41', textShadow: pathname === '/hire' ? 'none' : '0 0 10px #00ff41, 0 0 20px #00ff4166' }}>
            <span className="desktop-text">● BOOK A FREE CALL</span><span className="mobile-text">● BOOK ME</span>
          </span>
        </Link>

        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '6px 14px',
              color: active ? '#000' : '#00dd44',
              background: active ? '#00ff41' : 'transparent',
              textDecoration: 'none', fontSize: '12px', letterSpacing: '0.05em',
              borderRight: '1px solid #00ff4122', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#00ff41'; (e.currentTarget as HTMLElement).style.background = '#001a00'; } }}
            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#00dd44'; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
            >
              <span style={{ fontSize: '9px', color: active ? '#000' : '#00aa33', marginBottom: 2 }}>{item.cmd}</span>
              <span style={{ fontWeight: active ? 700 : 500 }}>{item.label}/</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
