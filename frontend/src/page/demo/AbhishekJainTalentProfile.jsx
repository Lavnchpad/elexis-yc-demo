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
  name: "Abhishek Jain",
  title: "Mobile Application Developer II",
  company: "Yocket",
  location: "Ahmedabad, Gujarat, India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "5+ years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Engineering Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 78,
  bullets: [
    "Aditya's assessment: 'Very Promising.' Google Maps, Firebase, Payments, Live Chat all confirmed. English is a slight struggle — not a blocker. Module ownership in a 5-person team confirmed. Worked with backend team to optimise compute and cost efficiency (Hasura migration).",
    "BLoC confirmed in production — clean architecture with BLoC + GetIt DI at Yocket across a 1M+ community platform. Used dartz and equatable with BLoC in coding exercise — signals awareness of real-world clean architecture patterns, not just basic bloc usage.",
    "WebSocket architecture is the standout signal: led Hasura → native socket migration at Yocket, designed delta event schema (cost + performance driven with backend team), built centralized global socket service with stream broadcast for multi-screen subscription.",
    "CI/CD ownership end-to-end: Bitbucket (Android) + Codemagic (iOS), three flavors (alpha/beta/prod), automated versioning, Firebase App Distribution, PR gates with flutter analyze + flutter test + per-file linting. Built from scratch.",
    "BLoC coding exercise: functional, used dartz + equatable correctly, minor spelling mistakes (not a concern), created dual result/data fields showing sound state design reasoning. Two minor bugs self-caught (missing initState event trigger, missing status emit).",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter + Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCode: {
      status: "confirmed",
      detail: "Wrote Flutter BLoC code live without AI assistance — widget tree, BlocProvider, BlocBuilder, MaterialApp scaffolding all authored from memory. No type errors on static analysis.",
    },
    interview: {
      status: "confirmed",
      note: "5+ years Flutter across Softqube (4 months), XongoLab (15 months), Yocket (4 years). Multiple production Android + iOS apps. Primary framework throughout entire career. Also contributed to Flutter web (limited scope).",
    },
    confidence: "high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCode: {
      status: "confirmed",
      detail: "Implemented FetchEmployee + SearchEmployee events, enum-based state modeling, dual data/result fields in state, BlocProvider + BlocBuilder wiring. Adapted to repository-layer suggestion quickly. Proactively mentioned bloc_concurrency debounce transformer and bloc_test package — both correct auxiliary tools, both unprompted.",
    },
    interview: {
      status: "confirmed",
      note: "Clean architecture with BLoC + GetIt DI at Yocket confirmed in experience walkthrough. Central socket service feeding BLoC stream subscription — non-trivial integration pattern. Also confirmed MobX, Provider, Riverpod across earlier companies — well-rounded state management exposure.",
    },
    confidence: "high",
  },
  {
    skill: "Clean Architecture",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    liveCode: {
      status: "confirmed",
      detail: "Explicitly mentioned data/domain/presentation layer separation during coding exercise. Correctly identified repository layer as data owner when Aditya prompted it — adapted immediately. Acknowledged skipping DI in the quick exercise but stated GetIt preference in real projects.",
    },
    interview: {
      status: "confirmed",
      note: "At Yocket: 'following clean architecture with BLoC state management and using GetIt for dependency injection and writing unit test widget test.' At XongoLab: 'applied MVVM/MVP architecture patterns, dependency injection, and performance best practices.' Module ownership confirms architectural accountability within owned areas.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Real-time / WebSocket",
    met: true,
    level: "Advanced",
    note: "Led Hasura → native WebSocket migration at Yocket. Designed event schema: delta updates per event type (message_read sends only chatRoomId + messageId) vs. Hasura's full list fetch on any change. Built centralized global socket service with stream broadcast — multiple BLoC subscriptions to single connection. Architecture decision was front-end initiated with backend coordination. Problem-diagnosed: dual sockets = memory pressure → centralized stream = correct solution.",
    risk: "low",
  },
  {
    skill: "Social / Consumer Product",
    met: true,
    level: "Intermediate",
    note: "Yocket is a study-abroad social community platform (LinkedIn-equivalent): home feed, scrolling content, live chat, video calling, calendar features. 7L+ downloads, 4.6-star, 10K+ DAU, 1M+ community. Also built TikTok-clone (TikTalk with MobX) and social media app at XongoLab. Consumer-facing experience is confirmed across career — not B2B.",
    risk: "low",
  },
  {
    skill: "CI/CD + Automated Testing",
    met: true,
    level: "Advanced",
    note: "Full CI/CD pipeline built from scratch at Yocket: Bitbucket (Android) + Codemagic (iOS). Three flavors (alpha/beta/prod) with separate backend API environments (alpha.yocket.com, beta.yocket.com, yocket.com). Automated versioning. PR gates: flutter analyze + flutter test + per-file linting (incremental lint: only changed files must pass). Firebase App Distribution for alpha/beta. Play Store internal + TestFlight for prod. QA approval gate before 100% rollout. Unit, widget, and integration tests written.",
    risk: "low",
  },
  {
    skill: "Payment Gateway Integration",
    met: true,
    level: "Developing",
    note: "Payments confirmed by Aditya in handwritten notes alongside Google Maps, Firebase, and Live Chat — listed as key positives. Payment gateways integrated at XongoLab (payment gateways + in-app purchases) and Softqube. Not from the Yocket product but Aditya called it out affirmatively. Confirms real payment integration experience across career.",
    risk: "low",
  },
  {
    skill: "Third-party SDK Portfolio",
    met: true,
    level: "Intermediate",
    note: "100ms SDK (video conferencing — Google Meet equivalent built at Yocket), Google Maps SDK (taxi booking), Firebase Realtime Database, WebEngage (analytics, required native Android channel code), Agora SDK (video calling, Softqube). Portfolio is solid for a 5-year Flutter career. 100ms SDK is the strongest signal — video conferencing is non-trivial.",
    risk: "low",
  },
  {
    skill: "Native Channel Integration",
    met: true,
    level: "Developing",
    note: "WebEngage analytics integration required writing native Android channel code — confirmed in interview. This was the only confirmed native channel use case. 100ms SDK was handled entirely via their Flutter package (no bridging needed). iOS-side native channel not confirmed. Platform channels are known and used, but not a deep area.",
    risk: "medium",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "WebSocket (Global Service Pattern)", found: true, evidence: "Led Hasura→WebSocket migration. Centralized socket service with stream broadcast. Multiple BLoC subscriptions to single connection. Self-identified performance problem (dual sockets → memory) and designed the correct solution." },
  { skill: "100ms SDK (Video Conferencing)", found: true, evidence: "Built 'Virtual Office' — Google Meet-equivalent feature at Yocket for counselor-student communication. Implemented 100ms interface and callbacks. Non-trivial real-time feature." },
  { skill: "CI/CD (Codemagic + Bitbucket)", found: true, evidence: "Built full pipeline from scratch. Three-flavor setup with separate API environments. Automated versioning. PR gates (analyze + test + lint). Firebase App Distribution + Play Store internal + TestFlight flow." },
  { skill: "dartz (Functional Error Handling)", found: true, evidence: "Used dartz package in coding exercise — signals clean architecture Either type error handling patterns. Not a beginners' choice; indicates familiarity with production clean arch conventions." },
  { skill: "equatable (State Equality)", found: true, evidence: "Used equatable with BLoC in coding exercise — correct approach for state/event equality comparison in BLoC. Standard production usage." },
  { skill: "bloc_concurrency / Event Transformer", found: true, evidence: "Mentioned debounce via event transformer (bloc_concurrency or stream transformer package) during coding exercise — unprompted, correct approach for search debouncing in production." },
  { skill: "bloc_test (Unit Testing)", found: true, evidence: "Mentioned bloc_test package for BLoC unit testing during coding exercise — unprompted. Aligned with Yocket's confirmed unit + widget + integration test culture." },
  { skill: "GetIt (Dependency Injection)", found: true, evidence: "GetIt confirmed as DI solution at Yocket in clean architecture setup. Standard and correct choice alongside BLoC." },
  { skill: "Firebase App Distribution", found: true, evidence: "Alpha and beta builds deployed to Firebase App Distribution for internal QA before Play Store/TestFlight promotion." },
  { skill: "Agora SDK (Video Calling)", found: true, evidence: "Built video calling app with Agora SDK + MobX at Softqube. Precursor to 100ms SDK experience at Yocket." },
  { skill: "WebEngage (Analytics + Native Channel)", found: true, evidence: "Integrated WebEngage analytics at Yocket. Required native Android platform channel code — only native bridging confirmed in career." },
  { skill: "Google Maps SDK", found: true, evidence: "Integrated Google Maps SDK in taxi booking app at earlier companies. Location-aware app experience confirmed." },
  { skill: "Riverpod", found: true, evidence: "Riverpod mentioned alongside Bloc/Provider/MobX at XongoLab. Aware of the full state management ecosystem. Not the primary choice at Yocket." },
  { skill: "GetStream / Chat SDK", found: false, evidence: "No GetStream or third-party chat SDK. Chat was built from scratch with native WebSocket — actually the stronger signal." },
];

