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
  name: "Aman B.",
  title: "Principal Engineer",
  company: "Human Powered Health",
  location: "Gurgaon, India",
  github: "Not listed",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "8+ years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 60,
  bullets: [
    "Live coding is a hard stop on an otherwise impressive profile. Couldn't complete the same employee search prompt that other candidates in this batch finished. Event class naming errors and confusion in own code indicate BLoC fluency is architectural and theoretical — not hands-on daily.",
    "Verbal session was among the strongest in depth: introduced BLoC at Human Powered Health (replaced GetX, unified web + Android + iOS into a single Flutter codebase), used Pigeon library for Apple Health data bridging, built BFF layer, CodeMagic CI/CD. All verified, all genuine.",
    "Primary risk confirmed: the 3-year AOSP detour at OLA suspended daily Flutter BLoC practice, and re-introduction at HPH was at architect/lead level, not individual contributor coding level. Circled in logic he wrote himself — not a knowledge gap, a fluency gap.",
    "5/5 should-haves met — strongest non-BLoC profile in this batch. Social apps (CREEK networking, Metyet dating with WebSocket), iOS + Android publishing, performance work with metrics, Firebase, real-time chat. The breadth is real.",
    "Salary ₹22L–₹24L (~$26.4K–$28.8K) is within client budget. Financial fit is not an issue.",
    "Right candidate, wrong role. Would excel as a mobile tech lead or mobile architect. As a specialist BLoC developer IC, the live coding assessment disqualifies.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Summary", "Experience", "Skills"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Understood Flutter project structure, created data class and started UI scaffolding. Architecture vocabulary was correct throughout.",
      evidence: "Did not complete assignment. Structural knowledge present; execution under pressure inconsistent.",
    },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "Led iOS + Android + Web Flutter codebase at Human Powered Health. Introduced Flutter to team that was previously on React (web) and older Android/iOS. 8+ years mobile total.",
    },
    confidence: "medium",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Architectures", "Summary"], signal: "moderate" },
    liveCoding: {
      status: "weak",
      proficiency: "Developing",
      detail: "Knew the components needed (event, state, BLoC class, provider). Event classes missing 'Event' suffix — basic naming convention error. Circled in logic and couldn't complete wiring.",
      evidence: "Could not complete employee search assignment. Aditya's note: 'circling around in logic written by themselves, unnecessary widgets and states.'",
    },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "Introduced BLoC at HPH — replaced GetX, architected migration across 3 platforms. Observer pattern and separation of concerns explained correctly. Acknowledged BLoC is recent relative to total career (2–3 years).",
    },
    confidence: "low",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Experience", "Skills"], signal: "strong" },
    liveCoding: { status: "n/a", detail: "Not the focus of the coding prompt." },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "BFF layer built at HPH — pulled and shaped API data for front end. 15+ API integrations at Story Digital. Apple Health pull via Pigeon + WorkoutKit hooks. Postman listed in tools.",
    },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Experience", "Skills"], signal: "strong" },
    liveCoding: { status: "n/a", detail: "Assessed via interview." },
    github: { active: false },
    interview: {
      status: "confirmed",
      note: "CI/CD pipeline with 2-reviewer approval + SonarQube gate (20% → 80% coverage) + feature flags + automated rollback. GitHub Actions confirmed. Bi-weekly code reviews. Jenkins at OLA.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social Media / Marketplace Features",
    met: true,
    level: "Advanced",
    note: "CREEK: co-founded networking startup (15–20K users, 5+ iterations). Metyet: dating platform with WebSocket chat and matchmaking. Cricuru: cricket coaching app with live scores (200K+ users). Most social product breadth in this batch.",
    risk: "low",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: true,
    level: "Advanced",
    note: "'15+ production deployments, 100% success across Android/iOS/Web' at CREEK. Current role: cross-platform iOS + Android + Flutter. OLA: Google Play Store. Story Digital: 7+ apps including 100K+ download titles.",
    risk: "low",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: true,
    level: "Advanced",
    note: "System latency -30% via kernel optimization at OLA. APK size -30% (ProGuard). 98.5% BLE connection stability. Removed background service at HPH, replaced with WorkoutKit observer hooks — memory and process load improvement. New Relic in tools.",
    risk: "low",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Intermediate",
    note: "Firebase Analytics confirmed at Story Digital. Firebase in tools. FCM implied. Not the primary integration at current or OLA roles.",
    risk: "low",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: true,
    level: "Advanced",
    note: "Metyet dating platform: 'WebSocket-based chat and matchmaking' — production WebSocket implementation confirmed. Real-time telematics at OLA (TPMS alerts). Not GetStream specifically, but real-time event-driven architecture is deeply verified.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "CI/CD", found: true, evidence: "CodeMagic (Flutter) at HPH — 2-reviewer approval + SonarQube gate + feature flags + automated rollback. GitHub Actions CI/CD cutting release cycles from 4 weeks to 1 week at CREEK. Jenkins at OLA." },
  { skill: "Clean Architecture", found: true, evidence: "Listed in Architectures ('Clean Architecture, MVVM, Modular Design'). 'Modular architecture improving code reuse by 40%' at Story Digital. BLoC introduction at HPH required architectural restructuring." },
  { skill: "Native Platform Channels", found: true, evidence: "Pigeon library used for Apple Health → Flutter data bridge at HPH (correct tool: WorkoutKit observer hooks don't map to standard method channels). BLE stack (BLE 5.0) implementation at OLA — device-level native work. Confirmed in interview." },
  { skill: "Payment Gateways (Razorpay)", found: true, evidence: "'Integrated Razorpay SDK for location/payment features' at Story Digital — production." },
  { skill: "Google Maps / Geolocation", found: true, evidence: "'Integrated Google Maps API' at Story Digital — production." },
  { skill: "Stream Chat SDK", found: false, evidence: "WebSocket-based chat built directly (Metyet). No Stream SDK mentioned." },
  { skill: "Fintech Domain", found: false, evidence: "Not detected. Payment gateway integration present but no fintech product context." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "Employee Search with BLoC",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search feature using BLoC. Search box emits events to a BLoC which filters results from a delayed mock service. Show loading and loaded states. No UI polish required.",
    time: "~30 min (incomplete)",
    pastes: "Some",
    refactors: 0,
    proficiency: "Developing",
    verdict: "Started in Android Studio (system hang), transitioned to Dartpad. Correctly identified the components needed: employee data class, event class, state class, BLoC class, provider, UI with text field. Event class created without 'Event' suffix — basic BLoC naming convention missed. Got confused navigating logic he wrote himself. Added unnecessary widgets and states that complicated the wiring. Did not complete event-to-BLoC connection or UI rendering.",
    flags: [
      "Could not complete assignment. Same prompt completed by other candidates in this batch within 60 minutes.",
      "Event class naming convention error (missing 'Event' suffix) — indicates BLoC practice is not at daily-fluency level despite being introduced architecturally.",
      "Circled in own logic with unnecessary widgets and states — confusion in code he wrote himself suggests execution gap, not conceptual gap.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 8.0, "Domain": 6.5, "Comms": 8.5, "Problem Solving": 5.5, "Culture Fit": 7.0 };

const findings = [
  "Introduced BLoC at Human Powered Health — replaced GetX and unified a fragmented codebase (React web + native Android/iOS) into a single Flutter BLoC architecture. This is architect-level ownership, not developer usage.",
  "Live coding disqualifies at specialist IC level. Could not complete the employee search prompt — the same assignment finished by other candidates in this batch. Event naming error and circling in own logic confirm that BLoC fluency is architectural/theoretical, not hands-on daily.",
  "Pigeon library for Apple Health → Flutter bridge was the strongest unprompted technical answer in any session this batch. Correctly explained why standard method channels don't work for WorkoutKit observer hooks, and chose the right tool. Above-baseline iOS native depth.",
  "3-year AOSP period at OLA explains the gap: kernel optimization, BLE stacks, chipset customization. Genuinely deep engineering — but not Flutter BLoC. The re-introduction of BLoC at HPH was at lead/architect level, not IC coding level.",
  "Communication and English are confident and structured. Not a concern for remote async work. Storytelling is clear, self-aware about what the role requires. Acknowledged BLoC recency honestly.",
  "Profile fits mobile tech lead or mobile architect better than specialist BLoC IC. Breadth across AOSP, health tech, BLE, CI/CD, native bridges, multi-platform Flutter is rare — but this role requires BLoC depth, not platform breadth.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Guru Gobind Singh Indraprastha University",
  degree: "B.Tech in Electrical & Electronics Engineering, Aug 2017",
  tier: "4-year B.Tech (Electrical & Electronics Engineering)",
  score: "Not listed",
  location: "Delhi, India",
  comparable: "Bachelor of Engineering (US) / BEng (UK)",
  relevance: "Non-CS discipline (EE), offset by 8+ years of mobile engineering at scale. Entered Android development at Extra Classes in 2018. Career trajectory is engineer-first from graduation.",
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} mobile</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.amber.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.amber.txt, lineHeight: 1.2, marginTop: 2 }}>Partial Fit</div>
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.7, marginTop: 1 }}>60% confidence</div>
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
            {["MUST-HAVE", "RESUME", "LIVE CODING", "INTERVIEW", "CONF."].map(h => (
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
                      <span style={{ fontSize: 10, fontWeight: 700, color: m.liveCoding?.status === "strong" ? c.green.txt : m.liveCoding?.status === "moderate" ? c.blue.txt : c.amber.txt }}>
                        {m.liveCoding?.status === "strong" ? "✓" : m.liveCoding?.status === "moderate" ? "~" : "⚠"}
                      </span>
                      {m.liveCoding?.proficiency && <Pill color={profC[m.liveCoding.proficiency]?.txt} bg={profC[m.liveCoding.proficiency]?.bg}>{m.liveCoding.proficiency}</Pill>}
                    </div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.liveCoding?.detail}</div>
                    {m.liveCoding?.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.liveCoding.evidence}</div>}
                  </>
                )}
              </div>
              <div>
                {m.interview?.note ? (
                  <div style={{ fontSize: 9.5, color: c.g[600], lineHeight: 1.35 }}>{m.interview.note}</div>
                ) : <span style={{ fontSize: 10, color: c.g[400] }}>—</span>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: "6px 10px", marginTop: 6, fontSize: 10, color: c.amber.txt }}>
        <strong>GitHub — Not listed on resume.</strong> No public portfolio URL provided. L2 signal is resume-only. For a principal-level candidate, absence of a public GitHub is a mild signal.
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* SHOULD-HAVES */}
      <Section icon="🟡" title="SHOULD-HAVE ASSESSMENT" badge={`${shouldHaves.filter(s => s.met).length}/${shouldHaves.length} MET`} badgeColor={c.teal} />
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · incomplete" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific BLoC architecture prompt. Started in Android Studio, transitioned to Dartpad.</div>
      {codingPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Prompt {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.red.txt, fontWeight: 700 }}>{p.time}</span>
          </div>
          <div style={{ fontSize: 11, color: c.g[400], marginBottom: 5, fontStyle: "italic" }}>"{p.prompt}"</div>
          <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55 }}>{p.verdict}</div>
          {p.flags.map((f, j) => (
            <div key={j} style={{ fontSize: mobile ? 11 : 10, color: c.red.txt, background: c.red.bg, padding: "4px 10px", borderRadius: 4, marginTop: 6 }}>⛔ {f}</div>
          ))}
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* INTERVIEW */}
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="PARTIAL FIT" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~30 min verbal · Transcript verified</div>
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
          <Section icon="💰" title="COMPENSATION" badge="✓ Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $28,000 / yr</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted platform rates"],
            ["Naukri (Flutter, 5–8 YOE, India)", "₹20L–₹35L (~$24K–$42K)", "India market for principals"],
            ["Candidate expectation", "₹22L–₹24L (~$26.4K–$28.8K)", "Stated to recruiter"],
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
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Expectation vs budget</span>
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, color: c.teal.txt }}>Within range</span>
            </div>
          </div>
          <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: "5px 10px", marginTop: 6, fontSize: 10.5, color: c.amber.txt }}>
            Budget fit is not the disqualifier. BLoC coding fluency is.
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function AmanTalentProfile() {
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
