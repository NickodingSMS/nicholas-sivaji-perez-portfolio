'use client';
import Link from 'next/link';
import MatrixRain from '../MatrixRain';

const tools = [
  { cmd: './css-playground --live', href: '/tools/css-playground', label: 'css-playground', desc: 'Write CSS and see it render live. My favorite tool.', tag: 'LIVE EDITOR', color: '#00aaff', status: 'ONLINE' },
  { cmd: './json-fmt --pretty', href: '/tools/json-formatter', label: 'json-formatter', desc: 'Paste messy JSON, get it back clean and syntax-highlighted.', tag: 'UTILITY', color: '#ffb000', status: 'ONLINE' },
  { cmd: './regex-test --interactive', href: '/tools/regex-tester', label: 'regex-tester', desc: 'Write a pattern, test strings against it in real time.', tag: 'UTILITY', color: '#00ff41', status: 'ONLINE' },
  { cmd: './color-gen --palette', href: '/tools/color-palette', label: 'color-palette', desc: 'Generate color palettes. Export as CSS variables.', tag: 'DESIGN', color: '#ff69b4', status: 'ONLINE' },
];

export default function Tools() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#004d13' }}>nicholas@sivaji-perez:~$ ./tools --list</div>
        <div style={{ marginBottom: '24px', fontSize: '11px', color: '#004d13' }}># interactive dev tools — actually useful, not just demos</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a' }}>
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0d0d0d', padding: '24px', borderLeft: `2px solid ${tool.color}`, cursor: 'pointer', transition: 'background 0.15s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#111'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0d0d0d'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', color: tool.color, letterSpacing: '0.1em' }}>[{tool.tag}]</span>
                  <span style={{ fontSize: '9px', padding: '1px 6px', background: '#001a00', color: '#28c840', border: '1px solid #28c840' }}>● {tool.status}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#004d13', marginBottom: '6px' }}>$ {tool.cmd}</div>
                <div style={{ fontSize: '16px', color: '#00ff41', fontWeight: 700, marginBottom: '8px' }}>{tool.label}</div>
                <div style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.6 }}>{tool.desc}</div>
                <div style={{ marginTop: '16px', fontSize: '11px', color: tool.color }}>→ launch</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
