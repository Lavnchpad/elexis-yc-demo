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
  name: "Devendra Shekhawat",
  title: "Technical Lead",
  company: "Primalease",
  location: "India",
  status: "Open to Opportunities",
  noticePeriod: "Immediate",
  yoe: "6 years",
};

const role = {
  company: "US-Based Company",
  title: "Senior Node.js Developer",
  team: "Backend Engineering Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 73,
  bullets: [
    "Strong Node.js pedigree across 3 employers (Habilelabs → Adaptiv.Me → Primalease) — 6 years of consistent backend ownership with increasing scope. Not a skills claim; primary framework throughout, confirmed in interview.",
    "Architecture ownership is real: designed Leasable360 backend from scratch at Adaptiv.Me (Express + PostgreSQL + Sequelize), built microservices infrastructure, and as Technical Lead at Primalease recognized the monolith's scaling limits and initiated a microservices migration. Architectural judgment confirmed live, not just resume-stated.",
    "Auth + security is the strongest should-have: led SOC 2 compliance process at Primalease, implemented SSO + 2FA + IP whitelisting for RevBits, and built social auth handlers. Security thinking is embedded in how he approaches engineering — not a checkbox.",
    "Open source contribution stands out: Node.js core contributor (process.send() and Http2Stream documentation). Active HospitalRun-frontend contributions. Strongest GitHub signal in the Node.js pipeline — an actual core contribution, not just public projects.",
    "Flag: TypeScript is a gap. A NestJS + TypeScript project was initiated at Primalease but the team wasn't TypeScript-confident and the stack was rolled back to JavaScript. Primary stack is Express.js + JavaScript. Confirm readiness to move to TypeScript-first before presenting — the inclination is there, the execution wasn't sustained.",
    "Flag: No social/marketplace exposure across career — all 3 employers are real estate SaaS or B2B tooling. This is the most meaningful gap against the rubric. Not a knockout, but worth noting when comparing to candidates who have marketplace depth.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Node.js + TypeScript",
    passed: null,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "partial",
      detail: "PR review code was Express.js + JavaScript — no TypeScript annotations observed. Node.js patterns were solid: async/await, proper error handling, modular structure. TypeScript-specific strengths (typing, interfaces, DTOs) were not demonstrated in the review session.",
    },
    interview: {
      status: "partial",
      note: "Node.js confirmed as primary framework across all 3 employers. TypeScript: NestJS + TypeScript project was started at Primalease but rolled back to JavaScript due to team capacity constraints. Devendra acknowledged the switch and expressed comfort picking TypeScript back up. Express.js + JavaScript is the confirmed production stack.",
    },
    confidence: "medium",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "PR review demonstrated solid REST API instincts: flagged separation of concerns (controller vs. service layer), input validation layer placement, and response shape awareness. Structurally sound REST thinking throughout.",
    },
    interview: {
      status: "confirmed",
      note: "REST API design confirmed across Habilelabs, Adaptiv.Me, and Primalease — Express + Sequelize + PostgreSQL REST APIs in all three contexts. No GraphQL mentioned; REST-only, but depth is strong and matches the role's primary API pattern.",
    },
    confidence: "high",
  },
  {
    skill: "Scalable Architecture",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Raised separation of concerns and service decomposition independently — flagged that notification and payment logic should be separate injectable services rather than co-located in a single controller. Architectural pattern thinking confirmed beyond surface-level issues.",
    },
    interview: {
      status: "confirmed",
      note: "Designed Leasable360 backend from scratch at Adaptiv.Me. Built microservices infrastructure. At Primalease, recognized the monolith's scaling ceiling as Technical Lead and initiated a microservices migration. Architecture ownership confirmed across multiple contexts — not just feature implementation.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social / Marketplace Backend",
    met: false,
    level: "None",
    note: "No social or marketplace exposure across career. All three employers are real estate SaaS or B2B tooling — Habilelabs (tech services), Adaptiv.Me (Leasable360 real estate platform), Primalease (lease/property management). Lead management and commission workflows are transactional but not marketplace-pattern. This is the most meaningful gap against the rubric.",
    risk: "medium",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Intermediate",
    note: "RabbitMQ confirmed on resume for async messaging. SNS used for notifications and monitoring at Primalease. Lambda pipelines for scraping and data processing. Event-driven signal is present but at a moderate level — RabbitMQ confirms the pattern, but no 400k+ daily event scale or full event-driven architecture design. Solid foundation; not the batch's strongest real-time signal.",
    risk: "low",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Advanced",
    note: "Strongest auth + security signal in recent sessions: led SOC 2 compliance process at Primalease (policies, controls, auditor workflow). SSO + 2FA + IP whitelisting implementation for RevBits project. Social auth handlers (Google, GitHub OAuth) confirmed. Security is embedded in how Devendra approaches system design — not bolted on.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS)",
    met: true,
    level: "Intermediate",
    note: "AWS usage confirmed across services: EC2, S3, CloudWatch, SNS, Route 53, Load Balancer, IAM, Lambda. Good breadth for a backend engineer at this YOE. Devendra uses AWS as infrastructure for Node.js services — not architecting AWS-native event pipelines at scale. Solid working knowledge, not deep infrastructure ownership.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Intermediate",
    note: "Jenkins CI/CD pipeline with 3-environment flow (staging → sales → production) designed and owned at Primalease as Technical Lead. Full pipeline ownership, not just usage. Docker confirmed. CI/CD thinking confirmed live — he explained environment promotion strategy and rationale.",
    risk: "low",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Intermediate",
    note: "Stripe (payment processing), Apify (web scraping / data extraction), OpenAI (LLM integration), Elasticsearch (search). Four distinct integrations across projects. Good breadth for the role — signals comfort with external API contracts and integration patterns. Not the deepest portfolio in the batch but covers the core categories.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Node.js Core Contributor", found: true, evidence: "Contributed to Node.js core: process.send() and Http2Stream documentation. HospitalRun-frontend contributions. Active GitHub: dev-script. Strongest open source signal in the Node.js pipeline — actual core contribution, not just public projects." },
  { skill: "Jenkins CI/CD", found: true, evidence: "Designed and owned Jenkins pipeline with 3-environment promotion (staging → sales → production) at Primalease as Technical Lead. Full pipeline ownership confirmed in interview." },
  { skill: "RabbitMQ", found: true, evidence: "RabbitMQ for async messaging confirmed on resume. Event-driven messaging pattern in production backend context." },
  { skill: "AWS (EC2/S3/SNS/Lambda)", found: true, evidence: "EC2, S3, CloudWatch, SNS, Route 53, Load Balancer, IAM, Lambda confirmed across projects. Solid working AWS knowledge." },
  { skill: "Stripe (Payments)", found: true, evidence: "Stripe integration confirmed in work output. Payment processing and rollback handling — flagged independently in PR review." },
  { skill: "Apify (Web Scraping)", found: true, evidence: "Apify for web scraping / data extraction pipelines. Practical third-party integration for data collection workflows." },
  { skill: "OpenAI Integration", found: true, evidence: "OpenAI API integration confirmed. LLM-backed feature exposure — signals comfort working with AI/ML inference APIs." },
  { skill: "Elasticsearch", found: true, evidence: "Elasticsearch for search functionality confirmed. Practical search implementation experience." },
  { skill: "SOC 2 Compliance", found: true, evidence: "Led SOC 2 compliance process at Primalease — controls, policies, auditor workflow. Rare signal at this YOE and role level." },
  { skill: "TypeScript / NestJS", found: false, evidence: "NestJS + TypeScript project initiated at Primalease but rolled back to JavaScript due to team capacity. Primary stack is Express.js + JavaScript. TypeScript proficiency unconfirmed in production." },
  { skill: "GraphQL", found: false, evidence: "No GraphQL mentioned in resume or interview. REST-only API design across all three employers." },
  { skill: "Kubernetes", found: false, evidence: "No Kubernetes mentioned. Docker confirmed for containerization, but no container orchestration beyond Jenkins pipelines." },
  { skill: "Redis / Caching", found: false, evidence: "Redis not mentioned. Caching layer not flagged in PR review or interview. Potential gap for high-traffic scenarios." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification dispatch. Junior developer's code. Candidate reviewed live with screen share during interview.",
  time: "~15 min",
  proficiency: "Intermediate",
  verdict: "Solid and practical review. Caught the Stripe rollback gap (charge succeeds, DB fails — funds must be reversed) independently — one of the harder catches in the session. Flagged input validation layer, separation of concerns for notification and payment services, and a constants/enums pattern for hardcoded values. Architectural awareness is practical and direct. Missed Redis caching opportunity and DLQ/retry pattern without prompting — identified correctly when raised. Not the deepest PR review in the pipeline, but grounded and confident.",
  caught: [
    "Stripe rollback on DB create failure — if charge succeeds but order creation fails, Stripe charge must be reversed",
    "Input validation gap — missing server-side validation on incoming request payload",
    "Separation of concerns — notification and payment logic should be separate injectable services, not co-located in controller",
    "Constants/enums file — hardcoded values (status strings, IDs) should live in a shared constants layer",
    "Missing null check — no handling when user lookup returns empty",
    "Business logic in controller — charge + order logic belongs in service layer",
    "Better error logging — log actual error object, not generic message string",
  ],
  missed: [
    "Redis caching — no caching layer flagged for high-traffic endpoints (identified after direct prompt, explained correctly)",
    "DLQ + retry pattern — no dead-letter queue or retry logic raised for failed order processing (identified after prompting)",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 7.5,
  "Domain": 7.0,
  "Communication": 8.0,
  "Problem Solving": 7.0,
  "Culture Fit": 7.5,
};

const findings = [
  "Node.js confirmed across all 3 employers (Habilelabs 2019–2021, Adaptiv.Me 2021–2024, Primalease 2024–2025). Six years of consistent backend ownership — not resume-stuffed. Framework and architecture style consistent throughout, with increasing responsibility.",
  "Designed Leasable360 backend architecture from scratch at Adaptiv.Me — Express + PostgreSQL + Sequelize. Full backend ownership, not feature implementation on an existing system. Architecture decisions explained with rationale in interview.",
  "Technical Lead at Primalease: owned Jenkins CI/CD pipeline (3-environment promotion), identified microservices migration need, and managed team of backend developers. TL scope is real — engineering decisions, not just code.",
  "SOC 2 compliance ownership is the strongest auth/security signal in recent sessions. Led the compliance process — policies, controls, auditor coordination. SSO + 2FA + IP whitelisting for RevBits project. Security thinking runs through his engineering approach.",
  "Node.js core contributor: process.send() and Http2Stream documentation merged. HospitalRun-frontend contributions. GitHub: dev-script. Actual open source contribution to the runtime he works in daily — strongest GitHub signal in the Node.js batch.",
  "TypeScript gap: NestJS + TypeScript project was started at Primalease but rolled back to JavaScript because the team wasn't confident enough to ship TypeScript in production. Devendra acknowledged this directly. Primary stack is Express.js + JavaScript; TypeScript adoption was attempted but not sustained.",
  "No social or marketplace exposure across career. Real estate SaaS throughout — lead management, commission workflows, lease agreements. Transactional domain, not social graph or marketplace pattern. Most meaningful gap against the rubric.",
  "PR review was grounded and practical. Caught Stripe rollback independently (a hard catch). Missed Redis caching and DLQ without prompting — identified correctly once raised. Communication throughout was clear and direct, explaining reasoning not just naming issues.",
];

// ─── EDUCATION ───
const edu = {
  institution: "To be confirmed",
  degree: "Engineering background implied by career entry (2019) — confirm degree and institution",
  location: "India",
  usEquivalent: "To be confirmed with candidate",
  relevance: "Career started Oct 2019 — consistent with graduation year 2019 or prior. Engineering degree likely based on career track.",
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
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>73% confidence</div>
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
      <Section icon="🟡" title="SHOULD-HAVE ASSESSMENT" badge={`${shouldHaves.filter(s => s.met).length}/${shouldHaves.length} MET`} badgeColor={shouldHaves.filter(s => s.met).length >= 5 ? c.green : c.amber} />
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~45 min · Transcript verified · Conducted by Aditya Panchal</div>
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
            ["Naukri (Sr. Node.js, 5–7 YOE, India)", "$19,200 – $33,600", "India market median (~16L–28L at TL level)"],
            ["Candidate current CTC", "Not disclosed", "To be confirmed — TL title, 6 YOE"],
            ["Candidate expectation", "Not confirmed", "Ask before L2 — likely above budget midpoint"],
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
              <strong>Note:</strong> Technical Lead with 6 YOE — expectation is likely at or above the budget ceiling. Confirm CTC and expectation before presenting to client. Do not present without budget alignment.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function DevendraTalentProfile() {
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
            {[["Resume", true], ["PR Review", true], ["GitHub", true], ["Interview", true]].map(([label, on]) => (
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
