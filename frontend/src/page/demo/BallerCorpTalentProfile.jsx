import { useState, useEffect } from "react";

const useMobile = (bp = 640) => {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < bp);
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return m;
};

// ─── PLACEHOLDER CANDIDATE (replace with real candidate data) ───
const candidate = {
  name: "Priya Sharma",
  title: "Flutter Developer",
  company: "FinStack · Series A Fintech Startup",
  location: "Pune, India",
  status: "Actively Looking",
  noticePeriod: "30 days",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const scores = { rubricFit: 88, growth: 91 };

const recommendation = {
  verdict: "Strong Hire",
  confidence: 89,
  summary:
    "Strong Flutter/BLoC developer with real fintech production experience. Live coding confirms clean state management architecture — sealed events, proper pagination UX, typed error handling. Saarthi trajectory shows consistent improvement over 12 interviews across 3 months. API error handling was flagged as weak verbally but code evidence showed typed implementation — verbal gap, not a skill gap. Domain knowledge in payments is genuine — PCI compliance, tokenized storage, and UPI integration from direct experience. Ships daily at FinStack, comfortable with PR-every-day culture.",
  hiringConsideration:
    "Verbal explanation of technical decisions is weaker than her actual code quality — prep her before client intro. No prior social/marketplace feature work, though fintech payment flows transfer directly to Stripe + order management. No Kubernetes or DevOps exposure.",
};

// ─── MUSTS — Baller Corp rubric ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Clean event/state separation. isLoadingMore flag for pagination UX. Sealed class pattern for states.",
      evidence: "14 min. 380 keystrokes, 0 pastes. 2 refactor cycles — self-corrected from flat states to sealed class.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "BLoC in 3 repos. Earlier repos show Provider — migration to BLoC visible over time.",
      evidence: "5 repos, 120 commits. Latest: 1 week ago.",
    },
    interview: { status: "confirmed", note: "Explained Cubit vs BLoC tradeoffs. Migrated FinStack from Provider to BLoC — reduced state bugs by 60%." },
    confidence: "very_high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Proper event/state/bloc separation. Sealed classes for all states. No logic leaking into widgets.",
      evidence: "Consistent BLoC idioms across all 3 coding prompts (45 min total).",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Provider → BLoC migration visible in commit history. Recent repos fully BLoC-based.",
      evidence: "Migration to BLoC from mid-2023. 3 repos with full BLoC architecture.",
    },
    interview: { status: "confirmed", note: "Sealed classes, Dart 3 pattern matching, Cubit vs Bloc tradeoffs. Practical and experience-driven." },
    confidence: "very_high",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Typed failures with sealed class — AuthError, NetworkError, ServerError. No retry logic.",
      evidence: "12 min. Started with generic try/catch, deleted it, rewrote with sealed class. Self-correction visible.",
    },
    github: {
      active: true,
      proficiency: "Developing",
      detail: "Older repos use generic try/catch. Newest repo shows typed errors — actively improving.",
      evidence: "Improvement trajectory visible across 6 months of repos.",
    },
    interview: { status: "weak_verbal", note: "Vague verbal answer on token expiration. Code shows typed 401 handling. Verbal gap, not a skill gap." },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: [], signal: "n/a" },
    liveCoding: { status: "n/a", detail: "Assessed through GitHub activity and interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Atomic commits, feature branch workflow. Daily commits during active sprints.",
      evidence: "520 total commits. First commit Aug 2021. Consistent activity.",
    },
    interview: { status: "confirmed", note: "Ships features daily at FinStack. PR-every-day culture is already her norm. Reviews teammates' PRs." },
    confidence: "high",
  },
];

// ─── SHOULD HAVES ───
const shouldHaves = [
  { skill: "Social Media / Marketplace Features", met: false, level: "None", note: "FinStack is payments/fintech — no feed, marketplace, or listing experience. Payment flows transfer to Stripe/orders. Ramp time expected on social UX patterns.", risk: "medium" },
  { skill: "App Store Publishing (iOS + Android)", met: true, level: "Intermediate", note: "FinStack on Play Store — 10K+ downloads, 4.2 rating. iOS build experience, app not independently published.", risk: "low" },
  { skill: "Performance Optimization & Memory Mgmt", met: true, level: "Intermediate", note: "Handles pagination, isLoadingMore flags, stream cleanup in BLoC close(). Production app with real user scale.", risk: "low" },
  { skill: "Secure Auth & Encryption", met: true, level: "Intermediate", note: "PCI compliance, tokenized card storage, biometric auth at FinStack. Direct production experience.", risk: "low" },
  { skill: "Real-time / Messaging (GetStream, WebSocket)", met: true, level: "Beginner", note: "Live coding Prompt 3 — WebSocket stream added to BLoC. Clean subscription + cleanup. No GetStream experience specifically.", risk: "low" },
];

