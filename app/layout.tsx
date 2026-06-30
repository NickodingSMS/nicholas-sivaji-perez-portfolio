'use client';
import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NSP // Terminal</title>
        <meta name="description" content="Nicholas Sivaji Perez — Software Engineer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'JetBrains Mono', monospace", background: '#0a0a0a', color: '#00ff41', minHeight: '100vh' }}>
        {/* OS-level status bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '24px',
          background: '#001a00', borderBottom: '1px solid #1a3a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', zIndex: 1000, fontSize: '11px', color: '#007a1f',
          letterSpacing: '0.05em'
        }}>
          <span style={{ color: '#00ff41', fontWeight: 700 }}>NSP-OS v2.0.1</span>
          <span>nicholas@sivaji-perez:~</span>
          <OSClock />
        </div>
        <div style={{ paddingTop: '24px' }}>
          <TopBar />
          <main style={{ minHeight: 'calc(100vh - 24px)' }}>
            {children}
          </main>
        </div>
        {/* Bottom statusbar */}
        <div className="bottom-bar" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '20px',
          background: '#00ff41', display: 'flex', alignItems: 'center',
          padding: '0 12px', zIndex: 1000, fontSize: '11px', color: '#0a0a0a',
          letterSpacing: '0.05em', gap: '16px', fontWeight: 700
        }}>
          <span>READY</span>
          <span>|</span>
          <span>FL, USA</span>
          <span>|</span>
          <span>REMOTE</span>
          <span>|</span>
          <span style={{ marginLeft: 'auto' }}>nicholassivaji@gmail.com</span>
        </div>
      </body>
    </html>
  );
}

function OSClock() {
  // Static for SSR, updates client-side
  if (typeof window === 'undefined') return <span>--:--:--</span>;
  return <ClockClient />;
}

function ClockClient() {
  'use client';
  const { useState, useEffect } = require('react');
  // Initialize with the same value the server renders
  const [time, setTime] = useState('--:--:--');
  
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick(); // update immediately on client
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}