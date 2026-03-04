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
  name: "Kamlesh P.",
  title: "Senior Mobile App Developer & Team Lead",
  company: "ThirstyFish Consultancy Services",
  location: "Mumbai, India",
  github: "kamleshthedev",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "5.5 years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};


const recommendation = {
  verdict: "Recommend",
  confidence: 83,
  bullets: [
    "BLoC confirmed via live coding (sealed states, BlocProvider, BlocConsumer) and resume work output — 'Managed multiple apps using BLoC' at ThirstyFish. Not a skills-list claim.",
    "5.5 yrs Flutter, team lead at ThirstyFish — owns requirements, code reviews, and full deployment across 15–20 apps.",
    "Self-taught Swift/SwiftUI to build iOS Live Activities and Dynamic Island via platform channels when Flutter had no native support.",
    "Payments (Stripe, Razorpay) and CI/CD (Xcode Cloud) are explicitly in resume skills — directly match Baller Corp's stack.",
    "Expects $24K–$27K — sits at the lower bound of client budget. Strong value hire.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Built working cart BLoC in DartPad. BlocProvider initialization on widget entry, BlocConsumer with listener + builder, loading/loaded state transitions. Clean event-driven architecture.",
      evidence: "~30 min. Single-file DartPad. Referenced docs for boilerplate only. 1 self-correction.",
    },
    github: {
      active: true,
      proficiency: "Developing",
      detail: "kamleshthedev — personal practice repos visible. Production Flutter code in private ThirstyFish org repos.",
      evidence: "Public repos show learning work. 5+ years prod experience in private repos.",
    },
    interview: { status: "confirmed", note: "5+ years Flutter. iOS Live Activities, Dynamic Island, home-screen widgets via method/platform channels + native Swift/SwiftUI. Multi-platform: Linux, Windows prototypes, Flutter web." },
    confidence: "high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Sealed states (CartLoading, CartLoaded, CartError). Event/state/bloc class separation. MultiBlocProvider in widget tree. State-driven loading spinner. CartFetch dispatched on init.",
      evidence: "Correct structure without prompting. Docs referenced for syntax only — architecture already known.",
    },
    github: {
      active: false,
    },
    interview: {
      status: "confirmed",
      note: "3–4 years BLoC in production. Prefers original BLoC over Cubit for industry-standard clarity. Sealed class usage correct in code — conceptual advantage explanation incomplete (missed exhaustive pattern matching).",
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
      detail: "Mock service with Future.delay. Repository pattern implied. Offline retry: local persistence at data-source layer + connectivity check + backend deduplication.",
      evidence: "Stub used in demo — offline + real-world retry strategy articulated clearly in verbal Q&A.",
    },
    github: {
      active: false,
    },
    interview: {
      status: "confirmed",
      note: "Dio used in production. 30–40 widget dashboard: partial data fetch optimization designed with BE team. API contract discussions from project start. Full backend collaboration pattern.",
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
      proficiency: "Developing",
      detail: "kamleshthedev — personal repos. Production git workflow in private org. Code reviews and release management confirmed on resume.",
      evidence: "Resume: 'Managed testing releases and code reviews' at ThirstyFish.",
    },
    interview: {
      status: "confirmed",
      note: "Leads code reviews, testing releases, deployment approvals across 15–20 apps. Xcode Cloud CI/CD: master branch merge triggers automated iOS pipeline. Owns full release cycle.",
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
    note: "Sabina Ibiza (villa rental/discovery marketplace) and white-label hotel apps show listing, browse, and booking UX. No social feed, user-generated content, or live commerce specifically. Ramp time expected on Baller Corp's sports social layer.",
    risk: "medium",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: true,
    level: "Advanced",
    note: "Play Store & App Store publishing explicitly in resume skills. TaxWhiz + PMR on Play Store, Sabina Ibiza + Ameen Connect on App Store. Xcode Cloud automated iOS pipeline self-configured. Full deployment ownership at ThirstyFish.",
    risk: "low",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: true,
    level: "Intermediate",
    note: "30–40 widget dashboard optimized via partial data fetching designed with BE team. Clean Architecture adopted team-wide. Resume profile states 'optimizing code performance'. Real-world scale across hotel apps.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase listed in Libraries on resume. Confirmed in interview. Auth, Firestore, and Crashlytics usage expected across scope of projects.",
    risk: "low",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: false,
    level: "None",
    note: "No GetStream experience. WebSocket knowledge confirmed verbally — stream builders, async* yield pattern, subscription cleanup. vChharge had real-time map-based EV charger location updates. No in-app messaging or live commerce stream experience.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Payment Gateways (Stripe + Razorpay)", found: true, points: 5, max: 5, evidence: "Payment Gateways in resume skills. Stripe, Razorpay, UK-based provider confirmed in interview. Direct relevance to Baller Corp commerce layer." },
  { skill: "CI/CD (Xcode Cloud)", found: true, points: 4, max: 4, evidence: "CI/CD in resume skills. Xcode Cloud pipelines self-configured for multiple iOS apps. Master branch → automated App Store build." },
  { skill: "Native Platform Channels (Swift)", found: true, points: 4, max: 4, evidence: "Swift in resume Languages. Method/platform channels for iOS Live Activities, Dynamic Island, home-screen widgets — self-taught Swift/SwiftUI. No prior resources online." },
  { skill: "Google Maps / Geolocation", found: true, points: 3, max: 3, evidence: "Google Maps in resume skills. vChharge EV charger map with real-time user navigation and location services." },
  { skill: "Clean Architecture", found: true, points: 3, max: 3, evidence: "Clean Architecture in resume skills and ThirstyFish experience. Adopted team-wide, enforced through code reviews and mentoring." },
  { skill: "Specific APIs (Scandit, EasyPost, Airship)", found: false, points: 0, max: 3, evidence: "No exposure to Baller Corp's specific third-party API stack." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "E-Commerce Cart BLoC",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a mock cart service with fetch and update operations. Show cart items in UI. Use BLoC for state management. Support loading state and error state.",
    time: "~30 min",
    pastes: 0,
    refactors: 1,
    proficiency: "Advanced",
    verdict: "Built working BLoC end-to-end in DartPad. Correct sealed states (CartLoading, CartLoaded, CartError — error not fully implemented). BlocProvider initializes CartFetch on widget load. BlocConsumer used with both listener and builder. MultiBlocProvider structure explained correctly. Future.delay mock latency. Event-driven quantity update pattern explained cleanly without coding.",
    flags: [
      "Error state acknowledged but not implemented in the demo",
      "Sealed class conceptual explanation incomplete — usage correct, exhaustive matching advantage not articulated",
    ],
  },
];

