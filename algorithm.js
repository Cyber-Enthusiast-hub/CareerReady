/* ── 1. SKILL REPRESENTATION MODEL ───────────────── */
function resolveSkillId(rawInput) {
  const input = rawInput.trim().toLowerCase();
  for (const skill of SKILL_FLAT) {
    if (skill.id.toLowerCase() === input) return skill.id;
    if (skill.name.toLowerCase() === input) return skill.id;
    if (skill.synonyms.some((s) => s.toLowerCase() === input)) return skill.id;
  }
  return null; // unrecognised
}

function getSkillMeta(skillId) {
  return SKILL_FLAT.find((s) => s.id === skillId) || null;
}

/* ── 2. WEIGHTED SCORING MODEL ─────────────────────── */
function computeWeightedScore(userSkillIds, jobRole) {
  let earned = 0;
  let maxRequired = 0;
  let maxNice = 0;

  const breakdown = {
    required: [],
    nice: [],
  };

  for (const req of jobRole.required) {
    maxRequired += req.weight;
    const has = userSkillIds.includes(req.id);
    if (has) earned += req.weight;
    breakdown.required.push({
      id: req.id,
      weight: req.weight,
      label: req.label,
      has,
    });
  }

  for (const nice of jobRole.nice) {
    maxNice += nice.weight;
    const has = userSkillIds.includes(nice.id);
    if (has) earned += nice.weight;
    breakdown.nice.push({ id: nice.id, weight: nice.weight, has });
  }

  const maxPossible = maxRequired + maxNice;
  const score = maxPossible > 0 ? Math.round((earned / maxPossible) * 100) : 0;

  const matchedRequired = breakdown.required.filter((r) => r.has).length;
  const readinessScore =
    maxRequired > 0
      ? Math.round(
          (breakdown.required
            .filter((r) => r.has)
            .reduce((s, r) => s + r.weight, 0) /
            maxRequired) *
            100,
        )
      : 0;

  return {
    compatibilityScore: score,
    readinessScore,
    earnedPoints: +earned.toFixed(2),
    maxPoints: +maxPossible.toFixed(2),
    breakdown,
    matchedRequiredCount: matchedRequired,
    totalRequiredCount: jobRole.required.length,
  };
}

/* ── 3. SKILL MATCHING ALGORITHM ─────────────────── */
function matchSkills(userSkillIds, jobRole) {
  const requiredIds = jobRole.required.map((r) => r.id);
  const niceIds = jobRole.nice.map((n) => n.id);
  const jobAllIds = [...requiredIds, ...niceIds];

  const matchedSkills = jobRole.required.filter((r) =>
    userSkillIds.includes(r.id),
  );
  const missingRequired = jobRole.required.filter(
    (r) => !userSkillIds.includes(r.id),
  );
  const bonusSkills = jobRole.nice.filter((n) => userSkillIds.includes(n.id));
  const missingBonus = jobRole.nice.filter((n) => !userSkillIds.includes(n.id));
  const transferable = userSkillIds.filter((id) => !jobAllIds.includes(id));

  return {
    matchedSkills,
    missingRequired,
    bonusSkills,
    missingBonus,
    transferable,
  };
}

