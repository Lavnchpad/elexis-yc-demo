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

// ─── CANDIDATE DATA ───
const candidate = {
  name: "Rahul Kumar",
  title: "Senior Software Engineer",
  company: "Infosys · Product Engineering Division",
  location: "Bangalore, India",
  source: "Elexis",
  status: "Actively Looking",
  noticePeriod: "30 days",
};

const role = {
  company: "Allervision Tech",
  title: "Senior Full Stack Engineer",
  team: "Platform Engineering",
};

const scores = { rubricFit: 87 };

const recommendation = {
  verdict: "Strong Hire",
  confidence: 87,
  summary:
    "Exceptional full-stack capabilities triangulated across resume, GitHub code analysis, and AI screening interview. Flutter and Python claims are strongly verified — 10 Flutter repos with 280 commits and FastAPI backends handling 30K req/min. Live coding confirms clean architecture patterns and real-world problem solving. Azure experience is solid but not architect-level. AI/ML integration is practical, not theoretical — integrated TensorFlow Lite and cloud inference APIs in production.",
  hiringConsideration:
    "Azure experience is production-level but not architect-level — needs guidance on cost optimization at scale. TDD is the weakest area — writes tests for critical paths but doesn't follow strict TDD methodology. Enterprise-to-startup culture transition is the primary non-technical risk, though resume emphasizes independent ownership.",
};

// ─── MUSTS (knockout) ───
const musts = [
  {
    skill: "Flutter / Dart",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Clean BLoC architecture with proper event/state separation. Widget lifecycle optimization. Production-grade error boundaries.",
      evidence: "16 min. 420 keystrokes, 0 pastes. 1 refactor — upgraded from StatefulWidget to BLoC mid-prompt.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "Cross-platform apps with BLoC pattern. Clean architecture with separate data/domain/presentation layers.",
      evidence: "10 repos, 280 commits. Latest: 3 days ago.",
    },
    interview: { status: "confirmed", note: "Deep knowledge of Flutter state management (BLoC + Riverpod). Built production iOS app with 50K+ users. Strong understanding of widget lifecycle and performance optimization." },
    confidence: "very_high",
  },
  {
    skill: "Python",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Advanced",
      detail: "FastAPI endpoint with async DB calls, proper dependency injection, typed Pydantic models. Clean separation of concerns.",
      evidence: "13 min. 350 keystrokes, 0 pastes. Structured project layout from memory.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "FastAPI + Flask backends with async patterns. Well-structured project layouts, proper dependency management.",
      evidence: "8 repos, 190 commits. Latest: 1 week ago.",
    },
    interview: { status: "confirmed", note: "Built REST APIs handling 30K req/min. Strong understanding of async patterns, decorators, and Python packaging best practices." },
    confidence: "very_high",
  },
  {
    skill: "REST APIs",
    passed: true,
    resume: { sections: ["Skills", "Experience", "Projects"], signal: "strong" },
    liveCoding: {
      status: "strong",
      proficiency: "Intermediate",
      detail: "Versioned API with pagination, cursor-based for large datasets. JWT auth middleware. Typed error responses.",
      evidence: "11 min. Proper HTTP status codes, OpenAPI-compatible response shapes.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "OpenAPI specs in 4 repos. Versioned API design with pagination and error handling.",
      evidence: "6 repos with REST implementations.",
    },
    interview: { status: "confirmed", note: "Designed versioned APIs serving mobile + web clients. Strong opinions on pagination, auth flows, and error handling." },
    confidence: "high",
  },
  {
    skill: "Azure",
    passed: true,
    resume: { sections: ["Skills"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Infrastructure assessed through interview, not coding." },
    github: {
      active: true,
      proficiency: "Developing",
      detail: "Azure Functions + Blob Storage usage. ARM templates for infrastructure-as-code.",
      evidence: "3 repos with Azure integrations.",
    },
    interview: { status: "confirmed", note: "1.5 years production Azure. Managed App Service, Azure Functions, and Cosmos DB. Set up CI/CD pipelines with Azure DevOps." },
    confidence: "medium",
  },
  {
    skill: "MongoDB",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "moderate" },
    liveCoding: {
      status: "moderate",
      proficiency: "Intermediate",
      detail: "Aggregation pipeline for analytics dashboard. Proper indexing strategy. Used Mongoose ODM idiomatically.",
      evidence: "9 min. Knew aggregation stages from memory — $match, $group, $sort, $project.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "Mongoose ODM usage, aggregation pipelines in backend projects.",
      evidence: "5 repos with MongoDB integrations.",
    },
    interview: { status: "confirmed", note: "2 years production MongoDB. Designed schemas for high-throughput user data collection. Experience with indexing strategies and sharding basics." },
    confidence: "high",
  },
  {
    skill: "AI/ML Integration",
    passed: true,
    resume: { sections: ["Experience"], signal: "moderate" },
    liveCoding: { status: "n/a", detail: "Integration capability assessed through interview + GitHub." },
    github: {
      active: true,
      proficiency: "Developing",
      detail: "TensorFlow Lite integration for on-device inference in Flutter app.",
      evidence: "2 repos, 25 commits. Latest: 1 month ago.",
    },
    interview: { status: "confirmed", note: "Integrated on-device ML models in Flutter app for image classification. Familiar with cloud inference APIs (OpenAI, Azure Cognitive Services). Not an ML engineer but can integrate and optimize workflows." },
    confidence: "medium",
  },
];

