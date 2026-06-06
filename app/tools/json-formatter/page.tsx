'use client';
import { useState } from 'react';
import MatrixRain from '../../MatrixRain';

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
      let cls = 'color:#ce9178'; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) cls = 'color:#9cdcfe'; // key
      } else if (/true|false/.test(match)) {
        cls = 'color:#569cd6'; // bool
      } else if (/null/.test(match)) {
        cls = 'color:#569cd6';
      } else {
        cls = 'color:#b5cea8'; // number
      }
      return `<span style="${cls}">${match}</span>`;
    });
}

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{ keys: number; size: string } | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError('');
      const keys = pretty.match(/"[^"]+"\s*:/g)?.length || 0;
      setStats({ keys, size: `${(new Blob([pretty]).size / 1024).toFixed(2)} KB` });
    } catch (e: any) {
      setError(e.message);
      setOutput('');
      setStats(null);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const copy = () => { navigator.clipboard.writeText(output); };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.05} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '16px', fontSize: '11px', color: '#004d13' }}>
          nicholas@sivaji-perez:~$ ./json-fmt --pretty
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <button onClick={format} className="term-btn">Format</button>
          <button onClick={minify} className="term-btn">Minify</button>
          <button onClick={copy} className="term-btn" disabled={!output}>Copy Output</button>
          <button onClick={() => { setInput(''); setOutput(''); setError(''); setStats(null); }} className="term-btn">Clear</button>
          {stats && (
            <span style={{ fontSize: '11px', color: '#004d13', alignSelf: 'center', marginLeft: '8px' }}>
              {stats.keys} keys · {stats.size}
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a3a1a', border: '1px solid #1a3a1a' }}>
          {/* Input */}
          <div className="term-window" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="term-titlebar">
              <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8 }}>input.json</span>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`paste your JSON here...\n\n{"name":"Nicholas","role":"Engineer"}`}
              spellCheck={false}
              style={{
                height: '65vh', background: '#0a0a0a', border: 'none', outline: 'none',
                color: '#00ff41', fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px', padding: '16px', resize: 'none', lineHeight: 1.7,
              }}
            />
          </div>

          {/* Output */}
          <div className="term-window" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="term-titlebar">
              <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8 }}>output.json</span>
              {error && <span style={{ marginLeft: 'auto', color: '#ff3333', fontSize: '11px' }}>✗ PARSE ERROR</span>}
              {output && !error && <span style={{ marginLeft: 'auto', color: '#28c840', fontSize: '11px' }}>✓ VALID</span>}
            </div>
            <div style={{
              height: '65vh', overflow: 'auto', padding: '16px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 1.7,
            }}>
              {error ? (
                <div style={{ color: '#ff3333' }}>
                  <div style={{ marginBottom: '8px', fontWeight: 700 }}>✗ SyntaxError</div>
                  <div style={{ color: '#ff666699' }}>{error}</div>
                </div>
              ) : output ? (
                <pre style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }} />
              ) : (
                <div style={{ color: '#004d13' }}>// formatted output will appear here</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
