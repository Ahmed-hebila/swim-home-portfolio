/* ═══════════════════════════════════════════════
   SWIM HOME — 3D Water Animation Engine
   Bubbles · Tilt · Parallax · Waves · Ripples
   ═══════════════════════════════════════════════ */

/* ════ 0. SPLASH SCREEN DISMISS ════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hidden');
  }, 2400);
});

/* ════ 1. CLICK WATER RIPPLE ════ */
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'water-ripple-click';
  r.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 800);
});

/* ════ 2. 3D BUBBLE SYSTEM (REMOVED) ════ */

/* ════ 3. CANVAS PARTICLE SYSTEM (water particles) ════ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -Math.random() * 0.4 - 0.1; /* drift up slowly */
      this.a  = Math.random() * 0.4 + 0.08;
      this.hue = 185 + Math.random() * 20;   /* blue-cyan */
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -4) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue},80%,55%,${this.a})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < 100; i++) { const p = new Pt(); p.y = Math.random() * H; pts.push(p); }

  function loop() { ctx.clearRect(0,0,W,H); pts.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); }
  loop();
})();

/* ════ 4. RIPPLE CANVAS ════ */
(function initRipple() {
  const canvas = document.getElementById('ripple-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, drops = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Drop {
    constructor() { this.reset(); }
    reset() { this.x=Math.random()*W; this.y=Math.random()*H; this.r=0; this.max=60+Math.random()*80; this.speed=.3+Math.random()*.5; }
    update() { this.r+=this.speed; if(this.r>=this.max) this.reset(); }
    draw() {
      const a=(1-this.r/this.max)*0.45;
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,119,182,${a})`; ctx.lineWidth=1; ctx.stroke();
    }
  }
  for(let i=0;i<16;i++){const d=new Drop();d.r=Math.random()*d.max;drops.push(d);}
  function loop(){ctx.clearRect(0,0,W,H);drops.forEach(d=>{d.update();d.draw();});requestAnimationFrame(loop);}
  loop();
})();

/* ════ 5. HERO 3D PARALLAX ════ */
(function initParallax() {
  const hero    = document.getElementById('hero');
  const content = document.querySelector('.hero-content');
  const orb1    = document.querySelector('.orb-1');
  const orb2    = document.querySelector('.orb-2');
  const grid    = document.querySelector('.parallax-grid');
  if (!hero || !content) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const dx   = (e.clientX - rect.left  - rect.width /2) / (rect.width /2);
    const dy   = (e.clientY - rect.top   - rect.height/2) / (rect.height/2);
    content.style.transform = `translate3d(${dx*14}px,${dy*9}px,0) rotateX(${-dy*3.5}deg) rotateY(${dx*3.5}deg)`;
    content.style.transition = 'transform .05s';
    if (orb1) orb1.style.transform = `translate(${dx*35}px,${dy*22}px)`;
    if (orb2) orb2.style.transform = `translate(${-dx*22}px,${-dy*15}px)`;
    if (grid) grid.style.transform = `translate(${dx*10}px,${dy*6}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    content.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1)';
    content.style.transform  = '';
    if (orb1) orb1.style.transform = '';
    if (orb2) orb2.style.transform = '';
    if (grid) grid.style.transform = '';
  });
})();

/* ════ 6. NAVBAR scroll ════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  const btn = document.getElementById('scrollTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 500);
});

/* ════ 7. GSAP SCROLL REVEALS ════ */
gsap.registerPlugin(ScrollTrigger);

gsap.timeline({ defaults:{ ease:'power3.out' } });


gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity:0, y:48 },
    { opacity:1, y:0, duration:1, ease:'power3.out',
      delay:(i % 3) * 0.07,
      scrollTrigger:{ trigger:el, start:'top 88%', toggleActions:'play none none none' }
    }
  );
});

/* ════ 8. COUNTER ANIMATION ════ */
document.querySelectorAll('.stat-num').forEach(el => {
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const raw = el.textContent.trim();
    const num = parseInt(raw);
    if (isNaN(num)) return;
    /* preserve suffix like % or + */
    const sfx = raw.slice(String(num).length);
    let c = 0;
    const timer = setInterval(() => {
      c = Math.min(c + Math.ceil(num / 50), num);
      el.textContent = c + sfx;
      if (c >= num) clearInterval(timer);
    }, 28);
    entries[0].target._obs && entries[0].target._obs.disconnect();
  }, { threshold: 0.6 }).observe(el);
});

/* ════ 10. SECTION BLOB PARALLAX ════ */
window.addEventListener('scroll', () => {
  const sy = window.scrollY * 0.06;
  document.querySelectorAll('.mesh-blob-1').forEach(el => el.style.transform = `translateY(${sy}px)`);
  document.querySelectorAll('.mesh-blob-2').forEach(el => el.style.transform = `translateY(${-sy*.7}px)`);
}, { passive:true });
