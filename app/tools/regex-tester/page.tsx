
'use client';
import { useState, useMemo } from 'react';
import MatrixRain from '../../MatrixRain';

const PRESETS = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}' },
  { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)' },
  { label: 'Phone US', pattern: '\\(?(\\d{3})\\)?[-.\\s]?(\\d{3})[-.\\s]?(\\d{4})' },
  { label: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})' },
  { label: 'IP Address', pattern: '\\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b' },
];

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testStr, setTestStr] = useState('');

  const result = useMemo(() => {
    if (!pattern || !testStr) return null;
    try {
      const rx = new RegExp(pattern, flags);
      const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
      return { valid: true, matches, highlighted: testStr.replace(rx, m => `\x00${m}\x01`) };
    } catch (e: any) {
      return { valid: false, error: e.message, matches: [], highlighted: testStr };
    }
  }, [pattern, flags, testStr]);

  const highlighted = result?.highlighted?.split('\x00').map((part, i) => {
    if (i === 0) return <span key={i} style={{ color: '#007a1f' }}>{part}</span>;
    const [match, rest] = part.split('\x01');
    return (
      <span key={i}>
        <span style={{ background: '#00ff4133', color: '#00ff41', borderBottom: '2px solid #00ff41' }}>{match}</span>
        <span style={{ color: '#007a1f' }}>{rest}</span>
      </span>
    );
  });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.05} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '16px', fontSize: '11px', color: '#004d13' }}>
          nicholas@sivaji-perez:~$ ./regex-test --interactive
        </div>

        {/* Pattern input */}
        <div className="term-window" style={{ marginBottom: '12px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>pattern</span>
            {result && (
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: result.valid ? '#28c840' : '#ff3333' }}>
                {result.valid ? `✓ ${result.matches.length} match${result.matches.length !== 1 ? 'es' : ''}` : '✗ INVALID'}
              </span>
            )}
          </div>
          <div className="term-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#007a1f', fontSize: '18px' }}>/</span>
              <input
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                className="term-input"
                placeholder="your pattern here..."
                spellCheck={false}
                style={{ fontSize: '15px' }}
              />
              <span style={{ color: '#007a1f', fontSize: '18px' }}>/</span>
              <input
                value={flags}
                onChange={e => setFlags(e.target.value)}
                className="term-input"
                style={{ width: '60px', fontSize: '15px' }}
                placeholder="gim"
                spellCheck={false}
              />
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: '#004d13', alignSelf: 'center' }}>presets:</span>
              {PRESETS.map(p => (
                <button key={p.label} onClick={() => setPattern(p.pattern)} className="term-btn" style={{ fontSize: '10px', padding: '3px 10px' }}>
                  {p.label}
                </button>
              ))}
            </div>

            {result && !result.valid && (
              <div style={{ marginTop: '10px', color: '#ff3333', fontSize: '12px' }}>✗ {result.error}</div>
            )}
          </div>
        </div>

        {/* Test string */}
        <div className="term-window" style={{ marginBottom: '12px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>test string</span>
          </div>
          <div className="term-body">
            <textarea
              value={testStr}
              onChange={e => setTestStr(e.target.value)}
              className="term-textarea"
              rows={5}
              placeholder="paste your test string here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Results */}
        {result?.valid && testStr && (
          <div className="term-window">
            <div className="term-titlebar">
              <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8 }}>matches — {result.matches.length} found</span>
            </div>
            <div className="term-body">
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 1.8, marginBottom: '16px', wordBreak: 'break-all' }}>
                {highlighted}
              </div>
              {result.matches.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '8px' }}># match list</div>
                  {result.matches.slice(0, 20).map((m, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#007a1f', marginBottom: '4px' }}>
                      <span style={{ color: '#004d13' }}>[{i}]</span>
                      <span style={{ color: '#00ff41', marginLeft: '12px' }}>&quot;{m[0]}&quot;</span>
                      <span style={{ color: '#004d13', marginLeft: '8px' }}>index: {m.index}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegexTester;
