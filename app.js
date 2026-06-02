/* ============================================================
   app.js  –  Application state, routing, UI rendering
   ============================================================ */

/* ── STATE ───────────────────────────────────────────────────── */
let STATE = {
  view: "landing", // landing | register | dashboard | skills | jobs | analysis | verify
  user: null,
  skills: {}, // { skillId: { proficiency: 1-5 } }
  verification: {}, // { skillId: VerificationResult }
  activeJob: null, // JOB_ROLES entry
  analysis: null, // result from full analysis
  quizState: null, // { skillId, answers, currentQ, finished }
  jobFilter: "all", // all | strong | developing
};

function loadState() {
  try {
    const raw = localStorage.getItem("careerready_state");
    if (raw) {
      const saved = JSON.parse(raw);
      STATE.user = saved.user || null;
      STATE.skills = saved.skills || {};
      STATE.verification = saved.verification || {};
      if (STATE.user) STATE.view = "dashboard";
    }
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(
      "careerready_state",
      JSON.stringify({
        user: STATE.user,
        skills: STATE.skills,
        verification: STATE.verification,
      }),
    );
  } catch (e) {}
}

function navigateTo(view, extra) {
  STATE.view = view;
  if (extra) Object.assign(STATE, extra);
  render();
  window.scrollTo(0, 0);
}