// ─── EXTRAS ───
const extras = [
  { skill: "Firebase", found: true, points: 5, max: 5, evidence: "Auth + Firestore + Crashlytics in production at FinStack. 2 repos." },
  { skill: "Published App (Play Store)", found: true, points: 5, max: 5, evidence: "FinStack on Play Store. 10K+ downloads, 4.2 rating." },
  { skill: "Payments (Stripe-adjacent)", found: true, points: 4, max: 4, evidence: "UPI, tokenized card storage, payment reconciliation at FinStack. Stripe patterns directly transferable." },
  { skill: "WebSocket / Real-time", found: true, points: 3, max: 4, evidence: "Live coding Prompt 3 — WebSocket stream added to BLoC. Clean subscription + cleanup." },
  { skill: "CI/CD", found: false, points: 0, max: 3, evidence: "Manual builds. No Fastlane or automated deployment pipeline." },
  { skill: "Specific APIs (Airship, EasyPost, Scandit)", found: false, points: 0, max: 3, evidence: "No experience with Baller Corp's third-party API stack." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1, title: "BLoC Architecture", skill: "Flutter / BLoC", tier: "Must-Have",
    prompt: "Build the BLoC for a transaction history screen — events, states, bloc class. Support pagination, pull-to-refresh, error states.",
    time: "14 min", keystrokes: 380, pastes: 0, refactors: 2, proficiency: "Advanced",
    verdict: "Clean architecture. Separated load/load-more/refresh events. isLoadingMore flag for pagination UX — shows real app experience. Sealed class for states unprompted.",
    flags: [],
  },
  {
    id: 2, title: "Error Handling & Repository", skill: "REST API Integration", tier: "Must-Have",
    prompt: "Write getTransactions(page) — handle 401 expired token, 500 server error, no internet, malformed JSON. Typed results for UI.",
    time: "12 min", keystrokes: 290, pastes: 0, refactors: 1, proficiency: "Intermediate",
    verdict: "Typed failures with sealed class — correct pattern. Self-corrected from generic try/catch. No retry/backoff logic for 503.",
    flags: ["No retry/backoff logic — minor gap for high-reliability production"],
  },
  {
    id: 3, title: "WebSocket Integration", skill: "Flutter + WebSocket", tier: "Must + Extra",
    prompt: "Existing BalanceBloc loads via API. Add WebSocket listener — new transaction arrives, update balance. Extend, don't rewrite.",
    time: "11 min", keystrokes: 245, pastes: 0, refactors: 0, proficiency: "Advanced",
    verdict: "Stream via add() event pattern, not direct emit. Subscription cancelled in close(). Credit/debit calc correct. Did not break existing logic.",
    flags: [],
  },
];


// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 8.5, "Domain": 9.0, "Comms": 7.0, "Problem Solving": 8.0, "Culture Fit": 8.5 };
const findings = [
  "Built FinStack payment flow end-to-end — tokenized card storage, UPI integration, transaction reconciliation. PCI compliance from direct experience, not theory.",
  "Migrated FinStack from Provider to BLoC over 4 months. Reduced state bugs by 60%. Articulates WHY BLoC was better for complex async flows.",
  "Verbal explanation weaker than code quality. Asked about error handling verbally — gave vague answer. Live coding showed typed failures implemented correctly. Prep before client call.",
  "Ships daily at FinStack — PR every day is already her norm. Low onboarding risk for Baller Corp's ship cadence requirement.",
  "No social media or marketplace experience — fintech only. Payment flows transfer directly but feed, social UX, and listing patterns are net new.",
  "Available in 30 days. Current ₹18L. Expects ₹20–22L. Well within ₹18–24L budget.",
];

// ─── EDUCATION ───
const edu = {
  institution: "COEP Technological University, Pune",
  degree: "B.Tech Computer Science, 2021",
  tier: "Tier 1 Engineering (India)",
  ranking: "#28 in India for Engineering (NIRF 2025)",
  acceptance: "~4%",
  comparable: "Purdue, Virginia Tech",
  relevance: "Strong CS fundamentals — data structures, algorithms, OOP at depth.",
};

