// Shared/global leaderboard endpoint bootstrap.
// Priority:
// 1) Explicit value in this file (`hardcodedEndpoint`)
// 2) Query string: ?leaderboardUrl=https://.../leaderboard
// 3) localStorage key `bernhardt_global_leaderboard_url`
// 4) <meta name="bernhardt-leaderboard-url" content="https://.../leaderboard">
//
// Set `hardcodedEndpoint` to your deployed Cloudflare Worker public route to
// enable one persistent leaderboard for all site visitors.
(function configureEnvelopeLeaderboard() {
  const hardcodedEndpoint = "";
  const STORAGE_KEY = "bernhardt_global_leaderboard_url";
  const META_NAME = "bernhardt-leaderboard-url";
  const QUERY_KEY = "leaderboardUrl";

  const cleanUrl = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    try {
      const parsed = new URL(raw, window.location.origin);
      if (!/^https?:$/i.test(parsed.protocol)) return "";
      if (!/\/(api\/)?leaderboard$/i.test(parsed.pathname)) return "";
      return parsed.toString();
    } catch {
      return "";
    }
  };

  const queryCandidate = (() => {
    try {
      return cleanUrl(new URL(window.location.href).searchParams.get(QUERY_KEY) || "");
    } catch {
      return "";
    }
  })();

  const storedCandidate = (() => {
    try {
      return cleanUrl(window.localStorage.getItem(STORAGE_KEY) || "");
    } catch {
      return "";
    }
  })();

  const metaCandidate = (() => {
    const meta = document.querySelector(`meta[name="${META_NAME}"]`);
    return cleanUrl(meta ? meta.getAttribute("content") : "");
  })();

  const endpoint = cleanUrl(hardcodedEndpoint) || queryCandidate || storedCandidate || metaCandidate || "";

  if (queryCandidate) {
    try {
      window.localStorage.setItem(STORAGE_KEY, queryCandidate);
    } catch {
      /* no-op */
    }
  }

  if (endpoint && endpoint !== storedCandidate) {
    try {
      window.localStorage.setItem(STORAGE_KEY, endpoint);
    } catch {
      /* no-op */
    }
  }

  window.ENVELOPE_LEADERBOARD_URL = endpoint;
})();
