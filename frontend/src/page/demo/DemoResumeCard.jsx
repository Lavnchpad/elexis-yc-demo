import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";
import { rubricData } from "@/lib/demo-data";

// Parse **bold:** markdown in text
function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ScoreCircle({ score, size = 72 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  const bgColor =
    score >= 75 ? "#f0fdf4" : score >= 60 ? "#fffbeb" : "#fef2f2";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={bgColor}
          stroke="#e5e7eb"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-lg font-extrabold font-mono"
          style={{ color }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

function RubricSkillBadges({ keySkills, missingSkills }) {
  // Collect all rubric skills
  const allRubricSkills = [
    ...rubricData.mustHave.map((s) => ({ ...s, tier: "must" })),
    ...rubricData.shouldHave.map((s) => ({ ...s, tier: "should" })),
    ...rubricData.niceToHave.map((s) => ({ ...s, tier: "nice" })),
  ];

  const keySkillsLower = keySkills.map((s) => s.toLowerCase());
  const missingLower = missingSkills.map((s) => s.toLowerCase().split(" (")[0]);

  return (
    <div className="flex flex-wrap gap-1.5">
      {allRubricSkills.map((rubricSkill) => {
        const skillLower = rubricSkill.skill.toLowerCase();
        const isMatched = keySkillsLower.some(
          (ks) => ks.includes(skillLower) || skillLower.includes(ks.split("/")[0])
        );
        const isMissing = missingLower.some(
          (ms) => ms.includes(skillLower) || skillLower.includes(ms.split("/")[0])
        );

        const tierColors = {
          must: isMatched
            ? "bg-green-100 text-green-800 border-green-300"
            : isMissing
              ? "bg-red-100 text-red-800 border-red-300"
              : "bg-gray-100 text-gray-500 border-gray-200",
          should: isMatched
            ? "bg-green-50 text-green-700 border-green-200"
            : isMissing
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-gray-50 text-gray-400 border-gray-200",
          nice: isMatched
            ? "bg-green-50 text-green-600 border-green-200"
            : isMissing
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-gray-50 text-gray-400 border-gray-200",
        };

        return (
          <span
            key={rubricSkill.skill}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium ${tierColors[rubricSkill.tier]}`}
          >
            {isMatched ? (
              <CheckCircle className="w-3 h-3" />
            ) : isMissing ? (
              <XCircle className="w-3 h-3" />
            ) : null}
            {rubricSkill.skill}
          </span>
        );
      })}
    </div>
  );
}

// One-liner signal strength from text
function signalLevel(text) {
  const t = text.toLowerCase();
  if (t.startsWith("high") || t.startsWith("strong") || t.includes("tier 1")) return "high";
  if (t.startsWith("very low") || t.startsWith("below")) return "low";
  if (t.startsWith("low") || t.startsWith("early")) return "low";
  return "mid";
}

const signalColors = {
  high: "bg-green-500",
  mid: "bg-amber-500",
  low: "bg-red-500",
};

function SignalRow({ label, text }) {
  const level = signalLevel(text);
  // Extract first sentence as summary
  const summary = text.split(". ")[0] + ".";
  const hasMore = text.length > summary.length;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex items-start gap-3 py-2">
      <span className={`mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0 ${signalColors[level]}`} />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {expanded ? text : summary}
        </p>
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline mt-0.5"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

function AnalysisSection({ icon: Icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

export default function DemoResumeCard({ applicant, isTopCandidate }) {
  const navigate = useNavigate();
  const [detailOpen, setDetailOpen] = useState(false);
  const eval_ = applicant.ai_evaluations[0];
  const candidate = applicant.candidate;

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const recText = eval_.recommendation.overallRecommendation;
  const isRecommended =
    recText.toLowerCase().includes("highly recommended") ||
    (recText.toLowerCase().includes("recommended") &&
      !recText.toLowerCase().includes("not recommended"));
  const recColor = recText.toLowerCase().includes("not recommended")
    ? "text-red-700"
    : recText.toLowerCase().includes("highly")
      ? "text-green-700"
      : "text-amber-700";
  const recBg = recText.toLowerCase().includes("not recommended")
    ? "bg-red-50 border-l-red-500"
    : recText.toLowerCase().includes("highly")
      ? "bg-green-50 border-l-green-500"
      : "bg-amber-50 border-l-amber-500";
  const RecIcon = recText.toLowerCase().includes("not recommended")
    ? XCircle
    : isRecommended
      ? CheckCircle
      : Target;

  return (
    <Card className="w-full shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 overflow-hidden">
      {/* Layer 1 badge */}
      <div className="bg-gray-900 px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Layer 1: Resume Analysis
          </span>
        </div>
        <span className="text-[10px] text-gray-500">
          Scored against: {rubricData.client} — {rubricData.role}
        </span>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">
                {candidate.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {candidate.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {candidate.phone_number}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <ScoreCircle score={eval_.roleFitScore} />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mt-1">
                Resume Fit
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {isTopCandidate ? (
                <Button
                  size="sm"
                  className="bg-red-700 hover:bg-red-800 text-white"
                  onClick={() => navigate("/demo/candidate")}
                >
                  View Full Profile →
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95"
                  onClick={() => alert("Demo mode: Candidate shortlisted!")}
                >
                  Shortlist
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Rubric skill match badges */}
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">
            Rubric Skill Match
          </div>
          <RubricSkillBadges
            keySkills={eval_.roleFitAnalysis.keySkills}
            missingSkills={eval_.gapsAndImprovements.missingSkills}
          />
        </div>

        {/* Recommendation */}
        <div className={`p-4 rounded-lg border-l-4 ${recBg}`}>
          <div className="flex items-center gap-2 mb-2">
            <RecIcon className={`h-5 w-5 ${recColor}`} />
            <h3 className="font-semibold text-foreground">Recommendation</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recText}
          </p>
        </div>

        {/* Relevant Sections */}
        <div>
          <h4 className="font-medium text-sm mb-2 text-foreground">
            Relevant Sections
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {eval_.directComparison.relevantSections.map((section, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <RichText text={section} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Requirements */}
        {eval_.directComparison.missingRequirements.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 text-foreground">
              Missing Requirements
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              {eval_.directComparison.missingRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Analysis — collapsible */}
        <div>
          <button
            onClick={() => setDetailOpen(!detailOpen)}
            className="flex justify-between items-center w-full py-2"
          >
            <h3 className="font-bold text-sm">Detailed Analysis</h3>
            {detailOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {detailOpen && (
            <div className="space-y-2 mt-2">
              <AnalysisSection
                icon={Briefcase}
                title="Background Analysis"
                defaultOpen={isTopCandidate}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Industry Context
                    </h4>
                    <p className="text-sm text-foreground">
                      {eval_.backgroundAnalysis.industryContext}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Company Background
                    </h4>
                    <p className="text-sm text-foreground">
                      {eval_.backgroundAnalysis.companyBackground}
                    </p>
                  </div>
                </div>
                {/* Relevance callout — the key takeaway */}
                <div className="mt-3 p-3 rounded-md bg-primary/5 border border-primary/15">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Target className="h-3.5 w-3.5 text-primary" />
                    <h4 className="font-semibold text-xs text-primary uppercase tracking-wide">
                      Rubric Relevance
                    </h4>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {eval_.backgroundAnalysis.relevance}
                  </p>
                </div>
              </AnalysisSection>

              <AnalysisSection
                icon={Target}
                title="Role Fit Analysis"
                defaultOpen={isTopCandidate}
              >
                <div>
                  <h4 className="font-medium text-sm mb-1 text-foreground">
                    Job Title Match
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {eval_.roleFitAnalysis.jobTitleMatch}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1 text-foreground">
                    Experience Level
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {eval_.roleFitAnalysis.experienceLevel}
                  </p>
                </div>
              </AnalysisSection>

              <AnalysisSection icon={TrendingUp} title="Hiring Signals">
                <div className="divide-y">
                  <SignalRow label="Resume Quality" text={eval_.hiringSignals.resumeQuality} />
                  <SignalRow label="Career Trajectory" text={eval_.hiringSignals.careerTrajectory} />
                  <SignalRow label="Prestige Factors" text={eval_.hiringSignals.prestigeFactors} />
                  <SignalRow label="Transition Ease" text={eval_.hiringSignals.transitionEase} />
                </div>
              </AnalysisSection>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
