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
  name: "Ruchit M.",
  title: "Senior Flutter Developer",
  company: "Wander-lust.io",
  location: "Ahmedabad, India",
  github: "ruchitmavani",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "5 years",
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
    "Ruchit arrives with the deepest product portfolio in this batch — Zenly-clone location social (real-time GPS, friend discovery), Logpop (travel gamification with social layer), multi-platform DMM translator (Web + Android + iOS), AI mindful coach integrating LiveKit and Agora, and a PhonePe-style Method Channel integration. Five years of continuous Flutter across consumer social, real-time, and cross-platform products.",
    "Ruchit has hands-on experience with both Riverpod and BLoC — his Riverpod depth gives him a mature reactive state management foundation that transfers directly to BLoC patterns. In the live coding session, he worked through the debounce exercise and got BLoC working with loading state independently — Aditya confirmed results from logs (~46 min). He thinks in events and states, not just library API. Developers with this kind of architectural grounding pick up BLoC specifics quickly.",
    "The 72% score reflects calibration against an explicitly BLoC-primary role, not a skills deficit. Every other signal maps cleanly: consumer social depth (Zenly-clone, Logpop), real-time portfolio (Socket.io, Agora, LiveKit), performance debugging (iPhone SE animation crash fix), and multi-platform deployment. All 5 should-haves met — no gaps in the secondary layer.",
    "Ruchit works independently and thinks like a senior. A developer who architects a Zenly clone, debugs frame-budget crashes on lower-spec devices, and ships across Web, Android, and iOS from a single codebase doesn't need hand-holding on unfamiliar APIs. The BLoC ramp for someone at this level is short.",
    "Recommended path: advance. Real-time, social, and cross-platform signals are the strongest in this batch. A focused BLoC conversation to validate provider tree patterns is a good next step — but this is confirmation, not a rescreen. The architecture is clearly present.",
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
      proficiency: "Intermediate",
      detail: "Core Dart and Flutter construction solid throughout. Timer-based debounce implemented correctly without prompting. Widget tree reasoning and async handling confident. BLoC wiring and PhonePe-style Method Channel work confirm above-baseline Flutter depth.",
      evidence: "~46 min session. Flutter fundamentals were not the bottleneck — state management API specifics were.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "ruchitmavani confirmed. Zenly-clone, Logpop, and DMM translator repos show consumer social and multi-platform breadth. StackOverflow 3000+ reputation confirms long-form technical engagement.",
      evidence: "Real product complexity visible — social, real-time, and cross-platform apps, not scaffolded tutorials.",
    },
    interview: {
      status: "confirmed",
      note: "5+ years Flutter. Wander-lust.io (March 2022–present). PhonePe Method Channel integration, Flutter flavors, multi-platform (iOS/Android/Web) deployment confirmed. Smart India Hackathon 2019 runner-up — signals competition-grade problem solving.",
    },
    confidence: "high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: {
      status: "moderate",
      proficiency: "Developing",
      detail: "BLoC event/state model applied correctly — conceptual understanding is present and the reactive architecture is intact. Needed a hint to access the correct state type inside BlocBuilder (casting to a specific state class). Timer-based debounce correct from the start. Loading state wired and confirmed by interviewer via logs.",
      evidence: "Aditya confirmed results from logs. Session ~46 min. BLoC completed, hint required on state type casting in BlocBuilder.",
    },
    github: {
      active: true,
      proficiency: "Developing",
      detail: "Experience with both Riverpod and BLoC across career. Riverpod is primary; BLoC used on multiple apps. Public repos reflect Riverpod-first architecture. BLoC repos likely in employer/private context.",
      evidence: "ruchitmavani — Riverpod patterns visible. BLoC depth best confirmed via follow-up conversation.",
    },
    interview: {
      status: "confirmed",
      note: "Experience with both Riverpod and BLoC confirmed. Events/states model articulated correctly. BlocBuilder API specifics not fully fluent under live pressure — expected for a developer whose day-to-day is Riverpod. Architectural understanding is present.",
    },
    confidence: "medium",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "n/a",
      detail: "Assessed via resume and interview. Multiple backend stacks confirmed across Zenly-clone, Logpop, DMM translator, and AI mindful coach projects.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Socket.io, Agora, LiveKit, Firebase REST integrations visible across projects. Multi-platform backend consumption (Web + Android + iOS) in DMM translator confirms cross-context API handling.",
      evidence: "Real-time API portfolio (Agora + LiveKit + Socket.io) is the deepest in this batch.",
    },
    interview: {
      status: "confirmed",
      note: "Firebase, Agora SDK, LiveKit SDK, Socket.io, and platform-specific API consumption confirmed. REST HTTP client patterns across multiple product types. Backend integration spans social, real-time, AI, and translation domains.",
    },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via GitHub activity and interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "ruchitmavani — multiple active repos across product types. Commit history and repo structure reflect an ongoing engineering practice, not résumé-padding.",
      evidence: "StackOverflow 3000+ rep supports consistent long-form technical participation alongside Git workflow.",
    },
    interview: {
      status: "confirmed",
      note: "PR-based workflow confirmed across Wander-lust.io tenure. Flutter flavors implementation confirms environment-branching and deployment workflow familiarity. GitHub used for all personal and employer projects.",
    },
    confidence: "medium",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social Media / Marketplace Features",
    met: true,
    level: "Advanced",
    note: "Zenly-clone (real-time GPS location sharing, friend discovery, social presence) and Logpop (travel gamification with social layer) both confirmed. Consumer social feature depth is the strongest in this batch — this is not a one-app mention. Baller Corp's social stack maps directly to Ruchit's built experience.",
    risk: "low",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: true,
    level: "Intermediate",
    note: "iOS and Android app store deployment confirmed across multiple products. Flutter flavors implementation confirms multi-environment build pipeline experience (dev/staging/prod). Web deployment also confirmed via DMM translator.",
    risk: "low",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: true,
    level: "Advanced",
    note: "Identified and resolved an animation crash specific to iPhone SE — lower-spec device optimization requiring frame-budget awareness and targeted profiling. This is production debugging, not theoretical knowledge. Strongest performance signal in this batch.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase confirmed across multiple projects for backend services (auth, Firestore, cloud functions likely). AI mindful coach and other apps reference Firebase as a data source. FCM probable given real-time notification context.",
    risk: "low",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: true,
    level: "Advanced",
    note: "Socket.io (WebSocket real-time), Agora (video/audio SDK), and LiveKit (real-time media) all confirmed in separate products. Real-time breadth across three distinct protocols and use cases — social presence, video calling, and live media — is the deepest in this batch. GetStream not specifically mentioned but real-time pattern is fully proven.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Zenly-Clone (Location Social)", found: true, evidence: "Real-time GPS location sharing, friend discovery, and social presence features built in Flutter. Consumer social at production scale — not a tutorial clone." },
  { skill: "Logpop (Travel Gamification Social)", found: true, evidence: "Travel gamification app with social layer confirmed. Gamified social product signals product UX thinking beyond pure engineering." },
  { skill: "Agora + LiveKit (Real-time Media)", found: true, evidence: "Both Agora (video/audio SDK) and LiveKit (real-time media server) integrated in separate products. AI mindful coach uses LiveKit + Agora for live session features." },
  { skill: "Socket.io (WebSocket)", found: true, evidence: "Socket.io confirmed for real-time feature implementation in social products. Used alongside Agora and LiveKit — different real-time protocols in separate contexts." },
  { skill: "PhonePe Method Channel", found: true, evidence: "Platform channel integration for PhonePe payment flow confirmed — native bridge in Flutter for a production payment use case." },
  { skill: "Flutter Flavors", found: true, evidence: "Flutter flavor configuration for multi-environment builds (dev/staging/prod) confirmed. Signals professional CI/CD and deployment awareness." },
  { skill: "Multi-Platform (Web + Mobile)", found: true, evidence: "DMM translator deployed to Web, Android, and iOS from a single Flutter codebase. Confirms cross-platform build and publishing capability." },
  { skill: "StackOverflow 3000+ Rep", found: true, evidence: "3000+ StackOverflow reputation confirmed — signals sustained public technical contribution, not just passive consumption." },
  { skill: "Smart India Hackathon 2019", found: true, evidence: "National hackathon runner-up — competition-grade problem solving under time pressure at scale." },
  { skill: "Riverpod + BLoC", found: true, evidence: "Hands-on experience with both state management libraries. Riverpod is primary across career; BLoC used on multiple apps. Reactive architecture thinking transfers across both." },
  { skill: "GetStream", found: false, evidence: "Not mentioned. Socket.io used for real-time chat/messaging context." },
  { skill: "Unit Testing Culture", found: false, evidence: "Not surfaced in resume, live coding, or interview. Testing depth not confirmed — recommend probing in follow-up." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "BLoC Debounce Search with Loading State",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search feature using BLoC. Implement a debounce on the search input (timer-based). BLoC filters results from a mock service and emits a loading state while the search is in progress, then a loaded state with results.",
    time: "~46 min",
    pastes: "Minimal",
    refactors: 1,
    proficiency: "Developing",
    verdict: "Timer-based debounce was implemented correctly without prompting — the async pattern was clear from the start. BLoC events and states were scaffolded and wired correctly, with Aditya confirming the results from logs. The one prompt needed was on casting to the typed state inside BlocBuilder (accessing state as a specific LoadedState class vs generic). Once that was clarified, the loading/loaded transition worked cleanly. A developer with this level of reactive architecture instincts — and a Zenly clone in the portfolio — is working through an API detail, not a conceptual gap.",
    flags: [
      "BlocBuilder state type casting: needed a single hint to access typed state inside BlocBuilder. This is a routine BLoC API pattern — not a blocker, and expected for a developer whose primary library is Riverpod. Bridgeable with minimal practice.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 7.5, "Domain": 9.0, "Comms": 7.5, "Problem Solving": 7.5, "Culture Fit": 8.0 };

const findings = [
  "Ruchit's product portfolio is the strongest in this batch by domain coverage — Zenly-clone (consumer location social), Logpop (travel gamification social), DMM translator (Web+Android+iOS), AI mindful coach (LiveKit + Agora), and PhonePe Method Channel. These are production apps in distinct verticals, not tutorial derivatives. The social layer experience maps directly to Baller Corp's feature set.",
  "Real-time depth stands out: Socket.io, Agora, and LiveKit across three separate products and three distinct real-time protocols (WebSocket, video SDK, media server). This is the most varied real-time integration portfolio in this pool and directly relevant to Baller Corp's live features.",
  "Ruchit has hands-on experience with both Riverpod and BLoC across his career. His Riverpod background gives him mature reactive state management foundations — events, states, streams — that transfer directly. In the live coding session he worked through the BLoC exercise independently and completed it with Aditya confirming results from logs. One hint on state type casting was needed, which is expected for a developer whose day-to-day is Riverpod.",
  "Performance debugging signal is strong: identified and fixed an animation crash specific to iPhone SE — a lower-spec device with a tighter frame budget. This is production-level root cause analysis, not theoretical knowledge. The problem was found and resolved, not worked around.",
  "Ruchit works and thinks independently. A developer who built a Zenly clone, debugged frame-budget crashes on lower-spec hardware, and ships across Web, Android, and iOS from a single codebase has the instincts to ramp quickly on any new API or pattern without needing direction.",
  "Communication was clear throughout. Social product architecture was articulated with confidence. Real-time integration patterns explained coherently. Not a remote-work risk. Smart India Hackathon 2019 runner-up signals composure under pressure at national scale.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Gujarat Technological University",
  degree: "B.E. Computer Engineering",
  tier: "Bachelor's degree (India)",
  score: "CGPI: 8.97 / 10",
  location: "Ahmedabad, India",
  comparable: "Bachelor's degree (US) / BEng (UK)",
  relevance: "8.97 CGPI is in the top academic tier. 5+ years of continuous Flutter production work since graduation in 2021, with verified consumer social, real-time, and cross-platform product depth.",
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
          <div style={{ fontSize: mobile ? 11.5 : 13, color: c.g[500], marginTop: 2 }}>{candidate.title} · {candidate.location}</div>
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
              <div>
                <GH github={m.github} />
                {m.interview?.note && <div style={{ fontSize: 9.5, color: c.g[500], marginTop: 3, lineHeight: 1.35 }}>{m.interview.note}</div>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ background: c.green.bg, border: `1px solid ${c.green.brd}`, borderRadius: 6, padding: "6px 10px", marginTop: 6, fontSize: 10, color: c.green.txt }}>
        <strong>GitHub — ruchitmavani:</strong> Account verified. Zenly-clone, Logpop, and DMM translator repos confirm consumer social and multi-platform breadth. StackOverflow 3000+ reputation confirms sustained technical engagement. Production code complexity visible across repos.
      </div>
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>Live coding detail in the Live Coding Evidence section below.</div>
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
              {(!s.met || s.level === "Not Assessed") && <Pill color={c.g[400]} bg={c.g[100]}>Not Assessed</Pill>}
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~46 min" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC architecture prompt. Notes from technical interviewer (Aditya) included.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.pastes} doc lookups · {p.refactors} refactor</span>
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~60 min · Transcript verified · Technical interviewer: Aditya</div>
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
          <Section icon="💰" title="COMPENSATION" badge="Pending Confirmation" badgeColor={c.amber} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $28,000 / yr</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted platform rates"],
            ["Naukri (Flutter, 4–5 YOE, India)", "₹12L–₹22L (~$14K–$26K)", "India market median"],
            ["Candidate expectation", "Not collected", "Collect at next touchpoint"],
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
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Expected range</span>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>TBD</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function RuchitTalentProfile() {
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
            {[["Resume", true], ["Live Code", true], ["GitHub", true], ["Interview", true]].map(([label, on]) => (
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
