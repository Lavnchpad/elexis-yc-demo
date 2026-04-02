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
  name: "Arjun Nair",
  title: "Senior Mechanical Design Engineer",
  company: "Tata Elxsi",
  location: "Pune, Maharashtra, India",
  status: "Open to Opportunities",
  noticePeriod: "60 days",
  yoe: "7+ years",
};

const role = {
  company: "Indus Robotics",
  title: "Senior Mechanical Design Engineer",
  team: "Hardware & Robotics Team",
};

const recommendation = {
  verdict: "Strong Fit",
  confidence: 84,
  bullets: [
    "SolidWorks and CATIA confirmed in production work output across 4+ product programs at Tata Elxsi — automotive enclosures, industrial housings, and consumer electronics. CAD depth is not a skills-list claim; design review confirmed ability to identify tolerance stack-up issues and GD&T callout errors independently.",
    "GD&T fluency confirmed in both L1 and L2: resume shows ASME Y14.5 application across multiple programs, and the design review activity revealed correct identification of datum reference frame errors, missing flatness callouts, and projected tolerance zone requirements — all independently, without prompting.",
    "DFM is a real strength: led design-for-manufacturability reviews at Tata Elxsi for injection-molded enclosures and sheet metal brackets. Reduced tooling revision cycles on two programs by flagging draft angle and wall thickness issues before prototype stage. Cross-functional ownership with manufacturing and procurement.",
    "FEA depth is genuine: ran structural and thermal simulations in ANSYS and SolidWorks Simulation for load-bearing brackets and heat-sink assemblies. Correctly sized safety factors, identified stress concentration zones, and iterated design based on simulation output — not just running canned analyses.",
    "Communication is a standout for a technical candidate — explains design decisions in business terms (cost impact, lead time, tooling risk). Comfortable presenting to non-engineering stakeholders. No language barrier.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "CAD Proficiency (SolidWorks / CATIA)",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    designReview: {
      status: "confirmed",
      detail: "Identified tolerance stack-up issue in a bearing housing fit independently. Navigated assembly constraints without prompting.",
    },
    interview: {
      status: "confirmed",
      note: "SolidWorks (7 yrs) + CATIA V5 (3 yrs). Production drawings, BOMs, and release packages across 4 NPI programs.",
    },
    confidence: "high",
  },
  {
    skill: "GD&T + Engineering Drawing Standards",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    designReview: {
      status: "confirmed",
      detail: "Found 4 GD&T issues independently — flatness callout, datum frame order, projected tolerance zone, over-constrained position. Each explained with correct ASME Y14.5 rationale.",
    },
    interview: {
      status: "confirmed",
      note: "ASME Y14.5-2018 across all programs. MMC/LMC modifiers explained correctly. Trains junior engineers on GD&T at Tata Elxsi.",
    },
    confidence: "high",
  },
  {
    skill: "Design for Manufacturability (DFM / DFA)",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    designReview: {
      status: "confirmed",
      detail: "Flagged 3 DFM issues unprompted: draft angle, wall thickness sink risk, and undercut requiring side action. Offered redesign suggestions for each.",
    },
    interview: {
      status: "confirmed",
      note: "Led DFM reviews at Tata Elxsi for injection-molded and sheet metal parts. Reduced tooling revision cycles on two programs.",
    },
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "FEA / Structural Simulation",
    met: true,
    level: "Advanced",
    note: "ANSYS Mechanical + SolidWorks Simulation confirmed. Ran structural, modal, and thermal analyses. Sized safety factors, identified stress concentration zones, iterated geometry from results — not just canned setups.",
    risk: "low",
  },
  {
    skill: "New Product Development (NPI / NPD)",
    met: true,
    level: "Advanced",
    note: "Full NPI lifecycle across 4 programs — concept through production release. Owns deliverables at each gate. Managed a full redesign 6 weeks before launch after a supplier tooling failure and still delivered on schedule.",
    risk: "low",
  },
  {
    skill: "Sheet Metal + Injection Molding",
    met: true,
    level: "Intermediate",
    note: "Sheet metal: brackets and enclosure panels with correct bend allowances and relief notches. Injection molding: enclosure designs across 3 programs, DFM for wall thickness, draft angles, and gate locations.",
    risk: "low",
  },
  {
    skill: "Cross-functional Collaboration",
    met: true,
    level: "Advanced",
    note: "Works across manufacturing, procurement, quality, and supply chain. Attends supplier tooling reviews. Flags cost impact of design changes before finalizing — not siloed.",
    risk: "low",
  },
  {
    skill: "Technical Documentation / BOM Management",
    met: true,
    level: "Intermediate",
    note: "Maintains drawings, BOMs, and ECNs for all owned components. Uses Windchill and Teamcenter for document creation and routing.",
    risk: "low",
  },
  {
    skill: "Industry Domain (Automotive / Industrial)",
    met: true,
    level: "Advanced",
    note: "Automotive OEM programs (Tata Elxsi), industrial housings, and consumer electronics assemblies. Familiar with IP65/IP67 sealing, vibration/shock specs, and thermal constraints.",
    risk: "low",
  },
];

