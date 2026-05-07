
"use strict";

/* ══════════════════════════════════════════════
   QUESTION BANK — assembled from separate mode files
   easy.js · medium.js · hard.js · infinite.js
══════════════════════════════════════════════ */
const QUESTION_BANK = {
  easy:
    typeof EASY_QUESTIONS !== "undefined"
      ? EASY_QUESTIONS
      : { tier1: [], tier2: [], tier3: [] },
  medium:
    typeof MEDIUM_QUESTIONS !== "undefined"
      ? MEDIUM_QUESTIONS
      : { tier1: [], tier2: [], tier3: [] },
  hard:
    typeof HARD_QUESTIONS !== "undefined"
      ? HARD_QUESTIONS
      : { tier1: [], tier2: [], tier3: [] },
  impossible:
    typeof IMPOSSIBLE_QUESTIONS !== "undefined"
      ? IMPOSSIBLE_QUESTIONS
      : { tier1: [], tier2: [], tier3: [] },
  infinite:
    typeof INFINITE_QUESTIONS !== "undefined"
      ? INFINITE_QUESTIONS
      : { tier1: [], tier2: [], tier3: [] },
};

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
function $(id) {
  return document.getElementById(id);
}

/* ═══════════════════════════════════════════
   SNOW SYSTEM — Freeze power-up snowflakes
═══════════════════════════════════════════ */
const SnowSystem = (() => {
  let canvas,
    ctx,
    flakes = [],
    raf = null,
    active = false;

  function init() {
    canvas = document.getElementById("snow-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomFlake() {
    return {
      x: Math.random() * window.innerWidth,
      y: -10 - Math.random() * 60,
      r: 3 + Math.random() * 6,
      speed: 1.2 + Math.random() * 2.4,
      drift: (Math.random() - 0.5) * 0.8,
      opacity: 0.5 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      twinkle: Math.random() * Math.PI * 2,
    };
  }

  function spawn(n) {
    for (let i = 0; i < n; i++) flakes.push(randomFlake());
  }

  function tick() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (flakes.length < 120 && Math.random() < 0.45) flakes.push(randomFlake());
    flakes = flakes.filter((f) => f.y < canvas.height + 20);
    for (const f of flakes) {
      f.wobble += f.wobbleSpeed;
      f.twinkle += 0.04;
      f.x += f.drift + Math.sin(f.wobble) * 0.6;
      f.y += f.speed;
      const alpha = f.opacity * (0.75 + 0.25 * Math.sin(f.twinkle));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(135,206,235,${alpha})`;
      ctx.fillStyle = `rgba(135,206,235,${alpha * 0.6})`;
      ctx.lineWidth = 1.2;
      ctx.translate(f.x, f.y);
      for (let arm = 0; arm < 6; arm++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -f.r);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -f.r * 0.55);
        ctx.lineTo(f.r * 0.25, -f.r * 0.78);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -f.r * 0.55);
        ctx.lineTo(-f.r * 0.25, -f.r * 0.78);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, f.r * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (!canvas) init();
    if (active) return;
    active = true;
    flakes = [];
    spawn(30);
    canvas.classList.add("active");
    tick();
  }

  function stop() {
    active = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    if (canvas) {
      canvas.classList.remove("active");
      setTimeout(() => {
        if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
        flakes = [];
      }, 420);
    }
  }

  return { start, stop, init };
})();

/* ═══════════════════════════════════════════
   ANIM FX — End & Next button animations
═══════════════════════════════════════════ */
const AnimFX = (() => {
  function fireClass(el, cls, duration) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), duration);
  }
  function overlayBurst(id, duration) {
    const ov = document.getElementById(id);
    if (!ov) return;
    ov.classList.remove("animate");
    void ov.offsetWidth;
    ov.classList.add("animate");
    setTimeout(() => ov.classList.remove("animate"), duration);
  }
  function onEnd() {
    fireClass(document.getElementById("btn-end"), "end-firing", 500);
    fireClass(document.getElementById("screen-game"), "end-flash", 550);
    overlayBurst("end-fx-overlay", 700);
  }
  function onNext() {
    fireClass(document.getElementById("btn-next"), "next-firing", 400);
    overlayBurst("next-fx-overlay", 500);
  }
  return { onEnd, onNext };
})();

/* ══════════════════════════════════════════════
   MODULE: ParticleSystem
   Canvas-based celebration particles
══════════════════════════════════════════════ */
const ParticleSystem = (() => {
  let canvas = null,
    ctx = null,
    particles = [],
    rafId = null;

  function init() {
    canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function burst(x, y, color = "#6c63ff", count = 28) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 3 + Math.random() * 5,
        color,
        alpha: 1,
        decay: 0.018 + Math.random() * 0.012,
        gravity: 0.15,
      });
    }
    if (!rafId) loop();
  }

  function correctBurst() {
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#6c63ff";
    const cx = window.innerWidth / 2,
      cy = window.innerHeight * 0.4;
    burst(cx, cy, accent, 40);
    burst(cx - 80, cy + 20, "#22c55e", 15);
    burst(cx + 80, cy + 20, "#fbbf24", 15);
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => p.alpha > 0.01);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (particles.length > 0) rafId = requestAnimationFrame(loop);
    else rafId = null;
  }

  return { init, correctBurst, burst };
})();

/* ══════════════════════════════════════════════
   MODULE: StorageSystem
══════════════════════════════════════════════ */
const StorageSystem = (() => {
  const KEY = "apex_v5";
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  }
  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }
  function get(k, def) {
    const d = load();
    return k in d ? d[k] : def;
  }
  function set(k, v) {
    const d = load();
    d[k] = v;
    save(d);
  }
  function resetAll() {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }
  return { get, set, resetAll };
})();

/* ══════════════════════════════════════════════
   MODULE: SoundSystem
══════════════════════════════════════════════ */
const SoundSystem = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function setMuted(v) {
    muted = v;
  }
  function isMuted() {
    return muted;
  }

  function tone(freq, dur, type = "sine", vol = 0.25, decay = true) {
    if (muted) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, c.currentTime);
      if (decay)
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + dur + 0.05);
    } catch {}
  }

  function playCorrect() {
    if (muted) return;
    [523.25, 659.25, 783.99].forEach((f, i) =>
      setTimeout(() => tone(f, 0.18, "sine", 0.22), i * 60),
    );
  }
  function playWrong() {
    if (muted) return;
    tone(220, 0.25, "sawtooth", 0.18);
    setTimeout(() => tone(196, 0.3, "sawtooth", 0.15), 80);
  }
  function playTick() {
    if (!muted) tone(880, 0.06, "square", 0.08, true);
  }
  function playCrit() {
    if (!muted) tone(1200, 0.06, "square", 0.12, true);
  }
  function playTimeout() {
    if (!muted) tone(150, 0.6, "sawtooth", 0.2);
  }
  function playCountdownTick() {
    if (!muted) tone(660, 0.1, "sine", 0.3);
  }
  function playCountdownGo() {
    if (muted) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      setTimeout(() => tone(f, 0.2, "sine", 0.3), i * 60),
    );
  }
  function playPowerUp() {
    if (muted) return;
    [440, 880].forEach((f, i) =>
      setTimeout(() => tone(f, 0.12, "sine", 0.2), i * 80),
    );
  }
  function playCombo(multiplier) {
    if (muted) return;
    const freq = 440 + multiplier * 80;
    tone(freq, 0.15, "sine", 0.25);
    setTimeout(() => tone(freq * 1.5, 0.12, "sine", 0.2), 100);
  }

  return {
    setMuted,
    isMuted,
    playCorrect,
    playWrong,
    playTick,
    playCrit,
    playTimeout,
    playCountdownTick,
    playCountdownGo,
    playPowerUp,
    playCombo,
  };
})();

/* ══════════════════════════════════════════════
   MODULE: EventSystem
══════════════════════════════════════════════ */
const EventSystem = (() => {
  const subs = {};
  return {
    on(e, fn) {
      (subs[e] = subs[e] || []).push(fn);
    },
    emit(e, d) {
      (subs[e] || []).forEach((fn) => fn(d));
    },
  };
})();

/* ══════════════════════════════════════════════
   MODULE: ScreenEffect
══════════════════════════════════════════════ */
const ScreenEffect = (() => {
  const FX = ["fx-correct", "fx-wrong", "fx-timeout", "fx-freeze", "fx-skip"];
  let freezeTimer = null;

  function _overlay() {
    return document.getElementById("apex-fx-overlay");
  }
  function _reset() {
    const ov = _overlay();
    if (!ov) return;
    ov.classList.remove(...FX);
    document.body.classList.remove("fx-freeze-shake");
    document.getElementById("screen-game")?.classList.remove("fx-skip-screen");
    void ov.offsetWidth;
    ov.style.opacity = "0";
    if (freezeTimer) {
      clearTimeout(freezeTimer);
      freezeTimer = null;
    }
  }
  function set(state) {
    _reset();
    const ov = _overlay();
    if (!ov || !state) return;
    ov.style.opacity = "";
    ov.classList.add("fx-" + state);
    if (state === "freeze") document.body.classList.add("fx-freeze-shake");
    if (state === "skip")
      document.getElementById("screen-game")?.classList.add("fx-skip-screen");
  }
  function clear() {
    _reset();
  }
  return { set, clear };
})();

/* ══════════════════════════════════════════════
   MODULE: ReviewLog
══════════════════════════════════════════════ */
const ReviewLog = (() => {
  let log = [];
  function reset() {
    log = [];
  }
  function record(q, userAnswer, status) {
    log.push({
      q: q.q,
      cat: q.cat,
      ans: q.ans,
      exp: q.exp || "",
      image: q.image || null,
      userAnswer,
      status,
    });
  }
  function getAll() {
    return log.slice();
  }
  return { reset, record, getAll };
})();

/* ══════════════════════════════════════════════
   MODULE: GameState
══════════════════════════════════════════════ */
const GameState = (() => {
  const DIFFS = ["easy", "medium", "hard", "impossible"];
  const MAX_HEALTH = 5;
  let state = {};

  function reset(mode, questionLimit) {
    state = {
      mode,
      questionLimit,
      score: 0,
      attempted: 0,
      correct: 0,
      combo: 0,
      multiplier: 1,
      health: MAX_HEALTH,
      wrongSinceLastPenalty: 0,
      streak: 0,
      diffIndex:
        mode === "easy"
          ? 0
          : mode === "medium"
            ? 1
            : mode === "hard"
              ? 2
              : mode === "impossible"
                ? 3
                : 0,
      tier: 1,
      running: false,
      usedQuestions: {},
      powerUps: { freeze: true, fifty: true, skip: true },
      bestStreak: 0,
      bestMultiplier: 1,
    };
    DIFFS.forEach((d) => {
      [1, 2, 3].forEach((t) => {
        state.usedQuestions[`${d}-${t}`] = new Set();
      });
    });
    ReviewLog.reset();
  }

  function get() {
    return state;
  }
  function addScore(pts) {
    state.score += pts * state.multiplier;
  }

  function onCorrect() {
    state.correct++;
    state.attempted++;
    state.combo++;
    state.streak++;
    state.multiplier = 1 + Math.floor(state.combo / 3);
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    if (state.multiplier > state.bestMultiplier)
      state.bestMultiplier = state.multiplier;
    if (state.streak >= 2) state.tier = clamp(state.tier + 1, 1, 3);
    if (state.mode === "infinite" && state.streak > 0 && state.streak % 4 === 0)
      state.diffIndex = clamp(state.diffIndex + 1, 0, 3);
  }

  function onWrong() {
    state.attempted++;
    state.combo = 0;
    state.multiplier = 1;
    state.streak = 0;
    state.tier = clamp(state.tier - 1, 1, 3);
    state.wrongSinceLastPenalty++;
    if (state.wrongSinceLastPenalty >= 2) {
      state.health = Math.max(0, state.health - 1);
      state.wrongSinceLastPenalty = 0;
      return true;
    }
    return false;
  }

  function markUsed(diff, tier, idx) {
    state.usedQuestions[`${diff}-${tier}`].add(idx);
  }
  function isUsed(diff, tier, idx) {
    return state.usedQuestions[`${diff}-${tier}`].has(idx);
  }
  function resetPool(diff, tier) {
    state.usedQuestions[`${diff}-${tier}`].clear();
  }
  function getDiff() {
    return DIFFS[state.diffIndex];
  }
  function getTier() {
    return state.tier;
  }
  function isLimitReached() {
    return (
      state.questionLimit !== null && state.attempted >= state.questionLimit
    );
  }

  return {
    reset,
    get,
    addScore,
    onCorrect,
    onWrong,
    markUsed,
    isUsed,
    resetPool,
    getDiff,
    getTier,
    isLimitReached,
  };
})();

/* ══════════════════════════════════════════════
   MODULE: QuestionEngine
══════════════════════════════════════════════ */
const QuestionEngine = (() => {
  let current = null,
    shuffledOpts = [];

  function pick() {
    const diff = GameState.getDiff();
    const tier = GameState.getTier();
    const pool = QUESTION_BANK[diff] && QUESTION_BANK[diff][`tier${tier}`];
    if (!pool || !pool.length) return pickFallback(diff);
    let unused = pool
      .map((_, i) => i)
      .filter((i) => !GameState.isUsed(diff, tier, i));
    if (!unused.length) {
      GameState.resetPool(diff, tier);
      unused = pool.map((_, i) => i);
    }
    const idx = unused[Math.floor(Math.random() * unused.length)];
    GameState.markUsed(diff, tier, idx);
    current = { ...pool[idx], diff, tier };
    shuffledOpts = shuffle(current.opts);
    return current;
  }

  function pickFallback(diff) {
    const pool = (QUESTION_BANK[diff] || QUESTION_BANK.easy).tier1;
    const idx = Math.floor(Math.random() * pool.length);
    current = { ...pool[idx], diff, tier: 1 };
    shuffledOpts = shuffle(current.opts);
    return current;
  }

  function getCurrent() {
    return current;
  }
  function getShuffledOpts() {
    return shuffledOpts;
  }
  function isCorrect(txt) {
    return current && txt === current.ans;
  }
  return { pick, getCurrent, getShuffledOpts, isCorrect };
})();

/* ══════════════════════════════════════════════
   MODULE: TimerSystem
══════════════════════════════════════════════ */
const TimerSystem = (() => {
  let rafId = null,
    startTime = null,
    duration = 0;
  let frozen = false,
    frozenUntil = 0,
    onExpire = null;
  let lastTickSecond = -1,
    lowTimeFlashDone = false;

  const bar = $("timer-bar");
  const label = $("timer-label");
  const DURATIONS = {
    easy: 20000,
    medium: 60000,
    hard: 90000,
    impossible: 120000,
    infinite: 30000,
  };

  function stopLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function start(mode, cb) {
    stopLoop();
    frozen = false;
    frozenUntil = 0;
    onExpire = cb;
    lastTickSecond = -1;
    lowTimeFlashDone = false;
    duration = DURATIONS[mode] || 30000;
    startTime = performance.now();
    loop(startTime);
  }

  function loop(now) {
    if (frozen) {
      if (now >= frozenUntil) {
        startTime += now - frozenUntil;
        frozen = false;
      } else {
        rafId = requestAnimationFrame(loop);
        return;
      }
    }
    const elapsed = now - startTime;
    const remaining = duration - elapsed;
    const pct = clamp(remaining / duration, 0, 1);

    bar.style.width = pct * 100 + "%";
    label.textContent = Math.max(0, remaining / 1000).toFixed(1);

    bar.classList.remove("warn", "crit");
    if (pct < 0.2) bar.classList.add("crit");
    else if (pct < 0.45) bar.classList.add("warn");

    const secRemaining = Math.ceil(remaining / 1000);
    if (pct < 0.2 && secRemaining !== lastTickSecond) {
      lastTickSecond = secRemaining;
      SoundSystem.playCrit();
    } else if (pct < 0.4 && pct >= 0.2 && secRemaining !== lastTickSecond) {
      lastTickSecond = secRemaining;
      SoundSystem.playTick();
    }

    if (!lowTimeFlashDone && remaining <= 5000 && remaining > 0) {
      lowTimeFlashDone = true;
      if (typeof ScreenEffect !== "undefined") {
        ScreenEffect.set("timeout");
        setTimeout(() => {
          if (typeof ScreenEffect !== "undefined") ScreenEffect.clear();
        }, 1500);
      }
    }

    if (remaining <= 0) {
      bar.style.width = "0%";
      label.textContent = "0.0";
      rafId = null;
      if (typeof onExpire === "function") onExpire();
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    stopLoop();
    lowTimeFlashDone = true;
    bar.style.width = "0%";
    label.textContent = "—";
    bar.classList.remove("warn", "crit");
  }
  function freeze(ms) {
    frozen = true;
    frozenUntil = performance.now() + ms;
  }
  function halfTime() {
    if (startTime === null) return;
    const now = performance.now();
    const elapsed = now - startTime;
    duration = elapsed + (duration - elapsed) * 0.5;
  }
  return { start, stop, freeze, halfTime };
})();

/* ══════════════════════════════════════════════
   MODULE: DifficultyEngine
══════════════════════════════════════════════ */
const DifficultyEngine = (() => {
  const modeLabels = {
    easy: "EASY",
    medium: "MED",
    hard: "HARD",
    impossible: "💀 IMP",
    infinite: "∞ INF",
  };
  return { getModeLabel: (m) => modeLabels[m] || m.toUpperCase() };
})();

/* ══════════════════════════════════════════════
   MODULE: PowerUpSystem
══════════════════════════════════════════════ */
const PowerUpSystem = (() => {
  function useFreeze() {
    const st = GameState.get();
    if (!st.powerUps.freeze || !st.running) return;
    st.powerUps.freeze = false;
    $("pu-freeze").classList.add("used");
    TimerSystem.freeze(5000);
    SoundSystem.playPowerUp();
    ScreenEffect.set("freeze");
    // ── Snow & glow animations ──
    SnowSystem.start();
    $("pu-freeze").classList.add("freeze-active");
    setTimeout(() => {
      ScreenEffect.clear();
      SnowSystem.stop();
      $("pu-freeze").classList.remove("freeze-active");
    }, 5000);
    UIController.flashFeedback("❄ FROZEN +5s", "correct-msg");
  }

  function useFifty() {
    const st = GameState.get();
    if (!st.powerUps.fifty || !st.running) return;
    st.powerUps.fifty = false;
    $("pu-fifty").classList.add("used");
    SoundSystem.playPowerUp();
    const q = QuestionEngine.getCurrent();
    const opts = QuestionEngine.getShuffledOpts();
    const wrongPool = opts.filter((o) => o !== q.ans);
    const toElim = shuffle(wrongPool).slice(0, 2);
    document.querySelectorAll(".opt-btn").forEach((btn) => {
      if (toElim.includes(btn.dataset.optVal)) {
        btn.classList.add("eliminated");
        btn.disabled = true;
      }
    });
  }

  function useSkip() {
    const st = GameState.get();
    if (!st.powerUps.skip || !st.running) return;
    st.powerUps.skip = false;
    $("pu-skip").classList.add("used");
    SoundSystem.playPowerUp();
    const q = QuestionEngine.getCurrent();
    if (q) ReviewLog.record(q, "—", "skip");
    ScreenEffect.set("skip");
    TimerSystem.stop();
    EventSystem.emit("next_question", { skipped: true });
  }

  return { useFreeze, useFifty, useSkip };
})();

/* ══════════════════════════════════════════════
   MODULE: UIController
══════════════════════════════════════════════ */
const UIController = (() => {
  const LABELS = ["A", "B", "C", "D"];
  const MODE_THEMES = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
    impossible: "impossible",
    infinite: "infinite",
  };
  const MODE_TAG_CLS = {
    easy: "q-tag-easy",
    medium: "q-tag-medium",
    hard: "q-tag-hard",
    impossible: "q-tag-impossible",
    infinite: "q-tag-infinite",
  };

  function applyModeTheme(mode) {
    document.documentElement.setAttribute(
      "data-mode",
      MODE_THEMES[mode] || "default",
    );
    // Mode-specific color theming
    const modeColors = {
      easy: "#22c55e",
      medium: "#f59e0b",
      hard: "#ef4444",
      impossible: "#e11d48",
      infinite: "#8b5cf6",
    };
    const color = modeColors[mode];
    if (color) {
      const root = document.documentElement;
      root.style.setProperty("--mode-accent", color);
      root.style.setProperty("--mode-accent-glow", color + "30");
    }
    // Persist last mode so about.html can read it
    try {
      const KEY = "apex_v5";
      const d = JSON.parse(localStorage.getItem(KEY)) || {};
      d.lastMode = mode;
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch(e) {}
  }

  function showScreen(id) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((s) => {
      s.classList.remove("active", "screen-exit");
      s.style.display = "none";
    });
    const el = $(id);
    if (!el) return;
    el.style.display = "flex";
    void el.offsetWidth;
    el.classList.add("active");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  }

  function renderQuestion(q, opts) {
    const qt = $("question-text");
    qt.style.animation = "none";
    void qt.offsetWidth;
    qt.style.animation = "";
    qt.textContent = q.q;
    $("q-category").textContent = q.cat;

    // Render optional question image / graph
    let imgWrap = $("q-image-wrap");
    if (q.image) {
      if (!imgWrap) {
        imgWrap = document.createElement("div");
        imgWrap.id = "q-image-wrap";
        imgWrap.className = "q-image-wrap";
        qt.parentNode.insertBefore(imgWrap, qt.nextSibling);
      }
      if (q.image.type === "svg") {
        imgWrap.innerHTML = q.image.src;
      } else {
        imgWrap.innerHTML = `<img src="${q.image.src}" alt="Graph" class="q-graph-img" />`;
      }
      imgWrap.style.display = "";
    } else {
      if (imgWrap) imgWrap.style.display = "none";
    }

    const st = GameState.get();
    $("q-streak").textContent = st.streak >= 2 ? `🔥 ${st.streak} STREAK` : "";
    const modeTag = $("q-mode-tag");
    modeTag.textContent = DifficultyEngine.getModeLabel(st.mode);
    modeTag.className = `q-mode-badge ${MODE_TAG_CLS[st.mode] || ""}`;

    document.querySelectorAll(".opt-btn").forEach((btn, i) => {
      btn.style.animation = "none";
      void btn.offsetWidth;
      btn.style.animation = "";
      btn.setAttribute("data-label", LABELS[i]);
      btn.dataset.optVal = opts[i] !== undefined ? opts[i] : "";
      btn.className = "opt-btn";
      btn.disabled = false;
      btn.style.display = opts[i] !== undefined ? "" : "none";
      btn.innerHTML = `<span class="opt-label-badge">${LABELS[i]}</span><span class="opt-btn-text">${opts[i] || ""}</span>`;
      // staggered entrance animation
      btn.style.setProperty("--delay", `${i * 0.07}s`);
    });
    hideExplanation();
  }

  function markAnswer(selectedBtn, isCorrect, correctAns) {
    document.querySelectorAll(".opt-btn").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.optVal === correctAns) {
        btn.classList.add("correct");
      } else if (btn === selectedBtn && !isCorrect) {
        btn.classList.add("wrong");
      }
    });
  }

  function showExplanation(q, isCorrect, isTimeout, pts, userAns) {
    const panel = $("explanation-panel");
    const icon = $("exp-icon"),
      verdictText = $("exp-verdict"),
      ptsEl = $("exp-points");

    if (isTimeout) {
      icon.textContent = "⏰";
      verdictText.textContent = "TIME'S UP!";
      verdictText.className = "exp-verdict-text v-timeout";
      ptsEl.textContent = "0 pts";
      ptsEl.className = "exp-pts";
    } else if (isCorrect) {
      icon.textContent = "✓";
      verdictText.textContent = "CORRECT!";
      verdictText.className = "exp-verdict-text v-correct";
      ptsEl.textContent = `+${pts} pts`;
      ptsEl.className = "exp-pts pts-positive";
    } else {
      icon.textContent = "✗";
      verdictText.textContent = "WRONG";
      verdictText.className = "exp-verdict-text v-wrong";
      ptsEl.textContent = "0 pts";
      ptsEl.className = "exp-pts";
    }

    $("exp-correct-ans").textContent = q.ans;
    const yourEl = $("exp-your-ans");
    yourEl.textContent = userAns || "—";
    yourEl.style.color = isCorrect
      ? "var(--green)"
      : isTimeout
        ? "var(--yellow)"
        : "var(--red)";
    $("exp-body").innerHTML = q.exp || "No explanation available.";

    // Show graph image inside explanation panel if present
    let expImgWrap = $("exp-image-wrap");
    if (q.image) {
      if (!expImgWrap) {
        expImgWrap = document.createElement("div");
        expImgWrap.id = "exp-image-wrap";
        expImgWrap.className = "exp-image-wrap";
        const expBody = $("exp-body");
        expBody.parentNode.insertBefore(expImgWrap, expBody);
      }
      expImgWrap.innerHTML =
        q.image.type === "svg"
          ? q.image.src
          : `<img src="${q.image.src}" alt="Graph" class="q-graph-img" />`;
      expImgWrap.style.display = "";
    } else {
      if (expImgWrap) expImgWrap.style.display = "none";
    }

    panel.classList.remove("hidden");
    panel.style.animation = "none";
    void panel.offsetWidth;
    panel.style.animation = "";
    $("powerups-bar").style.display = "none";
    // Trigger side-by-side layout
    const mainRow = document.querySelector(".game-main-row");
    if (mainRow) mainRow.classList.add("exp-visible");
  }

  function hideExplanation() {
    $("explanation-panel").classList.add("hidden");
    $("powerups-bar").style.display = "";
    // Remove side-by-side layout
    const mainRow = document.querySelector(".game-main-row");
    if (mainRow) mainRow.classList.remove("exp-visible");
  }

  function flashFeedback(msg, cls) {
    const el = $("feedback");
    el.textContent = msg;
    el.className = `feedback ${cls}`;
    el.classList.remove("hidden");
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
    setTimeout(() => el.classList.add("hidden"), 820);
  }

  function updateHUD() {
    const st = GameState.get();
    $("hud-score").textContent = st.score;
    const comboEl = $("hud-combo");
    comboEl.textContent = `×${st.multiplier}`;
    if (st.multiplier > 1) {
      comboEl.classList.remove("pop");
      void comboEl.offsetWidth;
      comboEl.classList.add("pop");
    }
    const total = st.questionLimit
      ? `${st.attempted + 1}/${st.questionLimit}`
      : `${st.attempted + 1}/∞`;
    $("hud-qprogress").textContent = total;
    $("hud-mode").textContent = DifficultyEngine.getModeLabel(st.mode);
    $("hud-tier").textContent = st.tier;
    document.querySelectorAll(".heart").forEach((h, i) => {
      if (i >= st.health && !h.classList.contains("breaking")) {
        h.classList.add("lost");
      }
    });
    applyHeartCrackState();
  }

  function pulseHeart(healthLeft) {
    const hearts = document.querySelectorAll(".heart");
    // The heart that was just "pending crack" is index = healthLeft (it will soon be lost or already pending)
    // wrongSinceLastPenalty tells us the state:
    // After onWrong: if it returned false → 1st wrong → crack the next-to-lose heart
    //               if it returned true  → 2nd wrong → break that heart (it's now lost)
    const st = GameState.get();
    // The heart that just broke is index = healthLeft (was hearts[healthLeft] before health decremented)
    // In all cases pulseHeart is called when a heart is LOST (lost=true from onWrong)
    // So we animate breaking on hearts[healthLeft] (this is now .lost)
    if (hearts[healthLeft]) {
      const h = hearts[healthLeft];
      h.classList.remove("cracked", "crack-shake");
      void h.offsetWidth;
      h.classList.add("breaking");
      setTimeout(() => {
        h.classList.remove("breaking");
        h.classList.add("lost");
      }, 700);
    }
    // After breaking, the NEXT heart to be endangered is hearts[healthLeft - 1]
    // Mark it as cracked (warning state) if it exists
    const nextAtRisk = healthLeft - 1;
    if (
      nextAtRisk >= 0 &&
      hearts[nextAtRisk] &&
      !hearts[nextAtRisk].classList.contains("lost")
    ) {
      // Don't pre-crack here — cracking happens on the FIRST wrong of the next pair
    }
  }

  // Track wrong count for crack-before-break visual
  function applyHeartCrackState() {
    const st = GameState.get();
    const hearts = document.querySelectorAll(".heart");
    // wrongSinceLastPenalty === 1 means 1st wrong: crack the heart at index = health - 1
    // (the one that will break on next wrong)
    if (st.wrongSinceLastPenalty === 1) {
      const atRisk = st.health - 1;
      if (
        atRisk >= 0 &&
        hearts[atRisk] &&
        !hearts[atRisk].classList.contains("lost")
      ) {
        hearts[atRisk].classList.remove("breaking");
        hearts[atRisk].classList.add("cracked", "crack-shake");
      }
    } else {
      // Clear cracked state from all non-lost hearts
      hearts.forEach((h) => {
        if (
          !h.classList.contains("lost") &&
          !h.classList.contains("breaking")
        ) {
          h.classList.remove("cracked", "crack-shake");
        }
      });
    }
  }

  function triggerGlitch() {
    document.body.classList.remove("glitch");
    void document.body.offsetWidth;
    document.body.classList.add("glitch");
    setTimeout(() => document.body.classList.remove("glitch"), 450);
  }

  function showPressureBanner(show) {
    const b = $("pressure-banner");
    if (show) b.classList.remove("hidden");
    else b.classList.add("hidden");
  }

  // ── COMBO CELEBRATION ───────────────────────
  function triggerComboEffect(multiplier) {
    if (multiplier < 2) return;
    const comboEl = $("hud-combo");
    comboEl.classList.add("combo-celebrate");
    setTimeout(() => comboEl.classList.remove("combo-celebrate"), 600);
    SoundSystem.playCombo(multiplier);
    // Show big combo popup
    const popup = document.createElement("div");
    popup.className = "combo-popup";
    popup.textContent = `×${multiplier} COMBO!`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  }

  // ── RESULT SCREEN ───────────────────────────
  function showResult(st) {
    showScreen("screen-result");
    const pct =
      st.attempted > 0 ? Math.round((st.correct / st.attempted) * 100) : 0;

    const fill = $("hero-fill"),
      pctEl = $("result-pct");
    const C = 314.16;
    fill.style.strokeDashoffset = C;
    pctEl.textContent = "0%";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        fill.style.strokeDashoffset = C - (pct / 100) * C;
        let n = 0;
        const step = Math.ceil(pct / 40);
        const iv = setInterval(() => {
          n = Math.min(n + step, pct);
          pctEl.textContent = n + "%";
          if (n >= pct) clearInterval(iv);
        }, 28);
      }),
    );

    const badge = $("result-mode-badge");
    badge.textContent = DifficultyEngine.getModeLabel(st.mode);
    badge.className = `result-mode-badge ${MODE_TAG_CLS[st.mode] || ""}`;

    const ranks = [
      [90, "🏆 APEX TIER — LEGENDARY"],
      [75, "⭐ ELITE — EXCEPTIONAL"],
      [60, "✦ PROFICIENT — SOLID"],
      [40, "◈ INTERMEDIATE — KEEP GOING"],
      [0, "◉ NOVICE — TRAIN HARDER"],
    ];
    const rank = ranks.find(([m]) => pct >= m);
    $("res-rank").textContent = rank ? rank[1] : "—";
    $("res-score").textContent = st.score;
    $("res-attempted").textContent = st.attempted;
    $("res-correct").textContent = st.correct;
    $("res-health").textContent = `${st.health}/5`;

    const prevBest = StorageSystem.get("bestScore_" + st.mode, 0);
    if (st.score > prevBest)
      StorageSystem.set("bestScore_" + st.mode, st.score);

    const log = ReviewLog.getAll();
    renderPerformance(st, pct, log);
    renderOverview(pct, st, log);
    renderReviewList(log);

    // Celebration particles for good scores
    if (pct >= 70) {
      setTimeout(() => ParticleSystem.correctBurst(), 500);
    }

    // ── Phase 2: Fire certificate & badge system ──
    setTimeout(() => {
      const sessionPayload = {
        mode:            st.mode,
        accuracy:        pct,
        score:           st.score,
        correct:         st.correct,
        attempted:       st.attempted,
        health:          st.health,
        bestStreak:      st.bestStreak   || 0,
        bestMultiplier:  st.bestMultiplier || 1,
        powerUpsUsed:    (st.usedFreeze  ? 1 : 0) +
                         (st.usedHalf    ? 1 : 0) +
                         (st.usedSkip    ? 1 : 0),
        speedAnswers:    st.speedAnswers  || 0,
      };
      window.dispatchEvent(new CustomEvent("apex:sessionComplete", { detail: sessionPayload }));
    }, 400);
  }

  function renderPerformance(st, pct, log) {
    const body = $("perf-fb-body");
    const items = [];
    if (pct >= 90)
      items.push({
        ico: "🎯",
        txt: `<strong>Exceptional ${pct}% accuracy!</strong> Outstanding mastery — you're in the top tier.`,
      });
    else if (pct >= 70)
      items.push({
        ico: "✅",
        txt: `<strong>Good accuracy at ${pct}%.</strong> Solid work. Review wrong answers to push toward 90%+.`,
      });
    else if (pct >= 50)
      items.push({
        ico: "⚡",
        txt: `<strong>Moderate accuracy (${pct}%).</strong> Halfway there! Focus on the concepts behind your misses.`,
      });
    else
      items.push({
        ico: "📚",
        txt: `<strong>Accuracy needs work (${pct}%).</strong> Study the explanations in the Review panel.`,
      });

    if (st.bestMultiplier > 1)
      items.push({
        ico: "🔥",
        txt: `Best combo multiplier: <strong>×${st.bestMultiplier}</strong>. Streaks multiply your score — stay sharp!`,
      });
    if (st.health === 5)
      items.push({
        ico: "❤️",
        txt: "<strong>Perfect health!</strong> You finished without losing a single life — flawless.",
      });
    else if (st.health >= 3)
      items.push({
        ico: "💛",
        txt: `<strong>${st.health}/5 hearts</strong> remaining. Strong run — avoid rushing uncertain questions.`,
      });
    else if (st.health > 0)
      items.push({
        ico: "🩸",
        txt: `Only <strong>${st.health}/5 hearts</strong> left — you survived by a thread!`,
      });
    else
      items.push({
        ico: "💔",
        txt: "<strong>Health depleted.</strong> Use Freeze and 50-50 lifelines when uncertain.",
      });

    if (st.score > 0)
      items.push({
        ico: "🏅",
        txt: `Total: <strong>${st.score} pts</strong>. Higher tiers + combo multipliers earn exponentially more.`,
      });
    if (st.bestStreak >= 3)
      items.push({
        ico: "⚡",
        txt: `Best streak: <strong>${st.bestStreak} in a row</strong>. Long streaks are the fastest way to climb.`,
      });

    const wrongCats = log
      .filter((l) => l.status === "wrong" || l.status === "timeout")
      .map((l) => l.cat);
    if (wrongCats.length >= 2) {
      const freq = {};
      wrongCats.forEach((c) => (freq[c] = (freq[c] || 0) + 1));
      const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
      if (top && top[1] >= 2)
        items.push({
          ico: "📌",
          txt: `Weakest area: <strong>${top[0]}</strong> (${top[1]} misses). Target this category.`,
        });
    }

    const timeouts = log.filter((l) => l.status === "timeout").length;
    if (timeouts >= 2)
      items.push({
        ico: "⏱",
        txt: `<strong>${timeouts} timeouts.</strong> Try eliminating obviously wrong answers first to save time.`,
      });

    const best = StorageSystem.get("bestScore_" + st.mode, 0);
    items.push({
      ico: "🏆",
      txt: `Personal best in <strong>${st.mode.toUpperCase()}</strong> mode: <strong>${best} pts</strong>.`,
    });

    body.innerHTML = items
      .map(
        (item) =>
          `<div class="perf-item"><span class="perf-ico">${item.ico}</span><span class="perf-txt">${item.txt}</span></div>`,
      )
      .join("");
  }

  function renderOverview(pct, st, log) {
    const counts = { correct: 0, wrong: 0, timeout: 0, skip: 0 };
    log.forEach((e) => (counts[e.status] = (counts[e.status] || 0) + 1));
    const total = st.attempted || 1;
    const barsEl = $("ov-bars");
    const barDefs = [
      { key: "correct", label: "CORRECT", cls: "bar-correct" },
      { key: "wrong", label: "WRONG", cls: "bar-wrong" },
      { key: "timeout", label: "TIMEOUT", cls: "bar-timeout" },
      { key: "skip", label: "SKIPPED", cls: "bar-skip" },
    ];
    barsEl.innerHTML = barDefs
      .map(({ key, label, cls }) => {
        const n = counts[key] || 0;
        const p = Math.round((n / total) * 100);
        return `<div class="ov-bar-row">
        <span class="ov-bar-label">${label}</span>
        <div class="ov-bar-track"><div class="ov-bar-fill ${cls}" data-pct="${p}" style="width:0%"></div></div>
        <span class="ov-bar-count">${n}</span></div>`;
      })
      .join("");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        barsEl
          .querySelectorAll(".ov-bar-fill")
          .forEach((b) => (b.style.width = b.dataset.pct + "%"));
      }),
    );

    const catT = {},
      catC = {};
    log.forEach((e) => {
      catT[e.cat] = (catT[e.cat] || 0) + 1;
      if (e.status === "correct") catC[e.cat] = (catC[e.cat] || 0) + 1;
    });
    const catsEl = $("ov-cats");
    const cats = Object.keys(catT);
    if (!cats.length) {
      catsEl.innerHTML =
        '<div style="font-size:10px;color:var(--muted)">No data.</div>';
    } else {
      catsEl.innerHTML = cats
        .map((cat) => {
          const t = catT[cat],
            c = catC[cat] || 0;
          const p = Math.round((c / t) * 100);
          return `<div class="ov-cat-row">
          <span class="ov-cat-name">${cat}</span>
          <div class="ov-cat-track"><div class="ov-cat-fill" data-pct="${p}" style="width:0%"></div></div>
          <span class="ov-cat-score">${c}/${t}</span></div>`;
        })
        .join("");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          catsEl
            .querySelectorAll(".ov-cat-fill")
            .forEach((f) => (f.style.width = f.dataset.pct + "%"));
        }),
      );
    }

    const bestsEl = $("ov-bests");
    const personalBest = StorageSystem.get("bestScore_" + st.mode, 0);
    bestsEl.innerHTML = [
      { label: "Best Streak", val: `${st.bestStreak} questions` },
      { label: "Best Multiplier", val: `×${st.bestMultiplier}` },
      { label: "Mode Best", val: `${personalBest} pts` },
    ]
      .map(
        (b) =>
          `<div class="ov-best-item"><span class="ov-best-label">${b.label}</span><span class="ov-best-val">${b.val}</span></div>`,
      )
      .join("");
  }

  function renderReviewList(log) {
    const container = $("review-list");
    if (!log.length) {
      container.innerHTML =
        '<div style="padding:16px;font-size:10px;color:var(--muted);text-align:center">No questions attempted.</div>';
      return;
    }
    container.innerHTML = "";
    const statusColors = {
      correct: "var(--green)",
      wrong: "var(--red)",
      timeout: "var(--yellow)",
      skip: "var(--muted)",
    };
    const statusLabels = {
      correct: "Correct ✓",
      wrong: "Wrong ✗",
      timeout: "Timed Out ⏰",
      skip: "Skipped →",
    };

    log.forEach((entry, i) => {
      const item = document.createElement("div");
      item.className = "review-item";
      const header = document.createElement("div");
      header.className = "review-item-header";
      header.innerHTML = `
        <span class="ri-num">#${String(i + 1).padStart(2, "0")}</span>
        <span class="ri-dot" style="background:${statusColors[entry.status]}"></span>
        <span class="ri-q">${entry.q}</span>
        <span class="ri-cat">${entry.cat}</span>
        <span class="ri-chev">▶</span>`;
      const body = document.createElement("div");
      body.className = "review-item-body";
      const uCls =
        entry.status === "correct"
          ? "correct"
          : entry.status === "skip"
            ? "neutral"
            : "wrong";
      body.innerHTML = `<div class="ri-inner">
        <div class="ri-ans-row">
          <div class="ri-ans-item"><span class="ri-ans-label">YOUR ANSWER</span><span class="ri-ans-val ${uCls}">${entry.userAnswer || "—"}</span></div>
          <div class="ri-ans-item"><span class="ri-ans-label">CORRECT ANSWER</span><span class="ri-ans-val correct">${entry.ans}</span></div>
          <div class="ri-ans-item"><span class="ri-ans-label">RESULT</span><span class="ri-ans-val" style="color:${statusColors[entry.status]}">${statusLabels[entry.status]}</span></div>
        </div>
        ${entry.image ? `<div class="ri-image-wrap">${entry.image.type === "svg" ? entry.image.src : `<img src="${entry.image.src}" alt="Graph" class="q-graph-img"/>`}</div>` : ""}
        <div class="ri-exp">${entry.exp || "No explanation available."}</div></div>`;
      header.addEventListener("click", () => item.classList.toggle("open"));
      item.appendChild(header);
      item.appendChild(body);
      container.appendChild(item);
    });

    requestAnimationFrame(() => {
      const firstH = container.querySelector(".review-item-header");
      if (firstH) container.style.maxHeight = firstH.offsetHeight * 10 + "px";
    });
  }

  return {
    applyModeTheme,
    showScreen,
    renderQuestion,
    markAnswer,
    showExplanation,
    hideExplanation,
    flashFeedback,
    updateHUD,
    pulseHeart,
    applyHeartCrackState,
    triggerGlitch,
    showPressureBanner,
    showResult,
    triggerComboEffect,
  };
})();

