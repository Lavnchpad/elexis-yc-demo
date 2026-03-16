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
  name: "Siddharth Rao",
  title: "Unity Developer",
  company: "Outlier Games Studio",
  location: "Pune, India",
  status: "Open to Opportunities",
  noticePeriod: "45 days",
  yoe: "2.5 years",
};

const role = {
  company: "Client Company",
  title: "Senior Unity VR Developer",
  team: "XR Engineering Team",
};

const recommendation = {
  verdict: "Partial Fit",
  confidence: 61,
  bullets: [
    "Unity + C# foundation is genuine — 2.5 years of consistent mobile delivery, 5 shipped hyper-casual titles, solid MonoBehaviour fundamentals. Core engine skill is not in question. The gap is VR-specific.",
    "VR exposure is limited and not production-grade: 8 months total at Outlier Games, one internal prototype (not shipped), Oculus Integration SDK (deprecated) used in PR review instead of current XR Interaction Toolkit. No understanding of the 90fps hard requirement or standalone hardware constraints.",
    "3D math and performance optimization gaps are significant for VR: comfortable with mobile texture compression but unfamiliar with draw call batching, quaternion vs Euler angle implications, or foveal rendering. These are not minor gaps — they are required to deliver non-nauseating VR at target frame rate.",
    "No multiplayer, no cross-platform VR, no shader work, no shipped VR title. Of 6 should-haves, 1.5 are met. Strong foundation to grow into VR — but the role requires production VR experience from day one.",
    "Recommend: revisit in 12–18 months if Siddharth ships a VR title and demonstrates XR Interaction Toolkit proficiency. Strong culture fit and mobile fundamentals are a good base. Not ready for the senior VR scope today.",
  ],
};

