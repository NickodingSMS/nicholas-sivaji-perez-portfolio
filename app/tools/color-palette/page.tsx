'use client';
import { useState, useCallback } from 'react';
import MatrixRain from '../../MatrixRain';

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return `#${[f(0), f(8), f(4)].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

function generatePalette(base: string, mode: string): { name: string; hex: string }[] {
  const [h, s, l] = hexToHsl(base);
  switch (mode) {
    case 'shades':
      return [10, 20, 30, 40, 50, 60, 70, 80, 90].map((lt, i) => ({ name: `shade-${(i + 1) * 100}`, hex: hslToHex(h, s, lt) }));
    case 'complementary':
      return [
        { name: 'base', hex: base },
        { name: 'base-light', hex: hslToHex(h, s, Math.min(l + 20, 90)) },
        { name: 'base-dark', hex: hslToHex(h, s, Math.max(l - 20, 10)) },
        { name: 'complement', hex: hslToHex((h + 180) % 360, s, l) },
        { name: 'complement-light', hex: hslToHex((h + 180) % 360, s, Math.min(l + 20, 90)) },
        { name: 'complement-dark', hex: hslToHex((h + 180) % 360, s, Math.max(l - 20, 10)) },
      ];
    case 'triadic':
      return [
        { name: 'primary', hex: base },
        { name: 'secondary', hex: hslToHex((h + 120) % 360, s, l) },
        { name: 'tertiary', hex: hslToHex((h + 240) % 360, s, l) },
        { name: 'primary-light', hex: hslToHex(h, s, Math.min(l + 25, 90)) },
        { name: 'secondary-light', hex: hslToHex((h + 120) % 360, s, Math.min(l + 25, 90)) },
        { name: 'tertiary-light', hex: hslToHex((h + 240) % 360, s, Math.min(l + 25, 90)) },
      ];
    case 'analogous':
    default:
      return [-40, -20, 0, 20, 40].map(offset => ({
        name: offset === 0 ? 'base' : offset < 0 ? `analogous-${Math.abs(offset)}` : `analogous+${offset}`,
        hex: hslToHex((h + offset + 360) % 360, s, l),
      }));
  }
}

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState('#00ff41');
  const [mode, setMode] = useState('shades');
  const [copied, setCopied] = useState('');

  const palette = generatePalette(baseColor, mode);

  const copyCSS = () => {
    const css = `:root {\n${palette.map(c => `  --color-${c.name}: ${c.hex};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    setCopied('css');
    setTimeout(() => setCopied(''), 2000);
  };

  const copyHex = () => {
    navigator.clipboard.writeText(palette.map(c => c.hex).join(', '));
    setCopied('hex');
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.05} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '16px', fontSize: '11px', color: '#004d13' }}>
          nicholas@sivaji-perez:~$ ./color-gen --palette
        </div>

        {/* Controls */}
        <div className="term-window" style={{ marginBottom: '16px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>color-gen --config</span>
          </div>
          <div className="term-body" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#004d13' }}>base:</span>
              <input
                type="color"
                value={baseColor}
                onChange={e => setBaseColor(e.target.value)}
                style={{ width: 40, height: 30, border: '1px solid #1a3a1a', background: 'none', cursor: 'pointer', padding: 0 }}
              />
              <input
                value={baseColor}
                onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBaseColor(e.target.value); }}
                className="term-input"
                style={{ width: '90px', fontSize: '13px' }}
                spellCheck={false}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['shades', 'complementary', 'triadic', 'analogous'].map(m => (
                <button key={m} onClick={() => setMode(m)} className="term-btn" style={{
                  background: mode === m ? '#00ff41' : 'transparent',
                  color: mode === m ? '#0a0a0a' : undefined,
                  fontSize: '11px', padding: '4px 12px',
                }}>{m}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
              <button onClick={copyCSS} className="term-btn" style={{ fontSize: '11px' }}>
                {copied === 'css' ? '✓ COPIED' : 'Copy CSS Vars'}
              </button>
              <button onClick={copyHex} className="term-btn" style={{ fontSize: '11px' }}>
                {copied === 'hex' ? '✓ COPIED' : 'Copy HEX'}
              </button>
            </div>
          </div>
        </div>

        {/* Palette swatches */}
        <div className="term-window" style={{ marginBottom: '16px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>palette — {palette.length} colors</span>
          </div>
          <div className="term-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
              {palette.map(color => (
                <div
                  key={color.name}
                  style={{ cursor: 'pointer' }}
                  onClick={() => { navigator.clipboard.writeText(color.hex); setCopied(color.hex); setTimeout(() => setCopied(''), 1500); }}
                  title="Click to copy"
                >
                  <div style={{
                    height: '80px', background: color.hex,
                    border: '1px solid #1a3a1a', position: 'relative',
                    transition: 'transform 0.1s',
                  }}>
                    {copied === color.hex && (
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '12px', fontWeight: 700,
                      }}>COPIED</div>
                    )}
                  </div>
                  <div style={{ padding: '6px 2px' }}>
                    <div style={{ fontSize: '11px', color: '#007a1f', marginBottom: '2px' }}>{color.name}</div>
                    <div style={{ fontSize: '12px', color: '#00ff41', fontFamily: 'monospace' }}>{color.hex}</div>
                    <div style={{ fontSize: '10px', color: '#004d13' }}>
                      hsl({hexToHsl(color.hex).join(', ')})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS output */}
        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>variables.css — ready to paste</span>
          </div>
          <div className="term-body">
            <pre style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.8, margin: 0, overflowX: 'auto' }}>
              <span style={{ color: '#569cd6' }}>:root</span>{' {'}{'\n'}
              {palette.map(c => (
                <span key={c.name} style={{ display: 'block' }}>
                  {'  '}<span style={{ color: '#9cdcfe' }}>--color-{c.name}</span>
                  {': '}
                  <span style={{ color: c.hex }}>{c.hex}</span>;
                </span>
              ))}
              {'}'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