// ─── COLORS ───
const c = {
  teal: { bg: "#F0FDFA", brd: "#99F6E4", txt: "#0F766E", acc: "#0891B2" },
  blue: { bg: "#EFF6FF", brd: "#BFDBFE", txt: "#1E40AF" },
  green: { bg: "#ECFDF5", brd: "#A7F3D0", txt: "#065F46" },
  amber: { bg: "#FFF7ED", brd: "#FED7AA", txt: "#92400E" },
  red: { bg: "#FEF2F2", brd: "#FECACA", txt: "#991B1B" },
  purple: { bg: "#F5F3FF", brd: "#DDD6FE", txt: "#5B21B6" },
  g: { 50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#D1D5DB", 400: "#9CA3AF", 500: "#6B7280", 700: "#374151", 900: "#111827" },
};
const profC = { Beginner: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, Senior: c.purple };
const confC = { very_high: { label: "VERY HIGH", ...c.green }, high: { label: "HIGH", ...c.green }, medium: { label: "MEDIUM", ...c.amber }, low: { label: "LOW", ...c.red } };
const riskC = { low: c.green, medium: c.amber, high: c.red };
const mono = "'JetBrains Mono', 'Fira Code', monospace";
const sans = "'Inter', -apple-system, system-ui, sans-serif";

// ─── ATOMS ───
const Pill = ({ children, color, bg, border, style }) => (
  <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: mono, color, background: bg, border: border ? `1px solid ${border}` : "none", letterSpacing: "0.02em", lineHeight: "18px", ...style }}>{children}</span>
);
const Dot = ({ on }) => <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "#22C55E" : c.g[300], display: "inline-block", flexShrink: 0 }} />;
const Section = ({ icon, title, badge, badgeColor = c.green }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, borderBottom: `1px solid ${c.g[200]}`, paddingBottom: 5 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 11.5, color: c.g[900], letterSpacing: "0.03em" }}>{title}</span>
    </div>
    {badge && <Pill color={badgeColor.txt} bg={badgeColor.bg} border={badgeColor.brd}>{badge}</Pill>}
  </div>
);
const GH = ({ github }) => {
  if (!github?.active) return <span style={{ fontSize: 10, color: c.g[400] }}>—</span>;
  return (
    <div>
      {github.proficiency && <div style={{ marginBottom: 2 }}><Pill color={profC[github.proficiency]?.txt} bg={profC[github.proficiency]?.bg}>{github.proficiency}</Pill></div>}
      {github.detail && <div style={{ fontSize: 10, color: c.g[500], lineHeight: 1.35 }}>{github.detail}</div>}
      {github.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{github.evidence}</div>}
    </div>
  );
};

