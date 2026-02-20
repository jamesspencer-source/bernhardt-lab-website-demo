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

  const prefersReducedMotion =
    typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const STORAGE_KEY = "bernhardt-envelope-escape-best";

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
    particles: [],
    phages: [],
    pulses: [],
    resources: [],
    bursts: [],
    floaters: [],
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

  let rafId = null;
  let lastFrame = 0;
  let overlayMode = "start";

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

    state.width = width;
    state.height = height;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    if (state.player.x === 0 && state.player.y === 0) {
      placePlayerCenter();
    } else {
      state.player.x = clamp(state.player.x, state.player.radius, state.width - state.player.radius);
      state.player.y = clamp(state.player.y, state.player.radius, state.height - state.player.radius);
    }
  }

  function placePlayerCenter() {
    state.player.radius = clamp(Math.round(state.height * 0.035), 15, 24);
    state.player.length = Math.round(state.player.radius * 2.7);
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
    state.phages = [];
    state.pulses = [];
    state.resources = [];
    state.bursts = [];
    state.floaters = [];
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
    state.running = false;
    state.paused = false;
    pauseButton.textContent = "Pause";

    showOverlay(
      "Run a hidden Bernhardt Lab simulation.",
      "Guide a bacterium through phage pressure and antibiotic pulses. Collect envelope-building precursors to maintain integrity.",
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

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function startSimulation() {
    resetSimulation();
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

    if (state.score > state.best) {
      state.best = Math.floor(state.score);
      writeBestScore(state.best);
    }

    updateHud();

    showOverlay(
      "Envelope collapsed",
      `Final score: ${Math.floor(state.score)}. Highest score: ${Math.floor(state.best)}.`,
      "Run Again",
      "restart"
    );
  }

  function spawnPhage() {
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
    const speed = random(72, 108) + difficulty * 18;
    const angle = Math.atan2(state.player.y - y, state.player.x - x) + random(-0.35, 0.35);

    state.phages.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: random(11, 16),
      spin: random(-2.4, 2.4),
      rot: random(0, Math.PI * 2),
      wobble: random(0, Math.PI * 2),
      wobbleAmp: random(4, 12)
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
      hitLock: 0
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

  function applyDamage(amount, label) {
    if (state.invulnerable > 0) return;

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
    state.score += dt * (16 + state.elapsed * 0.22 + state.combo * 0.8);

    state.invulnerable = Math.max(0, state.invulnerable - dt);
    state.shake = Math.max(0, state.shake - dt * 22);
    state.shield = Math.max(0, state.shield - dt * 1.8);

    updatePlayer(dt);

    const difficulty = 1 + state.elapsed / 52;

    state.phageSpawnIn -= dt;
    state.pulseSpawnIn -= dt;
    state.resourceSpawnIn -= dt;

    if (state.phageSpawnIn <= 0) {
      spawnPhage();
      state.phageSpawnIn = clamp(random(0.66, 1.25) - difficulty * 0.06, 0.34, 1.25);
    }

    if (state.pulseSpawnIn <= 0) {
      spawnPulse();
      state.pulseSpawnIn = clamp(random(2.2, 4.4) - difficulty * 0.08, 1.25, 4.4);
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
      const steer = 0.4 * dt;
      const currentAngle = Math.atan2(phage.vy, phage.vx);
      const newAngle = currentAngle + clamp(targetAngle - currentAngle, -steer, steer);
      const speed = Math.hypot(phage.vx, phage.vy);

      phage.vx = Math.cos(newAngle) * speed;
      phage.vy = Math.sin(newAngle) * speed;
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
      }
    }

    for (let i = state.pulses.length - 1; i >= 0; i -= 1) {
      const pulse = state.pulses[i];
      pulse.r += pulse.speed * dt;
      pulse.hitLock = Math.max(0, pulse.hitLock - dt);

      const dist = Math.hypot(pulse.x - state.player.x, pulse.y - state.player.y);
      if (Math.abs(dist - pulse.r) < pulse.thickness + state.player.radius * 0.15 && pulse.hitLock <= 0) {
        applyDamage(12, "Antibiotic pulse");
        pulse.hitLock = 0.46;
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
      endSimulation();
    }

    updateHud();
  }

  function drawBackground(time) {
    const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
    gradient.addColorStop(0, "#040d1c");
    gradient.addColorStop(0.45, "#08233d");
    gradient.addColorStop(1, "#0c324e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.save();
    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = "rgba(129, 196, 207, 0.2)";
    ctx.lineWidth = 1;

    const spacing = 32;
    const offset = (time * 0.015) % spacing;
    for (let x = -spacing; x < state.width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, state.height);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.2;
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
      ctx.fillStyle = `rgba(150, 227, 233, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawPulse(pulse) {
    const ringAlpha = clamp(0.5 - pulse.r / (pulse.maxR * 1.2), 0.08, 0.44);
    ctx.strokeStyle = `rgba(255, 133, 167, ${ringAlpha.toFixed(3)})`;
    ctx.lineWidth = pulse.thickness;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(148, 216, 255, ${(ringAlpha * 0.8).toFixed(3)})`;
    ctx.lineWidth = Math.max(2, pulse.thickness * 0.35);
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawPhage(phage) {
    ctx.save();
    ctx.translate(phage.x, phage.y);
    ctx.rotate(phage.rot);

    const headGradient = ctx.createRadialGradient(-2, -2, 2, 0, 0, phage.r);
    headGradient.addColorStop(0, "rgba(176, 242, 255, 0.95)");
    headGradient.addColorStop(1, "rgba(66, 159, 188, 0.95)");
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

    ctx.strokeStyle = "rgba(188, 248, 255, 0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, phage.r);
    ctx.lineTo(0, phage.r + phage.r * 1.7);
    ctx.stroke();

    ctx.strokeStyle = "rgba(144, 233, 246, 0.8)";
    ctx.lineWidth = 1.5;
    const tailY = phage.r + phage.r * 1.7;
    ctx.beginPath();
    ctx.moveTo(0, tailY);
    ctx.lineTo(-phage.r * 0.95, tailY + phage.r * 0.9);
    ctx.moveTo(0, tailY);
    ctx.lineTo(phage.r * 0.95, tailY + phage.r * 0.9);
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
    }

    ctx.restore();
  }

  function drawPlayer(time) {
    ctx.save();
    ctx.translate(state.player.x, state.player.y);
    ctx.rotate(state.player.angle);

    const outerLength = state.player.length;
    const outerRadius = state.player.radius;

    const membrane = ctx.createLinearGradient(-outerLength / 2, 0, outerLength / 2, 0);
    membrane.addColorStop(0, "#6ae7ee");
    membrane.addColorStop(0.5, "#9af9ff");
    membrane.addColorStop(1, "#4ec8d8");

    ctx.fillStyle = membrane;
    drawCapsule(0, 0, outerLength, outerRadius);
    ctx.fill();

    ctx.globalAlpha = 0.62;
    ctx.fillStyle = "rgba(9, 41, 69, 0.9)";
    drawCapsule(0, 0, outerLength * 0.78, outerRadius * 0.65);
    ctx.fill();

    ctx.globalAlpha = 0.88;
    ctx.strokeStyle = "rgba(185, 252, 255, 0.94)";
    ctx.lineWidth = 2;
    drawCapsule(0, 0, outerLength, outerRadius);
    ctx.stroke();

    ctx.globalAlpha = 0.42;
    ctx.strokeStyle = "rgba(161, 245, 255, 0.8)";
    ctx.lineWidth = 1.2;
    for (let i = -2; i <= 2; i += 1) {
      const offset = i * 6;
      ctx.beginPath();
      ctx.moveTo(-outerLength * 0.26, offset);
      ctx.lineTo(outerLength * 0.26, offset);
      ctx.stroke();
    }

    ctx.restore();

    if (state.shield > 0) {
      const r = state.player.radius + 8 + Math.sin(time * 0.01) * 1.8;
      ctx.strokeStyle = `rgba(125, 243, 255, ${clamp(0.25 + state.shield / 220, 0.25, 0.7).toFixed(3)})`;
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
    if (hexOrRgb.startsWith("rgb")) {
      return hexOrRgb.replace("rgb", "rgba").replace(")", `, ${alpha.toFixed(3)})`);
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
    drawPlayer(timestamp);
    drawBursts();
    drawFloaters();
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

  trigger.addEventListener("click", openModal);
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

  updateHud();
})();
