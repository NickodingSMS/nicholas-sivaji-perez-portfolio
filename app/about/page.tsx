'use client';
import MatrixRain from '../MatrixRain';
import Image from 'next/image';

const sections = [
  {
    cmd: 'cat personal.md',
    title: 'personal.md',
    color: '#00aaff',
    content: [
      "Born into curiosity. In 5th grade (2010), I was the kid my teacher called",
      "when the computer broke. That same year I got GameCube games running on a",
      "dying laptop using a PS3 controller by spoofing the drivers. Just because",
      "I wanted to see if I could.",
      "",
      "High school: AP Computer Science. Before that: Cheat Engine, emulators,",
      "game modding, ROM hacks. I learned what code could do before I knew what",
      "code was. That itch never went away.",
      "",
      "No degree. Didn't need one. Had a computer and time.",
    ],
  },
  {
    cmd: 'cat career.md',
    title: 'career.md',
    color: '#00ff41',
    content: [
      "Straight out of high school → S4-Digital internship. HTML/CSS, Mendix",
      "bootcamp, APIs, jQuery, Git, Jira, Agile. Real work, real clients,",
      "real deadlines from day one.",
      "",
      "Climbed to Solutions Engineer / Architect at SMS. Led front-end,",
      "designed layouts, owned SCSS, mentored juniors, integrated APIs for",
      "developers who didn't know how. The go-to front-end person.",
      "",
      "Built things at NC State, Megavue, Paradigm. Each one: handed a broken",
      "system, left it significantly better. Usually fast.",
      "",
      "Currently: open to full-time remote roles. I build things that work.",
    ],
  },
  {
    cmd: 'cat family.md',
    title: 'family.md',
    color: '#ffb000',
    content: [
      "Wife. Two kids.",
      "",
      "Everything I build is for them. Remote work isn't a perk —",
      "it's how I stay present while building a career that matters.",
      "",
      "They're why I don't half-ass anything.",
    ],
  },
];

const skills = [
  { label: 'CSS / SCSS', level: 96, color: '#00aaff' },
  { label: 'JavaScript / TS', level: 88, color: '#00ff41' },
  { label: 'React / Next.js', level: 85, color: '#00ff41' },
  { label: 'Mendix', level: 94, color: '#ffb000' },
  { label: 'Express / Node', level: 75, color: '#00ff41' },
  { label: 'Python', level: 68, color: '#007a1f' },
  { label: 'SQL / Prisma', level: 72, color: '#007a1f' },
  { label: 'Linux / CLI', level: 80, color: '#00aaff' },
];

export default function About() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '90px', paddingBottom: '40px' }}>
      <MatrixRain opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '20px 20px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: '20px', fontSize: '11px', color: '#004d13', letterSpacing: '0.1em' }}>
          nicholas@sivaji-perez:~$ cat about.md
        </div>

        {/* Profile card */}
        <div className="term-window" style={{ marginBottom: '16px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>whoami</span>
          </div>
          <div className="term-body" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 100, height: 100, border: '1px solid #1a3a1a', position: 'relative', overflow: 'hidden' }}>
                <Image src="/portrait.JPG" alt="Nicholas Sivaji Perez" fill style={{ objectFit: 'cover', filter: 'grayscale(30%) contrast(1.1)' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(0,255,65,0.9)', color: '#0a0a0a',
                fontSize: '9px', textAlign: 'center', padding: '2px', fontWeight: 700
              }}>ONLINE</div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              {[
                ['NAME', 'Nicholas Sivaji Perez'],
                ['ROLE', 'Software Engineer / Front End Specialist'],
                ['LOCATION', 'Gainesville, FL (Remote)'],
                ['EXPERIENCE', '5+ years'],
                ['EDUCATION', 'Self-taught + Mendix Certified (Advanced)'],
                ['STATUS', 'ACTIVELY SEEKING'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '12px', marginBottom: '4px', fontSize: '13px' }}>
                  <span style={{ color: '#004d13', minWidth: 90, fontSize: '11px' }}>{k}</span>
                  <span style={{ color: k === 'STATUS' ? '#00ff41' : '#00cc33', fontWeight: k === 'STATUS' ? 700 : 400 }}>
                    {k === 'STATUS' ? '█ ' : ''}{v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill bars */}
        <div className="term-window" style={{ marginBottom: '16px' }}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span style={{ marginLeft: 8 }}>skills --proficiency</span>
          </div>
          <div className="term-body">
            <div style={{ fontSize: '11px', color: '#004d13', marginBottom: '16px' }}># self-assessed, production-verified</div>
            {skills.map(skill => (
              <div key={skill.label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                  <span style={{ color: '#00cc33' }}>{skill.label}</span>
                  <span style={{ color: '#004d13' }}>{skill.level}%</span>
                </div>
                <div style={{ height: '4px', background: '#0a2a0a', position: 'relative' }}>
                  <div style={{
                    height: '100%', width: `${skill.level}%`,
                    background: skill.color,
                    boxShadow: `0 0 6px ${skill.color}`,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story sections */}
        {sections.map((sec, i) => (
          <div key={i} className="term-window" style={{ marginBottom: '16px' }}>
            <div className="term-titlebar">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span style={{ marginLeft: 8 }}>$ {sec.cmd}</span>
            </div>
            <div className="term-body">
              <div style={{ borderLeft: `2px solid ${sec.color}`, paddingLeft: '16px' }}>
                {sec.content.map((line, j) => (
                  <div key={j} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    color: line === '' ? 'transparent' : '#007a1f',
                    minHeight: '20px', lineHeight: '1.8',
                  }}>{line || '​'}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
