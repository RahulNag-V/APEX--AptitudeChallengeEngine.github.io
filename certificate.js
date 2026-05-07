"use strict";

/* ══════════════════════════════════════════════════════════════════
   APEX CERTIFICATE & ACHIEVEMENT BADGE SYSTEM  (Phase 2)
   certificate.js — Drop this alongside script.js

   Features:
   • Professional certificates for all 5 modes (score > 85%)
   • 30+ achievement badges with animated unlock overlays
   • Badge stored in localStorage under key "apex_v5" → badges[]
   • Certificate modal with download-as-PNG via Canvas
══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1.  BADGE DEFINITIONS
───────────────────────────────────────────── */
const BADGES_DEF = [
  // Mode completion badges
  { id:"cert_easy",       icon:"🌿", name:"Easy Graduate",     desc:"Score 85%+ on Easy mode",              rarity:"gold"    },
  { id:"cert_medium",     icon:"⚡", name:"Medium Master",     desc:"Score 85%+ on Medium mode",            rarity:"gold"    },
  { id:"cert_hard",       icon:"🔥", name:"Hard Champion",     desc:"Score 85%+ on Hard mode",              rarity:"plat"    },
  { id:"cert_impossible", icon:"💀", name:"Impossible Legend", desc:"Score 85%+ on Impossible mode",        rarity:"diamond" },
  { id:"cert_infinite",   icon:"♾️", name:"Infinity Survivor", desc:"Score 85%+ in Infinite mode",         rarity:"diamond" },
  // Performance badges
  { id:"first_blood",     icon:"🎯", name:"First Blood",        desc:"Complete your first game",            rarity:"bronze"  },
  { id:"perfect_health",  icon:"❤️", name:"Untouchable",        desc:"Finish a game with full health",     rarity:"silver"  },
  { id:"streak_5",        icon:"🔥", name:"On Fire",            desc:"Build a 5-answer streak",             rarity:"silver"  },
  { id:"streak_10",       icon:"⚡", name:"Thunderstruck",      desc:"Build a 10-answer streak",            rarity:"gold"    },
  { id:"streak_15",       icon:"🌪️", name:"Unstoppable",       desc:"Build a 15-answer streak",            rarity:"plat"    },
  { id:"apex_tier",       icon:"🏆", name:"APEX TIER",          desc:"Score 90%+ accuracy",                rarity:"diamond" },
  { id:"elite_tier",      icon:"⭐", name:"Elite Performer",    desc:"Score 75%+ accuracy",                rarity:"gold"    },
  { id:"speed_demon",     icon:"⚡", name:"Speed Demon",        desc:"Answer in under 5 seconds 3 times",  rarity:"silver"  },
  { id:"combo_x4",        icon:"💥", name:"Combo God",          desc:"Reach ×4 combo multiplier",          rarity:"plat"    },
  { id:"power_saver",     icon:"🧊", name:"Lifeline Saver",     desc:"Finish a game using 0 power-ups",    rarity:"silver"  },
  { id:"all_modes",       icon:"🎖️", name:"Polymath",           desc:"Complete all 5 game modes",          rarity:"diamond" },
  { id:"century",         icon:"💯", name:"Century Club",       desc:"Play 100 games total",               rarity:"plat"    },
  { id:"veteran",         icon:"🎗️", name:"Veteran",            desc:"Play 50 games total",                rarity:"gold"    },
  { id:"explorer",        icon:"🗺️", name:"Explorer",           desc:"Play 10 games total",                rarity:"bronze"  },
  { id:"perfect_score",   icon:"🌟", name:"Perfect Score",      desc:"Answer every question correctly",    rarity:"diamond" },
  { id:"survivor",        icon:"🛡️", name:"Survivor",           desc:"Finish with only 1 heart left",      rarity:"silver"  },
  { id:"hat_trick",       icon:"🎩", name:"Hat Trick",          desc:"Win 3 games in a row (85%+)",        rarity:"gold"    },
  { id:"five_modes",      icon:"🏅", name:"Grand Tour",         desc:"Play all 5 modes at least once",     rarity:"silver"  },
  { id:"night_owl",       icon:"🦉", name:"Night Owl",          desc:"Play 5 games after midnight",        rarity:"bronze"  },
];

const RARITY_CONFIG = {
  bronze:  { label:"Bronze",  bg:"#cd7f32", glow:"rgba(205,127,50,0.4)",  star:"#e8a84a" },
  silver:  { label:"Silver",  bg:"#a8a9ad", glow:"rgba(168,169,173,0.4)", star:"#d4d5d9" },
  gold:    { label:"Gold",    bg:"#f5c842", glow:"rgba(245,200,66,0.45)", star:"#ffe168" },
  plat:    { label:"Plat",    bg:"#8b5cf6", glow:"rgba(139,92,246,0.5)",  star:"#c4b5fd" },
  diamond: { label:"Diamond", bg:"#14b8a6", glow:"rgba(20,184,166,0.55)", star:"#5eead4" },
};

