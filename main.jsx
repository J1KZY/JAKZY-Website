import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, ChevronDown, Code2, Copy, Globe2, Mail, Menu, Moon, Palette, Rocket, Share2, Sparkles, Sun, X, Zap } from 'lucide-react';
import './styles.css';

/* ---------------- brand logos ---------------- */
const Logo = ({ d, size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);
const ICON = {
  facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z',
  discord: 'M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189Zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z'
};

/* ---------------- data ---------------- */
const socials = [
  { name: 'Facebook', handle: '@j1kzy', icon: 'facebook', url: 'https://www.facebook.com/j1kzy' },
  { name: 'YouTube', handle: '@JAKZY_co', icon: 'youtube', url: 'https://www.youtube.com/@JAKZY_co' },
  { name: 'Discord', handle: 'Join the server', icon: 'discord', url: 'https://discord.gg/bCVVJ7xX8h' },
  { name: 'GitHub', handle: '@J1KZY', icon: 'github', url: 'https://github.com/J1KZY/' }
];
const roles = ['Software Developer', 'Web Developer', 'Creative Creator'];
const skills = [['JavaScript', 'Development'], ['TypeScript', 'Development'], ['Python', 'Development'], ['C++', 'Development'], ['React', 'Web'], ['HTML / CSS', 'Web'], ['UI / UX', 'Design'], ['Figma', 'Design'], ['VS Code', 'Tools'], ['Git / GitHub', 'Tools'], ['Microsoft Office', 'Tools'], ['Responsive Design', 'Web']];
const projects = [
  { title: 'COMMING SOON!', type: 'Web', desc: 'COMMING SOON!', tags: ['React', 'UI/UX', 'Vite'] },
  { title: 'COMMING SOON!', type: 'Web', desc: 'COMMING SOON!', tags: ['Product', 'Design', 'Development'] },
  { title: 'COMMING SOON!', type: 'Creative', desc: 'COMMING SOON!', tags: ['Motion', 'Creative', 'Code'] }
];

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function App() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('All');
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState('home');
  const [phase, setPhase] = useState('loading');   // loading -> exiting -> ready
  const [count, setCount] = useState(0);
  const [role, setRole] = useState(0);
  const heroCard = useRef(null);
  const siteRef = useRef(null);
  const barRef = useRef(null);

  /* intro: counter, then curtain, then hero sequence */
  useEffect(() => {
    if (reduced()) { setCount(100); setPhase('ready'); return; }
    let raf, start;
    const dur = 1400;
    const tick = t => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setPhase('exiting'); setTimeout(() => setPhase('ready'), 950); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* rotating role word */
  useEffect(() => {
    if (phase !== 'ready' || reduced()) return;
    const id = setInterval(() => setRole(r => (r + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);

  /* smoothed cursor + pointer light */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const soft = { ...target };
    const move = e => {
      target.x = e.clientX; target.y = e.clientY;
      siteRef.current?.style.setProperty('--mx', e.clientX + 'px');
      siteRef.current?.style.setProperty('--my', e.clientY + 'px');
    };
    let raf;
    const loop = () => {
      soft.x += (target.x - soft.x) * 0.14;
      soft.y += (target.y - soft.y) * 0.14;
      siteRef.current?.style.setProperty('--rx', soft.x + 'px');
      siteRef.current?.style.setProperty('--ry', soft.y + 'px');
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  /* reveal on scroll via IntersectionObserver */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* scroll progress + active link, rAF throttled */
  useEffect(() => {
    let ticking = false;
    const ids = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
    const read = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      setShowTop(scrollY > 700);
      let current = 'home';
      ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.35) current = id; });
      setActive(current);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } };
    read();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  /* keyboard shortcuts */
  useEffect(() => {
    const key = e => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (e.key.toLowerCase() === 't' && !typing) setDark(v => !v);
      if (e.key === 'Escape') setMenu(false);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.type === filter), [filter]);

  const copyName = async () => {
    try { await navigator.clipboard.writeText('Vuthy Lyheng'); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { }
  };
  const share = async () => {
    const data = { title: 'JAKZY — Vuthy Lyheng', text: 'Check out JAKZY — developer & creator.', url: location.href };
    try { navigator.share ? await navigator.share(data) : (await navigator.clipboard.writeText(location.href), setCopied(true)); } catch { }
  };

  /* card spotlight follows the pointer inside each card */
  const spot = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--cx', (e.clientX - r.left) + 'px');
    e.currentTarget.style.setProperty('--cy', (e.clientY - r.top) + 'px');
  };
  const tilt = e => {
    if (!heroCard.current || reduced()) return;
    const r = heroCard.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    heroCard.current.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-8px)`;
    spot(e);
  };
  const tiltReset = () => { if (heroCard.current) heroCard.current.style.transform = ''; };

  return (
    <div className="site" data-phase={phase} ref={siteRef}>
      <div className="preloader" data-phase={phase}>
        <div className="loaderInner">
          <div className="loaderLogo">J<span>.</span></div>
          <div className="loaderCount">{String(count).padStart(3, '0')}</div>
        </div>
        <div className="loaderLine"><i style={{ transform: `scaleX(${count / 100})` }} /></div>
      </div>

      <div className="scrollProgress"><i ref={barRef} /></div>
      <div className="cursorDot" /><div className="cursorRing" />
      <div className="ambient a1" /><div className="ambient a2" /><div className="bgGrid" /><div className="noise" />

      <header className="nav">
        <a className="brand" href="#home" onClick={() => setMenu(false)}><span>JAKZY</span><small>Vuthy Lyheng</small></a>
        <nav className={menu ? 'navlinks open' : 'navlinks'}>
          {['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'].map(x =>
            <a className={active === x.toLowerCase() ? 'active' : ''} key={x} href={'#' + x.toLowerCase()} onClick={() => setMenu(false)}>{x}</a>)}
        </nav>
        <div className="navactions">
          <button className="iconbtn" onClick={() => setDark(!dark)} aria-label="Switch theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="menubtn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroCopy">
            <div className="intro i1"><div className="status"><span className="pulse" /> Available for new projects</div></div>
            <p className="eyebrow intro i2">Hello, I'm <b>JAKZY</b></p>
            <h1 className="heroTitle">
              <span className="lineMask"><i style={{ '--d': '.05s' }}>Build.</i></span>
              <span className="lineMask"><i style={{ '--d': '.14s' }}>Design.</i></span>
              <span className="lineMask"><i className="outline" style={{ '--d': '.23s' }}>Imagine.</i></span>
            </h1>
            <div className="intro i3">
              <h2>Vuthy Lyheng</h2>
              <div className="roleRotator" aria-label={roles.join(', ')}>
                {roles.map((r, i) => <span key={r} className={i === role ? 'on' : ''} aria-hidden={i !== role}>{r}</span>)}
              </div>
            </div>
            <p className="lead intro i4">I turn ideas into <strong>clean, useful and memorable</strong> digital experiences.</p>
            <div className="buttons intro i5">
              <a className="primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="secondary" href="#contact">Let's connect</a>
            </div>
            <div className="meta intro i6"><span>Based in Cambodia</span><span className="dot" /><span>Building for the future</span></div>
          </div>

          <div className="heroVisual intro i4">
            <div className="orbit orbit1" /><div className="orbit orbit2" /><div className="orbit orbit3" /><div className="heroGlow" />
            <div className="profileCard" ref={heroCard} onMouseMove={tilt} onMouseLeave={tiltReset}>
              <div className="shine" />
              <div className="cardTop"><span>JAKZY / 01</span><span>CREATOR</span></div>
              <div className="avatarBig">
                <img src="jakzy.jpg" alt="Vuthy Lyheng" />
              </div>
              <div className="cardName">JAKZY<span>.</span></div>
              <div className="cardReal">Vuthy Lyheng</div>
              <div className="miniLine" />
              <div className="cardRole">Developer &amp; Creator</div>
              <div className="cardBottom"><span>CAMBODIA</span><span>2026 ↗</span></div>
            </div>
            <div className="floatingTag tag1"><Code2 size={13} /> DEVLOGPER</div>
            <div className="floatingTag tag2"><Sparkles size={13} /> CREATING</div>
          </div>
        </section>

        <div className="ticker">
          <div className="tickerTrack">
            {Array.from({ length: 2 }).flatMap(() => ['DEVELOPMENT', 'DESIGN', 'CREATIVE CODE', 'WEB EXPERIENCES', 'JAKZY Offcail', 'DIGITAL PRODUCTS']).map((x, i) => <span key={i}>{x}<b>✦</b></span>)}
          </div>
        </div>

        <section id="about" className="section reveal">
          <div className="sectionHead"><p className="eyebrow">About</p><h2>Not just a developer.<br /><em>A builder of ideas.</em></h2></div>
          <div className="aboutGrid">
            <div className="aboutText">
              <p>I'm <strong>Vuthy Lyheng</strong>, known online as <strong>JAKZY</strong>. I love software, web development, design and technology.</p>
              <p>I learn by building — taking an idea from a rough concept to something people can actually see, use and remember.</p>
              <button className="textbtn" onClick={copyName}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy my name'}</button>
            </div>
            <div className="manifesto card" onMouseMove={spot}>
              <div className="cardLabel">The JAKZY mindset</div>
              <div className="bigQuote">“Make it <span>useful.</span><br />Make it <span>beautiful.</span><br />Make it <span>yours.</span>”</div>
              <div className="tiny">Personal principles</div>
            </div>
          </div>
        </section>

        <section className="section reveal what">
          <div className="sectionHead"><p className="eyebrow">What I do</p><h2>Ideas deserve great execution.</h2></div>
          <div className="serviceGrid">
            {[[Globe2, 'Web Development', 'Fast, responsive websites with polished interfaces and purposeful motion.'],
            [Code2, 'Software Development', 'Useful applications and tools built around real problems and strong ideas.'],
            [Palette, 'UI / UX', 'Clean visual systems that make products feel intuitive, premium and alive.'],
            [Rocket, 'Creative Development', 'Experiments where motion, interaction, technology and design meet.']]
              .map(([Icon, title, desc]) => (
                <div className="service card" key={title} onMouseMove={spot}>
                  <Icon /><h3>{title}</h3><p>{desc}</p><span className="serviceArrow">↗</span>
                </div>
              ))}
          </div>
        </section>

        <section id="skills" className="section reveal">
          <div className="sectionHead"><p className="eyebrow">Skills</p><h2>My creative toolkit.</h2></div>
          <div className="skillWrap">
            <div className="skillIntro card" onMouseMove={spot}>
              <Zap size={20} />
              <h3>Always learning.</h3>
              <p>Technology changes fast. I keep experimenting, improving and adding new tools to the stack.</p>
              <div className="skillMeter"><span>Learning curve</span><b>∞</b><div><i /></div></div>
            </div>
            <div className="skillGroups">
              {['Development', 'Web', 'Design', 'Tools'].map(group => (
                <div className="skillGroup card" key={group} onMouseMove={spot}>
                  <h3>{group}</h3>
                  {skills.filter(s => s[1] === group).map(s => <div className="skill" key={s[0]}><span>{s[0]}</span><span>↗</span></div>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="sectionHead rowHead">
            <div><p className="eyebrow">Selected work</p><h2>Small projects.<br /><em>Big ambition.</em></h2></div>
            <div className="filters">{['All', 'Web', 'Creative'].map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
          </div>
          <div className="projectGrid">
            {filtered.map((p, i) => (
              <article className="project card" key={p.title} onMouseMove={spot}>
                <div className="projectVisual"><div className="projectScan" /><span>{p.title.split(' ').map(x => x[0]).join('')}</span><b>0{i + 1}</b></div>
                <div className="projectBody">
                  <div className="projectType">{p.type} / 2026</div>
                  <h3>{p.title}</h3><p>{p.desc}</p>
                  <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <button className="projectLink">Explore concept <ArrowUpRight size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="section reveal">
          <div className="sectionHead"><p className="eyebrow">Journey</p><h2>From curiosity<br /><em>to creation.</em></h2></div>
          <div className="timeline">
            <div className="timeItem"><b>2026</b><div><span className="timeNow">Now</span><h3>Building bigger experiences</h3><p>Creating complete digital products, refining design and becoming a stronger developer.</p></div></div>
            <div className="timeItem"><b>2025</b><div><h3>Web development &amp; programming</h3><p>Exploring development workflows, modern technologies and interface design.</p></div></div>
            <div className="timeItem"><b>2024</b><div><h3>The beginning</h3><p>Started exploring technology, programming and turning ideas into projects.</p></div></div>
          </div>
        </section>

        <section className="section stats reveal">
          <div className="stat card" onMouseMove={spot}><strong>10<span>+</span></strong><small>Projects</small></div>
          <div className="stat card" onMouseMove={spot}><strong>12<span>+</span></strong><small>Tools &amp; skills</small></div>
          <div className="stat card" onMouseMove={spot}><strong>∞</strong><small>Ideas</small></div>
          <div className="stat card" onMouseMove={spot}><strong>01</strong><small>Big goal</small></div>
        </section>

        <section className="section reveal">
          <div className="workCard card" onMouseMove={spot}>
            <div><p className="eyebrow">Currently building</p><h2>JAKZY Official</h2><p>A personal creative lab for websites, software, games and future digital products.</p></div>
            <div className="buildStatus"><div className="statusCircle"><Sparkles size={18} /></div><span>In progress</span><b>2026</b></div>
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contactInner">
            <div className="contactOrb"><div /></div>
            <p className="eyebrow">Contact</p>
            <h2>Have an idea?<br /><em>Let's make it real.</em></h2>
            <p className="contactLead">Follow the work, join the community or reach out online.</p>
            <div className="contactButtons">
              {socials.map(s => (
                <a className="socialButton" key={s.name} href={s.url} target="_blank" rel="noreferrer">
                  <span className="socialLogo"><Logo d={ICON[s.icon]} /></span>
                  <span className="socialText"><b>{s.name}</b><small>{s.handle}</small></span>
                  <ArrowUpRight size={16} className="socialGo" />
                </a>
              ))}
              <button className="socialButton" onClick={share}>
                <span className="socialLogo"><Share2 size={16} /></span>
                <span className="socialText"><b>Share profile</b><small>{copied ? 'Link copied' : 'Send this page'}</small></span>
                <ArrowUpRight size={16} className="socialGo" />
              </button>
              <a className="socialButton emailButton" href="mailto:jakzyjm@gmail.com">
                <span className="socialLogo"><Mail size={16} /></span>
                <span className="socialText"><b>Email me</b><small>jakzyjm@gmail.com</small></span>
                <ArrowUpRight size={16} className="socialGo" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><a className="brand" href="#home"><span>JAKZY</span><small>Vuthy Lyheng</small></a><p>Software Developer • Web Developer • Creative Creator</p></div>
        <div className="footerRight">
          <span>© 2026 JAKZY</span>
          {socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="footIcon"><Logo d={ICON[s.icon]} size={15} /></a>)}
          <a href="#home">Top ↑</a>
        </div>
      </footer>

      {showTop && <button className="top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ChevronDown size={17} style={{ transform: 'rotate(180deg)' }} /></button>}
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />);
