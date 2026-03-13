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
  name: "Gaurang Gehlot",
  title: "Software Engineer",
  company: "Codvo.ai",
  location: "Jodhpur, India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "5+ years",
};

const role = {
  company: "US-Based Company",
  title: "Senior Node.js Developer",
  team: "Backend Engineering Team",
};

const recommendation = {
  verdict: "Good Fit",
  confidence: 70,
  bullets: [
    "NestJS = TypeScript confirmed — not a skills-list claim. 5+ years at Codvo.ai across 7–8 projects spanning insurance, fintech, ERPs, Chrome extensions, and mobile apps.",
    "Architecture ownership is real but bounded: designed and built the BFF/API layer for Centric (10K+ users, insurance platform), not the underlying microservices. Ownership is IC+ with team collaboration, not sole architect.",
    "Stripe confirmed in depth — subscriptions, webhooks, billing automation, and payment state reconciliation. Direct match to role requirements.",
    "Auth implemented from scratch: custom JWT + multi-role RBAC (advisor/admin/super-admin) for sensitive insurance data. Chose custom over IAM — correct decision for use case.",
    "Key gaps: no social/marketplace consumer product, no WebSockets/real-time streaming. Real-time exposure is limited to Novu push/email/SMS notifications via SNS/SQS.",
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
      detail: "Referenced TypeScript typing throughout the PR review — added DTO types to request.body, typed payload interfaces. NestJS is TypeScript-first; 5 years of NestJS production use = 5 years TypeScript.",
    },
    interview: {
      status: "confirmed",
      note: "NestJS confirmed as primary backend framework across all Codvo.ai projects. TypeScript usage implicit via NestJS — not questioned separately because NestJS ships with TypeScript by default.",
    },
    confidence: "high",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "PR review showed understanding of controller/service separation, REST response shape, validation layers. Correctly identified that business logic does not belong in the controller.",
    },
    interview: {
      status: "confirmed",
      note: "Designed and built REST + GraphQL APIs for Centric (IAPP insurance): complex data queries via GraphQL to reduce over-fetching, RESTful APIs for CRUD operations. Both confirmed in work output — not skills-list only.",
    },
    confidence: "high",
  },
  {
    skill: "Scalable Architecture",
    passed: null,
    resume: { sections: ["Experience"], signal: "moderate" },
    prReview: {
      status: "moderate",
      detail: "Demonstrated SoC awareness, separation of controller/service/notification layers, integration layer abstraction for third-party HTTP calls. Good IC-level architectural instincts — not a systems design reveal.",
    },
    interview: {
      status: "partial",
      note: "Critical nuance: NestJS layer at Centric was a BFF (Backend for Frontend) aggregating internal microservices — 'NestJS serving as a middle layer to optimize data flow and reduce over-fetching.' He implemented the aggregation/auth/API layer, not the underlying distributed system. 10K+ users on an insurance platform. Ownership is 'significant' but collaborative — 'I always ask for team inputs on what I designed.' Single employer, single primary domain for 5 years.",
    },
    confidence: "medium",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social / Marketplace Backend",
    met: false,
    level: "None",
    note: "All work is B2B/enterprise: insurance (Centric), Chrome checkout extension (Katapult — fintech, not a marketplace), ERPs, and Chrome/mobile tooling. No consumer social feeds, user-generated content, marketplace transactions, or social features. Highest-risk gap for this role.",
    risk: "high",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Developing",
    note: "Novu push/email/SMS notification system via AWS SNS/SQS confirmed in work output. Redis distributed locks for multi-instance cron deduplication — solid production thinking. No WebSockets, no GetStream, no Kafka. Real-time exposure is notification delivery, not live data streaming or chat.",
    risk: "high",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Intermediate",
    note: "Custom JWT + multi-role RBAC (advisor/admin/super-admin) implemented from scratch for sensitive insurance data. Chose custom auth over IAM/Firebase — correct decision given multi-role complexity. Confirmed live in interview with full rationale.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS)",
    met: true,
    level: "Intermediate",
    note: "AWS confirmed in work output: EC2 (hosting), S3 (storage), SNS/SQS (notification messaging). CI/CD pipeline deploys to EC2 on branch push. Collaborates with DevOps for AWS services — not sole cloud owner. Compared cron vs Lambda/EventBridge in interview; answered correctly with valid tradeoffs.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Intermediate",
    note: "CI/CD pipeline confirmed: push to develop branch → automated build + validation → deploy to EC2 instance. Docker used for development, configuration, and MVP project environments. No Kubernetes. Collaborates with DevOps rather than owning infrastructure solo.",
    risk: "medium",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Developing",
    note: "Stripe confirmed: subscriptions, webhooks, billing automation, payment state reconciliation. Novu for multi-channel notifications. AWS SNS/SQS. No Twilio, no Firebase, no Google Maps. Minimum threshold met; portfolio is narrower than ideal.",
    risk: "medium",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Stripe (Payments + Payouts)", found: true, evidence: "Stripe subscriptions and webhooks confirmed in work output (Centric) and interview. Billing automation, renewals, and payment state reconciliation. Direct relevance to role." },
  { skill: "Redis (Caching + Distributed Locks)", found: true, evidence: "Redis caching for API latency optimization (~20% reduction). Redis distributed locks for cron job deduplication across multiple instances — non-trivial production pattern." },
  { skill: "AWS (EC2 / S3 / SNS / SQS)", found: true, evidence: "All four services confirmed in work output: EC2 for hosting, S3 for storage, SNS/SQS for notifications/messaging." },
  { skill: "GraphQL Schema Design", found: true, evidence: "GraphQL integrated in Centric to support complex data queries and reduce over-fetching. Confirmed in resume work output and interview." },
  { skill: "Docker", found: true, evidence: "Docker used for dev, configuration, and MVP project environments. Not used in production deployment (EC2 direct). No Kubernetes." },
  { skill: "GetStream / WebSocket", found: false, evidence: "No real-time streaming, WebSocket, or GetStream experience confirmed." },
  { skill: "Twilio / Firebase", found: false, evidence: "No Twilio or Firebase confirmed. Novu used for notifications instead." },
  { skill: "Kubernetes", found: false, evidence: "No Kubernetes experience. Docker for dev only." },
  { skill: "Observability / APM", found: false, evidence: "Logging practices confirmed (detailed backend logs) but no Datadog, Sentry, or New Relic mentioned." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification. Junior developer's code. Candidate reviewed live with screen share during interview.",
  time: "~15 min",
  proficiency: "Intermediate",
  verdict: "Caught the right surface-level issues: better error logging, payload DTO typing, sensitive data (payment total) in logs, hardcoded URLs/IDs should move to env vars, missing null checks for user not found, SoC violations (business logic in controller), controller/service separation, notification service should be separate, enums for status and currency. Correctly identified DB transactions needed for the two-step charge + create-order flow — but only after Aditya prompted it. Performance improvements: admitted 'not sure' — weak close.",
  caught: [
    "Better error logging — log the actual error, not a generic message",
    "Payload DTO typing — add TypeScript types to request.body fields",
    "Sensitive data in logs — do not log payment total",
    "Hardcoded URLs and IDs — move to environment variables",
    "Missing null check — no handling for user not found",
    "Controller SoC violation — business logic (charge, create order, notify) belongs in service layer",
    "Notification logic belongs in a separate notification service",
    "Input validation should move to a middleware/validation layer",
    "Enums for order status and currency fields",
    "Stream closure + error handling for export log to prevent memory leaks",
  ],
  missed: [
    "Two-step charge + create-order atomicity — DB transaction needed to prevent charge-without-order on failure (identified only after being prompted)",
    "Performance improvements — no concrete suggestions when asked directly",
  ],
};


// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 7.5,
  "Domain": 6.0,
  "Communication": 6.0,
  "Problem Solving": 7.5,
  "Culture Fit": 7.5,
};