const verbalQA = [
  { q: "Real-time sync (WebSocket)", a: "Recommended stream builders + async* yield. Add WebSocket subscription inside BLoC, push updates via event. Correct approach — directionally sound." },
  { q: "Offline add-to-cart retry", a: "Local persistence at data-source layer, retry on connectivity restore, backend dedup check to prevent duplicate records. Structured and complete answer." },
  { q: "Duplicate tap / debounce", a: "Disable button on tap + state flag for buttons. Debounce for search inputs to limit API calls. Named it correctly and explained the purpose." },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 8.0, "Domain": 8.0, "Comms": 7.0, "Problem Solving": 8.0, "Culture Fit": 8.0 };

const findings = [
  "Resume explicitly names BLoC at ThirstyFish — 'Managed multiple apps by using Bloc for state management, focusing on complex UIs and functionalities.' Work output evidence, not skills-list claim. Live coding confirmed: correct sealed states, BlocProvider init, BlocConsumer.",
  "5.5 years Flutter across 3 companies. Progression: Flutter Dev → Flutter Dev (team lead, onboarding guide) → Senior Mobile Dev & Team Lead. Currently leads white-label hotel app development for Germany and Spain clients at ThirstyFish.",
  "Platform channel depth is above average — self-taught Swift/SwiftUI to implement iOS Live Activities and Dynamic Island when Flutter had no native support and no online resources. Demonstrates initiative and learning velocity.",
  "Payment integrations (Stripe, Razorpay, UK-based provider) and CI/CD (Xcode Cloud) directly match Baller Corp's stack. Both are explicitly in resume skills — not interview-only claims.",
  "Backend collaboration pattern is strong — sits with BE team before sprints, designed partial data fetching for 30–40 widget dashboard, owns API contract discussions from design phase.",
  "Verbal explanation is weaker than implementation quality. Sealed class advantage not articulated (missed exhaustive switch matching) but code usage was correct throughout.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Viva College of Diploma Engineering & Technology",
  degree: "Diploma in Computer Engineering, 2020",
  tier: "Polytechnic Diploma — 3-year vocational program",
  score: "92% (Distinction)",
  location: "Mumbai, India",
  comparable: "Associate's degree (US) / HNC (UK)",
  relevance: "Diploma-level, not a 4-year engineering degree. 92% score indicates strong academic performance. 5.5-year production track record and team lead title are the relevant credentials for this role.",
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
        <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.teal.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.teal.txt, lineHeight: 1.2, marginTop: 2 }}>Strong Fit</div>
          <div style={{ fontSize: 10, color: c.teal.txt, opacity: 0.7, marginTop: 1 }}>83% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="✅" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} />
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~30 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC prompt. DartPad environment. Follow-up verbal Q&A on real-time, offline, and debounce.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.pastes} pastes · {p.refactors} refactor</span>
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="RECOMMEND" />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~58 min · Transcript verified</div>
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
          {[["Classification", edu.tier], ["Academic Score", edu.score], ["Location", edu.location], ["US Comparable", edu.comparable]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500] }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right", maxWidth: 190 }}>{v}</span>
            </div>
          ))}
          <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.amber.txt }}>
            <strong>Note:</strong> {edu.relevance}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="✓ Within Budget" />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$24,000 – $33,000 / yr</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted platform rates"],
            ["Naukri (Sr. Flutter, 5+ YOE, India)", "₹18L–₹28L (~$21K–$33K)", "India market median"],
            ["Candidate expectation", "₹20L–₹23L (~$24K–$27K)", "Stated to recruiter"],
            ["Candidate current CTC", "₹15L (~$17.9K)", "Self-reported in interview"],
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
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>$24K – $27K</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── RESUME TAB ───
function ResumeTab({ mobile }) {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px 16px 20px" : "20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Kamlesh Prajapat</h1>
        <div style={{ fontSize: 14, color: c.g[500], marginTop: 4 }}>Senior Mobile App Developer & Team Lead · 5+ Years</div>
        <div style={{ fontSize: 12, color: c.g[400], marginTop: 2 }}>Mumbai, India · kamleshthedev@gmail.com · +91 9767361687</div>
        <div style={{ fontSize: 12, color: c.g[400], marginTop: 1 }}>github/kamleshthedev · linkedin/kamleshthedev · portfolio/kamlesh.cv</div>
      </div>

      <Section icon="" title="PROFILE" />
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: c.g[700], margin: "0 0 16px" }}>
        Senior Mobile App Developer & Team Lead with 5+ years of hands-on experience in Flutter, Android, and iOS development. Proven track record in leading teams, architecting scalable applications, and optimizing code performance. Strong expertise in UI/UX design, state management (BLoC, Provider), and implementing Clean Architecture for maintainable and high-quality solutions. Team collaboration to deliver high-performance, user-centric, and cross-platform mobile applications that meet business goals and enhance customer experience.
      </p>

      <Section icon="" title="EXPERIENCE" />
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Senior Mobile App Developer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>ThirstyFish Consultancy Services</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Aug 2023 – Present · Mumbai (Onsite)</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Managed multiple apps using BLoC for state management, focusing on complex UIs and functionalities</li>
          <li>Managed testing releases and code reviews to ensure quality, adhering to Clean Architecture principles</li>
          <li>Mentored new team members while overseeing development of white-label hotel apps</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Flutter Developer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>Lotus Wireless Technologies India Pvt. Ltd</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Oct 2021 – Jun 2023 · Mumbai (Remote)</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Led Flutter development, building features and enhancing functionality using MVC architecture with Provider</li>
          <li>Created UIs from Figma, managed version releases, and validated functionality for finance app (Finsights)</li>
          <li>Guided new team members, promoting effective onboarding and professional growth</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Flutter Developer & UI/UX Designer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>vChharge Technologies Pvt. Ltd</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>May 2020 – Sep 2021 · Mumbai (Remote)</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Implemented features and modules in Flutter, focusing on complex UIs, functionalities, and services</li>
          <li>Oversaw testing releases and code reviews, ensuring high-quality design through GetX</li>
        </ul>
      </div>

      <Section icon="" title="PROJECTS" />
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "6px 20px", marginBottom: 16 }}>
        {[
          ["Finsights – Tally on Mobile", "Mobile app replicating Tally features for on-the-go finance management", "Lotus Wireless", "Website"],
          ["StoxHero – Learn Trading", "Educational stock trading platform for learning and earning through trading", "Lotus Wireless", "Website"],
          ["TaxWhiz – Income Tax Calculator", "Tax calculation tool for easy tax management", "ThirstyFish", "Play Store"],
          ["PMR – Pack Move Relocate", "Logistics app for streamlining packing, moving, and relocating in India", "ThirstyFish", "Play Store"],
          ["Sabina Ibiza – Explore Villas", "Villa rental and discovery app for Ibiza", "ThirstyFish", "Website / App Store"],
          ["Ameen Connect – Request Duas", "Prayer and dua request app for sacred places worldwide", "ThirstyFish", "Website / App Store"],
        ].map(([name, desc, co, link]) => (
          <div key={name} style={{ padding: "6px 0", borderBottom: `1px solid ${c.g[100]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div>
              <Pill color={c.g[500]} bg={c.g[100]} style={{ flexShrink: 0, marginLeft: 6 }}>{link}</Pill>
            </div>
            <div style={{ fontSize: 11, color: c.g[500], marginTop: 1 }}>{desc}</div>
            <div style={{ fontSize: 10, color: c.teal.txt, marginTop: 1 }}>{co}</div>
          </div>
        ))}
      </div>

      <Section icon="" title="SKILLS" />
      <div style={{ marginBottom: 16 }}>
        {[
          ["Frameworks", "Flutter, Android, iOS, React Native"],
          ["Languages", "Dart, Java, Kotlin, Swift, JavaScript, Bash"],
          ["Dev Tools", "Git, VS Code, Android Studio, Xcode, Jira"],
          ["Libraries", "Firebase, BLoC, Provider, GetX, GetIt, Dio, GoRouter, Hive, Graphs"],
          ["Other", "Clean Architecture, CI/CD, Payment Gateways, Google Maps, Play Store & App Store publishing"],
        ].map(([cat, vals]) => (
          <div key={cat} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${c.g[100]}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, minWidth: 90, color: c.g[700], flexShrink: 0 }}>{cat}</span>
            <span style={{ fontSize: 11, color: c.g[500] }}>{vals}</span>
          </div>
        ))}
      </div>

      <Section icon="" title="EDUCATION" />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>Diploma in Computer Engineering</div>
        <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>Viva College of Diploma Engineering & Technology</div>
        <div style={{ fontSize: 11, color: c.g[400] }}>2017 – 2020 · Percentage: 92% · Mumbai, India</div>
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function KamleshTalentProfile() {
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