// ─── EXTRAS ───
const extras = [
  { skill: "iOS Development", found: true, points: 5, max: 5, evidence: "Published 2 apps to App Store. Swift + SwiftUI side projects. 3 repos, 60 commits." },
  { skill: "CI/CD", found: true, points: 4, max: 5, evidence: "GitHub Actions workflows discovered in 7 repos — not listed on resume. Self-taught." },
  { skill: "Docker", found: true, points: 3, max: 4, evidence: "Dockerfiles for Python APIs. Multi-stage builds. Local dev + staging, no production orchestration." },
  { skill: "Test-Driven Development", found: false, points: 2, max: 5, evidence: "pytest in 3 repos, Flutter widget tests. Coverage inconsistent. Not strict TDD — writes tests for critical paths only." },
];

// ─── LIVE CODING ───
const codingPrompts = [
  {
    id: 1, title: "Patient Data BLoC", skill: "Flutter / Dart", tier: "Must-Have",
    prompt: "Build the BLoC for a patient vitals dashboard — events for loading, real-time updates, error states. Support pull-to-refresh and pagination for historical data.",
    time: "16 min", keystrokes: 420, pastes: 0, refactors: 1, proficiency: "Advanced",
    verdict: "Clean BLoC with sealed states. Separate events for initial load, refresh, and real-time stream. Upgraded from StatefulWidget to BLoC mid-prompt — shows architectural maturity.",
    flags: [],
  },
  {
    id: 2, title: "FastAPI Endpoint", skill: "Python + REST APIs", tier: "Must-Have",
    prompt: "Write a FastAPI endpoint for uploading and processing medical images — validate file type, store to Azure Blob, trigger async ML inference, return status with polling URL.",
    time: "13 min", keystrokes: 350, pastes: 0, refactors: 0, proficiency: "Advanced",
    verdict: "Proper async/await with background tasks. Dependency injection for blob client. Typed Pydantic models for request/response. Clean separation of route, service, and storage layers.",
    flags: [],
  },
  {
    id: 3, title: "MongoDB Aggregation", skill: "MongoDB", tier: "Must-Have",
    prompt: "Write an aggregation pipeline for a patient analytics dashboard — group appointments by month, calculate average wait time, filter by doctor specialty. Return formatted for chart display.",
    time: "9 min", keystrokes: 210, pastes: 0, refactors: 0, proficiency: "Intermediate",
    verdict: "Correct pipeline stages from memory — $match, $group, $sort, $project. Used $dateToString for month grouping. Proper index suggestion for the filter field. Minor: didn't handle empty results.",
    flags: ["No empty-result handling — returns empty array instead of default chart data"],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 9, "System Design": 8, "Comms": 9, "Problem Solving": 8, "Culture Fit": 8 };
const findings = [
  "Built and shipped a Flutter app with 50K+ users on iOS — handled full lifecycle from architecture to App Store submission. Uses BLoC pattern for state management.",
  "Strong Python backend experience — built FastAPI services handling 30K req/min with MongoDB. Understands async patterns and connection pooling.",
  "Azure experience is solid but not architect-level — has managed App Service, Functions, and Cosmos DB. Needs guidance on cost optimization at scale.",
  "AI/ML integration experience confirmed — integrated TensorFlow Lite for on-device inference and cloud APIs (OpenAI, Azure Cognitive Services) in production apps.",
  "Available in 30 days. Strong startup mindset — previously worked at a 5-person team, comfortable owning full stack independently.",
];

// ─── EDUCATION ───
const edu = {
  institution: "IIIT Hyderabad",
  degree: "B.Tech Computer Science, 2018",
  tier: "Tier 1 Engineering Institution (India)",
  ranking: "#15 in India for CS (NIRF 2025)",
  acceptance: "~2%",
  comparable: "Georgia Tech, UIUC",
  relevance: "Rubric requires strong CS fundamentals — IIIT-H curriculum covers distributed systems, algorithms, and systems programming at depth.",
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

// ─── ATOMS ───
const mono = "'JetBrains Mono', 'Fira Code', monospace";
const sans = "'Inter', -apple-system, system-ui, sans-serif";

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
  if (!github?.active) return (
    <span style={{ fontSize: 10, color: c.g[400] }}>—</span>
  );
  return (
    <div>
      {github.proficiency && <div style={{ marginBottom: 2 }}><Pill color={profC[github.proficiency]?.txt} bg={profC[github.proficiency]?.bg}>{github.proficiency}</Pill></div>}
      {github.detail && <div style={{ fontSize: 10, color: c.g[500], lineHeight: 1.35 }}>{github.detail}</div>}
    </div>
  );
};

// ─── RESUME TAB CONTENT ───
function ResumeTab({ mobile }) {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13, padding: mobile ? "12px" : "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Rahul Kumar</h1>
          <div style={{ fontSize: 14, color: c.g[500], marginTop: 4 }}>Senior Software Engineer | 6 Years Experience</div>
          <div style={{ fontSize: 12, color: c.g[400], marginTop: 2 }}>Bangalore, India | rahul.k94@gmail.com | +91 98765 43210</div>
        </div>
      </div>

      <Section icon="" title="PROFESSIONAL SUMMARY" />
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: c.g[700], margin: "0 0 16px" }}>
        Senior full-stack engineer with 6 years of experience building cross-platform mobile applications and Python backend services. Expertise in Flutter/Dart, Python (FastAPI/Flask), REST API design, and Azure cloud infrastructure. Built production Flutter app with 50K+ users and backend services handling 30K req/min. Experience with AI/ML integration, MongoDB, and end-to-end product ownership at scale.
      </p>

      <Section icon="" title="EXPERIENCE" />
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4, gap: mobile ? 2 : 0 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Senior Software Engineer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>Infosys — Product Engineering Division</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Mar 2022 — Present · Bangalore</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Architected and built Flutter mobile app serving 50K+ users on iOS — full lifecycle from design to App Store submission</li>
          <li>Built FastAPI backend services handling 30K requests/min with MongoDB, async patterns, and connection pooling</li>
          <li>Managed Azure infrastructure — App Service, Azure Functions, Cosmos DB, and CI/CD pipelines with Azure DevOps</li>
          <li>Integrated TensorFlow Lite for on-device ML inference in Flutter app (image classification)</li>
          <li>Led 5-person team, owned architecture decisions and code review process</li>
        </ul>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", marginBottom: 4, gap: mobile ? 2 : 0 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Software Engineer</div>
            <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>Wipro — Digital Platforms</div>
          </div>
          <span style={{ fontSize: 11, color: c.g[400] }}>Jul 2018 — Feb 2022 · Bangalore</span>
        </div>
        <ul style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8, margin: "4px 0 0 16px", paddingLeft: 0 }}>
          <li>Built Python REST APIs for enterprise SaaS platform — multi-tenant architecture, PostgreSQL</li>
          <li>Developed Flutter cross-platform apps for internal tools — reduced mobile dev cost by 40%</li>
          <li>Set up Docker-based local development and staging environments for backend services</li>
          <li>Progressed from backend-focused Python role to full-stack ownership within 2 years</li>
        </ul>
      </div>

      <Section icon="" title="EDUCATION" />
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>B.Tech Computer Science</div>
        <div style={{ fontSize: 12, color: c.teal.txt, fontWeight: 600 }}>IIIT Hyderabad</div>
        <div style={{ fontSize: 11, color: c.g[400] }}>2014 — 2018 | CGPA: 8.7/10</div>
      </div>

      <Section icon="" title="SKILLS" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {["Flutter", "Dart", "Python", "FastAPI", "Flask", "REST APIs", "Azure", "MongoDB", "Docker", "iOS (Swift)", "BLoC Pattern", "Git", "TensorFlow Lite", "CI/CD"].map(s => (
          <Pill key={s} color={c.g[700]} bg={c.g[100]}>{s}</Pill>
        ))}
      </div>

      <Section icon="" title="CERTIFICATIONS" />
      <div style={{ fontSize: 12, color: c.g[700], lineHeight: 1.8 }}>
        <div>Azure Fundamentals (AZ-900) — Microsoft (2023)</div>
        <div>Google Associate Android Developer (2022)</div>
        <div>MongoDB Developer Certification (2021)</div>
      </div>
    </div>
  );
}

