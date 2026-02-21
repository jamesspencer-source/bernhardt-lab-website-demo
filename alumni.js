function clean(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function titleCase(value = "") {
  const text = clean(value).toLowerCase();
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => {
      if (["and", "of", "at", "in", "on", "to", "for"].includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace("Md", "MD")
    .replace("Phd", "PhD");
}

function roleBucket(role = "") {
  const label = clean(role).toLowerCase();
  if (!label) return "Unspecified";
  if (label.includes("postdoctoral") || label.includes("post-baccalaureate")) return "Postdoctoral / Postbac";
  if (label.includes("undergrad") || label.includes("undergraduate")) return "Undergraduate Alumni";
  if (label.includes("graduate")) return "Graduate Alumni";
  if (label.includes("technician") || label.includes("associate") || label.includes("staff")) return "Research Staff Alumni";
  return "Other Alumni";
}

function slugify(value = "") {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function localProfileHref(slug) {
  const path = (window.location.pathname || "").toLowerCase();
  const isNestedAlumniPage = path.includes("/alumni/");
  return isNestedAlumniPage ? `../alumni-profiles/${slug}.html` : `alumni-${slug}.html`;
}

const deduped = (() => {
  const map = new Map();

  rawAlumni.forEach((entry) => {
    const name = clean(entry.name);
    if (!name) return;

    const existing = map.get(name);

    let roleInLab = titleCase(entry.role_in_lab || "");
    let currentRole = clean(entry.current_role || "");
    const labDates = clean(entry.lab_dates || "");

    if (!currentRole && roleInLab.toLowerCase().includes(" at ")) {
      currentRole = roleInLab;
      roleInLab = "";
    }

    if (currentRole.toLowerCase().includes("john hopkins")) {
      currentRole = currentRole.replace(/john hopkins/i, "Johns Hopkins");
    }

    const normalized = {
      name,
      roleInLab: roleInLab || existing?.roleInLab || "",
      currentRole: currentRole || existing?.currentRole || "",
      labDates: labDates || existing?.labDates || "",
      sourceLabel: clean(entry.source || "Bernhardt Lab alumni page")
    };

    map.set(name, normalized);
  });

  return Array.from(map.values())
    .map((entry) => {
      const verified = verifiedAlumniProfiles[entry.name];
      return {
        ...entry,
        slug: slugify(entry.name),
        bucket: roleBucket(entry.roleInLab),
        verified: Boolean(verified),
        profileUrl: verified?.url || "",
        verifiedSource: verified?.source || "",
        localProfileUrl: localProfileHref(slugify(entry.name))
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
})();

const state = {
  query: "",
  bucket: "All"
};

const alumniRoot = document.getElementById("alumni-directory");
const alumniSearch = document.getElementById("alumni-search");
const alumniFilters = document.getElementById("alumni-filters");
const alumniCount = document.getElementById("alumni-count");

function filteredAlumni() {
  const query = state.query.trim().toLowerCase();

  return deduped.filter((entry) => {
    const matchesBucket = state.bucket === "All" || entry.bucket === state.bucket;
    if (!matchesBucket) return false;
    if (!query) return true;

    return `${entry.name} ${entry.roleInLab} ${entry.labDates} ${entry.currentRole} ${entry.bucket}`.toLowerCase().includes(query);
  });
}

function renderFilters() {
  if (!alumniFilters) return;
  const counts = deduped.reduce((acc, entry) => {
    acc[entry.bucket] = (acc[entry.bucket] || 0) + 1;
    return acc;
  }, {});

  const buckets = ["All", ...Object.keys(counts).sort((a, b) => a.localeCompare(b))];

  alumniFilters.innerHTML = buckets
    .map((bucket) => {
      const active = bucket === state.bucket ? "active" : "";
      const count = bucket === "All" ? deduped.length : counts[bucket];
      return `<button type="button" class="${active}" data-bucket="${bucket}">${bucket} (${count})</button>`;
    })
    .join("");

  alumniFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.bucket = button.dataset.bucket;
      renderFilters();
      renderAlumniDirectory();
    });
  });
}

function renderAlumniDirectory() {
  if (!alumniRoot || !alumniCount) return;
  const rows = filteredAlumni();

  if (!rows.length) {
    alumniRoot.innerHTML = `<div class="alumni-empty">No alumni match this search or filter.</div>`;
    alumniCount.textContent = "0 alumni shown";
    return;
  }

  alumniRoot.innerHTML = rows
    .map(
      (entry) => `
      <article class="alumni-card">
        <div class="alumni-top">
          <p class="alumni-bucket">${entry.bucket}</p>
          ${entry.verified ? `<span class="alumni-verified">Verified profile</span>` : ""}
        </div>
        <h3>${entry.name}</h3>
        <p class="alumni-role"><strong>Role in lab:</strong> ${entry.roleInLab || "Former lab member"}</p>
        ${entry.labDates ? `<p class="alumni-role"><strong>Lab dates:</strong> ${entry.labDates}</p>` : ""}
        <p class="alumni-current"><strong>Current / latest role:</strong> ${entry.currentRole || "Role update pending"}</p>
        <p class="alumni-source">${entry.verified ? `Source: ${entry.verifiedSource}` : `Source: ${entry.sourceLabel}`}</p>
        <div class="alumni-links">
          <a class="alumni-link" href="${entry.localProfileUrl}">Open alumni profile</a>
          ${entry.profileUrl ? `<a class="alumni-link" href="${entry.profileUrl}" target="_blank" rel="noreferrer">View current institutional profile</a>` : ""}
        </div>
      </article>
    `
    )
    .join("");

  alumniCount.textContent = `${rows.length} alumni shown`;
}

if (alumniSearch) {
  alumniSearch.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderAlumniDirectory();
  });
}

if (alumniRoot && alumniFilters && alumniCount) {
  renderFilters();
  renderAlumniDirectory();
}
