// ─────────────────────────────────────────────
// CSS PLAYGROUND — app/tools/css-playground/page.tsx
// ─────────────────────────────────────────────
'use client';
import { useState } from 'react';
import MatrixRain from '../../MatrixRain';

const DEFAULT_HTML = `<div class="box">
  <h1>Hello World</h1>
  <p>Edit the CSS panel →</p>
  <button>Click me</button>
</div>`;

const DEFAULT_CSS = `.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  background: #1a1a2e;
  border-radius: 12px;
  font-family: sans-serif;
  min-height: 200px;
}

h1 {
  color: #e94560;
  font-size: 2rem;
  margin: 0;
}

p {
  color: #a8a8b3;
  margin: 0;
}

button {
  background: #e94560;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}`;

export default function CSSPlayground() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [activePane, setActivePane] = useState<'html' | 'css'>('css');

  const srcDoc = `<style>body{margin:0;padding:20px;background:#0a0a0a;display:flex;align-items:center;justify-content:center;min-height:100vh;}${css}</style>${html}`;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.05} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '16px', fontSize: '11px', color: '#004d13' }}>
          nicholas@sivaji-perez:~$ ./css-playground --live
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a3a1a', height: '70vh', border: '1px solid #1a3a1a' }}>
          {/* Editor pane */}
          <div className="term-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="term-titlebar" style={{ gap: '0' }}>
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              {(['html', 'css'] as const).map(tab => (
                <button key={tab} onClick={() => setActivePane(tab)} style={{
                  background: activePane === tab ? '#00ff41' : 'transparent',
                  color: activePane === tab ? '#0a0a0a' : '#007a1f',
                  border: 'none', fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', padding: '0 14px', cursor: 'pointer',
                  marginLeft: tab === 'html' ? 8 : 0, height: '100%',
                }}>
                  {tab === 'html' ? 'index.html' : 'style.css'}
                </button>
              ))}
            </div>
            <textarea
              value={activePane === 'css' ? css : html}
              onChange={e => activePane === 'css' ? setCss(e.target.value) : setHtml(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1, background: '#0a0a0a', border: 'none', outline: 'none',
                color: '#00ff41', fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px', padding: '16px', resize: 'none', lineHeight: 1.7,
              }}
            />
          </div>

          {/* Preview pane */}
          <div className="term-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="term-titlebar">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8 }}>preview — live</span>
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#28c840' }}>● LIVE</span>
            </div>
            <iframe
              srcDoc={srcDoc}
              style={{ flex: 1, border: 'none', background: '#0a0a0a' }}
              title="preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