// ─── MUST-HAVES ───
const musts = [
  {
    skill: "Unity Engine + C#",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: { status: "confirmed" },
    interview: { status: "confirmed" },
    summary: "Solid mobile Unity foundation — correct lifecycle, C# fundamentals confirmed. Some anti-patterns (GameObject.Find); architecture maturity is intermediate.",
    confidence: "high",
  },
  {
    skill: "VR/AR SDK Integration",
    passed: null,
    resume: { sections: ["Skills"], signal: "moderate" },
    prReview: { status: "partial" },
    interview: { status: "partial" },
    summary: "Used deprecated Oculus SDK (not XR Interaction Toolkit). One internal prototype, never shipped. No SteamVR or OpenXR demonstrated.",
    confidence: "medium",
  },
  {
    skill: "3D Math + Performance Optimization",
    passed: null,
    resume: { sections: ["Experience"], signal: "moderate" },
    prReview: { status: "partial" },
    interview: { status: "partial" },
    summary: "Mobile optimization present; VR-specific gaps are significant — didn't know 90fps requirement, missed quaternion and draw call issues in review.",
    confidence: "medium",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Multiplayer VR / Networking",
    met: false,
    level: "None",
    note: "No networking experience — all 5 shipped titles are single-player mobile games.",
    risk: "high",
  },
  {
    skill: "Immersive UI/UX Design",
    met: false,
    level: "Developing",
    note: "One basic world-space canvas UI in internal prototype — no shipped immersive UX design.",
    risk: "high",
  },
  {
    skill: "Cross-platform VR",
    met: false,
    level: "None",
    note: "Quest sideloading only — no SteamVR, OpenXR, or PC VR demonstrated.",
    risk: "high",
  },
  {
    skill: "Shader + Graphics Programming",
    met: false,
    level: "None",
    note: "No shader experience — off-the-shelf URP materials only across all projects.",
    risk: "medium",
  },
  {
    skill: "CI/CD + Build Pipeline",
    met: true,
    level: "Intermediate",
    note: "GitHub Actions for automated Android/iOS builds at PlayForge — strongest should-have signal, tooling transfers to VR builds.",
    risk: "low",
  },
  {
    skill: "Shipped VR Title",
    met: false,
    level: "None",
    note: "One internal VR prototype, never shipped — no title on App Lab, device fleet, or any store.",
    risk: "high",
  },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "XR Interaction Toolkit — Locomotion + Grab Controller Review",
  context: "Unity VR controller script handling teleportation locomotion, XR grab interaction, and haptic feedback dispatch. Junior developer's first VR feature. Candidate reviewed live with screen share.",
  time: "~20 min",
  proficiency: "Developing",
  verdict: "Surface-level review with significant VR-specific gaps. Caught basic Unity issues (Instantiate in Update after prompting, hardcoded values) but missed VR-critical problems: deprecated SDK usage, missing quaternion correctness, no haptic awareness, platform compiler directives. Review felt like a mobile Unity dev reviewing VR code — correct instincts for mobile patterns, blind spots for VR-specific requirements.",
  caught: [
    "Instantiate in Update loop — caught after being asked 'what would break at high frame rates' (required prompting, not independent)",
    "Hardcoded layer mask integer — flagged correctly, suggested serialized LayerMask field",
    "Missing null check on interactor reference — correctly identified NullReferenceException risk",
  ],
  missed: [
    "Deprecated Oculus Integration SDK (OVRGrabbable) — used deprecated API instead of XR Interaction Toolkit IXRInteractable. A senior VR hire should catch this immediately.",
    "Quaternion Lerp vs Slerp — used Euler angles where quaternion interpolation was needed. Motion sickness risk at large rotations — not flagged.",
    "Haptic feedback not connected — grab event not wired to haptic dispatch. Core VR interaction feel missing — not flagged.",
    "Coroutine leak on disable — StopAllCoroutines missing in OnDisable. Not caught.",
    "Platform compiler directive for hand tracking fallback — #if UNITY_ANDROID guard missing. Not flagged even after prompting about cross-platform builds.",
    "Draw call batching opportunity — static props not marked for batching. Not caught (unfamiliar with VR draw call constraints).",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 6.0,
  "Domain (VR/XR)": 5.0,
  "Communication": 7.5,
  "Problem Solving": 6.5,
  "Culture Fit": 8.0,
};

const findings = [
  "Unity + C# foundation is legitimate — 2.5 years, 5 shipped titles, mobile delivery across Play Store and App Store. This is not a junior who listed Unity on a resume; the mobile shipping record is real. The ceiling here is medium-term VR potential, not Unity fundamentals.",
  "VR depth is 8 months and prototype-only. 90fps hard requirement unknown ('guessed 60fps like mobile'). This is the key disqualifier for a senior VR role — the candidate doesn't yet understand what makes VR technically distinct from mobile game development.",
  "Deprecated SDK usage in PR review (OVRGrabbable instead of XR Interaction Toolkit) is a meaningful signal. XR Interaction Toolkit became the Unity-recommended VR standard in 2021. A candidate targeting senior VR roles in 2024 should know this migration happened.",
  "CI/CD is the strongest signal in the session — GitHub Actions for automated mobile builds at PlayForge, including build signing and store submission automation. This transfers directly to VR build pipelines. Brightest spot.",
  "Culture fit is the highest score in the session. Siddharth is honest about his VR limitations, asks clarifying questions rather than bluffing, and demonstrates genuine interest in growing into XR. These are good signals for someone at an earlier stage.",
  "Recommendation: not ready for senior VR scope today. Path forward: ship a VR title (App Lab is fine), migrate off deprecated Oculus SDK to XR Interaction Toolkit, build a multiplayer prototype. Revisit in 12–18 months.",
];

// ─── EDUCATION ───
const edu = {
  institution: "VIT Pune",
  degree: "B.Tech — Information Technology, 2022",
  location: "Pune, India",
  nirf: "151–200 band — Engineering (NIRF 2024)",
  naac: "A Grade",
  relevance: "4-year engineering degree. Standard IT curriculum. Graduated 2022; joined PlayForge Interactive as Junior Unity Developer within 2 months of graduation.",
};

// ─── RESUME DATA ───
const resumeData = {
  contact: {
    email: "siddharth.rao@email.com",
    linkedin: "linkedin.com/in/siddharthrao-unity",
    github: "github.com/siddharth-dev",
    location: "Pune, India",
  },
  summary: "Unity Developer with 2.5 years of experience in mobile game development, with recent exposure to VR development. Shipped 5 hyper-casual mobile titles with 500k+ combined downloads. Currently building first VR prototype at Outlier Games Studio. Strong C# fundamentals, mobile optimization experience, and CI/CD pipeline ownership.",
  experience: [
    {
      title: "Unity Developer",
      company: "Outlier Games Studio",
      location: "Pune, India",
      period: "Aug 2023 – Present",
      bullets: [
        "Developing hyper-casual mobile games in Unity 2021 for Android and iOS",
        "Building internal VR prototype for Meta Quest 2 — first VR development experience",
        "Integrated basic Oculus SDK for Quest sideloading and device testing",
        "Maintained GitHub Actions CI pipeline for automated mobile builds",
      ],
    },
    {
      title: "Junior Unity Developer",
      company: "PlayForge Interactive",
      location: "Pune, India",
      period: "Mar 2022 – Jul 2023",
      bullets: [
        "Developed 5 hyper-casual mobile titles in Unity 2020 — 500k+ combined downloads on Play Store and App Store",
        "Integrated Unity Ads, in-app purchases, and Google Play Games SDK (leaderboards, achievements)",
        "Set up GitHub Actions CI/CD for automated Android/iOS builds including signing and store submission",
        "Implemented texture atlasing and ETC2/ASTC compression reducing build sizes by 30%",
      ],
    },
  ],
  skills: [
    { category: "Engine & Language", items: ["Unity 2020/2021", "C# (2.5 years)", "MonoBehaviour", "Coroutines", "ScriptableObjects (basic)"] },
    { category: "VR / XR", items: ["Oculus Integration SDK (basic)", "Meta Quest 2 (sideloading)", "OVRGrabbable", "Unity XR (learning)"] },
    { category: "Mobile", items: ["Android (Play Store)", "iOS (App Store)", "WebGL", "Unity Ads", "Unity IAP"] },
    { category: "Tools & CI/CD", items: ["GitHub Actions", "Unity Cloud Build (basic)", "Jira", "Photoshop (basic)"] },
    { category: "Optimization", items: ["Texture compression (ETC2/ASTC)", "Sprite atlasing", "Overdraw reduction", "Draw call analysis (basic)"] },
  ],
  projects: [
    { name: "VR Prototype (Internal)", desc: "Internal Meta Quest 2 VR prototype at Outlier Games. Basic room-scale interaction with Oculus SDK. Not shipped — first VR development experience." },
    { name: "Hyperdash Run (Play Store)", desc: "Hyper-casual endless runner. 180k downloads. Unity 2020, procedural level generation, rewarded ad integration." },
    { name: "Stack Smash (Play Store + App Store)", desc: "Physics-based stacking game. 120k downloads. Unity IAP, cloud save, leaderboards via Google Play Games SDK." },
  ],
  education: {
    degree: "B.Tech Information Technology",
    institution: "VIT Pune",
    year: "2022",
    note: "4-year engineering degree",
  },
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} Unity</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.amber.bg, border: `1px solid ${c.amber.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.amber.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.amber.txt, lineHeight: 1.2, marginTop: 2 }}>Partial Fit</div>
          <div style={{ fontSize: 10, color: c.amber.txt, opacity: 0.7, marginTop: 1 }}>61% confidence</div>
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
      <div style={{ fontSize: mobile ? 10.5 : 9.5, color: c.g[400], fontFamily: mono, margin: "-4px 0 8px" }}>Any must-have failure = candidate removed. Partial = significant gaps flagged.</div>

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
            {m.summary && <div style={{ fontSize: 11, color: c.g[600], lineHeight: 1.45 }}>{m.summary}</div>}
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
                <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                  <Pill color={m.prReview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.prReview?.status === "confirmed" ? c.green.bg : c.amber.bg}>PR: {m.prReview?.status}</Pill>
                  <Pill color={m.interview?.status === "confirmed" ? c.green.txt : c.amber.txt} bg={m.interview?.status === "confirmed" ? c.green.bg : c.amber.bg}>Interview: {m.interview?.status}</Pill>
                </div>
                {m.summary && <div style={{ fontSize: 10.5, color: c.g[600], lineHeight: 1.45 }}>{m.summary}</div>}
              </div>
              <Pill color={confC[m.confidence].txt} bg={confC[m.confidence].bg}>{confC[m.confidence].label}</Pill>
            </div>
          ))}
        </>
      )}
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
              <Pill color={profC[s.level]?.txt || c.blue.txt} bg={profC[s.level]?.bg || c.blue.bg}>{s.level}</Pill>
              <Pill color={riskC[s.risk].txt} bg={riskC[s.risk].bg}>Risk: {s.risk.toUpperCase()}</Pill>
            </div>
            <div style={{ fontSize: 10.5, color: c.g[500], lineHeight: 1.4 }}>{s.note}</div>
          </div>
        </div>
      ))}
      <div style={{ height: mobile ? 20 : 14 }} />

      {/* PR REVIEW */}
      <Section icon="⟨/⟩" title="PR REVIEW ACTIVITY" badge="~20 min · Screen Share" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[700], margin: "-4px 0 10px" }}>{prReviewPrompt.context}</div>
      <div style={{ marginBottom: 6 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.green.txt, marginBottom: 6 }}>CAUGHT</div>
          {prReviewPrompt.caught.map((item, i) => (
            <div key={i} style={{ fontSize: 11, color: c.g[700], lineHeight: 1.55, display: "flex", gap: 6, marginBottom: 4 }}>
              <span style={{ color: c.green.txt, flexShrink: 0 }}>✓</span> {item}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, color: c.amber.txt, marginBottom: 6 }}>MISSED</div>
          {prReviewPrompt.missed.map((item, i) => (
            <div key={i} style={{ fontSize: 11, color: c.g[700], lineHeight: 1.55, display: "flex", gap: 6, marginBottom: 4 }}>
              <span style={{ color: c.amber.txt, flexShrink: 0 }}>⚠</span> {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: mobile ? 20 : 14 }} />

      {/* INTERVIEW */}
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="PARTIAL FIT" badgeColor={c.amber} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~45 min · Transcript verified</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: mobile ? 10 : 6, marginBottom: mobile ? 14 : 10, background: mobile ? c.g[50] : "transparent", borderRadius: 8, padding: mobile ? "12px 8px" : 0 }}>
        {Object.entries(interviewScores).map(([area, val]) => {
          const label = val >= 9 ? "Excellent" : val >= 8 ? "Strong" : val >= 7 ? "Good" : val >= 6 ? "Fair" : "Developing";
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
          {[["Location", edu.location], ["NIRF Rank", edu.nirf], ["NAAC Grade", edu.naac]].map(([l, v]) => (
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
          <Section icon="💰" title="COMPENSATION" badgeColor={c.amber} />
          <div style={{ fontSize: 10, color: c.g[500], marginBottom: 4 }}>Source: AmbitionBox · Unity Developer · Pune · 2–3 YOE</div>
          {[
            ["Market range", "₹5 – 9 LPA", "AmbitionBox avg, mobile game dev Pune"],
            ["Current CTC estimate", "₹6 – 8 LPA", "Based on 2.5 YOE at hyper-casual studios"],
          ].map(([s, v, n]) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${c.g[100]}` }}>
              <span style={{ fontSize: 11, color: c.g[500] }}>{s}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: 9, color: c.g[400] }}>{n}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: mobile ? 20 : 14 }} />

    </div>
  );
}

