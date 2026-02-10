import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FlaskConical,
  Settings2,
  FileText,
  Ruler,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { rubricData } from "@/lib/demo-data";

const statusConfig = {
  strong: { label: "Strong", color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500", icon: CheckCircle },
  moderate: { label: "Moderate", color: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500", icon: AlertTriangle },
  weak: { label: "Weak", color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", icon: AlertTriangle },
  discovered: { label: "Discovered", color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500", icon: Sparkles },
  not_found: { label: "Not Found", color: "text-gray-400", bg: "bg-gray-50", dot: "bg-gray-300", icon: XCircle },
};

const langColors = [
  "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-purple-500", "bg-gray-300",
];

const trajectoryConfig = {
  rapid: { label: "Rapid Growth", color: "text-green-700", icon: TrendingUp },
  steady: { label: "Steady", color: "text-blue-700", icon: Minus },
  stagnant: { label: "Declining", color: "text-red-600", icon: TrendingDown },
};

function scoreColor(score) {
  if (score >= 70) return "text-green-700";
  if (score >= 50) return "text-amber-700";
  return "text-red-600";
}

function scoreBorder(score) {
  if (score >= 70) return "border-green-500";
  if (score >= 50) return "border-amber-500";
  return "border-red-400";
}

function SkillVerificationRow({ item }) {
  const config = statusConfig[item.status] || statusConfig.not_found;
  const StatusIcon = config.icon;

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${config.bg}`}>
      <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{item.skill}</span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {item.repos > 0 && <span>{item.repos} repos</span>}
            {item.commits > 0 && <span>{item.commits} commits</span>}
            {item.latest && <span>Active {item.latest}</span>}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</p>
      </div>
    </div>
  );
}

function CodeQualityBadges({ cq }) {
  const badges = [
    { key: "tests", label: "Tests", active: cq.hasTests, icon: FlaskConical },
    { key: "cicd", label: "CI/CD", active: cq.hasCiCd, icon: Settings2 },
    { key: "docs", label: "Docs", active: cq.hasDocs, icon: FileText },
    { key: "lint", label: "Linting", active: cq.usesLinting, icon: Ruler },
  ];

  return (
    <div className="flex items-center gap-2">
      {badges.map((b) => {
        const Icon = b.icon;
        return (
          <span
            key={b.key}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${
              b.active
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-gray-50 text-gray-400 border border-gray-200"
            }`}
          >
            <Icon className="w-3 h-3" />
            {b.label}
          </span>
        );
      })}
      <span className="text-[10px] text-muted-foreground ml-1">
        Commits: {cq.avgCommitSize} &middot; Messages: {cq.commitMessageQuality}
      </span>
    </div>
  );
}

function ContributionBar({ cp }) {
  const traj = trajectoryConfig[cp.growthTrajectory] || trajectoryConfig.steady;
  const TrajIcon = traj.icon;

  return (
    <div className="flex items-center gap-6">
      {/* Consistency gauge */}
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${cp.consistencyScore >= 70 ? "bg-green-500" : cp.consistencyScore >= 50 ? "bg-amber-500" : "bg-red-400"}`}
            style={{ width: `${cp.consistencyScore}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-foreground">{cp.consistencyScore}%</span>
        <span className="text-[10px] text-muted-foreground">consistency</span>
      </div>

      <span className="text-xs text-muted-foreground">{cp.avgCommitsPerWeek} commits/wk</span>
      <span className="text-xs text-muted-foreground">{cp.activeDaysPerWeek} days/wk</span>

      <span className={`inline-flex items-center gap-1 text-xs font-medium ${traj.color}`}>
        <TrajIcon className="w-3 h-3" />
        {traj.label}
      </span>

      {cp.peakActivityPeriod && (
        <span className="text-[10px] text-muted-foreground">Peak: {cp.peakActivityPeriod}</span>
      )}
    </div>
  );
}

