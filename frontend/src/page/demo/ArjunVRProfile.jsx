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
  name: "Arjun Mehta",
  title: "Senior Unity VR Developer",
  company: "ImmersaTech Solutions",
  location: "Bangalore, India",
  status: "Open to Opportunities",
  noticePeriod: "30 days",
  yoe: "4.5 years",
};

const role = {
  company: "Client Company",
  title: "Senior Unity VR Developer",
  team: "XR Engineering Team",
};

const recommendation = {
  verdict: "Strong Fit",
  confidence: 87,
  bullets: [
    "Unity + C# confirmed across three contexts with increasing ownership: mobile titles at Gamitronics, VR prototype → App Lab ship at Gamitronics, and full VR platform lead at ImmersaTech. Not a skills-list claim — repeated delivery across companies.",
    "VR SDK depth is production-grade: Meta Quest SDK (native + Unity), OpenXR for cross-platform abstraction, XR Interaction Toolkit. Built and shipped 3 VR titles. Most candidates in this space have 1 shipped title; Arjun has three distinct contexts.",
    "Performance optimization at VR-specific scale: designed custom occlusion culling system that reduced draw calls from 340 to 89 on a manufacturing VR training app — understands 90fps constraint, foveal rendering concepts, and single-pass instanced rendering. Not just profiling awareness.",
    "Multiplayer VR built and shipped: 6-player collaboration space using Photon Fusion with networked avatar systems, voice proximity, and object ownership transfer. Networking in VR is distinctly harder than flat; this evidence is rare at this YOE.",
    "Flag: 4.5 YOE is at the mid-senior range — strong for scope, some room to grow into architecture leadership at scale. Confirm CTC against budget before presenting.",
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
    summary: "Event-driven MonoBehaviours, ScriptableObject config, proper lifecycle management — no anti-patterns. Leads architecture at ImmersaTech.",
    confidence: "high",
  },
  {
    skill: "VR/AR SDK Integration",
    passed: true,
    resume: { sections: ["Skills", "Experience"], signal: "strong" },
    prReview: { status: "confirmed" },
    interview: { status: "confirmed" },
    summary: "Current XR Interaction Toolkit patterns confirmed. Meta Quest SDK, SteamVR, OpenXR. 3 shipped VR titles across B2B and consumer.",
    confidence: "high",
  },
  {
    skill: "3D Math + Performance Optimization",
    passed: true,
    resume: { sections: ["Experience"], signal: "strong" },
    prReview: { status: "confirmed" },
    interview: { status: "confirmed" },
    summary: "Caught Instantiate-in-Update, Lerp→Slerp, and draw call batching independently. Reduced draw calls 340→89 in production. Knows 90fps VR constraint.",
    confidence: "high",
  },
];

// ─── SHOULD-HAVES ───
const shouldHaves = [
  {
    skill: "Multiplayer VR / Networking",
    met: true,
    level: "Advanced",
    note: "Built a 6-player VR collaboration space at ImmersaTech using Photon Fusion — networked avatars, voice proximity, and object ownership in production.",
    risk: "low",
  },
  {
    skill: "Immersive UI/UX Design",
    met: true,
    level: "Advanced",
    note: "Wrote a 45-page UX spec for enterprise VR onboarding and won an internal UX award for accessibility-first VR UI design.",
    risk: "low",
  },
  {
    skill: "Cross-platform VR",
    met: true,
    level: "Intermediate",
    note: "Single codebase targeting Quest 2/3 and PC VR (Valve Index, HP Reverb G2) via OpenXR with platform-specific feature flags.",
    risk: "low",
  },
  {
    skill: "Shader + Graphics Programming",
    met: true,
    level: "Intermediate",
    note: "Shader Graph for environment materials and custom post-processing adapted for single-pass instanced rendering in VR.",
    risk: "low",
  },
  {
    skill: "CI/CD + Build Pipeline",
    met: true,
    level: "Intermediate",
    note: "GitHub Actions + Unity Cloud Build delivering automated APK and EXE builds — reduced build time from 40 min to 12 min.",
    risk: "low",
  },
  {
    skill: "Shipped VR Title",
    met: true,
    level: "Advanced",
    note: "3 shipped titles: enterprise safety training (200+ headsets), VR art gallery (App Lab, ~4k downloads), multiplayer VR whiteboard (50+ daily users).",
    risk: "low",
  },
];