// ─── PROFILE TAB ───
function ProfileTab({ mobile }) {
  const hasGH = musts.some(m => m.github?.active);
  const mustsPassed = musts.filter(m => m.passed).length;
  const extPts = extras.reduce((a, e) => a + e.points, 0);
  const extMax = extras.reduce((a, e) => a + e.max, 0);

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px 16px 20px" : "14px 20px 20px" }}>

      {/* RUBRIC BANNER */}
      <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: mobile ? "8px 12px" : "7px 14px", marginBottom: 12, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 4 : 0 }}>
        <span style={{ fontSize: mobile ? 11 : 12, color: c.teal.txt }}>Scored against: <strong>{role.company} — {role.title}</strong> · {role.team}</span>
        <span style={{ fontSize: 10, color: c.g[400] }}>{musts.length} musts · {extras.length} extras · rubric-verified</span>
      </div>

      {/* CANDIDATE HEADER */}
      <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "stretch" : "flex-start", gap: mobile ? 10 : 0, marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: mobile ? 19 : 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{candidate.name}</h1>
          <div style={{ fontSize: mobile ? 11.5 : 13, color: c.g[500], marginTop: 2 }}>{candidate.title} @ {candidate.company} · {candidate.location}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <Pill color={c.green.txt} bg={c.green.bg}>{candidate.status}</Pill>
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["RUBRIC FIT", scores.rubricFit, c.teal], ["GROWTH", scores.growth, c.blue]].map(([label, val, col]) => (
            <div key={label} style={{ background: col.bg, border: `1px solid ${col.brd}`, borderRadius: 8, padding: "8px 14px", textAlign: "center", minWidth: 75 }}>
              <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: col.txt, letterSpacing: "0.05em" }}>{label}</div>
              <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 800, color: col.txt, lineHeight: 1.1 }}>{val}</div>
              <div style={{ fontSize: 10, color: c.g[400] }}>/100</div>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="✅" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} />
      <p style={{ fontSize: mobile ? 13 : 12.5, lineHeight: 1.65, color: c.g[700], margin: "0 0 10px" }}>{recommendation.summary}</p>
      <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: mobile ? "10px 14px" : "7px 12px", marginBottom: mobile ? 20 : 14 }}>
        <span style={{ fontSize: mobile ? 12 : 11.5, color: c.amber.txt, lineHeight: 1.55 }}><strong>⚠ Hiring Consideration:</strong> {recommendation.hiringConsideration}</span>
      </div>

      {/* MUST-HAVES */}
      <Section icon="🔒" title="MUST-HAVE VERIFICATION — KNOCKOUT CRITERIA" badge={`${mustsPassed}/${musts.length} PASSED`} badgeColor={mustsPassed === musts.length ? c.green : c.red} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontFamily: mono, margin: "-4px 0 8px" }}>Any must-have failure = candidate removed. No exceptions.</div>

      {mobile ? (
        musts.map((m, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${m.passed ? "#22C55E" : c.red.txt}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8, background: c.g[50] }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700 }}>{m.skill}</span>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
              {m.resume.sections.length > 0 && <Pill color={m.resume.signal === "strong" ? c.green.txt : c.amber.txt} bg={m.resume.signal === "strong" ? c.green.bg : c.amber.bg}>Resume: {m.resume.signal === "strong" ? "Strong" : "Moderate"}</Pill>}
              {m.liveCoding.proficiency && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>Code: {m.liveCoding.proficiency}</Pill>}
              {m.github?.proficiency && <Pill color={profC[m.github.proficiency]?.txt} bg={profC[m.github.proficiency]?.bg}>GH: {m.github.proficiency}</Pill>}
            </div>
            {m.liveCoding.status !== "n/a" && m.liveCoding.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.liveCoding.detail}</div>}
            {m.liveCoding.status === "n/a" && <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</div>}
            {m.interview?.note && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.interview.note}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "150px 90px 1fr 1fr 70px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "LIVE CODING", "GITHUB", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>
          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 90px 1fr 1fr 70px", padding: "7px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}` }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <Dot on={m.passed} />
                <span style={{ fontSize: 11.5, fontWeight: 700 }}>{m.skill}</span>
              </div>
              <div>
                {m.resume.sections.length > 0 ? (
                  <>
                    <div style={{ fontSize: 10, fontFamily: mono, color: c.g[500] }}>{m.resume.sections.join(" · ")}</div>
                    <div style={{ fontSize: 9, color: m.resume.signal === "strong" ? c.green.txt : c.amber.txt, marginTop: 1 }}>{m.resume.signal === "strong" ? "Strong" : "Moderate"}</div>
                  </>
                ) : <span style={{ fontSize: 10, color: c.g[400] }}>—</span>}
              </div>
              <div>
                {m.liveCoding.status === "n/a" ? (
                  <span style={{ fontSize: 10, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</span>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: m.liveCoding.status === "strong" ? c.green.txt : c.amber.txt }}>{m.liveCoding.status === "strong" ? "✓" : "~"}</span>
                      {m.liveCoding.proficiency && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>{m.liveCoding.proficiency}</Pill>}
                    </div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.liveCoding.detail}</div>
                    {m.liveCoding.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.liveCoding.evidence}</div>}
                  </>
                )}
              </div>
              <GH github={m.github} />
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>AI Interview details per skill in the Screening section below.</div>
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* SHOULD-HAVES */}
      <Section icon="🟡" title="SHOULD-HAVE ASSESSMENT" badge={`${shouldHaves.filter(s => s.met).length}/${shouldHaves.length} MET`} badgeColor={c.blue} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontFamily: mono, margin: "-4px 0 8px" }}>Strong preference. Gaps flagged with risk level.</div>
      {shouldHaves.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "6px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}`, alignItems: "flex-start" }}>
          <span style={{ fontSize: 11, flexShrink: 0, marginTop: 1 }}>{s.met ? "✅" : "—"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700 }}>{s.skill}</span>
              {s.met && <Pill color={profC[s.level]?.txt || c.blue.txt} bg={profC[s.level]?.bg || c.blue.bg}>{s.level}</Pill>}
              <Pill color={riskC[s.risk].txt} bg={riskC[s.risk].bg}>Risk: {s.risk.toUpperCase()}</Pill>
            </div>
            <div style={{ fontSize: 10.5, color: c.g[500], lineHeight: 1.4 }}>{s.note}</div>
          </div>
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* BONUS SKILLS */}
      <Section icon="⭐" title="BONUS SKILLS DETECTED" badge={`${extPts}/${extMax} pts`} badgeColor={c.blue} />
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 6, marginBottom: mobile ? 20 : 14 }}>
        {extras.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: e.found ? c.green.bg : c.g[50], borderRadius: 6, border: `1px solid ${e.found ? c.green.brd : c.g[200]}` }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: e.found ? c.green.txt : c.g[400] }}>{e.found ? "✅" : "—"} {e.skill}</div>
              <div style={{ fontSize: 9.5, color: c.g[500], marginTop: 1, lineHeight: 1.3 }}>{e.evidence}</div>
            </div>
            <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: e.found ? c.green.txt : c.g[400], whiteSpace: "nowrap", marginLeft: 8, alignSelf: "flex-start" }}>+{e.points}/{e.max}</span>
          </div>
        ))}
      </div>

      {/* LIVE CODING */}
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="3 prompts · 37 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific prompts. Async. Keystrokes captured.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: mobile ? 8 : 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.keystrokes} keystrokes · {p.pastes} pastes · {p.refactors} refactors</span>
          </div>
          <div style={{ fontSize: 11, color: c.g[400], marginBottom: 5, fontStyle: "italic" }}>"{p.prompt}"</div>
          <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55 }}>{p.verdict}</div>
          {p.flags.map((f, j) => (
            <div key={j} style={{ fontSize: mobile ? 11 : 10, color: c.amber.txt, background: c.amber.bg, padding: "4px 10px", borderRadius: 4, marginTop: 6 }}>⚠ {f}</div>
          ))}
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* AI INTERVIEW */}
      <Section icon="🤖" title="AI SCREENING INTERVIEW" badge="STRONG FIT" />
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 6, marginBottom: mobile ? 14 : 10, background: mobile ? c.g[50] : "transparent", borderRadius: 8, padding: mobile ? "12px 8px" : 0 }}>
        {Object.entries(interviewScores).map(([area, val]) => {
          const label = val >= 9 ? "Excellent" : val >= 8 ? "Strong" : val >= 7 ? "Good" : "Developing";
          const color = val >= 8 ? c.teal.acc : val >= 7 ? c.amber.txt : c.red.txt;
          return (
            <div key={area} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: c.g[500], marginBottom: 1 }}>{area}</div>
              <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color }}>{label}</div>
              <div style={{ fontFamily: mono, fontSize: 10, color: c.g[400] }}>{val}/10</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.g[500], marginBottom: 5 }}>KEY FINDINGS</div>
      {findings.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${c.g[100]}` }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: c.g[300], minWidth: 16 }}>{String(i + 1).padStart(2, "0")}</span>
          <span style={{ fontSize: 11.5, color: c.g[700], lineHeight: 1.5 }}>{f}</span>
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* EDUCATION + COMPENSATION */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <div>
          <Section icon="🎓" title="EDUCATION CONTEXT" />
          <div style={{ fontSize: 15, fontWeight: 700 }}>{edu.institution}</div>
          <div style={{ fontSize: 11.5, color: c.g[500], marginBottom: 8 }}>{edu.degree}</div>
          {[["Classification", edu.tier], ["Ranking", edu.ranking], ["Acceptance", edu.acceptance], ["US Comparable", edu.comparable]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500] }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right", maxWidth: 160 }}>{v}</span>
            </div>
          ))}
          <div style={{ background: c.teal.bg, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.teal.txt }}>
            <strong>Rubric relevance:</strong> {edu.relevance}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="✓ Within Budget" />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>₹16L – ₹24L</div>
          {[["Naukri (Sr. Flutter, 4 YOE)", "₹18–22L", "India median"], ["Arc.dev (Flutter, India remote)", "₹20–26L", "Vetted platform rates"], ["Candidate expectation", "₹20–22L", "Stated in screening"]].map(([s, v, n]) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 10, color: c.g[500] }}>{s}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 8.5, color: c.g[400] }}>{n}</div>
              </div>
            </div>
          ))}
          <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 6, padding: "7px 10px", marginTop: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10.5, color: c.g[500] }}>Client budget</span>
              <span style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>₹18L – ₹24L</span>
            </div>
            <div style={{ borderTop: `1px solid ${c.teal.brd}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Likely accepts at</span>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>₹21–22L</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "14px 0 6px", marginTop: 14, borderTop: `1px solid ${c.g[200]}` }}>
        <div style={{ fontSize: 10, color: c.g[400] }}>
          Elexis AI · Verified: Resume + Live Coding{hasGH ? " + GitHub" : ""} + AI Screening
        </div>
        <div style={{ fontSize: 9, color: c.g[300], marginTop: 2 }}>
          {codingPrompts.length} role-specific coding challenges · Rubric-matched verification
        </div>
      </div>
    </div>
  );
}