/* ─────────────────────────────────────────────
   2.  CERTIFICATE DEFINITIONS  (per mode)
───────────────────────────────────────────── */
const CERTS = {
  easy: {
    title:    "Certificate of Aptitude",
    subtitle: "Easy Mode — Beginner Mastery",
    accentA:  "#22c55e",
    accentB:  "#16a34a",
    glowCol:  "rgba(34,197,94,0.25)",
    ribbonBg: "linear-gradient(135deg,#16a34a,#22c55e)",
    tier:     "🌿 EASY",
    badge:    "🌿",
    seal:     "BEGINNER\nMASTERY",
  },
  medium: {
    title:    "Certificate of Proficiency",
    subtitle: "Medium Mode — Intermediate Mastery",
    accentA:  "#f59e0b",
    accentB:  "#d97706",
    glowCol:  "rgba(245,158,11,0.25)",
    ribbonBg: "linear-gradient(135deg,#d97706,#f59e0b)",
    tier:     "⚡ MEDIUM",
    badge:    "⚡",
    seal:     "INTERMEDIATE\nMASTERY",
  },
  hard: {
    title:    "Certificate of Excellence",
    subtitle: "Hard Mode — Advanced Mastery",
    accentA:  "#ef4444",
    accentB:  "#dc2626",
    glowCol:  "rgba(239,68,68,0.25)",
    ribbonBg: "linear-gradient(135deg,#dc2626,#ef4444)",
    tier:     "🔥 HARD",
    badge:    "🔥",
    seal:     "ADVANCED\nMASTERY",
  },
  impossible: {
    title:    "Certificate of Legendary Mastery",
    subtitle: "Impossible Mode — Elite Mastery",
    accentA:  "#8b5cf6",
    accentB:  "#7c3aed",
    glowCol:  "rgba(139,92,246,0.3)",
    ribbonBg: "linear-gradient(135deg,#7c3aed,#a855f7)",
    tier:     "💀 IMPOSSIBLE",
    badge:    "💀",
    seal:     "ELITE\nMASTERY",
  },
  infinite: {
    title:    "Infinite Endurance Certificate",
    subtitle: "Infinite Mode — Milestone Mastery",
    accentA:  "#14b8a6",
    accentB:  "#0f766e",
    glowCol:  "rgba(20,184,166,0.3)",
    ribbonBg: "linear-gradient(135deg,#0f766e,#14b8a6)",
    tier:     "♾️ INFINITE",
    badge:    "♾️",
    seal:     "SURVIVAL\nMASTERY",
  },
};

const INFINITE_MILESTONES = [100, 200, 300, 400];

/* ─────────────────────────────────────────────
   3.  STORAGE HELPERS  (reuses apex_v5 key)
───────────────────────────────────────────── */
const CertStore = (() => {
  const KEY = "apex_v5";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} }
  return {
    _load()      { return load(); },
    getBadges()  { return load().badges || []; },
    setCerts(v)  { const d=load(); d.certificates=v; save(d); },
    getCerts()   { return load().certificates || {}; },
    addBadge(id) {
      const d = load();
      const b = d.badges || [];
      if (!b.includes(id)) { b.push(id); d.badges = b; save(d); return true; }
      return false;
    },
    getSessions() { return load().sessions || []; },
    getName()     { return load().playerName || "Player"; },
  };
})();