const findings = [
  "NestJS = TypeScript — no ambiguity. 5+ years at Codvo.ai across 7–8 projects. TypeScript confirmed in PR review (added DTO types, typed payload interfaces) and implicit in all NestJS production work.",
  "Architecture ownership is real but bounded: NestJS layer at Centric was a BFF aggregating internal microservices — not the microservices architect. 'NestJS serving as a middle layer to optimize data flow.' He implemented the auth/aggregation/API layer for 10K+ users. Single-employer, single-domain for 5 years.",
  "Stripe depth confirmed live: subscriptions, webhooks, billing automation, payment state reconciliation. Chose to explain it unprompted when asked about integrations — indicates genuine depth, not resume-stuffed.",
  "Redis distributed locks for multi-instance cron dedup proactively explained — non-trivial production pattern. Suggests he's worked with scale problems in practice, not just tutorials.",
  "PR review was solid but not exceptional. Caught surface and mid-level issues independently. Missed the charge + create-order atomicity issue until prompted. Performance improvements: 'not sure' — weak close. Aditya's assessment: 'moderate ownership level, can think about solutions to scenarios.'",
  "Communication is below senior bar: heavy filler ('uh', 'like'), verbose on simple answers, hedged on ownership questions. When pressed 'was this your ownership or mentorship?', answered 'I took significant ownership but always ask for team inputs.' Honest but signals IC disposition.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Jodhpur Institute of Engineering and Technology",
  degree: "B.Tech — Computer Science and Engineering, 2019",
  location: "Jodhpur, India",
  usEquivalent: "Bachelor of Science in Computer Science (4-year) — equivalent to a US BS CS degree",
  relevance: "4-year engineering degree. Standard CS background. Academic performance not reported on resume.",
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
          <div style={{ fontSize: 10, color: c.blue.txt, opacity: 0.7, marginTop: 1 }}>70% confidence</div>
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>⚠️ Scalable Architecture is a partial pass — BFF/aggregation layer ownership confirmed; core microservices architect role not evidenced.</div>
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~62 min · Transcript verified · Conducted by Aditya Panchal</div>
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
            ["Naukri (Sr. Node.js, 5+ YOE, India)", "$21,000 – $33,000", "India market median (~18L–28L)"],
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
              <strong>Note:</strong> Confirm CTC and expectation before presenting to client. Single-employer for 5 years — expectation may be conservative relative to market.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function GaurangTalentProfile() {
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