// ─── RESUME TAB ───
function ResumeTab({ mobile }) {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px 16px 20px" : "20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Priya Sharma</h1>
        <div style={{ fontSize: 14, color: c.g[500], marginTop: 4 }}>Flutter Developer | 4 Years Experience</div>
        <div style={{ fontSize: 12, color: c.g[400], marginTop: 2 }}>Pune, India · priya.sharma@gmail.com · +91 97654 32100</div>
      </div>

      <Section icon="" title="PROFESSIONAL SUMMARY" />
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: c.g[700], margin: "0 0 16px" }}>
        Flutter developer with 4 years of experience building cross-platform mobile applications for fintech. Expert in Flutter/Dart, BLoC state management, and REST API integration. Led Provider → BLoC migration at FinStack, reducing state bugs by 60%. Built payment flows handling PCI compliance, tokenized card storage, and UPI integration. Published app with 10K+ downloads on Play Store.
      </p>

      <Section icon="" title="EXPERIENCE" />
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Flutter Developer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>FinStack — Series A Fintech Startup</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Mar 2023 — Present · Pune</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Architected BLoC migration from Provider — reduced state bugs by 60% across the app</li>
          <li>Built end-to-end payment flow — tokenized card storage, UPI integration, transaction reconciliation, PCI compliance</li>
          <li>Implemented biometric authentication and secure session management</li>
          <li>Added WebSocket-based real-time balance updates and transaction notifications</li>
          <li>Published FinStack on Play Store — 10K+ downloads, 4.2 rating</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Junior Flutter Developer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>TCS — Digital Products Division</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Aug 2021 — Feb 2023 · Pune</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Built Flutter apps for enterprise banking clients — iOS and Android from single codebase</li>
          <li>REST API integrations with typed error handling</li>
          <li>Firebase Auth, Firestore, and Crashlytics across 3 production apps</li>
        </ul>
      </div>

      <Section icon="" title="EDUCATION" />
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>B.Tech Computer Science</div>
        <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>COEP Technological University, Pune</div>
        <div style={{ fontSize: 11, color: c.g[400] }}>2017 — 2021 | CGPA: 8.4/10</div>
      </div>

      <Section icon="" title="SKILLS" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {["Flutter", "Dart", "BLoC", "Provider", "REST APIs", "Firebase", "WebSocket", "Git", "UPI Integration", "Null Safety", "Sealed Classes", "Dart 3", "Play Store"].map(s => (
          <Pill key={s} color={c.g[700]} bg={c.g[100]}>{s}</Pill>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function BallerCorpTalentProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const hasGH = musts.some(m => m.github?.active);
  const mobile = useMobile();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: sans }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderBottom: `1px solid ${c.g[200]}`, position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, color: c.teal.acc }}>/</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>ELEXIS</span>
          <span style={{ color: c.g[300], margin: "0 3px" }}>|</span>
          <span style={{ fontSize: 11, color: c.g[400] }}>Talent Intelligence Profile</span>
        </div>
        {!mobile && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[["Resume", true], ["Live Code", true], ["GitHub", hasGH], ["AI Interview", true]].map(([label, on]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Dot on={on} />
                <span style={{ fontSize: 9, fontFamily: mono, color: on ? c.g[700] : c.g[400] }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TABS */}
      <div style={{ display: "flex", justifyContent: "center", borderBottom: `1px solid ${c.g[200]}`, background: c.g[50] }}>
        {[["profile", "Talent Profile"], ["resume", "Resume"]].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{ padding: "10px 32px", fontSize: 13, fontWeight: activeTab === key ? 700 : 500, fontFamily: sans, color: activeTab === key ? c.teal.acc : c.g[400], background: "transparent", border: "none", borderBottom: activeTab === key ? `2px solid ${c.teal.acc}` : "2px solid transparent", cursor: "pointer", transition: "all 0.15s ease" }}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === "profile" ? <ProfileTab mobile={mobile} /> : <ResumeTab mobile={mobile} />}
    </div>
  );
}