/* ─────────────────────────────────────────────
   4.  INJECT STYLES
───────────────────────────────────────────── */
(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
/* ── Badge Unlock Overlay ── */
.apex-badge-overlay {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; align-items: center; justify-content: center;
  background: rgba(8,8,24,0.72);
  backdrop-filter: blur(8px);
  animation: badgeFadeIn 0.4s ease both;
  cursor: pointer;
}
@keyframes badgeFadeIn { from { opacity:0; } to { opacity:1; } }

.apex-badge-card {
  position: relative;
  width: min(340px, 90vw);
  background: var(--surface, #1c1f35);
  border-radius: 24px;
  padding: 40px 28px 32px;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  text-align: center;
  animation: badgePop 0.55s cubic-bezier(0.22,1,0.36,1) both;
  border: 1.5px solid var(--border, #2a2e4a);
  box-shadow: 0 0 60px var(--badge-glow, rgba(108,99,255,0.4));
  overflow: hidden;
}
@keyframes badgePop {
  from { transform: scale(0.6) rotate(-8deg); opacity:0; }
  to   { transform: scale(1) rotate(0deg);   opacity:1; }
}

.apex-badge-shine {
  position: absolute; inset:0; border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
  pointer-events: none;
}

.apex-badge-rays {
  position: absolute; inset:-20px;
  background: conic-gradient(from 0deg, transparent 30deg, var(--badge-glow,rgba(108,99,255,0.12)) 60deg, transparent 90deg);
  animation: raysRotate 3s linear infinite;
  pointer-events: none;
}
@keyframes raysRotate { to { transform: rotate(360deg); } }

.apex-badge-unlocked-label {
  font-size: 9px; font-weight: 800; letter-spacing: 0.45em;
  color: var(--badge-accent, #f5c842);
  font-family: "JetBrains Mono", monospace;
  text-transform: uppercase;
  position: relative; z-index:1;
}

.apex-badge-icon-wrap {
  position: relative; z-index: 1;
  width: 96px; height: 96px;
  display: flex; align-items: center; justify-content: center;
}
.apex-badge-icon-bg {
  position: absolute; inset: 0; border-radius: 50%;
  background: var(--badge-bg, #f5c842);
  box-shadow: 0 0 32px var(--badge-glow, rgba(245,200,66,0.5));
  animation: badgePulse 2s ease infinite;
}
@keyframes badgePulse {
  0%,100% { transform: scale(1); box-shadow: 0 0 32px var(--badge-glow); }
  50%     { transform: scale(1.06); box-shadow: 0 0 48px var(--badge-glow); }
}
.apex-badge-icon-text {
  font-size: 44px; line-height: 1; position: relative; z-index:1;
  animation: iconBounce 0.6s 0.3s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes iconBounce {
  from { transform: scale(0) rotate(-20deg); }
  to   { transform: scale(1) rotate(0deg); }
}
.apex-badge-stars {
  position: absolute; inset:-8px; pointer-events:none;
}
.apex-badge-star {
  position: absolute; font-size: 12px;
  animation: starFloat var(--dur,2s) var(--delay,0s) ease-in-out infinite alternate;
}
@keyframes starFloat {
  from { transform: translateY(0) scale(1); opacity:0.6; }
  to   { transform: translateY(-8px) scale(1.3); opacity:1; }
}

.apex-badge-rarity-pill {
  font-size: 8px; font-weight: 800; letter-spacing: 0.28em;
  padding: 3px 12px; border-radius: 100px;
  background: var(--badge-bg); color: #fff;
  font-family: "JetBrains Mono", monospace;
  position: relative; z-index:1;
}
.apex-badge-name {
  font-size: 20px; font-weight: 900; color: var(--text, #e8eaf6);
  position: relative; z-index:1;
}
.apex-badge-desc {
  font-size: 12px; color: var(--text2, #9fa3c8); line-height: 1.6;
  position: relative; z-index:1; max-width: 240px;
}
.apex-badge-dismiss {
  font-size: 10px; color: var(--muted, #5a6088);
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.15em; position: relative; z-index:1;
  margin-top: 4px;
}

/* ── Confetti particles from badge ── */
.apex-cert-confetti {
  position: fixed; pointer-events: none; z-index: 100000;
  border-radius: 3px;
  animation: confettiFall var(--dur,2.5s) var(--delay,0s) ease-in forwards;
}
@keyframes confettiFall {
  0%   { transform: translateY(-20px) rotate(0deg) scale(1);   opacity:1; }
  100% { transform: translateY(110vh) rotate(720deg) scale(0.4); opacity:0; }
}

/* ── Certificate Modal ── */
.apex-cert-overlay {
  position: fixed; inset:0; z-index:99998;
  background: rgba(8,8,24,0.82); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  animation: badgeFadeIn 0.35s ease both;
  padding: 16px;
}
.apex-cert-modal {
  position: relative;
  width: min(720px, 100%);
  background: var(--surface, #1c1f35);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1.5px var(--border, #2a2e4a);
  animation: badgePop 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.apex-cert-close-btn {
  position: absolute; top: 14px; right: 16px; z-index: 10;
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.06); border: 1.5px solid var(--border,#2a2e4a);
  color: var(--muted,#888); font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s ease;
}
.apex-cert-close-btn:hover { background: rgba(239,68,68,0.12); color: #ef4444; border-color:#ef4444; }

.apex-cert-canvas-wrap {
  width: 100%; background: #0a0a1a;
}
.apex-cert-canvas-wrap canvas {
  display: block; width: 100%; height: auto;
}
.apex-cert-actions {
  display: flex; gap: 10px; justify-content: center;
  padding: 16px 20px 20px;
  background: var(--surface, #1c1f35);
  border-top: 1px solid var(--border,#2a2e4a);
  flex-wrap: wrap;
}
.apex-cert-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: 100px;
  font-family: "Outfit", sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; border: none; transition: all 0.2s ease;
  letter-spacing: 0.04em;
}
.apex-cert-btn.primary {
  background: var(--cert-accent, #22c55e); color: #fff;
  box-shadow: 0 6px 20px var(--cert-glow, rgba(34,197,94,0.3));
}
.apex-cert-btn.primary:hover { transform: translateY(-2px) scale(1.03); opacity:0.9; }
.apex-cert-btn.secondary {
  background: var(--surface2,#222540); color: var(--text2,#9fa3c8);
  border: 1.5px solid var(--border,#2a2e4a);
}
.apex-cert-btn.secondary:hover { border-color: var(--cert-accent,#22c55e); color: var(--cert-accent,#22c55e); }

/* ── Achievements Panel in Settings (Stats tab) ── */
.apex-badges-section {
  padding: 14px 20px 18px;
  border-top: 1px solid var(--border);
}
.apex-badges-section-label {
  font-size: 9px; font-weight: 800; letter-spacing: 0.4em;
  color: var(--muted); margin-bottom: 12px; font-family: "JetBrains Mono", monospace;
}
.apex-badges-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(60px,1fr)); gap: 10px;
}
.apex-badge-pill {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  cursor: default;
}
.apex-badge-pill-icon {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  border: 2px solid var(--border);
  background: var(--surface2);
  transition: all 0.2s ease;
  position: relative; overflow: hidden;
}
.apex-badge-pill.earned .apex-badge-pill-icon {
  border-color: var(--badge-col, #f5c842);
  box-shadow: 0 0 12px var(--badge-glow-col, rgba(245,200,66,0.35));
  background: var(--surface);
}
.apex-badge-pill.locked .apex-badge-pill-icon { filter: grayscale(1); opacity:0.35; }
.apex-badge-pill-name {
  font-size: 7px; font-weight: 700; letter-spacing: 0.08em;
  color: var(--muted); text-align: center; line-height: 1.3;
  max-width: 60px;
}
.apex-badge-pill.earned .apex-badge-pill-name { color: var(--text2); }

/* ── Certificate banner in Results screen ── */
.apex-cert-banner {
  background: linear-gradient(135deg, var(--cert-bg-a, rgba(34,197,94,0.08)), var(--cert-bg-b, rgba(34,197,94,0.03)));
  border: 1.5px solid var(--cert-border, rgba(34,197,94,0.3));
  border-radius: 12px;
  padding: 16px 18px;
  display: flex; align-items: center; gap: 14px;
  margin: 12px 0;
  cursor: pointer;
  transition: all 0.22s ease;
  animation: certBannerEntrance 0.6s 0.8s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes certBannerEntrance {
  from { opacity:0; transform: translateY(20px) scale(0.95); }
  to   { opacity:1; transform: none; }
}
.apex-cert-banner:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--cert-glow-light,rgba(34,197,94,0.15)); }
.apex-cert-banner-icon { font-size: 32px; flex-shrink:0; }
.apex-cert-banner-text { flex: 1; }
.apex-cert-banner-title { font-size: 14px; font-weight: 800; color: var(--text); }
.apex-cert-banner-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
.apex-cert-banner-arrow { font-size: 18px; color: var(--cert-accent); }

/* ── Result screen cert container ── */
#apex-cert-result-slot { width: 100%; }
`;
  document.head.appendChild(style);
})();

/* ─────────────────────────────────────────────
   5.  CONFETTI BURST
───────────────────────────────────────────── */
function spawnConfetti(n = 60) {
  const colors = ["#f5c842","#22c55e","#6c63ff","#14b8a6","#ef4444","#f97316","#a78bfa","#ffffff"];
  for (let i = 0; i < n; i++) {
    const el = document.createElement("div");
    el.className = "apex-cert-confetti";
    el.style.cssText = `
      left: ${20 + Math.random()*60}vw;
      top: -10px;
      width: ${6+Math.random()*8}px;
      height: ${6+Math.random()*8}px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      --dur: ${1.8+Math.random()*1.8}s;
      --delay: ${Math.random()*0.8}s;
      transform: rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3800);
  }
}

/* ─────────────────────────────────────────────
   6.  BADGE UNLOCK ANIMATION
───────────────────────────────────────────── */
let _badgeQueue = [];
let _badgeBusy = false;

function showBadgeUnlock(badgeDef) {
  _badgeQueue.push(badgeDef);
  if (!_badgeBusy) drainBadgeQueue();
}

function drainBadgeQueue() {
  if (!_badgeQueue.length) { _badgeBusy = false; return; }
  _badgeBusy = true;
  const def = _badgeQueue.shift();
  const rar = RARITY_CONFIG[def.rarity] || RARITY_CONFIG.bronze;

  spawnConfetti(50);

  const overlay = document.createElement("div");
  overlay.className = "apex-badge-overlay";
  overlay.style.setProperty("--badge-glow", rar.glow);

  const STAR_POSITIONS = [
    {top:"12%",left:"18%"},{top:"10%",right:"22%"},{top:"25%",left:"6%"},
    {top:"25%",right:"6%"},{bottom:"18%",left:"12%"},{bottom:"16%",right:"14%"},
    {bottom:"8%",left:"42%"},
  ];

  const starsHtml = STAR_POSITIONS.map((pos,i) => {
    const style = Object.entries({...pos,"--dur":`${1.5+i*0.3}s`,"--delay":`${i*0.15}s`})
      .map(([k,v]) => `${k}:${v}`).join(";");
    return `<span class="apex-badge-star" style="${style}">✦</span>`;
  }).join("");

  overlay.innerHTML = `
    <div class="apex-badge-card" style="--badge-glow:${rar.glow};--badge-bg:${rar.bg};--badge-accent:${rar.star};">
      <div class="apex-badge-shine"></div>
      <div class="apex-badge-rays" style="--badge-glow:${rar.glow};"></div>
      <div class="apex-badge-unlocked-label">🔓 Achievement Unlocked</div>
      <div class="apex-badge-icon-wrap">
        <div class="apex-badge-icon-bg" style="background:${rar.bg};--badge-glow:${rar.glow};"></div>
        <div class="apex-badge-icon-text">${def.icon}</div>
        <div class="apex-badge-stars">${starsHtml}</div>
      </div>
      <span class="apex-badge-rarity-pill" style="background:${rar.bg};">${rar.label}</span>
      <div class="apex-badge-name">${def.name}</div>
      <div class="apex-badge-desc">${def.desc}</div>
      <div class="apex-badge-dismiss">Tap anywhere to continue</div>
    </div>`;

  document.body.appendChild(overlay);

  // Sound effect (subtle)
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine"; osc.frequency.setValueAtTime(523, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(); osc.stop(ctx.currentTime + 0.65);
  } catch {}

  function dismiss() {
    overlay.style.animation = "badgeFadeIn 0.3s ease reverse both";
    setTimeout(() => { overlay.remove(); setTimeout(drainBadgeQueue, 200); }, 280);
  }
  overlay.addEventListener("click", dismiss);
  setTimeout(dismiss, 4500);
}

/* ─────────────────────────────────────────────
   7.  DRAW CERTIFICATE ON CANVAS
───────────────────────────────────────────── */
function drawCertificate(canvas, mode, playerName, accuracy, score, date, level) {
  const cfg = CERTS[mode] || CERTS.easy;

  // Infinite milestone overrides
  const isInfinite       = (mode === "infinite");
  const effectiveTitle   = isInfinite && level ? "Infinite Endurance Certificate"  : cfg.title;
  const effectiveSubtitle= isInfinite && level ? `Completed ${level} Questions`    : cfg.subtitle;
  const effectiveTier    = isInfinite && level ? `MILESTONE ${level}`               : cfg.tier;
  const W = 900, H = 636;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  // ── Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, isDark ? "#0f1020" : "#f8f9ff");
  bg.addColorStop(1, isDark ? "#151728" : "#eef0f8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle grid
  ctx.save();
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.03)" : "rgba(108,99,255,0.05)";
  ctx.lineWidth = 0.8;
  for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  ctx.restore();

  // ── Radial glow
  const glow = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W*0.55);
  glow.addColorStop(0, cfg.glowCol);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow; ctx.fillRect(0,0,W,H);

  // ── Outer border
  const borderInset = 18;
  roundRect(ctx, borderInset, borderInset, W-borderInset*2, H-borderInset*2, 18);
  ctx.strokeStyle = cfg.accentA; ctx.lineWidth = 2; ctx.stroke();

  // ── Inner border
  const innerInset = 28;
  roundRect(ctx, innerInset, innerInset, W-innerInset*2, H-innerInset*2, 14);
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.12)";
  ctx.lineWidth = 1; ctx.stroke();

  // ── Corner ornaments
  drawCornerOrnament(ctx, 40, 40, cfg.accentA);
  drawCornerOrnament(ctx, W-40, 40, cfg.accentA, true);
  drawCornerOrnament(ctx, 40, H-40, cfg.accentA, false, true);
  drawCornerOrnament(ctx, W-40, H-40, cfg.accentA, true, true);

  // ── Top header accent bar
  const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
  headerGrad.addColorStop(0, cfg.accentB + "00");
  headerGrad.addColorStop(0.2, cfg.accentA);
  headerGrad.addColorStop(0.8, cfg.accentA);
  headerGrad.addColorStop(1, cfg.accentB + "00");
  ctx.fillStyle = headerGrad;
  ctx.fillRect(borderInset+2, borderInset+2, W-borderInset*2-4, 4);

  // ── APEX Logo shield (compact)
  drawShield(ctx, W/2, 80, cfg.accentA, cfg.accentB);

  // ── "APEX" wordmark
  ctx.save();
  ctx.font = "900 18px 'Outfit', 'Arial Black', sans-serif";
  ctx.letterSpacing = "0.4em";
  const apexGrad = ctx.createLinearGradient(W/2-40, 0, W/2+40, 0);
  apexGrad.addColorStop(0, cfg.accentA);
  apexGrad.addColorStop(1, cfg.accentB);
  ctx.fillStyle = apexGrad;
  ctx.textAlign = "center";
  ctx.fillText("APEX", W/2, 115);
  ctx.restore();

  // ── Subtitle micro label
  ctx.save();
  ctx.font = "600 10px 'JetBrains Mono', monospace";
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.35)" : "rgba(30,40,80,0.35)";
  ctx.textAlign = "center";
  ctx.letterSpacing = "0.3em";
  ctx.fillText("APTITUDE PERFORMANCE ENGINE", W/2, 132);
  ctx.restore();

  // ── Divider
  drawDivider(ctx, W/2, 148, 200, cfg.accentA);

  // ── Certificate type title
  ctx.save();
  ctx.font = "800 32px 'Outfit', sans-serif";
  ctx.fillStyle = isDark ? "#e8eaf6" : "#1a1d2e";
  ctx.textAlign = "center";
  ctx.fillText(effectiveTitle, W/2, 198);
  ctx.restore();

  // ── Subtitle
  ctx.save();
  ctx.font = "500 13px 'Outfit', sans-serif";
  ctx.fillStyle = isDark ? "rgba(159,163,200,0.8)" : "rgba(74,80,104,0.8)";
  ctx.textAlign = "center";
  ctx.fillText(effectiveSubtitle, W/2, 220);
  ctx.restore();

  // ── "This is to certify that"
  ctx.save();
  ctx.font = "italic 14px 'Georgia', serif";
  ctx.fillStyle = isDark ? "rgba(159,163,200,0.65)" : "rgba(74,80,104,0.65)";
  ctx.textAlign = "center";
  ctx.fillText("This is to certify that", W/2, 268);
  ctx.restore();

  // ── Player Name (big)
  ctx.save();
  const nameGrad = ctx.createLinearGradient(W/2 - 180, 0, W/2 + 180, 0);
  nameGrad.addColorStop(0, cfg.accentA);
  nameGrad.addColorStop(0.5, isDark ? "#e8eaf6" : "#1a1d2e");
  nameGrad.addColorStop(1, cfg.accentB);
  ctx.fillStyle = nameGrad;
  ctx.font = "900 44px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(playerName, W/2, 322);
  ctx.restore();

  // ── Name underline
  const nameW = Math.min(ctx.measureText(playerName).width + 60, 420);
  drawDivider(ctx, W/2, 335, nameW, cfg.accentA, 1);

  // ── Body text
  ctx.save();
  ctx.font = "italic 13px 'Georgia', serif";
  ctx.fillStyle = isDark ? "rgba(159,163,200,0.7)" : "rgba(74,80,104,0.7)";
  ctx.textAlign = "center";
  ctx.fillText(`has demonstrated exceptional aptitude by scoring`, W/2, 368);
  ctx.restore();

  // ── Stats row
  const statsY = 420;
  const statCols = [
    { label: "ACCURACY", val: accuracy + "%" },
    { label: "SCORE",    val: String(score)  },
    { label: "MODE",     val: effectiveTier  },
  ];
  const colW = 200;
  const startX = W/2 - colW;

  statCols.forEach((s, i) => {
    const cx = startX + i * colW;

    // Stat box
    roundRect(ctx, cx - 74, statsY - 38, 148, 60, 10);
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(108,99,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.12)";
    ctx.lineWidth = 1; ctx.stroke();

    // Value
    ctx.save();
    ctx.font = `900 ${s.val.length > 5 ? 16 : 24}px 'Outfit', sans-serif`;
    ctx.fillStyle = cfg.accentA;
    ctx.textAlign = "center";
    ctx.fillText(s.val, cx, statsY);
    ctx.restore();

    // Label
    ctx.save();
    ctx.font = "700 8px 'JetBrains Mono', monospace";
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.35)" : "rgba(30,40,80,0.4)";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.25em";
    ctx.fillText(s.label, cx, statsY + 18);
    ctx.restore();
  });

  // ── Horizontal rule
  drawDivider(ctx, W/2, 462, W - 160, isDark ? "rgba(255,255,255,0.08)" : "rgba(108,99,255,0.12)", 1);

  // ── Footer row: date  |  "In recognition of…"  |  seal
  ctx.save();
  ctx.font = "600 10px 'JetBrains Mono', monospace";
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(30,40,80,0.35)";
  ctx.textAlign = "left";
  ctx.fillText("ISSUED ON", 90, 488);
  ctx.font = "700 13px 'Outfit', sans-serif";
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.6)" : "rgba(30,40,80,0.7)";
  ctx.fillText(date, 90, 505);
  ctx.restore();

  ctx.save();
  ctx.font = "italic 12px 'Georgia', serif";
  ctx.fillStyle = isDark ? "rgba(159,163,200,0.55)" : "rgba(74,80,104,0.55)";
  ctx.textAlign = "center";
  ctx.fillText("In recognition of outstanding performance and dedication.", W/2, 495);
  ctx.fillText("Powered by the APEX Aptitude Challenge Engine.", W/2, 514);
  ctx.restore();

  // ── Seal (right side)
  drawSeal(ctx, W - 110, 493, cfg.accentA, cfg.accentB, cfg.seal);

  // ── Mode badge (top-left ribbon effect)
  drawRibbonBadge(ctx, 58, 58, cfg.badge, cfg.accentA);

  // ── Decorative dots top/bottom
  [0.25, 0.75].forEach(frac => {
    const x = W * frac;
    for (let d = 0; d < 5; d++) {
      ctx.beginPath();
      ctx.arc(x + (d - 2) * 14, H - 40, 2, 0, Math.PI*2);
      ctx.fillStyle = d === 2 ? cfg.accentA : (isDark ? "rgba(255,255,255,0.15)" : "rgba(108,99,255,0.2)");
      ctx.fill();
    }
  });
}

/* Helper: rounded rect path */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);   ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);     ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);       ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

/* Helper: divider line */
function drawDivider(ctx, cx, y, w, color, h=1.5) {
  const g = ctx.createLinearGradient(cx-w/2, 0, cx+w/2, 0);
  g.addColorStop(0, "transparent");
  g.addColorStop(0.3, color);
  g.addColorStop(0.7, color);
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(cx-w/2, y, w, h);
}

/* Helper: corner ornament */
function drawCornerOrnament(ctx, x, y, color, flipX=false, flipY=false) {
  ctx.save();
  ctx.translate(x, y);
  if (flipX) ctx.scale(-1, 1);
  if (flipY) ctx.scale(1, -1);
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.5;
  ctx.beginPath(); ctx.moveTo(0,-16); ctx.lineTo(0,0); ctx.lineTo(16,0); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,6,0,Math.PI*2); ctx.fillStyle=color; ctx.fill();
  ctx.restore();
}

/* Helper: APEX shield icon */
function drawShield(ctx, cx, cy, colorA, colorB) {
  ctx.save();
  ctx.translate(cx, cy);
  const g = ctx.createLinearGradient(-16,-16,16,16);
  g.addColorStop(0, colorA + "33");
  g.addColorStop(1, colorB + "11");
  ctx.beginPath();
  ctx.moveTo(0,-18); ctx.lineTo(16,-8); ctx.lineTo(16,4);
  ctx.quadraticCurveTo(16,16,0,22);
  ctx.quadraticCurveTo(-16,16,-16,4);
  ctx.lineTo(-16,-8); ctx.closePath();
  ctx.fillStyle = g; ctx.fill();
  ctx.strokeStyle = colorA; ctx.lineWidth = 1.5; ctx.stroke();
  // bolt
  ctx.beginPath(); ctx.moveTo(4,-9); ctx.lineTo(-2,2); ctx.lineTo(2,2); ctx.lineTo(-4,11); ctx.lineTo(5,0); ctx.lineTo(1,0); ctx.closePath();
  ctx.fillStyle = "#fff"; ctx.globalAlpha = 0.9; ctx.fill();
  ctx.restore();
}

/* Helper: seal stamp */
function drawSeal(ctx, cx, cy, colorA, colorB, text) {
  ctx.save();
  ctx.translate(cx, cy);
  // outer ring
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle)*32, Math.sin(angle)*32, 2, 0, Math.PI*2);
    ctx.fillStyle = colorA + "88"; ctx.fill();
  }
  // ring
  ctx.beginPath(); ctx.arc(0,0,28,0,Math.PI*2);
  const rg = ctx.createRadialGradient(0,0,0,0,0,28);
  rg.addColorStop(0, colorA + "33"); rg.addColorStop(1, colorA + "11");
  ctx.fillStyle = rg; ctx.fill();
  ctx.strokeStyle = colorA; ctx.lineWidth = 2; ctx.stroke();
  // inner ring
  ctx.beginPath(); ctx.arc(0,0,22,0,Math.PI*2);
  ctx.strokeStyle = colorA + "44"; ctx.lineWidth = 1; ctx.stroke();
  // text
  const lines = text.split("\n");
  ctx.fillStyle = colorA;
  ctx.textAlign = "center";
  lines.forEach((line, i) => {
    const y = (i - (lines.length-1)/2) * 11;
    ctx.font = `800 ${line.length > 8 ? 7 : 8}px 'JetBrains Mono', monospace`;
    ctx.fillText(line, 0, y);
  });
  ctx.restore();
}

/* Helper: ribbon badge */
function drawRibbonBadge(ctx, cx, cy, emoji, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath(); ctx.arc(0,0,22,0,Math.PI*2);
  ctx.fillStyle = color + "22"; ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.font = "22px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(emoji, 0, 1);
  ctx.restore();
}

/* ─────────────────────────────────────────────
   8.  CERTIFICATE MODAL
───────────────────────────────────────────── */
function showCertificateModal(mode, accuracy, score, level) {
  const cfg = CERTS[mode] || CERTS.easy;
  const playerName = CertStore.getName();
  const date = new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
  const certData = { accuracy, score, date, level: level || null };

  const overlay = document.createElement("div");
  overlay.className = "apex-cert-overlay";
  overlay.style.cssText = `--cert-accent:${cfg.accentA};--cert-glow:${cfg.glowCol};`;

  const canvas = document.createElement("canvas");

  overlay.innerHTML = `
    <div class="apex-cert-modal">
      <button class="apex-cert-close-btn" id="cert-close-btn">✕</button>
      <div class="apex-cert-canvas-wrap" id="cert-canvas-wrap"></div>
      <div class="apex-cert-actions">
        <button class="apex-cert-btn primary" id="cert-download-btn">⬇ Download Certificate</button>
        <button class="apex-cert-btn secondary" id="cert-close-btn2">Close</button>
      </div>
    </div>`;

  overlay.querySelector("#cert-canvas-wrap").appendChild(canvas);
  document.body.appendChild(overlay);

  spawnConfetti(80);
  drawCertificate(canvas, mode, playerName, accuracy, score, date, level);

  // Download
  overlay.querySelector("#cert-download-btn").addEventListener("click", () => {
    const link = document.createElement("a");
    const suffix = (mode === "infinite" && level) ? `Infinite_${level}Q` : mode;
    link.download = `APEX_Certificate_${suffix}_${playerName.replace(/\s+/g,"_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  function close() { overlay.remove(); }
  overlay.querySelector("#cert-close-btn").addEventListener("click", close);
  overlay.querySelector("#cert-close-btn2").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
}

/* ─────────────────────────────────────────────
   9.  CERTIFICATE RESULT BANNER (injected into results screen)
───────────────────────────────────────────── */
function injectCertBanner(mode, accuracy, score, level) {
  const cfg = CERTS[mode] || CERTS.easy;

  // Build display tier string
  const tierDisplay = (mode === "infinite" && level)
    ? `Certificate Earned — ${level} Questions Milestone`
    : `Certificate Earned — ${cfg.tier}`;

  // Find a good slot in the results screen
  let slot = document.getElementById("apex-cert-result-slot");
  if (!slot) {
    slot = document.createElement("div");
    slot.id = "apex-cert-result-slot";
    const anchor =
      document.querySelector(".res-summary-grid") ||
      document.querySelector(".result-hero") ||
      document.querySelector("#res-rank")?.closest(".res-summary-grid");
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(slot, anchor.nextSibling);
    }
  }

  // For multiple milestone banners, append rather than replace
  const bannerEl = document.createElement("div");
  bannerEl.innerHTML = `
    <div class="apex-cert-banner"
      style="--cert-bg-a:${cfg.accentA}14;--cert-bg-b:${cfg.accentA}08;
             --cert-border:${cfg.accentA}55;--cert-accent:${cfg.accentA};
             --cert-glow-light:${cfg.glowCol};">
      <div class="apex-cert-banner-icon">🏅</div>
      <div class="apex-cert-banner-text">
        <div class="apex-cert-banner-title">${tierDisplay}</div>
        <div class="apex-cert-banner-sub">${accuracy}% accuracy · Click to view & download your certificate</div>
      </div>
      <div class="apex-cert-banner-arrow">→</div>
    </div>`;

  slot.appendChild(bannerEl);

  bannerEl.querySelector(".apex-cert-banner").addEventListener("click", () => {
    if (mode === "infinite" && level) {
      showCertificateModal("infinite", accuracy, score, level);
    } else {
      showCertificateModal(mode, accuracy, score, null);
    }
  });
}

/* ─────────────────────────────────────────────
   10.  BADGE EVALUATION  (call after each session)
───────────────────────────────────────────── */
function evaluateBadges(sessionData) {
  const { mode, accuracy, score, correct, attempted, health, bestStreak, bestMultiplier, powerUpsUsed, speedAnswers } = sessionData;
  const sessions = CertStore.getSessions();
  const earned = CertStore.getBadges();
  const newBadges = [];

  function tryEarn(id) {
    const def = BADGES_DEF.find(b => b.id === id);
    if (!def) return;
    if (!earned.includes(id)) {
      const isNew = CertStore.addBadge(id);
      if (isNew) newBadges.push(def);
    }
  }

  // First game
  if (sessions.length <= 1) tryEarn("first_blood");

  // Accuracy-based
  if (accuracy >= 90) tryEarn("apex_tier");
  if (accuracy >= 75) tryEarn("elite_tier");
  if (accuracy === 100) tryEarn("perfect_score");

  // Health
  if (health === 5) tryEarn("perfect_health");
  if (health === 1) tryEarn("survivor");

  // Streak
  if (bestStreak >= 5)  tryEarn("streak_5");
  if (bestStreak >= 10) tryEarn("streak_10");
  if (bestStreak >= 15) tryEarn("streak_15");

  // Combo
  if (bestMultiplier >= 4) tryEarn("combo_x4");

  // Power-up
  if ((powerUpsUsed || 0) === 0) tryEarn("power_saver");

  // Speed
  if ((speedAnswers || 0) >= 3) tryEarn("speed_demon");

  // Session count
  if (sessions.length >= 10)  tryEarn("explorer");
  if (sessions.length >= 50)  tryEarn("veteran");
  if (sessions.length >= 100) tryEarn("century");

  // All modes played
  const modesPlayed = new Set(sessions.map(s => s.mode));
  if (["easy","medium","hard","impossible","infinite"].every(m => modesPlayed.has(m))) {
    tryEarn("five_modes");
  }

  // Certificate badges (85%)
  if (accuracy >= 85) {
    tryEarn(`cert_${mode}`);
    // All 5 certs
    const certModes = ["easy","medium","hard","impossible","infinite"];
    const allEarned = CertStore.getBadges();
    if (certModes.every(m => allEarned.includes(`cert_${m}`))) {
      tryEarn("all_modes");
    }
  }

  // Hat trick (3 consecutive 85%+ sessions)
  if (sessions.length >= 3) {
    const last3 = sessions.slice(-3);
    if (last3.every(s => (s.accuracy || 0) >= 85)) tryEarn("hat_trick");
  }

  // Night owl
  const h = new Date().getHours();
  if (h >= 0 && h < 4) {
    const nightSessions = sessions.filter(s => {
      try { return new Date(s.timestamp || 0).getHours() < 4; } catch { return false; }
    });
    if (nightSessions.length >= 5) tryEarn("night_owl");
  }

  // Show badge unlocks in sequence (250ms delay between each)
  newBadges.forEach((def, i) => {
    setTimeout(() => showBadgeUnlock(def), i * 300);
  });

  return newBadges;
}

/* ─────────────────────────────────────────────
   11.  MAIN ENTRY POINT  (call after results are shown)
───────────────────────────────────────────── */
window.ApexCertSystem = {
  /**
   * Call this at end of every game session.
   * sessionData: { mode, accuracy, score, correct, attempted, health,
   *                bestStreak, bestMultiplier, powerUpsUsed, speedAnswers }
   */
  onSessionComplete(sessionData) {
    const { mode, accuracy, score } = sessionData;
    const questions = sessionData.correct || sessionData.attempted || 0;
    const date = new Date().toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" });

    // 1. Evaluate and show badges
    setTimeout(() => evaluateBadges(sessionData), 600);

    // 2. Certificate logic
    if (mode !== "infinite") {
      // Normal modes: require 85%+ accuracy
      if ((accuracy || 0) >= 85) {
        setTimeout(() => {
          // Store certificate
          const d = CertStore.load ? CertStore.load() : {};
          const certs = d.certificates || {};
          if (!certs[mode]) certs[mode] = [];
          certs[mode].push({ accuracy, score, date });
          CertStore.setCerts(certs);

          // Show result banner
          injectCertBanner(mode, accuracy, score, null);
        }, 900);
      }
    } else {
      // Infinite mode: milestone-based
      setTimeout(() => {
        const d = CertStore._load();
        const certs = d.certificates || {};
        if (!certs.infinite) certs.infinite = [];

        const newMilestones = [];
        INFINITE_MILESTONES.forEach(level => {
          const alreadyEarned = certs.infinite.some(e => e.level === level);
          if (questions >= level && !alreadyEarned) {
            const entry = { level, accuracy: accuracy || 0, score: score || 0, date };
            certs.infinite.push(entry);
            newMilestones.push(entry);
          }
        });

        if (newMilestones.length) {
          CertStore.setCerts(certs);
          newMilestones.forEach((entry, i) => {
            setTimeout(() => {
              injectCertBanner("infinite", entry.accuracy, entry.score, entry.level);
            }, i * 600);
          });
        }
      }, 900);
    }
  },

  /** Show certificate for a past session from anywhere */
  showCert(mode, accuracy, score) {
    showCertificateModal(mode, accuracy, score);
  },

  /** Render badges panel inside the stats tab */
  renderBadgesPanel(containerEl) {
    if (!containerEl) return;
    const earned = CertStore.getBadges();
    containerEl.innerHTML = `
      <div class="apex-badges-section">
        <div class="apex-badges-section-label">🏅 Achievements (${earned.length}/${BADGES_DEF.length})</div>
        <div class="apex-badges-grid">
          ${BADGES_DEF.map(def => {
            const isEarned = earned.includes(def.id);
            const rar = RARITY_CONFIG[def.rarity] || RARITY_CONFIG.bronze;
            return `
              <div class="apex-badge-pill ${isEarned ? "earned" : "locked"}"
                   style="${isEarned ? `--badge-col:${rar.bg};--badge-glow-col:${rar.glow};` : ""}"
                   title="${def.name}: ${def.desc}">
                <div class="apex-badge-pill-icon">${isEarned ? def.icon : "🔒"}</div>
                <div class="apex-badge-pill-name">${def.name}</div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  },
};

/* ─────────────────────────────────────────────
   12.  AUTO-HOOK: intercept script.js results
   This listens for a custom event fired by script.js
   OR we directly patch if script.js supports it via
   window.ApexCertHook
───────────────────────────────────────────── */
window.addEventListener("apex:sessionComplete", function(e) {
  if (e.detail) window.ApexCertSystem.onSessionComplete(e.detail);
});
