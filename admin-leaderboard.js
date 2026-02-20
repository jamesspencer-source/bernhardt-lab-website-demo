(() => {
  const form = document.getElementById("admin-auth-form");
  const endpointInput = document.getElementById("admin-endpoint");
  const tokenInput = document.getElementById("admin-token");
  const statusEl = document.getElementById("admin-status");
  const panel = document.getElementById("admin-panel");
  const tableBody = document.getElementById("admin-table-body");
  const emptyEl = document.getElementById("admin-empty");
  const refreshBtn = document.getElementById("admin-refresh");
  const lockBtn = document.getElementById("admin-lock");
  const anonymizeBtn = document.getElementById("admin-anonymize");
  const clearBtn = document.getElementById("admin-clear");

  if (!form || !endpointInput || !tokenInput || !statusEl || !panel || !tableBody || !emptyEl) return;

  const SESSION_TOKEN_KEY = "bernhardt_admin_token";
  const SESSION_ENDPOINT_KEY = "bernhardt_admin_endpoint";

  let adminEndpoint = "";
  let adminToken = "";

  function normalizeAdminEndpoint(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";

    try {
      const url = new URL(raw);
      const path = url.pathname.replace(/\/+$/, "");

      if (path.endsWith("/leaderboard")) {
        url.pathname = path.replace(/\/(api\/)?leaderboard$/i, "/admin/leaderboard");
      } else if (path.endsWith("/admin/leaderboard")) {
        url.pathname = path;
      } else {
        url.pathname = `${path}/admin/leaderboard`.replace(/\/\//g, "/");
      }

      url.search = "";
      url.hash = "";
      return url.toString();
    } catch {
      return "";
    }
  }

  function deriveFromPublicEndpoint(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    return normalizeAdminEndpoint(raw);
  }

  function setStatus(message, tone = "") {
    statusEl.textContent = message;
    statusEl.classList.remove("ok", "warn", "error");
    if (tone) statusEl.classList.add(tone);
  }

  function setUnlocked(unlocked) {
    panel.hidden = !unlocked;
    tokenInput.value = "";
  }

  function formatDate(ms) {
    const time = Number(ms) || Date.now();
    return new Date(time).toLocaleString();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function adminRequest(method, payload = null, limit = 100) {
    if (!adminEndpoint || !adminToken) throw new Error("Missing endpoint or password.");

    const url = new URL(adminEndpoint);
    if (method === "GET") {
      url.searchParams.set("limit", String(limit));
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": adminToken
      },
      body: payload ? JSON.stringify(payload) : null
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const msg = data && data.error ? data.error : `Request failed (${response.status})`;
      throw new Error(msg);
    }

    return data || {};
  }

  function renderRows(entries) {
    tableBody.innerHTML = "";

    if (!entries.length) {
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;

    entries.forEach((entry) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.id}</td>
        <td>${escapeHtml(entry.name || "Anonymous")}</td>
        <td>${Number(entry.score || 0)}</td>
        <td>${escapeHtml(formatDate(entry.createdAt))}</td>
        <td>
          <div class="admin-row-actions">
            <button class="admin-btn" type="button" data-action="rename" data-id="${entry.id}" data-name="${escapeHtml(
              entry.name || "Anonymous"
            )}">Rename</button>
            <button class="admin-btn danger" type="button" data-action="delete" data-id="${entry.id}">Delete</button>
          </div>
        </td>
      `;
      tableBody.append(tr);
    });
  }

  async function loadBoard(showMessage = true) {
    try {
      const payload = await adminRequest("GET", null, 200);
      const entries = Array.isArray(payload.entries) ? payload.entries : [];
      renderRows(entries);
      if (showMessage) setStatus(`Loaded ${entries.length} entries.`, "ok");
    } catch (error) {
      setStatus(error.message || "Could not load leaderboard.", "error");
    }
  }

  async function handleRowAction(event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const id = Number(btn.getAttribute("data-id") || 0);
    if (!id) return;

    if (action === "delete") {
      const confirmed = window.confirm("Delete this leaderboard entry?");
      if (!confirmed) return;
      try {
        await adminRequest("POST", { action: "delete", id });
        await loadBoard(false);
        setStatus(`Entry ${id} deleted.`, "ok");
      } catch (error) {
        setStatus(error.message || "Delete failed.", "error");
      }
      return;
    }

    if (action === "rename") {
      const current = btn.getAttribute("data-name") || "Anonymous";
      const next = window.prompt("New display name", current);
      if (next === null) return;
      try {
        await adminRequest("POST", { action: "rename", id, name: next });
        await loadBoard(false);
        setStatus(`Entry ${id} renamed.`, "ok");
      } catch (error) {
        setStatus(error.message || "Rename failed.", "error");
      }
    }
  }

  async function runBulkAction(action, confirmWord, promptText) {
    const typed = window.prompt(promptText, "");
    if (typed === null) return;
    if (typed !== confirmWord) {
      setStatus(`Cancelled. Type ${confirmWord} exactly to confirm.`, "warn");
      return;
    }

    try {
      await adminRequest("POST", { action, confirm: confirmWord });
      await loadBoard(false);
      setStatus(`${action.replace("_", " ")} complete.`, "ok");
    } catch (error) {
      setStatus(error.message || "Action failed.", "error");
    }
  }

  function loadSessionState() {
    const savedEndpoint = sessionStorage.getItem(SESSION_ENDPOINT_KEY) || "";
    const savedToken = sessionStorage.getItem(SESSION_TOKEN_KEY) || "";

    if (savedEndpoint) endpointInput.value = savedEndpoint;
    if (savedToken) {
      adminEndpoint = savedEndpoint;
      adminToken = savedToken;
      setUnlocked(true);
      setStatus("Admin mode unlocked.", "ok");
      loadBoard(false);
    }
  }

  function saveSessionState() {
    sessionStorage.setItem(SESSION_ENDPOINT_KEY, adminEndpoint);
    sessionStorage.setItem(SESSION_TOKEN_KEY, adminToken);
  }

  function clearSessionState() {
    sessionStorage.removeItem(SESSION_ENDPOINT_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const normalizedEndpoint = normalizeAdminEndpoint(endpointInput.value);
    const token = String(tokenInput.value || "").trim();

    if (!normalizedEndpoint) {
      setStatus("Enter a valid leaderboard API URL.", "error");
      return;
    }

    if (!token) {
      setStatus("Enter the admin password.", "error");
      return;
    }

    adminEndpoint = normalizedEndpoint;
    adminToken = token;
    endpointInput.value = normalizedEndpoint;

    try {
      setStatus("Verifying access...", "warn");
      await adminRequest("GET", null, 25);
      setUnlocked(true);
      saveSessionState();
      await loadBoard(false);
      setStatus("Admin mode unlocked.", "ok");
    } catch (error) {
      clearSessionState();
      adminToken = "";
      setUnlocked(false);
      setStatus(error.message || "Could not unlock admin mode.", "error");
    }
  });

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadBoard(true);
    });
  }

  if (lockBtn) {
    lockBtn.addEventListener("click", () => {
      clearSessionState();
      adminToken = "";
      tableBody.innerHTML = "";
      setUnlocked(false);
      setStatus("Locked.", "warn");
    });
  }

  if (anonymizeBtn) {
    anonymizeBtn.addEventListener("click", () => {
      runBulkAction("anonymize_all", "ANONYMIZE", "Type ANONYMIZE to anonymize every leaderboard name.");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      runBulkAction("clear_all", "ERASE", "Type ERASE to clear all leaderboard scores.");
    });
  }

  tableBody.addEventListener("click", handleRowAction);

  const configuredPublic = String(window.ENVELOPE_LEADERBOARD_URL || "").trim();
  if (!endpointInput.value && configuredPublic) {
    endpointInput.value = deriveFromPublicEndpoint(configuredPublic);
  }

  setUnlocked(false);
  setStatus("Enter admin password to unlock leaderboard controls.");
  loadSessionState();
})();