// ─── TALENT PROFILE TAB CONTENT ───
function ProfileTab({ mobile }) {
  const hasGH = musts.some(m => m.github?.active);
  const mustsPassed = musts.filter(m => m.passed).length;
  const extPts = extras.reduce((a, e) => a + e.points, 0);
  const extMax = extras.reduce((a, e) => a + e.max, 0);

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", fontFamily: sans, color: c.g[900], background: "#fff", fontSize: 13 }}>
      <div style={{ padding: mobile ? "14px 16px 20px" : "14px 20px 20px" }}>

        {/* ═══ RUBRIC BANNER ═══ */}
        <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: mobile ? "8px 12px" : "7px 14px", marginBottom: 12, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 4 : 0 }}>
          <span style={{ fontSize: mobile ? 11 : 12, color: c.teal.txt }}>Scored against: <strong>{role.company} — {role.title}</strong> · {role.team}</span>
          <span style={{ fontSize: 10, color: c.g[400] }}>{musts.length} musts · {extras.length} extras · rubric-verified</span>
        </div>

        {/* ═══ CANDIDATE HEADER ═══ */}
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "stretch" : "flex-start", gap: mobile ? 10 : 0, marginBottom: 14 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 19 : 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{candidate.name}</h1>
            <div style={{ fontSize: mobile ? 11.5 : 13, color: c.g[500], marginTop: 2 }}>{candidate.title} @ {candidate.company} · {candidate.location}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
              <Pill color={c.green.txt} bg={c.green.bg}>{candidate.status}</Pill>
              <Pill color={c.g[500]} bg={c.g[100]}>{candidate.noticePeriod}</Pill>
            </div>
          </div>
          <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: "8px 14px", textAlign: mobile ? "left" : "center", minWidth: 75, ...(mobile ? { display: "flex", alignItems: "center", gap: 8 } : {}) }}>
            <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.teal.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
            <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt, lineHeight: 1.3 }}>Strong</div>
          </div>
        </div>

        {/* ═══ RECOMMENDATION ═══ */}
        <Section icon="" title="RECOMMENDATION" badge={recommendation.verdict} />
        <p style={{ fontSize: mobile ? 13 : 12.5, lineHeight: 1.65, color: c.g[700], margin: "0 0 10px" }}>{recommendation.summary}</p>
        <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 6, padding: mobile ? "10px 14px" : "7px 12px", marginBottom: mobile ? 20 : 14 }}>
          <span style={{ fontSize: mobile ? 12 : 11.5, color: c.amber.txt, lineHeight: 1.55 }}><strong>Hiring Consideration:</strong> {recommendation.hiringConsideration}</span>
        </div>

        {/* ═══ MUST-HAVES ═══ */}
        <Section icon="" title="MUST-HAVE VERIFICATION — KNOCKOUT CRITERIA" badge={`${mustsPassed}/${musts.length} PASSED`} badgeColor={mustsPassed === musts.length ? c.green : c.red} />
        <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontFamily: mono, margin: "-4px 0 8px" }}>Any must-have failure = candidate removed. No exceptions.</div>

        {mobile ? (
          /* Mobile: stacked cards with colored left border */
          musts.map((m, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${m.passed ? "#22C55E" : c.red.txt}`, borderRadius: 8, padding: "12px 14px", marginBottom: 8, background: c.g[50], boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>{m.skill}</span>
                <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                {m.resume.sections.length > 0 && <Pill color={m.resume.signal === "strong" ? c.green.txt : c.amber.txt} bg={m.resume.signal === "strong" ? c.green.bg : c.amber.bg}>Resume: {m.resume.signal === "strong" ? "Strong" : "Moderate"}</Pill>}
                {m.liveCoding.proficiency && <Pill color={profC[m.liveCoding.proficiency].txt} bg={profC[m.liveCoding.proficiency].bg}>Code: {m.liveCoding.proficiency}</Pill>}
                {m.github?.proficiency && <Pill color={profC[m.github.proficiency]?.txt} bg={profC[m.github.proficiency]?.bg}>GH: {m.github.proficiency}</Pill>}
              </div>
              {m.liveCoding.status !== "n/a" && m.liveCoding.detail && (
                <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45 }}>{m.liveCoding.detail}</div>
              )}
              {m.liveCoding.status === "n/a" && (
                <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.liveCoding.detail}</div>
              )}
            </div>
          ))
        ) : (
          <>
          {/* Desktop: table */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 90px 1fr 1fr 70px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "LIVE CODING", "GITHUB", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>

          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 90px 1fr 1fr 70px", padding: "7px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}` }}>
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
                      <span style={{ fontSize: 10, fontWeight: 700, color: m.liveCoding.status === "strong" ? c.green.txt : c.amber.txt }}>
                        {m.liveCoding.status === "strong" ? "✓" : "~"}
                      </span>
                      {m.liveCoding.proficiency && <Pill color={profC[m.liveCoding.proficiency].txt} bg={profC[m.liveCoding.proficiency].bg}>{m.liveCoding.proficiency}</Pill>}
                    </div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.liveCoding.detail}</div>
                  </>
                )}
              </div>
              <GH github={m.github} />
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
          </>
        )}

        <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>AI Interview details per skill are in the Screening section below.</div>
        <div style={{ height: mobile ? 20 : 14 }} />

        {/* ═══ EXTRAS ═══ */}
        <Section icon="" title="BONUS SKILLS DETECTED" />
        <div style={{ fontSize: 12, color: c.g[700], lineHeight: 1.6, marginBottom: mobile ? 20 : 14 }}>
          {extras.filter(e => e.found).map(e => e.skill).join(", ")} verified across resume, GitHub, and live coding. Notable: {extras.filter(e => e.found).map(e => e.evidence.split(".")[0]).join(". ")}.
        </div>

        {/* ═══ LIVE CODING EVIDENCE ═══ */}
        <Section icon="" title="LIVE CODING EVIDENCE" badge="3 prompts · 38 min" badgeColor={c.teal} />
        <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific prompts from client intake. Async. Keystrokes captured.</div>

        <div style={{ height: mobile ? 4 : 0 }} />
        {codingPrompts.map(p => (
          <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: mobile ? 8 : 6 }}>
            <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>{p.title}</span>
                <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
                <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
              </div>
              <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.keystrokes} keystrokes · {p.pastes} pastes</span>
            </div>
            <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55 }}>{p.verdict}</div>
            {p.flags.length > 0 && p.flags.map((f, j) => (
              <div key={j} style={{ fontSize: mobile ? 11 : 10, color: c.amber.txt, background: c.amber.bg, padding: "4px 10px", borderRadius: 4, marginTop: 6 }}>Flag: {f}</div>
            ))}
          </div>
        ))}
        <div style={{ height: 14 }} />

        {/* ═══ AI INTERVIEW ═══ */}
        <Section icon="" title="AI SCREENING INTERVIEW" badge="STRONG FIT" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 6, marginBottom: mobile ? 14 : 10, background: mobile ? c.g[50] : "transparent", borderRadius: 8, padding: mobile ? "12px 8px" : 0 }}>
          {Object.entries(interviewScores).map(([area, val]) => {
            const label = val >= 9 ? "Excellent" : val >= 8 ? "Strong" : val >= 7 ? "Good" : "Developing";
            const color = val >= 8 ? c.teal.acc : val >= 7 ? c.amber.txt : c.red.txt;
            return (
            <div key={area} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: c.g[500], marginBottom: 1 }}>{area}</div>
              <div style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color }}>{label}</div>
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
        <div style={{ height: 14 }} />

        {/* ═══ BOTTOM: Edu + Comp ═══ */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          {/* Education */}
          <div>
            <Section icon="" title="EDUCATION CONTEXT" />
            <div style={{ fontSize: 15, fontWeight: 700 }}>{edu.institution}</div>
            <div style={{ fontSize: 11.5, color: c.g[500], marginBottom: 8 }}>{edu.degree}</div>
            {[["Classification", edu.tier], ["Ranking", edu.ranking], ["Acceptance", edu.acceptance], ["US Comparable", edu.comparable]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
                <span style={{ fontSize: 11, color: c.g[500] }}>{l}</span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ background: c.teal.bg, borderRadius: 6, padding: "5px 10px", marginTop: 8, fontSize: 10.5, color: c.teal.txt }}>
              <strong>Rubric relevance:</strong> {edu.relevance}
            </div>
          </div>

          {/* Compensation */}
          <div>
            <Section icon="" title="COMPENSATION" badge="Within Budget" />
            <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Remote India)</div>
            <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$25,000 - $30,000</div>
            {[["Levels.fyi (Sr. Full Stack, India)", "$27K", "Median for similar role/YOE"], ["Arc.dev (Remote India)", "$25-30K", "Platform rates"], ["Candidate expectation", "$26-28K", "Stated in screening"]].map(([s, v, n]) => (
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
                <span style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>$25-30K</span>
              </div>
              <div style={{ borderTop: `1px solid ${c.teal.brd}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Likely accepts at</span>
                <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>$26-28K</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 14 }} />

        {/* ═══ FOOTER ═══ */}
        <div style={{ textAlign: "center", padding: "14px 0 6px", marginTop: 14, borderTop: `1px solid ${c.g[200]}` }}>
          <div style={{ fontSize: 10, color: c.g[400] }}>
            Elexis AI · Verified: Resume + Live Coding{hasGH ? " + GitHub" : ""} + AI Screening
          </div>
          <div style={{ fontSize: 9, color: c.g[300], marginTop: 2 }}>
            {codingPrompts.length} role-specific coding challenges · Rubric-matched verification
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE WITH TABS ───
export default function DemoTalentProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const hasGH = musts.some(m => m.github?.active);
  const mobile = useMobile();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: sans }}>
      {/* ═══ HEADER BAR ═══ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderBottom: `1px solid ${c.g[200]}`, position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, color: c.teal.acc }}>/</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>ELEXIS</span>
          <span style={{ color: c.g[300], margin: "0 3px" }}>|</span>
          <span style={{ fontSize: 11, color: c.g[400] }}>Talent Intelligence Profile</span>
        </div>
        {!mobile && <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[["Resume", true], ["Live Code", true], ["GitHub", hasGH], ["AI Interview", true]].map(([label, on]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Dot on={on} />
              <span style={{ fontSize: 9, fontFamily: mono, color: on ? c.g[700] : c.g[400] }}>{label}</span>
            </div>
          ))}
        </div>}
      </div>

      {/* ═══ TAB BAR ═══ */}
      <div style={{ display: "flex", justifyContent: "center", gap: 0, borderBottom: `1px solid ${c.g[200]}`, background: c.g[50] }}>
        {[["profile", "Talent Profile"], ["resume", "Resume"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "10px 32px",
              fontSize: 13,
              fontWeight: activeTab === key ? 700 : 500,
              fontFamily: sans,
              color: activeTab === key ? c.teal.acc : c.g[400],
              background: "transparent",
              border: "none",
              borderBottom: activeTab === key ? `2px solid ${c.teal.acc}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══ TAB CONTENT ═══ */}
      {activeTab === "profile" ? <ProfileTab mobile={mobile} /> : <ResumeTab mobile={mobile} />}
    </div>
  );
}