// ─── PR REVIEW ───
const prReviewPrompt = {
  title: "XR Interaction Toolkit — Locomotion + Grab Controller Review",
  context: "Unity VR controller script handling teleportation locomotion, XR grab interaction, and haptic feedback dispatch. Junior developer's first VR feature. Candidate reviewed live with screen share.",
  time: "~20 min",
  proficiency: "Advanced",
  verdict: "Systematic, VR-aware review. Caught both Unity-general and VR-specific issues — notably flagged Instantiate in Update loop, Lerp→Slerp for quaternion correctness, missing haptic invoke on grab, and event unsubscribe leak without prompting. Reviewed with clear explanations for each issue, not just identification. Only miss: platform-specific compiler directive for Quest hand tracking fallback (identified after prompt, explained correctly once flagged).",
  caught: [
    "Instantiate inside Update loop — correctly flagged as frame-rate killer, proposed object pooling pattern",
    "Quaternion Lerp → Slerp — flagged incorrect interpolation method for large angular differences",
    "Missing haptic feedback invocation on grab event — XRBaseInteractable.selectEntered not connected to haptic dispatch",
    "Layer mask hardcoded to integer value — should be serialized LayerMask field in Inspector",
    "Coroutine leak — no StopAllCoroutines on OnDisable, coroutine continues after GameObject deactivated",
    "Missing OnDestroy event unsubscribe — UnityEvent listener registered in OnEnable but never removed",
    "Null check missing on XR Ray Interactor reference — NullReferenceException on first frame if rig not fully initialized",
    "Teleportation area collider not set to trigger — would block physical raycasts",
  ],
  missed: [
    "Platform-specific compiler directive for Quest hand tracking fallback — #if UNITY_ANDROID guard missing around OVRHand API calls, causing SteamVR build failure (identified after direct prompt, explained correctly once flagged)",
  ],
};

// ─── INTERVIEW ───
const interviewScores = {
  "Tech Depth": 9.0,
  "Domain (VR/XR)": 9.0,
  "Communication": 8.0,
  "Problem Solving": 8.5,
  "Culture Fit": 8.5,
};

const findings = [
  "Unity + C# across three employers (Gamitronics, ImmersaTech) with increasing ownership — from mobile game developer to full VR platform lead. TypeScript-equivalent: not a skills claim, structural evidence across 4.5 years.",
  "3 shipped VR titles across distinct distribution contexts (B2B enterprise, consumer App Lab, enterprise internal tooling). Shipping record demonstrates full pipeline ownership — not just development but deployment, distribution, and device management.",
  "Custom occlusion culling system: 340 → 89 draw calls on a manufacturing VR training app. This is the right problem to solve for enterprise VR on standalone hardware. Candidate identified the bottleneck, designed the solution, and measured the outcome. Performance ownership is real.",
  "6-player Photon Fusion multiplayer VR is a rare signal at this YOE. Networked VR requires solving avatar IK, head/hand position prediction, physics authority delegation, and voice sync simultaneously. Arjun owns this in production.",
  "World-space UI design spec written for enterprise onboarding — 45-page doc reviewed by client stakeholders. UX thinking in VR is fundamentally different from flat UI: depth, gaze, arm fatigue, and hand reach constraints. Candidate designed around these constraints deliberately.",
  "PR review standout: caught Lerp→Slerp independently — this is a VR-specific correctness issue that surfaces as motion sickness at large rotations, not just a code style preference. Identifying it unprompted demonstrates VR awareness that goes beyond Unity generalist knowledge.",
  "Communication: clear, structured, tradeoff-aware. Explained OpenXR choice over native SDK for cross-platform portability, and when to drop back to native SDK for performance-critical paths. Decision reasoning visible, not just tool name drops.",
];

// ─── EDUCATION ───
const edu = {
  institution: "BITS Pilani",
  degree: "B.E. — Computer Science, 2020",
  location: "Rajasthan, India",
  nirf: "#16 — Engineering (NIRF 2024)",
  naac: "A++ (Highest Grade)",
  relevance: "Premier engineering institution. Strong CS fundamentals — rigorous algorithms and systems curriculum. Graduated 2020; joined Gamitronics immediately post-graduation.",
};

