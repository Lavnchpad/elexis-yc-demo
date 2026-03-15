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
  name: "Sourabh Bucha",
  title: "Software Development Engineer II",
  company: "KISSHT",
  location: "Delhi, India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "4 years",
};

const role = {
  company: "US-Based Company",
  title: "Senior Node.js Developer",
  team: "Backend Engineering Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 82,
  bullets: [
    "Node.js + TypeScript confirmed across all employers — TypeScript listed as primary programming language, referenced naturally during PR review with correct typing instincts (payload DTOs, return types, entity interfaces). Full-stack capacity (React.js, Next.js alongside Node.js) is additive for the role, not a gap.",
    "Strongest social + marketplace signal in the batch: Bud-e social media platform (15k+ users, personalized feeds, social graph) and MyAuctions (multi-seller global auction marketplace scaled from Japan → Hong Kong → USA, 2,400+ peak concurrent users) — two distinct social/marketplace contexts confirmed in interview with specifics.",
    "Real-time at the most demanding scale in the batch: Kafka + Zookeeper N+3 replication for MyAuctions bidding (2,400+ concurrent users, <500ms bid latency). Also designed real-time video conferencing platform (100ms SDK, 100+ concurrent). Event-driven architecture proven under high-stakes financial conditions.",
    "Deepest architectural PR review in the batch — independently raised clean architecture, DDD patterns (entity factory, repository, domain layer), dependency injection, distributed request tracing, and Redis for in-memory cache replacement. Senior-level architectural instincts, not just surface-level code review.",
    "LLM/RAG experience at Sysquare (Bud-e LLM: custom RAG pipelines, Vector DB, model fine-tuning, 10k+ monthly queries) and New Relic APM in production (Stride K12 project) — two signals that no other candidate in the Node.js batch has shown.",
    "Flag: 4 YOE is at the low end of the senior threshold. KISSHT tenure is ~9 months (joined Jun 2025) — first switch after 3+ years at Sysquare, not a pattern. Confirm CTC before presenting — at SDE II in Mumbai fintech, expectation may be at or above ₹22 LPA ceiling.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Node.js + TypeScript",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "PR review confirmed TypeScript understanding throughout — flagged missing return types on class methods, payload DTO interface for request body, TypeScript type annotation on charge response before accessing .id. Referred to the code as TypeScript naturally and reviewed it through a typed-language lens.",
    },
    interview: {
      status: "confirmed",
      note: "TypeScript listed as primary programming language. Node.js confirmed across all projects at Sysquare and KISSHT. Express.js + Node.js is primary backend stack. TypeScript usage confirmed in code review instincts — not just a skills-list claim.",
    },
    confidence: "high",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "PR review flagged consistent response structure (DTO pattern), user ID from token header not request body, and total amount from server not client — all correct REST API security and contract design principles. REST API instincts are strong.",
    },
    interview: {
      status: "confirmed",
      note: "RESTful APIs confirmed across multiple projects. GraphQL listed in skills alongside REST in resume. Primary production pattern is REST; GraphQL not explicitly confirmed in a live project during interview.",
    },
    confidence: "high",
  },
  {
    skill: "Scalable Architecture",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Independently raised clean architecture layering (controller → use case → domain → repository), dependency injection, entity factory pattern, Redis for in-memory cache replacement, and request tracing ID for distributed debugging. Most architecturally complete PR review in the batch.",
    },
    interview: {
      status: "confirmed",
      note: "Kafka + Zookeeper N+3 replication for MyAuctions (2,400+ concurrent users). Modular platform framework at KISSHT (LAP). Microservices conversion at Sysquare (Monytor: Java → Node.js microservices, event-driven). Architecture ownership confirmed across multiple contexts at scale.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social / Marketplace Backend",
    met: true,
    level: "Advanced",
    note: "Two distinct contexts confirmed: Bud-e social media platform (15k+ users, personalized feeds, social graph, FCM push, Next.js SSR) and MyAuctions (multi-seller marketplace with subdomain-per-seller, global scaling Japan → Hong Kong → USA, 2,400+ concurrent bidders). Both confirmed in interview with concrete scale numbers. Best social/marketplace signal in the Node.js batch.",
    risk: "low",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Advanced",
    note: "Kafka + Zookeeper N+3 replication at MyAuctions for millisecond-accurate bid ordering under thousands of concurrent bids — confirmed in interview with architecture rationale (zookeeper for N+3 scalability, three replicas). WebSocket for live bid updates (<500ms latency). 100ms SDK for video conferencing (100+ concurrent users). Event-driven architecture in skills confirmed in practice.",
    risk: "low",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Intermediate",
    note: "RBAC + audit logging implemented on WhoosiT QR platform (reducing unauthorized entries by 90%). Security instincts confirmed in PR review — independently flagged user ID from token not body, and total amount should come from server not frontend (prevents price manipulation). Role-based access control pattern applied across multiple projects.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS)",
    met: true,
    level: "Intermediate",
    note: "EC2, S3, Lambda, SES, RDS, DynamoDB confirmed in resume across projects. Serverless architecture (Lambda) for workflows and scraping pipelines. New Relic APM integrated on Stride K12 (production observability confirmed). AWS as deployment and infrastructure layer across all three employers.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Intermediate",
    note: "Docker and Docker Swarm confirmed in skills. CI/CD pipelines confirmed at Inventive Minds and Sysquare. Jenkins + Kubernetes confirmed in interview for both Stride K12 and Buddy projects — developer-level K8s, not just DevOps usage. GitLab CI/CD in skills.",
    risk: "low",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Advanced",
    note: "100ms (real-time video), Branch.io (deep linking), Firebase Cloud Messaging, New Relic (APM), Snowflake (analytics), LTI (LMS integration), Webhooks (Monytor fraud monitoring), Vector DB + RAG pipeline (Bud-e LLM). One of the broadest third-party API portfolios in the batch — spans real-time, payments, analytics, AI/ML, and enterprise integrations.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Kafka + Zookeeper", found: true, evidence: "Kafka with Zookeeper N+3 replication for MyAuctions real-time bidding platform (2,400+ concurrent users, millisecond bid ordering). Confirmed in interview with architectural rationale." },
  { skill: "LLM / RAG Pipelines", found: true, evidence: "Designed and deployed custom RAG pipelines + Vector Databases at Sysquare (Bud-e LLM) — 30% query relevance improvement, 10k+ monthly queries. Led model fine-tuning and scalable inference pipelines. Rare in this batch." },
  { skill: "New Relic APM", found: true, evidence: "New Relic observability integrated in production at Sysquare (Stride K12). Error alerting, Lambda spike detection, migration logging. Fills the observability gap other batch candidates have." },
  { skill: "React.js / Next.js (Full-stack)", found: true, evidence: "Full-stack capacity confirmed across all employers — Next.js SSR, Redux, responsive web. Additive capability for a backend role." },
  { skill: "WebSocket", found: true, evidence: "WebSocket for real-time bid updates in MyAuctions. Confirmed in interview as the first layer before Kafka for live bid registration." },
  { skill: "Docker + Kubernetes", found: true, evidence: "Docker and Docker Swarm in skills. Jenkins + Kubernetes confirmed in interview for Stride K12 and Buddy deployments." },
  { skill: "DynamoDB + Snowflake", found: true, evidence: "DynamoDB for data persistence (Stride K12). Snowflake for analytics and data warehousing. Broader database portfolio than most backend candidates." },
  { skill: "GraphQL", found: false, evidence: "Listed in resume skills under Backend & API Development. Not explicitly confirmed in a live production project during interview — claimed skill, not yet verified in practice." },
  { skill: "Redis / Caching", found: false, evidence: "Identified Redis as the correct solution for in-memory session cache replacement during PR review — but no confirmed production Redis usage in projects." },
  { skill: "Stripe (Payments)", found: false, evidence: "No Stripe integration mentioned. Payment domain handled via banking APIs (Monytor) and auction platform logic, not Stripe specifically." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification dispatch. Junior developer's code. Candidate reviewed live via shared screen during interview.",
  time: "~25 min",
  proficiency: "Intermediate",
  verdict: "Most architecturally complete review in the batch. Went well beyond surface issues to independently raise clean architecture layering (controller → use case → domain → repository), DDD entity factory pattern, dependency injection, and distributed request tracing — all without prompting. Security instincts were sharp: flagged user ID from token not body, and amount from server not client. Primary miss: Stripe charge reversal on DB failure (the key financial risk scenario) — acknowledged rollback conceptually but did not specifically identify 'if order creation fails after charge succeeds, reverse the Stripe charge.' Communication was detailed and architectural throughout.",
  caught: [
    "Missing null check — validate user exists before proceeding",
    "Input validation — TypeScript DTO for request payload with required field checks",
    "Stripe response validation — check if charge actually processed before creating order",
    "Notifications and analytics are non-blocking — remove await, fire-and-forget",
    "Consistent response DTO — structured response object, not raw string or variable format",
    "Stripe should be a separate injectable service — payment gateway not part of order service",
    "Constants file — hardcoded values (currency, defaults) belong in a shared constants layer",
    "userSessionCache belongs in Redis — in-memory cache breaks on restart and horizontal scaling",
    "user ID from token/headers — never accept user identity from request body (security)",
    "Total amount from server/DB — client-supplied amounts can be manipulated (security)",
    "Request tracing ID — generate and propagate request ID through all service layers for debugging",
    "Clean architecture / DDD — controller → use case → domain → repository with DI container",
    "Entity factory pattern — order creation should go through an OrderFactory, not direct object construction",
    "Analytics failure tracking — track both success and failure events, not just happy path",
    "API timing metrics — measure request duration at controller level or via middleware wrapper",
  ],
  missed: [
    "Stripe charge reversal on DB failure — if charge succeeds but order creation fails, the Stripe charge must be reversed (mentioned handling Stripe errors conceptually and transaction rollback separately, but did not connect them to this specific financial risk scenario)",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 8.5,
  "Domain": 8.0,
  "Communication": 7.5,
  "Problem Solving": 8.0,
  "Culture Fit": 8.0,
};

const findings = [
  "Node.js + TypeScript confirmed across all roles. TypeScript listed as primary language on resume; referenced correctly in PR review (payload typing, return types, entity interfaces). Express.js + Node.js is the confirmed primary backend stack across 4 years.",
  "Social + Marketplace is the strongest in the batch: Bud-e social platform (15k+ users, personalized feeds, social graph, Next.js SSR) and MyAuctions global auction marketplace (multi-seller, subdomain per seller, scaled from Japan → Hong Kong → USA, 2,400+ concurrent users). Both confirmed in interview with project specifics.",
  "Real-time at the highest load in the batch: Kafka + Zookeeper N+3 for MyAuctions bidding (millisecond bid ordering under thousands of concurrent bids). WebSocket for live bid updates. 100ms SDK for video conferencing. Event-driven architecture proven under financial-stakes conditions.",
  "Architecturally the deepest PR review in the batch. Independently identified DDD entity factory, clean architecture layering, dependency injection, and distributed request tracing without prompting. Shows senior-level architectural instincts beyond what the PR prompt was designed to surface.",
  "LLM/RAG experience at Sysquare (Bud-e LLM project): custom RAG pipelines, Vector Databases, model fine-tuning, 10k+ monthly queries. Also integrated New Relic APM in production (Stride K12). Two signals unique to this candidate in the Node.js batch.",
  "Full-stack capacity: React.js, Next.js alongside Node.js. Not a pure backend profile — but 3+ years of backend ownership across Node.js projects is the primary signal. Frontend breadth is additive.",
  "GraphQL is in resume skills. Not confirmed in a live production project during interview — should verify in next conversation if GraphQL production experience exists or is aspirational.",
  "Flag: 4 YOE at the low end of the senior bar. KISSHT tenure is ~9 months — first switch after 3.25 years at Sysquare. Not a job-hopping pattern. CTC must be confirmed before presenting — SDE II at Mumbai fintech likely expects ₹20–28 LPA, which may exceed the ₹22 LPA ceiling.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Maharaja Agrasen Institute of Technology",
  degree: "B.Tech — Information Technology, June 2024",
  location: "Delhi, India",
  usEquivalent: "Bachelor of Technology in IT (4-year) — equivalent to a US BS CS/IT degree",
  relevance: "Graduated June 2024 with 91.6% GPA while working full-time at Sysquare since Jan 2022. Parallel work-study trajectory — academic credential validates fundamentals while practical experience ran concurrently.",
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
const profC = { None: c.red, Developing: c.amber, Intermediate: c.blue, Advanced: c.green, Senior: c.purple };
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} Node.js</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.blue.bg, border: `1px solid ${c.blue.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.blue.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.blue.txt, lineHeight: 1.2, marginTop: 2 }}>Good Fit</div>
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>82% confidence</div>
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
              <Pill color={m.prReview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.prReview?.status === "confirmed" ? c.green.bg : c.amber.bg}>PR Review: {m.prReview?.status}</Pill>
            </div>
            {m.prReview?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.prReview.detail}</div>}
            {m.interview?.note && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.interview.note}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "170px 90px 1fr 60px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "PR REVIEW + INTERVIEW", "CONF."].map(h => (
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
                  <Pill color={m.prReview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.prReview?.status === "confirmed" ? c.green.bg : c.amber.bg}>PR: {m.prReview?.status}</Pill>
                  <Pill color={m.interview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.interview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Interview: {m.interview?.status}</Pill>
                </div>
                {m.prReview?.detail && <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.4, marginBottom: 3 }}>{m.prReview.detail}</div>}
                {m.interview?.note && <div style={{ fontSize: 10, color: c.g[500], fontStyle: "italic", lineHeight: 1.35 }}>{m.interview.note}</div>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* SHOULD-HAVES */}
      <Section icon="🟡" title="SHOULD-HAVE ASSESSMENT" badge={`${shouldHaves.filter(s => s.met).length}/${shouldHaves.length} MET`} badgeColor={c.green} />
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

      {/* PR REVIEW */}
      <Section icon="⟨/⟩" title="PR REVIEW ACTIVITY" badge="~25 min · Screen Share" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Live code review on a junior developer's order processing controller. Candidate annotated and explained issues in real time.</div>
      <div style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "10px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>{prReviewPrompt.title}</span>
            <Pill color={profC[prReviewPrompt.proficiency].txt} bg={profC[prReviewPrompt.proficiency].bg}>{prReviewPrompt.proficiency}</Pill>
          </div>
          <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{prReviewPrompt.time}</span>
        </div>
        <div style={{ fontSize: 11, color: c.g[400], marginBottom: 6, fontStyle: "italic" }}>{prReviewPrompt.context}</div>
        <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55, marginBottom: 8 }}>{prReviewPrompt.verdict}</div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.green.txt, marginBottom: 4 }}>CAUGHT INDEPENDENTLY</div>
            {prReviewPrompt.caught.map((item, i) => (
              <div key={i} style={{ fontSize: 10, color: c.g[700], lineHeight: 1.5, display: "flex", gap: 5, marginBottom: 2 }}>
                <span style={{ color: c.green.txt, flexShrink: 0 }}>✓</span> {item}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.amber.txt, marginBottom: 4 }}>MISSED / PROMPTED</div>
            {prReviewPrompt.missed.map((item, i) => (
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
          {[["Location", edu.location], ["US Equivalent", edu.usEquivalent]].map(([l, v]) => (
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
          <Section icon="💰" title="COMPENSATION" badge="Confirm Before Presenting" badgeColor={c.amber} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>CLIENT BUDGET (Senior Node.js · India Remote)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $26,000 / yr</div>
          {[
            ["Naukri (SDE II, Node.js, 3–5 YOE, India)", "$19,200–$33,600", "India market median (~16L–28L at SDE II)"],
            ["Candidate current CTC", "Not disclosed", "KISSHT fintech Mumbai — likely above budget midpoint"],
            ["Candidate expectation", "Not confirmed", "Confirm before L2 — SDE II in fintech may exceed ceiling"],
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
              <strong>Note:</strong> SDE II at a fintech company with 4 YOE — current CTC may already be at or above the ₹22 LPA budget ceiling. Confirm CTC and expectation before presenting to client.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function SourabhTalentProfile() {
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
            {[["Resume", true], ["PR Review", true], ["GitHub", false], ["Interview", true]].map(([label, on]) => (
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