/* ── RENDER ROUTER ───────────────────────────────────────────── */
function render() {
  const root = document.getElementById("app");
  root.innerHTML = "";

  const nav = STATE.user ? renderNav() : "";

  switch (STATE.view) {
    case "landing":
      root.innerHTML = renderLanding();
      break;
    case "register":
      root.innerHTML = renderRegister();
      break;
    case "dashboard":
      root.innerHTML = nav + renderDashboard();
      break;
    case "skills":
      root.innerHTML = nav + renderSkillsPage();
      break;
    case "jobs":
      root.innerHTML = nav + renderJobsPage();
      break;
    case "analysis":
      root.innerHTML = nav + renderAnalysis();
      break;
    case "verify":
      root.innerHTML = nav + renderVerifyPage();
      break;
    default:
      root.innerHTML = renderLanding();
  }

  bindEvents();
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT RENDERERS
   ══════════════════════════════════════════════════════════════ */

/* ── NAV ───────────────────────────────────────────────────── */
function renderNav() {
  const links = [
    { view: "dashboard", label: "Dashboard", icon: "grid" },
    { view: "skills", label: "My Skills", icon: "layers" },
    { view: "jobs", label: "Browse Jobs", icon: "briefcase" },
  ];
  return `
  <nav class="nav">
    <div class="nav-brand">
      <div class="nav-logo">CR</div>
      <span class="nav-title">CareerReady</span>
    </div>
    <div class="nav-links">
      ${links
        .map(
          (l) => `
        <button class="nav-link ${STATE.view === l.view ? "active" : ""}"
          onclick="navigateTo('${l.view}')">
          ${l.label}
        </button>`,
        )
        .join("")}
    </div>
    <div class="nav-user">
      <span class="nav-username">${STATE.user ? escHtml(STATE.user.name.split(" ")[0]) : ""}</span>
      <button class="btn-icon" onclick="handleLogout()" title="Sign out">✕</button>
    </div>
  </nav>`;
}

/* ── LANDING ────────────────────────────────────────────────── */
function renderLanding() {
  return `
  <div class="landing">
    <nav class="nav nav-transparent">
      <div class="nav-brand">
        <div class="nav-logo">CR</div>
        <span class="nav-title">CareerReady</span>
      </div>
      <button class="btn btn-primary" onclick="navigateTo('register')">Get Started</button>
    </nav>
    <div class="hero">
      <div class="hero-tag">Intelligent Career Readiness System</div>
      <h1 class="hero-title">Know exactly where<br><span class="hero-accent">you stand</span> for any role</h1>
      <p class="hero-sub">Built for tech students and fresh graduates. Verify your skills, detect competency gaps, and get a personalised readiness score for the roles you want.</p>
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg" onclick="navigateTo('register')">Create Free Profile</button>
        <button class="btn btn-ghost btn-lg" onclick="handleDemo()">Try Demo</button>
      </div>
    </div>
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">⚖️</div>
        <h3>Weighted Skill Matching</h3>
        <p>Critical skills are scored higher. Get a compatibility score that reflects real hiring priorities.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>Skill Gap Analysis</h3>
        <p>See exactly which skills you're missing, categorised by urgency — High, Medium, or Low.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✅</div>
        <h3>Skill Verification</h3>
        <p>Prove your skills beyond self-reporting. Pass short knowledge quizzes to get a Verified badge.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📚</div>
        <h3>Learning Recommendations</h3>
        <p>For every skill gap, get a direct link to the best free resource to fill it — no vague advice.</p>
      </div>
    </div>
    <footer class="landing-footer">
      <p>Designed &amp; developed by Oladunjoye Samuel Faramola · Ajayi Crowther University · 2025</p>
    </footer>
  </div>`;
}

/* ── REGISTER ───────────────────────────────────────────────── */
function renderRegister() {
  return `
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-logo"><div class="nav-logo lg">CR</div></div>
      <h2 class="auth-title">Create your profile</h2>
      <p class="auth-sub">Start your career readiness journey</p>
      <div class="form-group">
        <label>Full Name</label>
        <input id="reg-name" type="text" placeholder="Samuel Faramola" class="input" />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input id="reg-email" type="email" placeholder="you@university.edu" class="input" />
      </div>
      <div class="form-group">
        <label>Institution</label>
        <input id="reg-institution" type="text" placeholder="Ajayi Crowther University" class="input" />
      </div>
      <div class="form-group">
        <label>Academic Level</label>
        <select id="reg-level" class="input">
          <option>100 Level</option><option>200 Level</option>
          <option>300 Level</option><option>400 Level</option>
          <option>Final Year Student</option><option>Fresh Graduate</option>
        </select>
      </div>
      <button class="btn btn-primary btn-block" id="reg-submit">Create Profile →</button>
      <p class="auth-back">Already have a profile? <a href="#" onclick="navigateTo('dashboard')">Go to Dashboard</a></p>
    </div>
  </div>`;
}

/* ── DASHBOARD ──────────────────────────────────────────────── */
function renderDashboard() {
  const userSkillIds = Object.keys(STATE.skills);
  const ranked = rankJobsByCompatibility(userSkillIds);
  const topJob = ranked[0];
  const avgScore = userSkillIds.length
    ? Math.round(
        ranked.reduce((s, r) => s + r.compatibilityScore, 0) / ranked.length,
      )
    : 0;
  const strongCount = ranked.filter((r) => r.compatibilityScore >= 60).length;
  const verifySummary = computeVerificationSummary(
    userSkillIds,
    STATE.verification,
  );

  return `
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Welcome back, ${escHtml(STATE.user.name.split(" ")[0])} 👋</h1>
        <p class="page-sub">${escHtml(STATE.user.level)} · ${escHtml(STATE.user.institution)}</p>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card" style="--accent:#185FA5;--bg:#E6F1FB">
        <div class="stat-value">${userSkillIds.length}</div>
        <div class="stat-label">Skills Added</div>
      </div>
      <div class="stat-card" style="--accent:#3B6D11;--bg:#EAF3DE">
        <div class="stat-value">${verifySummary.verified}</div>
        <div class="stat-label">Verified Skills</div>
      </div>
      <div class="stat-card" style="--accent:#BA7517;--bg:#FAEEDA">
        <div class="stat-value">${avgScore}%</div>
        <div class="stat-label">Avg Match Score</div>
      </div>
      <div class="stat-card" style="--accent:#533AB7;--bg:#EEEDFE">
        <div class="stat-value">${strongCount}</div>
        <div class="stat-label">Strong Matches</div>
      </div>
    </div>

    ${
      userSkillIds.length === 0
        ? `
    <div class="empty-state">
      <div class="empty-icon">🛠️</div>
      <h3>Build your skill profile first</h3>
      <p>Add your current skills to get personalised job match scores and gap analysis.</p>
      <button class="btn btn-primary" onclick="navigateTo('skills')">Add My Skills →</button>
    </div>
    `
        : `
    ${
      topJob
        ? `
    <div class="top-match-card">
      <div class="top-match-badge">⭐ Top Job Match</div>
      <div class="top-match-content">
        <div class="top-match-info">
          <h3>${escHtml(topJob.job.title)}</h3>
          <p>${escHtml(topJob.job.description)}</p>
          <div class="skill-tags">
            ${topJob.job.required
              .slice(0, 4)
              .map(
                (r) => `
              <span class="tag ${userSkillIds.includes(r.id) ? "tag-success" : "tag-neutral"}">
                ${userSkillIds.includes(r.id) ? "✓ " : ""}${escHtml(r.id)}
              </span>`,
              )
              .join("")}
          </div>
        </div>
        <div class="top-match-score">
          ${renderScoreRing(topJob.compatibilityScore, 100)}
          <button class="btn btn-primary mt-sm"
            onclick="handleAnalyse('${topJob.job.id}')">Analyse →</button>
        </div>
      </div>
    </div>
    `
        : ""
    }

    <div class="card">
      <h3 class="card-title">All Job Compatibility Scores</h3>
      <div class="bar-list">
        ${ranked
          .map(
            (r) => `
        <div class="bar-item" onclick="handleAnalyse('${r.job.id}')">
          <div class="bar-pct ${r.compatibilityScore >= 70 ? "pct-high" : r.compatibilityScore >= 45 ? "pct-mid" : "pct-low"}">
            ${r.compatibilityScore}%
          </div>
          <div class="bar-label">${escHtml(r.job.title)}</div>
          <div class="bar-track">
            <div class="bar-fill ${r.compatibilityScore >= 70 ? "fill-high" : r.compatibilityScore >= 45 ? "fill-mid" : "fill-low"}"
              style="width:${r.compatibilityScore}%"></div>
          </div>
        </div>`,
          )
          .join("")}
      </div>
    </div>
    `
    }

    <div class="quick-actions">
      <button class="qa-card" onclick="navigateTo('skills')">
        <span class="qa-icon">🛠️</span>
        <span class="qa-label">Update Skills</span>
      </button>
      <button class="qa-card" onclick="navigateTo('verify')">
        <span class="qa-icon">✅</span>
        <span class="qa-label">Verify Skills</span>
      </button>
      <button class="qa-card" onclick="navigateTo('jobs')">
        <span class="qa-icon">🔍</span>
        <span class="qa-label">Browse Jobs</span>
      </button>
    </div>
  </div>`;
}

/* ── SKILLS PAGE ────────────────────────────────────────────── */
function renderSkillsPage() {
  const userSkillIds = Object.keys(STATE.skills);
  const searchVal = STATE.skillSearch || "";

  return `
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Skill Profile</h1>
        <p class="page-sub">Select all skills you currently possess. Be honest — accuracy drives your results.</p>
      </div>
      <div class="selected-count">${userSkillIds.length} selected</div>
    </div>

    <div class="card mb-md">
      <input id="skill-search" type="text" class="input"
        placeholder="Search skills…" value="${escHtml(searchVal)}"
        oninput="STATE.skillSearch=this.value;render()">
    </div>

    ${Object.entries(SKILL_TAXONOMY)
      .map(
        ([cat, subcats]) => `
    <div class="skill-category">
      <h3 class="cat-title">${escHtml(cat)}</h3>
      ${Object.entries(subcats)
        .map(([sub, skills]) => {
          const filtered = searchVal
            ? skills.filter(
                (s) =>
                  s.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                  s.synonyms.some((syn) =>
                    syn.toLowerCase().includes(searchVal.toLowerCase()),
                  ),
              )
            : skills;
          if (!filtered.length) return "";
          return `
        <div class="subcat">
          <div class="subcat-title">${escHtml(sub)}</div>
          <div class="skill-chips">
            ${filtered
              .map((skill) => {
                const sel = userSkillIds.includes(skill.id);
                const vr = STATE.verification[skill.id];
                const badge =
                  vr && vr.status === "verified"
                    ? '<span class="verify-dot" title="Verified">✓</span>'
                    : "";
                return `
              <button class="skill-chip ${sel ? "chip-sel" : ""}"
                onclick="toggleSkill('${skill.id}')">
                ${escHtml(skill.name)}${badge}
                ${
                  sel
                    ? `
                <select class="prof-select" onclick="event.stopPropagation()"
                  onchange="setProficiency('${skill.id}', this.value)">
                  ${PROFICIENCY_LEVELS.map(
                    (p) => `
                  <option value="${p.id}" ${(STATE.skills[skill.id]?.proficiency || 1) == p.id ? "selected" : ""}>
                    ${p.label}
                  </option>`,
                  ).join("")}
                </select>`
                    : ""
                }
              </button>`;
              })
              .join("")}
          </div>
        </div>`;
        })
        .join("")}
    </div>`,
      )
      .join("")}

    ${
      userSkillIds.length > 0
        ? `
    <div class="card mt-md">
      <div class="card-row">
        <h3 class="card-title mb-0">Your selected skills (${userSkillIds.length})</h3>
        <button class="btn btn-primary" onclick="navigateTo('jobs')">View Job Matches →</button>
      </div>
      <div class="tag-list mt-sm">
        ${userSkillIds
          .map((id) => {
            const vr = STATE.verification[id];
            const badge = vr && vr.status === "verified" ? " ✓" : "";
            return `<span class="tag tag-success">${escHtml(id)}${badge}</span>`;
          })
          .join("")}
      </div>
    </div>`
        : ""
    }
  </div>`;
}

/* ── JOBS PAGE ──────────────────────────────────────────────── */
function renderJobsPage() {
  const userSkillIds = Object.keys(STATE.skills);
  const ranked = rankJobsByCompatibility(userSkillIds);

  const filtered =
    STATE.jobFilter === "strong"
      ? ranked.filter((r) => r.compatibilityScore >= 60)
      : STATE.jobFilter === "developing"
        ? ranked.filter((r) => r.compatibilityScore < 60)
        : ranked;

  return `
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Browse Jobs</h1>
        <p class="page-sub">${userSkillIds.length} skills · ranked by compatibility score</p>
      </div>
      <div class="filter-tabs">
        ${[
          ["all", "All"],
          ["strong", "Strong (≥60%)"],
          ["developing", "Developing (<60%)"],
        ]
          .map(
            ([val, lbl]) => `
        <button class="filter-tab ${STATE.jobFilter === val ? "active" : ""}"
          onclick="STATE.jobFilter='${val}';render()">${lbl}</button>`,
          )
          .join("")}
      </div>
    </div>

    ${
      userSkillIds.length === 0
        ? `
    <div class="info-banner">
      ⚠️ You haven't added any skills yet.
      <a href="#" onclick="navigateTo('skills')">Build your skill profile</a> to see personalised match scores.
    </div>`
        : ""
    }

    <div class="job-list">
      ${filtered
        .map((r) => {
          const { matchedSkills, missingRequired } = matchSkills(
            userSkillIds,
            r.job,
          );
          const scoreClass =
            r.compatibilityScore >= 70
              ? "score-high"
              : r.compatibilityScore >= 45
                ? "score-mid"
                : "score-low";
          return `
        <div class="job-card" onclick="handleAnalyse('${r.job.id}')">
          <div class="job-score-block ${scoreClass}">
            <div class="job-score-num">${r.compatibilityScore}%</div>
            <div class="job-score-lbl">match</div>
          </div>
          <div class="job-card-body">
            <div class="job-card-row">
              <span class="job-title">${escHtml(r.job.title)}</span>
              <span class="level-badge">${escHtml(r.job.level)}</span>
            </div>
            <p class="job-desc">${escHtml(r.job.description)}</p>
            <div class="skill-tags">
              ${r.job.required
                .slice(0, 5)
                .map(
                  (req) => `
              <span class="tag ${userSkillIds.includes(req.id) ? "tag-success" : "tag-gap"}">
                ${userSkillIds.includes(req.id) ? "✓ " : "✗ "}${escHtml(req.id)}
              </span>`,
                )
                .join("")}
              ${r.job.required.length > 5 ? `<span class="tag tag-neutral">+${r.job.required.length - 5} more</span>` : ""}
            </div>
          </div>
          <div class="job-card-arrow">→</div>
        </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

/* ── ANALYSIS PAGE ──────────────────────────────────────────── */
function renderAnalysis() {
  if (!STATE.activeJob)
    return `<div class="page"><p>No job selected.</p></div>`;

  const job = STATE.activeJob;
  const userSkillIds = Object.keys(STATE.skills);
  const scored = computeWeightedScore(userSkillIds, job);
  const { gaps, gapSeverityIndex } = analyseSkillGaps(
    userSkillIds,
    STATE.skills,
    job,
  );
  const match = matchSkills(userSkillIds, job);
  const nextBest = getNextBestSkill(userSkillIds, job);
  const recs = getLearningRecommendations(gaps, job);

  const highGaps = gaps.filter((g) => g.urgency === "HIGH");
  const medGaps = gaps.filter((g) => g.urgency === "MEDIUM");
  const lowGaps = gaps.filter((g) => g.urgency === "LOW");

  const scoreLabel =
    scored.compatibilityScore >= 75
      ? "Strong Match"
      : scored.compatibilityScore >= 50
        ? "Partial Match"
        : "Needs Development";

  const scoreColour =
    scored.compatibilityScore >= 75
      ? "badge-success"
      : scored.compatibilityScore >= 50
        ? "badge-warn"
        : "badge-danger";

  return `
  <div class="page">
    <button class="back-btn" onclick="navigateTo('jobs')">← Back to Jobs</button>

    <div class="analysis-header">
      <div class="analysis-meta">
        <span class="badge ${scoreColour}">${scoreLabel}</span>
        <h1 class="page-title">${escHtml(job.title)}</h1>
        <p class="page-sub">${escHtml(job.description)}</p>
      </div>
      <div class="analysis-score-block">
        ${renderScoreRing(scored.compatibilityScore, 110)}
        <div class="score-sub-label">Compatibility</div>
        <div class="readiness-score">
          <span class="readiness-num">${scored.readinessScore}%</span>
          <span class="readiness-lbl">Required Skills</span>
        </div>
      </div>
    </div>

    <!-- Summary stats -->
    <div class="stat-grid compact">
      <div class="stat-card" style="--accent:#3B6D11;--bg:#EAF3DE">
        <div class="stat-value">${match.matchedSkills.length}/${job.required.length}</div>
        <div class="stat-label">Required Matched</div>
      </div>
      <div class="stat-card" style="--accent:#A32D2D;--bg:#FCEBEB">
        <div class="stat-value">${match.missingRequired.length}</div>
        <div class="stat-label">Skill Gaps</div>
      </div>
      <div class="stat-card" style="--accent:#185FA5;--bg:#E6F1FB">
        <div class="stat-value">${match.bonusSkills.length}/${job.nice.length}</div>
        <div class="stat-label">Bonus Skills</div>
      </div>
      <div class="stat-card" style="--accent:#A32D2D;--bg:#FCEBEB">
        <div class="stat-value">${gapSeverityIndex}%</div>
        <div class="stat-label">Gap Severity Index</div>
      </div>
    </div>

    <!-- Weighted score breakdown -->
    <div class="card mb-md">
      <h3 class="card-title">Weighted Score Breakdown</h3>
      <p class="card-sub">Score = earned points ÷ total possible points × 100.
        Critical skills (weight 2.0) contribute more than Standard skills (weight 1.0).</p>
      <div class="breakdown-table">
        <div class="breakdown-head">
          <span>Skill</span><span>Priority</span><span>Weight</span><span>Status</span><span>Points</span>
        </div>
        ${scored.breakdown.required
          .map(
            (r) => `
        <div class="breakdown-row ${r.has ? "row-has" : "row-missing"}">
          <span class="bd-skill">${escHtml(r.id)}</span>
          <span class="bd-label ${r.label === "Critical" ? "lbl-crit" : r.label === "Important" ? "lbl-imp" : "lbl-std"}">${r.label}</span>
          <span class="bd-weight">${r.weight}</span>
          <span class="bd-status">${r.has ? "✓ Have it" : "✗ Missing"}</span>
          <span class="bd-pts">${r.has ? r.weight : 0} / ${r.weight}</span>
        </div>`,
          )
          .join("")}
        ${scored.breakdown.nice
          .map(
            (n) => `
        <div class="breakdown-row row-nice ${n.has ? "row-has" : ""}">
          <span class="bd-skill">${escHtml(n.id)}</span>
          <span class="bd-label lbl-nice">Nice to Have</span>
          <span class="bd-weight">${n.weight}</span>
          <span class="bd-status">${n.has ? "✓ Bonus!" : "– Optional"}</span>
          <span class="bd-pts">${n.has ? n.weight : 0} / ${n.weight}</span>
        </div>`,
          )
          .join("")}
        <div class="breakdown-total">
          <span>Total</span><span></span><span>${scored.maxPoints}</span>
          <span></span><span>${scored.earnedPoints} / ${scored.maxPoints}</span>
        </div>
      </div>
    </div>

    <!-- Skill gap analysis -->
    ${
      gaps.length > 0
        ? `
    <div class="card mb-md">
      <h3 class="card-title">Skill Gap Analysis</h3>
      <p class="card-sub">Gaps ranked by urgency. Close HIGH gaps first — they have the biggest score impact.</p>

      ${
        highGaps.length
          ? `
      <div class="gap-section">
        <div class="gap-section-title high">🔴 HIGH — Critical Skills Missing</div>
        ${highGaps.map((g) => renderGapRow(g, job)).join("")}
      </div>`
          : ""
      }

      ${
        medGaps.length
          ? `
      <div class="gap-section">
        <div class="gap-section-title med">🟡 MEDIUM — Important Skills Missing</div>
        ${medGaps.map((g) => renderGapRow(g, job)).join("")}
      </div>`
          : ""
      }

      ${
        lowGaps.length
          ? `
      <div class="gap-section">
        <div class="gap-section-title low">🟢 LOW — Standard / Optional Skills</div>
        ${lowGaps.map((g) => renderGapRow(g, job)).join("")}
      </div>`
          : ""
      }
    </div>`
        : `
    <div class="success-banner">
      🎉 You meet all required skills for this role! Focus on nice-to-have skills to stand out.
    </div>`
    }

    <!-- Next best skill recommendation -->
    ${
      nextBest.skillId
        ? `
    <div class="next-best-card">
      <div class="nb-icon">🎯</div>
      <div class="nb-text">
        <strong>Next Best Skill to Learn:</strong> ${escHtml(nextBest.skillId)}<br>
        <span>Learning this one skill would raise your compatibility score by
          <strong>+${nextBest.scoreGain} percentage points</strong>.</span>
      </div>
    </div>`
        : ""
    }

    <!-- Learning recommendations -->
    ${
      recs.length > 0
        ? `
    <div class="card mb-md">
      <h3 class="card-title">📚 Learning Recommendations</h3>
      <p class="card-sub">Direct links to the best free resources for your HIGH and MEDIUM gaps.</p>
      <div class="resource-list">
        ${recs
          .map((r) => {
            if (!r.resource) return "";
            return `
          <div class="resource-row">
            <div class="resource-info">
              <div class="resource-skill">
                <span class="gap-badge gap-${r.urgency.toLowerCase()}">${r.urgency}</span>
                ${escHtml(r.skillId)}
              </div>
              <div class="resource-platform">${escHtml(r.resource.platform)} · ~${escHtml(r.resource.duration)}</div>
            </div>
            <a href="${escHtml(r.resource.url)}" target="_blank" rel="noopener noreferrer"
              class="btn btn-outline btn-sm">Start Learning →</a>
          </div>`;
          })
          .join("")}
      </div>
    </div>`
        : ""
    }

    <!-- Transferable skills -->
    ${
      match.transferable.length > 0
        ? `
    <div class="card mb-md">
      <h3 class="card-title">↔ Your Transferable Skills</h3>
      <p class="card-sub">These skills aren't required here but are valued across many other tech roles.</p>
      <div class="tag-list">
        ${match.transferable.map((id) => `<span class="tag tag-info">${escHtml(id)}</span>`).join("")}
      </div>
    </div>`
        : ""
    }
  </div>`;
}

function renderGapRow(gap, job) {
  const res = job.resources[gap.id];
  const type =
    gap.gapType === "proficiency"
      ? `Proficiency gap (currently ${PROFICIENCY_LEVELS.find((p) => p.id === gap.currentLevel)?.label || "low"}, target: Intermediate)`
      : `${gap.gapType.charAt(0).toUpperCase() + gap.gapType.slice(1)} skill gap`;
  return `
  <div class="gap-row">
    <div class="gap-row-info">
      <span class="gap-skill-name">${escHtml(gap.id)}</span>
      <span class="gap-type-lbl">${type}</span>
    </div>
    ${
      res
        ? `<a href="${escHtml(res.url)}" target="_blank" rel="noopener noreferrer"
      class="btn btn-outline btn-sm">${escHtml(res.platform)} →</a>`
        : ""
    }
  </div>`;
}

/* ── VERIFY PAGE ────────────────────────────────────────────── */
function renderVerifyPage() {
  const userSkillIds = Object.keys(STATE.skills);
  const verifySummary = computeVerificationSummary(
    userSkillIds,
    STATE.verification,
  );

  if (STATE.quizState && !STATE.quizState.finished) {
    return renderQuiz();
  }

  const quizSkills = userSkillIds.filter((id) => SKILL_QUIZZES[id]);
  const noQuizSkills = userSkillIds.filter((id) => !SKILL_QUIZZES[id]);

  return `
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Skill Verification</h1>
        <p class="page-sub">Prove your knowledge beyond self-reporting. Pass a 3-question quiz to earn a Verified badge on any skill.</p>
      </div>
    </div>

    <div class="stat-grid compact mb-md">
      <div class="stat-card" style="--accent:#3B6D11;--bg:#EAF3DE">
        <div class="stat-value">${verifySummary.verified}</div>
        <div class="stat-label">Verified</div>
      </div>
      <div class="stat-card" style="--accent:#A32D2D;--bg:#FCEBEB">
        <div class="stat-value">${verifySummary.failed}</div>
        <div class="stat-label">Failed</div>
      </div>
      <div class="stat-card" style="--accent:#BA7517;--bg:#FAEEDA">
        <div class="stat-value">${verifySummary.unverified}</div>
        <div class="stat-label">Unverified</div>
      </div>
      <div class="stat-card" style="--accent:#533AB7;--bg:#EEEDFE">
        <div class="stat-value">${verifySummary.verifiedPct}%</div>
        <div class="stat-label">Verified Rate</div>
      </div>
    </div>

    ${
      userSkillIds.length === 0
        ? `
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>No skills added yet</h3>
      <p>Add skills to your profile first before verifying them.</p>
      <button class="btn btn-primary" onclick="navigateTo('skills')">Add Skills →</button>
    </div>`
        : ""
    }

    ${
      quizSkills.length > 0
        ? `
    <div class="card mb-md">
      <h3 class="card-title">Skills with Verification Quiz</h3>
      <p class="card-sub">Pass 2 out of 3 questions to earn a Verified badge. You can retake any quiz.</p>
      <div class="verify-list">
        ${quizSkills
          .map((id) => {
            const vr = STATE.verification[id] || {
              verified: false,
              score: 0,
              total: 0,
            };
            const status = vr ? vr.status : "unverified";
            const statusMap = {
              verified: {
                cls: "vstatus-verified",
                icon: "✓",
                label: "Verified",
              },
              failed: {
                cls: "vstatus-failed",
                icon: "✗",
                label: `Failed (${vr.score}/${vr.total})`,
              },
              unverified: {
                cls: "vstatus-unverified",
                icon: "◌",
                label: "Not attempted",
              },
            };
            const s = statusMap[status] || statusMap.unverified;
            return `
          <div class="verify-row">
            <div class="verify-skill-info">
              <span class="verify-skill-name">${escHtml(id)}</span>
              <span class="vstatus ${s.cls}">${s.icon} ${s.label}</span>
            </div>
            <button class="btn ${status === "verified" ? "btn-outline" : "btn-primary"} btn-sm"
              onclick="startQuiz('${id}')">
              ${status === "verified" ? "Retake Quiz" : status === "failed" ? "Try Again" : "Start Quiz →"}
            </button>
          </div>`;
          })
          .join("")}
      </div>
    </div>`
        : ""
    }

    ${
      noQuizSkills.length > 0
        ? `
    <div class="card">
      <h3 class="card-title">Self-Reported Skills (no quiz available)</h3>
      <p class="card-sub">These skills are currently self-reported. Quizzes for more skills are planned in future updates.</p>
      <div class="tag-list">
        ${noQuizSkills.map((id) => `<span class="tag tag-neutral">${escHtml(id)}</span>`).join("")}
      </div>
    </div>`
        : ""
    }
  </div>`;
}

/* ── QUIZ ───────────────────────────────────────────────────── */
function renderQuiz() {
  const { skillId, answers, currentQ } = STATE.quizState;
  const quiz = SKILL_QUIZZES[skillId];
  const q = quiz.questions[currentQ];
  const total = quiz.questions.length;

  return `
  <div class="page">
    <button class="back-btn" onclick="cancelQuiz()">← Cancel Quiz</button>

    <div class="quiz-wrap">
      <div class="quiz-header">
        <div class="quiz-skill">Verifying: <strong>${escHtml(skillId)}</strong></div>
        <div class="quiz-progress">Question ${currentQ + 1} of ${total}</div>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${(currentQ / total) * 100}%"></div>
      </div>

      <div class="quiz-card">
        <p class="quiz-question">${escHtml(q.q)}</p>
        <div class="quiz-options">
          ${q.options
            .map(
              (opt, i) => `
          <button class="quiz-option ${answers[currentQ] === i ? "opt-selected" : ""}"
            onclick="selectAnswer(${i})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            ${escHtml(opt)}
          </button>`,
            )
            .join("")}
        </div>
        <div class="quiz-footer">
          <button class="btn btn-primary"
            ${answers[currentQ] == null ? "disabled" : ""}
            onclick="nextQuestion()">
            ${currentQ < total - 1 ? "Next Question →" : "Submit Quiz →"}
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderQuizResult() {
  const { skillId, answers } = STATE.quizState;
  const result = buildVerificationResult(skillId, answers);
  STATE.verification[skillId] = result;
  STATE.quizState.finished = true;
  saveState();

  const pass = result.status === "verified";
  return `
  <div class="page">
    <div class="quiz-wrap">
      <div class="quiz-result ${pass ? "result-pass" : "result-fail"}">
        <div class="result-icon">${pass ? "✅" : "❌"}</div>
        <h2>${pass ? "Skill Verified!" : "Not Verified Yet"}</h2>
        <p class="result-score">You scored <strong>${result.score} / ${result.total}</strong>
          (pass mark: ${result.passMark}/${result.total})</p>
        <p>${
          pass
            ? `You've earned a Verified badge for <strong>${escHtml(skillId)}</strong>. This skill will show a ✓ on your profile.`
            : `You need at least ${result.passMark} correct. Review the topic and try again — you can retake the quiz any time.`
        }</p>
        <div class="result-actions">
          <button class="btn btn-primary" onclick="navigateTo('verify')">Back to Verification</button>
          ${!pass ? `<button class="btn btn-outline" onclick="startQuiz('${skillId}')">Try Again</button>` : ""}
        </div>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════
   SVG SCORE RING
   ══════════════════════════════════════════════════════════════ */
function renderScoreRing(score, size) {
  const r = size / 2 - 10;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? "#1D9E75" : score >= 45 ? "#BA7517" : "#E24B4A";
  const track = score >= 70 ? "#C0DD97" : score >= 45 ? "#FAC775" : "#F7C1C1";
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="score-ring">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="7"
      transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="7"
      stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}" stroke-linecap="round"
      transform="rotate(-90 ${size / 2} ${size / 2})" class="ring-fill"/>
    <text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="middle"
      fill="${color}" font-size="${size > 90 ? 20 : 15}" font-weight="700"
      font-family="system-ui, sans-serif">${score}%</text>
  </svg>`;
}

/* ══════════════════════════════════════════════════════════════
   EVENT HANDLERS
   ══════════════════════════════════════════════════════════════ */
function bindEvents() {
  const regBtn = document.getElementById("reg-submit");
  if (regBtn) {
    regBtn.addEventListener("click", () => {
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const institution = document
        .getElementById("reg-institution")
        .value.trim();
      const level = document.getElementById("reg-level").value;
      if (!name || !email) {
        alert("Please enter your name and email.");
        return;
      }
      STATE.user = { name, email, institution, level };
      saveState();
      navigateTo("dashboard");
    });
  }
}

function toggleSkill(skillId) {
  if (STATE.skills[skillId]) {
    delete STATE.skills[skillId];
    delete STATE.verification[skillId]; // clear verification if skill removed
  } else {
    STATE.skills[skillId] = { proficiency: 1 };
  }
  saveState();
  render();
}

function setProficiency(skillId, level) {
  if (STATE.skills[skillId]) {
    STATE.skills[skillId].proficiency = parseInt(level);
    saveState();
  }
}

function handleAnalyse(jobId) {
  const job = JOB_ROLES.find((j) => j.id === jobId);
  if (job) navigateTo("analysis", { activeJob: job });
}

function startQuiz(skillId) {
  STATE.quizState = { skillId, answers: {}, currentQ: 0, finished: false };
  render();
}

function cancelQuiz() {
  STATE.quizState = null;
  navigateTo("verify");
}

function selectAnswer(optionIndex) {
  STATE.quizState.answers[STATE.quizState.currentQ] = optionIndex;
  render();
}

function nextQuestion() {
  const { answers, currentQ, skillId } = STATE.quizState;
  const quiz = SKILL_QUIZZES[skillId];
  if (currentQ < quiz.questions.length - 1) {
    STATE.quizState.currentQ = currentQ + 1;
    render();
  } else {
    // Finished — show result
    const root = document.getElementById("app");
    const nav = renderNav();
    root.innerHTML = nav + renderQuizResult();
  }
}

function handleLogout() {
  STATE.view = "landing";
  render();
}

function handleDemo() {
  STATE.user = {
    name: "Samuel Faramola",
    email: "samuel@acu.edu.ng",
    institution: "Ajayi Crowther University",
    level: "Final Year Student",
  };
  STATE.skills = {
    HTML: { proficiency: 4 },
    CSS: { proficiency: 3 },
    JavaScript: { proficiency: 3 },
    React: { proficiency: 2 },
    Git: { proficiency: 3 },
    Python: { proficiency: 2 },
    SQL: { proficiency: 2 },
    Communication: { proficiency: 3 },
    "Problem Solving": { proficiency: 3 },
  };
  saveState();
  navigateTo("dashboard");
}

/* ── HELPERS ─────────────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  render();
});
