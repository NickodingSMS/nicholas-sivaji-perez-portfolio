'use client';
import MatrixRain from '../MatrixRain';

const faqs = [
  { q: 'How fast can you start?', a: 'Immediately. No 2-week notice, no queue. Book the call and we can kick off the same week.' },
  { q: 'Do you work hourly or fixed price?', a: 'Either. Small well-defined tasks I prefer fixed price. Ongoing or unclear scope I do hourly ($50-85/hr depending on complexity).' },
  { q: 'Can you sign an NDA?', a: 'Yes, no problem. Most of my best work is already under NDA.' },
  { q: 'Do you work with non-technical clients?', a: "Yes. I've reported directly to CEOs and CTOs with no dev background. I translate tech into plain language." },
  { q: 'What if I just have a small one-off task?', a: "Still worth the call. Even quick fixes need a scoping conversation. It's free." },
  { q: 'Do you do ongoing retainer work?', a: 'Yes and I prefer it. Retainer clients get priority scheduling and a lower effective rate.' },
];

const btnStyle: React.CSSProperties = {
  display: 'block',
  background: '#00ff41',
  color: '#0a0a0a',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '14px',
  fontWeight: 700,
  padding: '16px 32px',
  textDecoration: 'none',
  letterSpacing: '0.1em',
  textAlign: 'center',
  boxShadow: '0 0 20px rgba(0,255,65,0.3)',
};

export default function Hire() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px', margin: '0 auto', padding: '20px 20px 80px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#00cc33' }}>nicholas@sivaji-perez:~$ ./hire-me --schedule-call</div>
        <div style={{ marginBottom: '32px', fontSize: '11px', color: '#00cc33' }}># free 30-minute scoping call · no commitment · remote · available now</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <div className="term-window" style={{ marginBottom: '16px' }}>
              <div className="term-titlebar">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span style={{ marginLeft: 8, color: '#00dd44' }}>status.sh</span>
              </div>
              <div className="term-body">
                {[['AVAILABILITY','● OPEN','#00ff41'],['LOCATION','Gainesville, FL (Remote)','#00dd44'],['TIMEZONE','EST (UTC-5)','#00dd44'],['RESPONSE TIME','< 24 hours','#00dd44'],['START DATE','This week','#00dd44'],['PREFERRED','Remote contract / freelance','#00dd44']].map(([k,v,c]) => (
                  <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#00aa33', minWidth: 110, fontSize: '10px' }}>{k}</span>
                    <span style={{ color: c as string, fontWeight: k === 'AVAILABILITY' ? 700 : 400 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="term-window" style={{ marginBottom: '16px' }}>
              <div className="term-titlebar">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span style={{ marginLeft: 8, color: '#00dd44' }}>what-to-expect.md</span>
              </div>
              <div className="term-body">
                <div style={{ fontSize: '11px', color: '#00aa33', marginBottom: '12px' }}># the 30-minute call</div>
                {[['0:00 - 5:00','You explain your project or problem'],['5:00 - 15:00','I ask questions, identify scope and risks'],['15:00 - 25:00','I give you a rough approach and honest timeline'],['25:00 - 30:00',"We agree on next steps or I tell you if it's not a fit"]].map(([time,desc]) => (
                  <div key={time} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '12px' }}>
                    <span style={{ color: '#00ff41', minWidth: 100, fontSize: '11px', flexShrink: 0 }}>{time}</span>
                    <span style={{ color: '#00dd44' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="term-window">
              <div className="term-titlebar">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span style={{ marginLeft: 8, color: '#00dd44' }}>faq.txt</span>
              </div>
              <div className="term-body">
                <div style={{ fontSize: '11px', color: '#00aa33', marginBottom: '12px' }}># common questions</div>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: i < faqs.length - 1 ? '1px solid #0a2a0a' : 'none' }}>
                    <div style={{ fontSize: '12px', color: '#00ff41', fontWeight: 700, marginBottom: '4px' }}>Q: {faq.q}</div>
                    <div style={{ fontSize: '12px', color: '#00dd44', lineHeight: 1.6 }}>A: {faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="term-window" style={{ position: 'sticky', top: '100px' }}>
              <div className="term-titlebar">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span style={{ marginLeft: 8, color: '#00dd44' }}>schedule.sh</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#28c840' }}>● LIVE</span>
              </div>
              <div className="term-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px 20px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#00aa33' }}># click below to open my calendar and pick a time</div>
                <div style={{ fontSize: '12px', color: '#00dd44', lineHeight: 1.8 }}>
                  Free 30-minute call.<br/>No commitment.<br/>I will tell you exactly what I can do and what it will cost.
                </div>
                <a href="https://calendly.com/nicholassivaji/30min" target="_blank" rel="noopener noreferrer" style={btnStyle}>
                  BOOK A FREE CALL
                </a>
                <div style={{ fontSize: '11px', color: '#00aa33' }}>opens Calendly in a new tab</div>
                <div style={{ width: '100%', borderTop: '1px solid #1a3a1a', paddingTop: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#00aa33', marginBottom: '12px' }}># or reach out directly</div>
                  {[
                    { label: 'EMAIL', value: 'nicholassivaji@gmail.com', href: 'mailto:nicholassivaji@gmail.com' },
                    { label: 'LINKEDIN', value: '/in/nicholas-sivaji-perez', href: 'https://www.linkedin.com/in/nicholas-sivaji-perez/' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '12px' }}>
                      <span style={{ color: '#00aa33', minWidth: 70, fontSize: '10px' }}>{item.label}</span>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff', textDecoration: 'none' }}>{item.value}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
