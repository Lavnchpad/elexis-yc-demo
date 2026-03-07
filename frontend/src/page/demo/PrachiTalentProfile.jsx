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
  name: "Prachi P.",
  title: "Senior Flutter Developer",
  company: "24/7 Software",
  location: "Pune, India",
  github: "Prachip9767",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "4+ years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 72,
  bullets: [
    "Stream Chat SDK and native method channels both confirmed in L3 — production experience is real. Video SDK integrated via Flutter method channels, Android & iOS method channel experience noted by interviewer. Not embellished.",
    "L3 debugging flag: during live coding, a type error wasn't caught, root cause couldn't be identified from the error message, and documentation navigation for the correct parameter was slow. Specific and callable — implementation fluency is present, debugging self-sufficiency under pressure is not.",
    "Platform breadth confirmed across iOS, Android, Web — strongest multi-platform signal in this batch. Datadog, Stream Chat SDK, Firebase, Amplify GraphQL all verified in interview. Resume understated what she's worked with.",
    "Amplify GraphQL confirmed in interview but not on resume — additional backend integration capability. Mentoring 2 interns signals senior contributor status beyond IC coding.",
    "Salary expectation ₹18L–₹19L (~$21.6K–$22.9K) remains below client budget floor. Financial fit is unchanged and strong.",
    "For a remote async team, debugging self-sufficiency matters — getting stuck on type errors without being able to self-unblock from error messages is a real day-to-day risk. Manageable with team support, cannot be assumed away.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Summary"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Flutter project structure and widget scaffolding correct. Type error occurred during implementation — candidate couldn't identify root cause from error output.",
      evidence: "Had trouble with documentation navigation to determine correct parameter. Implementation pattern knowledge present; debugging fluency gap surfaced.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "37 public repos, active into Apr 2025. taza_khabar_app (Feb 2025), Car-Booking-App (Flutter+Dart+Provider+Dio), Shopping_App. 5 published production apps across Android, iOS, Web.",
      evidence: "Production work in private employer repos.",
    },
    confidence: "high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "BLoC event/state scaffolding set up correctly. Hit a type error during event emission wiring — couldn't diagnose from error message.",
      evidence: "Architecture structure was in place before the debugging wall. BLoC pattern understanding is present; Dart type system fluency under pressure is the gap.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "trading_app_dashboard (3★): explicit BLoC demo. login_with_bloc: 'demonstrate skills in bloc pattern state management flutter'. Both BLoC-specific repos.",
      evidence: "Production BLoC ownership at Infimatrix (DorPlay from scratch) and 24/7 Software (state bugs -20%).",
    },
    confidence: "high",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: { status: "n/a", detail: "Not the focus of the coding prompt. Amplify GraphQL confirmed in interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Car-Booking-App uses Dio. Shopping App integrates REST API. Stream Chat + AWS Amplify in production.",
      evidence: "Multiple production integrations across 3 companies.",
    },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "37 public repos, consistent cadence. Azure DevOps + Git CI/CD at Sunstone. Bitbucket at Infimatrix.",
      evidence: "Active into Apr 2025. Multiple team environments.",
    },
    confidence: "medium",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social Media / Marketplace Features",
    met: true,
    level: "Beginner",
    note: "Shopping App (cart, checkout), Communicator App (internal messaging platform), Sunstone engagement features (quizzes, competitions, leaderboards, 50K+ users). No sports-specific social feed. Ramp expected on Baller Corp's live commerce and social layer.",
    risk: "medium",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: true,
    level: "Advanced",
    note: "5 published apps: Checkpoint, Communicator, DorTV, DorPlay, Sunstone. iOS + Android + Web confirmed across 3 companies and verified in L3. CI/CD to stores via Firebase distribution and Azure DevOps.",
    risk: "low",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: true,
    level: "Advanced",
    note: "40% reduction in production debugging time (Datadog APM — confirmed in L3). 25% app performance improvement. 30% crash reduction. 60% bug report decrease via unit testing. Most quantified performance record in this batch.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase confirmed in L3 interview alongside Datadog, Stream Chat SDK, Amplify. Firebase auth + Firestore + FCM in projects. Firebase distribution for CI/CD at Sunstone.",
    risk: "low",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: true,
    level: "Advanced",
    note: "Stream Chat SDK confirmed in L3 interview — production at 24/7 Software. Real-time translation, multilingual messaging. WebSockets in skills. Real-time location tracking via AWS Amplify (1,000+ concurrent sessions). Direct match for Baller Corp's live feature layer.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "CI/CD", found: true, evidence: "Azure DevOps + Git → Firebase distribution pipeline at Sunstone. CD/CI in DevOps tools. Automated builds and deployments in production at multiple companies." },
  { skill: "Clean Architecture", found: true, evidence: "DorPlay built from scratch using Clean Architecture + BLoC at Infimatrix. 'Clean Architecture, MVVM, OOP, SOLID Principles' in skills." },
  { skill: "Native Platform Channels", found: true, evidence: "Android & iOS method channel experience confirmed in L3 interview. Video SDK integrated through Flutter method channels at 24/7 Software. Custom media plugin at current role. Production-verified." },
  { skill: "Stream Chat SDK", found: true, evidence: "Stream Chat SDK confirmed in L3 interview — production at 24/7 Software. Real-time translation integration. Direct experience with the SDK relevant to Baller Corp's messaging layer." },
  { skill: "Payment Gateways", found: false, evidence: "Shopping App has cart and checkout but no payment gateway named." },
  { skill: "Fintech Domain", found: false, evidence: "Not detected in resume, GitHub, or L3 interview." },
  { skill: "Google Maps / Geolocation", found: false, evidence: "Real-time location tracking via AWS Amplify — location awareness present, but Google Maps SDK not confirmed." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "Employee Search with BLoC",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search feature using BLoC. Search box emits events to a BLoC which filters results from a mock service. Show loading and loaded states. No UI polish required.",
    time: "~40 min",
    pastes: "Some",
    proficiency: "Intermediate",
    verdict: "BLoC event/state scaffolding and Flutter widget structure were set up correctly — architectural pattern knowledge is present. Hit a type error during implementation and could not identify the root cause from the Dart error message. Attempted to reference documentation/examples to find the correct parameter, but had difficulty determining which parameter to pass. The structure was right; execution stalled on a Dart type system error.",
    flags: [
      "Type error not caught — passed wrong type but did not catch the mismatch before hitting the error.",
      "Couldn't identify issue from error message — when params were passed incorrectly, couldn't diagnose root cause from Flutter/Dart error output. Debugging self-sufficiency gap.",
      "Trouble with documentation navigation — when referencing examples/tutorials, had difficulty identifying which parameter to use. Slows down independent unblocking in remote async work.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 7.5, "Domain": 7.0, "Comms": 7.5, "Problem Solving": 6.5, "Culture Fit": 7.5 };

const findings = [
  "Stream Chat SDK, Datadog, Firebase, and Video SDK via Flutter method channels all confirmed in L3 — the resume was accurate and the production SDK breadth is real. Third-party integration depth is among the highest in this batch.",
  "Android & iOS method channel experience confirmed by interviewer. Video SDK integrated through Flutter method channels at 24/7 Software. Native platform channel work is production-verified, not conceptual — directly relevant to Baller Corp's native feature layer.",
  "Debugging gap is the primary L3 flag: type error not caught during coding, couldn't identify root cause from Dart error message, had trouble navigating documentation for the correct parameter. This is a specific, bounded weakness — not a pattern misunderstanding. Manageable with team pair review, not manageable in fully async solo work.",
  "Amplify GraphQL confirmed in interview — not documented on resume. Additional backend integration capability that understates the overall API experience.",
  "Mentoring 2 interns at 24/7 Software — confirms senior contributor status with team responsibility, not just individual coding output.",
  "iOS, Android, Web platform breadth confirmed across all three layers. Strongest multi-platform profile in this batch. Baller Corp's cross-platform requirements are covered without ramp.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Abeda Inamdar Senior College",
  degree: "Bachelor of Business Administrative (Computer Application), April 2019",
  tier: "3-year BBA (Computer Application)",
  score: "Not listed",
  location: "Pune, India",
  comparable: "Bachelor's degree (US) / BA (UK)",
  relevance: "Non-CS degree, offset by Masai School Full Stack Android Development Course (Apr 2021–Jan 2022). Entered Flutter career at Sunstone Feb 2022 — career trajectory is developer-first.",
  course: "Masai School — Full Stack Android Dev (Apr 2021–Jan 2022)",
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
const profC = { Beginner: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, "Not Assessed": { txt: c.g[400], bg: c.g[100] }, Senior: c.purple };
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

// ─── PROFILE TAB ───
function ProfileTab({ mobile }) {
  const mustsPassed = musts.filter(m => m.passed).length;

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
        <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.blue.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.blue.txt, lineHeight: 1.2, marginTop: 2 }}>Good Fit</div>
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>72% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="✅" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} badgeColor={c.blue} />
      <ul style={{ margin: "0 0 14px", paddingLeft: 20, listStyleType: "disc" }}>
        {recommendation.bullets.map((b, i) => (
          <li key={i} style={{ fontSize: mobile ? 12.5 : 12, lineHeight: 1.65, color: c.g[700], marginBottom: 6, paddingLeft: 2 }}>{b}</li>
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
              {m.liveCoding?.proficiency && m.liveCoding.status !== "n/a" && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>Code: {m.liveCoding.proficiency}</Pill>}
            </div>
            {m.liveCoding?.status !== "n/a" && m.liveCoding?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.liveCoding.detail}</div>}
            {m.liveCoding?.status === "n/a" && <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</div>}
            {m.liveCoding?.evidence && m.liveCoding.status !== "n/a" && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.liveCoding.evidence}</div>}
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
              <div>
                {m.github?.active ? (
                  <>
                    <div style={{ marginBottom: 2 }}><Pill color={profC[m.github.proficiency]?.txt} bg={profC[m.github.proficiency]?.bg}>{m.github.proficiency}</Pill></div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.github.detail}</div>
                    {m.github.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.github.evidence}</div>}
                  </>
                ) : <span style={{ fontSize: 10, color: c.g[400] }}>—</span>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ background: c.green.bg, border: `1px solid ${c.green.brd}`, borderRadius: 6, padding: "6px 10px", marginTop: 6, fontSize: 10, color: c.green.txt }}>
        <strong>GitHub — Prachip9767:</strong> 37 public repos, active into April 2025. BLoC explicitly demonstrated in trading_app_dashboard and login_with_bloc. Most active GitHub in this batch.
      </div>
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
      <Section icon="⭐" title="BONUS SKILLS DETECTED" badge={`${extras.filter(e => e.found).length}/${extras.length} FOUND`} badgeColor={c.blue} />
      <div style={{ marginBottom: mobile ? 20 : 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
          {extras.map((e, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: e.found ? c.green.bg : c.g[50], border: `1px solid ${e.found ? c.green.brd : c.g[200]}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: e.found ? c.green.txt : c.g[400] }}>
              {e.found ? "✓" : "—"} {e.skill}
            </span>
          ))}
        </div>
        <div style={{ borderLeft: `2px solid ${c.g[200]}`, paddingLeft: 10 }}>
          {extras.filter(e => e.found).map((e, i) => (
            <div key={i} style={{ fontSize: 10, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>
              <span style={{ fontWeight: 700, color: c.g[700] }}>{e.skill}:</span> {e.evidence}
            </div>
          ))}
          {extras.some(e => !e.found) && (
            <div style={{ fontSize: 10, color: c.g[400], marginTop: 2, fontStyle: "italic" }}>
              Not detected: {extras.filter(e => !e.found).map(e => e.skill).join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* LIVE CODING */}
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~40 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC architecture prompt.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.pastes} doc lookups</span>
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="GOOD FIT" badgeColor={c.blue} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>Transcript verified</div>
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
          <div style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 6, padding: "5px 10px", marginTop: 6, fontSize: 10.5, color: c.g[700] }}>
            + {edu.course}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="✓ Below Budget Floor" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $28,000 / yr</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted platform rates"],
            ["Naukri (Flutter, 3–5 YOE, India)", "₹10L–₹20L (~$12K–$24K)", "India market median"],
            ["Candidate expectation", "₹18L–₹19L (~$21.6K–$22.9K)", "Stated to recruiter"],
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
              <span style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>$25,000 – $30,000 / yr</span>
            </div>
            <div style={{ borderTop: `1px solid ${c.teal.brd}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Likely accepts at</span>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>~$22K</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function PrachiTalentProfile() {
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
            {[["Resume", true], ["GitHub", true], ["Live Code", true], ["Interview", true]].map(([label, on]) => (
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
