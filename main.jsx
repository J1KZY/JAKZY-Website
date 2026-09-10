import React, {useEffect, useMemo, useState} from "react";
import { createRoot } from "react-dom/client";
import {
  Moon, Sun, Menu, X, ArrowUpRight, Copy, Check, Share2,
  MapPin, Code2, Palette, Globe2, Rocket,
  ChevronDown
} from "lucide-react";
import "./styles.css";

const socials = [
  {name:"Facebook", url:"https://www.facebook.com/j1kzy"},
  {name:"YouTube", url:"https://www.youtube.com/@JAKZY_co"},
  {name:"Discord", url:"https://discord.gg/bCVVJ7xX8h"}
];

const skills = [
  ["JavaScript","Development"],["TypeScript","Development"],["Python","Development"],
  ["C++","Development"],["React","Web"],["HTML / CSS","Web"],
  ["UI / UX","Design"],["Figma","Design"],["VS Code","Tools"],["Git / GitHub","Tools"],
  ["Microsoft Office","Tools"],["Responsive Design","Web"]
];

const projects = [
  {title:"COMMING SOON!",type:"Web",desc:"COMMING SOON!",tags:["React","UI/UX"]},
  {title:"COMMING SOON!",type:"Web",desc:"COMMING SOON!",tags:["React","CSS"]},
  {title:"COMMING SOON!",type:"Creative",desc:"COMMING SOON!",tags:["Design","Development"]}
];

