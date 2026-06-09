'use client';
import { useState, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
}

export default function TermWindow({ title, children, style, borderColor }: Props) {
  const [minimized, setMinimized] = useState(false);
  return (
    <div className="term-window" style={style}>
      <div className="term-titlebar" style={borderColor ? { borderLeft: '2px solid ' + borderColor } : undefined}>
        <span className="term-dot term-dot-red" />
        <span className="term-dot term-dot-yellow" onClick={() => setMinimized(!minimized)} style={{ cursor: 'pointer' }} title="minimize" />
        <span className="term-dot term-dot-green" />
        <span style={{ marginLeft: 8, color: '#00dd44', fontSize: '11px' }}>{title}</span>
        {minimized && <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#00aa33', fontStyle: 'italic' }}>minimized — click yellow to restore</span>}
      </div>
      {!minimized && <>{children}</>}
    </div>
  );
}
