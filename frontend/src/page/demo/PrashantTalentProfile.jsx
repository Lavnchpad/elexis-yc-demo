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

// ─── CANDIDATE ───
const candidate = {
  name: "Prashant N.",
  title: "Assistant System Engineer – Flutter Developer",
  company: "Tata Consultancy Services",
  location: "Indore, MP",
  github: "prashant4900",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "3.5+ years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 65,
  bullets: [
    "BLoC confirmed at Tier 1 — banking app modular architecture with per-service independent blocs is production-grade evidence, not a skills-list claim.",
    "GitHub independently verifies: flutter_bloc in pubspec.yaml, Pull Shark badge (multiple PRs merged), published packages on pub.dev. All resume claims confirmed.",
    "Live coding completed the full task structure (Events, States, BlocBuilder, ListView.builder, try-catch) but with notable flags: DTO naming errors, inability to diagnose from error message, and heavy doc copying throughout.",
    "Communication is a concern — flagged directly by the interviewer. For a remote async role, verbal and written clarity is a first-order requirement.",
    "OOP depth is shallow — understands why BLoC conceptually but not the underlying class principles that make the pattern correct.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Completed cart BLoC in DartPad. BlocBuilder and ListView.builder used correctly. Try-catch applied proactively. DTO naming used 8 plural field names — pattern copied from docs without semantic adaptation.",
      evidence: "~45 min. Heavy doc lookups throughout. Task completed but patterns not internalized.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "prashant4900 — flutter_bloc in pubspec.yaml confirmed. Published packages on pub.dev showing Flutter usage. Pull Shark badge.",
      evidence: "Public activity visible. Production Flutter code verified via pub.dev packages.",
    },
    interview: { status: "confirmed", note: "3.5+ years Flutter at TCS — enterprise-scale products with Clean Architecture and modular design. MethodChannels for native integration. String Sync macOS tool published on App Store independently." },
    confidence: "medium",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Created Events base class + Events, State base class + States. BlocBuilder used for UI binding. Structure completed correctly. Sealed vs abstract class: understands the difference but cannot articulate exhaustive pattern matching advantage.",
      evidence: "Correct structure. Conceptual depth below senior threshold on sealed class semantics.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "flutter_bloc confirmed in pubspec.yaml. Bloc folder structure present in repos.",
      evidence: "Published packages include flutter_bloc usage patterns.",
    },
    interview: {
      status: "confirmed",
      note: "TCS enterprise app: modular per-service blocs with Clean Architecture. Global vs screen-scoped provider placement described correctly. SpendWise personal project also uses BLoC — confirmed in resume projects.",
    },
    confidence: "high",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Mock service used in demo. Try-catch applied proactively around async calls. DTO design had structural issue — 8 plural field names copied from docs without adapting to context.",
      evidence: "Basic REST integration demonstrated. DTO naming error is the key concern here.",
    },
    github: {
      active: false,
    },
    interview: {
      status: "confirmed",
      note: "API integration in banking app. Backend collaboration discussed — understands schema ownership and error contract negotiation. API contract defined with backend team before sprint.",
    },
    confidence: "medium",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Skills"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via GitHub activity and interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Pull Shark badge — multiple PRs merged to external repos. prashant4900 public commits. Published packages confirm open-source PR workflow.",
      evidence: "Pull Shark is GitHub-issued — not self-reported. Strongest objective signal in this layer.",
    },
    interview: {
      status: "confirmed",
      note: "CI/CD pipelines optimized at TCS — multi-environment builds, release time reduced by 40%. Mentored junior developers and established Flutter coding standards. PR workflow confirmed.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Modular Architecture",
    met: true,
    level: "Advanced",
    note: "TCS experience explicitly states 'implementing clean architecture, modular design, and Flutter BLoC'. SpendWise personal project also applies Clean Architecture with BLoC. Team-wide adoption confirmed.",
    risk: "low",
  },
  {
    skill: "App Store Publishing",
    met: true,
    level: "Intermediate",
    note: "String Sync macOS developer tool published on App Store — owned full lifecycle from ideation to release independently. Not a team-shipped app; sole developer and publisher.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase listed under Backend, AI & Tools on resume alongside Supabase and REST APIs. TCS enterprise scope makes Firebase auth/Firestore usage credible.",
    risk: "low",
  },
  {
    skill: "Social Media / Marketplace Features",
    met: false,
    level: "Not Assessed",
    note: "No social, marketplace, or sports commerce context in resume or interview. Ramp time expected on Baller Corp's social and live commerce layer.",
    risk: "medium",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: false,
    level: "None",
    note: "No real-time or messaging experience confirmed in resume or interview.",
    risk: "medium",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Published Packages (pub.dev)", found: true, points: 4, max: 4, evidence: "Packages published on pub.dev. String Sync also shipped on Mac App Store — full product ownership from ideation to release." },
  { skill: "CI/CD Pipelines", found: true, points: 4, max: 4, evidence: "TCS experience: 'optimized CI/CD pipelines for multi-environment builds, reducing release time by 40%'. Resume-stated, interviewer-confirmed." },
  { skill: "Pull Shark Badge (GitHub)", found: true, points: 3, max: 3, evidence: "GitHub-issued badge for multiple merged PRs to external repos. Objective signal — not self-reported." },
  { skill: "MethodChannels / Platform Channels", found: true, points: 3, max: 3, evidence: "MethodChannels listed in Backend, AI & Tools. Used for native integration at TCS. Confirmed in resume skills." },
  { skill: "AI Integration (OpenAI, Gemini)", found: true, points: 3, max: 3, evidence: "OpenAI and Gemini listed in resume skills. String Sync uses AI for intelligent key generation in localization workflows." },
  { skill: "Payment Gateways", found: false, points: 0, max: 5, evidence: "Not confirmed in resume or interview." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "E-Commerce Cart BLoC",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a mock cart service with fetch and update operations. Show cart items in UI. Use BLoC for state management. Support loading state and error state.",
    time: "~45 min",
    pastes: "Multiple",
    refactors: 0,
    proficiency: "Intermediate",
    verdict: "Task completed end-to-end — Events base class, State base class, Events, States, BlocBuilder, ListView.builder all present. Try-catch applied proactively without prompting (positive). However: heavy documentation copying throughout, DTOs created with 8 plural field names (pattern-copied without semantic understanding), and candidate could not diagnose the issue when an error occurred — read the error message passively without recognizing the root cause.",
    flags: [
      "DTO naming: 8 plural field names — copied doc pattern without adapting to context",
      "Couldn't recognize issue from error message — passive reading, not active debugging",
      "Heavy doc dependency throughout — patterns not fully internalized",
      "Sealed class advantage not articulated — missed exhaustive switch matching benefit",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 7.5, "Domain": 7.5, "Comms": 5.5, "Problem Solving": 6.0, "Culture Fit": 6.5 };

const findings = [
  "BLoC modular architecture in banking app is the strongest signal — per-service independent blocs (accounts, transactions, auth) with correct global vs screen-scoped provider placement. This is production-grade, Level 3 architectural thinking.",
  "GitHub independently verifies all resume claims: flutter_bloc in pubspec.yaml, Pull Shark badge (multiple PRs merged), published packages on pub.dev. The Pull Shark badge is GitHub-issued — not self-reported.",
  "Live coding completed the full task structure but exposed key gaps: DTO naming convention error (8 plural field names) suggests heavy pattern-copying from docs; failure to diagnose from error message is a meaningful weakness for a senior role where debugging speed is critical.",
  "Communication flagged directly by the interviewer. In a remote async team, the ability to communicate clearly in text and calls is as important as technical skill — this is the highest-weighted risk in this profile.",
  "OOP understanding is shallow — has clarity of why BLoC is the right choice (conceptually sound) but cannot explain the class hierarchy principles that make sealed states correct. Gap shared by other candidates in this pool.",
  "Platform channels for migration and backend API contract negotiation show breadth — candidate is not purely a UI-layer Flutter developer.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Institute of Engineering and Technology, Indore",
  degree: "Bachelor of Engineering in Computer Science, 2022",
  tier: "4-year B.E. degree",
  score: "Not disclosed",
  location: "Indore, Madhya Pradesh, India",
  comparable: "Bachelor's degree (US) / BEng (UK)",
  relevance: "Full 4-year B.E. in CS — stronger baseline than diploma-level. No academic score on resume; TCS hire at 22 with enterprise-scale Flutter ownership is the relevant credential.",
};

// ─── COMPENSATION ───
const comp = {
  marketRange: "$18,000 – $28,000 / yr",
  expectation: { inr: "₹18L–₹20L", usd: "~$21.5K–$24K", note: "Stated to recruiter" },
  clientBudget: "$25,000 – $30,000 / yr",
  likelyAccepts: "$21.5K–$24K",
  withinBudget: true,
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
const profC = { Beginner: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, "Not Assessed": c.g, Senior: c.purple };
const confC = {
  very_high: { label: "VERY HIGH", ...c.green },
  high: { label: "HIGH", ...c.green },
  medium: { label: "MEDIUM", ...c.amber },
  low: { label: "LOW", ...c.red },
};
const riskC = { low: c.green, medium: c.amber, high: c.red };
const mono = "'JetBrains Mono', 'Fira Code', monospace";
const sans = "'Inter', -apple-system, system-ui, sans-serif";

// ─── ATOMS ───
const Pill = ({ children, color, bg, border, style }) => (
  <span style={{ display: "inline-block", padding: "1px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: mono, color, background: bg, border: border ? `1px solid ${border}` : "none", letterSpacing: "0.02em", lineHeight: "18px", ...style }}>{children}</span>
);
const Dot = ({ on }) => (
  <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? "#22C55E" : c.g[300], display: "inline-block", flexShrink: 0 }} />
);
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
        <span style={{ fontSize: 10, color: c.g[400] }}>{musts.length} musts · {extras.length} extras · Layer 1 + Layer 2 + Layer 3 verified</span>
      </div>

      {/* CANDIDATE HEADER */}
      <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "stretch" : "flex-start", gap: mobile ? 10 : 0, marginBottom: 14 }}>
        <div>
          <h1 style={{ fontSize: mobile ? 19 : 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{candidate.name}</h1>
          <div style={{ fontSize: mobile ? 11.5 : 13, color: c.g[500], marginTop: 2 }}>{candidate.title} @ {candidate.company} · {candidate.location}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            <Pill color={c.green.txt} bg={c.green.bg}>{candidate.status}</Pill>
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} Flutter</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.amber.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.amber.txt, lineHeight: 1.2, marginTop: 2 }}>Partial Fit</div>
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.7, marginTop: 1 }}>65% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="⚠️" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} badgeColor={c.amber} />
      <ul style={{ margin: "0 0 14px", paddingLeft: 18 }}>
        {recommendation.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: mobile ? 12.5 : 12, lineHeight: 1.65, color: c.g[700], marginBottom: 4 }}>{b}</li>
        ))}
      </ul>

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
              {m.liveCoding?.proficiency && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>Code: {m.liveCoding.proficiency}</Pill>}
              {m.github?.active && m.github?.proficiency && <Pill color={profC[m.github.proficiency]?.txt} bg={profC[m.github.proficiency]?.bg}>GH: {m.github.proficiency}</Pill>}
            </div>
            {m.liveCoding?.status !== "n/a" && m.liveCoding?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.liveCoding.detail}</div>}
            {m.liveCoding?.status === "n/a" && <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</div>}
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
                {m.liveCoding?.status === "n/a" ? (
                  <span style={{ fontSize: 10, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</span>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: m.liveCoding?.status === "strong" ? c.green.txt : c.amber.txt }}>{m.liveCoding?.status === "strong" ? "✓" : "~"}</span>
                      {m.liveCoding?.proficiency && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>{m.liveCoding.proficiency}</Pill>}
                    </div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.liveCoding?.detail}</div>
                    {m.liveCoding?.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.liveCoding.evidence}</div>}
                  </>
                )}
              </div>
              <GH github={m.github} />
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>Interview details per skill in the Screening section below.</div>
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
              {s.met && s.level !== "Not Assessed" && <Pill color={profC[s.level]?.txt || c.blue.txt} bg={profC[s.level]?.bg || c.blue.bg}>{s.level}</Pill>}
              {!s.met && s.level === "Not Assessed" && <Pill color={c.g[400]} bg={c.g[100]}>Not Assessed</Pill>}
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~45 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC prompt. DartPad environment. Follow-up verbal Q&A on architecture and backend collaboration.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.pastes} pastes · {p.refactors} refactors</span>
          </div>
          <div style={{ fontSize: 11, color: c.g[400], marginBottom: 5, fontStyle: "italic" }}>"{p.prompt}"</div>
          <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55 }}>{p.verdict}</div>
          {p.flags.map((f, j) => (
            <div key={j} style={{ fontSize: mobile ? 11 : 10, color: c.amber.txt, background: c.amber.bg, padding: "4px 10px", borderRadius: 4, marginTop: 6 }}>⚠ {f}</div>
          ))}
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* INTERVIEW */}
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="PARTIAL FIT" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~60 min · Transcript verified</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 6, marginBottom: mobile ? 14 : 10, background: mobile ? c.g[50] : "transparent", borderRadius: 8, padding: mobile ? "12px 8px" : 0 }}>
        {Object.entries(interviewScores).map(([area, val]) => {
          const label = val >= 9 ? "Excellent" : val >= 8 ? "Strong" : val >= 7 ? "Good" : val >= 6 ? "Fair" : "Weak";
          const color = val >= 8 ? c.teal.acc : val >= 7 ? c.blue.txt : val >= 6 ? c.amber.txt : c.red.txt;
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
          {[["Classification", edu.tier], ["Academic Score", edu.score], ["Location", edu.location], ["US Comparable", edu.comparable]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500] }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right", maxWidth: 190 }}>{v}</span>
            </div>
          ))}
          <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.blue.txt }}>
            <strong>Note:</strong> {edu.relevance}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge={comp.withinBudget ? "✓ Within Budget" : "⚠ Review Needed"} badgeColor={comp.withinBudget ? c.green : c.amber} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{comp.marketRange}</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted platform rates"],
            ["Naukri (Sr. Flutter, 3–5 YOE, India)", "₹12L–₹22L (~$14K–$26K)", "India market median"],
            ["Candidate expectation", comp.expectation.inr + " (" + comp.expectation.usd + ")", comp.expectation.note],
            ["Candidate current CTC", "Not disclosed", "Not provided"],
          ].map(([s, v, n]) => (
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
              <span style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>{comp.clientBudget}</span>
            </div>
            <div style={{ borderTop: `1px solid ${c.teal.brd}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Likely accepts at</span>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>{comp.likelyAccepts}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function PrashantTalentProfile() {
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
            {[["Resume", true], ["Live Code", true], ["GitHub", hasGH], ["Human Interview", true]].map(([label, on]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Dot on={on} />
                <span style={{ fontSize: 9, fontFamily: mono, color: on ? c.g[700] : c.g[400] }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProfileTab mobile={mobile} />
    </div>
  );
}
