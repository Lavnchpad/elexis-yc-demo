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
  name: "Mohsin Khan",
  title: "Node.js Developer",
  company: "Agnitimba Private Limited",
  location: "Noida, Uttar Pradesh, India",
  status: "Open to Opportunities",
  noticePeriod: "To be confirmed",
  yoe: "3.9 years",
};

const role = {
  company: "US-Based Company",
  title: "Senior Node.js Developer",
  team: "Backend Engineering Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 52,
  bullets: [
    "NestJS + TypeScript confirmed — not a skills-list claim. 3.9 years across iByte Informatics (3y4m) and Agnitimba (5mo). Firebase push notifications confirmed across 4–5 projects in work output and interview.",
    "Social domain is a genuine hit: Phronesis social media app (friends, posts, stories, Firebase real-time chat, Agora audio/video calling). Delivery apps (Car Courier, Ntlob) add marketplace-adjacent patterns — user/driver matching, job routing, Google Places/Distance Matrix integration.",
    "Critical gap — architecture: primary 3y4m tenure at iByte is monolith NestJS. Microservices exposure is only at Agnitimba (5 months), a startup still experimenting between EC2+Docker and ECS. No distributed systems design, no Kubernetes, no service mesh.",
    "AWS breadth is real but integrations-level: EC2, S3, Lambda, EventBridge, IVS, Cognito, CloudWatch, SNS — all confirmed in work output. Not infrastructure ownership, but production integration experience across 6+ AWS services.",
    "Communication is a material risk for a US client-facing role: heavy filler words, verbose on simple answers, loses coherence on technical explanations, asked mid-interview if he could switch to Hindi. The transcript is difficult to parse throughout.",
    "YOE is exactly at the floor (3.9 years — self-confirmed). No buffer. Title is 'Node.js Developer', not senior. The profile reads mid-level, not senior.",
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
      detail: "TypeScript return type annotations, void type for notification function, `any` type flagged and replaced — all raised independently. Demonstrated TypeScript-first thinking throughout PR review. NestJS = TypeScript; 3.9 years NestJS in production.",
    },
    interview: {
      status: "confirmed",
      note: "NestJS confirmed as primary backend framework across all projects at iByte and Agnitimba. TypeScript listed explicitly in resume skills. Implicit in all NestJS work — not a secondary skill.",
    },
    confidence: "high",
  },
  {
    skill: "REST / GraphQL API Design",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: {
      status: "confirmed",
      detail: "Discussed input validation, consistent API response format (success/data wrapper), controller SoC, and proper HTTP response patterns. REST API design understanding confirmed through the PR review context.",
    },
    interview: {
      status: "confirmed",
      note: "RESTful APIs confirmed across all projects — Phronesis (auth, friends, posts, stories), Car Courier (ordering, delivery), My Abhyasa (learning/exam APIs), Livewired (stream management). REST-only — no GraphQL mentioned in resume or interview. GraphQL gap is a note, not a knockout.",
    },
    confidence: "medium",
  },
  {
    skill: "Scalable Architecture",
    passed: null,
    resume: { sections: ["Experience"], signal: "moderate" },
    prReview: {
      status: "moderate",
      detail: "Good SoC instincts: notification logic → notification service, analytics logging → logs service — both flagged independently. Fire-and-forget async for notifications. Promise.all for parallel independent calls. IC-level architectural patterns, not systems design.",
    },
    interview: {
      status: "partial",
      note: "Primary work at iByte (3y4m) is monolith NestJS — solo backend developer on individual product apps. Microservices only at Agnitimba (5 months), a startup 'experimenting' between EC2+Docker and ECS — deployment was not fixed. No Kubernetes, no service discovery, no distributed transaction patterns. Solo ownership at iByte is real but it's monolith ownership.",
    },
    confidence: "low",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Social / Marketplace Backend",
    met: true,
    level: "Intermediate",
    note: "Phronesis (social media): RESTful APIs for auth, friends, posts, stories. Firebase real-time chat. Agora audio/video calling. Deployed on AWS. Car Courier + Ntlob (delivery marketplace): user/driver job routing, product ordering, delivery management, Google Places/Distance Matrix APIs, Firebase push notifications. Best domain coverage in this batch for this role.",
    risk: "low",
  },
  {
    skill: "Real-time / Event-driven",
    met: true,
    level: "Intermediate",
    note: "Socket.IO confirmed in Livewired — used specifically for app-kill detection (connection drop = stream stop = save timestamp). Firebase real-time confirmed across multiple projects for live stream status and chat. AWS EventBridge + Lambda (Livewired): EventBridge triggers Lambda on stream start/stop events. Not RabbitMQ/Kafka level but real production real-time patterns.",
    risk: "medium",
  },
  {
    skill: "Auth + Security",
    met: true,
    level: "Intermediate",
    note: "JWT listed in skills and confirmed in use. AWS Cognito confirmed in Livewired — OTP/SMS via SNS with per-country permissions navigated. Authorization discussion in PR review showed understanding of auth middleware, protected routes, and user ID extraction from auth context. Not deep security engineering, but standard production auth patterns confirmed.",
    risk: "low",
  },
  {
    skill: "Cloud Platform (AWS)",
    met: true,
    level: "Intermediate",
    note: "EC2, S3, Lambda, EventBridge, IVS (Interactive Video Service), Cognito, CloudWatch, SNS — all confirmed in work output across multiple projects. CloudWatch logging for monitoring confirmed. AWS IVS (live streaming) is a specialized service — navigating it solo as a junior developer is a credible signal. Integrations-level ownership, not infrastructure/DevOps ownership.",
    risk: "low",
  },
  {
    skill: "CI/CD + Containerization",
    met: true,
    level: "Developing",
    note: "Docker confirmed — Dockerized services deployed on EC2. ECS with dockerization mentioned at Agnitimba (5 months, still being set up). Tag-release versioning (4.2.1 → 4.2.2 → patch) described for deployment strategy. Dev + prod environment separation with QA gate before prod deploy. No CI/CD pipeline tooling (GitHub Actions, CircleCI) explicitly confirmed.",
    risk: "medium",
  },
  {
    skill: "Third-party API Portfolio",
    met: true,
    level: "Intermediate",
    note: "Firebase (notifications across 4–5 projects, real-time chat, data storage). Agora (audio/video calling). Google Places + Distance Matrix APIs (location-based delivery). AWS S3, Lambda, EventBridge, IVS, Cognito, SNS. TypeORM with PostgreSQL. Good breadth — narrower depth per integration than ideal, but production-confirmed across 6+ third-party systems.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "Firebase (Notifications + Chat)", found: true, evidence: "Push notifications in 4–5 projects confirmed. Firebase real-time chat in Phronesis. Firebase data storage in Livewired. Deepest third-party integration in the portfolio." },
  { skill: "Socket.IO", found: true, evidence: "Used in Livewired for connection-drop detection (app kill → stream stop → save end timestamp). Production use case confirmed, not tutorial." },
  { skill: "AWS IVS (Live Streaming)", found: true, evidence: "AWS Interactive Video Service integrated in Livewired. Replaced Agora/ZEGOCLOUD for security reasons. Handled stream state via EventBridge → Lambda pipeline." },
  { skill: "Google Places / Distance Matrix", found: true, evidence: "Location APIs integrated in Car Courier and Ntlob delivery apps. Driver/user location matching and routing." },
  { skill: "Agora (Audio/Video)", found: true, evidence: "Audio/video calling in Phronesis social media app. Deployed on AWS." },
  { skill: "TypeORM + PostgreSQL", found: true, evidence: "TypeORM with PostgreSQL confirmed at both iByte and Agnitimba. Migration strategy (add column nullable, backfill, make required, drop old) explained correctly in interview." },
  { skill: "AWS Cognito", found: true, evidence: "Cognito for authentication in Livewired. OTP/SMS via SNS with per-country permission management navigated." },
  { skill: "GraphQL", found: false, evidence: "No GraphQL mentioned in resume or interview. REST-only API design across all projects." },
  { skill: "Kubernetes / ECS (Production)", found: false, evidence: "ECS experimented at Agnitimba (5 months, not deployed to prod). No Kubernetes. Docker for dev and EC2 deployments confirmed." },
  { skill: "Message Queues (RabbitMQ / BullMQ)", found: false, evidence: "No message queue infrastructure confirmed. Event-driven patterns are Socket.IO + Firebase + EventBridge (AWS managed), not application-layer queuing." },
  { skill: "Redis (Caching)", found: false, evidence: "No Redis mentioned in resume or interview." },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "Order Processing Controller — PR Review",
  context: "Multi-function controller handling charge + order creation + notification. Junior developer's code. Candidate reviewed via screen share after receiving code via Teams chat.",
  time: "~25 min",
  proficiency: "Intermediate",
  verdict: "Solid intermediate-level review. Caught a good surface set independently: missing input validation, DTO typing, Promise.all for parallel async, enum for status/currency, consistent response format, error.message over static string, env vars for hardcoded keys, notification → notification service (SoC), logs → logs service (SoC), TypeScript `any` removal, function return types, and fire-and-forget for notification. Transaction atomicity needed Aditya's prompt but his solution (reorder: create order pending → charge → update paid) was architecturally correct. Communication during the review was verbose and hard to follow — took time to understand what he was pointing at.",
  caught: [
    "Missing input validation — validate all required fields before processing",
    "TypeScript DTO typing — add interfaces to request.body",
    "Promise.all for parallel independent async calls (charge + data fetch are independent)",
    "Enum for order status — replace hardcoded string with enum",
    "Enum for currency — especially important for multi-country support",
    "Consistent API response format — success/data wrapper for frontend consistency",
    "Use error.message instead of static 'order failed' string",
    "Hardcoded API keys/URLs → environment variables",
    "Notification logic → separate notification service (SoC violation)",
    "Log analytics → separate logs service (SoC violation)",
    "Remove `any` type — replace with proper TypeScript types",
    "Function return type annotations (void for notification, typed for processOrder)",
    "Fire-and-forget notification (remove await — correct async-first thinking)",
  ],
  missed: [
    "Transaction atomicity on charge + create-order — needed Aditya to prompt 'what if one fails?' (correctly solved via pending→charge→paid reordering, but not independent)",
    "Communication during review was difficult to follow — verbose, lost the thread multiple times, unclear what specific line he was pointing to",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 6.5,
  "Domain": 7.0,
  "Communication": 5.5,
  "Problem Solving": 6.5,
  "Culture Fit": 7.0,
};

const findings = [
  "NestJS + TypeScript confirmed across 3.9 years. Firebase integrations in 4–5 projects — deepest third-party skill. AWS IVS, EventBridge, Cognito — broad AWS exposure for someone with under 4 years. But the framework is the same (NestJS) and the architecture is monolith throughout primary tenure.",
  "Social domain is real: Phronesis social media app has friends, posts, stories, Firebase real-time chat, and Agora audio/video. Delivery app (Car Courier/Ntlob) has marketplace-adjacent patterns. This is the best domain coverage in this batch for the role — but the depth is IC-contributor level on relatively small-scale apps, not platform-scale.",
  "Architecture gap is significant. Solo backend developer at iByte (3y4m) = owned schema, APIs, and deployment on monolith NestJS apps. Microservices claimed at Agnitimba (5 months) — but the company was 'experimenting' between EC2 and ECS, still undecided. No distributed systems design, no service orchestration, no Kubernetes.",
  "Migration question: handled well. Correctly described add-column-nullable → backfill → update-frontend → make-required → drop-old-columns pattern. S3 backup before migration + migration down query for rollback — production-tested knowledge. One of the stronger answers in the interview.",
  "PR review was good for mid-level. Caught validation, typing, SoC, async patterns, enums, env vars, fire-and-forget notification independently. Transaction atomicity needed a prompt, but his reordering solution (pending → charge → paid) was correct. Reviewed slowly and verbosely but the technical instincts were sound.",
  "Communication is the clearest risk signal. Heavy filler throughout, frequent loss of thread during explanations, asks Aditya to clarify what he's describing mid-sentence, asked mid-interview 'Can I speak in Hindi?' — the US team's transcript will be hard to parse. This is a real gap for an async-remote US client role.",
  "Production incident question: gave a generic process answer (logging, rollback, tag release) — could not recall a specific incident with root cause and resolution. Signals limited exposure to production failures at scale.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Dr. A.P.J Abdul Kalam Technical University",
  degree: "B.Tech — Computer Science and Engineering, 2019",
  location: "Lucknow, Uttar Pradesh, India",
  usEquivalent: "Bachelor of Science in Computer Science (4-year) — equivalent to a US BS CS degree",
  relevance: "4-year state technical university in Uttar Pradesh. Tier 2 institution nationally. Standard CS curriculum. Academic performance not reported on resume.",
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
      <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 8, padding: mobile ? "8px 12px" : "7px 14px", marginBottom: 12, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 4 : 0 }}>
        <span style={{ fontSize: mobile ? 11 : 12, color: c.amber.txt }}>Scored against: <strong>{role.company} — {role.title}</strong> · {role.team}</span>
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
        <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.amber.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.amber.txt, lineHeight: 1.2, marginTop: 2 }}>Partial Fit</div>
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.8, marginTop: 1 }}>52% confidence</div>
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
                  <Pill color={m.interview?.status === "confirmed" ? c.green.txt : m.interview?.status === "partial" ? c.amber.txt : c.amber.txt} bg={m.interview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Interview: {m.interview?.status}</Pill>
                </div>
                {m.prReview?.detail && <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.4, marginBottom: 3 }}>{m.prReview.detail}</div>}
                {m.interview?.note && <div style={{ fontSize: 10, color: c.g[500], fontStyle: "italic", lineHeight: 1.35 }}>{m.interview.note}</div>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontStyle: "italic", marginTop: 4 }}>⚠️ Scalable Architecture is a partial pass — primary 3y4m work is monolith NestJS at iByte. Microservices exposure is only 5 months at a startup still experimenting with deployment. No distributed systems, no Kubernetes.</div>
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="PARTIAL FIT" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~56 min · Transcript verified · Conducted by Aditya Panchal</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 6, marginBottom: mobile ? 14 : 10, background: mobile ? c.g[50] : "transparent", borderRadius: 8, padding: mobile ? "12px 8px" : 0 }}>
        {Object.entries(interviewScores).map(([area, val]) => {
          const label = val >= 9 ? "Excellent" : val >= 8 ? "Strong" : val >= 7 ? "Good" : val >= 6 ? "Developing" : "Weak";
          const color = val >= 8 ? c.teal.acc : val >= 7 ? c.amber.txt : val >= 6 ? c.amber.txt : c.red.txt;
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
          <Section icon="💰" title="COMPENSATION" badge="Likely Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>CLIENT BUDGET (Senior Node.js · India Remote)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$18,000 – $26,000 / yr</div>
          {[
            ["Naukri (Node.js, ~4 YOE, India)", "$13,000 – $20,000", "India market median (~11L–17L for this level)"],
            ["US equivalent (Mid-level Node.js)", "$80,000 – $110,000", "SF/NY tech market, comparable scope"],
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
          <div style={{ background: c.green.bg, border: `1px solid ${c.green.brd}`, borderRadius: 6, padding: "7px 10px", marginTop: 8 }}>
            <div style={{ fontSize: 10.5, color: c.green.txt }}>
              <strong>Note:</strong> At mid-level seniority (~4 YOE), market expectation is likely below budget ceiling. Confirm CTC and expectation — compensation is probably not a blocker, but the fit question (architecture depth + communication) is.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function MohsinTalentProfile() {
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
