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
  name: "Abhishek Pal",
  title: "Software Engineer",
  company: "Care Health Insurance",
  location: "Gurugram, India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "2.3 years",
};

const role = {
  company: "Baller Corp",
  title: "Senior Flutter BLoC Developer",
  team: "Mobile Product Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 58,
  bullets: [
    "BLoC conceptual model is solid — events/states scaffolded correctly in the live coding session, debouncing via Future.delayed implemented, and restartable transformer from bloc_concurrency independently identified as the correct tool. The model is understood; the execution took longer than expected due to over-engineering with Dartz Either package.",
    "Method channels standout: Abhishek is one of few candidates in this pool with confirmed native Android (Java) + Flutter hybrid module integration using Flutter Method Channels. Discount Connect and Renewals modules owned end-to-end in production at Care Health Insurance — a non-trivial implementation pattern.",
    "Core gaps: 2.3 years of Flutter total, with real BLoC production ownership only since December 2023 (~15 months). Resume says '3+ years' — the extra year is the learning phase at Aakriti Intelligence where BLoC and Clean Architecture were new. No GitHub profile provided. No app store publishing, social/marketplace, or real-time feature experience.",
    "Live coding takeaway: over-engineered the solution by pulling in Dartz (functional Either/Left/Right) for a straightforward search exercise. Aditya's note: 'if you had kept it simple, I think we could have gotten this in time.' Failure class syntax was forgotten under pressure. UI layer was not completed.",
    "Assessment: not at the senior threshold for this batch. BLoC instincts are present and the method channel work is genuine, but portfolio depth, YOE, and live coding pace are below the Baller Corp bar. Could be a revisit in 12-18 months.",
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
      detail: "Flutter fundamentals present — model class, repository, use case, BLoC wiring all structured correctly. Demonstrated awareness of performance concerns (debouncing, widget rebuild cycles). Did not complete the UI layer.",
      evidence: "~37 min coding session. Over-engineering with Dartz package slowed execution. No UI built.",
    },
    github: { active: false, detail: "No GitHub profile provided or confirmed." },
    interview: {
      status: "confirmed",
      note: "Care Customer App and Instabis in production at Care Health Insurance (thousands of users). Method channels for native Java ↔ Flutter module integration confirmed — Discount Connect and Renewals modules owned end-to-end. App startup time improved 25–30% via widget rebuild optimization and async handling.",
    },
    confidence: "medium",
  },
  {
    skill: "BLoC State Management",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "moderate",
      proficiency: "Developing",
      detail: "Events, states, and BLoC handler scaffolded correctly. Identified need for debouncing and implemented Future.delayed. Independently mentioned bloc_concurrency's restartable transformer as the correct solution for cancelling in-flight events — correct and non-trivial. Did not finish due to over-engineering with Dartz Either pattern.",
      evidence: "Aditya: 'you were using a lot of packages besides bloc. If you had kept it simple, I think we could have gotten this in time.' Forgot failure class syntax.",
    },
    github: { active: false, detail: "No GitHub profile. BLoC usage evidenced via interview and live coding only." },
    interview: {
      status: "confirmed",
      note: "BlocConsumer, BlocBuilder, BlocProvider, MultiBlocProvider all confirmed in production use. Team policy: classical BLoC only, no Cubit. BlocProvider initialization pattern explained correctly. Mentors junior developers on BLoC architecture.",
    },
    confidence: "medium",
  },
  {
    skill: "REST API Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: { status: "n/a", detail: "Assessed via resume and interview." },
    github: { active: false, detail: "No GitHub profile provided." },
    interview: {
      status: "confirmed",
      note: "Secure API integrations with AES + RSA encryption/decryption for sensitive insurance user data — both request and response payloads encrypted. Backend migration handled (PHP → Node.js) with model class revamp. Pattern is production-grade for the insurance domain.",
    },
    confidence: "high",
  },
  {
    skill: "Git & Daily PR Workflow",
    passed: true,
    resume: { sections: ["Skills"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Assessed via resume and interview." },
    github: { active: false, detail: "Git and GitHub listed in skills. No public profile verified." },
    interview: {
      status: "partial",
      note: "Git and GitHub confirmed as tools used. No CI/CD pipeline, branching strategy, or PR workflow discussed in depth during interview.",
    },
    confidence: "low",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social Media / Marketplace Features",
    met: false,
    level: "None",
    note: "All work is in the insurance domain. No social feeds, user-generated content, marketplace transactions, or sports-specific commerce described. This is the most significant domain gap for Baller Corp's product.",
    risk: "high",
  },
  {
    skill: "App Store Publishing (iOS + Android)",
    met: false,
    level: "None",
    note: "No app store publishing, CI/CD pipeline, or build distribution discussed. Resume mentions 'CI/CD basics' and GitHub but no Firebase App Distribution or store release experience confirmed.",
    risk: "high",
  },
  {
    skill: "Performance Optimization & Memory Mgmt",
    met: true,
    level: "Intermediate",
    note: "25–30% app startup time and screen rendering improvement via widget rebuild optimization, async handling, and state management tuning confirmed in resume work output at Care Health Insurance. Debouncing pattern for search also shows performance awareness.",
    risk: "medium",
  },
  {
    skill: "Firebase",
    met: true,
    level: "Beginner",
    note: "Firebase Auth, Firestore, and FCM confirmed at Aakriti Intelligence (first company). Not mentioned in current role. Firebase usage is early-career and limited to a single project — not a strength.",
    risk: "medium",
  },
  {
    skill: "Real-time / Messaging (GetStream, WebSocket)",
    met: false,
    level: "None",
    note: "No WebSocket, Socket.io, GetStream, or real-time data streaming confirmed. Not relevant to the insurance domain where Abhishek has worked.",
    risk: "high",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Method Channels (Android/Java ↔ Flutter)", found: true, evidence: "Native Java + Flutter hybrid integration via Method Channels at Care Health Insurance — Discount Connect and Renewals modules owned end-to-end. One of few candidates in this pool with confirmed method channel production experience." },
  { skill: "AES/RSA Encryption (API Security)", found: true, evidence: "AES + RSA encryption/decryption on API request/response payloads for sensitive insurance data. Implemented at production level." },
  { skill: "Flutter Group Engines", found: true, evidence: "Flutter Group Engines used to integrate Flutter modules into native Android app — enables engine reuse and reduces initialization overhead. Confirmed in resume and interview." },
  { skill: "Clean Architecture", found: true, evidence: "Presentation/domain/data layers with Clean Architecture confirmed at both companies. Mentors juniors on BLoC + Clean Architecture combination." },
  { skill: "bloc_concurrency (Restartable Transformer)", found: true, evidence: "Independently identified restartable transformer from bloc_concurrency as the correct debouncing solution for search events — non-trivial BLoC knowledge beyond the basics." },
  { skill: "Deep Linking", found: true, evidence: "Deep linking and app link handling confirmed at both companies. Edge case handling across Android devices mentioned." },
  { skill: "pub.dev Plugin", found: false, evidence: "No published pub.dev package. No GitHub profile provided." },
  { skill: "Firebase (Production Depth)", found: false, evidence: "Basic Firebase usage at first company only. Not a current-role strength." },
  { skill: "Stripe / Payments", found: false, evidence: "No payment integration confirmed." },
  { skill: "Real-time (Socket.io / GetStream)", found: false, evidence: "No real-time protocol or streaming integration confirmed." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1,
    title: "BLoC Search Feature with Debouncing",
    skill: "Flutter / BLoC",
    tier: "Must-Have",
    prompt: "Build a search feature using BLoC. Model: ID + name. Search box emits events to a BLoC which filters a dummy list via a service class using Future.delayed to simulate API latency. Show loading and loaded states.",
    time: "~37 min (coding only)",
    pastes: "Some",
    refactors: 1,
    proficiency: "Developing",
    verdict: "BLoC events, states, and handler were scaffolded correctly — the conceptual model is intact. Repository interface + implementation, use case class, and BloC wiring were all structured with Clean Architecture layering. Debouncing logic started with Future.delayed and restartable transformer from bloc_concurrency correctly identified as the production solution. Over-engineering with Dartz Either (functional Left/Right pattern) consumed most of the available time — the session ran ~37 minutes without a completed UI. Failure class syntax was forgotten under pressure. Aditya's assessment: 'the time it took is because you were using a lot of packages besides bloc — if you had kept it simple, I think we could have gotten this in time.'",
    flags: [
      "Over-engineering: Dartz Either/Left/Right pattern brought in for a basic search exercise — adds functional programming boilerplate that is not standard BLoC practice and was not required by the prompt.",
      "Incomplete: UI layer was not built. The exercise was explained verbally but not demonstrated running. Failure class syntax forgotten under exam pressure.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 6.5, "Domain": 5.5, "Comms": 7.0, "Problem Solving": 6.5, "Culture Fit": 7.5 };

const findings = [
  "Method channels implementation is the standout: Care Health Insurance's main app is native Java/Android with Flutter modules embedded. Abhishek implemented the native ↔ Flutter bridge for two production modules (Discount Connect, Renewals). This pattern is technically non-trivial and uncommon in this candidate pool.",
  "BLoC conceptual model is present and correctly formed — events/states, provider initialization, BlocConsumer/BlocBuilder, classical BLoC (team policy against Cubit), and bloc_concurrency restartable transformer all surfaced without prompting. The gap is execution speed and tendency to over-engineer.",
  "Live coding revealed the core risk: when under time pressure on an unfamiliar problem structure, Abhishek defaulted to adding complexity (Dartz Either) rather than keeping it simple. This is a pattern risk for a senior role where speed and pragmatic judgment are required day-to-day.",
  "Backend migration handling (PHP → Node.js model class revamp) shows cross-functional awareness and composure under difficult conditions — 'we discussed it and managed it.' This is a positive signal for remote async collaboration.",
  "API versioning / backward compatibility question: Abhishek eventually arrived at the correct approach (keep both backends alive, separate URLs) after prompting, but required multiple rounds of redirects to get there. Senior-level systems thinking was not immediate.",
  "Communication is clear and honest — admitted uncertainty ('I'm not completely sure about this'), did not bluff, and asked for hints directly. This is a positive remote-work signal. YOE is the limiting factor, not attitude or disposition.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Lovely Professional University / Ambedkar Institute (GGSIPU)",
  degree: "MCA (Distance, LPU 2022–2024) + BCA (GGSIPU, 2019–2022)",
  tier: "Bachelor's + Master's (India)",
  score: "Not disclosed",
  location: "Punjab / New Delhi, India",
  comparable: "Bachelor's degree (US) equivalent — BCA is a 3-year CS undergraduate degree",
  relevance: "BCA (3-year CS undergraduate, GGSIPU) is equivalent to a US Bachelor's in Computer Science. MCA (Distance, LPU) is a post-graduate credential in Computer Applications. Academic performance not disclosed.",
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
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.7, marginTop: 1 }}>58% confidence</div>
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
            {["MUST-HAVE", "RESUME", "LIVE CODING", "GITHUB + INTERVIEW", "CONF."].map(h => (
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
      <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: "6px 10px", marginTop: 6, fontSize: 10, color: c.amber.txt }}>
        <strong>GitHub — Not provided:</strong> No public GitHub profile confirmed. BLoC and Flutter depth assessed entirely via resume, live coding session, and interview.
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* SHOULD-HAVES */}
      <Section icon="🟡" title="SHOULD-HAVE ASSESSMENT" badge={`${shouldHaves.filter(s => s.met).length}/${shouldHaves.length} MET`} badgeColor={c.amber} />
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
      <Section icon="⟨/⟩" title="LIVE CODING EVIDENCE" badge="1 prompt · ~37 min" badgeColor={c.amber} />
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="PARTIAL FIT" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~71 min · Transcript verified · Technical interviewer: Aditya</div>
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
          <Section icon="💰" title="COMPENSATION" badge="Below Senior Range" badgeColor={c.amber} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior Flutter BLoC · India Remote)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$25,000 – $30,000 / yr</div>
          {[
            ["Arc.dev (Sr. Flutter, India Remote)", "$25K – $35K", "Vetted senior platform rates"],
            ["Naukri (Flutter, 2–3 YOE, India)", "₹6L–₹12L (~$7K–$14K)", "India market for mid-level"],
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
export default function AbhishekTalentProfile() {
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
