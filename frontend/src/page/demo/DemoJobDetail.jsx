import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft, Check, ChevronDown, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListDetailsToggle } from "@/components/component/resuable/ListDetailsToggleButton";
import DemoResumeCard from "./DemoResumeCard";
import DemoGithubCard from "./DemoGithubCard";
import { Input } from "@/components/ui/input";
import { rubricData, suggestedCandidates, demoApplications } from "@/lib/demo-data";
import AddCandidate from "@/components/component/candidate/AddCandidateEnhanced";

const demoInterviewQuestions = [
  "You'll be the sole full-stack developer owning both the Flutter frontend and Python backend. Walk me through how you'd architect a new feature end-to-end — from Flutter UI to REST API to Azure deployment. What decisions do you make at each layer?",
  "Describe your experience with Flutter state management at scale. When would you choose BLoC over Riverpod, and how do you handle state that needs to be shared between deeply nested widgets and background services?",
  "Our backend handles AI/ML inference workflows that can take 5-30 seconds. How would you design the Python REST API and Flutter client to handle these long-running operations without blocking the UI or timing out?",
  "Tell me about a time you had to debug a performance issue in a Flutter app. What tools did you use, what was the root cause, and how did you verify the fix improved performance?",
  "We use Azure App Service, Azure Functions, and Cosmos DB. How would you design a CI/CD pipeline that deploys both the Flutter app and Python API with zero downtime? What testing gates would you include?",
  "Our app collects high-volume user event data that feeds into ML pipelines. Design a MongoDB schema and API architecture that handles 10K+ events per minute while keeping read queries fast for the Flutter dashboard.",
  "You mentioned experience with on-device ML integration. Walk me through how you'd integrate a TensorFlow Lite model into a Flutter app — from model loading to inference to displaying results. What are the platform-specific considerations for iOS vs Android?",
  "As the sole developer, you'll need to make architectural trade-offs without a team to consult. Give me an example of a significant technical decision you made independently — what alternatives did you consider, and how did you validate your choice?",
  "How do you approach testing in a full-stack environment? Specifically, how would you set up testing for a Flutter app that communicates with a Python FastAPI backend — unit tests, integration tests, and end-to-end tests?",
  "Our product roadmap includes real-time collaborative features. How would you implement WebSocket or Server-Sent Events communication between a Flutter client and Python backend deployed on Azure? What are the scaling considerations?",
];

const proficiencyColors = {
  "Advanced+": "bg-blue-50 text-blue-800 border-blue-200",
  "Intermediate+": "bg-green-50 text-green-800 border-green-200",
  "Any experience": "bg-yellow-50 text-yellow-800 border-yellow-200",
  "Any exposure": "bg-gray-50 text-gray-500 border-gray-200",
};

