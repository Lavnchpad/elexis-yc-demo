import { useState, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Search, ListFilter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  demoShortlistedCandidates,
  demoJobs,
  educationContext,
  orgFit,
  salaryAnalysis,
  interviewDetailedSummary,
  interviewTranscript,
} from "@/lib/demo-data";

// ── Helper: Skill Score Row (reused from talent profile) ──

function SkillScoreRow({ item, showInterview }) {
  const githubColors = {
    strong: "text-green-800",
    moderate: "text-green-800",
    weak: "text-amber-700",
    none: "text-red-800",
    discovered: "text-blue-800",
  };
  const githubIcons = { strong: "✅", moderate: "✅", weak: "⚠️", none: "❌", discovered: "🔍" };
  const interviewIcons = { confirmed: "✅", gap_filled: "🔄", gap_confirmed: "⚠️" };
  const interviewLabels = { confirmed: "Confirmed", gap_filled: "Gap filled by interview", gap_confirmed: "Gap confirmed" };
  const interviewColors = { confirmed: "text-green-800", gap_filled: "text-blue-800", gap_confirmed: "text-amber-700" };
  const confidenceStyles = {
    high: "bg-green-50 text-green-800 border-green-200",
    medium: "bg-amber-50 text-amber-800 border-amber-200",
    low: "bg-red-50 text-red-800 border-red-200",
  };
  const scoreColor =
    item.score >= item.rubricWeight * 0.8
      ? "text-green-800"
      : item.score >= item.rubricWeight * 0.5
        ? "text-amber-700"
        : "text-red-800";

  return (
    <div
      className={`grid gap-3 py-3 border-b border-gray-100 items-start ${
        showInterview
          ? "grid-cols-[140px_120px_1fr_1fr_80px_60px]"
          : "grid-cols-[140px_120px_1fr_80px_60px]"
      }`}
    >
      <span className="font-semibold text-sm text-gray-900">{item.skill}</span>
      <div className="flex gap-1 flex-wrap">
        {item.resumeSections.length === 0 ? (
          <span className="text-sm text-gray-400">Not on resume</span>
        ) : (
          item.resumeSections.map((s) => (
            <span key={s} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-mono">{s}</span>
          ))
        )}
      </div>
      <div className="text-sm">
        {!item.github ? (
          <span className="text-gray-400">—</span>
        ) : item.github.status === "none" ? (
          <span className="text-red-800">❌ No evidence found</span>
        ) : item.github.status === "discovered" ? (
          <span className="text-blue-800">🔍 Discovered — {item.github.detail}</span>
        ) : (
          <div>
            <span className={githubColors[item.github.status]}>{githubIcons[item.github.status]} </span>
            <span className="text-gray-700">
              {item.github.repos ? `${item.github.repos} repos` : ""}
              {item.github.commits ? `, ${item.github.commits} commits` : ""}
              {item.github.latest ? ` · Latest: ${item.github.latest}` : ""}
            </span>
            {item.github.detail && <div className="text-xs text-gray-500 mt-0.5">{item.github.detail}</div>}
          </div>
        )}
      </div>
      {showInterview && (
        <div className="text-sm">
          {!item.interview ? (
            <span className="text-gray-400">Not yet assessed</span>
          ) : (
            <div>
              <span>{interviewIcons[item.interview.status]} </span>
              <span className={`font-medium ${interviewColors[item.interview.status]}`}>
                {interviewLabels[item.interview.status]}
              </span>
              <div className="text-xs text-gray-500 mt-0.5 leading-snug">{item.interview.note}</div>
            </div>
          )}
        </div>
      )}
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border w-fit font-mono ${confidenceStyles[item.confidence]}`}>
        {item.confidence.toUpperCase()}
      </span>
      <span className={`font-mono text-sm font-semibold ${scoreColor}`}>
        {item.score}/{item.rubricWeight}
      </span>
    </div>
  );
}

// ── Candidate Detail Panel ──

function CandidateDetail({ candidate }) {
  const isInterviewCompleted = candidate.interviewStatus === "completed";
  const [showInterviewLayer, setShowInterviewLayer] = useState(isInterviewCompleted);

  const allSkills = [
    ...candidate.rubricMatch.mustHave,
    ...candidate.rubricMatch.shouldHave,
    ...candidate.rubricMatch.niceToHave,
  ];
  const totalScore = allSkills.reduce((a, b) => a + b.score, 0);
  const totalMax = allSkills.reduce((a, b) => a + b.rubricWeight, 0);

  return (
    <div className="max-h-full overflow-y-auto">
      {/* Dark header card */}
      <div className="p-6 rounded-xl shadow mb-6 flex text-white bg-[#2B2A29] items-center">
        <div className="flex items-center space-x-6 w-full">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-black text-2xl bg-gray-200">{candidate.initials}</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">{candidate.name}</h1>
              <p className="text-gray-300 mt-1">
                {candidate.currentRole} @ {candidate.company} · {candidate.location}
              </p>
              <div className="flex items-center gap-4 font-light mt-2">
                <p className="flex items-center text-sm">
                  <Mail className="mr-2 w-4 h-4" />{candidate.email}
                </p>
                <p className="flex items-center text-sm">
                  <Phone className="mr-2 w-4 h-4" />{candidate.phone}
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <span className="bg-green-900/40 text-green-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {candidate.searchStatus}
                </span>
                <span className="bg-purple-900/40 text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  via {candidate.source}
                </span>
                <span className="bg-gray-700 text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {candidate.availability}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-teal-900/50 border border-teal-700 rounded-xl px-6 py-4 text-center min-w-[100px]">
                <div className="text-[10px] text-teal-300 font-semibold uppercase tracking-wide mb-1">Rubric Fit</div>
                <div className="text-3xl font-extrabold text-teal-300 font-mono leading-none">{candidate.roleFitScore}</div>
                <div className="text-xs text-gray-400">/100</div>
              </div>
              <div className="bg-blue-900/50 border border-blue-700 rounded-xl px-6 py-4 text-center min-w-[100px]">
                <div className="text-[10px] text-blue-300 font-semibold uppercase tracking-wide mb-1">Growth</div>
                <div className="text-3xl font-extrabold text-blue-300 font-mono leading-none">{candidate.growthPotential}</div>
                <div className="text-xs text-gray-400">/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job context banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg px-5 py-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-teal-700 font-medium">Scored against:</span>
          <span className="text-sm text-gray-900 font-bold">{candidate.jobClient} — {candidate.jobName}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">9 criteria · 3 tiers · weighted scoring</span>
          {isInterviewCompleted ? (
            <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">AI Interview Complete</span>
          ) : (
            <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">AI Interview Pending</span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="talent-profile" className="w-full">
        <TabsList className="bg-background">
          <TabsTrigger value="talent-profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Talent Profile
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Summary
          </TabsTrigger>
          <TabsTrigger value="transcript" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Transcript
          </TabsTrigger>
          <TabsTrigger value="proctoring" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Proctoring
          </TabsTrigger>
        </TabsList>

        {/* ── TALENT PROFILE TAB ── */}
        <TabsContent value="talent-profile">
          <div className="p-4 bg-background rounded-lg space-y-4">
            {/* Recommendation — only if interview completed */}
            {isInterviewCompleted && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      Recommendation
                    </CardTitle>
                    <span className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-bold font-mono">
                      {candidate.interviewRecommendation} · {candidate.roleFitScore}% Confidence
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Exceptional technical capabilities triangulated across resume, GitHub code
                    analysis, and AI screening interview. Flutter and Python claims are strongly
                    backed by extensive open-source contributions. Strong cultural alignment based
                    on communication quality and startup experience. Minor skill gaps can be
                    addressed through structured onboarding within 4-6 weeks.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* ── Three-Layer Rubric Scorecard ── */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    Rubric Scorecard — Three Layer Verification
                  </CardTitle>
                  <span className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-bold font-mono">
                    {totalScore}/{totalMax} weighted
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {/* Layer indicators */}
                <div className="flex gap-2 mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-xs text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    Layer 1: Resume Keywords
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-xs text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    Layer 2: GitHub Evidence
                  </div>
                  {isInterviewCompleted ? (
                    <button
                      onClick={() => setShowInterviewLayer(!showInterviewLayer)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border-none cursor-pointer transition-colors ${
                        showInterviewLayer ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${showInterviewLayer ? "bg-white" : "bg-cyan-600"}`} />
                      Layer 3: AI Interview {showInterviewLayer ? "ON" : "OFF"}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-xs text-gray-400 cursor-not-allowed opacity-50">
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                      Layer 3: AI Interview — Pending
                    </div>
                  )}
                </div>

                {/* Column headers */}
                <div
                  className={`grid gap-3 pb-2 border-b-2 border-gray-200 mb-1 ${
                    showInterviewLayer && isInterviewCompleted
                      ? "grid-cols-[140px_120px_1fr_1fr_80px_60px]"
                      : "grid-cols-[140px_120px_1fr_80px_60px]"
                  }`}
                >
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Skill</span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Resume</span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">GitHub</span>
                  {showInterviewLayer && isInterviewCompleted && (
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">AI Interview</span>
                  )}
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Confidence</span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Score</span>
                </div>

                {/* Must Have */}
                <div className="mt-4 mb-2">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">MUST HAVE — Knockout Criteria</span>
                </div>
                {candidate.rubricMatch.mustHave.map((item) => (
                  <SkillScoreRow key={item.skill} item={item} showInterview={showInterviewLayer && isInterviewCompleted} />
                ))}

                {/* Should Have */}
                <div className="mt-5 mb-2">
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">SHOULD HAVE — Strong Preference</span>
                </div>
                {candidate.rubricMatch.shouldHave.map((item) => (
                  <SkillScoreRow key={item.skill} item={item} showInterview={showInterviewLayer && isInterviewCompleted} />
                ))}

                {/* Nice to Have */}
                <div className="mt-5 mb-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">NICE TO HAVE — Bonus</span>
                </div>
                {candidate.rubricMatch.niceToHave.map((item) => (
                  <SkillScoreRow key={item.skill} item={item} showInterview={showInterviewLayer && isInterviewCompleted} />
                ))}

                {/* GitHub Discoveries */}
                <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">
                    Discovered via GitHub — Not on Resume
                  </div>
                  {candidate.githubDiscoveries.map((d) => (
                    <div key={d.skill} className="flex items-center gap-2 py-1 text-sm">
                      <span className="font-semibold text-gray-900 min-w-[110px]">{d.skill}</span>
                      <span className="text-gray-500">{d.detail}</span>
                      {d.relevant && (
                        <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">RUBRIC RELEVANT</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Screening Interview Output — only if completed */}
            {isInterviewCompleted && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      AI Screening Interview — Output
                    </CardTitle>
                    <span className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-bold font-mono">
                      {candidate.interviewRecommendation}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-3 mb-5">
                    {candidate.interviewScores.map((s) => (
                      <div key={s.area} className="text-center">
                        <div className="text-[11px] text-gray-500 mb-1.5 font-medium">{s.area}</div>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(s.score / s.max) * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold font-mono text-gray-700">{s.score}/{s.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Key Findings</div>
                  {candidate.interviewKeyFindings.map((f, i) => (
                    <div key={i} className={`flex gap-2 py-1.5 ${i < candidate.interviewKeyFindings.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <span className="text-xs text-gray-400 font-mono min-w-[20px]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Interview Pending card — only if NOT completed */}
            {!isInterviewCompleted && (
              <Card className="border-l-[3px] border-l-amber-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    AI Screening Interview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 py-4">
                    <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center shrink-0">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Interview Scheduled</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Scheduled for {new Date(candidate.interviewDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at{" "}
                        {new Date(candidate.interviewDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Layer 3 verification scores will appear here once the AI interview is completed.
                        Currently showing Layer 1 (Resume) and Layer 2 (GitHub) analysis only.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education & Org Fit — only for completed interview */}
            {isInterviewCompleted && (
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      Education Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="text-base font-bold text-gray-900">{educationContext.institution}</div>
                      <div className="text-sm text-gray-500">{educationContext.degree}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: "Classification", value: educationContext.tier, highlight: true },
                        { label: "Ranking", value: educationContext.ranking },
                        { label: "Acceptance Rate", value: educationContext.acceptance },
                        { label: "US Comparable", value: educationContext.comparable },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between">
                          <span className="text-gray-500">{row.label}</span>
                          <span className={row.highlight ? "text-green-800 font-semibold" : "text-gray-900 font-medium"}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-2.5 bg-teal-50 rounded-md text-xs text-teal-700 leading-relaxed">
                      <strong>Rubric relevance:</strong> {educationContext.rubricRelevance}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                        Organization Fit
                      </CardTitle>
                      <span className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-bold font-mono">{orgFit.matchPercent}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <span className="text-xs text-gray-500">Target Industry: </span>
                      <span className="text-sm font-semibold text-gray-900">{orgFit.targetIndustry}</span>
                    </div>
                    {orgFit.industries.map((ind) => (
                      <div key={ind.name} className="flex justify-between items-center py-2.5 border-b border-gray-100">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{ind.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{ind.detail}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 font-mono">{ind.years} yrs</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${ind.relevance === "High" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
                            {ind.relevance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Compensation Analysis — only for completed */}
            {isInterviewCompleted && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      Compensation Analysis
                    </CardTitle>
                    <span className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm font-bold font-mono">Within Budget</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Market Rate Estimate</div>
                      <div className="text-2xl font-extrabold text-gray-900 mb-3">{salaryAnalysis.estimate}</div>
                      {salaryAnalysis.dataPoints.map((dp) => (
                        <div key={dp.source} className="flex justify-between py-1.5 border-b border-gray-100 text-sm">
                          <span className="text-gray-500">{dp.source}</span>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">{dp.value}</span>
                            <div className="text-[11px] text-gray-400">{dp.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Rubric Budget Alignment</div>
                      <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-500">Client budget</span>
                          <span className="font-bold text-gray-900">{salaryAnalysis.rubricBudget}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-500">Market estimate</span>
                          <span className="font-bold text-gray-900">{salaryAnalysis.estimate}</span>
                        </div>
                        <div className="h-px bg-teal-200 my-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-teal-700 font-semibold">Likely accepts at</span>
                          <span className="font-extrabold text-teal-700 text-base">{salaryAnalysis.likelyAccepts}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Footer */}
            <div className="text-center py-6 text-xs text-gray-400">
              Analysis powered by Elexis AI · Triangulated from resume, GitHub{isInterviewCompleted ? ", AI screening," : ""} and market data
            </div>
          </div>
        </TabsContent>

        {/* ── SUMMARY TAB ── */}
        <TabsContent value="summary">
          {!isInterviewCompleted ? (
            <div className="p-8 bg-background rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕐</span>
              </div>
              <p className="text-gray-500 font-medium">Interview has not been completed yet.</p>
              <p className="text-gray-400 text-sm mt-1">Summary will be available after the AI screening.</p>
            </div>
          ) : (
            <div className="p-4 bg-background rounded-lg space-y-6">
              {/* Skills Grid */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide">Skills Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {[
                      { label: "Frontend", skills: interviewDetailedSummary.skills.frontend },
                      { label: "DevOps & Cloud", skills: interviewDetailedSummary.skills.devopsCloud },
                      { label: "Backend", skills: interviewDetailedSummary.skills.backend },
                      { label: "Soft Skills", skills: interviewDetailedSummary.skills.softSkills },
                      { label: "Databases", skills: interviewDetailedSummary.skills.databases },
                    ].map((group) => (
                      <div key={group.label}>
                        <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{group.label}</div>
                        {group.skills.map((s) => (
                          <div key={s.name} className="flex items-center justify-between py-1">
                            <span className="text-sm text-gray-700">{s.name}</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-3 rounded-sm ${i <= s.level ? "bg-primary" : "bg-gray-200"}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Impression */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide">Overall Impression</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {interviewDetailedSummary.overallImpression.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="text-gray-400 mt-1 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide">Strengths</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {interviewDetailedSummary.strengths.map((strength) => (
                    <div key={strength.title}>
                      <div className="font-semibold text-gray-900 mb-2">{strength.title}</div>
                      <ul className="space-y-2 mb-2">
                        {strength.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                            <span className="text-gray-400 mt-1 shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold text-gray-500 italic">
                        Rating: {strength.rating}/{strength.maxRating}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {interviewDetailedSummary.areasForImprovement.map((area) => (
                    <div key={area.title}>
                      <div className="font-semibold text-gray-900 mb-2">{area.title}</div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{area.description}</p>
                      <p className="text-sm text-gray-500 italic leading-relaxed border-l-2 border-gray-200 pl-3">
                        "{area.followUpQuestion}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Final Recommendation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wide">Final Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {interviewDetailedSummary.finalRecommendation.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="text-gray-400 mt-1 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center py-4 text-xs text-gray-400">
                Summary generated by Elexis AI · Based on 22-minute AI screening interview
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── TRANSCRIPT TAB ── */}
        <TabsContent value="transcript">
          {!isInterviewCompleted ? (
            <div className="p-8 bg-background rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕐</span>
              </div>
              <p className="text-gray-500 font-medium">Interview has not been completed yet.</p>
              <p className="text-gray-400 text-sm mt-1">Transcript will be available after the AI screening.</p>
            </div>
          ) : (
            <div className="p-4 bg-background rounded-lg space-y-1">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide">Full Interview Transcript</CardTitle>
                    <span className="text-xs text-gray-400">Duration: ~22 minutes · {interviewTranscript.length} exchanges</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-0">
                  {interviewTranscript.map((entry, i) => (
                    <div
                      key={i}
                      className={`py-4 ${i < interviewTranscript.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                          entry.speaker === "ai"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-200 text-gray-700"
                        }`}>
                          {entry.speaker === "ai" ? "AI" : "RK"}
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold mb-1 ${
                            entry.speaker === "ai" ? "text-primary" : "text-gray-700"
                          }`}>
                            {entry.speaker === "ai" ? "Elexis AI Interviewer" : "Rahul Kumar"}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{entry.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="text-center py-4 text-xs text-gray-400">
                Transcript recorded and processed by Elexis AI · Feb 3, 2026
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="proctoring">
          <div className="p-4 bg-background rounded-lg">
            <p className="text-gray-500">
              {isInterviewCompleted
                ? "Proctoring data will appear here."
                : "Interview has not been completed yet. Proctoring data will be available after the AI screening."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Main Component ──

const DemoCandidate = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(demoShortlistedCandidates[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [interviewFilter, setInterviewFilter] = useState("all");

  const filteredCandidates = useMemo(() => {
    let list = demoShortlistedCandidates;

    if (jobFilter !== "all") {
      list = list.filter((c) => c.jobId === jobFilter);
    }
    if (interviewFilter !== "all") {
      list = list.filter((c) => c.interviewStatus === interviewFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.company.toLowerCase().includes(term)
      );
    }
    return list;
  }, [searchTerm, jobFilter, interviewFilter]);

  return (
    <div className="flex h-screen">
      {/* ── Left Sidebar ── */}
      <div className="w-1/4 p-4 bg-gray-100">
        {/* Search bar */}
        <div className="w-full p-4 bg-white border-b border-gray-200 rounded-t-lg">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="px-2 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">AI Interview Status</div>
                <DropdownMenuItem
                  className={`flex items-center gap-2 ${interviewFilter === "all" ? "bg-gray-100" : ""}`}
                  onClick={() => setInterviewFilter("all")}
                >
                  <span className="h-2.5 w-2.5 bg-gray-500 rounded-full" />
                  <span>All</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`flex items-center gap-2 ${interviewFilter === "completed" ? "bg-gray-100" : ""}`}
                  onClick={() => setInterviewFilter("completed")}
                >
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                  <span>Interview Completed</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`flex items-center gap-2 ${interviewFilter === "scheduled" ? "bg-gray-100" : ""}`}
                  onClick={() => setInterviewFilter("scheduled")}
                >
                  <span className="h-2.5 w-2.5 bg-amber-500 rounded-full" />
                  <span>Interview Pending</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Job filter dropdown */}
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Jobs</SelectItem>
                {demoJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.job_name} — {job.client}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Candidate list */}
        <ScrollArea className="mt-2 max-h-[75dvh] overflow-y-auto">
          <ul className="space-y-2 cursor-pointer">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => {
                const isSelected = candidate.id === selectedCandidate?.id;
                return (
                  <li
                    key={candidate.id}
                    className={`flex items-center p-4 rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
                      isSelected ? "bg-[#2B2A29]" : "bg-white"
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="relative w-12 h-12 mr-4">
                      <Avatar className="w-full h-full">
                        <AvatarFallback className={isSelected ? "text-white bg-gray-600" : ""}>
                          {candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      {/* Interview status indicator */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                          candidate.interviewStatus === "completed"
                            ? "bg-green-500"
                            : "bg-amber-400"
                        }`}
                      >
                        {candidate.interviewStatus === "completed" ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : (
                          <span className="text-white text-[10px] font-bold">⏳</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-between">
                      <div>
                        <h3 className={`font-medium text-sm ${isSelected ? "text-white" : "text-black"}`}>
                          {candidate.name}
                        </h3>
                        <p className={`text-xs truncate ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                          {candidate.currentRole} · {candidate.company}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? "text-gray-400" : "text-gray-400"}`}>
                          {candidate.jobName} — {candidate.jobClient}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-extrabold font-mono ${
                          candidate.roleFitScore >= 80
                            ? isSelected ? "text-green-400" : "text-green-700"
                            : isSelected ? "text-amber-400" : "text-amber-700"
                        }`}>
                          {candidate.roleFitScore}%
                        </div>
                        <div className={`text-[10px] ${isSelected ? "text-gray-400" : "text-gray-500"}`}>
                          {candidate.interviewStatus === "completed" ? "Complete" : "Pending"}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4 text-sm">No candidates match filters.</p>
            )}
          </ul>
        </ScrollArea>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-3/4 p-6 overflow-y-auto">
        {selectedCandidate ? (
          <CandidateDetail key={selectedCandidate.id} candidate={selectedCandidate} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Please select a candidate to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoCandidate;
