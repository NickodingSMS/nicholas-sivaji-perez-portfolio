'use client';
import { useEffect } from 'react';
import MatrixRain from '../MatrixRain';

const CALENDLY_URL = 'https://calendly.com/nicholassivaji/30min';

const faqs = [
  { q: 'How fast can you start?', a: 'Immediately. No 2-week notice, no queue. Book the call and we can kick off the same week.' },
  { q: 'Do you work hourly or fixed price?', a: 'Either. Small well-defined tasks I prefer fixed price. Ongoing or unclear scope I do hourly ($50–85/hr depending on complexity).' },
  { q: 'Can you sign an NDA?', a: 'Yes, no problem. Most of my best work is already under NDA.' },
  { q: 'Do you work with non-technical clients?', a: "Yes. I've reported directly to CEOs and CTOs with no dev background. I translate tech into plain language." },
  { q: 'What if I just have a small one-off task?', a: "Still worth the call. Even quick fixes need a scoping conversation. It's free." },
  { q: 'Do you do ongoing retainer work?', a: 'Yes and I prefer it. Retainer clients get priority scheduling and a lower effective rate.' },
];

export default function Hire() {
  useEffect(() => {
    const existing = document.querySelector('script[src*="calendly"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px', margin: '0 auto', padding: '20px 20px 80px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#004d13' }}>nicholas@sivaji-perez:~$ ./hire-me --schedule-call</div>
        <div style={{ marginBottom: '32px', fontSize: '11px', color: '#004d13' }}># free 30-minute scoping call · no commitment · remote · available now</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          <div>
            <div className="term-window" style={{ marginBottom: '16px' }}>
              <div className="term-titlebar"><span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" /><span style={{ marginLeft: 8 }}>status.sh</span></div>
              <div className="term-body">
                {[['AVAILABILITY','● OPEN','#00ff41'],['LOCATION','Gainesville, FL (Remote)','#00cc33'],['TIMEZONE','EST (UTC-5)','#00cc33'],['RESPONSE TIME','< 24 hours','#00cc33'],['START DATE','This week','#00cc33'],['PREFERRED','Remote contract / freelance','#00cc33']].map(([k,v,c]) => (
                  <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#004d13', minWidth: 110, fontSize: '10px' }}>{k}</span>
                    <span style={{ color: c as string, fontWeight: k === 'AVAILABILITY' ? 700 : 400 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="term-window" style={{ marginBottom: '16px' }}>
              <div className="term-titlebar"><span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" /><span style={{ marginLeft: 8 }}>what-to-expect.md</span></div>
              <div className="term-body">
                <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '12px' }}># the 30-minute call</div>
                {[['0:00 – 5:00','You explain your project or problem'],['5:00 – 15:00','I ask questions, identify scope and risks'],['15:00 – 25:00','I give you a rough approach and honest timeline'],["25:00 – 30:00","We agree on next steps or I tell you if it's not a fit"]].map(([time,desc]) => (
                  <div key={time} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '12px' }}>
                    <span style={{ color: '#00ff41', minWidth: 100, fontSize: '11px', flexShrink: 0 }}>{time}</span>
                    <span style={{ color: '#007a1f' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="term-window" style={{ marginBottom: '16px' }}>
              <div className="term-titlebar"><span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" /><span style={{ marginLeft: 8 }}>direct-contact.txt</span></div>
              <div className="term-body">
                <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '10px' }}># prefer to skip the form?</div>
                {[{label:'EMAIL',value:'nicholassivaji@gmail.com',href:'mailto:nicholassivaji@gmail.com'},{label:'LINKEDIN',value:'/in/nicholas-sivaji-perez',href:'https://www.linkedin.com/in/nicholas-sivaji-perez/'}].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '12px', marginBottom: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#004d13', minWidth: 70, fontSize: '10px' }}>{item.label}</span>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff', textDecoration: 'none' }}>{item.value}</a>
                  </div>
                ))}
              </div>
            </div>

            <div className="term-window">
              <div className="term-titlebar"><span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" /><span style={{ marginLeft: 8 }}>faq.txt</span></div>
              <div className="term-body">
                <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '12px' }}># common questions</div>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: i < faqs.length - 1 ? '1px solid #0a2a0a' : 'none' }}>
                    <div style={{ fontSize: '12px', color: '#00ff41', fontWeight: 700, marginBottom: '4px' }}>Q: {faq.q}</div>
                    <div style={{ fontSize: '12px', color: '#007a1f', lineHeight: 1.6 }}>A: {faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="term-window" style={{ position: 'sticky', top: '100px' }}>
              <div className="term-titlebar">
                <span className="term-dot term-dot-red" /><span className="term-dot term-dot-yellow" /><span className="term-dot term-dot-green" />
                <span style={{ marginLeft: 8 }}>calendly — book a slot</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#28c840' }}>● LIVE</span>
              </div>
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0d0d0d&text_color=00ff41&primary_color=00ff41`}
                style={{ minWidth: '280px', height: '660px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