function LanguageBars({ stats }) {
  return (
    <div>
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {stats.map((s, i) => (
          <div
            key={s.language}
            className={`${langColors[i] || "bg-gray-300"} rounded-sm`}
            style={{ width: `${s.percentage}%` }}
            title={`${s.language}: ${s.percentage}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {stats.map((s, i) => (
          <div key={s.language} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${langColors[i] || "bg-gray-300"}`} />
            <span className="text-xs font-medium text-foreground">{s.language}</span>
            <span className="text-[10px] text-muted-foreground">{s.percentage}%</span>
            {s.frameworksDetected.length > 0 && (
              <span className="text-[10px] text-muted-foreground">
                ({s.frameworksDetected.join(", ")})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsSection({ insights }) {
  if (!insights) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Strengths */}
      <div>
        <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide mb-1.5">
          Strengths
        </div>
        <div className="space-y-1.5">
          {insights.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-green-50">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-600" />
              <div>
                <span className="text-xs font-semibold text-foreground">{s.headline}</span>
                <p className="text-[11px] text-muted-foreground leading-snug">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concerns */}
      <div>
        <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wide mb-1.5">
          Concerns
        </div>
        <div className="space-y-1.5">
          {insights.concerns.map((c, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-2 rounded-lg ${
                c.icon === "alert" ? "bg-red-50" : "bg-amber-50"
              }`}
            >
              <AlertTriangle
                className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                  c.icon === "alert" ? "text-red-500" : "text-amber-500"
                }`}
              />
              <div>
                <span className="text-xs font-semibold text-foreground">{c.headline}</span>
                <p className="text-[11px] text-muted-foreground leading-snug">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DemoGithubCard({ applicant, isTopCandidate }) {
  const [expanded, setExpanded] = useState(isTopCandidate);
  const github = applicant.githubAnalysis;

  if (!github) return null;

  // Count statuses for summary
  const statusCounts = github.skillVerification.reduce((acc, s) => {
    const bucket = s.status === "discovered" ? "strong" : s.status;
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="w-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 overflow-hidden">
      {/* Layer 2 banner */}
      <div className="bg-gray-900 px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Layer 2: GitHub Code Analysis
          </span>
        </div>
        <span className="text-[10px] text-gray-500">
          Verified against: {rubricData.client} — {rubricData.role}
        </span>
      </div>

      <CardContent className="pt-4 pb-4">
        {/* Collapsed summary / expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {/* Overall Score circle */}
            {github.overallScore != null && (
              <div
                className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center flex-shrink-0 ${scoreBorder(github.overallScore)}`}
              >
                <span className={`text-sm font-extrabold font-mono ${scoreColor(github.overallScore)}`}>
                  {github.overallScore}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">
                @{github.username}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{github.totalRepos} repos</span>
              <span>{github.totalCommits.toLocaleString()} commits</span>
              <span>{github.accountAge}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mini status summary */}
            <div className="flex items-center gap-1.5">
              {statusCounts.strong > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {statusCounts.strong}
                </span>
              )}
              {statusCounts.moderate > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {statusCounts.moderate}
                </span>
              )}
              {(statusCounts.weak || 0) + (statusCounts.not_found || 0) > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {(statusCounts.weak || 0) + (statusCounts.not_found || 0)}
                </span>
              )}
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-4 space-y-4">
            {/* Code Quality Badges + Contribution Patterns */}
            {github.codeQuality && (
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Code Quality
                </div>
                <CodeQualityBadges cq={github.codeQuality} />
              </div>
            )}

            {github.contributionPatterns && (
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Contribution Patterns
                </div>
                <ContributionBar cp={github.contributionPatterns} />
              </div>
            )}

            {/* Language breakdown bars */}
            {github.languageStats && github.languageStats.length > 0 && (
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Language Breakdown
                </div>
                <LanguageBars stats={github.languageStats} />
              </div>
            )}

            {/* Insights — strengths & concerns */}
            {github.insights && (
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Key Insights
                </div>
                <InsightsSection insights={github.insights} />
              </div>
            )}

            {/* Skill verification grid */}
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
                Rubric Skill Verification
              </div>
              <div className="space-y-1.5">
                {github.skillVerification.map((item) => (
                  <SkillVerificationRow key={item.skill} item={item} />
                ))}
              </div>
            </div>

            {/* Discoveries */}
            {github.discoveries.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                    Discovered Skills (not on resume)
                  </span>
                </div>
                <div className="space-y-1.5">
                  {github.discoveries.map((d) => (
                    <div
                      key={d.skill}
                      className={`flex items-start gap-2 p-2.5 rounded-lg ${
                        d.relevant ? "bg-blue-50" : "bg-gray-50"
                      }`}
                    >
                      <Sparkles
                        className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          d.relevant ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{d.skill}</span>
                        {d.relevant && (
                          <span className="ml-1.5 text-[10px] font-bold text-blue-600 uppercase">
                            Relevant
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overall assessment */}
            <div className="p-3 rounded-md bg-gray-900 text-gray-300">
              <div className="flex items-center gap-1.5 mb-1">
                <Github className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Code Analysis Summary
                </span>
              </div>
              <p className="text-sm leading-relaxed">{github.overallAssessment}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
