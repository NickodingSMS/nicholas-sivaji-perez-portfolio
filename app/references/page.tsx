'use client';
import MatrixRain from '../MatrixRain';
import TermWindow from '../TermWindow';

const refs: { name: string; role: string; email: string; phone?: string; relation: string; color: string }[] = [
  { name: 'Benjamin Hladycz', role: 'Director, Solutions Architect', email: 'benjaminhladycz@gmail.com', relation: 'Manager · Solutions Made Simple', color: '#00aaff' },
  { name: 'Pavneet Ajmani', role: 'Business Analyst & Configurations', email: 'pavneetajmani@gmail.com', relation: 'Colleague · S4-Digital', color: '#ffb000' },
  { name: 'Gerrardo Barrera', role: 'Senior Software Engineer', email: 'gerardobarrera714@gmail.com', relation: 'Mentor · California — taught me real-world code fundamentals', color: '#00ff41' },
  { name: 'Teddy Blanchard', role: 'CTO, Megavue LLC', email: 'tabenterprise@gmail.com', phone: '(504) 909-1648', relation: 'Client · Hired me for Mendix work on LarpWorks — ongoing relationship', color: '#ff69b4' },
];

export default function References() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', color: '#00cc33' }}>nicholas@sivaji-perez:~$ cat references.txt</div>
        <div style={{ marginBottom: '24px', fontSize: '11px', color: '#00cc33' }}># professional references — contact directly or ask me for more</div>

        {refs.map((ref, i) => (
          <TermWindow key={i} title={`${ref.name.toLowerCase().replace(/ /g, '_')}.contact`} borderColor={ref.color} style={{ marginBottom: '12px' }}>

            <div className="term-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 24px' }}>
                {[['NAME', ref.name], ['ROLE', ref.role], ['RELATION', ref.relation], ['EMAIL', ref.email], ...(ref.phone ? [['PHONE', ref.phone]] : [])].map(([k, v]) => (
                  <div key={k} style={{ display: 'contents' }}>
                    <span style={{ color: '#00aa33', fontSize: '11px', letterSpacing: '0.05em', alignSelf: 'center' }}>{k}</span>
                    <span style={{ fontSize: '13px', color: k === 'EMAIL' && v !== 'available on request' ? '#00aaff' : '#00dd44' }}>
                      {k === 'EMAIL' && v !== 'available on request'
                        ? <a href={`mailto:${v}`} style={{ color: '#00aaff', textDecoration: 'none' }}>{v}</a>
                        : v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TermWindow>
        ))}

        <TermWindow title="superiors.txt">

          <div className="term-body">
            <div style={{ fontSize: '13px', color: '#00dd44', marginBottom: '8px' }}>
              Contact info for direct managers and clients available on request.
            </div>
            <a href="mailto:nicholassivaji@gmail.com" style={{ fontSize: '12px', color: '#00aaff', textDecoration: 'none' }}>
              → nicholassivaji@gmail.com
            </a>
          </div>
        </TermWindow>
      </div>
    </div>
  );
}