// ─── RESUME DATA ───
const resumeData = {
  contact: {
    email: "arjun.mehta@email.com",
    linkedin: "linkedin.com/in/arjunmehta-vr",
    github: "github.com/arjunmehta-dev",
    location: "Bangalore, India",
  },
  summary: "Senior Unity VR Developer with 4.5 years of experience building and shipping production XR applications. Led full VR platform for enterprise safety training (200+ headsets deployed), shipped 3 VR titles across B2B and consumer distribution channels, and built multiplayer VR infrastructure using Photon Fusion. Deep expertise in Meta Quest SDK, OpenXR, XR Interaction Toolkit, and VR-specific performance optimization.",
  experience: [
    {
      title: "Senior Unity VR Developer",
      company: "ImmersaTech Solutions",
      location: "Bangalore, India",
      period: "Jan 2022 – Present",
      bullets: [
        "Led VR platform for enterprise safety training deployed across 200+ Meta Quest headsets in 3 manufacturing facilities",
        "Built 6-player multiplayer VR collaboration space using Photon Fusion — networked avatar IK, voice proximity detection, object ownership transfer",
        "Designed custom occlusion culling system reducing draw calls from 340 to 89 on standalone Quest hardware (74% reduction)",
        "Architected OpenXR cross-platform abstraction layer enabling single codebase targeting Quest 2/3 and PC VR (Valve Index, HP Reverb G2)",
        "Wrote 45-page UX design spec for enterprise VR onboarding flow; reviewed and approved by client stakeholders",
        "Set up GitHub Actions + Unity Cloud Build CI/CD pipeline reducing build time from 40 min to 12 min",
      ],
    },
    {
      title: "Unity Developer",
      company: "Gamitronics",
      location: "Mumbai, India",
      period: "Jun 2020 – Dec 2021",
      bullets: [
        "Developed 3 mobile titles in Unity (2M+ combined downloads on Play Store and App Store)",
        "Shipped VR art gallery to Meta App Lab — ~4,000 downloads; first shipped VR product",
        "Built multiplayer networking for 2-player mobile title using Mirror; first production networking experience",
        "Implemented CI/CD via GitHub Actions for automated Android/iOS builds and store submissions",
      ],
    },
  ],
  skills: [
    { category: "Engine & Language", items: ["Unity 2021/2022 LTS", "C# (5+ years)", "Unity DOTS/ECS (in-progress)", "Unity Editor tooling"] },
    { category: "VR / XR", items: ["Meta Quest SDK", "XR Interaction Toolkit", "SteamVR", "OpenXR", "Oculus Platform SDK", "OVRHand (hand tracking)"] },
    { category: "Networking", items: ["Photon Fusion", "Unity Netcode (basics)", "Mirror"] },
    { category: "Graphics", items: ["Shader Graph", "HLSL", "URP", "HDRP", "Post-processing (VR-adapted)"] },
    { category: "Tools & CI/CD", items: ["GitHub Actions", "Unity Cloud Build", "New Relic (APM)", "Jira", "Confluence"] },
    { category: "Platforms", items: ["Android (Quest standalone)", "Windows (PC VR)", "iOS (mobile)", "WebGL"] },
  ],
  projects: [
    { name: "VR Safety Training Platform", desc: "Enterprise B2B — 200+ Meta Quest headsets deployed across 3 manufacturing facilities. Custom occlusion culling, 90fps target maintained on Quest 2 standalone." },
    { name: "VR Multiplayer Collaboration Space", desc: "6-player networked VR whiteboard with avatar IK, Photon Fusion v1, voice proximity, and object ownership. 50+ daily active enterprise users." },
    { name: "VR Art Gallery (App Lab)", desc: "Consumer VR experience shipped to Meta App Lab. ~4,000 downloads. Oculus Platform SDK for achievements and entitlement." },
  ],
  education: {
    degree: "B.E. Computer Science",
    institution: "BITS Pilani",
    year: "2016 – 2020",
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
            <Pill color={c.g[500]} bg={c.g[100]}>{candidate.yoe} Unity VR</Pill>
            <Pill color={c.blue.txt} bg={c.blue.bg}>Notice: {candidate.noticePeriod}</Pill>
          </div>
        </div>
        <div style={{ background: c.teal.bg, border: `1px solid ${c.teal.brd}`, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: c.teal.txt, letterSpacing: "0.05em" }}>RUBRIC FIT</div>
          <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: c.teal.txt, lineHeight: 1.2, marginTop: 2 }}>Strong Fit</div>
          <div style={{ fontSize: 10, color: c.teal.txt, opacity: 0.7, marginTop: 1 }}>87% confidence</div>
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
      <Section icon="🎙" title="SCREENING INTERVIEW" badge="STRONG FIT" badgeColor={c.teal} />
      <div style={{ fontSize: mobile ? 10.5 : 9.5, fontFamily: mono, color: c.g[400], margin: "-4px 0 10px" }}>~60 min · Transcript verified</div>
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
          <Section icon="💰" title="COMPENSATION" badgeColor={c.green} />
          <div style={{ fontSize: 10, color: c.g[500], marginBottom: 4 }}>Source: AmbitionBox · Senior Unity Developer · Bangalore · 4–5 YOE</div>
          {[
            ["Market range", "₹16 – 24 LPA", "AmbitionBox avg, VR niche adds premium"],
            ["Current CTC estimate", "₹18 – 20 LPA", "Based on YOE trajectory at ImmersaTech"],
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
  const resumeSection = (title) => (
    <div style={{ marginBottom: 6, paddingBottom: 4, borderBottom: "1.5px solid #E5E7EB" }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#6B7280", textTransform: "uppercase", fontFamily: sans }}>{title}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: mobile ? "24px 16px 40px" : "32px 24px 48px", fontFamily: sans, color: "#111827", background: "#fff" }}>

      {/* NAME + CONTACT */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, margin: "0 0 2px", letterSpacing: "-0.02em" }}>{candidate.name}</h1>
        <div style={{ fontSize: 13, color: "#374151", marginBottom: 10, fontWeight: 500 }}>{candidate.title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: mobile ? "4px 14px" : "2px 18px", fontSize: 11.5, color: "#6B7280" }}>
          <span>{resumeData.contact.location}</span>
          <span>{resumeData.contact.email}</span>
          <span>{resumeData.contact.linkedin}</span>
          <span>{resumeData.contact.github}</span>
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ marginBottom: 22 }}>
        {resumeSection("Summary")}
        <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "#374151", margin: "10px 0 0" }}>{resumeData.summary}</p>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: 22 }}>
        {resumeSection("Experience")}
        {resumeData.experience.map((job, i) => (
          <div key={i} style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "2px 8px" }}>
              <span style={{ fontSize: 13.5, fontWeight: 700 }}>{job.title}</span>
              <span style={{ fontSize: 11, color: "#6B7280", whiteSpace: "nowrap" }}>{job.period}</span>
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{job.company} · {job.location}</div>
            <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "disc" }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: 12, lineHeight: 1.6, color: "#374151", marginBottom: 3 }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div style={{ marginBottom: 22 }}>
        {resumeSection("Skills")}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "10px 24px", marginTop: 10 }}>
          {resumeData.skills.map((cat, i) => (
            <div key={i}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "#111827" }}>{cat.category}: </span>
              <span style={{ fontSize: 11.5, color: "#374151" }}>{cat.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div style={{ marginBottom: 22 }}>
        {resumeSection("Projects")}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr", gap: 10, marginTop: 10 }}>
          {resumeData.projects.map((p, i) => (
            <div key={i} style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.55 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div>
        {resumeSection("Education")}
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "2px 8px" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{resumeData.education.degree}</span>
            <span style={{ fontSize: 11, color: "#6B7280" }}>{resumeData.education.year}</span>
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{resumeData.education.institution}</div>
        </div>
      </div>

    </div>
  );
}

// ─── MAIN ───
export default function ArjunVRProfile() {
  const mobile = useMobile();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: sans }}>

      {/* HEADER — sticky */}
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
      <div style={{ display: "flex", borderBottom: `1px solid ${c.g[200]}`, background: "#fff", paddingLeft: mobile ? 16 : 20 }}>
        {[
          { key: "profile", label: "TALENT PROFILE" },
          { key: "resume", label: "RESUME" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: activeTab === tab.key ? c.teal.acc : c.g[400],
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.key ? `2px solid ${c.teal.acc}` : "2px solid transparent",
              padding: "10px 16px",
              cursor: "pointer",
              marginBottom: -1,
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "profile" ? (
        <ProfileTab mobile={mobile} />
      ) : (
        <ResumeTab mobile={mobile} />
      )}

    </div>
  );
}