// ─── BONUS SKILLS ───
const extras = [
  { skill: "ANSYS Mechanical (FEA)", found: true, evidence: "Static structural, modal, and thermal analyses confirmed. Mesh sensitivity analysis and correct boundary condition setup explained in interview. Uses results to drive design iteration — not just simulation as a checkbox." },
  { skill: "SolidWorks Simulation", found: true, evidence: "Used alongside ANSYS for quick-turn structural checks. Comfortable with both tools depending on program requirements." },
  { skill: "Windchill / Teamcenter (PLM)", found: true, evidence: "Both PLM systems used across different programs. Creates, releases, and routes engineering documents and ECNs. Not system admin level — standard senior engineer usage." },
  { skill: "PFMEA / DVP&R", found: true, evidence: "Participates in PFMEA reviews with quality team. Familiar with DVP&R structure and has contributed to test plan development for design verification." },
  { skill: "IP-rating Sealing Design (IP65/IP67)", found: true, evidence: "Designed enclosure seal interfaces for IP65 and IP67 requirements — gasket selection, groove geometry, compression calculations confirmed in interview." },
  { skill: "Tolerance Stack-up Analysis", found: true, evidence: "Performs 1D worst-case and RSS tolerance stack-up analysis for critical fit interfaces. Confirmed in design review (identified bearing housing stack-up issue independently)." },
  { skill: "Supplier / Tooling Reviews", found: true, evidence: "Attends supplier tooling reviews for injection-molded and sheet metal components. Evaluates tooling design against design intent and flags issues before steel is cut." },
  { skill: "CATIA V5", found: true, evidence: "3 years CATIA V5 on Tata Elxsi automotive programs. Secondary to SolidWorks but confirmed in production work." },
  { skill: "CFD / Fluid Simulation", found: false, evidence: "No CFD or fluid dynamics simulation experience confirmed. Thermal analysis done via FEA (conduction/convection BC), not CFD." },
  { skill: "Composites / Advanced Materials", found: false, evidence: "No composite or advanced material design experience. Work has been primarily aluminum, steel, and engineering plastics." },
];

