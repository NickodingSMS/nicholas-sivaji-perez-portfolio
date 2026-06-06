'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import MatrixRain from '../MatrixRain';

const certs = [
  { id: 1, title: 'Mendix Rapid Developer', image: '/Rapid.jpg', pdf: '/Rapid.pdf', level: 'ENTRY', color: '#007a1f' },
  { id: 2, title: 'Low-Code Academy Bootcamp', image: '/Lowcode.jpg', pdf: '/Lowcode.pdf', level: 'BOOTCAMP', color: '#00aaff' },
  { id: 3, title: 'Mendix Intermediate Developer', image: '/Intermediate.jpg', pdf: '/Intermediate.pdf', level: 'MID', color: '#ffb000' },
  { id: 4, title: 'Mendix Advanced Developer', image: '/Advanced.JPG', pdf: '/Advanced.pdf', level: 'ADVANCED', color: '#00ff41' },
];

export default function Certifications() {
  const [selected, setSelected] = useState<typeof certs[0] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setSelected(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#00cc33' }}>nicholas@sivaji-perez:~$ ls -la certs/</div>
        <div style={{ marginBottom: '24px', fontSize: '11px', color: '#00cc33' }}># 4 certifications — click any to view full certificate</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a' }}>
          {certs.map(cert => (
            <div key={cert.id} onClick={() => setSelected(cert)}
              style={{ background: '#0d0d0d', padding: '20px', cursor: 'pointer', borderLeft: `2px solid ${cert.color}`, transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#111'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0d0d0d'}>
              <div style={{ fontSize: '10px', color: cert.color, letterSpacing: '0.1em', marginBottom: '8px' }}>[{cert.level}]</div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '12px', border: '1px solid #1a3a1a', overflow: 'hidden' }}>
                <Image src={cert.image} alt={cert.title} fill style={{ objectFit: 'cover', filter: 'grayscale(20%) contrast(1.05)' }} />
              </div>
              <div style={{ fontSize: '14px', color: '#00dd44', fontWeight: 700, marginBottom: '4px' }}>{cert.title}</div>
              <div style={{ fontSize: '11px', color: '#00aa33' }}>click to view · download available</div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500 }}>
          <div ref={modalRef} className="term-window" style={{ maxWidth: '640px', width: '90%' }}>
            <div className="term-titlebar" style={{ borderLeft: `2px solid ${selected.color}` }}>
              <span className="term-dot term-dot-red" onClick={() => setSelected(null)} style={{ cursor: 'pointer' }} />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8, color: '#00cc33' }}>{selected.title}</span>
            </div>
            <div className="term-body">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '16px', border: '1px solid #1a3a1a' }}>
                <Image src={selected.image} alt={selected.title} fill style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={selected.pdf} download className="term-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Download PDF</a>
                <button onClick={() => setSelected(null)} className="term-btn">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