function App(){
 const [dark,setDark]=useState(true);
 const [menu,setMenu]=useState(false);
 const [filter,setFilter]=useState("All");
 const [copied,setCopied]=useState(false);
 const [showTop,setShowTop]=useState(false);

 useEffect(()=>{
   document.documentElement.dataset.theme=dark?"dark":"light";
   const onScroll=()=>setShowTop(window.scrollY>600);
   window.addEventListener("scroll",onScroll);
   return()=>window.removeEventListener("scroll",onScroll);
 },[dark]);

 const filtered=useMemo(()=>filter==="All"?projects:projects.filter(p=>p.type===filter),[filter]);

 const copyName=async()=>{
   try{await navigator.clipboard.writeText("Vuthy Lyheng");setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}
 };
 const share=async()=>{
   const data={title:"JAKZY — Vuthy Lyheng",text:"Check out JAKZY's professional portfolio.",url:location.href};
   if(navigator.share) await navigator.share(data); else {await navigator.clipboard.writeText(location.href);alert("Profile link copied!")}
 };

 return <div className="site">
   <header className="nav">
    <a className="brand" href="#home" onClick={()=>setMenu(false)}>
      <span>JAKZY</span><small>Vuthy Lyheng</small>
    </a>
    <nav className={menu?"navlinks open":"navlinks"}>
      {["Home","About","Skills","Projects","Journey","Contact"].map(x=><a key={x} href={"#"+x.toLowerCase()} onClick={()=>setMenu(false)}>{x}</a>)}
    </nav>
    <div className="navactions">
      <button className="iconbtn" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
      <button className="menubtn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </div>
   </header>

   <main>
    <section id="home" className="hero section">
      <div className="heroGlow"/>
      <div className="heroText">
        <p className="eyebrow">HELLO, I'M</p>
        <h1>JAKZY<span>.</span></h1>
        <h2>Vuthy Lyheng</h2>
        <p className="role">Software Developer <i>•</i> Web Developer <i>•</i> Creative Creator</p>
        <p className="lead">I build websites, software and digital experiences with a focus on clean design, useful ideas and continuous learning.</p>
        <div className="buttons">
          <a className="primary" href="#projects">View My Work <ArrowUpRight size={17}/></a>
          <a className="secondary" href="#contact">Contact Me</a>
        </div>
        <div className="meta"><span><MapPin size={15}/> Cambodia</span><span className="dot"/> <span className="available"><b/> Available for projects</span></div>
      </div>
      <div className="profileCard">
        <div className="avatar">J</div>
        <div className="cardName">JAKZY</div>
        <div className="cardReal">Vuthy Lyheng</div>
        <div className="miniLine"/>
        <div className="cardRole">Developer & Creator</div>
        <div className="socialRow">{socials.map(s=><a key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>)}</div>
      </div>
    </section>

    <section id="about" className="section">
      <div className="sectionHead"><p className="eyebrow">01 — ABOUT</p><h2>More than just code.</h2></div>
      <div className="aboutGrid">
        <div className="aboutText"><p>I'm <strong>Vuthy Lyheng</strong>, known online as <strong>JAKZY</strong>. I'm interested in software development, web development, design and technology.</p><p>I enjoy turning ideas into real digital projects and improving my skills by building, experimenting and learning.</p><button className="textbtn" onClick={copyName}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?"Copied":"Copy my name"}</button></div>
        <div className="goals card"><span className="cardLabel">CURRENT GOALS</span><div className="goal"><span>01</span> Become a stronger developer</div><div className="goal"><span>02</span> Build useful digital products</div><div className="goal"><span>03</span> Keep learning new technology</div></div>
      </div>
    </section>

    <section className="section what">
      <div className="sectionHead"><p className="eyebrow">02 — WHAT I DO</p><h2>Building ideas into experiences.</h2></div>
      <div className="serviceGrid">
       <div className="service card"><Globe2/><h3>Web Development</h3><p>Modern, responsive websites with clean interfaces and smooth interactions.</p></div>
       <div className="service card"><Code2/><h3>Software Development</h3><p>Useful applications and tools designed around real problems and ideas.</p></div>
       <div className="service card"><Palette/><h3>UI / UX</h3><p>Simple, clear interfaces that feel polished without unnecessary complexity.</p></div>
       <div className="service card"><Rocket/><h3>Creative Development</h3><p>Interactive concepts that combine technology, design and creativity.</p></div>
      </div>
    </section>

    <section id="skills" className="section">
      <div className="sectionHead"><p className="eyebrow">03 — SKILLS</p><h2>Tools I use to create.</h2></div>
      <div className="skillGroups">
       {["Development","Web","Design","Tools"].map(group=><div className="skillGroup card" key={group}><h3>{group}</h3>{skills.filter(s=>s[1]===group).map(s=><div className="skill" key={s[0]}><span>{s[0]}</span><span>↗</span></div>)}</div>)}
      </div>
    </section>

    <section id="projects" className="section">
      <div className="sectionHead rowHead"><div><p className="eyebrow">04 — SELECTED WORK</p><h2>Projects I'm proud of.</h2></div><div className="filters">{["All","Web","Creative"].map(f=><button className={filter===f?"active":""} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>
      <div className="projectGrid">{filtered.map((p,i)=><article className="project card" key={p.title}><div className="projectNo">0{i+1}</div><div className="projectVisual"><span>{p.title.split(" ").map(x=>x[0]).join("")}</span></div><div className="projectBody"><div className="projectType">{p.type}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><button className="projectLink">View project <ArrowUpRight size={16}/></button></div></article>)}</div>
    </section>

    <section id="journey" className="section">
      <div className="sectionHead"><p className="eyebrow">05 — MY JOURNEY</p><h2>Always moving forward.</h2></div>
      <div className="timeline">
       <div className="timeItem"><b>2026</b><div><h3>Building & improving projects</h3><p>Creating more complete digital experiences and growing as a developer.</p></div></div>
       <div className="timeItem"><b>2025</b><div><h3>Web development & programming</h3><p>Exploring development workflows, modern web technologies and UI design.</p></div></div>
       <div className="timeItem"><b>2024</b><div><h3>Started exploring technology</h3><p>Beginning the journey of learning development and turning ideas into projects.</p></div></div>
      </div>
    </section>

    <section className="section stats"><div className="stat card"><strong>10+</strong><span>Projects</span></div><div className="stat card"><strong>10+</strong><span>Technologies</span></div><div className="stat card"><strong>∞</strong><span>Ideas</span></div><div className="stat card"><strong>01</strong><span>Big Goal</span></div></section>

    <section className="section working"><div className="workCard card"><div><p className="eyebrow">CURRENTLY WORKING ON</p><h2>Personal projects</h2><p>Improving my development skills and building better digital experiences.</p></div><div className="progress"><div className="progressTop"><span>Progress</span><b>80%</b></div><div className="bar"><i/></div></div></div></section>

    <section id="contact" className="section contact"><div className="contactInner"><p className="eyebrow">06 — CONTACT</p><h2>Let's build something<br/><em>great.</em></h2><p className="contactLead">Have an idea, project or just want to connect? Find me online.</p><div className="contactButtons">{socials.map(s=><a className="socialButton" key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name}<ArrowUpRight size={17}/></a>)}<button className="socialButton" onClick={share}>Share Profile<Share2 size={17}/></button></div></div></section>
   </main>

   <footer><div><a className="brand" href="#home"><span>JAKZY</span><small>Vuthy Lyheng</small></a><p>Software Developer • Web Developer • Creative Creator</p></div><div className="footerRight"><span>© 2026 JAKZY</span><a href="#home">Back to top ↑</a></div></footer>
   {showTop&&<button className="top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><ChevronDown size={18} style={{transform:"rotate(180deg)"}}/></button>}
 </div>
}

createRoot(document.getElementById("root")).render(<App/>);
