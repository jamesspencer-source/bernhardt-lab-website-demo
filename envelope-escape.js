(() => {
  const trigger = document.getElementById("envelope-trigger");
  const modal = document.getElementById("envelope-modal");
  const closeButton = document.getElementById("envelope-close");
  const startButton = document.getElementById("envelope-start");
  const pauseButton = document.getElementById("envelope-pause");
  const restartButton = document.getElementById("envelope-restart");
  const canvas = document.getElementById("envelope-canvas");
  const overlay = document.getElementById("envelope-overlay");
  const overlayTitle = document.getElementById("envelope-overlay-title");
  const overlayCopy = document.getElementById("envelope-overlay-copy");

  if (!trigger || !modal || !closeButton || !startButton || !pauseButton || !restartButton || !canvas || !overlay) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const scoreEl = document.getElementById("envelope-score");
  const bestEl = document.getElementById("envelope-best");
  const integrityEl = document.getElementById("envelope-integrity");
  const shieldEl = document.getElementById("envelope-shield");
  const leaderboardListEl = document.getElementById("envelope-leaderboard-list");
  const leaderboardMetaEl = document.getElementById("envelope-leaderboard-meta");
  const nameFormEl = document.getElementById("envelope-name-form");
  const nameInputEl = document.getElementById("envelope-name-input");
  const nameLabelEl = document.getElementById("envelope-name-label");
  const nameSkipEl = document.getElementById("envelope-name-skip");
  const nameFeedbackEl = document.getElementById("envelope-name-feedback");
  const modelSelectEl = document.getElementById("envelope-model-select");
  const modelNoteEl = document.getElementById("envelope-model-note");

  const prefersReducedMotion =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const STORAGE_KEY = "bernhardt-envelope-escape-best";
  const LEADERBOARD_KEY = "bernhardt-envelope-escape-leaderboard-v1";
  const MODEL_KEY = "bernhardt-envelope-escape-model";
  const LEADERBOARD_SIZE = 10;
  const GLOBAL_LEADERBOARD_URL = String(window.ENVELOPE_LEADERBOARD_URL || "").trim();

  const BACTERIA_MODELS = {
    ecoli: {
      label: "Escherichia coli",
      morphology: "Straight rod",
      shape: "rod",
      radiusScale: 1,
      lengthScale: 2.72,
      palette: {
        membraneA: "#6ae7ee",
        membraneB: "#9af9ff",
        membraneC: "#4ec8d8",
        core: "rgba(9, 41, 69, 0.9)",
        accent: "rgba(161, 245, 255, 0.8)",
        shield: "rgba(125, 243, 255, 0.7)"
      }
    },
    kpneumoniae: {
      label: "Klebsiella pneumoniae",
      morphology: "Encapsulated rod",
      shape: "encapsulated-rod",
      radiusScale: 1.08,
      lengthScale: 2.5,
      palette: {
        membraneA: "#7fe6d3",
        membraneB: "#a6ffe5",
        membraneC: "#59c8bb",
        core: "rgba(17, 52, 74, 0.88)",
        accent: "rgba(190, 255, 236, 0.78)",
        shield: "rgba(171, 255, 224, 0.68)"
      }
    },
    abaumannii: {
      label: "Acinetobacter baumannii",
      morphology: "Coccobacillus",
      shape: "coccobacillus",
      radiusScale: 0.98,
      lengthScale: 2.1,
      palette: {
        membraneA: "#86d8ff",
        membraneB: "#b8e9ff",
        membraneC: "#63b7ef",
        core: "rgba(12, 40, 70, 0.88)",
        accent: "rgba(175, 227, 255, 0.8)",
        shield: "rgba(139, 226, 255, 0.68)"
      }
    },
    saureus: {
      label: "Staphylococcus aureus",
      morphology: "Coccus",
      shape: "coccus",
      radiusScale: 1.05,
      lengthScale: 2,
      palette: {
        membraneA: "#ffd88f",
        membraneB: "#ffe8b8",
        membraneC: "#f5b15a",
        core: "rgba(88, 48, 20, 0.76)",
        accent: "rgba(255, 226, 170, 0.76)",
        shield: "rgba(255, 228, 173, 0.66)"
      }
    }
  };

  const state = {
    width: 960,
    height: 540,
    dpr: 1,
    running: false,
    paused: false,
    elapsed: 0,
    score: 0,
    best: readBestScore(),
    integrity: 100,
    shield: 0,
    combo: 0,
    invulnerable: 0,
    shake: 0,
    phageSpawnIn: 1.1,
    pulseSpawnIn: 4,
    resourceSpawnIn: 1.4,
    surgeIn: 11,
    surgeTimer: 0,
    surgePulseIn: 0.35,
    nearMissCooldown: 0,
    collapseActive: false,
    collapseTimer: 0,
    collapseDuration: 2.4,
    lysisPhages: [],
    particles: [],
    phages: [],
    pulses: [],
    resources: [],
    bursts: [],
    floaters: [],
    trails: [],
    leaderboard: readLeaderboard(),
    leaderboardMode: GLOBAL_LEADERBOARD_URL ? "global" : "local",
    pendingScore: null,
    modelId: readModelChoice(),
    player: {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      radius: 18,
      length: 50
    }
  };

  const keys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  const pointer = {
    active: false,
    x: 0,
    y: 0
  };

  const seededBest = Math.max(state.best, getLeaderboardBest(state.leaderboard));
  state.best = seededBest;
  writeBestScore(seededBest);

  let rafId = null;
  let lastFrame = 0;
  let overlayMode = "start";
  let triggerTimer = null;

  function readBestScore() {
    try {
      const value = Number(window.localStorage.getItem(STORAGE_KEY) || "0");
      return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
    } catch {
      return 0;
    }
  }

  function writeBestScore(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Math.max(0, Math.floor(value))));
    } catch {
      /* no-op */
    }
  }

  function sanitizeName(value) {
    return String(value || "")
      .replace(/[^A-Za-z0-9 ._'-]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 24);
  }

  function normalizeForModeration(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[@]/g, "a")
      .replace(/[0]/g, "o")
      .replace(/[1!|]/g, "i")
      .replace(/[3]/g, "e")
      .replace(/[4]/g, "a")
      .replace(/[5$]/g, "s")
      .replace(/[7]/g, "t")
      .replace(/[8]/g, "b")
      .replace(/[^a-z]/g, "");
  }

  function isNameAllowed(value) {
    const normalized = normalizeForModeration(value);
    if (!normalized) return true;
    const blockedTokens = [
      "fuck",
      "fucking",
      "motherfucker",
      "shit",
      "bitch",
      "asshole",
      "cunt",
      "dick",
      "cock",
      "pussy",
      "whore",
      "slut",
      "rape",
      "nigger",
      "faggot",
      "retard"
    ];
    return !blockedTokens.some((token) => normalized.includes(token));
  }

  function setNameFeedback(message = "") {
    if (!nameFeedbackEl) return;
    nameFeedbackEl.textContent = message;
    nameFeedbackEl.hidden = !message;
  }

  function normalizeLeaderboardEntries(entries) {
    if (!Array.isArray(entries)) return [];
    return entries
      .map((entry) => {
        const cleanedName = sanitizeName(entry?.name) || "Anonymous";
        return {
          name: isNameAllowed(cleanedName) ? cleanedName : "Anonymous",
          score: Math.max(0, Math.floor(Number(entry?.score) || 0)),
          createdAt: Math.max(0, Number(entry?.createdAt) || Date.now())
        };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => (b.score - a.score !== 0 ? b.score - a.score : a.createdAt - b.createdAt))
      .slice(0, LEADERBOARD_SIZE);
  }

  function readLeaderboard() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(LEADERBOARD_KEY) || "[]");
      return normalizeLeaderboardEntries(parsed);
    } catch {
      return [];
    }
  }

  function writeLeaderboard(entries) {
    try {
      window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
    } catch {
      /* no-op */
    }
  }

  function setLeaderboardMeta(mode) {
    if (!leaderboardMetaEl) return;
    leaderboardMetaEl.classList.remove("is-global", "is-fallback");

    if (mode === "global") {
      leaderboardMetaEl.textContent = "Shared globally";
      leaderboardMetaEl.classList.add("is-global");
      return;
    }
    if (mode === "fallback") {
      leaderboardMetaEl.textContent = "Global unavailable · local copy";
      leaderboardMetaEl.classList.add("is-fallback");
      return;
    }
    leaderboardMetaEl.textContent = "Stored in this browser";
  }

  async function fetchGlobalLeaderboard() {
    if (!GLOBAL_LEADERBOARD_URL) return null;
    const response = await fetch(GLOBAL_LEADERBOARD_URL, {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Leaderboard fetch failed (${response.status})`);
    }
    const payload = await response.json();
    const entries = Array.isArray(payload) ? payload : payload?.entries;
    return normalizeLeaderboardEntries(entries);
  }

  async function submitGlobalScore(name, score) {
    if (!GLOBAL_LEADERBOARD_URL) return;
    const response = await fetch(GLOBAL_LEADERBOARD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: sanitizeName(name) || "Anonymous",
        score: Math.max(0, Math.floor(score))
      })
    });
    if (!response.ok) {
      let errorCode = `http_${response.status}`;
      try {
        const payload = await response.json();
        if (payload?.errorCode) errorCode = String(payload.errorCode);
      } catch {
        /* no-op */
      }
      const error = new Error(`Leaderboard submit failed (${response.status})`);
      error.code = errorCode;
      throw error;
    }
  }

  async function refreshLeaderboardFromSource() {
    if (!GLOBAL_LEADERBOARD_URL) {
      state.leaderboardMode = "local";
      setLeaderboardMeta("local");
      renderLeaderboard();
      return;
    }

    try {
      const remoteEntries = await fetchGlobalLeaderboard();
      state.leaderboard = remoteEntries || [];
      writeLeaderboard(state.leaderboard);
      state.leaderboardMode = "global";
      setLeaderboardMeta("global");
      state.best = Math.max(state.best, getLeaderboardBest(state.leaderboard));
      writeBestScore(state.best);
      updateHud();
      renderLeaderboard();
    } catch {
      state.leaderboard = readLeaderboard();
      state.leaderboardMode = "fallback";
      setLeaderboardMeta("fallback");
      renderLeaderboard();
    }
  }

  function getLeaderboardBest(entries) {
    if (!entries.length) return 0;
    return Math.max(0, Math.floor(entries[0].score));
  }

  function qualifiesForLeaderboard(score) {
    const cleanedScore = Math.max(0, Math.floor(score));
    if (cleanedScore <= 0) return false;
    if (state.leaderboard.length < LEADERBOARD_SIZE) return true;
    return cleanedScore >= state.leaderboard[state.leaderboard.length - 1].score;
  }

  function renderLeaderboard() {
    if (!leaderboardListEl) return;

    leaderboardListEl.innerHTML = "";
    for (let i = 0; i < LEADERBOARD_SIZE; i += 1) {
      const li = document.createElement("li");
      const entry = state.leaderboard[i];

      if (entry) {
        const score = document.createElement("strong");
        score.textContent = String(entry.score);
        li.append(score, document.createTextNode(` — ${entry.name}`));
      } else {
        li.classList.add("is-empty");
        li.textContent = "—";
      }

      leaderboardListEl.append(li);
    }
  }

  function hideNameForm() {
    state.pendingScore = null;
    if (nameFormEl) nameFormEl.hidden = true;
    if (nameInputEl) nameInputEl.value = "";
    setNameFeedback("");
  }

  function openNameForm(score) {
    const cleanedScore = Math.max(0, Math.floor(score));
    if (cleanedScore <= 0) return;

    state.pendingScore = cleanedScore;

    if (!nameFormEl) {
      const rawName = window.prompt(`Top 10 score: ${cleanedScore}. Enter your name:`);
      if (rawName === null) {
        state.pendingScore = null;
        return;
      }
      const fallbackName = sanitizeName(rawName);
      const savedName = fallbackName || "Anonymous";
      if (!isNameAllowed(savedName)) {
        state.pendingScore = null;
        showOverlay("Score not saved", "Name unavailable. Try a different one.", "Run Again", "restart");
        return;
      }
      addLeaderboardEntry(savedName, cleanedScore).then(() => {
        showOverlay(
          "Score logged",
          `${savedName} added with ${cleanedScore} points. Highest score: ${Math.floor(state.best)}.`,
          "Run Again",
          "restart"
        );
      });
      return;
    }

    if (nameLabelEl) nameLabelEl.textContent = `Top 10 score (${cleanedScore}): add your name`;
    nameFormEl.hidden = false;
    setNameFeedback("");
    if (nameInputEl) {
      nameInputEl.value = "";
      nameInputEl.focus({ preventScroll: true });
    }
  }

  async function addLeaderboardEntry(name, score) {
    const entry = {
      name: sanitizeName(name) || "Anonymous",
      score: Math.max(0, Math.floor(score)),
      createdAt: Date.now()
    };
    if (entry.score <= 0) return false;
    if (!isNameAllowed(entry.name)) return false;

    if (GLOBAL_LEADERBOARD_URL) {
      try {
        await submitGlobalScore(entry.name, entry.score);
        const remoteEntries = await fetchGlobalLeaderboard();
        state.leaderboard = remoteEntries || [];
        writeLeaderboard(state.leaderboard);
        state.leaderboardMode = "global";
        setLeaderboardMeta("global");
      } catch (error) {
        if (error && error.code === "invalid_name") {
          state.leaderboardMode = "global";
          setLeaderboardMeta("global");
          return false;
        }
        state.leaderboard.push(entry);
        state.leaderboard = normalizeLeaderboardEntries(state.leaderboard);
        writeLeaderboard(state.leaderboard);
        state.leaderboardMode = "fallback";
        setLeaderboardMeta("fallback");
      }
    } else {
      state.leaderboard.push(entry);
      state.leaderboard = normalizeLeaderboardEntries(state.leaderboard);
      writeLeaderboard(state.leaderboard);
      state.leaderboardMode = "local";
      setLeaderboardMeta("local");
    }

    state.best = Math.max(state.best, getLeaderboardBest(state.leaderboard));
    writeBestScore(state.best);
    renderLeaderboard();
    updateHud();
    return true;
  }

  function readModelChoice() {
    try {
      const stored = String(window.localStorage.getItem(MODEL_KEY) || "").toLowerCase();
      if (stored && BACTERIA_MODELS[stored]) return stored;
    } catch {
      /* no-op */
    }
    return "ecoli";
  }

  function writeModelChoice(modelId) {
    try {
      window.localStorage.setItem(MODEL_KEY, modelId);
    } catch {
      /* no-op */
    }
  }

  function getModel(modelId) {
    return BACTERIA_MODELS[modelId] || BACTERIA_MODELS.ecoli;
  }

  function applyModelGeometry() {
    const model = getModel(state.modelId);
    const baseRadius = clamp(Math.round(state.height * 0.035), 15, 24);
    state.player.radius = clamp(baseRadius * model.radiusScale, 13, 27);
    state.player.length = Math.round(state.player.radius * model.lengthScale);
  }

  function updateModelUi() {
    const model = getModel(state.modelId);
    if (modelSelectEl && modelSelectEl.value !== state.modelId) {
      modelSelectEl.value = state.modelId;
    }
    if (modelNoteEl) {
      modelNoteEl.textContent = `${model.label} · ${model.morphology}`;
    }
  }

  function setModel(modelId, persist = true) {
    const next = BACTERIA_MODELS[modelId] ? modelId : "ecoli";
    state.modelId = next;
    if (persist) writeModelChoice(next);
    applyModelGeometry();
    updateModelUi();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function isModalOpen() {
    return modal.hasAttribute("open");
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(320, Math.round(rect.width || 960));
    const height = Math.max(180, Math.round(rect.height || 540));
    const prevWidth = state.width || width;
    const prevHeight = state.height || height;

    state.width = width;
    state.height = height;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    if (state.player.x === 0 && state.player.y === 0) {
      placePlayerCenter();
    } else {
      applyModelGeometry();
      const xRatio = prevWidth > 0 ? state.player.x / prevWidth : 0.5;
      const yRatio = prevHeight > 0 ? state.player.y / prevHeight : 0.5;
      state.player.x = xRatio * state.width;
      state.player.y = yRatio * state.height;
      state.player.x = clamp(state.player.x, state.player.radius, state.width - state.player.radius);
      state.player.y = clamp(state.player.y, state.player.radius, state.height - state.player.radius);
    }
  }

  function placePlayerCenter() {
    applyModelGeometry();
    state.player.x = Math.round(state.width * 0.33);
    state.player.y = Math.round(state.height * 0.5);
    state.player.vx = 0;
    state.player.vy = 0;
    state.player.angle = 0;
  }

  function resetSimulation() {
    state.elapsed = 0;
    state.score = 0;
    state.integrity = 100;
    state.shield = 0;
    state.combo = 0;
    state.invulnerable = 0;
    state.shake = 0;
    state.phageSpawnIn = 1.1;
    state.pulseSpawnIn = 3.9;
    state.resourceSpawnIn = 1.4;
    state.surgeIn = random(10, 14);
    state.surgeTimer = 0;
    state.surgePulseIn = 0.35;
    state.nearMissCooldown = 0;
    state.collapseActive = false;
    state.collapseTimer = 0;
    state.lysisPhages = [];
    state.phages = [];
    state.pulses = [];
    state.resources = [];
    state.bursts = [];
    state.floaters = [];
    state.trails = [];
    buildAmbientParticles();
    placePlayerCenter();
    updateHud();
  }

  function buildAmbientParticles() {
    const count = clamp(Math.round((state.width * state.height) / 15000), 36, 96);
    state.particles = Array.from({ length: count }, () => ({
      x: random(0, state.width),
      y: random(0, state.height),
      r: random(1, 3.2),
      vx: random(8, 26),
      vy: random(-6, 6),
      twinkle: random(0, Math.PI * 2)
    }));
  }

  function showOverlay(title, copy, actionText, mode) {
    overlayMode = mode;
    overlayTitle.textContent = title;
    overlayCopy.textContent = copy;
    startButton.textContent = actionText;
    overlay.classList.remove("is-hidden");
  }

  function hideOverlay() {
    overlay.classList.add("is-hidden");
  }

  function updateHud() {
    if (scoreEl) scoreEl.textContent = String(Math.floor(state.score));
    if (bestEl) bestEl.textContent = String(Math.floor(state.best));
    if (integrityEl) integrityEl.textContent = `${Math.max(0, Math.floor(state.integrity))}%`;
    if (shieldEl) shieldEl.textContent = `${Math.max(0, Math.floor(state.shield))}%`;
  }

  function pointerToWorld(event) {
    const rect = canvas.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    pointer.x = clamp(px * state.width, 0, state.width);
    pointer.y = clamp(py * state.height, 0, state.height);
  }

  function openModal() {
    if (isModalOpen()) return;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    resizeCanvas();
    resetSimulation();
    hideNameForm();
    state.running = false;
    state.paused = false;
    pauseButton.textContent = "Pause";
    setLeaderboardMeta(state.leaderboardMode === "global" ? "global" : "local");
    renderLeaderboard();
    refreshLeaderboardFromSource();
    updateModelUi();

    showOverlay(
      "Run a hidden Bernhardt Lab simulation.",
      "Guide a bacterium through phage pressure, dynamic surge waves, and antibiotic pulses. Collect envelope-building precursors to maintain integrity.",
      "Start Simulation",
      "start"
    );

    ensureLoop();
  }

  function closeModal() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }

    state.running = false;
    state.paused = false;
    pointer.active = false;
    hideNameForm();

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function startSimulation() {
    resetSimulation();
    hideNameForm();
    state.running = true;
    state.paused = false;
    pauseButton.textContent = "Pause";
    hideOverlay();
    lastFrame = performance.now();
    ensureLoop();
  }

  function resumeSimulation() {
    state.paused = false;
    pauseButton.textContent = "Pause";
    hideOverlay();
    lastFrame = performance.now();
    ensureLoop();
  }

  function pauseSimulation() {
    if (!state.running) return;
    state.paused = true;
    pauseButton.textContent = "Resume";
    showOverlay(
      "Simulation paused",
      "Resume when you are ready. Keep collecting precursors and avoid phage hits.",
      "Resume",
      "resume"
    );
  }

  function endSimulation() {
    state.running = false;
    state.paused = false;
    pauseButton.textContent = "Pause";
    const finalScore = Math.floor(state.score);
    const qualifies = qualifiesForLeaderboard(finalScore);

    if (finalScore > state.best) {
      state.best = finalScore;
      writeBestScore(state.best);
    }

    updateHud();
    renderLeaderboard();

    showOverlay(
      "Envelope collapsed",
      qualifies
        ? `Final score: ${finalScore}. Highest score: ${Math.floor(state.best)}. Top 10 unlocked — add your name below.`
        : `Final score: ${finalScore}. Highest score: ${Math.floor(state.best)}.`,
      "Run Again",
      "restart"
    );

    if (qualifies) openNameForm(finalScore);
    else hideNameForm();
  }

  function spawnPhage(kind = "hunter") {
    const margin = 48;
    const edge = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;

    if (edge === 0) {
      x = -margin;
      y = random(0, state.height);
    } else if (edge === 1) {
      x = state.width + margin;
      y = random(0, state.height);
    } else if (edge === 2) {
      x = random(0, state.width);
      y = -margin;
    } else {
      x = random(0, state.width);
      y = state.height + margin;
    }

    const difficulty = 1 + state.elapsed / 48;
    const baseSpeed = random(72, 108) + difficulty * 18;
    const isDarter = kind === "darter";
    const speed = isDarter ? baseSpeed * random(1.18, 1.33) : baseSpeed;
    const angle = Math.atan2(state.player.y - y, state.player.x - x) + random(-0.35, 0.35);

    state.phages.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: isDarter ? random(9, 12.5) : random(11, 16),
      spin: random(-2.4, 2.4),
      rot: random(0, Math.PI * 2),
      wobble: random(0, Math.PI * 2),
      wobbleAmp: isDarter ? random(2, 8) : random(4, 12),
      kind,
      nearScored: false
    });
  }

  function spawnPulse() {
    const margin = 64;
    state.pulses.push({
      x: random(margin, state.width - margin),
      y: random(margin, state.height - margin),
      r: random(10, 26),
      thickness: random(11, 16),
      speed: random(70, 110) + state.elapsed * 0.8,
      maxR: Math.max(state.width, state.height) * random(0.52, 0.82),
      hitLock: 0,
      nearScored: false
    });
  }

  function spawnResource() {
    const kindRoll = Math.random();
    const kind = kindRoll < 0.16 ? "shield" : "precursor";

    state.resources.push({
      x: random(30, state.width - 30),
      y: random(30, state.height - 30),
      r: kind === "shield" ? 12 : 10,
      kind,
      phase: random(0, Math.PI * 2),
      life: 0
    });
  }

  function addBurst(x, y, color, amount = 14) {
    for (let i = 0; i < amount; i += 1) {
      const angle = random(0, Math.PI * 2);
      const speed = random(28, 180);
      state.bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: random(0.24, 0.62),
        maxLife: random(0.24, 0.62),
        color,
        size: random(1.6, 4.8)
      });
    }
  }

  function addFloater(x, y, text, color) {
    state.floaters.push({
      x,
      y,
      text,
      color,
      life: 1.2,
      maxLife: 1.2
    });
  }

  function spawnPhageSwarm(count) {
    for (let i = 0; i < count; i += 1) {
      const kind = Math.random() < 0.45 ? "darter" : "hunter";
      spawnPhage(kind);
    }
  }

  function triggerPressureSurge() {
    state.surgeTimer = random(5.6, 8.4);
    state.surgePulseIn = random(0.18, 0.34);
    state.surgeIn = random(14, 21);
    state.shake = Math.max(state.shake, 6.5);
    addFloater(state.width * 0.5, 48, "Phage surge", "#98f0ff");
    addBurst(state.width * 0.5, 62, "#8eefff", 20);
    spawnPhageSwarm(clamp(3 + Math.floor(state.elapsed / 42), 3, 7));
  }

  function triggerLysisSequence() {
    if (state.collapseActive) return;

    state.collapseActive = true;
    state.collapseTimer = 0;
    state.running = false;
    state.paused = false;
    pauseButton.textContent = "Pause";
    state.invulnerable = 0;
    state.shield = 0;
    state.shake = 14;
    state.phages = [];
    state.pulses = [];
    state.resources = [];
    state.trails = [];

    const sourceX = state.player.x;
    const sourceY = state.player.y;
    const releaseCount = prefersReducedMotion ? 22 : 46;
    state.lysisPhages = Array.from({ length: releaseCount }, () => {
      const theta = random(0, Math.PI * 2);
      const speed = random(58, 260);
      return {
        x: sourceX + Math.cos(theta) * random(2, 11),
        y: sourceY + Math.sin(theta) * random(2, 11),
        vx: Math.cos(theta) * speed,
        vy: Math.sin(theta) * speed,
        r: random(3.8, 6.6),
        spin: random(-4, 4),
        rot: random(0, Math.PI * 2),
        wobble: random(0, Math.PI * 2),
        wobbleAmp: random(0.8, 2.4),
        life: random(1.35, 2.4),
        maxLife: random(1.35, 2.4)
      };
    });

    addFloater(sourceX, sourceY - 34, "Cell lysis", "#ffafcb");
    addBurst(sourceX, sourceY, "#ff8cb2", 46);
    addBurst(sourceX, sourceY, "#9ef7ff", 34);
    updateHud();
  }

  function updateLysisSequence(dt) {
    state.collapseTimer += dt;

    for (let i = state.lysisPhages.length - 1; i >= 0; i -= 1) {
      const phage = state.lysisPhages[i];
      phage.life -= dt;
      phage.rot += phage.spin * dt;
      phage.wobble += dt * 8;
      phage.x += phage.vx * dt + Math.cos(phage.wobble) * phage.wobbleAmp;
      phage.y += phage.vy * dt + Math.sin(phage.wobble) * phage.wobbleAmp;
      phage.vx *= 0.985;
      phage.vy *= 0.985;
      if (phage.life <= 0) state.lysisPhages.splice(i, 1);
    }

    for (let i = state.bursts.length - 1; i >= 0; i -= 1) {
      const burst = state.bursts[i];
      burst.life -= dt;
      burst.x += burst.vx * dt;
      burst.y += burst.vy * dt;
      burst.vx *= 0.97;
      burst.vy *= 0.97;
      if (burst.life <= 0) state.bursts.splice(i, 1);
    }

    for (let i = state.floaters.length - 1; i >= 0; i -= 1) {
      const floater = state.floaters[i];
      floater.life -= dt;
      floater.y -= 24 * dt;
      if (floater.life <= 0) state.floaters.splice(i, 1);
    }

    if (state.collapseTimer > 0.24 && state.collapseTimer < 1.2) {
      if (Math.random() < dt * 11) {
        addBurst(
          state.player.x + random(-14, 14),
          state.player.y + random(-14, 14),
          Math.random() < 0.5 ? "#ff8cb2" : "#95f3ff",
          8
        );
      }
    }

    if (state.collapseTimer >= state.collapseDuration) {
      state.collapseActive = false;
      endSimulation();
    }
  }

  function applyDamage(amount, label) {
    if (state.collapseActive || state.invulnerable > 0) return;

    if (state.shield > 0) {
      const absorbed = Math.min(state.shield, amount * 1.2);
      state.shield = Math.max(0, state.shield - absorbed);
      addFloater(state.player.x, state.player.y - 26, "Shield absorbed", "#7deaf2");
      addBurst(state.player.x, state.player.y, "#7deaf2", 10);
    } else {
      state.integrity -= amount;
      addFloater(state.player.x, state.player.y - 26, label, "#ff9db5");
      addBurst(state.player.x, state.player.y, "#ff7b9b", 12);
    }

    state.invulnerable = 0.42;
    state.shake = 9;
    state.combo = 0;
  }

  function collectResource(resource, index) {
    if (resource.kind === "shield") {
      state.shield = clamp(state.shield + 42, 0, 100);
      state.integrity = clamp(state.integrity + 5, 0, 100);
      state.score += 190 + state.combo * 12;
      addFloater(resource.x, resource.y, "SigmaE shield", "#86f5ff");
      addBurst(resource.x, resource.y, "#86f5ff", 16);
    } else {
      state.integrity = clamp(state.integrity + 8, 0, 100);
      state.score += 100 + state.combo * 16;
      addFloater(resource.x, resource.y, `+PG ${state.combo > 0 ? `x${state.combo + 1}` : ""}`.trim(), "#b2ffd6");
      addBurst(resource.x, resource.y, "#89ffca", 12);
    }

    state.combo = clamp(state.combo + 1, 0, 12);
    state.resources.splice(index, 1);
  }

  function updatePlayer(dt) {
    const moveSpeed = clamp(state.height * 0.68, 210, 360);
    let inputX = 0;
    let inputY = 0;

    if (keys.left) inputX -= 1;
    if (keys.right) inputX += 1;
    if (keys.up) inputY -= 1;
    if (keys.down) inputY += 1;

    if (pointer.active) {
      const dx = pointer.x - state.player.x;
      const dy = pointer.y - state.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        inputX += dx / dist;
        inputY += dy / dist;
      }
    }

    const mag = Math.hypot(inputX, inputY) || 1;
    const desiredVx = (inputX / mag) * moveSpeed;
    const desiredVy = (inputY / mag) * moveSpeed;

    state.player.vx += (desiredVx - state.player.vx) * 8.4 * dt;
    state.player.vy += (desiredVy - state.player.vy) * 8.4 * dt;

    state.player.x += state.player.vx * dt;
    state.player.y += state.player.vy * dt;

    state.player.x = clamp(state.player.x, state.player.radius, state.width - state.player.radius);
    state.player.y = clamp(state.player.y, state.player.radius, state.height - state.player.radius);

    if (Math.hypot(state.player.vx, state.player.vy) > 1) {
      state.player.angle = Math.atan2(state.player.vy, state.player.vx);
    }
  }

  function updateSimulation(dt) {
    state.elapsed += dt;
    const surgeStrength = state.surgeTimer > 0 ? 1.35 : 1;
    state.score += dt * (16 + state.elapsed * 0.22 + state.combo * 0.8) * surgeStrength;

    state.invulnerable = Math.max(0, state.invulnerable - dt);
    state.shake = Math.max(0, state.shake - dt * 22);
    state.shield = Math.max(0, state.shield - dt * 1.8);
    state.nearMissCooldown = Math.max(0, state.nearMissCooldown - dt);

    state.surgeIn -= dt;
    if (state.surgeIn <= 0 && !state.collapseActive) {
      triggerPressureSurge();
    }
    if (state.surgeTimer > 0) {
      state.surgeTimer = Math.max(0, state.surgeTimer - dt);
      state.surgePulseIn -= dt;
      if (state.surgePulseIn <= 0) {
        spawnPhage(Math.random() < 0.6 ? "darter" : "hunter");
        state.surgePulseIn = random(0.2, 0.45);
      }
    }

    updatePlayer(dt);
    state.trails.push({
      x: state.player.x,
      y: state.player.y,
      angle: state.player.angle,
      life: 0.5,
      maxLife: 0.5
    });
    if (state.trails.length > 28) state.trails.shift();

    for (let i = state.trails.length - 1; i >= 0; i -= 1) {
      const trail = state.trails[i];
      trail.life -= dt;
      if (trail.life <= 0) state.trails.splice(i, 1);
    }

    const difficulty = 1 + state.elapsed / 52;
    const pulsePressure = state.surgeTimer > 0 ? 0.72 : 1;
    const phagePressure = state.surgeTimer > 0 ? 0.58 : 1;

    state.phageSpawnIn -= dt;
    state.pulseSpawnIn -= dt;
    state.resourceSpawnIn -= dt;

    if (state.phageSpawnIn <= 0) {
      const kind = Math.random() < 0.26 + Math.min(0.18, state.elapsed * 0.0042) ? "darter" : "hunter";
      spawnPhage(kind);
      state.phageSpawnIn = clamp((random(0.66, 1.25) - difficulty * 0.06) * phagePressure, 0.24, 1.25);
    }

    if (state.pulseSpawnIn <= 0) {
      spawnPulse();
      state.pulseSpawnIn = clamp((random(2.2, 4.4) - difficulty * 0.08) * pulsePressure, 0.95, 4.4);
    }

    if (state.resourceSpawnIn <= 0) {
      spawnResource();
      state.resourceSpawnIn = random(0.9, 1.6);
    }

    state.particles.forEach((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.twinkle += dt * random(0.2, 0.55);

      if (particle.x > state.width + 10) particle.x = -8;
      if (particle.y > state.height + 10) particle.y = -8;
      if (particle.y < -10) particle.y = state.height + 8;
    });

    for (let i = state.phages.length - 1; i >= 0; i -= 1) {
      const phage = state.phages[i];
      const targetAngle = Math.atan2(state.player.y - phage.y, state.player.x - phage.x);
      const phageSteer = phage.kind === "darter" ? 0.56 : 0.4;
      const steer = phageSteer * dt;
      const currentAngle = Math.atan2(phage.vy, phage.vx);
      const newAngle = currentAngle + clamp(targetAngle - currentAngle, -steer, steer);
      const speed = Math.hypot(phage.vx, phage.vy);
      const accel = phage.kind === "darter" ? 1.015 : 1.004;

      phage.vx = Math.cos(newAngle) * speed * accel;
      phage.vy = Math.sin(newAngle) * speed * accel;
      phage.wobble += dt * 6;
      phage.rot += phage.spin * dt;
      phage.x += phage.vx * dt + Math.cos(phage.wobble) * phage.wobbleAmp * dt;
      phage.y += phage.vy * dt + Math.sin(phage.wobble) * phage.wobbleAmp * dt;

      if (phage.x < -90 || phage.x > state.width + 90 || phage.y < -90 || phage.y > state.height + 90) {
        state.phages.splice(i, 1);
        continue;
      }

      const dist = Math.hypot(phage.x - state.player.x, phage.y - state.player.y);
      if (dist < phage.r + state.player.radius * 0.8) {
        applyDamage(17, "Phage impact");
        state.phages.splice(i, 1);
        continue;
      }

      const nearBand = phage.r + state.player.radius * 1.15;
      if (!phage.nearScored && dist < nearBand && state.nearMissCooldown <= 0) {
        phage.nearScored = true;
        state.nearMissCooldown = 0.18;
        const nearBonus = 24 + state.combo * 4;
        state.score += nearBonus;
        addFloater(phage.x, phage.y - 12, `Near miss +${nearBonus}`, "#9eeeff");
        addBurst(phage.x, phage.y, "#8cefff", 8);
      }
    }

    for (let i = state.pulses.length - 1; i >= 0; i -= 1) {
      const pulse = state.pulses[i];
      pulse.r += pulse.speed * dt;
      pulse.hitLock = Math.max(0, pulse.hitLock - dt);

      const dist = Math.hypot(pulse.x - state.player.x, pulse.y - state.player.y);
      const ringGap = Math.abs(dist - pulse.r);
      if (ringGap < pulse.thickness + state.player.radius * 0.15 && pulse.hitLock <= 0) {
        applyDamage(12, "Antibiotic pulse");
        pulse.hitLock = 0.46;
      }

      if (!pulse.nearScored && ringGap < pulse.thickness + state.player.radius * 1.25 && ringGap > pulse.thickness + state.player.radius * 0.28) {
        pulse.nearScored = true;
        const pulseBonus = 18 + state.combo * 3;
        state.score += pulseBonus;
        addFloater(state.player.x, state.player.y - 28, `Tight dodge +${pulseBonus}`, "#b0d8ff");
      }

      if (pulse.r > pulse.maxR) {
        state.pulses.splice(i, 1);
      }
    }

    for (let i = state.resources.length - 1; i >= 0; i -= 1) {
      const resource = state.resources[i];
      resource.life += dt;
      resource.phase += dt * 2.8;
      resource.y += Math.sin(resource.phase) * 7 * dt;

      if (resource.life > 15) {
        state.resources.splice(i, 1);
        continue;
      }

      const dist = Math.hypot(resource.x - state.player.x, resource.y - state.player.y);
      if (dist < resource.r + state.player.radius * 0.72) {
        collectResource(resource, i);
      }
    }

    for (let i = state.bursts.length - 1; i >= 0; i -= 1) {
      const burst = state.bursts[i];
      burst.life -= dt;
      burst.x += burst.vx * dt;
      burst.y += burst.vy * dt;
      burst.vx *= 0.97;
      burst.vy *= 0.97;
      if (burst.life <= 0) state.bursts.splice(i, 1);
    }

    for (let i = state.floaters.length - 1; i >= 0; i -= 1) {
      const floater = state.floaters[i];
      floater.life -= dt;
      floater.y -= 24 * dt;
      if (floater.life <= 0) state.floaters.splice(i, 1);
    }

    if (state.integrity <= 0) {
      state.integrity = 0;
      triggerLysisSequence();
    }

    updateHud();
  }

  function drawBackground(time) {
    const t = time * 0.001;
    const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
    gradient.addColorStop(0, "#040c18");
    gradient.addColorStop(0.42, "#08243d");
    gradient.addColorStop(1, "#0e3958");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.width, state.height);

    const bloomFields = [
      { x: 0.18, y: 0.2, r: 0.46, c0: "rgba(94, 199, 215, 0.21)", c1: "rgba(94, 199, 215, 0)" },
      { x: 0.78, y: 0.28, r: 0.38, c0: "rgba(90, 130, 255, 0.17)", c1: "rgba(90, 130, 255, 0)" },
      { x: 0.66, y: 0.78, r: 0.44, c0: "rgba(113, 246, 196, 0.13)", c1: "rgba(113, 246, 196, 0)" }
    ];

    bloomFields.forEach((field, index) => {
      const px = state.width * field.x + Math.cos(t * (0.12 + index * 0.05)) * 26;
      const py = state.height * field.y + Math.sin(t * (0.16 + index * 0.03)) * 22;
      const radius = Math.max(state.width, state.height) * field.r;
      const bloom = ctx.createRadialGradient(px, py, radius * 0.06, px, py, radius);
      bloom.addColorStop(0, field.c0);
      bloom.addColorStop(1, field.c1);
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, state.width, state.height);
    });

    if (state.surgeTimer > 0) {
      const pulse = 0.48 + 0.52 * Math.sin(time * 0.02);
      const surgeAlpha = clamp(state.surgeTimer / 8, 0, 1) * 0.24 * pulse;
      const surgeGlow = ctx.createRadialGradient(
        state.width * 0.5,
        state.height * 0.5,
        state.height * 0.12,
        state.width * 0.5,
        state.height * 0.5,
        state.width * 0.74
      );
      surgeGlow.addColorStop(0, `rgba(255, 148, 195, ${(surgeAlpha * 0.7).toFixed(3)})`);
      surgeGlow.addColorStop(1, "rgba(255, 148, 195, 0)");
      ctx.fillStyle = surgeGlow;
      ctx.fillRect(0, 0, state.width, state.height);
    }

    ctx.save();
    ctx.globalAlpha = 0.21;
    ctx.strokeStyle = "rgba(132, 204, 213, 0.2)";
    ctx.lineWidth = 1;

    const spacing = 32;
    const offset = (time * 0.015) % spacing;
    for (let x = -spacing; x < state.width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset + state.height * 0.08, state.height);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.16;
    const yOffset = (time * 0.008) % spacing;
    for (let y = -spacing; y < state.height + spacing; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y + yOffset);
      ctx.lineTo(state.width, y + yOffset);
      ctx.stroke();
    }
    ctx.restore();

    state.particles.forEach((particle) => {
      const alpha = 0.12 + 0.16 * (0.5 + 0.5 * Math.sin(particle.twinkle));
      const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.r * 3.4);
      glow.addColorStop(0, `rgba(188, 244, 248, ${(alpha * 0.9).toFixed(3)})`);
      glow.addColorStop(1, "rgba(188, 244, 248, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r * 3.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(150, 227, 233, ${(alpha + 0.08).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(0.8, particle.r * 0.62), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawPulse(pulse) {
    const ringAlpha = clamp(0.5 - pulse.r / (pulse.maxR * 1.2), 0.08, 0.44);
    const bloom = ctx.createRadialGradient(pulse.x, pulse.y, pulse.r * 0.75, pulse.x, pulse.y, pulse.r + pulse.thickness * 3);
    bloom.addColorStop(0, "rgba(255, 135, 175, 0)");
    bloom.addColorStop(1, `rgba(255, 144, 184, ${(ringAlpha * 0.34).toFixed(3)})`);
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r + pulse.thickness * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 133, 167, ${(ringAlpha * 1.05).toFixed(3)})`;
    ctx.lineWidth = pulse.thickness * 1.05;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(168, 228, 255, ${(ringAlpha * 0.9).toFixed(3)})`;
    ctx.lineWidth = Math.max(2, pulse.thickness * 0.34);
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawPhage(phage) {
    ctx.save();
    ctx.translate(phage.x, phage.y);
    ctx.rotate(phage.rot);
    const isDarter = phage.kind === "darter";

    const glow = ctx.createRadialGradient(0, 0, phage.r * 0.2, 0, 0, phage.r * 2.6);
    glow.addColorStop(0, isDarter ? "rgba(255, 178, 213, 0.44)" : "rgba(162, 247, 255, 0.42)");
    glow.addColorStop(1, isDarter ? "rgba(255, 178, 213, 0)" : "rgba(162, 247, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, phage.r * 2.6, 0, Math.PI * 2);
    ctx.fill();

    const headGradient = ctx.createRadialGradient(-2, -2, 2, 0, 0, phage.r);
    if (isDarter) {
      headGradient.addColorStop(0, "rgba(255, 220, 237, 0.97)");
      headGradient.addColorStop(1, "rgba(206, 102, 144, 0.94)");
    } else {
      headGradient.addColorStop(0, "rgba(193, 248, 255, 0.96)");
      headGradient.addColorStop(1, "rgba(72, 165, 194, 0.94)");
    }
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const a = (Math.PI / 3) * i;
      const px = Math.cos(a) * phage.r;
      const py = Math.sin(a) * phage.r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = isDarter ? "rgba(255, 225, 238, 0.9)" : "rgba(198, 251, 255, 0.92)";
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.strokeStyle = isDarter ? "rgba(252, 174, 214, 0.62)" : "rgba(143, 230, 241, 0.58)";
    ctx.lineWidth = 1.05;
    for (let i = 0; i < 3; i += 1) {
      const angle = (Math.PI / 3) * i;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * phage.r * 0.2, Math.sin(angle) * phage.r * 0.2);
      ctx.lineTo(Math.cos(angle) * phage.r * 0.78, Math.sin(angle) * phage.r * 0.78);
      ctx.stroke();
    }

    const tailBase = phage.r + phage.r * 0.18;
    const tailY = phage.r + phage.r * (isDarter ? 1.54 : 1.72);
    ctx.strokeStyle = isDarter ? "rgba(255, 212, 233, 0.86)" : "rgba(188, 248, 255, 0.86)";
    ctx.lineWidth = isDarter ? 1.65 : 2;
    ctx.beginPath();
    ctx.moveTo(0, tailBase);
    ctx.lineTo(0, tailY);
    ctx.stroke();

    ctx.strokeStyle = isDarter ? "rgba(255, 170, 213, 0.74)" : "rgba(144, 233, 246, 0.8)";
    ctx.lineWidth = isDarter ? 1.2 : 1.6;
    ctx.beginPath();
    ctx.moveTo(-phage.r * 0.42, tailBase + phage.r * 0.22);
    ctx.lineTo(phage.r * 0.42, tailBase + phage.r * 0.22);
    ctx.moveTo(-phage.r * 0.3, tailBase + phage.r * 0.55);
    ctx.lineTo(phage.r * 0.3, tailBase + phage.r * 0.55);
    ctx.stroke();

    ctx.strokeStyle = isDarter ? "rgba(255, 204, 228, 0.86)" : "rgba(162, 244, 255, 0.82)";
    ctx.lineWidth = isDarter ? 1.1 : 1.4;
    ctx.beginPath();
    ctx.moveTo(0, tailY);
    ctx.lineTo(-phage.r * 1.02, tailY + phage.r * 0.92);
    ctx.moveTo(0, tailY);
    ctx.lineTo(phage.r * 1.02, tailY + phage.r * 0.92);
    ctx.moveTo(-phage.r * 0.18, tailY + phage.r * 0.2);
    ctx.lineTo(-phage.r * 1.06, tailY + phage.r * 0.78);
    ctx.moveTo(phage.r * 0.18, tailY + phage.r * 0.2);
    ctx.lineTo(phage.r * 1.06, tailY + phage.r * 0.78);
    ctx.stroke();

    ctx.restore();
  }

  function drawResource(resource, time) {
    ctx.save();
    ctx.translate(resource.x, resource.y);
    ctx.rotate(time * 0.0007 + resource.phase * 0.5);

    if (resource.kind === "shield") {
      const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, resource.r * 2.1);
      glow.addColorStop(0, "rgba(139, 246, 255, 0.9)");
      glow.addColorStop(1, "rgba(62, 168, 201, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, resource.r * 2.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(150, 243, 255, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, resource.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-resource.r * 0.55, 0);
      ctx.lineTo(resource.r * 0.55, 0);
      ctx.moveTo(0, -resource.r * 0.55);
      ctx.lineTo(0, resource.r * 0.55);
      ctx.stroke();
      ctx.strokeStyle = "rgba(182, 252, 255, 0.72)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, resource.r * 0.58, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      const glow = ctx.createRadialGradient(0, 0, 1, 0, 0, resource.r * 2.2);
      glow.addColorStop(0, "rgba(175, 255, 214, 0.86)");
      glow.addColorStop(1, "rgba(83, 199, 154, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, resource.r * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(167, 255, 213, 0.95)";
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const a = (Math.PI / 3) * i;
        const px = Math.cos(a) * resource.r;
        const py = Math.sin(a) * resource.r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(34, 94, 81, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = "rgba(220, 255, 236, 0.62)";
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(-resource.r * 0.4, 0);
      ctx.lineTo(resource.r * 0.4, 0);
      ctx.moveTo(0, -resource.r * 0.4);
      ctx.lineTo(0, resource.r * 0.4);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawMorphologyPath(model, length, radius) {
    if (model.shape === "coccus") {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.closePath();
      return;
    }
    if (model.shape === "coccobacillus") {
      drawCapsule(0, 0, length * 0.84, radius * 0.92);
      return;
    }
    drawCapsule(0, 0, length, radius);
  }

  function drawMorphologyAccents(model, length, radius, alpha) {
    if (model.shape === "coccus") {
      ctx.strokeStyle = `rgba(255, 238, 203, ${clamp(alpha * 0.7, 0, 1).toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.55, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 3; i += 1) {
        const theta = -0.8 + i * 0.8;
        const x = Math.cos(theta) * radius * 0.56;
        const y = Math.sin(theta) * radius * 0.48;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      return;
    }

    ctx.globalAlpha = clamp(alpha * 0.82, 0, 1);
    ctx.strokeStyle = model.shape === "encapsulated-rod" ? "rgba(203, 255, 231, 0.76)" : "rgba(161, 245, 255, 0.8)";
    ctx.lineWidth = 1.2;
    for (let i = -2; i <= 2; i += 1) {
      const offset = i * 6;
      ctx.beginPath();
      ctx.moveTo(-length * 0.26, offset);
      ctx.lineTo(length * 0.26, offset);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (model.shape === "encapsulated-rod") {
      ctx.strokeStyle = "rgba(195, 255, 228, 0.44)";
      ctx.lineWidth = 1.8;
      drawCapsule(0, 0, length * 1.08, radius * 1.13);
      ctx.stroke();
    }
  }

  function drawTrails() {
    if (!state.trails.length) return;
    const model = getModel(state.modelId);

    state.trails.forEach((trail, index) => {
      const alpha = clamp((trail.life / trail.maxLife) * 0.44, 0, 0.44);
      const widthScale = clamp(index / state.trails.length, 0.3, 1);
      ctx.save();
      ctx.translate(trail.x, trail.y);
      ctx.rotate(trail.angle);
      const trailColor = model.shape === "coccus" ? "255, 224, 159" : "130, 228, 238";
      ctx.fillStyle = `rgba(${trailColor}, ${alpha.toFixed(3)})`;
      drawMorphologyPath(model, state.player.length * 0.72 * widthScale, state.player.radius * 0.58 * widthScale);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawPlayer(time) {
    const model = getModel(state.modelId);
    const palette = model.palette;
    ctx.save();
    ctx.translate(state.player.x, state.player.y);
    ctx.rotate(state.player.angle);

    const outerLength = state.player.length;
    const outerRadius = state.player.radius;

    const membrane = ctx.createLinearGradient(-outerLength / 2, 0, outerLength / 2, 0);
    membrane.addColorStop(0, palette.membraneA);
    membrane.addColorStop(0.5, palette.membraneB);
    membrane.addColorStop(1, palette.membraneC);

    ctx.fillStyle = membrane;
    drawMorphologyPath(model, outerLength, outerRadius);
    ctx.fill();

    ctx.globalAlpha = 0.62;
    ctx.fillStyle = palette.core;
    drawMorphologyPath(model, outerLength * 0.78, outerRadius * 0.65);
    ctx.fill();

    ctx.globalAlpha = 0.88;
    ctx.strokeStyle = "rgba(185, 252, 255, 0.94)";
    ctx.lineWidth = 2;
    drawMorphologyPath(model, outerLength, outerRadius);
    ctx.stroke();

    drawMorphologyAccents(model, outerLength, outerRadius, 0.42);

    ctx.restore();

    if (state.shield > 0) {
      const r = state.player.radius + 8 + Math.sin(time * 0.01) * 1.8;
      const baseAlpha = clamp(0.25 + state.shield / 220, 0.25, 0.7);
      const shieldColor = palette.shield || "rgba(125, 243, 255, 0.7)";
      ctx.strokeStyle = toRgba(shieldColor, baseAlpha);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (state.invulnerable > 0) {
      const blink = Math.sin(time * 0.04) > 0;
      if (blink) {
        ctx.strokeStyle = "rgba(255, 140, 172, 0.74)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, state.player.radius + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  function drawLysisPhages() {
    state.lysisPhages.forEach((phage) => {
      const fade = clamp(phage.life / phage.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = fade;
      drawPhage(phage);
      ctx.restore();
    });
  }

  function drawCollapsingCell(time) {
    const model = getModel(state.modelId);
    const palette = model.palette;
    const progress = clamp(state.collapseTimer / state.collapseDuration, 0, 1);
    const swell = progress < 0.24 ? 1 + progress * 0.5 : 1.12 - (progress - 0.24) * 0.82;
    const membraneAlpha = clamp(0.95 - progress * 1.35, 0, 1);
    const coreAlpha = clamp(0.78 - progress * 1.25, 0, 0.78);
    const stretch = 1 + Math.sin(time * 0.02) * 0.05 * (1 - progress);

    ctx.save();
    ctx.translate(state.player.x, state.player.y);
    ctx.rotate(state.player.angle);
    ctx.scale(swell * stretch, swell);

    const outerLength = state.player.length;
    const outerRadius = state.player.radius;
    const membrane = ctx.createLinearGradient(-outerLength / 2, 0, outerLength / 2, 0);
    membrane.addColorStop(0, toRgba(palette.membraneA, membraneAlpha));
    membrane.addColorStop(0.55, `rgba(255, 170, 203, ${(membraneAlpha * 0.86).toFixed(3)})`);
    membrane.addColorStop(1, toRgba(palette.membraneC, membraneAlpha));
    ctx.fillStyle = membrane;
    drawMorphologyPath(model, outerLength, outerRadius);
    ctx.fill();

    ctx.fillStyle = toRgba(palette.core, coreAlpha);
    drawMorphologyPath(model, outerLength * 0.78, outerRadius * 0.64);
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(241, 194, 220, ${(membraneAlpha * 0.9).toFixed(3)})`;
    drawMorphologyPath(model, outerLength, outerRadius);
    ctx.stroke();
    drawMorphologyAccents(model, outerLength, outerRadius, membraneAlpha * 0.42);
    ctx.restore();

    const flash = clamp(1 - Math.abs(progress - 0.22) / 0.22, 0, 1);
    if (flash > 0) {
      const burst = ctx.createRadialGradient(
        state.player.x,
        state.player.y,
        state.player.radius * 0.8,
        state.player.x,
        state.player.y,
        state.player.radius * (7 + flash * 10)
      );
      burst.addColorStop(0, `rgba(255, 208, 224, ${(flash * 0.32).toFixed(3)})`);
      burst.addColorStop(1, "rgba(255, 208, 224, 0)");
      ctx.fillStyle = burst;
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y, state.player.radius * (7 + flash * 10), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawVignette() {
    const vignette = ctx.createRadialGradient(
      state.width * 0.5,
      state.height * 0.5,
      Math.min(state.width, state.height) * 0.22,
      state.width * 0.5,
      state.height * 0.5,
      Math.max(state.width, state.height) * 0.76
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.34)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, state.width, state.height);
  }

  function drawCapsule(x, y, length, radius) {
    const half = length / 2;
    ctx.beginPath();
    ctx.moveTo(x - half + radius, y - radius);
    ctx.lineTo(x + half - radius, y - radius);
    ctx.arc(x + half - radius, y, radius, -Math.PI / 2, Math.PI / 2, false);
    ctx.lineTo(x - half + radius, y + radius);
    ctx.arc(x - half + radius, y, radius, Math.PI / 2, -Math.PI / 2, false);
    ctx.closePath();
  }

  function drawBursts() {
    state.bursts.forEach((burst) => {
      const alpha = clamp(burst.life / burst.maxLife, 0, 1);
      ctx.fillStyle = toRgba(burst.color, alpha);
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, burst.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawFloaters() {
    state.floaters.forEach((floater) => {
      const alpha = clamp(floater.life / floater.maxLife, 0, 1);
      ctx.fillStyle = toRgba(floater.color, alpha);
      ctx.font = "700 13px Manrope, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(floater.text, floater.x, floater.y);
    });
  }

  function toRgba(hexOrRgb, alpha) {
    if (hexOrRgb.startsWith("rgba")) {
      const values = hexOrRgb
        .replace("rgba(", "")
        .replace(")", "")
        .split(",")
        .map((part) => part.trim());
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha.toFixed(3)})`;
    }
    if (hexOrRgb.startsWith("rgb")) {
      const values = hexOrRgb
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((part) => part.trim());
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha.toFixed(3)})`;
    }
    const hex = hexOrRgb.replace("#", "");
    const value = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const r = Number.parseInt(value.slice(0, 2), 16);
    const g = Number.parseInt(value.slice(2, 4), 16);
    const b = Number.parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  }

  function drawFrame(timestamp) {
    if (!isModalOpen()) return;

    let dt = 0.016;
    if (lastFrame) {
      dt = clamp((timestamp - lastFrame) / 1000, 0.001, 0.033);
    }
    lastFrame = timestamp;

    if (state.running && !state.paused) {
      updateSimulation(dt);
    }
    if (state.collapseActive) {
      updateLysisSequence(dt);
    }

    ctx.save();
    if (state.shake > 0 && !prefersReducedMotion) {
      const shakeX = random(-state.shake, state.shake) * 0.28;
      const shakeY = random(-state.shake, state.shake) * 0.28;
      ctx.translate(shakeX, shakeY);
    }

    drawBackground(timestamp);
    state.pulses.forEach(drawPulse);
    state.resources.forEach((resource) => drawResource(resource, timestamp));
    state.phages.forEach(drawPhage);
    drawTrails();
    if (state.collapseActive) {
      drawLysisPhages();
      drawCollapsingCell(timestamp);
    } else {
      drawPlayer(timestamp);
    }
    drawBursts();
    drawFloaters();
    drawVignette();
    ctx.restore();

    if (isModalOpen()) {
      rafId = window.requestAnimationFrame(drawFrame);
    } else {
      rafId = null;
    }
  }

  function ensureLoop() {
    if (rafId !== null) return;
    lastFrame = 0;
    rafId = window.requestAnimationFrame(drawFrame);
  }

  function onKeyChange(event, value) {
    const key = event.key.toLowerCase();

    if (key === "arrowup" || key === "w") keys.up = value;
    if (key === "arrowdown" || key === "s") keys.down = value;
    if (key === "arrowleft" || key === "a") keys.left = value;
    if (key === "arrowright" || key === "d") keys.right = value;

    if (value && key === " " && state.running) {
      event.preventDefault();
      if (state.paused) resumeSimulation();
      else pauseSimulation();
    }
  }

  trigger.addEventListener("click", () => {
    trigger.classList.add("is-arming");
    if (triggerTimer) window.clearTimeout(triggerTimer);
    triggerTimer = window.setTimeout(() => {
      trigger.classList.remove("is-arming");
      triggerTimer = null;
    }, 420);
    openModal();
  });
  closeButton.addEventListener("click", closeModal);

  startButton.addEventListener("click", () => {
    if (overlayMode === "resume") {
      resumeSimulation();
      return;
    }
    startSimulation();
  });

  pauseButton.addEventListener("click", () => {
    if (!state.running) return;
    if (state.paused) resumeSimulation();
    else pauseSimulation();
  });

  restartButton.addEventListener("click", startSimulation);

  if (nameFormEl) {
    nameFormEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (state.pendingScore === null) return;

      const savedName = sanitizeName(nameInputEl ? nameInputEl.value : "") || "Anonymous";
      const savedScore = state.pendingScore;
      const accepted = await addLeaderboardEntry(savedName, savedScore);
      if (!accepted) {
        setNameFeedback("Name unavailable. Try a different one.");
        if (nameInputEl) {
          nameInputEl.focus({ preventScroll: true });
          nameInputEl.select();
        }
        return;
      }
      hideNameForm();
      showOverlay(
        "Score logged",
        `${savedName} added with ${savedScore} points. Highest score: ${Math.floor(state.best)}.`,
        "Run Again",
        "restart"
      );
    });
  }

  if (nameSkipEl) {
    nameSkipEl.addEventListener("click", () => {
      hideNameForm();
      if (!state.running && !state.collapseActive) {
        showOverlay(
          "Envelope collapsed",
          `Final score: ${Math.floor(state.score)}. Highest score: ${Math.floor(state.best)}.`,
          "Run Again",
          "restart"
        );
      }
    });
  }

  if (modelSelectEl) {
    modelSelectEl.addEventListener("change", () => {
      setModel(modelSelectEl.value, true);
      if (!state.running && isModalOpen()) ensureLoop();
    });
  }

  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  window.addEventListener("keydown", (event) => {
    if (!isModalOpen()) return;
    onKeyChange(event, true);
  });

  window.addEventListener("keyup", (event) => {
    if (!isModalOpen()) return;
    onKeyChange(event, false);
  });

  canvas.addEventListener("pointerdown", (event) => {
    pointer.active = true;
    pointerToWorld(event);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!pointer.active) return;
    pointerToWorld(event);
  });

  canvas.addEventListener("pointerup", () => {
    pointer.active = false;
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", () => {
    if (!isModalOpen()) return;
    resizeCanvas();
    ensureLoop();
  });

  setModel(state.modelId, false);
  hideNameForm();
  setLeaderboardMeta(state.leaderboardMode === "global" ? "global" : "local");
  renderLeaderboard();
  refreshLeaderboardFromSource();
  updateHud();
})();
