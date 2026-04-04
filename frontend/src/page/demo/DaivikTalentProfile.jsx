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
  name: "Daivik P.",
  title: "Senior Software Engineer – Flutter",
  company: "Skywinds Solution",
  location: "Ahmedabad, Gujarat",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "5+ years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 72,
  bullets: [
    "Flutter breadth is genuinely senior — Adyen Tap-to-Pay via method channels (Kotlin + Swift native bridging), Twilio SDK for healthcare video, and BLE IoT device integration are all production-grade, non-trivial signals.",
    "BLoC is confirmed in production with a clear mental model — correctly separates BLoC (large-scale apps) from GetX (lighter observer patterns). Live coding completed the full task with correct event, state, and BlocBuilder structure.",
    "DTO handling done independently and correctly — parsed JSON first, then wrapped in a model class without prompting. Data modeling instinct is present.",
    "Some architectural patterns in the live coding exercise (layer placement, method naming) would benefit from a stronger code review culture — nothing that stands out as a blocker for a team with established standards.",
    "No GitHub profile provided — all signals are interview and live coding sourced. Team lead ownership confirmed: PR review, sprint management, build creation, and client feedback loop verified.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "BLoC search task completed end-to-end. Method channel depth (Adyen via Kotlin/Swift, Twilio SDK) confirms native integration knowledge well beyond standard Flutter plugins.",
      evidence: "~40 min. Android + iOS + Web builds confirmed. UI experience noted across all projects.",
    },
    github: { active: false },
    interview: { status: "confirmed", note: "5 years Flutter: Adyen NFC Tap-to-Pay (method channels), Twilio video SDK (healthcare), BLE IoT gym equipment, parental control with NFC locking. Android + iOS + one web build." },
    confidence: "medium",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Event and state classes created correctly and independently. BlocBuilder used correctly for UI binding. Filtering logic implemented end-to-end. Some layer placement details were refined mid-session — candidate recognised and adjusted quickly. DI present; constructor injection would be the preferred pattern.",
      evidence: "~40 min. Core BLoC structure solid. Minor architectural refinements expected with more senior code review exposure.",
    },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "Uses BLoC for large-scale apps, GetX for lighter observer/reactive patterns. Understands the trade-off. Production BLoC usage confirmed at Skywinds. GetIt known for dependency injection.",
    },
    confidence: "medium",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Mock service used in coding task. Async patterns correct. DTO created independently — JSON parsed first, then wrapped in a model class. Correct approach without prompting on the data modeling.",
      evidence: "Adyen project architecture (Cloud Functions as webhook receiver → Firestore → Firebase SDK in Flutter + React admin) is strong real-world signal.",
    },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "IoT: BLE events decoded and pushed via Node.js API to cloud. Adyen: payment auth via Cloud Functions webhook. Healthcare: Twilio SDK via method channels. REST + Firebase confirmed across three major projects.",
    },
    confidence: "high",
  },
  {
    skill: "Git & PR Workflow",
    passed: true,
    resume: { sections: ["Skills"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via interview only. No GitHub profile to verify independently." },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "Team lead workflow confirmed: client requirements → sprint tasks → developer assignments → PR review → merge → build → QA → client feedback. CI/CD exposure in one project; pipeline setup was owned by another team.",
    },
    confidence: "medium",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Clean / Modular Architecture",
    met: true,
    level: "Intermediate",
    note: "Knows clean architecture and SOLID principles — references them correctly in context. Live coding showed correct presentation layer; some layer boundaries were adjusted mid-session when flagged. Conceptually solid, execution maturing.",
    risk: "low",
  },
  {
    skill: "SDK / Method Channel Integration",
    met: true,
    level: "Advanced",
    note: "Adyen Tap-to-Pay SDK bridged via method channels in Kotlin (Android) and Swift (iOS) — not a Flutter plugin, fully native. Twilio video SDK also integrated via method channels. BLE connectivity plugin for IoT. Strongest technical signal in the profile.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase used as full backend in Adyen project: Firestore for data storage, Cloud Functions (Node.js) as Adyen webhook receiver, Firebase SDK consumed by both Flutter mobile and React admin. Architecture decision was candidate's own.",
    risk: "low",
  },
  {
    skill: "CI/CD",
    met: false,
    level: "Exposure",
    note: "Fastlane listed on resume. Worked in a project with CI/CD but pipeline was set up by another team — not the owner. No pipeline authored independently.",
    risk: "medium",
  },
  {
    skill: "Social / Marketplace Features",
    met: false,
    level: "Not Confirmed",
    note: "No social, marketplace, or sports commerce context in resume or interview. Ramp time expected on Baller Corp's social layer.",
    risk: "medium",
  },
  {
    skill: "Real-time / Event Streaming",
    met: true,
    level: "Intermediate",
    note: "IoT BLE project: GetX observer pattern used to stream and display live device events from gym equipment. Decoded encoded data from undocumented third-party hardware — real-time handling under constraint.",
    risk: "low",
  },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "BLoC Search Filter",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search view that filters a list of users by name. Use BLoC for state management. Create a mock service that simulates an API call with a Future/delay. Add a DTO for the user object.",
    time: "~40 min",
    proficiency: "Intermediate",
    verdict: "Completed the full task — event and state classes created, BlocBuilder used correctly, filtering logic implemented end-to-end. DTO created independently (JSON first, then wrapped in model). Some architectural choices (layer placement, method naming conventions) were adjusted during the session when discussed — candidate recognised and responded to feedback well. DI was present but not constructor-injected.",
    flags: [
      "Layer placement: some logic adjusted mid-session when discussed — responsive to feedback",
      "Method naming: non-standard convention; not idiomatic Dart style",
      "DI present but not via constructor injection",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 7.5, "Domain": 7.5, "Comms": 7.0, "Problem Solving": 7.0, "Culture Fit": 7.5 };

const findings = [
  "Adyen Tap-to-Pay via native method channels (Kotlin + Swift) is the strongest technical signal — not a plugin, full native SDK bridging, PCI compliance, transaction lifecycle, admin dashboard. Genuine senior-level Flutter work.",
  "Twilio SDK integration in the healthcare app required platform channel bridging — confirms method channel expertise is a consistent pattern across multiple projects, not a one-off.",
  "IoT BLE project demonstrates problem solving under ambiguity: decoded encoded Bluetooth data from undocumented third-party hardware by reverse-engineering message codes from live device output.",
  "BLoC core structure is solid — events, states, and BlocBuilder all implemented correctly and independently. Candidate has a clear mental model of when to use BLoC vs GetX. Some finer architectural details (layer separation, DI style) are areas to mature into — nothing unusual at this experience level.",
  "DTO handling was done correctly and independently — parsed JSON first, then wrapped in a model class without prompting. Positive signal on data modeling instinct.",
  "Team lead workflow is credible and detailed: client requirements, sprint task assignment, PR review, build creation, and QA-to-client feedback loop all confirmed end-to-end.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Parul University",
  degree: "B.Tech in Information Technology",
  years: "2017–2021",
  nirf: "NIRF 151–200 (Engineering, 2024)",
  naac: "NAAC A+",
  location: "Vadodara, Gujarat",
  note: "Private university with NAAC A+ accreditation. No academic score on resume. 5 years of production Flutter work across fintech, IoT, and healthcare is the primary credential.",
};

// ─── COMPENSATION ───
const comp = {
  marketRange: "₹10–18 LPA",
  marketNote: "AmbitionBox: Sr. Flutter Developer, Ahmedabad, 4–6 YOE",
  ctcEstimate: "₹12–15 LPA",
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
const profC = { Beginner: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, "Not Confirmed": c.g, Senior: c.purple, Exposure: c.amber };
const confC = {
  very_high: { label: "VERY HIGH", ...c.green },
  high: { label: "HIGH", ...c.green },
  medium: { label: "MEDIUM", ...c.amber },
  low: { label: "LOW", ...c.red },
};
const riskC = { low: c.green, medium: c.amber, high: c.red };
const mono = "'JetBrains Mono', 'Fira Code', monospace";
const sans = "'Inter', -apple-system, system-ui, sans-serif";

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

function ProfileTab({ mobile }) {
  const mustsPassed = musts.filter(m => m.passed).length;

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px 16px 20px" : "14px 20px 20px" }}>

      {/* RUBRIC BANNER */}
      <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: mobile ? "8px 12px" : "7px 14px", marginBottom: 12, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 4 : 0 }}>
        <span style={{ fontSize: mobile ? 11 : 12, color: c.teal.txt }}>Scored against: <strong>{role.company} — {role.title}</strong> · {role.team}</span>
        <span style={{ fontSize: 10, color: c.g[400] }}>{musts.length} musts · {shouldHaves.length} should-haves · Layer 1 + Layer 3 verified</span>
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
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.7, marginTop: 1 }}>72% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="⚠️" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} badgeColor={c.amber} />
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
            </div>
            {m.liveCoding?.status !== "n/a" && m.liveCoding?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.liveCoding.detail}</div>}
            {m.liveCoding?.status === "n/a" && <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</div>}
            {m.interview?.note && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.interview.note}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "170px 90px 1fr 60px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "LIVE CODING / INTERVIEW", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>
          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "170px 90px 1fr 60px", padding: "7px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}` }}>
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
                    {m.interview?.note && <div style={{ fontSize: 9.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "3px 7px", marginTop: 4, lineHeight: 1.4 }}>{m.interview.note}</div>}
                  </>
                )}
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
              {s.met && <Pill color={profC[s.level]?.txt || c.blue.txt} bg={profC[s.level]?.bg || c.blue.bg}>{s.level}</Pill>}
              {!s.met && <Pill color={c.g[400]} bg={c.g[100]}>Not Confirmed</Pill>}
              <Pill color={riskC[s.risk].txt} bg={riskC[s.risk].bg}>Risk: {s.risk.toUpperCase()}</Pill>
            </div>
            <div style={{ fontSize: 10.5, color: c.g[500], lineHeight: 1.4 }}>{s.note}</div>
          </div>
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* LIVE CODING */}
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~40 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC prompt. VS Code environment. Follow-up verbal Q&A on architecture.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time}</span>
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~69 min · Transcript verified</div>
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
          <div style={{ fontSize: 11.5, color: c.g[500], marginBottom: 8 }}>{edu.degree} · {edu.years}</div>
          {[["NIRF Rank", edu.nirf], ["NAAC Grade", edu.naac], ["Location", edu.location]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500] }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right", maxWidth: 190 }}>{v}</span>
            </div>
          ))}
          <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.blue.txt }}>
            <strong>Note:</strong> {edu.note}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge={comp.withinBudget ? "✓ Within Budget" : "⚠ Review Needed"} badgeColor={comp.withinBudget ? c.green : c.amber} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Sr. Flutter · Ahmedabad · 5 YOE)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{comp.marketRange}</div>
          <div style={{ fontSize: 9.5, color: c.g[400], marginBottom: 10 }}>{comp.marketNote}</div>
          <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 6, padding: "7px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10.5, color: c.g[500] }}>CTC estimate</span>
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, color: c.teal.txt }}>{comp.ctcEstimate}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

export default function DaivikTalentProfile() {
  const mobile = useMobile();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: sans }}>
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
