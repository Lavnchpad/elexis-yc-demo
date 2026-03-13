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
  name: "Mayank Kumar",
  title: "Software Engineer",
  company: "BenthonLabs",
  location: "India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "3.75 years",
};

const role = {
  company: "US-Based Company",
  title: "Senior Node.js Developer",
  team: "Backend Engineering Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 78,
  bullets: [
    "NestJS across all 3 employers (Infosys, SMC, BenthonLabs) — TypeScript confirmed via NestJS-first architecture. Not a skills-list claim; repeated across companies with increasing responsibility.",
    "Architecture ownership is strong and cross-domain: designed SNS/SQS messaging infrastructure powering 20+ Lambda microservices handling 400k+ daily events for the LINE platform migration at SMC. Full infrastructure design, not just feature implementation.",
    "Best should-have coverage in the pipeline: all 6 should-haves met — social/marketplace (MasterFFL 70k+ dealer network), real-time/event-driven (LINE messaging 400k+ daily), auth (Cerbos RBAC/ABAC), deep AWS, CI/CD + Kubernetes, and a strong third-party API portfolio (Stripe, Salesforce Marketing Cloud, LINE, AWS Bedrock).",
    "Third-party API breadth signals enterprise integration experience: Stripe (payments), Salesforce Marketing Cloud (email campaigns), LINE Messaging API, AWS Bedrock (AI/ML inference). Broader portfolio than most at this YOE.",
    "Flag: 3.75 YOE places him at the low end of the senior threshold. BenthonLabs tenure is only ~5 months. Confirm CTC and notice period before presenting — trajectory is strong but tenure is short.",
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
      detail: "TypeScript typing present throughout PR review — added DTO interfaces for request payload, typed service method signatures, enum types for order status. NestJS is TypeScript-first; production NestJS at three companies = three companies of TypeScript in practice.",
    },
    interview: {
      status: "confirmed",
      note: "NestJS confirmed as primary framework across Infosys, SMC, and BenthonLabs. TypeScript usage not questioned separately as NestJS ships with TypeScript by default — evidence is structural, not self-reported.",
    },
    confidence: "high",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "PR review demonstrated solid REST API design instincts: controller/service separation, response shape awareness, input validation layer placement. REST over-fetching reduction discussed in terms of endpoint design.",
    },
    interview: {
      status: "confirmed",
      note: "REST APIs confirmed in work output: 10k+ daily requests at Infosys, API Gateway integration at BenthonLabs. No GraphQL mentioned — REST-only, but REST depth is strong and matches the role's primary API pattern.",
    },
    confidence: "high",
  },
  {
    skill: "Scalable Architecture",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Identified Redis as a caching layer for high-traffic endpoints independently during the PR review. Flagged DLQ + retry pattern for failed order processing — correct production thinking for at-scale systems. Async notification dispatch to decouple order creation from notification delivery also independently raised.",
    },
    interview: {
      status: "confirmed",
      note: "Designed SNS/SQS event-driven architecture powering 20+ Lambda microservices handling 400k+ daily events for LINE platform migration at SMC. At BenthonLabs, owns full backend architecture end-to-end. Scalable architecture ownership is evidenced across both work output and architectural decisions discussed live.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social / Marketplace Backend",
    met: true,
    level: "Intermediate",
    note: "MasterFFL platform at Infosys: 70k+ dealer/distributor network — multi-tier marketplace with B2B transactional flows. LINE messaging platform migration at SMC: social/messaging infrastructure for a consumer-facing platform. Both confirmed in work output with concrete scale numbers. Strongest social/marketplace signal in the pipeline.",
    risk: "low",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Advanced",
    note: "SNS/SQS + 20+ Lambda microservices processing 400k+ daily events (LINE platform). Event-driven architecture designed and owned from scratch at SMC. At BenthonLabs, real-time messaging and notification dispatch. DLQ + retry patterns for fault tolerance confirmed in PR review and interview. Best real-time/event-driven evidence in the pipeline.",
    risk: "low",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Intermediate",
    note: "Cerbos RBAC/ABAC implemented for attribute-based access control — policy-as-code authorization pattern. JWT authentication confirmed. Cerbos is a purpose-built authorization engine; choosing it over roll-your-own RBAC signals awareness of production auth requirements. Confirmed live in interview with rationale.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS)",
    met: true,
    level: "Advanced",
    note: "Deep AWS usage confirmed in work output: SNS, SQS, Lambda (20+ functions), API Gateway, S3, CodeBuild, CodePipeline. SMC migration was an AWS-native architecture designed by Mayank. AWS Bedrock integration at BenthonLabs (AI/ML inference). Strongest AWS depth in the Node.js pipeline.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Intermediate",
    note: "AWS CodeBuild/CodePipeline CI/CD pipelines confirmed in work output. Docker confirmed for containerization. Kubernetes confirmed — EKS or equivalent for container orchestration. Full CI/CD ownership, not just usage. No gaps here.",
    risk: "low",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Advanced",
    note: "Stripe (payment processing), Salesforce Marketing Cloud (email/SMS campaigns), LINE Messaging API (consumer messaging), AWS Bedrock (AI inference). Four distinct enterprise-grade integrations across 3 companies. Breadth signals comfort with external API contracts, webhook handling, and integration fault tolerance.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Stripe (Payments)", found: true, evidence: "Stripe integration confirmed in work output. Payment processing, webhook handling, and billing flows. Confirmed live in interview." },
  { skill: "Redis (Caching)", found: true, evidence: "Identified Redis as the correct caching layer for high-traffic endpoints independently during PR review. Signals production-scale awareness beyond tutorial familiarity." },
  { skill: "Kubernetes (K8s)", found: true, evidence: "Kubernetes container orchestration confirmed in work output. Docker + K8s stack confirmed across projects. Not DevOps-only — developer-level K8s ownership." },
  { skill: "AWS Bedrock (AI/ML)", found: true, evidence: "AWS Bedrock integration at BenthonLabs for AI/ML inference. Rare signal at this YOE — suggests exposure to LLM-backed product features." },
  { skill: "Salesforce Marketing Cloud", found: true, evidence: "Salesforce Marketing Cloud API integration confirmed for email/SMS campaign dispatch. Enterprise integration experience." },
  { skill: "Cerbos (RBAC/ABAC)", found: true, evidence: "Policy-as-code authorization via Cerbos. Attribute-based access control for multi-role systems. Advanced auth pattern beyond standard JWT." },
  { skill: "DLQ + Retry Patterns", found: true, evidence: "Dead-letter queue + retry logic identified independently in PR review for failed order processing. Production fault-tolerance thinking." },
  { skill: "GraphQL", found: false, evidence: "No GraphQL mentioned in resume or interview. REST-only API design confirmed." },
  { skill: "GetStream / WebSocket", found: false, evidence: "Real-time is SNS/SQS/Lambda event-driven, not WebSocket streaming. No GetStream or WebSocket integration confirmed." },
  { skill: "Observability / APM", found: false, evidence: "No Datadog, Sentry, or New Relic mentioned. Logging confirmed but no structured observability tooling called out." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification dispatch. Junior developer's code. Candidate reviewed live with screen share during interview.",
  time: "~15 min",
  proficiency: "Intermediate",
  verdict: "Strong, systematic review. Caught both surface and architecture-level issues independently — notably flagged Redis caching for high-traffic endpoints, DLQ/retry pattern for failed orders, and async notification dispatch without prompting. DB transaction for charge + order atomicity caught independently (ahead of Gaurang who needed prompting). Missed charge reversal on payment failure until specifically asked. Clean, confident communication throughout the PR review.",
  caught: [
    "Redis caching for high-traffic endpoints — flagged independently as a performance necessity at scale",
    "DLQ + retry pattern for failed order processing — fault tolerance thinking without prompting",
    "Async notification dispatch — decouple notification from order creation flow (fire-and-forget)",
    "DB transaction required for charge + create-order atomicity — prevent charge-without-order on failure",
    "SoC violation — business logic (charge, create order, notify) belongs in service layer, not controller",
    "Better error logging — log actual error object, not a generic message string",
    "Hardcoded URLs and IDs — move to environment variables",
    "Payload DTO typing — TypeScript types for request.body fields",
    "Missing null check — no handling when user not found",
    "Notification service should be a separate injectable service",
    "Input validation should move to a middleware or validation pipe layer",
  ],
  missed: [
    "Charge reversal on payment failure — if charge succeeds but order creation fails, funds must be reversed (identified only after direct prompt)",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 8.0,
  "Domain": 8.0,
  "Communication": 7.5,
  "Problem Solving": 8.0,
  "Culture Fit": 7.5,
};

const findings = [
  "NestJS confirmed across Infosys (2022–2024), SMC (2024–2025), BenthonLabs (2025–present). TypeScript is structural — not a claim, not a skills bullet. Three consecutive employers, increasing ownership.",
  "SNS/SQS + 20+ Lambda architecture at SMC (LINE platform migration) is the strongest architecture ownership signal in the Node.js pipeline. 400k+ daily events. Designed the full event-driven infrastructure. Not just feature implementation.",
  "MasterFFL (70k+ dealer network at Infosys) + LINE messaging platform (SMC): two distinct social/marketplace contexts. Most candidates in this batch have zero social/marketplace exposure. Mayank has two.",
  "Cerbos RBAC/ABAC is a non-trivial auth choice. Selecting a policy-as-code authorization engine signals awareness that role-based access at scale needs a dedicated solution, not ad-hoc middleware. Rationale confirmed live — not resume-stuffed.",
  "Flyway for database migrations discussed correctly — version-controlled schema changes, rollback strategy, CI integration. Candidate explained it as part of the deployment pipeline, not just a tool name drop.",
  "PR review was the strongest in recent sessions: Redis, DLQ, async dispatch, and DB transaction atomicity all caught independently. Only gap was charge reversal on failure — identified after prompting but explained correctly once flagged.",
  "Communication is solid: clear, structured answers without heavy filler. Explained architectural decisions with tradeoffs rather than just 'we used X.' One flag: at 3.75 YOE, some answers feel IC-level rather than senior-lead level. Room to grow into the senior scope.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Rajasthan Technical University",
  degree: "B.Tech — Computer Science and Engineering, 2022",
  location: "Rajasthan, India",
  usEquivalent: "Bachelor of Science in Computer Science (4-year) — equivalent to a US BS CS degree",
  relevance: "4-year engineering degree. Standard CS background. Graduated 2022; immediately joined Infosys, indicating campus or near-campus hire.",
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
      <Section icon="⟨/⟩" title="PR REVIEW ACTIVITY" badge="~15 min · Screen Share" badgeColor={c.teal} />
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~55 min · Transcript verified · Conducted by Aditya Panchal</div>
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
          <Section icon="💰" title="COMPENSATION" badge="Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>CLIENT BUDGET (Senior Node.js · India Remote)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $26,000 / yr</div>
          {[
            ["Naukri (Sr. Node.js, 3–5 YOE, India)", "$16,800 – $28,800", "India market median (~14L–24L)"],
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
              <strong>Note:</strong> Confirm CTC and expectation before presenting to client. At 3.75 YOE with a recent job change (BenthonLabs, 5 months), expectation may be in motion — ask directly.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function MayankTalentProfile() {
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