/* ── 4. SKILL GAP ANALYSIS ALGORITHM ────────────────*/
function analyseSkillGaps(userSkillIds, userProficiency, jobRole) {
  const { missingRequired, missingBonus } = matchSkills(userSkillIds, jobRole);

  const gaps = [];
  let gapWeightTotal = 0;
  let maxWeightTotal = 0;

  for (const req of jobRole.required) {
    maxWeightTotal += req.weight;
    const meta = getSkillMeta(req.id);
    const has = userSkillIds.includes(req.id);

    if (!has) {
      gapWeightTotal += req.weight;
      const gapType =
        meta && meta.type === "soft"
          ? "soft"
          : req.weight >= 2.0
            ? "technical"
            : req.weight >= 1.5
              ? "technical"
              : "standard";

      const urgency =
        req.weight >= 2.0 ? "HIGH" : req.weight >= 1.5 ? "MEDIUM" : "LOW";

      gaps.push({
        id: req.id,
        label: req.label,
        weight: req.weight,
        urgency,
        gapType,
        isRequired: true,
      });
    } else {
      // Proficiency gap check (§2.2.3 Proficiency-Level Gaps)
      const profLevel = userProficiency[req.id] || 0;
      if (profLevel > 0 && profLevel <= 2 && req.weight >= 1.5) {
        gaps.push({
          id: req.id,
          label: req.label,
          weight: req.weight * 0.5, // half weight — skill present, depth lacking
          urgency: "MEDIUM",
          gapType: "proficiency",
          isRequired: true,
          currentLevel: profLevel,
          targetLevel: 3,
        });
      }
    }
  }

  // Nice-to-have gaps (LOW priority)
  for (const nice of missingBonus) {
    const meta = getSkillMeta(nice.id);
    gaps.push({
      id: nice.id,
      label: "Nice-to-Have",
      weight: nice.weight,
      urgency: "LOW",
      gapType: meta && meta.type === "soft" ? "soft" : "standard",
      isRequired: false,
    });
  }

  // Sort: HIGH → MEDIUM → LOW, then by weight desc
  gaps.sort((a, b) => {
    const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    if (order[a.urgency] !== order[b.urgency])
      return order[a.urgency] - order[b.urgency];
    return b.weight - a.weight;
  });

  // Gap Severity Index: weighted ratio of missing critical/important skills
  const gapSeverityIndex =
    maxWeightTotal > 0
      ? Math.round((gapWeightTotal / maxWeightTotal) * 100)
      : 0;

  return { gaps, gapSeverityIndex };
}

/* ── 5. RECOMMENDATION ALGORITHM ────────────────── */
function rankJobsByCompatibility(userSkillIds) {
  return JOB_ROLES.map((job) => {
    const result = computeWeightedScore(userSkillIds, job);
    return {
      job,
      compatibilityScore: result.compatibilityScore,
      readinessScore: result.readinessScore,
      matchedRequiredCount: result.matchedRequiredCount,
      totalRequiredCount: result.totalRequiredCount,
    };
  }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

function getLearningRecommendations(gaps, jobRole) {
  return gaps
    .filter((g) => g.urgency === "HIGH" || g.urgency === "MEDIUM")
    .map((gap) => {
      const resource = jobRole.resources[gap.id] || null;
      return {
        skillId: gap.id,
        urgency: gap.urgency,
        gapType: gap.gapType,
        resource,
      };
    });
}

function getNextBestSkill(userSkillIds, jobRole) {
  const baseScore = computeWeightedScore(
    userSkillIds,
    jobRole,
  ).compatibilityScore;
  let bestGain = 0;
  let bestSkill = null;

  for (const req of jobRole.required) {
    if (!userSkillIds.includes(req.id)) {
      const simulated = [...userSkillIds, req.id];
      const newScore = computeWeightedScore(
        simulated,
        jobRole,
      ).compatibilityScore;
      const gain = newScore - baseScore;
      if (gain > bestGain) {
        bestGain = gain;
        bestSkill = req.id;
      }
    }
  }

  return { skillId: bestSkill, scoreGain: Math.round(bestGain) };
}

/* ── 6. VERIFICATION & VALIDATION LOGIC ───────────────────── */
function buildVerificationResult(skillId, answers) {
  const quiz = SKILL_QUIZZES[skillId];
  if (!quiz) {
    return {
      skillId,
      status: "no_quiz",
      score: null,
      passMark: null,
      attempted: false,
    };
  }

  let correct = 0;
  const detail = quiz.questions.map((q, i) => {
    const isCorrect = answers[i] === q.answer;
    if (isCorrect) correct++;
    return {
      questionIndex: i,
      selectedAnswer: answers[i],
      correctAnswer: q.answer,
      isCorrect,
    };
  });

  const passed = correct >= quiz.passMark;
  return {
    skillId,
    status: passed ? "verified" : "failed",
    score: correct,
    total: quiz.questions.length,
    passMark: quiz.passMark,
    attempted: true,
    detail,
  };
}

function computeVerificationSummary(userSkillIds, verificationMap) {
  let verified = 0,
    failed = 0,
    noQuiz = 0,
    unverified = 0;

  for (const id of userSkillIds) {
    const result = verificationMap[id];
    if (!result) {
      unverified++;
      continue;
    }
    if (result.status === "verified") verified++;
    else if (result.status === "failed") failed++;
    else if (result.status === "no_quiz") noQuiz++;
    else unverified++;
  }

  const total = userSkillIds.length;
  const verifiedPct = total > 0 ? Math.round((verified / total) * 100) : 0;

  return { verified, failed, noQuiz, unverified, total, verifiedPct };
}