/* ══════════════════════════════════════════════
   MODULE: CountdownSystem
══════════════════════════════════════════════ */
const CountdownSystem = (() => {
  function run(modeName, startCb) {
    const overlay = $("countdown-overlay");
    const numEl = $("countdown-number");
    const modeEl = $("countdown-mode-name");
    overlay.classList.remove("hidden");
    modeEl.textContent = modeName.toUpperCase() + " MODE";
    let count = 3;
    numEl.className = "countdown-number";
    numEl.textContent = count;
    SoundSystem.playCountdownTick();

    const tick = () => {
      count--;
      if (count > 0) {
        numEl.style.animation = "none";
        void numEl.offsetWidth;
        numEl.style.animation = "";
        numEl.className = "countdown-number";
        numEl.textContent = count;
        SoundSystem.playCountdownTick();
        setTimeout(tick, 1000);
      } else {
        numEl.style.animation = "none";
        void numEl.offsetWidth;
        numEl.style.animation = "";
        numEl.className = "countdown-go";
        numEl.textContent = "GO!";
        SoundSystem.playCountdownGo();
        setTimeout(() => {
          overlay.classList.add("hidden");
          startCb();
        }, 700);
      }
    };
    setTimeout(tick, 1000);
  }
  return { run };
})();

/* ══════════════════════════════════════════════
   SETTINGS PANEL — Profile, Stats, Theme, FAQ, Feedback
══════════════════════════════════════════════ */
const SettingsController = (() => {
  const CONTACT = {
    email: "rahulnagv888@gmail.com",
    whatsapp: "9844616699",
  };

  const TIPS_DATA = {
    easy: {
      badge: "EASY",
      badgeClass: "badge-easy",
      sub: "20s timer · Beginner friendly · Build your fundamentals",
      tips: [
        {
          icon: "⏱️",
          title: "Don't Rush",
          desc: "You have <strong>20 full seconds</strong> per question. Read each option carefully before clicking — hasty answers are the #1 mistake on Easy mode.",
        },
        {
          icon: "🌿",
          title: "Build Your Streak Early",
          desc: "Easy mode is the perfect place to chain consecutive correct answers. <strong>3 in a row = ×2 multiplier</strong>. Keep the streak going for a high score.",
        },
        {
          icon: "❄️",
          title: "Save Freeze for Long Questions",
          desc: "If a question has a long text block, use <strong>Freeze (F)</strong> to pause the timer and read without pressure.",
        },
        {
          icon: "½",
          title: "Use 50-50 on Guesses",
          desc: "When genuinely unsure, activate <strong>50-50 (H)</strong> to eliminate 2 wrong choices. It converts a 25% guess into a 50% chance.",
        },
        {
          icon: "📖",
          title: "Read the Explanations",
          desc: "After every wrong answer, read the explanation panel. Easy mode is a learning ground — understanding <strong>why</strong> you were wrong is key.",
        },
        {
          icon: "❤️",
          title: "Hearts Absorb 2 Wrongs",
          desc: "You only lose a heart after <strong>2 wrong answers</strong>, not 1. So one slip-up won't cost you — but avoid back-to-back errors.",
        },
        {
          icon: "🎯",
          title: "Aim for 90% Accuracy",
          desc: "On Easy, 90%+ accuracy earns you the <strong>APEX TIER — LEGENDARY</strong> rank. Target this from your very first session.",
        },
        {
          icon: "🔢",
          title: "Start with 10 Questions",
          desc: "New players should start with 10 questions to get comfortable. Once you consistently score high, bump it up to 20 or 30.",
        },
      ],
      strategy: [
        "Pick Easy mode first — even if you feel confident. It calibrates your baseline.",
        "Focus on accuracy before speed; the timer is generous enough.",
        "Use all 3 power-ups every session to understand when they're most effective.",
        "Review the results screen after every game — the Category Breakdown reveals your weak spots.",
      ],
    },
    medium: {
      badge: "MEDIUM",
      badgeClass: "badge-medium",
      sub: "60s timer · Adaptive difficulty · For challengers",
      tips: [
        {
          icon: "⚡",
          title: "Longer Timer ≠ More Time",
          desc: "The 60-second timer sounds generous, but Medium questions are longer and require more reasoning. <strong>Pace yourself — don't stare at one question for 40 seconds.</strong>",
        },
        {
          icon: "📐",
          title: "Eliminate Wrong Options First",
          desc: "For tricky questions, mentally cross out obviously wrong answers before evaluating the remaining ones. This reduces cognitive load fast.",
        },
        {
          icon: "🔥",
          title: "Combos Are Your Main Scorer",
          desc: "At ×3 or ×4 combo, each correct answer earns <strong>3–4× base points</strong>. Protecting your streak is more valuable than answering quickly.",
        },
        {
          icon: "↷",
          title: "Skip Wisely",
          desc: "Use <strong>Skip (S)</strong> on questions where you have zero idea — it preserves your hearts and combo streak at the cost of one power-up.",
        },
        {
          icon: "🧠",
          title: "Tier System Rewards Streaks",
          desc: "Your question tier increases with streaks. Higher tiers = harder questions but also <strong>more base points</strong>. Stay sharp when questions get harder.",
        },
        {
          icon: "⚖️",
          title: "Wrong Answers Reset Your Combo",
          desc: "A single wrong answer drops your multiplier back to ×1 and resets your streak. Think before clicking when on a high combo.",
        },
        {
          icon: "💡",
          title: "Category Patterns",
          desc: "After a few games you'll notice you miss certain categories (e.g. Quantitative or Verbal). Use the <strong>Review panel</strong> to identify and focus on those.",
        },
        {
          icon: "🏆",
          title: "Score 500+ in Medium",
          desc: "To consistently crack 500 points in Medium, maintain a combo of ×3 or higher for at least half the questions. Streaks are everything.",
        },
      ],
      strategy: [
        "Aim to answer within the first 30 seconds — the last 30 are pressure.",
        "Protect your combo above all else; one wrong can cost hundreds of points.",
        "Use 50-50 to stay accurate on uncertain questions, not just to guess better.",
        "After 3 wrong answers in a row, consider skipping the next tough one to reset mentally.",
      ],
    },
    hard: {
      badge: "HARD",
      badgeClass: "badge-hard",
      sub: "90s timer · Elite level · High-pressure precision",
      tips: [
        {
          icon: "🔥",
          title: "Pressure is the Real Enemy",
          desc: "Hard mode questions are designed to be long and tricky. Your first instinct is often wrong — <strong>slow down and re-read</strong> before answering.",
        },
        {
          icon: "⏳",
          title: "90 Seconds Feels Short",
          desc: "Complex problems can eat 60+ seconds. If a question is taking too long, use <strong>50-50 (H)</strong> to narrow choices rather than guessing from 4 options.",
        },
        {
          icon: "🧮",
          title: "Work Through Calculations",
          desc: "Many Hard questions involve multi-step reasoning. <strong>Mentally (or physically) work out the answer step-by-step</strong> rather than scanning options.",
        },
        {
          icon: "❄️",
          title: "Freeze Buys Critical Time",
          desc: "On Hard mode, Freeze (F) is most valuable on calculation-heavy questions where you need 5 extra uninterrupted seconds to compute an answer.",
        },
        {
          icon: "💔",
          title: "Hearts are Precious Here",
          desc: "Mistakes compound fast. At Hard difficulty each heart lost hurts more because recovery is harder. <strong>Never guess blindly — use power-ups instead.</strong>",
        },
        {
          icon: "🎯",
          title: "Base Points are Highest",
          desc: "Hard questions award <strong>35+ base points</strong> (vs 10 on Easy). A ×3 combo on Hard can score more in one question than an entire Easy round.",
        },
        {
          icon: "📊",
          title: "Know When to Cut Losses",
          desc: "If you've already lost 2 hearts and are on a wrong streak, <strong>skip the next uncertain question</strong> to stop the bleeding and reset focus.",
        },
        {
          icon: "🏅",
          title: "Elite Benchmark: 70% Accuracy",
          desc: "Getting 70%+ accuracy on Hard mode puts you in the <strong>ELITE</strong> rank. It's a tough bar — only consistent preparation gets you there.",
        },
      ],
      strategy: [
        "Spend the first 15 seconds re-reading the question before looking at options.",
        "Use Freeze + 50-50 together on the single hardest question you face.",
        "Protect at least 3 hearts; Hard mode games with 0 hearts are rarely recoverable.",
        "Grind Hard mode even at low accuracy — the explanations teach you the most.",
      ],
    },
    impossible: {
      badge: "IMPOSSIBLE",
      badgeClass: "badge-impossible",
      sub: "15s timer · Brutal precision · No room for error",
      tips: [
        {
          icon: "💀",
          title: "15 Seconds. That's It.",
          desc: "Impossible mode gives you only <strong>15 seconds per question</strong>. There's no time to second-guess. Train yourself to read the question and identify the answer type in the first 5 seconds.",
        },
        {
          icon: "⚡",
          title: "First Instinct is Your Best Friend",
          desc: "At this speed, overthinking kills you. If you've studied the topic, <strong>your gut answer within 5 seconds is usually right</strong>. Commit fast.",
        },
        {
          icon: "💥",
          title: "Pressure Events Strike Often",
          desc: "Impossible mode triggers <strong>PRESSURE EVENTS 60% of the time</strong> — twice as often as other modes. Your remaining time can halve at any moment. Always have a fallback answer ready.",
        },
        {
          icon: "❄️",
          title: "Freeze is a Lifeline",
          desc: "On a 15-second clock, 5 extra frozen seconds is a <strong>33% time boost</strong>. Save Freeze for a question you know you can solve if you just had more time.",
        },
        {
          icon: "½",
          title: "50-50 Beats Blind Guessing",
          desc: "With no time to reason through 4 options, use <strong>50-50 (H)</strong> to cut the field in half. A 50% chance beats 25% every time — use it early in your run.",
        },
        {
          icon: "💔",
          title: "Hearts Vanish Quickly",
          desc: "Impossible questions are hard <em>and</em> fast. Wrong answers pile up. <strong>Never let your wrong count hit 2 in a row</strong> without using a power-up — losing hearts here is near-fatal.",
        },
        {
          icon: "🏆",
          title: "Score 500+ = True Mastery",
          desc: "Reaching <strong>500 points</strong> on Impossible mode is the ultimate APEX achievement. It demands speed, accuracy, and perfect power-up timing all at once.",
        },
        {
          icon: "↷",
          title: "Skip is Your Emergency Exit",
          desc: "When you have no idea and the clock is under 6 seconds, <strong>Skip (S) immediately</strong>. Don't waste a heart on a blind guess — Skip preserves your combo and hearts.",
        },
      ],
      strategy: [
        "Scan all 4 options in the first 3 seconds — eliminate the obviously wrong ones before reading the question again.",
        "Use power-ups within the first 5 questions while the pressure is lower and you're still settling in.",
        "Expect pressure events after every 3rd question — pre-commit to an answer before they trigger.",
        "If you lose 2 hearts in the first 5 questions, restart — an early deficit is nearly impossible to recover from.",
      ],
    },
    infinite: {
      badge: "INFINITE",
      badgeClass: "badge-inf",
      sub: "30s timer · Survival · Difficulty escalates every 4 corrects",
      tips: [
        {
          icon: "♾️",
          title: "Survival is the Goal",
          desc: "There's no question limit — the game ends when your <strong>5 hearts are gone</strong>. Every decision is about extending your survival, not rushing for score.",
        },
        {
          icon: "⚡",
          title: "Difficulty Escalates Dynamically",
          desc: "Every 4 correct answers in a row push the difficulty up one tier. <strong>Stay mentally ready for harder questions mid-streak</strong> — the jump can be sudden.",
        },
        {
          icon: "⏰",
          title: "30 Seconds Goes Fast",
          desc: "Infinite mode's 30-second timer is the shortest. Don't overthink. If you don't know within 15 seconds, either use a power-up or make your best guess.",
        },
        {
          icon: "⚠️",
          title: "Pressure Events Halve Your Time",
          desc: "After question 3, a random <strong>PRESSURE EVENT</strong> can cut remaining time in half. When you see the glitch effect, commit to an answer immediately.",
        },
        {
          icon: "💎",
          title: "Power-ups = Lives",
          desc: "In Infinite mode, power-ups aren't about scoring — they're about <strong>preventing heart loss</strong>. Use 50-50 and Skip to survive rounds you'd otherwise fail.",
        },
        {
          icon: "🔄",
          title: "Reset Your Mindset After a Heart Loss",
          desc: "Losing a heart on a wrong streak is demoralising. <strong>Take a breath and treat the next question as a fresh start</strong> — panicking leads to 3+ consecutive wrong answers.",
        },
        {
          icon: "📈",
          title: "Combo Multiplier Compounds Score",
          desc: "In long Infinite runs the ×4 or ×5 combo can push your score into the thousands. Protecting your streak matters far more than speed.",
        },
        {
          icon: "🏆",
          title: "The Score Target: 1000+",
          desc: "Reaching <strong>1000 points</strong> in Infinite mode is the true APEX benchmark. It requires surviving 20+ questions with a healthy combo throughout.",
        },
      ],
      strategy: [
        "Never use Skip on an easy question early — save it for Tier 3 survival situations.",
        "If you feel a pressure event coming, pre-commit to your best guess before it triggers.",
        "Heart management: 2 wrong in a row? Use 50-50 immediately on the next question.",
        "Aim to survive at least 15 questions before your first heart breaks — that's your benchmark.",
      ],
    },
  };

  const FAQ_DATA = [
    {
      q: "How is my score calculated?",
      a: "Each correct answer earns base points (10–60 depending on difficulty) multiplied by your current combo multiplier. Consecutive correct answers build your combo.",
    },
    {
      q: "What does the combo multiplier do?",
      a: "Every 3 consecutive correct answers increases your multiplier by ×1. A ×3 multiplier means each correct answer scores 3× the base points.",
    },
    {
      q: "How do I lose hearts?",
      a: "Every 2 wrong answers (or timeouts) costs you 1 heart. You start with 5 hearts. Reach 0 and the game ends in Infinite mode.",
    },
    {
      q: "What is Infinite mode?",
      a: "Infinite mode has no question limit — it runs until you lose all 5 hearts. Difficulty adapts dynamically every 4 correct answers.",
    },
    {
      q: "Can I use power-ups more than once?",
      a: "No — each power-up (Freeze, 50-50, Skip) is a one-time use per session. Use them wisely!",
    },
    {
      q: "What does the Freeze power-up do?",
      a: "Freeze (press F) pauses the timer for 5 seconds, giving you extra time to think without losing any time on the clock.",
    },
    {
      q: "Is my data stored on a server?",
      a: "No. All your profile data, scores, and settings are stored locally in your browser using localStorage. Nothing is sent to any server.",
    },
    {
      q: "How do I reset my progress?",
      a: "Open Settings → Profile tab → scroll down to DATA → press 'Reset All Progress'. This permanently deletes all saved stats.",
    },
    {
      q: "Can I change the app's color theme?",
      a: "Yes! Open Settings → Theme tab. Choose from 8 preset accent colors or pick any custom color using the color picker.",
    },
  ];

  function buildFAQ() {
    const list = $("faq-list");
    if (!list) return;
    list.innerHTML = FAQ_DATA.map(
      (f, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-q" data-faq="${i}"><span>${f.q}</span><span class="faq-chevron">▾</span></button>
        <div class="faq-a">${f.a}</div>
      </div>`,
    ).join("");
    list.querySelectorAll(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        list
          .querySelectorAll(".faq-item")
          .forEach((i) => i.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  function buildTips() {
    const content = $("tips-content");
    if (!content) return;

    // Build HTML for all 5 mode panels
    const modes = ["easy", "medium", "hard", "impossible", "infinite"];
    content.innerHTML = modes
      .map((mode) => {
        const d = TIPS_DATA[mode];
        const tipCards = d.tips
          .map(
            (t) => `
        <div class="tip-card">
          <div class="tip-icon-wrap">${t.icon}</div>
          <div class="tip-body">
            <div class="tip-title">${t.title}</div>
            <div class="tip-desc">${t.desc}</div>
          </div>
        </div>`,
          )
          .join("");
        const stratItems = d.strategy.map((s) => `<li>${s}</li>`).join("");
        return `
        <div class="tips-mode-panel${mode === "easy" ? " active" : ""}" data-tips-panel="${mode}">
          <div class="tips-mode-header">
            <span class="tips-mode-badge ${d.badgeClass}">${d.badge}</span>
            <span class="tips-mode-header-sub">${d.sub}</span>
          </div>
          ${tipCards}
          <div class="tips-strategy-box">
            <div class="tips-strategy-title">⚡ WINNING STRATEGY</div>
            <ul class="tips-strategy-list">${stratItems}</ul>
          </div>
        </div>`;
      })
      .join("");

    // Wire up mode selector buttons
    document.querySelectorAll(".tips-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.tipsMode;
        document
          .querySelectorAll(".tips-mode-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".tips-mode-panel").forEach((p) => {
          p.classList.toggle("active", p.dataset.tipsPanel === mode);
        });
        // Scroll tips content back to top on mode switch
        content.scrollTop = 0;
      });
    });
  }

  function saveProfileName() {
    const val = $("prof-name-input").value.trim();
    if (!val) return;
    StorageSystem.set("playerName", val);
    _updateAvatarName(val);
    const b = $("prof-name-save");
    if (b) b.textContent = "✓ Saved";
    setTimeout(() => {
      const btn = $("prof-name-save");
      if (btn) btn.textContent = "Save";
    }, 1200);
  }

  function _updateAvatarName(name) {
    const letter = (name || "P")[0].toUpperCase();
    ["prof-avatar", "sh-avatar"].forEach((id) => {
      const el = $(id);
      if (el) el.textContent = letter;
    });
    const dn = $("sh-display-name");
    if (dn) dn.textContent = name || "Player";
    const inp = $("prof-name-input");
    if (inp) inp.value = name || "";
    // Show profession under name in settings header and profile panel
    const prof = StorageSystem.get("playerProfession", "");
    const subEl = $("sh-profession-sub");
    if (subEl) subEl.textContent = prof || "APEX Profile";
    const profDisp = $("prof-profession-display");
    if (profDisp) profDisp.textContent = prof ? "💼 " + prof : "";
  }

  function renderProfileTab() {
    const name = StorageSystem.get("playerName", "Player");
    _updateAvatarName(name);
    const sessions = StorageSystem.get("sessions", []);
    const allBest = StorageSystem.get("globalBestScore", 0);
    const totalCorrect = sessions.reduce((s, x) => s + (x.correct || 0), 0);
    const totalAttempted = sessions.reduce((s, x) => s + (x.attempted || 0), 0);
    const avgAcc =
      totalAttempted > 0
        ? Math.round((totalCorrect / totalAttempted) * 100)
        : 0;
    const bestStreak = sessions.reduce(
      (m, x) => Math.max(m, x.bestStreak || 0),
      0,
    );
    const el = (id, val) => {
      const e = $(id);
      if (e) e.textContent = val;
    };
    el("pss-games", sessions.length);
    el("pss-best", allBest);
    el("pss-acc", avgAcc + "%");
    el("pss-streak", bestStreak);
  }

  function renderComparisonTab() {
    const sessions = StorageSystem.get("sessions", []);
    const modes = ["easy", "medium", "hard", "impossible", "infinite"];
    const grid = $("comp-mode-grid");
    if (grid) {
      grid.innerHTML = modes
        .map((m) => {
          const best = StorageSystem.get("bestScore_" + m, 0);
          const label = {
            easy: "🌿 EASY",
            medium: "⚡ MEDIUM",
            hard: "🔥 HARD",
            impossible: "💀 IMPOSSIBLE",
            infinite: "♾ INFINITE",
          }[m];
          return `<div class="comp-mode-card"><span class="cmc-mode">${label}</span><span class="cmc-score">${best}</span><span class="cmc-label">Best Score</span></div>`;
        })
        .join("");
    }
    const last10 = sessions.slice(-10);
    drawAccuracyChart(last10);
    const at = $("comp-alltime");
    if (at) {
      const totalGames = sessions.length;
      const totalCorrect = sessions.reduce((s, x) => s + (x.correct || 0), 0);
      const totalAttempted = sessions.reduce(
        (s, x) => s + (x.attempted || 0),
        0,
      );
      const totalScore = sessions.reduce((s, x) => s + (x.score || 0), 0);
      const avgAcc =
        totalAttempted > 0
          ? Math.round((totalCorrect / totalAttempted) * 100)
          : 0;
      const bestStreak = sessions.reduce(
        (m, x) => Math.max(m, x.bestStreak || 0),
        0,
      );
      const stat = (v, k) =>
        `<div class="cat-item"><span class="cat-val">${v}</span><span class="cat-key">${k}</span></div>`;
      at.innerHTML = [
        stat(totalGames, "TOTAL GAMES"),
        stat(totalScore.toLocaleString(), "TOTAL SCORE"),
        stat(avgAcc + "%", "AVG ACCURACY"),
        stat(bestStreak, "BEST STREAK"),
      ].join("");
    }
    const hist = $("comp-history");
    if (hist) {
      if (!sessions.length) {
        hist.innerHTML = `<div class="comp-empty">No sessions yet. Play a game to see your history!</div>`;
      } else {
        hist.innerHTML = sessions
          .slice()
          .reverse()
          .slice(0, 10)
          .map((s) => {
            const acc =
              s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
            const accCls = acc >= 70 ? "" : acc >= 40 ? "mid" : "low";
            const date = s.date
              ? new Date(s.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "2-digit",
                })
              : "—";
            const modeLabel =
              {
                easy: "🌿 EASY",
                medium: "⚡ MEDIUM",
                hard: "🔥 HARD",
                impossible: "💀 IMP",
                infinite: "♾ INF",
              }[s.mode] || s.mode;
            return `<div class="ch-item">
            <div class="chi-left"><span class="chi-mode">${modeLabel}</span><span class="chi-date">${date} · ${s.attempted || 0} Qs</span></div>
            <div class="chi-right"><span class="chi-score">${s.score || 0}</span><span class="chi-acc ${accCls}">${acc}%</span></div>
          </div>`;
          })
          .join("");
      }
    }
  }

  function drawAccuracyChart(sessions) {
    const canvas = $("comp-chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || 300,
      H = 100;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    if (!sessions.length) {
      ctx.fillStyle = "rgba(136,144,170,0.5)";
      ctx.font = "12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Play games to see your accuracy trend", W / 2, H / 2);
      return;
    }
    const accs = sessions.map((s) =>
      s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
    );
    const pad = 12,
      stepX = (W - pad * 2) / Math.max(accs.length - 1, 1);
    const pts = accs.map((a, i) => ({
      x: pad + i * stepX,
      y: pad + (1 - a / 100) * (H - pad * 2),
    }));
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#6c63ff";
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, accent + "55");
    grad.addColorStop(1, accent + "05");
    ctx.beginPath();
    ctx.moveTo(pts[0].x, H - pad);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, H - pad);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    pts.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
    );
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.stroke();
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.font = "bold 9px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(accs[i] + "%", p.x, Math.max(p.y - 7, 10));
    });

    // Achievements moved to achievements.html
  }

  function _getFeedbackText() {
    const type = ($("fb-type") || {}).value || "general";
    const msg = ($("fb-message") || {}).value.trim() || "(no message)";
    const typeLabel =
      {
        bug: "Bug Report",
        feature: "Feature Request",
        general: "General Feedback",
        praise: "Praise",
      }[type] || type;
    return `[APEX Feedback — ${typeLabel}]\n\n${msg}`;
  }
  function sendFeedbackEmail() {
    const body = encodeURIComponent(_getFeedbackText());
    const sub = encodeURIComponent("APEX Aptitude Engine — Feedback");
    window.open(
      `mailto:${CONTACT.email}?subject=${sub}&body=${body}`,
      "_blank",
    );
  }
  function sendFeedbackWhatsApp() {
    const text = encodeURIComponent(_getFeedbackText());
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, "_blank");
  }

  return {
    buildFAQ,
    buildTips,
    saveProfileName,
    renderProfileTab,
    renderComparisonTab,
    sendFeedbackEmail,
    sendFeedbackWhatsApp,
  };
})();

/* ══════════════════════════════════════════════
   CORE GAME CONTROLLER
══════════════════════════════════════════════ */
const Game = (() => {
  let isAnswered = false,
    nextPending = false,
    nextTimeout = null;
  let selectedMode = null,
    selectedCount = 10,
    waitingForNext = false;

  function init() {
    ParticleSystem.init();
    restoreSettings();

    document.querySelectorAll(".mode-card").forEach((card) => {
      card.addEventListener("click", () => {
        selectedMode = card.dataset.mode;
        document
          .querySelectorAll(".mode-card")
          .forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        const qblock = $("qcount-block");
        qblock.classList.toggle("hidden", selectedMode === "infinite");
        if (selectedMode !== "infinite") qblock.classList.add("active");
        UIController.applyModeTheme(selectedMode);
        const btn = $("btn-start");
        btn.disabled = false;
        btn.classList.remove("btn-disabled");
        btn.querySelector(".btn-start-text").textContent =
          `▶ START ${selectedMode.toUpperCase()} MODE`;
      });
    });

    document.querySelectorAll(".qcount-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".qcount-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCount = parseInt(btn.dataset.count, 10);
      });
    });

    $("btn-start").addEventListener("click", () => {
      if (selectedMode) CountdownSystem.run(selectedMode, startGame);
    });
    $("btn-restart").addEventListener("click", () => {
      if (selectedMode) CountdownSystem.run(selectedMode, startGame);
    });
    $("btn-home").addEventListener("click", goHome);
    $("btn-end").addEventListener("click", () => {
      AnimFX.onEnd();
      endGame();
    });
    $("btn-next").addEventListener("click", () => {
      AnimFX.onNext();
      onNextClicked();
    });

    $("pu-freeze").addEventListener("click", () => PowerUpSystem.useFreeze());
    $("pu-fifty").addEventListener("click", () => PowerUpSystem.useFifty());
    $("pu-skip").addEventListener("click", () => PowerUpSystem.useSkip());

    document
      .querySelectorAll(".opt-btn")
      .forEach((btn) => btn.addEventListener("click", () => handleAnswer(btn)));

    document.addEventListener("keydown", (e) => {
      const st = GameState.get();
      if (e.key === "Enter" && waitingForNext) {
        onNextClicked();
        return;
      }
      if (!st.running) return;
      if (e.key === "f" || e.key === "F") PowerUpSystem.useFreeze();
      if (e.key === "h" || e.key === "H") PowerUpSystem.useFifty();
      if (e.key === "s" || e.key === "S") PowerUpSystem.useSkip();
    });

    $("fab-settings").addEventListener("click", openSettings);
    $("settings-close").addEventListener("click", closeSettings);
    $("settings-overlay").addEventListener("click", (e) => {
      if (e.target === $("settings-overlay")) closeSettings();
    });

    document
      .querySelectorAll(".s-tab")
      .forEach((tab) =>
        tab.addEventListener("click", () => switchTab(tab.dataset.tab)),
      );
    $("btn-theme-toggle").addEventListener("click", toggleTheme);
    $("btn-mute-toggle").addEventListener("click", toggleMute);
    $("rules-toggle").addEventListener("click", () => {
      const open = $("rules-toggle").classList.toggle("open");
      $("rules-body").classList.toggle("open", open);
    });

    $("prof-name-save").addEventListener(
      "click",
      SettingsController.saveProfileName,
    );
    $("prof-name-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") SettingsController.saveProfileName();
    });

    $("btn-reset-data").addEventListener("click", showWarnPopup);
    $("reset-popup-cancel").addEventListener("click", hideWarnPopup);
    $("rp-warn-overlay").addEventListener("click", (e) => {
      if (e.target === $("rp-warn-overlay")) hideWarnPopup();
    });
    $("reset-popup-confirm").addEventListener("click", () => {
      StorageSystem.resetAll();
      SettingsController.renderProfileTab();
      SettingsController.renderComparisonTab();
      hideWarnPopup();
      // Redirect to login page after reset so user sets up profile again
      setTimeout(() => {
        window.location.replace("login.html");
      }, 320);
    });
    $("reset-popup-ok").addEventListener("click", hideDonePopup);
    $("rp-done-overlay").addEventListener("click", (e) => {
      if (e.target === $("rp-done-overlay")) hideDonePopup();
    });

    document
      .querySelectorAll(".color-swatch")
      .forEach((sw) =>
        sw.addEventListener("click", () =>
          applyAccentColor(sw.dataset.color, sw),
        ),
      );
    $("color-custom-picker").addEventListener("input", (e) =>
      applyAccentColor(e.target.value, null),
    );
    document
      .querySelectorAll(".fs-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () => applyFontSize(btn.dataset.size)),
      );

    SettingsController.buildFAQ();
    SettingsController.buildTips();
    $("fb-message").addEventListener("input", () => {
      $("fb-char").textContent = $("fb-message").value.length;
    });
    $("fb-send-email").addEventListener("click", (e) => {
      e.preventDefault();
      SettingsController.sendFeedbackEmail();
    });
    $("fb-send-wa").addEventListener("click", (e) => {
      e.preventDefault();
      SettingsController.sendFeedbackWhatsApp();
    });

    EventSystem.on("next_question", loadNextQuestion);
    UIController.showScreen("screen-start");
  }

  function switchTab(name) {
    document
      .querySelectorAll(".s-tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document
      .querySelectorAll(".s-panel")
      .forEach((p) => p.classList.toggle("active", p.id === "tab-" + name));
    if (name === "comparison") SettingsController.renderComparisonTab();
    if (name === "profile") SettingsController.renderProfileTab();
  }

  function restoreSettings() {
    const theme = StorageSystem.get("theme", "light");
    document.documentElement.setAttribute("data-theme", theme);
    $("btn-theme-toggle").setAttribute(
      "data-state",
      theme === "dark" ? "on" : "off",
    );
    const muted = StorageSystem.get("muted", false);
    SoundSystem.setMuted(muted);
    $("btn-mute-toggle").setAttribute("data-state", muted ? "off" : "on");
    const color = StorageSystem.get("accentColor", "#6c63ff");
    _applyColor(color);
    document
      .querySelectorAll(".color-swatch")
      .forEach((sw) =>
        sw.classList.toggle("active", sw.dataset.color === color),
      );
    $("color-custom-picker").value = color;
    const fs = StorageSystem.get("fontSize", "medium");
    _applyFontSizeClass(fs);
    document
      .querySelectorAll(".fs-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.size === fs));
    SettingsController.renderProfileTab();
  }

  function openSettings() {
    $("settings-overlay").classList.remove("hidden");
    SettingsController.renderProfileTab();
    switchTab("profile");
  }
  function closeSettings() {
    $("settings-overlay").classList.add("hidden");
  }

  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    html.setAttribute("data-theme", next);
    $("btn-theme-toggle").setAttribute(
      "data-state",
      next === "dark" ? "on" : "off",
    );
    StorageSystem.set("theme", next);
  }
  function toggleMute() {
    const nowMuted = SoundSystem.isMuted();
    SoundSystem.setMuted(!nowMuted);
    $("btn-mute-toggle").setAttribute("data-state", nowMuted ? "on" : "off");
    StorageSystem.set("muted", !nowMuted);
    if (nowMuted) SoundSystem.playPowerUp();
  }

  function applyAccentColor(hex, activeSwatch) {
    _applyColor(hex);
    StorageSystem.set("accentColor", hex);
    document
      .querySelectorAll(".color-swatch")
      .forEach((sw) => sw.classList.remove("active"));
    if (activeSwatch) activeSwatch.classList.add("active");
    $("color-custom-picker").value = hex;
  }
  function _applyColor(hex) {
    const root = document.documentElement;
    root.style.setProperty("--accent", hex);
    root.style.setProperty("--accent2", _lighten(hex, 20));
    root.style.setProperty("--accent-glow", hex + "30");
    root.style.setProperty("--accent-soft", hex + "14");
    root.style.setProperty("--timer-clr", hex);
  }
  function _lighten(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + pct);
    const g = Math.min(255, ((n >> 8) & 0xff) + pct);
    const b = Math.min(255, (n & 0xff) + pct);
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  function applyFontSize(size) {
    _applyFontSizeClass(size);
    StorageSystem.set("fontSize", size);
    document
      .querySelectorAll(".fs-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.size === size));
  }
  function _applyFontSizeClass(size) {
    const map = { small: "15px", medium: "20px", large: "26px" };
    document.documentElement.style.setProperty(
      "--q-font-size",
      map[size] || "20px",
    );
  }

  function goHome() {
    TimerSystem.stop();
    clearNextTimeout();
    waitingForNext = false;
    UIController.showScreen("screen-start");
  }

  function startGame() {
    if (!selectedMode) return;
    const limit = selectedMode === "infinite" ? null : selectedCount;
    GameState.reset(selectedMode, limit);
    resetPowerUpUI();
    UIController.applyModeTheme(selectedMode);
    UIController.showScreen("screen-game");
    UIController.showPressureBanner(false);
    UIController.updateHUD();
    waitingForNext = false;
    loadNextQuestion({ skipped: false });
  }

  function endGame() {
    const st = GameState.get();
    st.running = false;
    TimerSystem.stop();
    clearNextTimeout();
    waitingForNext = false;
    ScreenEffect.clear();
    SnowSystem.stop();
    const session = {
      mode: st.mode,
      score: st.score,
      correct: st.correct,
      attempted: st.attempted,
      health: st.health,
      bestStreak: st.bestStreak,
      date: new Date().toISOString(),
    };
    const sessions = StorageSystem.get("sessions", []);
    sessions.push(session);
    if (sessions.length > 50) sessions.splice(0, sessions.length - 50);
    StorageSystem.set("sessions", sessions);
    const prevGlobal = StorageSystem.get("globalBestScore", 0);
    if (st.score > prevGlobal) StorageSystem.set("globalBestScore", st.score);
    UIController.showResult(st);
  }

  function resetPowerUpUI() {
    ["pu-freeze", "pu-fifty", "pu-skip"].forEach((id) => {
      const el = $(id);
      el.classList.remove("used");
      el.disabled = false;
    });
    // Reset all heart visual states
    document.querySelectorAll(".heart").forEach((h) => {
      h.classList.remove("lost", "cracked", "crack-shake", "breaking");
    });
  }

  function onNextClicked() {
    if (!waitingForNext) return;
    waitingForNext = false;
    if (GameState.get().health <= 0 || GameState.isLimitReached()) {
      endGame();
      return;
    }
    EventSystem.emit("next_question", {});
  }

  function loadNextQuestion(data) {
    if (nextPending) return;
    nextPending = true;
    isAnswered = false;
    nextPending = false;
    const st = GameState.get();
    if (st.questionLimit !== null && st.attempted >= st.questionLimit) {
      endGame();
      return;
    }
    ScreenEffect.clear();
    UIController.showPressureBanner(false);

    let q;
    try {
      q = QuestionEngine.pick();
      if (!q) throw new Error();
    } catch {
      q = {
        q: "What is 2+2?",
        opts: ["3", "4", "5", "6"],
        ans: "4",
        cat: "MATH",
        diff: "easy",
        tier: 1,
        exp: "2+2 = <strong>4</strong>.",
      };
    }

    st.running = true;
    const opts = QuestionEngine.getShuffledOpts();
    UIController.renderQuestion(q, opts);
    UIController.updateHUD();

    const allowPressure =
      (st.mode === "infinite" || st.mode === "impossible") && st.attempted >= 3;
    const pressured =
      allowPressure &&
      !data?.skipped &&
      Math.random() < (st.mode === "impossible" ? 0.6 : 0.3);
    TimerSystem.start(st.mode, onTimerExpire);

    if (pressured) {
      setTimeout(() => {
        if (!isAnswered && GameState.get().running) {
          TimerSystem.halfTime();
          UIController.showPressureBanner(true);
          UIController.triggerGlitch();
          setTimeout(() => UIController.showPressureBanner(false), 1800);
        }
      }, 400);
    }
  }

  function handleAnswer(btn) {
    if (isAnswered || !GameState.get().running) return;
    isAnswered = true;
    TimerSystem.stop();
    const optVal = btn.dataset.optVal || "";
    const correct = QuestionEngine.isCorrect(optVal);
    const q = QuestionEngine.getCurrent();
    UIController.markAnswer(btn, correct, q.ans);

    let pts = 0;
    if (correct) {
      pts = scoreFor(GameState.getDiff(), GameState.getTier());
      GameState.onCorrect();
      GameState.addScore(pts);
      SoundSystem.playCorrect();
      ScreenEffect.set("correct");
      ParticleSystem.correctBurst();
      const st = GameState.get();
      UIController.flashFeedback(`+${pts * st.multiplier}`, "correct-msg");
      if (st.multiplier > 1) UIController.triggerComboEffect(st.multiplier);
      ReviewLog.record(q, optVal, "correct");
    } else {
      const lost = GameState.onWrong();
      SoundSystem.playWrong();
      ScreenEffect.set("wrong");
      UIController.flashFeedback("✗", "wrong-msg");
      if (lost) {
        UIController.pulseHeart(GameState.get().health);
      } else {
        UIController.applyHeartCrackState();
      }
      ReviewLog.record(q, optVal, "wrong");
    }

    UIController.updateHUD();
    const stNow = GameState.get();
    UIController.showExplanation(
      q,
      correct,
      false,
      pts * stNow.multiplier,
      optVal,
    );
    waitingForNext = true;
  }

  function onTimerExpire() {
    if (isAnswered || !GameState.get().running) return;
    isAnswered = true;
    const lost = GameState.onWrong();
    SoundSystem.playTimeout();
    ScreenEffect.set("timeout");
    UIController.flashFeedback("TIME!", "wrong-msg");
    if (lost) {
      UIController.pulseHeart(GameState.get().health);
    } else {
      UIController.applyHeartCrackState();
    }
    const q = QuestionEngine.getCurrent();
    document.querySelectorAll(".opt-btn").forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.optVal === q.ans) btn.classList.add("correct");
    });
    ReviewLog.record(q, "—", "timeout");
    UIController.updateHUD();
    UIController.showExplanation(q, false, true, 0, "—");
    waitingForNext = true;
  }

  function scoreFor(diff, tier) {
    const base = {
      easy: 10,
      medium: 20,
      hard: 35,
      impossible: 60,
      infinite: 25,
    };
    return (base[diff] || 10) + (tier - 1) * 5;
  }

  function clearNextTimeout() {
    if (nextTimeout !== null) {
      clearTimeout(nextTimeout);
      nextTimeout = null;
    }
  }

  function showWarnPopup() {
    const overlay = $("rp-warn-overlay");
    overlay.classList.remove("rp-overlay-hidden");
    void overlay.offsetWidth;
    overlay.classList.add("rp-show");
  }
  function hideWarnPopup() {
    const overlay = $("rp-warn-overlay");
    overlay.classList.remove("rp-show");
    setTimeout(() => overlay.classList.add("rp-overlay-hidden"), 260);
  }
  function showDonePopup() {
    const overlay = $("rp-done-overlay");
    overlay.classList.remove("rp-overlay-hidden");
    void overlay.offsetWidth;
    overlay.classList.add("rp-show");
  }
  function hideDonePopup() {
    const overlay = $("rp-done-overlay");
    overlay.classList.remove("rp-show");
    setTimeout(() => overlay.classList.add("rp-overlay-hidden"), 260);
  }

  return { init };
})();

/* ══════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  /* ── Login guard: redirect to login.html if no profile set ── */
  (function loginGuard() {
    const KEY = "apex_v5";
    try {
      const data = JSON.parse(localStorage.getItem(KEY)) || {};
      const name = data.playerName || "";
      if (!name || name === "Player") {
        window.location.replace("login.html");
        return;
      }
    } catch {}
    // Profile exists — continue booting
    SnowSystem.init();
    Game.init();
  })();
});

/* ══════════════════════════════════════════════
   CROSS-TAB THEME SYNC
   Listens for theme changes made in about.html
   and applies them instantly here too.
══════════════════════════════════════════════ */
window.addEventListener("storage", function (e) {
  if (e.key !== "apex_v5") return;
  try {
    const data = JSON.parse(e.newValue) || {};
    if ("theme" in data) {
      const isDark = data.theme === "dark";
      document.documentElement.setAttribute("data-theme", data.theme);
      const btn = document.getElementById("btn-theme-toggle");
      if (btn) btn.setAttribute("data-state", isDark ? "on" : "off");
    }
  } catch {}
});

/* Expose ReviewLog globally for certificate.js */
window.ReviewLog = ReviewLog;
