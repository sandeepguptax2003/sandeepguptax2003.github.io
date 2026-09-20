import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import personalImg from '@assets/My-Personal-Image_1771954928164.png';
import minecraftImg from '@assets/MineCraft-Personal-Image_1772205847377.png';
import bookishImg from '@assets/Bookish_treasure_1771954928160.png';
import chatmateImg from '@assets/ChatMate_1771954928161.png';
import healthImg from '@assets/healthconnect+_1771954928162.png';
import jungleImg from '@assets/junglebuy_1771954928163.png';
import salongoImg from '@assets/salongo-hero_1.jpg';
import awsLogo from '@assets/aws logo.svg';

gsap.registerPlugin(ScrollTrigger);

const HERO_TITLES = ['Developer 💻', 'Gamer 🎮', 'Adventurer 🏔️', 'Tech Enthusiast ⚡', 'AI Expert 🤖', 'Creator 🚀', 'Problem Solver 🧩', 'Builder 🔨'];

const SKILLS = {
  ai: { title: 'AI & LLM Engineering', icon: '🤖', items: ['OpenAI API', 'Anthropic Claude', 'Google Gemini', 'AWS Bedrock', 'Prompt Engineering', 'RAG', 'AI Agents', 'Function Calling', 'Embeddings', 'Pinecone', 'Vector Databases'] },
  backend: { title: 'Backend Architecture', icon: '🔧', items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'System Design', 'API Security', 'JWT', 'Rate Limiting', 'WebSockets', 'Caching'] },
  frontend: { title: 'Frontend Development', icon: '⚡', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'] },
  databases: { title: 'Databases & Search', icon: '🗄️', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB', 'Firestore', 'Redis', 'Elasticsearch', 'Algolia'] },
  cloud: { title: 'Cloud & DevOps', icon: '☁️', items: ['AWS (S3, DynamoDB, SES, Bedrock)', 'Google Cloud', 'Firebase', 'Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'Render', 'Serverless'] },
  integration: { title: 'Mobile & Integrations', icon: '🔗', items: ['React Native', 'Google Maps API', 'Razorpay', 'Stripe', 'Twilio', 'WhatsApp API', 'Slack API', 'Nodemailer', 'Chrome Extensions', 'Media Processing'] },
};

const PROJECTS = [
  { title: 'Bookish Treasure', img: bookishImg, points: ['📚 Full-stack book marketplace powered by React, Redux & MongoDB', '🔍 Advanced search engine with categories, filters & secure JWT auth', '🛒 Shopping cart with real-time inventory & checkout flow'], live: 'https://bookish-treasure.netlify.app/', code: 'https://github.com/sandeepguptax2003/Bookish-Treasures', tech: ['React', 'Redux', 'Node.js', 'MongoDB'] },
  { title: 'Health Connect +', img: healthImg, points: ['🏥 AI-ready healthcare platform with smart appointment booking', '👨‍⚕️ Professional directory with search & responsive medical UI', '📊 Health management dashboard with real-time data sync'], live: 'https://healthconnectpluse.netlify.app/', code: 'https://github.com/omkar231098/rough-support-2269', tech: ['React', 'Node.js', 'Express'] },
  { title: 'Chat Mate', img: chatmateImg, points: ['💬 Real-time chat engine powered by WebSocket connections', '🏠 Dynamic room creation with participant tracking', '⚡ Instant messaging with typing indicators & online status'], live: 'https://merry-starburst-7c9544.netlify.app/', code: 'https://github.com/sandeepguptax2003/deafening-cable-214', tech: ['WebSockets', 'React', 'Node.js'] },
  { title: 'Jungle Buy', img: jungleImg, points: ['🛍️ Amazon-scale e-commerce clone with product categories', '🔎 Full search engine, cart & secure user authentication', '🔥 Firebase-powered backend with real-time state management'], live: 'https://jungle-buy-amazon-clone.vercel.app/', code: 'https://github.com/V-sukumar/agreeable-transport-9100', tech: ['React', 'Redux', 'Firebase'] },
];

interface BuildingProject {
  title: string;
  subtitle: string;
  img?: string;
  gradient: string;
  emoji: string;
  points: string[];
  tech: string[];
  status: 'LIVE' | 'SHIPPED' | 'FORGING';
  live?: string;
  code?: string;
}

const BUILDING_PROJECTS: BuildingProject[] = [
  { title: 'SalonGo', subtitle: '✂️ 3-Sided Salon Booking Marketplace', img: salongoImg, gradient: 'linear-gradient(135deg, #2a1a0a 0%, #0d1b2a 50%, #1a2a1a 100%)', emoji: '✂️', points: ['🏗️ Co-founded & built the full platform — customer, partner & admin apps with a single Node.js API', '📅 Real-time salon discovery, instant booking, reschedule flows & verified reviews', '💳 Razorpay payments, partner wallets, cron-based settlements & PDF/QR invoicing', '📲 WhatsApp notifications (MSG91), coupon engine & fuzzy search', '🛡️ Hardened API — Helmet, sanitization, XSS protection, HPP & tiered rate limiting'], tech: ['Node.js', 'Express', 'Firebase', 'Firestore', 'Next.js', 'Razorpay', 'WhatsApp API'], status: 'LIVE', live: 'https://mysalongo.in' },
  { title: 'Cortex AI', subtitle: '🧠 AI-Powered Meeting Intelligence Platform', gradient: 'linear-gradient(135deg, #1a1a33 0%, #0a1628 50%, #2a1a0a 100%)', emoji: '🧠', points: ['🎙️ Joins meetings via a Chrome Extension — captures live captions with optimized streaming & dedup', '🎫 Real-time AI action-item extraction from Zoom, Google Meet & Microsoft Teams', '🤖 AI chatbot with command execution for ticket creation, summaries & workflow automation', '🗄️ Scalable backend — single-table DynamoDB design, real-time processing, AWS deployment', '🏆 AWS 10,000 AIdeas 2025 Semifinalist'], tech: ['Claude', 'Node.js', 'Next.js', 'DynamoDB', 'AWS S3', 'AWS SES', 'Slack API'], status: 'SHIPPED', code: 'https://github.com/sandeepguptax2003/Cortex-AI-Backend' },
  { title: 'Matguns', subtitle: '🎮 Android & iOS Esports Tournament App', gradient: 'linear-gradient(135deg, #0a2e1a 0%, #0d1b2a 50%, #1a2a1a 100%)', emoji: '🎮', points: ['📱 Native Android & iOS app (React Native) for competitive BGMI, Valorant & Free Fire tournaments', '🏆 Real-money, skill-based tournaments with instant Razorpay withdrawals', '👥 Community hub — leaderboards, rankings, team matchmaking & live brackets', '🛡️ Anti-cheat verified, fully secure & fair competitive ecosystem'], tech: ['React Native', 'Firebase', 'Razorpay', 'React Navigation'], status: 'FORGING' },
  { title: 'Lead Shera', subtitle: '🎯 LinkedIn Outreach & Lead-Gen Automation', gradient: 'linear-gradient(135deg, #1a0533 0%, #0d1b2a 50%, #1b2838 100%)', emoji: '🎯', points: ['🤖 Automates LinkedIn lead generation with Playwright-driven scraping & Unipile integration', '✉️ AI-generated, sequenced outreach messaging with a smart follow-up queue', '📊 Campaign dashboard for tracking replies, connections & pipeline health'], tech: ['Node.js', 'Playwright', 'OpenAI API', 'Unipile', 'Firestore'], status: 'FORGING' },
  { title: 'BillFlow', subtitle: '💰 AI-Powered Billing & Cost Intelligence Platform', gradient: 'linear-gradient(135deg, #2a1a0a 0%, #1a0533 50%, #0d1b2a 100%)', emoji: '💰', points: ['📊 Unified billing dashboard — manage all subscriptions & invoices in one place in real-time', '🤖 AI-powered cost advisor with personalized recommendations to reduce spending', '💡 AI insights on cost-cutting strategies across cloud, SaaS & utility bills'], tech: ['Next.js', 'React', 'Framer Motion', 'Recharts', 'Zustand', 'Tailwind CSS'], status: 'FORGING' },
];

const CERTIFICATIONS = [
  { title: 'AWS 10,000 AIdeas Competition 2025 - Semifinalist', org: 'AWS', link: 'https://builder.aws.com/content/3B84yzRMPmtfrqTZ1WpfN50Jitg/aideas-cortex-ai-the-ai-powered-meeting-intelligence-platform', iconSrc: awsLogo, iconAlt: 'AWS logo' },
  { title: 'Prompt Engineering', org: 'Masai School', link: 'https://drive.google.com/file/d/1LeBFUvFT2KbHcoRtang5YmqwfV6fWzKf/view?usp=sharing', icon: '🤖' },
  { title: 'Assessment Assistantship Program', org: 'Masai School', link: 'https://drive.google.com/file/d/1lRVc91h7LIjLEp5T9wa5Qqrglm_SwepE/view?usp=sharing', icon: '🎓' },
];

const EXPERIENCE = [
  { title: 'Full Stack Developer — Zappio (AI Voice Platform)', company: 'Acredge Landworks Pvt Ltd', location: 'Remote', date: 'May 2026 - Present', icon: '📞', points: ['⚡ Sole engineer on Zappio, an AI voice-calling platform now handling 1,000+ automated calls daily for 15+ business clients', '🎙️ Built the real-time voice pipeline — telephony streaming (Exotel, Plivo), streaming STT/TTS, and an LLM conversation engine with sub-second barge-in', '🏢 Designed multi-tenant architecture — orgs, RBAC, credit billing, a campaign auto-dialer, and a drag-and-drop call-flow builder', '🚀 Shipped WhatsApp Business automation; deployed on Google Cloud Run with Docker & CI/CD at 99.9% uptime'] },
  { title: 'Software Development Engineer 1', company: 'Acredge Landworks Pvt Ltd', location: 'Remote', date: 'April 2025 - May 2026', icon: '🚀', points: ['⚡ Architected and owned the entire real-estate marketplace backend from scratch as the sole engineer — 200+ REST endpoints, 10,000+ property listings', '🤖 Built AI-powered property search with the OpenAI API and vector search (Pinecone), plus a recommendation engine', '⚙️ Cut API response times ~40% with multi-tier Redis caching; secured the platform with JWT, rate limiting, and input sanitization', '🗺️ Integrated Google Maps API, Firebase Authentication, and Razorpay/Cashfree payments; owned deployment end to end'] },
  { title: 'CTO & Co-Founder', company: 'SalonGo', location: 'mysalongo.in', date: '2025 - Present', icon: '✂️', points: ['🏗️ Built a 3-sided salon-booking marketplace (customer, partner, admin) solo, end to end, with Node.js, Firebase/Firestore & Next.js', '💳 Shipped Razorpay payments, WhatsApp notifications, cron settlements, PDF/QR invoicing', '🛡️ Hardened the API with Helmet, mongo-sanitize, XSS protection, HPP & tiered rate limiting'] },
  { title: 'Backend Development Intern', company: 'Acredge Landworks Pvt Ltd', location: 'Remote', date: 'October 2024 - March 2025', icon: '💡', points: ['🔧 Built independent backend APIs and data workflows with cleaner, faster request handling', '⚡ Improved reliability by refining validation, response handling, and authentication flows', '🚀 Delivered feature modules end to end — development, testing, and deployment cycles'] },
];

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimClass('rc-out');
      setTimeout(() => {
        setIndex(prev => (prev + 1) % HERO_TITLES.length);
        setAnimClass('rc-in');
        setTimeout(() => setAnimClass(''), 500);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`role-cycler ${animClass}`} data-testid="role-cycler">
      {HERO_TITLES[index]}
    </span>
  );
}

function MinecraftScene({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || (parent ? parent.clientWidth : 300);
    const H = rect.height || (parent ? parent.clientHeight - 30 : 346);
    canvas.width = W;
    canvas.height = H;
    const scale = W / 300;

    let frame = 0;
    const bs = Math.round(18 * scale);
    const cols = Math.ceil(W / bs);
    const colors = ['#4ade80', '#8b6914', '#6b7280', '#3b82f6', '#ef4444', '#a855f7', '#f59e0b', '#c27828'];
    const placedBlocks: { x: number; y: number; color: string }[] = [];

    for (let x = 0; x < cols; x++) {
      placedBlocks.push({ x: x * bs, y: H - bs, color: '#4ade80' });
      placedBlocks.push({ x: x * bs, y: H - bs * 2, color: '#8b6914' });
      placedBlocks.push({ x: x * bs, y: H - bs * 3, color: '#6b5e50' });
    }

    let bx = W * 0.35;
    let bDir = 1;
    let buildTimer = 0;

    const stars = Array.from({ length: 35 }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.6,
      s: Math.random() * 2 + 0.5, tw: Math.random() * Math.PI * 2
    }));

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    const drawBlock = (x: number, y: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, bs - 1, bs - 1);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(x, y, bs - 1, 2);
      ctx.fillRect(x, y, 2, bs - 1);
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(x + bs - 3, y, 2, bs - 1);
      ctx.fillRect(x, y + bs - 3, bs - 1, 2);
    };

    const loop = () => {
      frame++;
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#050010');
      sky.addColorStop(0.5, '#0a0820');
      sky.addColorStop(1, '#0d1a0d');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const a = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.02 + s.tw));
        ctx.fillStyle = `rgba(255,255,220,${a})`;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      });

      placedBlocks.forEach(b => drawBlock(b.x, b.y, b.color));

      bx += bDir * 0.6 * scale;
      if (bx > W - 50 * scale || bx < 30 * scale) bDir *= -1;
      const by = H - bs * 4 - 10;
      ctx.fillStyle = '#e8a84c';
      ctx.fillRect(bx - 4, by, 8, 8);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(bx - 5, by + 8, 10, 10);
      ctx.fillStyle = '#8b6914';
      ctx.fillRect(bx - 5, by + 18, 4, 6);
      ctx.fillRect(bx + 1, by + 18, 4, 6);
      ctx.fillStyle = '#111';
      ctx.fillRect(bx - 2, by + 3, 2, 2);
      ctx.fillRect(bx + 1, by + 3, 2, 2);
      const armY = Math.sin(frame * 0.12) * 3;
      ctx.fillStyle = '#e8a84c';
      ctx.fillRect(bx + (bDir > 0 ? 5 : -8), by + 9 + armY, 3, 7);
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(bx + (bDir > 0 ? 8 : -11), by + 5 + armY, 3, 6);

      buildTimer++;
      if (buildTimer > 60) {
        buildTimer = 0;
        const col = Math.floor(Math.random() * (cols - 4)) + 2;
        const maxY = H - bs * 3;
        let topY = maxY;
        placedBlocks.forEach(b => {
          if (b.x === col * bs && b.y < topY) topY = b.y;
        });
        const newY = topY - bs;
        if (newY > H * 0.45) {
          const c = colors[Math.floor(Math.random() * colors.length)];
          placedBlocks.push({ x: col * bs, y: newY, color: c });
          for (let p = 0; p < 6; p++) {
            particles.push({
              x: col * bs + bs / 2, y: newY,
              vx: (Math.random() - 0.5) * 3, vy: -Math.random() * 2,
              life: 20 + Math.random() * 15, color: c
            });
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = '#4ade80';
      ctx.font = `600 ${Math.round(10 * scale)}px "JetBrains Mono", monospace`;
      ctx.fillText('⛏ BUILDING...', 10 * scale, 18 * scale);
      ctx.fillStyle = '#5a4d3e';
      ctx.font = `${Math.round(8 * scale)}px "JetBrains Mono", monospace`;
      ctx.fillText('HOVER TO BUILD', W * 0.3, H - 5);

      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [active]);

  return <canvas ref={canvasRef} className="mini-game-canvas" />;
}

function ProfileCard3D() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="profile-card-scene" data-testid="profile-card-3d"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`profile-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="profile-card-front">
          <div className="profile-glow" />
          <div className="danger-zone-label" data-testid="text-danger-hover">
            <span className="danger-icon">⚠️</span>
            <span>DON'T HOVER</span>
            <span className="danger-icon">⚠️</span>
          </div>
          <img src={minecraftImg} alt="Sandeep Gupta" className="profile-img" data-testid="img-profile" />
          <div className="profile-scan-line" />
          <div className="profile-hud-corners">
            <span /><span /><span /><span />
          </div>
          <div className="profile-label">
            <span className="profile-status">🟢 ONLINE</span>
          </div>
        </div>
        <div className="profile-card-back">
          <MinecraftScene active={flipped} />
          <div className="game-label">🎮 HOVER TO BUILD</div>
        </div>
      </div>
    </div>
  );
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    interface Star {
      x: number; y: number; z: number; s: number;
      baseX: number; baseY: number;
      drift: number; twinkleSpeed: number; twinkleOffset: number;
      hue: number;
    }

    interface ShootingStar {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
    }

    const layers = [
      { stars: [] as Star[], speed: 0.15, count: 200, maxSize: 1.2, opacity: 0.3, parallax: 12 },
      { stars: [] as Star[], speed: 0.45, count: 120, maxSize: 2.0, opacity: 0.5, parallax: 30 },
      { stars: [] as Star[], speed: 1.0, count: 50, maxSize: 3.0, opacity: 0.75, parallax: 55 },
    ];

    const nebulae = Array.from({ length: 8 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 300 + 150,
      hue: [25, 30, 260, 280, 200, 320, 340, 40][Math.floor(Math.random() * 8)],
      opacity: Math.random() * 0.04 + 0.01,
      drift: Math.random() * 0.0003 + 0.0001,
    }));

    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      canvas.width = Math.max(window.innerWidth, 1);
      canvas.height = Math.max(document.documentElement.scrollHeight, 1);
      layers.forEach(l => {
        l.stars = Array.from({ length: l.count }, () => {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          return {
            x, y, baseX: x, baseY: y,
            z: Math.random(),
            s: Math.random() * l.maxSize + 0.5,
            drift: Math.random() * 0.6 + 0.25,
            twinkleSpeed: Math.random() * 0.025 + 0.008,
            twinkleOffset: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 220 : 280) : 30,
          };
        });
      });
    };
    resize();
    window.addEventListener('resize', resize);

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = () => {
      time += 0.016;
      if (canvas.width < 1 || canvas.height < 1) {
        animId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nebulae.forEach(n => {
        const nx = (n.x + Math.sin(time * n.drift * 10) * 0.03) * canvas.width;
        const ny = ((n.y * canvas.height) + scrollY * 0.05) % canvas.height;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        grad.addColorStop(0, `hsla(${n.hue}, 70%, 25%, ${n.opacity})`);
        grad.addColorStop(0.5, `hsla(${n.hue}, 50%, 20%, ${n.opacity * 0.4})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(nx - n.radius, ny - n.radius, n.radius * 2, n.radius * 2);
      });

      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          vx: (Math.random() - 0.3) * 14,
          vy: Math.random() * 7 + 3,
          life: 0,
          maxLife: 35 + Math.random() * 25,
          size: Math.random() * 1.5 + 0.5,
        });
      }

      shootingStars = shootingStars.filter(ss => {
        ss.x += ss.vx; ss.y += ss.vy; ss.life++;
        const alpha = 1 - ss.life / ss.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#e8a84c';
        ctx.lineWidth = ss.size;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
        ctx.stroke();
        ctx.restore();
        return ss.life < ss.maxLife;
      });

      const mxOff = (mouseX - 0.5) * 2;
      const myOff = (mouseY - 0.5) * 2;

      layers.forEach(layer => {
        layer.stars.forEach(star => {
          const parallaxX = mxOff * layer.parallax;
          const parallaxY = myOff * layer.parallax * 0.5;
          const driftX = Math.sin(time * star.drift + star.twinkleOffset) * 1.2;
          const driftY = Math.cos(time * star.drift * 0.7 + star.twinkleOffset) * 0.8;

          const x = star.baseX + parallaxX + driftX;
          const y = ((star.baseY + scrollY * layer.speed + parallaxY + driftY) % canvas.height + canvas.height) % canvas.height;

          const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
          const alpha = layer.opacity * (0.4 + 0.6 * twinkle);
          const size = star.s * (0.8 + 0.2 * twinkle);

          const isColorful = star.hue !== 30;
          const r = isColorful ? (star.hue === 220 ? 100 : 180) : 194;
          const g = isColorful ? (star.hue === 220 ? 140 : 100) : 120;
          const b = isColorful ? (star.hue === 220 ? 220 : 220) : 40;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();

          if (size > 1.5) {
            ctx.beginPath();
            ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`;
            ctx.fill();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" />;
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress-track" data-testid="scroll-progress">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}

function HUDNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY + 200;
      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(el.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'home', label: '🏠 HOME' },
    { id: 'about', label: '🧠 ABOUT' },
    { id: 'experience', label: '⚡ EXP' },
    { id: 'skills', label: '⚔️ SKILLS' },
    { id: 'projects', label: '🎯 WORKS' },
    { id: 'certifications', label: '🏆 CERTS' },
    { id: 'contact', label: '📡 CONTACT' },
  ];

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className="hud-nav" data-testid="hud-nav">
      <div className="hud-logo" onClick={() => scrollTo('home')} data-testid="link-home-logo">
        <span className="hud-logo-bracket">[</span>SG<span className="hud-logo-bracket">]</span>
      </div>
      <div className="hud-nav-items">
        {items.map(item => (
          <button
            key={item.id}
            className={`hud-nav-item ${activeSection === item.id ? 'hud-active' : ''}`}
            onClick={() => scrollTo(item.id)}
            data-testid={`nav-${item.id}`}
          >
            <span className="hud-dot" />
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function TypeWriter({ text, delay = 50, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [started, text, delay]);

  return <span ref={ref} className={className}>{displayed}<span className="cursor-blink">|</span></span>;
}

function useParallax() {
  useEffect(() => {
    const sections = document.querySelectorAll('.cin-section');

    sections.forEach((section) => {
      const els = section.querySelectorAll('.parallax-up, .parallax-left, .parallax-right, .parallax-scale, .parallax-rotate');
      els.forEach((el) => {
        const htmlEl = el as HTMLElement;
        let from: gsap.TweenVars = { opacity: 0 };
        let to: gsap.TweenVars = { opacity: 1, duration: 1.2, ease: 'power3.out' };

        if (el.classList.contains('parallax-up')) {
          from.y = 80; to.y = 0;
        } else if (el.classList.contains('parallax-left')) {
          from.x = -100; to.x = 0;
        } else if (el.classList.contains('parallax-right')) {
          from.x = 100; to.x = 0;
        } else if (el.classList.contains('parallax-scale')) {
          from.scale = 0.8; to.scale = 1;
        } else if (el.classList.contains('parallax-rotate')) {
          from.rotateY = -15; from.scale = 0.9; to.rotateY = 0; to.scale = 1;
        }

        gsap.fromTo(htmlEl, from, {
          ...to,
          scrollTrigger: {
            trigger: htmlEl,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.8,
          },
        });
      });

      const staggerEls = section.querySelectorAll('.stagger-in');
      if (staggerEls.length > 0) {
        gsap.fromTo(staggerEls, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
}

export default function Portfolio() {
  useParallax();

  return (
    <div className="portfolio-immersive" data-testid="portfolio-container">
      <StarField />
      <ScrollProgress />
      <HUDNav />

      <section id="home" className="cin-section hero-cin" data-testid="section-home">
        <div className="hero-depth-layer hero-depth-1" />
        <div className="hero-depth-layer hero-depth-2" />
        <div className="hero-content-wrap">
          <div className="hero-text-side parallax-left">
            <div className="hero-tag">&#123; <RoleCycler /> &#125;</div>
            <h1 className="hero-glitch-name" data-testid="text-hero-name">
              <TypeWriter text="SANDEEP GUPTA" delay={80} />
            </h1>
            <p className="hero-role-line">
              <span className="role-chip">⚡ Backend Developer</span>
              <span className="role-chip">🚀 Full Stack Developer</span>
              <span className="role-chip">🤖 AI / LLM Engineer</span>
              <span className="role-chip">🛡️ API Architect</span>
            </p>
            <p className="hero-desc-cin">
              🚀 2.5+ years engineering production-grade systems from zero to deployment. LLM-powered backends (OpenAI · Claude · Gemini), RAG search, bulletproof APIs, and architecture that scales across cloud, mobile & web.
            </p>
            <div className="hero-actions">
              <a href="/Sandeep-Gupta-Resume.pdf" download="Sandeep-Gupta-Resume.pdf" className="cin-btn cin-btn-primary" data-testid="button-download-cv">
                <span className="cin-btn-glint" />
                📄 DOWNLOAD RESUME
              </a>
              <a href="#about" className="cin-btn cin-btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} data-testid="button-about">
                🔍 EXPLORE
              </a>
            </div>
            <div className="hero-social-row">
              <a href="https://github.com/sandeepguptax2003" target="_blank" rel="noopener noreferrer" className="cin-social" data-testid="link-github">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/sandeep-gupta-a1b679263/" target="_blank" rel="noopener noreferrer" className="cin-social" data-testid="link-linkedin">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div className="hero-card-side parallax-right">
            <ProfileCard3D />
          </div>
        </div>
        <div className="scroll-cue" data-testid="scroll-indicator">
          <div className="scroll-cue-line" />
          <span>⬇️ SCROLL TO EXPLORE</span>
        </div>
      </section>

      <section id="about" className="cin-section" data-testid="section-about">
        <div className="section-header parallax-up">
          <span className="section-tag">// 🧠 ABOUT</span>
          <h2 className="section-cin-title">Who I Am</h2>
        </div>
        <div className="about-immersive">
          <div className="about-visual parallax-scale">
            <div className="about-img-cin-wrap">
              <img src={personalImg} alt="Sandeep Gupta" className="about-img-cin" data-testid="img-about" />
              <div className="about-img-frame" />
            </div>
          </div>
          <div className="about-text-side parallax-right">
            <div className="about-metrics">
              <div className="metric-card stagger-in" data-testid="stat-experience">
                <span className="metric-value">2.5+</span>
                <span className="metric-label">⏱️ YEARS EXP</span>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '55%' }} /></div>
              </div>
              <div className="metric-card stagger-in" data-testid="stat-projects">
                <span className="metric-value">46+</span>
                <span className="metric-label">🚀 PROJECTS</span>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '85%' }} /></div>
              </div>
            </div>
            <p className="about-cin-desc stagger-in" data-testid="text-about-desc">
              🧠 Backend-focused Full Stack Developer with 2.5+ years shipping production systems solo, end to end — architecture, code, deployment, and real users. Currently building Zappio, an AI voice-calling platform handling 1,000+ calls daily for 15+ business clients, alongside a real-estate marketplace backend serving 10,000+ property listings. CTO & Co-Founder of SalonGo (live at mysalongo.in). From Chrome extensions to serverless cloud platforms — I ship software that scales. ⚡
            </p>
            <a href="/Sandeep-Gupta-Resume.pdf" target="_blank" className="cin-btn cin-btn-primary stagger-in" data-testid="button-view-cv">
              <span className="cin-btn-glint" />📄 VIEW RESUME
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="cin-section" data-testid="section-experience">
        <div className="section-header parallax-up">
          <span className="section-tag">// ⚡ EXPERIENCE</span>
          <h2 className="section-cin-title">⚔️ Battle Log</h2>
        </div>
        <div className="exp-timeline">
          {EXPERIENCE.map((exp, i) => (
            <div className="exp-node stagger-in" key={i} data-testid={`card-experience-${i}`}>
              <div className="exp-node-dot" />
              <div className="exp-node-card">
                <div className="exp-node-header">
                  <h3 className="exp-node-title">{exp.icon} {exp.title}</h3>
                  <span className="exp-node-date">{exp.date}</span>
                </div>
                <span className="exp-node-company">🏢 {exp.company} — {exp.location}</span>
                <ul className="exp-node-list">
                  {exp.points.map((p, j) => (
                    <li key={j}><span className="exp-check">▹</span> {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="cin-section" data-testid="section-skills">
        <div className="section-header parallax-up">
          <span className="section-tag">// ⚔️ SKILLS</span>
          <h2 className="section-cin-title">🛡️ Tech Arsenal</h2>
        </div>
        <div className="skills-showcase">
          {Object.entries(SKILLS).map(([key, cat]) => (
            <div className="skill-panel stagger-in" key={key} data-testid={`card-skills-${key}`}>
              <div className="skill-panel-header">
                <span className="skill-panel-icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
              </div>
              <div className="skill-chips">
                {cat.items.map(s => (
                  <span className="skill-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="cin-section" data-testid="section-projects">
        <div className="section-header parallax-up">
          <span className="section-tag">// 🎯 PROJECTS</span>
          <h2 className="section-cin-title">🎯 Digital Arsenal</h2>
        </div>

        <div className="project-category-label stagger-in">
          <span className="category-icon">⚔️</span>
          <span>LIVE OPERATIONS</span>
          <span className="category-line" />
        </div>

        <div className="projects-showcase">
          {PROJECTS.map((proj, i) => (
            <div className={`project-cin-card stagger-in ${i % 2 === 1 ? 'project-reverse' : ''}`} key={i} data-testid={`card-project-${i}`}>
              <div className="project-cin-img-wrap">
                <img src={proj.img} alt={proj.title} className="project-cin-img" />
                <div className="project-cin-overlay">
                  <a href={proj.live} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm" data-testid={`link-project-live-${i}`}>🔴 LIVE</a>
                  <a href={proj.code} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm cin-btn-ghost-sm" data-testid={`link-project-code-${i}`}>💻 CODE</a>
                </div>
              </div>
              <div className="project-cin-info">
                <div className="project-cin-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="project-cin-title">{proj.title}</h3>
                <ul className="project-points">
                  {proj.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <div className="project-tech-row">
                  {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="project-category-label building-label stagger-in">
          <span className="category-icon building-icon">🚀</span>
          <span>FLAGSHIP & IN THE FORGE</span>
          <span className="category-line building-line" />
        </div>

        <div className="projects-showcase">
          {BUILDING_PROJECTS.map((proj, i) => {
            const isLive = proj.status === 'LIVE';
            const isShipped = proj.status === 'SHIPPED';
            const hasLive = !!proj.live;
            const hasCode = !!proj.code;
            const hasImg = !!proj.img;
            return (
            <div className={`project-cin-card stagger-in ${i % 2 === 1 ? 'project-reverse' : ''}`} key={`build-${i}`} data-testid={`card-project-building-${i}`}>
              {hasImg ? (
                <div className="project-cin-img-wrap">
                  <img src={proj.img} alt={proj.title} className="project-cin-img" />
                  {(hasLive || hasCode) && (
                    <div className="project-cin-overlay">
                      {hasLive && (
                        <a href={proj.live} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm" data-testid={`link-project-building-live-${i}`}>🔴 LIVE</a>
                      )}
                      {hasCode && (
                        <a href={proj.code} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm cin-btn-ghost-sm" data-testid={`link-project-building-code-${i}`}>💻 CODE</a>
                      )}
                    </div>
                  )}
                </div>
              ) : (
              <div className="project-cin-img-wrap building-img-wrap">
                <div className="building-img-bg" style={{ background: proj.gradient }}>
                  <div className="building-overlay-content">
                    <span className="building-emoji">{proj.emoji}</span>
                    <span className="building-pulse-text">{isLive || isShipped ? '🟢' : '⚡'} {proj.status}{isLive || isShipped ? '' : '...'}</span>
                  </div>
                  {(hasLive || hasCode) && (
                    <div className="project-cin-overlay">
                      {hasLive && (
                        <a href={proj.live} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm" data-testid={`link-project-building-live-${i}`}>🔴 LIVE</a>
                      )}
                      {hasCode && (
                        <a href={proj.code} target="_blank" rel="noopener noreferrer" className="cin-btn cin-btn-sm cin-btn-ghost-sm" data-testid={`link-project-building-code-${i}`}>💻 CODE</a>
                      )}
                    </div>
                  )}
                  <div className="building-scanline" />
                  <div className="building-grid" />
                </div>
              </div>
              )}
              <div className="project-cin-info">
                <div className="project-cin-num">{String(i + PROJECTS.length + 1).padStart(2, '0')}</div>
                <div className="building-badge">{isLive || isShipped ? '🟢' : '🔨'} {proj.status}</div>
                <h3 className="project-cin-title">{proj.title}</h3>
                <span className="project-subtitle">{proj.subtitle}</span>
                <ul className="project-points">
                  {proj.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <div className="project-tech-row">
                  {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </section>

      <section id="certifications" className="cin-section" data-testid="section-certifications">
        <div className="section-header parallax-up">
          <span className="section-tag">// 🏆 CERTIFICATIONS</span>
          <h2 className="section-cin-title">🏆 Achievements</h2>
        </div>
        <div className="cert-showcase">
          {CERTIFICATIONS.map((cert, i) => (
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-cin-card stagger-in" key={i} data-testid={`card-cert-${i}`}>
              <div className="cert-cin-badge">
                {cert.iconSrc ? <img src={cert.iconSrc} alt={cert.iconAlt} className="cert-cin-badge-logo" /> : cert.icon}
              </div>
              <h3 className="cert-cin-title">{cert.title}</h3>
              <span className="cert-cin-org">{cert.org}</span>
              <span className="cert-cin-action">🔗 VIEW CREDENTIAL →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="cin-section" data-testid="section-contact">
        <div className="section-header parallax-up">
          <span className="section-tag">// 📡 CONTACT</span>
          <h2 className="section-cin-title">📡 Establish Connection</h2>
        </div>
        <div className="contact-immersive">
          <div className="contact-channels stagger-in">
            <a href="mailto:sandeepguptax2003@gmail.com" className="channel-card" data-testid="link-email">
              <span className="channel-icon">📧</span>
              <span className="channel-label">EMAIL</span>
              <span className="channel-data">sandeepguptax2003@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/sandeep-gupta-a1b679263/" target="_blank" rel="noopener noreferrer" className="channel-card" data-testid="link-contact-linkedin">
              <span className="channel-icon">💼</span>
              <span className="channel-label">LINKEDIN</span>
              <span className="channel-data">Sandeep Gupta</span>
            </a>
            <a href="https://github.com/sandeepguptax2003" target="_blank" rel="noopener noreferrer" className="channel-card" data-testid="link-contact-github">
              <span className="channel-icon">🐙</span>
              <span className="channel-label">GITHUB</span>
              <span className="channel-data">sandeepguptax2003</span>
            </a>
          </div>
          <div className="contact-form-cin stagger-in">
            <h3 className="form-cin-title">📨 TRANSMIT MESSAGE</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="cin-footer" data-testid="footer">
        <div className="footer-cin-inner">
          <span className="footer-cin-name">⚡ [SG] SANDEEP GUPTA</span>
          <div className="footer-cin-links">
            {['🏠 Home', '🧠 About', '⚡ Experience', '⚔️ Skills', '🎯 Projects', '🏆 Certifications', '📡 Contact'].map(item => {
              const id = item.split(' ').pop()!.toLowerCase();
              return <a key={id} href={`#${id}`} data-testid={`link-footer-${id}`}>{item}</a>;
            })}
          </div>
          <div className="footer-cin-socials">
            <a href="https://www.linkedin.com/in/sandeep-gupta-a1b679263/" target="_blank" rel="noopener noreferrer" data-testid="link-footer-linkedin">💼 LinkedIn</a>
            <a href="https://github.com/sandeepguptax2003" target="_blank" rel="noopener noreferrer" data-testid="link-footer-github">🐙 GitHub</a>
          </div>
          <p className="footer-cin-copy">© 2026 SANDEEP GUPTA — 🟢 ALL SYSTEMS OPERATIONAL</p>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    if (!name || !email || !message) return;

    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/sandeepguptax2003@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio Contact from ${name}`,
          _template: 'table',
          _captcha: 'false',
          _autoresponse: `Hey ${name},\n\nThanks for reaching out — got your message and I'll get back to you soon.\n\n— Sandeep`,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== 'true') throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const labels: Record<typeof status, string> = {
    idle: '🚀 SEND MESSAGE',
    sending: '⏳ SENDING...',
    sent: '✅ MESSAGE SENT',
    error: '❌ FAILED — TRY AGAIN',
  };

  return (
    <form onSubmit={handleSubmit} className="cin-form" data-testid="form-contact">
      <div className="cin-field">
        <label>👤 NAME</label>
        <input type="text" name="name" placeholder="Enter your name" required data-testid="input-name" />
      </div>
      <div className="cin-field">
        <label>📧 EMAIL</label>
        <input type="email" name="email" placeholder="Enter your email" required data-testid="input-email" />
      </div>
      <div className="cin-field">
        <label>💬 MESSAGE</label>
        <textarea name="message" placeholder="Your message..." required rows={4} data-testid="input-message" />
      </div>
      <button
        type="submit"
        className="cin-btn cin-btn-primary cin-btn-full"
        disabled={status === 'sending'}
        data-testid="button-send-message"
      >
        <span className="cin-btn-glint" />
        {labels[status]}
      </button>
    </form>
  );
}
