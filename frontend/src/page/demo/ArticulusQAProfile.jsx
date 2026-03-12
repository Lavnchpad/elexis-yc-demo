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
  name: "Anjali S.",
  title: "Senior QA Engineer",
  company: "HealthSync Technologies",
  location: "Bangalore, India",
  github: "anjali-qa",
  status: "Open to Opportunities",
  noticePeriod: "30 days",
  yoe: "6+ years",
};

const role = {
  company: "Articulus Surgical",
  title: "Senior QA Engineer",
  team: "Product Quality & Engineering",
};

const recommendation = {
  verdict: "Strong Fit",
  confidence: 85,
  bullets: [
    "Full automation stack ownership confirmed — Cypress (web) + Appium (mobile) + Newman (API in CI). Built from 0 to 800+ automated tests at HealthSync in 14 months. Not framework familiarity — production automation authorship.",
    "Healthcare domain depth is the primary differentiator. HIPAA-aware test design, audit trail validation, and patient data masking in staging environments are directly applicable to Articulus Surgical's regulated product surface.",
    "API testing is production-grade: Postman collections under version control, Newman integrated into GitHub Actions pipeline, 300+ API test cases covering auth, error handling, data integrity, and edge states across 3 microservices.",
    "Mobile coverage via Appium + BrowserStack real-device farm — 15+ device/OS combinations tested. Covers iOS and Android for Articulus's surgical workflow app requirements.",
    "Test task performance was strong: identified 7 of 8 edge cases in the API defect scenario, produced clean Jira-style defect reports, and documented regression risk proactively. Missed one timezone boundary condition — minor.",
    "Salary expectation ₹14L–₹16L (~$16.8K–$19.2K) is comfortably within senior QA range for Bangalore. Financial fit confirmed.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Manual Testing & Test Case Design",
    passed: true,
    resume: { sections: ["Experience", "Skills"], signal: "strong" },
    testTask: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Produced 23 test cases covering happy path, negative, boundary, and accessibility scenarios for the appointment booking flow. Organized by priority. No prompting required for edge case expansion.",
      evidence: "Defect write-ups followed standard Jira format with severity, steps, expected vs actual. Regression risk explicitly called out.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "test-case-templates repo: structured test plans for auth, booking, and notification modules. Gherkin-format BDD specs in 3 repos.",
      evidence: "Documentation quality above average for a QA portfolio.",
    },
    confidence: "high",
  },
  {
    skill: "Automation (Cypress + Appium)",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    testTask: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Described automation framework architecture unprompted — Page Object Model, custom Cypress commands, data-driven test patterns. Appium setup discussed with specifics (capabilities, WDA, UIAutomator2).",
      evidence: "HealthSync automation suite: 0 to 800+ tests in 14 months. 70% reduction in manual regression time.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "cypress-web-automation (42★): full POM framework, GitHub Actions CI, Allure reports. appium-mobile-tests: iOS + Android parallel execution setup.",
      evidence: "Most starred QA automation repo across all candidates reviewed.",
    },
    confidence: "very_high",
  },
  {
    skill: "API Testing (Postman + Newman)",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    testTask: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Identified API-level defect: incorrect HTTP status code (200 vs 422) on invalid patient ID. Called out missing auth header validation and lack of rate limiting test coverage.",
      evidence: "Proposed Newman CLI integration into CI pipeline during discussion — not prompted.",
    },
    github: {
      active: true,
      proficiency: "Advanced",
      detail: "api-testing-framework: Postman collections, Newman CI integration, environment variable management for staging/prod. 300+ requests across 3 microservice test suites.",
      evidence: "Under version control with PR history — professional workflow.",
    },
    confidence: "very_high",
  },
  {
    skill: "Bug Tracking & QA Process (Jira/Zephyr)",
    passed: true,
    resume: { sections: ["Experience", "Skills"], signal: "strong" },
    testTask: {
      status: "strong",
      proficiency: "Advanced",
      detail: "Test task defect reports followed Zephyr-compatible format. Defect severity classification was accurate. Test coverage matrix mapped to user stories — demonstrates QA process ownership, not just execution.",
      evidence: "Managed QA workflows for 3 squads at HealthSync. Triage lead for 2 sprint cycles.",
    },
    github: {
      active: true,
      proficiency: "Intermediate",
      detail: "READMEs reference Jira integration in automation pipelines. Test run summaries in CI artifacts.",
      evidence: "Process documentation present across public repos.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Mobile Testing (iOS + Android)",
    met: true,
    level: "Advanced",
    note: "Appium with real-device testing via BrowserStack — 15+ device/OS combinations. Covered iOS 15–17 and Android 12–14. Parallel execution configured. Direct match for Articulus Surgical's mobile workflow app.",
    risk: "low",
  },
  {
    skill: "Healthcare / Regulated Domain",
    met: true,
    level: "Advanced",
    note: "HIPAA-aware test design at HealthSync — patient data masking in staging, audit trail validation, role-based access testing. Understands what 'test without real PII' means operationally. Strongest domain signal in this pool.",
    risk: "low",
  },
  {
    skill: "CI/CD Integration",
    met: true,
    level: "Advanced",
    note: "GitHub Actions pipeline running Cypress + Newman on every PR. Jenkins for nightly Appium regression. Allure reporting integrated for test history. Automation triggers on merge to main and staging branches.",
    risk: "low",
  },
  {
    skill: "Performance / Load Testing",
    met: true,
    level: "Intermediate",
    note: "JMeter for API load scenarios, K6 for endpoint stress tests. Identified a 3-second p95 regression in the appointment booking API before production release. Not primary specialty — functional and mobile are the depth areas.",
    risk: "medium",
  },
  {
    skill: "Regression & Smoke Suite Ownership",
    met: true,
    level: "Advanced",
    note: "Owns full regression cycle at HealthSync — sprint-end regression, hotfix smoke, and release gate checklists. Defined the test pyramid structure for 3 squads. Reduced regression cycle from 4 days to 6 hours via automation.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "BDD / Gherkin", found: true, evidence: "Cucumber + Gherkin specs in 3 GitHub repos. Collaborated with PMs on acceptance criteria → test case translation at HealthSync." },
  { skill: "SQL / DB Testing", found: true, evidence: "Database assertion layer in API test framework. Direct SQL validation for appointment records, user role assignments, and audit log entries." },
  { skill: "Accessibility Testing", found: true, evidence: "WCAG 2.1 AA checklist used during manual testing cycles. axe-core integrated into Cypress suite for automated a11y scans." },
  { skill: "Security Testing Basics", found: true, evidence: "Auth bypass scenarios in manual test cases. Postman collections include token expiry, invalid JWT, and IDOR test cases." },
  { skill: "Cross-Browser Testing", found: true, evidence: "BrowserStack Automate for cross-browser Cypress runs — Chrome, Firefox, Safari, Edge. Multi-browser parity tracked in test reports." },
  { skill: "Test Documentation (Confluence)", found: true, evidence: "QA runbooks, onboarding docs, and test strategy documents authored in Confluence at HealthSync. Handed off complete documentation to junior QA." },
];

// ─── TEST TASK ───
const testPrompts = [
  {
    id: 1,
    title: "API Defect Analysis + Test Case Design",
    skill: "API Testing / Manual",
    tier: "Must-Have",
    prompt: "Review a buggy patient appointment booking API response. Write test cases to catch this class of defect. Identify boundary conditions, error states, and regression risks for the booking flow.",
    time: "~35 min",
    lookups: "None",
    proficiency: "Advanced",
    verdict: "Identified 7 of 8 edge cases without prompting — missed the timezone boundary condition for appointments scheduled across DST transitions. API defect (200 vs 422 on invalid patient ID) was caught immediately and documented with correct severity. Test cases were organized by priority with clear expected vs actual format. Regression risk section was added unprompted — signals QA ownership mindset, not just execution. Defect write-up quality was production-ready.",
    flags: [
      "Missed DST timezone boundary condition — appointments spanning daylight saving transitions not covered in initial test suite. Low-severity gap; callable in onboarding.",
    ],
  },
];

// ─── INTERVIEW ───
const interviewScores = { "Tech Depth": 8.5, "Domain": 8.0, "Comms": 9.0, "Problem Solving": 8.0, "Culture Fit": 8.5 };

const findings = [
  "Healthcare domain knowledge is production-depth, not conceptual. Patient data masking, audit trail validation, and role-based access testing at HealthSync directly maps to Articulus Surgical's regulatory and compliance exposure. This isn't from a course — it's from building QA processes at a health-tech startup.",
  "Automation framework design was discussed without prompting. Described the decision to migrate from Selenium to Cypress (load time, auto-retry, network stubbing), Appium setup trade-offs between UIAutomator2 and XCUITest drivers, and why Allure was chosen over ExtentReports for stakeholder visibility.",
  "Communication and stakeholder clarity are the strongest non-technical signals. Can explain test coverage gaps in non-technical language — demonstrated live during interview. Wrote a QA strategy memo for a VP of Engineering at HealthSync and brought it up voluntarily.",
  "Regression ownership mindset confirmed: described the test pyramid structure introduced at HealthSync (70% unit, 20% integration, 10% E2E) and the ROI calculation presented to justify automation investment. QA as an engineering discipline, not a support function.",
  "One flag: performance testing depth is limited to JMeter and K6 for API scenarios. Has not run full load tests on UI-layer or surgical device telemetry data streams. Manageable — gap is in scope, not skill.",
  "Proactively asked about Articulus Surgical's device integration test surface (surgical hardware + mobile app) during the interview. Genuine curiosity about the domain — not just answering questions.",
];

// ─── EDUCATION ───
const edu = {
  institution: "PES University",
  degree: "B.E. Computer Science & Engineering, 2018",
  tier: "4-year B.E. (Engineering)",
  score: "7.8 / 10 CGPA",
  location: "Bangalore, India",
  comparable: "Bachelor's degree (US) / BEng (UK)",
  relevance: "Tier 2 engineering college, Bangalore. Strong CS fundamentals. ISTQB Foundation Level certified (2020). Supplemented with Udemy courses in Cypress, Appium, and API automation.",
  course: "ISTQB Foundation Level (2020) · Cypress Advanced (Udemy, 2021) · Appium Mobile Automation (2022)",
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} QA</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.teal.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.teal.txt, lineHeight: 1.2, marginTop: 2 }}>Strong Fit</div>
          <div style={{ fontSize: 10, color: c.teal.txt, opacity: 0.7, marginTop: 1 }}>85% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="✅" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} badgeColor={c.teal} />
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
              {m.testTask?.proficiency && m.testTask.status !== "n/a" && <Pill color={profC[m.testTask.proficiency]?.txt} bg={profC[m.testTask.proficiency]?.bg}>Task: {m.testTask.proficiency}</Pill>}
            </div>
            {m.testTask?.status !== "n/a" && m.testTask?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.testTask.detail}</div>}
            {m.testTask?.status === "n/a" && <div style={{ fontSize: 11, color: c.g[400], fontStyle: "italic" }}>{m.testTask.detail}</div>}
            {m.testTask?.evidence && m.testTask.status !== "n/a" && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.testTask.evidence}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "160px 90px 1fr 1fr 70px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "TEST TASK", "GITHUB", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>
          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 90px 1fr 1fr 70px", padding: "7px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}` }}>
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
                {m.testTask?.status === "n/a" ? (
                  <span style={{ fontSize: 10, color: c.g[400], fontStyle: "italic" }}>{m.testTask.detail}</span>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: m.testTask?.status === "strong" ? c.green.txt : c.amber.txt }}>{m.testTask?.status === "strong" ? "✓" : "~"}</span>
                      {m.testTask?.proficiency && <Pill color={profC[m.testTask.proficiency]?.txt} bg={profC[m.testTask.proficiency]?.bg}>{m.testTask.proficiency}</Pill>}
                    </div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.testTask?.detail}</div>
                    {m.testTask?.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.testTask.evidence}</div>}
                  </>
                )}
              </div>
              <div>
                {m.github?.active ? (
                  <>
                    <div style={{ marginBottom: 2 }}><Pill color={profC[m.github.proficiency]?.txt} bg={profC[m.github.proficiency]?.bg}>{m.github.proficiency}</Pill></div>
                    <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.35 }}>{m.github.detail}</div>
                    {m.github.evidence && <div style={{ fontSize: 9, color: c.g[400], fontStyle: "italic", marginTop: 1 }}>{m.github.evidence}</div>}
                  </>
                ) : <span style={{ fontSize: 10, color: c.g[400] }}>—</span>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
      <div style={{ background: c.green.bg, border: `1px solid ${c.green.brd}`, borderRadius: 6, padding: "6px 10px", marginTop: 6, fontSize: 10, color: c.green.txt }}>
        <strong>GitHub — anjali-qa:</strong> cypress-web-automation (42★), appium-mobile-tests, api-testing-framework. Active into Feb 2026. Healthcare-domain test cases and BDD specs present.
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
      <Section icon="⭐" title="BONUS SKILLS DETECTED" badge={`${extras.filter(e => e.found).length}/${extras.length} FOUND`} badgeColor={c.teal} />
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
        </div>
      </div>

      {/* TEST TASK */}
      <Section icon="📋" title="TEST TASK EVIDENCE" badge="1 task · ~35 min" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Role-specific API defect analysis and test case design.</div>
      {testPrompts.map(p => (
        <div key={p.id} style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "8px 14px", marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>Task {p.id}: {p.title}</span>
              <Pill color={c.teal.txt} bg={c.teal.bg}>{p.skill}</Pill>
              <Pill color={profC[p.proficiency].txt} bg={profC[p.proficiency].bg}>{p.proficiency}</Pill>
            </div>
            <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{p.time} · {p.lookups} doc lookups</span>
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="STRONG FIT" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>Transcript verified</div>
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
          <div style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 6, padding: "5px 10px", marginTop: 6, fontSize: 10.5, color: c.g[700] }}>
            + {edu.course}
          </div>
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="✓ Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>MARKET RATE (Senior QA Engineer · Bangalore)</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, marginBottom: 8 }}>$14,000 – $22,000 / yr</div>
          {[
            ["Naukri (Sr. QA, 5–7 YOE, Bangalore)", "₹10L–₹20L (~$12K–$24K)", "India market median"],
            ["LinkedIn (Automation QA, Bangalore)", "₹12L–₹22L (~$14.4K–$26K)", "Platform listings"],
            ["Candidate expectation", "₹14L–₹16L (~$16.8K–$19.2K)", "Stated to recruiter"],
            ["Candidate current CTC", "₹12L (~$14.4K)", "Confirmed"],
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
              <span style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700 }}>To be confirmed</span>
            </div>
            <div style={{ borderTop: `1px solid ${c.teal.brd}`, paddingTop: 4, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.teal.txt }}>Likely accepts at</span>
              <span style={{ fontFamily: mono, fontSize: 16, fontWeight: 800, color: c.teal.txt }}>~$17.5K</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── MAIN ───
export default function ArticulusQAProfile() {
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
            {[["Resume", true], ["GitHub", true], ["Test Task", true], ["Interview", true]].map(([label, on]) => (
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