// ─── RESUME TAB ───
function ResumeTab({ mobile }) {
  const resumeSans = "'Inter', -apple-system, system-ui, sans-serif";
  const resumeMono = "'JetBrains Mono', 'Fira Code', monospace";

  const sectionHeaderStyle = {
    fontFamily: resumeMono,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#6B7280",
    textTransform: "uppercase",
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: 5,
    marginBottom: 12,
    marginTop: 22,
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: mobile ? "20px 16px 40px" : "28px 32px 48px", fontFamily: resumeSans, color: "#111827", background: "#fff", fontSize: 13 }}>

      {/* NAME + TITLE */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#111827" }}>{candidate.name}</h1>
        <div style={{ fontSize: 14, color: "#374151", marginTop: 3, fontWeight: 500 }}>{candidate.title} · {candidate.location}</div>
      </div>

      {/* CONTACT */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: mobile ? "4px 16px" : "4px 20px", marginTop: 8, marginBottom: 2, fontSize: 11.5, color: "#6B7280" }}>
        <span>{resumeData.contact.email}</span>
        <span>{resumeData.contact.linkedin}</span>
        <span>{resumeData.contact.github}</span>
        <span>{resumeData.contact.location}</span>
      </div>

      {/* SUMMARY */}
      <div style={sectionHeaderStyle}>Summary</div>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "#374151" }}>{resumeData.summary}</p>

      {/* EXPERIENCE */}
      <div style={sectionHeaderStyle}>Experience</div>
      {resumeData.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: i < resumeData.experience.length - 1 ? 18 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111827" }}>{exp.title}</span>
            <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: resumeMono }}>{exp.period}</span>
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 1, marginBottom: 7 }}>{exp.company} · {exp.location}</div>
          <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "disc" }}>
            {exp.bullets.map((b, j) => (
              <li key={j} style={{ fontSize: 12.5, lineHeight: 1.6, color: "#374151", marginBottom: 3 }}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* SKILLS */}
      <div style={sectionHeaderStyle}>Skills</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "8px 24px" }}>
        {resumeData.skills.map((skillGroup, i) => (
          <div key={i}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#111827" }}>{skillGroup.category}: </span>
            <span style={{ fontSize: 11.5, color: "#6B7280" }}>{skillGroup.items.join(", ")}</span>
          </div>
        ))}
      </div>

      {/* PROJECTS */}
      <div style={sectionHeaderStyle}>Projects</div>
      {resumeData.projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: i < resumeData.projects.length - 1 ? 10 : 0 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>{proj.name}</span>
          <span style={{ fontSize: 12, color: "#6B7280" }}> — {proj.desc}</span>
        </div>
      ))}

      {/* EDUCATION */}
      <div style={sectionHeaderStyle}>Education</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{resumeData.education.degree}</span>
        <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: resumeMono }}>{resumeData.education.year}</span>
      </div>
      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{resumeData.education.institution} · {resumeData.education.note}</div>

    </div>
  );
}

// ─── MAIN ───
export default function SiddharthVRProfile() {
  const mobile = useMobile();
  const [activeTab, setActiveTab] = useState("profile");

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

      {/* TAB BAR */}
      <div style={{ display: "flex", borderBottom: `1px solid ${c.g[200]}`, background: "#fff", position: "sticky", top: 45, zIndex: 9 }}>
        {[["profile", "TALENT PROFILE"], ["resume", "RESUME"]].map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: activeTab === tab ? c.teal.acc : c.g[400],
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? `2px solid ${c.teal.acc}` : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
              outline: "none",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "profile" ? <ProfileTab mobile={mobile} /> : <ResumeTab mobile={mobile} />}

    </div>
  );
}
