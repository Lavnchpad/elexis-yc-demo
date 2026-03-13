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
  name: "Balakrishna Adusumalli",
  title: "Senior Software Engineer",
  company: "Proxima",
  location: "India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "7+ years",
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
    "MoleculerJS = TypeScript confirmed — MoleculerJS is a TypeScript-first Node.js microservices framework. 'Designed and developed 15+ microservices using Node.js and TypeScript' is work output, not a skills-list claim.",
    "Genuine distributed systems architect: built 15+ microservices from scratch at Proxima, led a monolith-to-microservices migration at Bentley, scaled to 50–60 services at SnippetSentry. Kubernetes on GCP (GKE) in production. This is the real thing.",
    "Event-driven depth is exceptional: RabbitMQ (inter-service async), BullMQ (per-client isolated job queuing), NATS — with architectural rationale for each choice confirmed live. Dead letter queue + exponential backoff in production.",
    "Security depth stands out: JWT + OAuth2 + E2EE (public/private key, agent-level key injection) implemented at SnippetSentry. E2EE at this architecture level is rare and directly signals trust-layer thinking.",
    "Third-party API portfolio is broad and production-confirmed: Razorpay, Cashfree, iMessage, WhatsApp, AWS S3/SNS/SQS, GCP Cloud Storage, Steeleye. Saga/compensatory pattern across third-party transactions confirmed in interview.",
    "Only gap: no consumer social or marketplace backend. All domains are fintech/compliance, education, and referral systems. This is the single risk factor holding the score from Strong Fit.",
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
      detail: "DTO typing, TypeScript interface definitions, enum usage for status/currency fields — all referenced independently in PR review. MoleculerJS is TypeScript-first; production use of MoleculerJS = production TypeScript, no inference needed.",
    },
    interview: {
      status: "confirmed",
      note: "MoleculerJS confirmed as primary microservices framework across Proxima projects. TypeScript confirmed implicit via framework — not a secondary skill, it is the runtime environment.",
    },
    confidence: "high",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Demonstrated understanding of API contract design, validation layers, async response patterns, and integration boundaries. Correctly flagged where business logic was leaking into the controller layer.",
    },
    interview: {
      status: "confirmed",
      note: "API gateway with dual REST + GraphQL interface confirmed — 'REST and GraphQL APIs handling 100K+ daily requests with 99.9% uptime.' GraphQL for flexible client queries, REST for structured CRUD operations. Both confirmed in work output.",
    },
    confidence: "high",
  },
  {
    skill: "Scalable Architecture",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Caught in-memory cache → Redis recommendation for horizontal scaling — non-trivial. Proactively flagged async notification queue pattern rather than synchronous inline calls. Idempotency key for payment deduplication — directly relevant to distributed transaction safety.",
    },
    interview: {
      status: "confirmed",
      note: "Led monolith-to-microservices migration at Bentley. Designed and built 15+ microservices from scratch at Proxima. Scaled to 50–60 services at SnippetSentry with Kubernetes on GCP (GKE). Saga/compensatory pattern across distributed third-party API transactions. Co-owns architecture with a peer architect who reviews and approves — collaborative, not solo, but the design ownership is real.",
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
    note: "All domains are fintech/banking compliance, education platforms, and referral cashback systems. No consumer social feeds, UGC pipelines, marketplace transactions, social graph, or engagement systems. Highest-risk gap. Mitigated by transferable distributed architecture depth — the patterns apply, the domain intuition doesn't.",
    risk: "high",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Advanced",
    note: "RabbitMQ for inter-service async messaging, BullMQ for per-client isolated job queuing (multi-tenant architecture), NATS for lightweight pub/sub. Dead letter queue + exponential backoff retry in production. Architectural rationale for each system confirmed live — not framework-name dropping. Strongest non-must-have signal in this profile.",
    risk: "low",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Advanced",
    note: "JWT + OAuth2 confirmed across projects. E2EE (end-to-end encryption) implemented at SnippetSentry — public/private key architecture with agent-level key injection. This is rare depth; most candidates stop at JWT. Security thinking embedded at architecture level, not bolt-on.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS / GCP)",
    met: true,
    level: "Advanced",
    note: "AWS (S3, SNS, SQS) and GCP (Cloud Storage, GKE Kubernetes) both confirmed in work output. Azure mentioned across projects as well. GKE production Kubernetes — writes replica/deployment manifests. Multi-cloud by domain, not by accident. Strong operational depth.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Intermediate",
    note: "CI/CD pipelines confirmed. Docker confirmed. Kubernetes manifests confirmed (writes replica configs for GKE). Pipeline ownership is collaborative with DevOps — owns the manifests, not the CI infrastructure. Solid intermediate-to-advanced posture.",
    risk: "low",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Advanced",
    note: "Razorpay + Cashfree (payments, idempotency key pattern), iMessage integration, WhatsApp integration, AWS S3/SNS/SQS, GCP Cloud Storage, Steeleye (financial data). Saga/compensatory transaction pattern across third-party calls — handles partial failures correctly. Portfolio breadth and architectural maturity both above bar.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "MoleculerJS (Microservices)", found: true, evidence: "Primary microservices framework across Proxima projects. TypeScript-first. Used to build 15+ services from scratch — architecture ownership confirmed, not tutorials." },
  { skill: "Kubernetes (GKE)", found: true, evidence: "Production Kubernetes on Google Kubernetes Engine. Writes deployment manifests and replica configs. Confirmed live in interview." },
  { skill: "RabbitMQ / BullMQ / NATS", found: true, evidence: "All three confirmed with architectural rationale. RabbitMQ inter-service, BullMQ per-client job isolation (multi-tenant), NATS pub/sub. Dead letter queue + exponential backoff in production." },
  { skill: "E2EE (End-to-End Encryption)", found: true, evidence: "Implemented public/private key architecture with agent-level key injection at SnippetSentry. Rare depth signal — most candidates stop at transport-layer security." },
  { skill: "Redis (Caching / Queuing)", found: true, evidence: "Redis recommended for horizontal scaling in PR review (in-memory cache → Redis pattern). Used for caching across Proxima services." },
  { skill: "Razorpay + Cashfree", found: true, evidence: "Both payment gateways confirmed. Idempotency key pattern for payment deduplication caught in PR review — signals production payment system maturity." },
  { skill: "iMessage / WhatsApp Integration", found: true, evidence: "Both messaging integrations confirmed in resume work output. Third-party messaging API experience relevant to notification-heavy platforms." },
  { skill: "Saga / Distributed Transactions", found: true, evidence: "Compensatory saga pattern across distributed third-party API calls confirmed in interview. Handles partial failures and rollbacks — non-trivial production pattern." },
  { skill: "WebSocket / Real-time Chat", found: false, evidence: "No WebSocket or real-time streaming confirmed. Event-driven experience is async messaging (RabbitMQ/NATS), not bidirectional streaming." },
  { skill: "GetStream / Social Graph", found: false, evidence: "No social graph, activity feeds, or GetStream experience confirmed. Domain gap aligns with Social/Marketplace miss." },
  { skill: "GraphQL (Schema Design)", found: true, evidence: "GraphQL API design confirmed — dual REST+GraphQL interface handling 100K+ daily requests. API gateway layer ownership confirmed." },
  { skill: "Steeleye (Financial Data)", found: true, evidence: "Steeleye financial data API integration confirmed. Domain-specific but demonstrates third-party financial system integration maturity." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification. Junior developer's code. Candidate reviewed live with screen share during interview.",
  time: "~15 min",
  proficiency: "Strong",
  verdict: "Strongest PR review performance in this batch. Caught the idempotency key gap for payments independently — this is the highest-signal catch, directly showing distributed payment system intuition. Proactively recommended async notification queue instead of inline calls (async-first thinking). In-memory cache → Redis recommendation shows horizontal scaling awareness. TypeScript/DTO typing, env var extraction, nullable migration pattern, and enum for status/currency fields all caught independently. Aditya's notes: strong ownership, correct architectural instincts, no hesitation on distributed system concerns.",
  caught: [
    "Idempotency key for payment deduplication — prevents duplicate charges on retry (highest-signal catch)",
    "Async notification queue — decouple notification from order processing, don't block on it",
    "In-memory cache → Redis — in-memory breaks on horizontal scale, Redis needed for multi-instance",
    "DTO typing — add TypeScript interfaces to request.body fields",
    "Hardcoded URLs and credentials — move to environment variables",
    "Nullable migration pattern — handle null/undefined safely in DB schema migrations",
    "Enum for status and currency fields — type safety and constraint enforcement",
    "Controller SoC violation — business logic (charge, create order, notify) belongs in service layer",
    "Missing null check — no handling for user not found",
    "Better error logging — log actual error objects, not generic messages",
  ],
  missed: [
    "DB transaction atomicity on charge + create-order — partial failure leaves orphaned charge (identified only after prompt)",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 8.5,
  "Domain": 6.5,
  "Communication": 7.5,
  "Problem Solving": 8.0,
  "Culture Fit": 7.5,
};

const findings = [
  "MoleculerJS = TypeScript — confirmed without ambiguity. MoleculerJS is a TypeScript-native microservices framework. 7+ years across Properly Inc, KIOT, and Proxima. All Node.js. All TypeScript-first.",
  "Distributed systems architect by evidence, not claim: built 15+ microservices from scratch at Proxima, led a monolith-to-microservices migration at Bentley, scaled to 50–60 services at SnippetSentry. Kubernetes on GCP in production. Architecture is co-owned with a peer architect who approves — collaborative ownership, but the design work is his.",
  "Event-driven depth is the strongest signal in the interview. RabbitMQ for inter-service async, BullMQ for per-client isolated job queues in a multi-tenant system, NATS for lightweight pub/sub. Dead letter queue + exponential backoff retry implemented and explained with rationale — not textbook, from production failure modes.",
  "E2EE at SnippetSentry: public/private key architecture with agent-level key injection. Implemented from scratch. This is rare — most candidates stop at HTTPS and JWT. Signals security embedded at design time, not bolted on after.",
  "PR review was the strongest in this batch. Idempotency key for payment dedup caught independently — this requires knowing what happens on payment retry in distributed systems. In-memory cache → Redis for horizontal scale, async notification queue, DTO typing, nullable migration — all caught without prompting. Only miss: DB transaction wrapping charge+order (prompted to find it).",
  "Communication is confident and precise. Answers are technical without being verbose. Ownership language is direct — 'I designed and built' without excessive hedging. Architectural reasoning is articulate: explains why each messaging system was chosen, not just that it was used.",
  "Key gap: zero consumer social or marketplace experience. All domains are fintech/banking compliance, education, and referral systems. Distributed patterns transfer; domain intuition does not. Social/marketplace is the only reason this isn't a Strong Fit.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Jawaharlal Nehru Technological University (JNTU)",
  degree: "B.Tech — Computer Science and Engineering",
  location: "Andhra Pradesh, India",
  usEquivalent: "Bachelor of Science in Computer Science (4-year) — equivalent to a US BS CS degree",
  relevance: "4-year engineering degree from a nationally recognized public university in India. Standard CS foundation. Academic performance not reported on resume.",
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>Transcript verified · Conducted by Aditya Panchal</div>
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
            ["Naukri (Sr. Node.js, 7+ YOE, India)", "$24,000 – $38,000", "India market median (~20L–32L)"],
            ["US equivalent (Senior Node.js, distributed systems)", "$130,000 – $175,000", "SF/NY tech market, comparable scope"],
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
              <strong>Note:</strong> 7+ years with distributed systems depth — market expectation may exceed budget ceiling. Confirm CTC and expectation early. If expectation is above ₹22L, escalate before advancing.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function BalakrishnaTalentProfile() {
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