function ProficiencyBadge({ level }) {
  const cls = proficiencyColors[level] || proficiencyColors["Any exposure"];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border font-mono ${cls}`}>
      {level}
    </span>
  );
}

function SkillRow({ skill, proficiency, checked, tierColor }) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border border-gray-100 mb-1.5 transition-all ${
        isChecked ? "bg-white" : "bg-gray-50 opacity-45"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          onClick={() => setIsChecked(!isChecked)}
          className={`w-[18px] h-[18px] rounded flex items-center justify-center cursor-pointer shrink-0 transition-all ${
            isChecked ? "" : "border-2 border-gray-300"
          }`}
          style={{ background: isChecked ? tierColor : "transparent" }}
        >
          {isChecked && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="font-semibold text-[15px] text-gray-900">{skill}</span>
      </div>
      <ProficiencyBadge level={proficiency} />
    </div>
  );
}

function TierSection({ title, subtitle, skills, tierColor, bgColor, borderColor }) {
  return (
    <div className="rounded-xl border overflow-hidden mb-4" style={{ borderColor }}>
      <div className="px-5 py-3.5" style={{ background: bgColor, borderBottom: `1px solid ${borderColor}` }}>
        <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: tierColor }}>
          {title}
        </span>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="p-4 bg-white">
        {skills.map((item) => (
          <SkillRow key={item.skill} {...item} tierColor={tierColor} />
        ))}
      </div>
    </div>
  );
}

const DemoJobDetail = () => {
  const navigate = useNavigate();
  const [legendOpen, setLegendOpen] = useState(false);
  const [listView, setListView] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedQs, setSelectedQs] = useState(new Set());
  const [newQuestion, setNewQuestion] = useState("");

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer justify-center absolute -top-2 -left-4 w-10 h-10 rounded-full bg-white p-2 hover:bg-gray-100"
          onClick={() => navigate("/demo/jobs")}
        >
          <CircleArrowLeft className="w-5 h-5 text-gray-600" />
        </div>
        <div className="shadow-lg rounded-lg px-6 py-6 border bg-black text-white">
          <div className="flex gap-2 items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold">{rubricData.role}</h1>
                <span className="bg-red-500/20 text-red-400 px-3 py-0.5 rounded-full text-xs font-bold">
                  {rubricData.priority} PRIORITY
                </span>
              </div>
              <p className="text-gray-400 mt-1">
                {rubricData.client} · {rubricData.department}
              </p>
            </div>
            <p className="text-gray-400 text-sm">Established: {rubricData.established}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="hiring-rubric">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="hiring-rubric"
              >
                Hiring Rubric
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="job-details"
              >
                Job Details
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="job-questions"
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="job-interviews"
              >
                Interviews
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="ATS"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="suggested-candidates"
              >
                Suggested Candidates
              </TabsTrigger>
            </TabsList>
            <AddCandidate jobData={{ id: "demo", job_name: rubricData.role }} onCloseCb={() => {}}>
              <Button className="bg-red-700 shadow-2xl rounded-full m-1">
                + Add Candidate
              </Button>
            </AddCandidate>
          </div>

          {/* ── HIRING RUBRIC TAB ── */}
          <TabsContent className="mt-0" value="hiring-rubric">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              {/* Info chips */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {[
                  { label: "Location", value: rubricData.location },
                  { label: "Headcount", value: rubricData.headcount },
                  { label: "Target Start", value: rubricData.targetStart },
                  { label: "Engagement", value: rubricData.engagement },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 px-4 py-2.5 rounded-lg flex-1 min-w-[140px]">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Proficiency Legend */}
              <div className="bg-white border rounded-xl px-5 py-4 mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setLegendOpen(!legendOpen)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📊</span>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                      How Elexis Assesses Proficiency
                    </span>
                    <span className="text-xs text-gray-400">
                      — click to {legendOpen ? "collapse" : "expand"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${legendOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {legendOpen && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                      Proficiency is triangulated across three data sources — resume, GitHub code evidence,
                      and AI screening interview. Not self-reported years.
                    </p>
                    {[
                      {
                        badge: "Advanced+",
                        desc: "Solves complex problems independently, sound technical decisions",
                        signals:
                          "Resume: used in 1-2 roles with accomplishments · GitHub: 5+ repos · Interview: explains decisions",
                      },
                      {
                        badge: "Intermediate+",
                        desc: "Builds features with moderate guidance, core concepts solid",
                        signals:
                          "Resume: listed with project context · GitHub: 2-4 repos · Interview: can build",
                      },
                      {
                        badge: "Any experience",
                        desc: "Has worked with it in some capacity",
                        signals:
                          "Resume: mentioned in any context · GitHub: 1+ repos · Interview: basic understanding",
                      },
                      {
                        badge: "Any exposure",
                        desc: "Familiar with it, even if limited",
                        signals:
                          "Resume: listed · GitHub: any evidence · Interview: can discuss conceptually",
                      },
                    ].map((l) => (
                      <div key={l.badge} className="py-2.5 border-b border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <ProficiencyBadge level={l.badge} />
                          <span className="text-sm text-gray-700 font-medium">{l.desc}</span>
                        </div>
                        <div className="text-xs text-gray-400 ml-1 leading-relaxed font-mono">
                          {l.signals}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skill Tiers */}
              <TierSection
                title="Must Have — Knockout Criteria"
                subtitle="Non-negotiable. Candidates without these will not be shown."
                skills={rubricData.mustHave}
                tierColor="#DC2626"
                bgColor="#FEF2F2"
                borderColor="#FECACA"
              />
              <TierSection
                title="Should Have — Strong Preference"
                subtitle="Candidates with these score significantly higher."
                skills={rubricData.shouldHave}
                tierColor="#D97706"
                bgColor="#FFF7ED"
                borderColor="#FED7AA"
              />
              <TierSection
                title="Nice to Have — Bonus Points"
                subtitle="Won't disqualify without, but adds to the score."
                skills={rubricData.niceToHave}
                tierColor="#6B7280"
                bgColor="#F9FAFB"
                borderColor="#E5E7EB"
              />

              {/* Parameters */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 text-gray-900">
                    <span>⚙️</span> Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {[
                    {
                      label: "Experience Range",
                      value: `${rubricData.parameters.experienceMin} — ${rubricData.parameters.experienceMax} years total`,
                    },
                    {
                      label: "Salary Budget",
                      value: `${rubricData.parameters.salaryMin} — ${rubricData.parameters.salaryMax} /year`,
                    },
                    { label: "Location", value: rubricData.parameters.location },
                    { label: "Availability", value: rubricData.parameters.availability },
                    { label: "Max Notice Period", value: rubricData.parameters.noticePeriodMax },
                  ].map((param) => (
                    <div
                      key={param.label}
                      className="flex justify-between items-center py-3 border-b border-gray-100"
                    >
                      <span className="text-sm text-gray-500 font-medium">{param.label}</span>
                      <span className="bg-gray-100 px-3.5 py-1.5 rounded-md text-sm font-semibold text-gray-900 font-mono">
                        {param.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Culture & Soft Skills */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 text-gray-900">
                    <span>🤝</span> Culture & Soft Skills
                    <span className="text-xs font-medium text-gray-400 normal-case tracking-normal font-sans">
                      (Optional)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {rubricData.culture.map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 py-2">
                      <div
                        className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 ${
                          item.checked ? "bg-cyan-600" : "border-2 border-gray-300"
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span
                        className={`text-sm ${
                          item.checked ? "text-gray-900 font-medium" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Note */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl px-6 py-5 mb-6">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider font-mono">
                    ELEXIS AI
                  </span>
                  <span className="text-xs text-gray-500">Assessment of this rubric</span>
                </div>
                <p className="text-sm leading-relaxed text-teal-800 italic">
                  &ldquo;{rubricData.aiNote}&rdquo;
                </p>
              </div>

              {/* CTA */}
              <Button
                className="w-full py-6 bg-red-700 hover:bg-red-800 text-white text-base font-bold rounded-xl"
                onClick={() => navigate("/demo/candidate")}
              >
                View Matched Candidate →
              </Button>

              <div className="text-center py-6 text-xs text-gray-400">
                Rubric established by Elexis AI · Skills assessed by proficiency level, not self-reported
                years
              </div>
            </div>
          </TabsContent>

          {/* ── OTHER TABS (placeholder) ── */}
          <TabsContent className="mt-0" value="job-details">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="grid grid-cols-8 gap-x-8 space-y-4">
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <div className="text-muted-foreground">
                    <p>
                      <span className="font-semibold">CTC Range:</span> {rubricData.parameters.salaryMin} -{" "}
                      {rubricData.parameters.salaryMax}
                    </p>
                    <p>
                      <span className="font-semibold">Key Skills:</span>{" "}
                      {[...rubricData.mustHave, ...rubricData.shouldHave]
                        .map((s) => s.skill)
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <h3 className="font-semibold text-lg">Job Description</h3>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      As our primary full-stack developer, you'll be in charge of our complete mobile app
                      stack: Flutter frontend, Python REST API backend, and Azure deployment. On the
                      front-end side, you'll be responsible for translating UI mockups and requirements into
                      smooth, polished, user-friendly, and well-maintained features for our cross-platform
                      consumer mobile app. You'll seamlessly integrate app functions, user events, and
                      AI-powered data processing workflows with our API. You'll be leading front-end testing
                      efforts to ensure top-notch app performance in the hands of our customers. On the
                      back-end side, you'll be responsible for designing, building, maintaining, improving, and
                      expanding our Python REST API and Azure cloud architecture to support fast, scalable
                      business logic implementations, data-heavy AI/ML workflows, 3rd-party API
                      integrations, and high-performance database operations. You'll work closely with AI/ML
                      and the executive team to keep our backend infrastructure in lockstep with our mobile
                      app at scale, supporting continuously improving high-value inference capabilities,
                      smooth external integrations, and snappy responsiveness.
                    </p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What you'll be doing:</h4>
                      <ul className="list-disc pl-6 space-y-1.5">
                        <li>Designing, developing, testing, deploying, and maintaining high-quality, reliable, user-friendly, and fast mobile app software built with Dart in the Flutter framework, following best practices and industry standards</li>
                        <li>Building primarily for iOS in the near-term, working toward Android support in the mid-term</li>
                        <li>Building UI components and event logic to support a variety of end-user business cases, working closely with the executive team to refine requirements into executable development plans, system architectures, and clean, testable code</li>
                        <li>Integrating on-device AI/ML features for high-powered user experience</li>
                        <li>Owning the front-end across the SDLC</li>
                        <li>Designing, developing, testing, and maintaining Python REST APIs with AI/ML integrations according to Python best practices and REST API industry standards, translating business requirements and app features into well-designed high-performing APIs</li>
                        <li>Designing, building, maintaining, and optimizing Azure architecture to meet requirements driven by the growing needs of the app, app user base, and B2B clients, including event-driven user data collection and external integration support</li>
                        <li>Administering MongoDB, improving database operations efficiency and expanding the scope of data flow handling for increasing data modalities & throughput requirements</li>
                        <li>Supporting efficient & scalable AI/ML inference and training workflows</li>
                        <li>Owning the complete back-end tech stack across the SDLC, with a focus on test-driven development for robust pre-DevOps system reliability</li>
                        <li>Participating in Agile-Scrum process (daily standups, sprint planning & retrospectives) with the caveat that as an early-stage high-energy team, our plans may change quickly and we'll need to stay ready to meet the market</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What you bring:</h4>
                      <ul className="list-disc pl-6 space-y-1.5">
                        <li>2-4 years combined full-stack development experience, working on mobile apps (frontend and backend) with increasing role responsibility and complexity</li>
                        <li>1-3 years of front-end mobile app development experience</li>
                        <li>1-2 years experience building high-traffic mobile apps in Dart/Flutter with a strong grasp of Flutter best practices and performant, scalable backend integration</li>
                        <li>iOS experience a must; iOS+Android experience preferred</li>
                        <li>1-3 years of backend & REST/RESTful API development experience in Python</li>
                        <li>1-2 years of Azure experience with a focus on optimizing performance for high-traffic consumer applications</li>
                        <li>1-2 years working with MongoDB or related NoSQL db technologies</li>
                        <li>Experience working on AI/ML-powered systems strongly preferred; you don't need to be an AI/ML expert, but it would be awesome if you've worked with AI/ML features (both in cloud and on-device) and have the skills/experience to integrate, test/validate, and performance-optimize AI/ML workflows with minimal oversight</li>
                        <li>You'll be our front-end and back-end architect, developer, tester, and administrator, so the ability to operate independently and deliver on requirements without a support team is critical</li>
                        <li>Small team/startup experience strongly preferred</li>
                        <li>Bachelors in Computer Science, Computer Engineering, Software Engineering, Mathematics, UI/UX, or similar preferred (but not required)</li>
                        <li>Excellent communicator and creative problem-solver; you can distil complex concepts and technical details into clear, succinct communications, you make sure requirements are well-understood and met before delivering code, you proactively keep stakeholders informed, and you take the initiative on solutions</li>
                        <li>Deliver clean, modular, readable, well-tested code</li>
                        <li>Strong sense of ownership, melding big-picture vision with domain expertise to go above and beyond basic requirements to build a great product that users love & that scales effortlessly</li>
                        <li>Agility, versatility, and thriving under pressure</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What we offer:</h4>
                      <ul className="list-disc pl-6 space-y-1.5">
                        <li>You'll get to be a key part of a small, lean, early-stage team; you'll totally own your piece of the product, and will have significant long-term impact on product design, functionality, and user experience philosophy, as well as the opportunity to grow with us and advance into a leadership role down the line</li>
                        <li>Creative freedom, high-level collaboration, remote-first workplace</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent className="mt-0" value="job-questions">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-lg">Questions</h2>
                {questions.length > 0 && (
                  <span className="text-xs text-amber-600 font-medium">
                    Minimum 10 questions required
                  </span>
                )}
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Type your question here..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newQuestion.trim()) {
                      setQuestions([...questions, newQuestion.trim()]);
                      setNewQuestion("");
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    if (newQuestion.trim()) {
                      setQuestions([...questions, newQuestion.trim()]);
                      setNewQuestion("");
                    }
                  }}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>

              {/* Generate button */}
              <Button
                className="w-full mt-4 py-6 bg-gray-900 hover:bg-gray-800 text-white text-base font-medium"
                onClick={() => {
                  setQuestions(demoInterviewQuestions);
                  setSelectedQs(new Set());
                }}
              >
                Generate Questions?
              </Button>

              {/* Questions list */}
              {questions.length > 0 && (
                <div className="mt-4 max-h-[500px] overflow-y-auto space-y-3 pr-1">
                  {questions.map((q, i) => {
                    const isSelected = selectedQs.has(i);
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 border rounded-lg px-4 py-3 transition-colors ${
                          isSelected ? "bg-green-50 border-green-200" : ""
                        }`}
                      >
                        <p className={`text-sm flex-1 leading-relaxed ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                          <span className="font-semibold text-gray-500">* </span>
                          {q}
                        </p>
                        <button
                          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600"
                          }`}
                          onClick={() => {
                            const next = new Set(selectedQs);
                            if (isSelected) {
                              next.delete(i);
                            } else {
                              next.add(i);
                            }
                            setSelectedQs(next);
                          }}
                        >
                          {isSelected ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-lg leading-none">+</span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Save / Close */}
              <div className="mt-4 flex gap-3">
                <Button
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => alert(`Demo: ${selectedQs.size} questions saved!`)}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuestions([]);
                    setSelectedQs(new Set());
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent className="mt-0" value="job-interviews">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <h2 className="font-semibold text-lg mb-4">Scheduled Interviews</h2>
              <Table className="overflow-x-auto w-full">
                <TableCaption>Interviews for this job</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Time</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center font-medium">Rahul Kumar</TableCell>
                    <TableCell className="text-center">rahul.k94@gmail.com</TableCell>
                    <TableCell className="text-center">2026-02-03</TableCell>
                    <TableCell className="text-center">00:22:00</TableCell>
                    <TableCell className="text-center">
                      <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-semibold">COMPLETED</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary"
                        onClick={() => navigate("/demo/candidate")}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-center font-medium">Priya Sharma</TableCell>
                    <TableCell className="text-center">priyasharma.dev@outlook.com</TableCell>
                    <TableCell className="text-center">2026-02-10</TableCell>
                    <TableCell className="text-center">00:30:00</TableCell>
                    <TableCell className="text-center">
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">NOT JOINED</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-400">—</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent className="mt-0" value="ATS">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              {/* Sub-tabs matching existing ATS pattern */}
              <Tabs defaultValue="inbound">
                <TabsList className="bg-background mb-4">
                  <TabsTrigger value="inbound" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Inbound Applicants
                  </TabsTrigger>
                  <TabsTrigger value="selected" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Selected for Interview
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Interview Scheduled
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Interview Completed
                  </TabsTrigger>
                </TabsList>

                {/* Inbound Applicants — with List/Detail toggle */}
                <TabsContent value="inbound">
                  <ListDetailsToggle listView={listView} setListView={setListView} />

                  {!listView ? (
                    /* Detail View — Layer 1 (Resume) + Layer 2 (GitHub) stacked per candidate */
                    <div className="space-y-6">
                      {demoApplications.map((applicant) => {
                        const isShortlisted = applicant.id === "app-1" || applicant.id === "app-2";
                        return (
                          <div key={applicant.id} className="space-y-2">
                            {/* Action bar */}
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="text-xs">
                                    {applicant.candidate.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">{applicant.candidate.name}</span>
                                <span className="text-xs text-gray-500">{applicant.candidate.email}</span>
                              </div>
                              <div className="flex gap-2">
                                {isShortlisted ? (
                                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-xs font-semibold cursor-not-allowed">
                                    <CheckCircle className="w-3.5 h-3.5" /> Shortlisted
                                  </span>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95"
                                    onClick={() => alert("Demo mode: Candidate shortlisted!")}
                                  >
                                    Shortlist
                                  </Button>
                                )}
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="bg-red-400 text-black hover:bg-red-300 hover:scale-95"
                                  onClick={() => alert("Demo mode: Candidate archived!")}
                                >
                                  Archive
                                </Button>
                              </div>
                            </div>
                            <DemoResumeCard
                              applicant={applicant}
                              isTopCandidate={applicant.id === "app-1"}
                            />
                            <DemoGithubCard
                              applicant={applicant}
                              isTopCandidate={applicant.id === "app-1"}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* List View — Table */
                    <Table className="overflow-x-auto w-full">
                      <TableCaption>
                        Applications added for this job, sorted by their acceptability for this Job
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">Name</TableHead>
                          <TableHead className="text-center">Email</TableHead>
                          <TableHead className="text-center">Phone</TableHead>
                          <TableHead className="text-center">Added By</TableHead>
                          <TableHead className="text-center">Added At</TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {demoApplications.map((applicant) => {
                          const isShortlisted = applicant.id === "app-1" || applicant.id === "app-2";
                          return (
                            <TableRow key={applicant.id}>
                              <TableCell className="text-center">
                                <span className="font-medium hover:underline cursor-pointer">
                                  {applicant.candidate.name}
                                </span>
                              </TableCell>
                              <TableCell className="text-center">
                                {applicant.candidate.email}
                              </TableCell>
                              <TableCell className="text-center">
                                {applicant.candidate.phone_number}
                              </TableCell>
                              <TableCell className="text-center">
                                {applicant.created_by.name}
                              </TableCell>
                              <TableCell className="text-center">
                                {new Date(applicant.created_date).toLocaleString()}
                              </TableCell>
                              <TableCell className="text-center flex flex-wrap justify-center gap-2">
                                {isShortlisted ? (
                                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-xs font-semibold cursor-not-allowed">
                                    <CheckCircle className="w-3.5 h-3.5" /> Shortlisted
                                  </span>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95"
                                    onClick={() => alert("Demo mode: Candidate shortlisted!")}
                                  >
                                    Shortlist
                                  </Button>
                                )}
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="bg-red-400 text-black hover:bg-red-300 hover:scale-95"
                                  onClick={() => alert("Demo mode: Candidate archived!")}
                                >
                                  Archive
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                {/* Selected for Interview — Rahul + Priya */}
                <TabsContent value="selected">
                  <Table className="overflow-x-auto w-full">
                    <TableCaption>Candidates shortlisted and selected for AI interview</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Role Fit</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Selected By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[demoApplications[0], demoApplications[1]].map((applicant) => {
                        const isRahul = applicant.id === "app-1";
                        return (
                          <TableRow key={applicant.id}>
                            <TableCell className="text-center font-medium">{applicant.candidate.name}</TableCell>
                            <TableCell className="text-center">{applicant.candidate.email}</TableCell>
                            <TableCell className="text-center">
                              <span className={`font-mono font-bold ${isRahul ? "text-green-700" : "text-amber-700"}`}>
                                {applicant.ai_evaluations[0].roleFitScore}%
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              {isRahul ? (
                                <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-semibold">Interview Completed</span>
                              ) : (
                                <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">Interview Scheduled</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center text-sm text-gray-500">Hardik</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Interview Scheduled — Priya only */}
                <TabsContent value="scheduled">
                  <Table className="overflow-x-auto w-full">
                    <TableCaption>Candidates with scheduled AI interviews</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Role Fit</TableHead>
                        <TableHead className="text-center">Interview Date</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-center font-medium">Priya Sharma</TableCell>
                        <TableCell className="text-center">priyasharma.dev@outlook.com</TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono font-bold text-amber-700">72%</span>
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          Feb 10, 2026 · 11:00 AM IST
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">Scheduled</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                {/* Interview Completed — Rahul only */}
                <TabsContent value="completed">
                  <Table className="overflow-x-auto w-full">
                    <TableCaption>Candidates who have completed the AI interview</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Role Fit</TableHead>
                        <TableHead className="text-center">Interview Date</TableHead>
                        <TableHead className="text-center">Recommendation</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-center font-medium">Rahul Kumar</TableCell>
                        <TableCell className="text-center">rahul.k94@gmail.com</TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono font-bold text-green-700">87%</span>
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          Feb 3, 2026 · 2:00 PM IST
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-bold">STRONG FIT</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-red-700 hover:bg-red-800 text-white"
                            onClick={() => navigate("/demo/candidate")}
                          >
                            View Profile →
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent className="mt-0" value="suggested-candidates">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="mb-5">
                <h2 className="font-bold text-xl">Candidate Rediscovery</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Candidates from other job pipelines who may be a strong fit for this role. Shortlist to add them to this job's inbound applicants.
                </p>
              </div>
              {suggestedCandidates.map((candidate) => {
                const scoreColor =
                  candidate.roleFitScore >= 75
                    ? "text-green-700"
                    : candidate.roleFitScore >= 60
                      ? "text-amber-700"
                      : "text-red-700";
                const scoreBg =
                  candidate.roleFitScore >= 75
                    ? "bg-green-50"
                    : candidate.roleFitScore >= 60
                      ? "bg-amber-50"
                      : "bg-red-50";
                return (
                  <Card key={candidate.id} className="mb-4">
                    <CardContent className="pt-6">
                      {/* Source job badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          Originally applied for:
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {candidate.sourceJob}
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-primary font-medium">Rediscovered for this role</span>
                      </div>

                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gray-200 text-sm font-semibold">
                              {candidate.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-base">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {candidate.currentRole} · {candidate.company}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {candidate.email} · {candidate.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">
                              Role Fit
                            </div>
                            <div className={`text-2xl font-extrabold font-mono ${scoreColor}`}>
                              {candidate.roleFitScore}%
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-red-700 hover:bg-red-800 text-white"
                            onClick={() => alert(`Demo: ${candidate.name} shortlisted — moved to Inbound Applicants for this job.`)}
                          >
                            Shortlist
                          </Button>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <Progress value={candidate.roleFitScore} className="h-1.5" />
                      </div>

                      {/* Recommendation */}
                      <div className={`mt-3 p-3 rounded-lg ${scoreBg}`}>
                        <p className="text-sm text-gray-700">{candidate.recommendation}</p>
                      </div>

                      {/* Matched skills + Gaps */}
                      <div className="flex gap-6 mt-3">
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                            Matched Skills
                          </span>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {candidate.matchedSkills.map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center gap-1 bg-green-50 text-green-800 px-2 py-0.5 rounded text-[11px] font-medium"
                              >
                                <CheckCircle className="w-3 h-3" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        {candidate.missingRequirements.length > 0 && (
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                              Gaps
                            </span>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {candidate.missingRequirements.map((m) => (
                                <span
                                  key={m}
                                  className="inline-flex items-center gap-1 bg-red-50 text-red-800 px-2 py-0.5 rounded text-[11px] font-medium"
                                >
                                  <XCircle className="w-3 h-3" />
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DemoJobDetail;