// ─── DESIGN REVIEW ───
const designReview = {
  title: "Injection-Molded Enclosure Drawing — Design Review",
  context: "Multi-view engineering drawing of a plastic enclosure with GD&T callouts, material spec, and mating interface dimensions. Candidate reviewed live with screen share. Assessor did not prompt which issues to look for.",
  time: "~20 min",
  proficiency: "Advanced",
  verdict: "Strongest review performance across this candidate batch. Found all four GD&T issues independently, flagged three DFM problems without prompting, and correctly identified the tolerance stack-up risk at the mating interface. Explanations were precise and referenced specific ASME Y14.5 clauses and injection molding process constraints. Offered redesign suggestions for each issue — not just identification. Assessor's note: 'This is what senior-level drawing review looks like.'",
  caught: [
    "Missing flatness callout on primary mating surface — identified as a functional requirement given the sealing interface",
    "Incorrect datum reference frame order — B before A in position callout violates setup sequence",
    "Missing projected tolerance zone for threaded insert — required per ASME Y14.5 for floating fasteners",
    "Over-constrained position callout — redundant datum reference creating inspection ambiguity",
    "Insufficient draft angle on side wall (1° — should be 2° minimum for this material)",
    "Wall thickness 1.2mm in one section — below minimum for sink mark prevention at this gate location",
    "Undercut on internal rib — requires side action in tool, adds tooling cost and lead time",
    "Tolerance stack-up risk at bearing housing interface — identified worst-case gap condition",
  ],
  missed: [
    "Surface finish callout missing on one exterior face — minor omission, caught on second pass when assessor pointed to that area",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 8.5,
  "Domain": 8.0,
  "Communication": 7.0,
  "Problem Solving": 8.0,
  "Culture Fit": 7.5,
};

const findings = [
  "CAD depth is production-grade: 7 years SolidWorks, 3 years CATIA V5. Four full NPI programs completed through production release. Parametric modeling, top-down assembly design, and drawing release processes all confirmed in work output and demonstrated live in the design review.",
  "GD&T fluency is at teaching level — has trained junior engineers at Tata Elxsi. Design review confirmed ASME Y14.5-2018 application correctly and independently: datum reference frames, tolerance zones, and modifier usage all explained with correct rationale. This is rare at any experience level.",
  "DFM is a genuine differentiator. Led DFM reviews for injection-molded enclosures and sheet metal components. Flagged draft angle, wall thickness, and undercut issues in the design review without prompting, and offered specific redesign suggestions. Has measurable program impact: reduced tooling revision cycles on two programs.",
  "FEA depth goes beyond checkbox simulation. Mesh sensitivity analysis, boundary condition setup, safety factor sizing, and stress concentration identification — all explained correctly in interview. Iterates geometry based on results. ANSYS Mechanical + SolidWorks Simulation both confirmed.",
  "Communication is notably strong for a mechanical engineer. Explains design decisions in business terms (cost impact, lead time, tooling risk). Comfortable presenting to non-engineering stakeholders. No language barrier. Would represent the client well in supplier and customer-facing settings.",
  "One program under pressure: supplier tooling failure 6 weeks before launch required a redesign and re-validation. Managed the redesign, re-ran FEA, coordinated with the replacement supplier, and delivered on the revised timeline. Demonstrates ownership under pressure — not just steady-state performance.",
];

// ─── EDUCATION ───
const edu = {
  institution: "Veermata Jijabai Technological Institute (VJTI)",
  degree: "B.E. — Mechanical Engineering, 2017",
  location: "Mumbai, Maharashtra, India",
  cgpa: "8.4 / 10",
  naac: "A+",
  usEquivalent: "Bachelor of Science in Mechanical Engineering (4-year) — equivalent to a US BS ME degree. VJTI is a Tier-1 autonomous engineering institute affiliated with Mumbai University.",
  relevance: "Tier-1 mechanical engineering program. Strong fundamentals in machine design, thermodynamics, and manufacturing processes. Graduated 2017, directly into product design roles.",
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} Mechanical Design</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.green.bg, border: `1px solid ${c.green.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.green.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.green.txt, lineHeight: 1.2, marginTop: 2 }}>Strong Fit</div>
          <div style={{ fontSize: 10, color: c.green.txt, opacity: 0.7, marginTop: 1 }}>84% confidence</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <Section icon="✅" title="RECOMMENDATION" badge={`${recommendation.verdict} · ${recommendation.confidence}% Confidence`} badgeColor={c.green} />
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
              <Pill color={m.designReview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.designReview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Design Review: {m.designReview?.status}</Pill>
            </div>
            {m.designReview?.detail && <div style={{ fontSize: 11, color: c.g[500], lineHeight: 1.45, marginBottom: 4 }}>{m.designReview.detail}</div>}
            {m.interview?.note && <div style={{ fontSize: 10.5, color: c.g[700], background: c.g[100], borderRadius: 4, padding: "4px 8px", marginTop: 4 }}>{m.interview.note}</div>}
          </div>
        ))
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "190px 90px 1fr 60px", padding: "5px 8px", background: c.g[100], borderRadius: "6px 6px 0 0" }}>
            {["MUST-HAVE", "RESUME", "DESIGN REVIEW + INTERVIEW", "CONF."].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontFamily: mono, fontWeight: 700, color: c.g[500] }}>{h}</span>
            ))}
          </div>
          {musts.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "190px 90px 1fr 60px", padding: "8px 8px", background: i % 2 ? c.g[50] : "#fff", borderBottom: `1px solid ${c.g[100]}`, alignItems: "start" }}>
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
                  <Pill color={m.designReview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.designReview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Review: {m.designReview?.status}</Pill>
                  <Pill color={m.interview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.interview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Interview: {m.interview?.status}</Pill>
                </div>
                {m.designReview?.detail && <div style={{ fontSize: 10, color: c.g[700], lineHeight: 1.4, marginBottom: 3 }}>{m.designReview.detail}</div>}
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
      <Section icon="⭐" title="BONUS SKILLS DETECTED" badge={`${extras.filter(e => e.found).length}/${extras.length} FOUND`} badgeColor={c.green} />
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

      {/* DESIGN REVIEW */}
      <Section icon="📐" title="DESIGN REVIEW ACTIVITY" badge="~20 min · Screen Share" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 8px" }}>Live review of a multi-view engineering drawing. Candidate identified issues independently — assessor did not indicate what to look for.</div>
      <div style={{ background: c.g[50], border: `1px solid ${c.g[200]}`, borderRadius: 8, padding: mobile ? "12px 14px" : "10px 14px", marginBottom: 6 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: mobile ? 6 : 0, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: mobile ? 12 : 11, color: c.g[900] }}>{designReview.title}</span>
            <Pill color={profC[designReview.proficiency].txt} bg={profC[designReview.proficiency].bg}>{designReview.proficiency}</Pill>
          </div>
          <span style={{ fontSize: mobile ? 10 : 9, fontFamily: mono, color: c.g[400] }}>{designReview.time}</span>
        </div>
        <div style={{ fontSize: 11, color: c.g[400], marginBottom: 6, fontStyle: "italic" }}>{designReview.context}</div>
        <div style={{ fontSize: mobile ? 12 : 11.5, color: c.g[700], lineHeight: 1.55, marginBottom: 8 }}>{designReview.verdict}</div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.green.txt, marginBottom: 4 }}>CAUGHT INDEPENDENTLY</div>
            {designReview.caught.map((item, i) => (
              <div key={i} style={{ fontSize: 10, color: c.g[700], lineHeight: 1.5, display: "flex", gap: 5, marginBottom: 2 }}>
                <span style={{ color: c.green.txt, flexShrink: 0 }}>✓</span> {item}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.amber.txt, marginBottom: 4 }}>MISSED / PROMPTED</div>
            {designReview.missed.map((item, i) => (
              <div key={i} style={{ fontSize: 10, color: c.amber.txt, background: c.amber.bg, padding: "4px 8px", borderRadius: 4, marginBottom: 4 }}>⚠ {item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: mobile ? 20 : 14 }} />

      {/* INTERVIEW */}
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="STRONG FIT" badgeColor={c.green} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~55 min · Transcript verified · Conducted by Elexis Assessor</div>
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
          {[["Location", edu.location], ["CGPA", edu.cgpa], ["NAAC Grade", edu.naac]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "3px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500], flexShrink: 0 }}>{l}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <div>
          <Section icon="💰" title="COMPENSATION" badge="Within Budget" badgeColor={c.green} />
          <div style={{ fontFamily: mono, fontSize: 10, color: c.g[500], marginBottom: 4 }}>CLIENT BUDGET (Sr. Mech. Design Engineer · Pune / Hybrid)</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>18L – 28L / yr</div>
          {[
            ["Naukri (Sr. Mech. Design, 7+ YOE, Pune)", "17L – 27L", "India market median"],
            ["Candidate current CTC", "22L / yr", "Based on 40+ market data points"],
            ["Candidate closes at", "26L – 28L", "Based on profile + market"],
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
              <strong>Note:</strong> Tata Elxsi is a premium engineering services company — candidate's CTC may be at the upper end of the India market range. Confirm expectation early.
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── RESUME TAB ───
function ResumeTab({ mobile }) {
  const resumeSans = "'Georgia', 'Times New Roman', serif";
  const bullet = (text) => (
    <div style={{ display: "flex", gap: 8, marginBottom: 3 }}>
      <span style={{ flexShrink: 0, marginTop: 2 }}>•</span>
      <span style={{ fontSize: 11, lineHeight: 1.5, color: "#222" }}>{text}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: mobile ? "20px 16px" : "32px 40px", fontFamily: resumeSans, color: "#111", background: "#fff", fontSize: 12 }}>

      {/* NAME + CONTACT */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Arial', sans-serif", letterSpacing: "0.02em" }}>ARJUN NAIR</div>
        <div style={{ fontSize: 10.5, color: "#555", marginTop: 4, fontFamily: "'Arial', sans-serif" }}>
          Pune, Maharashtra · arjun.nair@email.com · +91-98765-43210 · linkedin.com/in/arjunnair
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", borderBottom: "1.5px solid #333", paddingBottom: 2, marginBottom: 6 }}>Professional Summary</div>
        <div style={{ fontSize: 11, lineHeight: 1.6, color: "#222" }}>
          Mechanical Design Engineer with 7+ years of experience in product design and development across automotive, industrial, and consumer electronics domains. Proficient in SolidWorks, CATIA V5, and ANSYS. Experienced in GD&T, DFM/DFA, FEA simulation, and full NPI lifecycle from concept to production release. Strong cross-functional collaboration skills.
        </div>
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", borderBottom: "1.5px solid #333", paddingBottom: 2, marginBottom: 6 }}>Technical Skills</div>
        {[
          ["CAD Software", "SolidWorks, CATIA V5, AutoCAD"],
          ["Simulation / FEA", "ANSYS Mechanical, SolidWorks Simulation"],
          ["Standards", "ASME Y14.5-2018 GD&T, ISO 2768, ASME Y14.41"],
          ["Manufacturing", "Injection Molding, Sheet Metal, CNC Machining, DFM/DFA"],
          ["PLM Tools", "Windchill, Teamcenter"],
          ["Other", "PFMEA, DVP&R, BOM Management, ECN Process"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, marginBottom: 3, fontSize: 11 }}>
            <span style={{ fontWeight: 700, minWidth: 130, flexShrink: 0 }}>{k}:</span>
            <span style={{ color: "#333" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", borderBottom: "1.5px solid #333", paddingBottom: 2, marginBottom: 10 }}>Work Experience</div>

        {/* Job 1 */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 12, fontFamily: "'Arial', sans-serif" }}>Senior Mechanical Design Engineer</div>
            <div style={{ fontSize: 10.5, color: "#555", fontFamily: "'Arial', sans-serif" }}>Jul 2019 – Present</div>
          </div>
          <div style={{ fontSize: 11, color: "#555", fontFamily: "'Arial', sans-serif", marginBottom: 5 }}>Tata Elxsi Ltd. · Pune, Maharashtra</div>
          {bullet("Led mechanical design for 4 full NPI programs across automotive enclosure and connector product lines, from concept through DV testing and production release.")}
          {bullet("Designed injection-molded enclosures and sheet metal housings; performed DFM reviews covering draft angles, wall thickness, gate locations, and parting line planning.")}
          {bullet("Conducted FEA (structural, modal, thermal) using ANSYS Mechanical and SolidWorks Simulation for load-bearing brackets and heat-sink assemblies.")}
          {bullet("Applied ASME Y14.5-2018 GD&T across all design releases; trained junior engineers on datum reference frames, tolerance zones, and modifier usage.")}
          {bullet("Managed full redesign 6 weeks before launch following supplier tooling failure — re-ran FEA, coordinated with replacement supplier, delivered on revised schedule.")}
          {bullet("Collaborated cross-functionally with manufacturing engineering, procurement, quality, and supply chain on PFMEA and DVP&R activities.")}
        </div>

        {/* Job 2 */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 12, fontFamily: "'Arial', sans-serif" }}>Mechanical Design Engineer</div>
            <div style={{ fontSize: 10.5, color: "#555", fontFamily: "'Arial', sans-serif" }}>Jun 2017 – Jun 2019</div>
          </div>
          <div style={{ fontSize: 11, color: "#555", fontFamily: "'Arial', sans-serif", marginBottom: 5 }}>Godrej & Boyce Mfg. Co. Ltd. · Mumbai, Maharashtra</div>
          {bullet("Designed and released sheet metal components (brackets, panels, enclosures) for industrial control and storage products using SolidWorks.")}
          {bullet("Prepared production engineering drawings, BOMs, and ECNs using Windchill PLM. Participated in PFMEA and design review meetings with quality team.")}
          {bullet("Supported tooling vendor interactions for sheet metal press tools and plastic injection molds.")}
        </div>
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", borderBottom: "1.5px solid #333", paddingBottom: 2, marginBottom: 6 }}>Education</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, fontFamily: "'Arial', sans-serif" }}>B.E. — Mechanical Engineering</div>
            <div style={{ fontSize: 11, color: "#555", fontFamily: "'Arial', sans-serif" }}>Veermata Jijabai Technological Institute (VJTI), Mumbai · CGPA: 8.4 / 10</div>
          </div>
          <div style={{ fontSize: 10.5, color: "#555", fontFamily: "'Arial', sans-serif" }}>2013 – 2017</div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#333", borderBottom: "1.5px solid #333", paddingBottom: 2, marginBottom: 6 }}>Certifications</div>
        {bullet("CSWA — Certified SolidWorks Associate (Dassault Systèmes, 2018)")}
        {bullet("GD&T Professional — ASME Y14.5-2018 (2020)")}
      </div>

    </div>
  );
}

// ─── MAIN ───
export default function SampleMechEngineerProfile() {
  const mobile = useMobile();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Talent Profile" },
    { id: "resume", label: "Resume" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: sans }}>
      {/* HEADER */}
      <div style={{ borderBottom: `1px solid ${c.g[200]}`, position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, color: c.teal.acc }}>/</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>ELEXIS</span>
            <span style={{ color: c.g[300], margin: "0 3px" }}>|</span>
            <span style={{ fontSize: 11, color: c.g[400] }}>Talent Intelligence Profile</span>
          </div>
          {!mobile && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {[["Resume", true], ["Design Review", true], ["Interview", true]].map(([label, on]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Dot on={on} />
                  <span style={{ fontSize: 9, fontFamily: mono, color: on ? c.g[700] : c.g[400] }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* TABS */}
        <div style={{ display: "flex", gap: 0, padding: "0 20px" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                border: "none", background: "none", cursor: "pointer", padding: "7px 14px",
                fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400,
                color: activeTab === t.id ? c.teal.acc : c.g[500],
                borderBottom: activeTab === t.id ? `2px solid ${c.teal.acc}` : "2px solid transparent",
                fontFamily: sans, marginBottom: -1,
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {activeTab === "profile" ? <ProfileTab mobile={mobile} /> : <ResumeTab mobile={mobile} />}
    </div>
  );
}