// ─── LIVE CODING EXERCISE ───
const codingExercise = {
  title: "BLoC Employee Search — Live Implementation",
  context: "Employee list with search-by-name filtering. Mock API via Future.delayed. Candidate built BLoC structure, events, states, repository layer, and basic UI from scratch. Screen share, no AI IDE assistance.",
  time: "~45 min",
  proficiency: "Intermediate",
  verdict: "Functional BLoC implementation with correct structural reasoning. Used dartz and equatable with BLoC — signals real-world clean architecture awareness beyond basic bloc usage. Two events (FetchEmployee, SearchEmployee), enum-based state modeling, dual data/result fields (sound reasoning: preserves original list for reset). Proactively mentioned debounce via event transformer and bloc_test package. Self-caught two minor bugs before being told. Aditya: 'Very Promising.' Spelling mistakes noted as minor, not a concern.",
  correct: [
    "Used dartz package — signals clean architecture error handling patterns (Either type)",
    "Used equatable with BLoC — correct for state/event equality comparison",
    "Two events correctly scoped: FetchEmployee (async API call) + SearchEmployee (local filter)",
    "Enum-based state modeling — correct choice when data is shared across loaded/search states",
    "Dual data/result fields in state — sound reasoning: preserves original list for reset-on-clear",
    "BlocProvider + BlocBuilder wiring correct — repository injected into BLoC at root",
    "Adapted to repository-layer approach immediately when Aditya suggested it",
    "Proactively mentioned debounce via event transformer (bloc_concurrency) — correct production pattern",
    "Mentioned bloc_test package for BLoC unit testing — unprompted, correct tool",
    "Self-reviewed and caught both bugs without being prompted",
  ],
  issues: [
    "Forgot to dispatch initial FetchEmployee event in initState — data wasn't loading on screen open",
    "Forgot to emit status update after search — UI stayed in loading state indefinitely",
    "Minor spelling mistakes in code (noted by Aditya — not a concern)",
    "~45 min for a 2-event BLoC is slower than expected at senior level",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 7.5,
  "Domain": 7.0,
  "Communication": 6.5,
  "Problem Solving": 7.0,
  "Culture Fit": 7.5,
};

const findings = [
  "Aditya's overall assessment: 'Very Promising.' Google Maps, Firebase, Payments, and Live Chat all confirmed across career. Module ownership in a 5-person team confirmed. Worked with backend team to optimise compute and cost efficiency (Hasura migration — cost reduction + performance improvement). Positive recommendation from interviewer.",
  "BLoC confirmed in production at Yocket — 4 years, 1M+ community platform. Clean architecture + BLoC + GetIt DI across a team of 5. Used dartz + equatable with BLoC in coding exercise — signals awareness of production-grade clean architecture patterns. Central socket service feeding BLoC stream subscription is a non-trivial pattern.",
  "WebSocket migration is the strongest technical signal. Led Hasura → native socket replacement, designed event schema (delta updates: message_read sends only chatRoomId + messageId vs. Hasura's full list fetch on any change), built centralized stream service for multi-screen subscription. Architecture decision was front-end initiated with backend team collaboration for compute and cost efficiency.",
  "CI/CD from scratch at Yocket is above average for a Flutter developer. Three flavors (alpha/beta/prod), separate backend environments, automated versioning, incremental lint checks (changed files only), Firebase App Distribution + Play Store + TestFlight flow. Operational maturity, not just build button experience.",
  "Live coding exercise: functional, used dartz + equatable correctly, sound dual data/result state design reasoning. Two minor bugs self-caught (missing initState trigger, missing status emit). Spelling mistakes in code noted as minor by Aditya. ~45 min for 2-event BLoC is slower than ideal but output was correct.",
  "English is a slight struggle (Gujarati speaker) — Aditya noted this explicitly as not a blocker. Technical explanations are clear and correctly detailed — socket migration and BLoC architecture reasoning were both articulated well with genuine understanding. Communication is below senior bar but sufficient.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Shankersinh Vaghela Bapu Institute of Technology",
  degree: "B.E. — Computer Engineering, 2020",
  location: "Gandhinagar, Gujarat, India",
  cgpa: "9.19 CGPA",
  usEquivalent: "Bachelor of Engineering in Computer Science (4-year) — equivalent to a US BS CS degree",
  relevance: "4-year engineering degree. Strong academic performance (9.19/10 CGPA). Standard CS/CE foundation. Graduated 2020, immediately entered Flutter development.",
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
const profC = { None: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, Strong: c.purple, Senior: c.purple };
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
  const mustsPassed = musts.filter(m => m.passed === true).length;
  const mustsPartial = musts.filter(m => m.passed === null).length;
  const mustBadgeColor = mustsPassed === musts.length ? c.green : mustsPartial > 0 ? c.amber : c.red;
  const mustBadgeText = `${mustsPassed}/${musts.length} PASSED${mustsPartial > 0 ? ` · ${mustsPartial} PARTIAL` : ""}`;

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px 16px 20px" : "14px 20px 20px" }}>

      {/* RUBRIC BANNER */}
      <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 8, padding: mobile ? "8px 12px" : "7px 14px", marginBottom: 12, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 4 : 0 }}>
        <span style={{ fontSize: mobile ? 11 : 12, color: c.blue.txt }}>Scored against: <strong>{role.company} — {role.title}</strong> · {role.team}</span>
        <span style={{ fontSize: 10, color: c.g[400] }}>{musts.length} must-haves · {shouldHaves.length} should-haves · L1 + L2 + L3 verified</span>
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
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>78% confidence</div>
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
      <Section icon="🔒" title="MUST-HAVE VERIFICATION — KNOCKOUT CRITERIA" badge={mustBadgeText} badgeColor={mustBadgeColor} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontFamily: mono, margin: "-4px 0 8px" }}>Any must-have failure = candidate removed. No exceptions.</div>

      {mobile ? (
        musts.map((m, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${m.passed === true ? "#22C55E" : m.passed === null ? c.amber.txt : c.red.txt}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8, background: c.g[50] }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700 }}>{m.skill}</span>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
              <Pill color={m.resume.signal === "strong" ? c.green.txt : c.amber.txt} bg={m.resume.signal === "strong" ? c.green.bg : c.amber.bg}>Resume: {m.resume.signal === "strong" ? "Strong" : "Moderate"}</Pill>
              {m.liveCode && <Pill color={m.liveCode.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.liveCode.status === "confirmed" ? c.green.bg : c.amber.bg}>Live Code: {m.liveCode.status}</Pill>}
            </div>
            {m.liveCode?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.liveCode.detail}</div>}
            {m.interview?.note && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.interview.note}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "170px 90px 1fr 60px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "LIVE CODE + INTERVIEW", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>
          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "170px 90px 1fr 60px", padding: "8px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}`, alignItems: "start" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span style={{ fontSize: 11, flexShrink: 0 }}>{m.passed === true ? "✅" : m.passed === null ? "⚠️" : "❌"}</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.3 }}>{m.skill}</span>
              </div>
              <div>
                <div style={{ fontSize: 10, fontFamily: mono, color: c.g[500] }}>{m.resume.sections.join(" · ")}</div>
                <div style={{ fontSize: 9, color: m.resume.signal === "strong" ? c.green.txt : c.amber.txt, marginTop: 1 }}>{m.resume.signal === "strong" ? "Strong" : "Moderate"}</div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
                  {m.liveCode && <Pill color={m.liveCode.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.liveCode.status === "confirmed" ? c.green.bg : c.amber.bg}>Code: {m.liveCode.status}</Pill>}
                  <Pill color={m.interview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.interview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Interview: {m.interview?.status}</Pill>
                </div>
                {m.liveCode?.detail && <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.4, marginBottom: 3 }}>{m.liveCode.detail}</div>}
                {m.interview?.note && <div style={{ fontSize: 10, color: c.g[500], fontStyle: "italic", lineHeight: 1.35 }}>{m.interview.note}</div>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
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
              <Pill color={profC[s.level]?.txt || c.blue.txt} bg={profC[s.level]?.bg || c.blue.bg}>{s.level}</Pill>
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

      {/* LIVE CODING EXERCISE */}
      <Section icon="⟨/⟩" title="LIVE CODING EXERCISE" badge="~45 min · Screen Share" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Live BLoC implementation on screen share. No AI IDE assistance. Candidate built from scratch with documentation reference allowed.</div>
      <div style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "10px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>{codingExercise.title}</span>
            <Pill color={profC[codingExercise.proficiency].txt} bg={profC[codingExercise.proficiency].bg}>{codingExercise.proficiency}</Pill>
          </div>
          <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{codingExercise.time}</span>
        </div>
        <div style={{ fontSize: 11, color: c.g[400], marginBottom: 6, fontStyle: "italic" }}>{codingExercise.context}</div>
        <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55, marginBottom: 8 }}>{codingExercise.verdict}</div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.green.txt, marginBottom: 4 }}>CORRECT / PROACTIVE</div>
            {codingExercise.correct.map((item, i) => (
              <div key={i} style={{ fontSize: 10, color: c.g[700], lineHeight: 1.5, display: "flex", gap: 5, marginBottom: 2 }}>
                <span style={{ color: c.green.txt, flexShrink: 0 }}>✓</span> {item}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.amber.txt, marginBottom: 4 }}>BUGS / CONCERNS</div>
            {codingExercise.issues.map((item, i) => (
              <div key={i} style={{ fontSize: 10, color: c.amber.txt, background: c.amber.bg, padding: "4px 8px", borderRadius: 4, marginBottom: 4 }}>⚠ {item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: mobile ? 20 : 14 }} />

      {/* INTERVIEW */}
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="GOOD FIT" badgeColor={c.blue} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~65 min · Transcript verified · Conducted by Aditya Panchal</div>
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
          {[["Location", edu.location], ["CGPA", edu.cgpa], ["US Equivalent", edu.usEquivalent]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500], flexShrink: 0 }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right" }}>{v}</span>
            </div>
          ))}
          <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.blue.txt }}>
            {edu.relevance}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>CLIENT BUDGET (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $26,000 / yr</div>
          {[
            ["Naukri (Sr. Flutter, 5+ YOE, India)", "$18,000 – $30,000", "India market median (~15L–25L)"],
            ["US equivalent (Senior Flutter, 5 YOE)", "$110,000 – $145,000", "SF/NY tech market, comparable scope"],
            ["Candidate current CTC", "Not disclosed", "To be confirmed"],
            ["Candidate expectation", "Not confirmed", "Ask before L2 offer"],
          ].map(([s, v, n]) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 10, color: c.g[500] }}>{s}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 8.5, color: c.g[400] }}>{n}</div>
              </div>
            </div>
          ))}
          <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: "7px 10px", marginTop: 8 }}>
            <div style={{ fontSize: 10.5, color: c.amber.txt }}>
              <strong>Note:</strong> 5 years, 4 at a high-growth product company — expectation may be at or above budget ceiling. Confirm CTC and expectation early before advancing.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function AbhishekJainTalentProfile() {
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
            {[["Resume", true], ["Live Code", true], ["GitHub", false], ["Interview", true]].map(([label, on]) => (
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
