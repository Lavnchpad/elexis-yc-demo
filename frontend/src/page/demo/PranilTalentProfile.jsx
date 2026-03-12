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
  name: "Pranil S.",
  title: "Senior Flutter Developer",
  company: "Current Employer",
  location: "India",
  github: "pranilshah4024",
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
  confidence: 74,
  bullets: [
    "Pranil enters this process with one of the strongest resume portfolios in the batch — flutter_device_imei plugin published on pub.dev, platform channels in Kotlin+Swift (notifications, calling, RTE), and a broad third-party portfolio including Stripe, Socket.io, BLE, MQTT, Redis, Cognito, Lambda, S3, PostHog, and DataDog. Pre-interview L1 score was 82% (Strong Fit).",
    "Live coding showed events/states scaffolded correctly — conceptual BloC model is intact. Provider scoping took longer than expected and the interim approach used was non-standard. With some re-ramp time on BloC wiring patterns, this gap is bridgeable.",
    "The score revision to 74% reflects the live coding result against the specific requirement — the role is explicitly BloC-heavy. All other signals (portfolio depth, platform channel work, publishing history, real-time experience) remain strong and transfer directly to Baller Corp's stack.",
    "Unit test coverage is thin — only 1 app with tests across career. Outage debugging framing was general rather than systematic. Both are secondary flags worth monitoring but not disqualifying on their own.",
    "Recommended path: proceed to a follow-up technical conversation focused on BloC provider tree patterns before making a final decision. Resume and GitHub signals are too strong to pass without a second look.",
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
      detail: "Core Dart and Flutter widget construction solid. Platform channel depth (Kotlin+Swift for notifications, calling, RTE) and published pub.dev plugin (flutter_device_imei) confirm above-baseline Flutter breadth. BloC scaffolding started cleanly.",
      evidence: "~90 min total session including provider scoping re-work. Flutter fundamentals were not the bottleneck.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "pranilshah4024 confirmed. flutter_device_imei published on pub.dev — native bridge in Kotlin+Swift, production-ready.",
      evidence: "Plugin authorship is the strongest GitHub signal: wrote, published, and maintains a pub.dev package.",
    },
    interview: {
      status: "confirmed",
      note: "5 years Flutter across multiple products. 12-13 BloC-based apps claimed. Platform channels in Kotlin (Android) and Swift (iOS) for notifications, calling, and RTE. Firebase App Distribution + GitHub Actions CI/CD confirmed.",
    },
    confidence: "high",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Developing",
      detail: "Events and states scaffolded correctly — conceptual understanding of BloC is intact. Provider scoping took longer than expected: struggled to place BlocProvider correctly above the consuming widget and used an alternate approach to unblock. Pattern used was non-standard for the use case.",
      evidence: "Aditya's note: approach used was 'bloc as a state variable' rather than BlocProvider composition. Exercise ran ~90 min vs 60 min target.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "12-13 BloC apps claimed. Public repos don't expose BloC architecture directly, but plugin quality and portfolio breadth are supportive.",
      evidence: "pranilshah4024 — plugin published, BloC app source in private/employer repos.",
    },
    interview: {
      status: "partial",
      note: "Named BloC as primary state management throughout career. Events/states model explained correctly. Provider tree composition and BlocBuilder scoping were not demonstrated to a clean standard in the live exercise. Recommend follow-up probe before final decision.",
    },
    confidence: "medium",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "n/a",
      detail: "Assessed via resume and interview. Multiple backend stacks (Supabase, Firebase, custom REST) across projects.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Stripe, Supabase, Firebase integrations confirmed. AWS stack (Cognito, Lambda, S3) suggests REST integration beyond standard mobile-first patterns.",
      evidence: "Third-party portfolio is the broadest in this batch.",
    },
    interview: {
      status: "confirmed",
      note: "Stripe, Supabase, Firebase confirmed in interview. AWS: Cognito (auth), Lambda (serverless), S3 (storage). Socket.io for real-time. HTTP client patterns confirmed across multiple products.",
    },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via CI/CD setup and interview." },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "GitHub Actions + Firebase App Distribution pipeline confirmed. Plugin published to pub.dev via GitHub workflow.",
      evidence: "pranilshah4024 — CI/CD setup visible through plugin repo.",
    },
    interview: {
      status: "confirmed",
      note: "GitHub Actions + Firebase App Distribution pipeline built and confirmed in interview. Plugin repo maintained on GitHub. PR-based workflow confirmed across employer projects.",
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
    note: "Stripe integration confirmed — suggests payment/checkout flow experience. No explicit social feed or sports-specific commerce described. Baller Corp's social layer will need ramp time. Stripe familiarity reduces payments onboarding friction.",
    risk: "medium",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: true,
    level: "Advanced",
    note: "Firebase App Distribution + GitHub Actions CI/CD pipeline confirmed. Platform channel work in Kotlin+Swift confirms full iOS and Android native build capability. pub.dev plugin demonstrates full-cycle publishing.",
    risk: "low",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: false,
    level: "Not Assessed",
    note: "Not surfaced in live coding or interview. Outage debugging question asked — Aditya noted the response was general rather than methodical. Recommend probing in follow-up conversation.",
    risk: "medium",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase confirmed: App Distribution (CI/CD), backend service usage in prior projects. FCM likely (platform channels for notifications confirmed). Firebase as a data source in multiple apps.",
    risk: "low",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: true,
    level: "Intermediate",
    note: "Socket.io confirmed for real-time features. BLE (Flutter Blue Plus) and MQTT confirm real-time data streaming in IoT context. No GetStream or in-app chat confirmed specifically, but real-time experience spans multiple protocols.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "pub.dev Plugin Author", found: true, evidence: "flutter_device_imei published on pub.dev — Kotlin+Swift native implementation bridged via Flutter platform channels. Confirmed in interview and GitHub." },
  { skill: "Platform Channels (Kotlin+Swift)", found: true, evidence: "Native bridges for push notifications, VoIP/calling, and RTE (real-time events) in both Kotlin (Android) and Swift (iOS). Confirmed in interview." },
  { skill: "Stripe Payments", found: true, evidence: "Stripe confirmed in third-party portfolio. Context suggests client-facing payment integration across multiple products." },
  { skill: "Socket.io (Real-time)", found: true, evidence: "Socket.io confirmed in resume and interview for real-time feature implementation." },
  { skill: "BLE / IoT (Flutter Blue Plus, MQTT)", found: true, evidence: "Flutter Blue Plus (BLE scanning/connection) and MQTT (message broker protocol) confirmed — IoT domain experience unique to this batch." },
  { skill: "AWS Stack (Cognito, Lambda, S3)", found: true, evidence: "AWS Cognito (auth), Lambda (serverless), S3 (file storage) confirmed. Above-typical mobile-dev cloud exposure." },
  { skill: "Observability (PostHog, DataDog)", found: true, evidence: "PostHog (product analytics) and DataDog (APM/monitoring) both confirmed — signals instrumented production apps." },
  { skill: "Redis", found: true, evidence: "Redis confirmed in portfolio — caching or session management context." },
  { skill: "GetStream", found: false, evidence: "Not mentioned. Socket.io used for real-time instead." },
  { skill: "Unit Testing Culture", found: false, evidence: "Only 1 app with unit tests across career. Confirmed in interview." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "BLoC Search with Provider Scoping",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search feature using BLoC. Search box emits events to a BLoC which filters results from a mock service. Show loading and loaded states. Provider must be correctly scoped above the consuming widget.",
    time: "~90 min",
    pastes: "Some",
    refactors: 1,
    proficiency: "Developing",
    verdict: "Events and states were scaffolded correctly — the BloC event/state model is understood. The session extended past the 30-45 minute target due to difficulty placing BlocProvider correctly in the widget tree above the ListView consumer. The approach taken to unblock was using BloC as a state variable — a workaround that bypasses the provider tree rather than a standard BloC composition pattern. The core exercise was eventually completed, but the wiring approach was non-idiomatic.",
    flags: [
      "BloC as state variable: declaring BloC in a State class directly (var _bloc = MyBloc()) rather than via BlocProvider/context.read<T>() is a non-standard pattern — it bypasses the provider tree and works around the intended dependency injection model.",
      "Provider scoping gap: difficulty locating where BlocProvider must sit relative to the consuming BlocBuilder widget. This is the central skill being hired for and warrants a follow-up probe before final decision.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 7.0, "Domain": 8.0, "Comms": 7.5, "Problem Solving": 6.5, "Culture Fit": 7.5 };

const findings = [
  "Pranil brings one of the strongest technical portfolios in this batch — flutter_device_imei plugin published on pub.dev, platform channels in both Kotlin and Swift, and a third-party stack (Stripe, Socket.io, BLE, MQTT, AWS, PostHog, DataDog) that is well above what most senior Flutter developers can point to. These are production-grade signals across multiple domains.",
  "Events and states scaffolding was correct — Pranil understands what BloC is and why it exists. The provider tree composition is where the gap appeared: how BlocProvider is scoped relative to the widgets that consume its state. This is a learnable pattern, but it needs to be confirmed before hire.",
  "Platform channel depth and pub.dev plugin authorship are genuine differentiators. Writing a native bridge in Kotlin and Swift, publishing it, and maintaining it on pub.dev is above what most senior Flutter developers have done. This is the kind of signal that warrants a second conversation rather than a pass.",
  "IoT/real-time breadth (Socket.io, BLE, MQTT) is uncommon in this pool. Baller Corp's real-time features and potential hardware-adjacent use cases would benefit directly from this background.",
  "Outage debugging response was general rather than systematic — more of a high-level explanation than a root-cause investigation approach. Only 1 unit-tested app across 5 years suggests testing hasn't been a daily practice. Both are watch items for a senior hire.",
  "Communication was clear and honest throughout. Platform channel architecture was explained coherently. BloC understanding was articulated correctly at the conceptual level. Not a remote-work risk.",
];

// ─── EDUCATION ───
const edu = {
  institution: "To be confirmed",
  degree: "Engineering / Computer Science",
  tier: "Bachelor's degree (India)",
  score: "Not disclosed",
  location: "India",
  comparable: "Bachelor's degree (US) / BEng (UK)",
  relevance: "5 years of active Flutter development including pub.dev plugin authorship, platform channel implementation in Kotlin+Swift, and multi-domain product work. Degree details not collected at L1 screen.",
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
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>74% confidence</div>
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
        <strong>GitHub — pranilshah4024:</strong> Account verified. flutter_device_imei plugin published on pub.dev — Kotlin+Swift native bridge implementation. Production code quality confirmed via plugin authorship.
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~90 min" badgeColor={c.amber} />
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~90 min · Transcript verified · Technical interviewer: Aditya</div>
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
export default function PranilTalentProfile() {
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
