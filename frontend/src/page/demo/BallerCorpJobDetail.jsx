import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft, CheckCircle, PlusCircle, Pencil, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListDetailsToggle } from "@/components/component/resuable/ListDetailsToggleButton";
import DemoResumeCard from "./DemoResumeCard";
import DemoGithubCard from "./DemoGithubCard";
import { ballerCorpRubricData, ballerCorpApplications } from "@/lib/demo-data";

const demoInterviewQuestions = [
  "Walk me through how you'd architect a BLoC for a social feed — events for initial load, pagination, real-time new posts via WebSocket, and pull-to-refresh. How do you handle state collisions when a real-time update arrives while the user is still paginating?",
  "Describe your experience migrating from Provider (or Riverpod) to BLoC. What drove the decision, how did you manage the migration without breaking production, and what did you measure to confirm it was worth it?",
  "We integrate GetStream for real-time chat and activity feeds. You haven't used GetStream specifically — walk me through how you'd approach integrating a new streaming SDK into an existing BLoC architecture without breaking existing state flows.",
  "We ship to both iOS and Android. Walk me through a time you hit a platform-specific bug — something that worked on one platform and broke on the other. How did you debug it and what was the fix?",
  "Our founder expects a PR merged into the dev branch every single workday. Walk me through your end-of-day workflow — how do you decide what constitutes a shippable unit of work, how do you handle incomplete features, and what do you do when your PR fails review at 4:55 PM?",
  "We use Stripe for payments and EasyPost for logistics. You haven't used EasyPost before. A shipping label needs to be generated after order confirmation — walk me through how you'd integrate the EasyPost API on the Flutter side, including error handling and state management.",
  "Tell me about the most complex state management problem you've solved. What made it complex, what patterns did you use, and what would you do differently now?",
  "Our app uses Scandit for barcode scanning. Walk me through how you'd integrate a native SDK plugin into a Flutter BLoC architecture — from plugin evaluation to event/state design to error handling.",
  "We're a social marketplace — users create listings, make offers, and complete transactions. Design the BLoC architecture for the listing creation flow: multi-step form, image uploads, draft saving, and final submission with optimistic UI.",
  "How do you approach app performance optimization? Walk through a real example — what was the symptom, how did you diagnose it, what was the root cause, and how did you fix it?",
];

const proficiencyColors = {
  "Advanced": "bg-blue-50 text-blue-800 border-blue-200",
  "Intermediate": "bg-green-50 text-green-800 border-green-200",
  "Beginner": "bg-yellow-50 text-yellow-800 border-yellow-200",
  "Any Experience": "bg-gray-50 text-gray-500 border-gray-200",
};

function ProficiencyBadge({ level }) {
  const cls = proficiencyColors[level] || proficiencyColors["Any Experience"];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border font-mono ${cls}`}>
      {level}
    </span>
  );
}

function SkillRow({ skill, proficiency, checked, tierColor, editMode, onSkillChange, onProficiencyChange, onToggle, onRemove }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border mb-1.5 transition-all ${editMode ? "border-dashed border-gray-300 bg-white" : checked ? "border-gray-100 bg-white" : "border-gray-100 bg-gray-50 opacity-45"}`}>
      <div className="flex items-center gap-3">
        <div
          onClick={onToggle}
          className={`w-[18px] h-[18px] rounded flex items-center justify-center cursor-pointer shrink-0 transition-all ${checked ? "" : "border-2 border-gray-300"}`}
          style={{ background: checked ? tierColor : "transparent" }}
        >
          {checked && <span className="text-white text-xs font-bold">✓</span>}
        </div>
        {editMode ? (
          <input
            value={skill}
            onChange={(e) => onSkillChange(e.target.value)}
            className="text-sm font-medium border-b border-dashed border-gray-300 outline-none bg-transparent"
          />
        ) : (
          <span className="text-sm font-medium text-gray-800">{skill}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {editMode ? (
          <select
            value={proficiency}
            onChange={(e) => onProficiencyChange(e.target.value)}
            className="text-xs border rounded px-2 py-1 bg-white outline-none"
          >
            {Object.keys(proficiencyColors).map((l) => <option key={l}>{l}</option>)}
          </select>
        ) : (
          <ProficiencyBadge level={proficiency} />
        )}
        {editMode && (
          <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function TierSection({ title, subtitle, skills, tierColor, bgColor, borderColor, editMode, onAddSkill, onRemoveSkill, onSkillChange, onProficiencyChange, onToggle }) {
  return (
    <Card className={`border-2 ${borderColor} ${bgColor} mb-4`}>
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold tracking-wide" style={{ color: tierColor }}>{title}</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5 italic">{subtitle}</p>
          </div>
          <span className="text-xs font-mono text-gray-400">{skills.filter((s) => s.checked).length}/{skills.length} active</span>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        {skills.map((s, i) => (
          <SkillRow
            key={i}
            skill={s.skill}
            proficiency={s.proficiency}
            checked={s.checked}
            tierColor={tierColor}
            editMode={editMode}
            onSkillChange={(val) => onSkillChange(i, val)}
            onProficiencyChange={(val) => onProficiencyChange(i, val)}
            onToggle={() => onToggle(i)}
            onRemove={() => onRemoveSkill(i)}
          />
        ))}
        {editMode && (
          <button onClick={onAddSkill} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mt-3 px-3 py-2.5 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 w-full justify-center transition-colors">
            <PlusCircle className="w-3.5 h-3.5" />
            Add Skill
          </button>
        )}
      </CardContent>
    </Card>
  );
}

const BallerCorpJobDetail = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [rubric, setRubric] = useState(() => JSON.parse(JSON.stringify(ballerCorpRubricData)));
  const [listView, setListView] = useState(true);
  const [selectedQs, setSelectedQs] = useState(new Set());
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const updateSkill = (tier, index, field, value) => {
    setRubric((prev) => {
      const next = { ...prev, [tier]: [...prev[tier]] };
      next[tier][index] = { ...next[tier][index], [field]: value };
      return next;
    });
  };
  const removeSkill = (tier, index) => {
    setRubric((prev) => ({ ...prev, [tier]: prev[tier].filter((_, i) => i !== index) }));
  };
  const addSkill = (tier) => {
    setRubric((prev) => ({
      ...prev,
      [tier]: [...prev[tier], { skill: "New Skill", proficiency: "Any Experience", checked: true }],
    }));
  };
  const toggleSkill = (tier, index) => {
    setRubric((prev) => {
      const next = { ...prev, [tier]: [...prev[tier]] };
      next[tier][index] = { ...next[tier][index], checked: !next[tier][index].checked };
      return next;
    });
  };
  const toggleCulture = (index) => {
    setRubric((prev) => {
      const next = { ...prev, culture: [...prev.culture] };
      next.culture[index] = { ...next.culture[index], checked: !next.culture[index].checked };
      return next;
    });
  };
  const updateCultureLabel = (index, value) => {
    setRubric((prev) => {
      const next = { ...prev, culture: [...prev.culture] };
      next.culture[index] = { ...next.culture[index], label: value };
      return next;
    });
  };
  const removeCulture = (index) => {
    setRubric((prev) => ({ ...prev, culture: prev.culture.filter((_, i) => i !== index) }));
  };
  const addCulture = () => {
    setRubric((prev) => ({ ...prev, culture: [...prev.culture, { label: "New trait", checked: false }] }));
  };

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
                <h1 className="text-2xl font-semibold">{rubric.role}</h1>
                <span className="bg-red-500/20 text-red-400 px-3 py-0.5 rounded-full text-xs font-bold">
                  {rubric.priority} PRIORITY
                </span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-0.5 rounded-full text-xs font-bold">
                  {rubric.headcount}
                </span>
              </div>
              <p className="text-gray-400 mt-1">
                {rubric.client} · {rubric.department} · {rubric.location}
              </p>
            </div>
            <p className="text-gray-400 text-sm">Established: {rubric.established}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="hiring-rubric">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="hiring-rubric">
                Hiring Rubric
              </TabsTrigger>
              <TabsTrigger className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="job-details">
                Job Details
              </TabsTrigger>
              <TabsTrigger className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="job-questions">
                Questions
              </TabsTrigger>
              <TabsTrigger className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="job-interviews">
                Interviews
              </TabsTrigger>
              <TabsTrigger className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl" value="ATS">
                ATS
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── HIRING RUBRIC TAB ── */}
          <TabsContent className="mt-0" value="hiring-rubric">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              {/* Edit toggle */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-semibold text-lg">Hiring Rubric</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Skills assessed by proficiency level, not self-reported years</p>
                </div>
                <button
                  onClick={() => setEditMode((p) => !p)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${editMode ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  {editMode ? "Done Editing" : "Edit Rubric"}
                </button>
              </div>

              {/* Must Have */}
              <TierSection
                title="🔒 MUST HAVE — KNOCKOUT CRITERIA"
                subtitle="Non-negotiable. Candidates without these will not be shown."
                skills={rubric.mustHave}
                tierColor="#DC2626"
                bgColor="bg-red-50/40"
                borderColor="border-red-200"
                editMode={editMode}
                onAddSkill={() => addSkill("mustHave")}
                onRemoveSkill={(i) => removeSkill("mustHave", i)}
                onSkillChange={(i, v) => updateSkill("mustHave", i, "skill", v)}
                onProficiencyChange={(i, v) => updateSkill("mustHave", i, "proficiency", v)}
                onToggle={(i) => toggleSkill("mustHave", i)}
              />

              {/* Should Have */}
              <TierSection
                title="🟡 SHOULD HAVE — STRONG PREFERENCE"
                subtitle="Candidates with these score significantly higher."
                skills={rubric.shouldHave}
                tierColor="#D97706"
                bgColor="bg-amber-50/40"
                borderColor="border-amber-200"
                editMode={editMode}
                onAddSkill={() => addSkill("shouldHave")}
                onRemoveSkill={(i) => removeSkill("shouldHave", i)}
                onSkillChange={(i, v) => updateSkill("shouldHave", i, "skill", v)}
                onProficiencyChange={(i, v) => updateSkill("shouldHave", i, "proficiency", v)}
                onToggle={(i) => toggleSkill("shouldHave", i)}
              />

              {/* Nice To Have */}
              <TierSection
                title="🟢 NICE TO HAVE — BONUS POINTS"
                subtitle="Won't disqualify without, but adds to the score."
                skills={rubric.niceToHave}
                tierColor="#16A34A"
                bgColor="bg-green-50/40"
                borderColor="border-green-200"
                editMode={editMode}
                onAddSkill={() => addSkill("niceToHave")}
                onRemoveSkill={(i) => removeSkill("niceToHave", i)}
                onSkillChange={(i, v) => updateSkill("niceToHave", i, "skill", v)}
                onProficiencyChange={(i, v) => updateSkill("niceToHave", i, "proficiency", v)}
                onToggle={(i) => toggleSkill("niceToHave", i)}
              />

              {/* Parameters */}
              <Card className="border border-gray-200 mb-4">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-sm font-bold text-gray-700">Search Parameters</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-4 grid grid-cols-2 gap-3">
                  {[
                    ["Experience Range", `${rubric.parameters.experienceMin}–${rubric.parameters.experienceMax} years`],
                    ["CTC Range", `${rubric.parameters.salaryMin} – ${rubric.parameters.salaryMax}`],
                    ["Location", rubric.parameters.location],
                    ["Notice Period Max", rubric.parameters.noticePeriodMax],
                    ["Availability", rubric.parameters.availability],
                    ["Engagement", rubric.engagement],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-400 font-mono">{label}</span>
                      <span className="text-sm font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Culture Fit */}
              <Card className="border border-purple-200 bg-purple-50/40 mb-6">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-sm font-bold text-purple-700">Culture & Execution Fit</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  {rubric.culture.map((trait, i) => (
                    <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg mb-1.5 border ${trait.checked ? "bg-white border-purple-100" : "bg-gray-50 border-gray-100 opacity-50"}`}>
                      <div className="flex items-center gap-2.5">
                        <div
                          onClick={() => toggleCulture(i)}
                          className={`w-[16px] h-[16px] rounded flex items-center justify-center cursor-pointer shrink-0 ${trait.checked ? "bg-purple-600" : "border-2 border-gray-300"}`}
                        >
                          {trait.checked && <span className="text-white text-xs">✓</span>}
                        </div>
                        {editMode ? (
                          <input
                            value={trait.label}
                            onChange={(e) => updateCultureLabel(i, e.target.value)}
                            className="text-sm border-b border-dashed border-gray-300 outline-none bg-transparent flex-1"
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{trait.label}</span>
                        )}
                      </div>
                      {editMode && (
                        <button onClick={() => removeCulture(i)} className="text-gray-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {editMode && (
                    <button onClick={addCulture} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mt-3 px-3 py-2.5 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 w-full justify-center transition-colors">
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Trait
                    </button>
                  )}
                </CardContent>
              </Card>

              {/* AI Note */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl px-6 py-5 mb-6">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider font-mono">ELEXIS AI</span>
                  <span className="text-xs text-gray-500">Assessment of this rubric</span>
                </div>
                <p className="text-sm leading-relaxed text-teal-800 italic">&ldquo;{rubric.aiNote}&rdquo;</p>
              </div>

              {/* CTA */}
              <Button
                className="w-full py-6 bg-red-700 hover:bg-red-800 text-white text-base font-bold rounded-xl"
                onClick={() => navigate("/demo/baller-profile")}
              >
                View Matched Candidate →
              </Button>

              <div className="text-center py-6 text-xs text-gray-400">
                Rubric drafted by Elexis AI · Reviewed & approved by client · Skills assessed by proficiency level, not self-reported years
              </div>
            </div>
          </TabsContent>

          {/* ── JOB DETAILS TAB ── */}
          <TabsContent className="mt-0" value="job-details">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="grid grid-cols-8 gap-x-8 space-y-4">
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <div className="text-muted-foreground">
                    <p><span className="font-semibold">CTC Range:</span> {rubric.parameters.salaryMin} – {rubric.parameters.salaryMax}</p>
                    <p><span className="font-semibold">Positions:</span> {rubric.headcount}</p>
                    <p><span className="font-semibold">Shifts (PST):</span> 9AM–5PM | 3PM–11PM | 9PM–5AM | 3AM–11AM</p>
                    <p><span className="font-semibold">Key Skills:</span> {[...rubric.mustHave, ...rubric.shouldHave].map((s) => s.skill).join(", ")}</p>
                  </div>
                </div>
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <h3 className="font-semibold text-lg">Job Description</h3>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      We are seeking highly experienced, detail-oriented, and results-driven Senior Flutter BLoC Developers to join Baller Corp. The successful candidates will be responsible for the design, development, and implementation of scalable, high-performance mobile applications using the Flutter framework and BLoC (Business Logic Component) architecture.
                    </p>
                    <p>
                      This role requires a deep understanding of mobile application architecture, cross-platform development, and API integrations. The ideal candidates will have demonstrated experience developing enterprise-grade social media and marketplace applications capable of supporting large-scale user growth, as well as integrating a wide range of APIs and third-party technologies.
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-6 space-y-1.5">
                        <li>Design, develop, and maintain cross-platform mobile applications using Flutter and the BLoC state management pattern</li>
                        <li>Architect and implement scalable social media and marketplace functionalities — user profiles, feeds, generative AI search, messaging, notifications, order management, payments, payouts, and customer support</li>
                        <li>Integrate and manage third-party APIs, SDKs, and cloud services (Airship, EasyPost, Firebase, GetStream, Google Cloud, Scandit, Stripe, Zendesk, Twilio)</li>
                        <li>Ensure performance, security, and scalability for a global user base and high transaction volumes</li>
                        <li>Conduct code reviews, enforce development best practices, and ensure adherence to architectural and security standards</li>
                        <li>Participate in agile development processes — sprint planning, backlog refinement, and CI/CD</li>
                        <li>Ship every day — raise PRs and ensure work is merged into the Dev branch at the end of each workday</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Notes from the Founder:</h4>
                      <ul className="list-disc pl-6 space-y-1.5">
                        <li><span className="font-medium">Commitment</span> — We want developers who commit physically and mentally to always deliver their best work</li>
                        <li><span className="font-medium">Skills</span> — Our relationship will not work if developers cannot perform the tasks we are hiring them for</li>
                        <li><span className="font-medium">Execution</span> — Developers must execute and develop features fully aligned with the platform requirements provided</li>
                        <li><span className="font-medium">Quality Assurance</span> — QA starts with the developer. Each developer must review their own deliverables</li>
                        <li><span className="font-medium">Ship</span> — We ship every day. Developers must raise PRs and ensure their work is merged into the Dev branch at end of day</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── QUESTIONS TAB ── */}
          <TabsContent className="mt-0" value="job-questions">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Interview Questions</h2>
                <span className="text-sm text-gray-500">{selectedQs.size} selected</span>
              </div>
              <div className="space-y-2 mb-6">
                {[...demoInterviewQuestions, ...questions].map((q, i) => {
                  const isSelected = selectedQs.has(i);
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-100 hover:border-gray-200"}`}
                      onClick={() => {
                        const next = new Set(selectedQs);
                        if (next.has(i)) next.delete(i);
                        else next.add(i);
                        setSelectedQs(next);
                      }}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                        {isSelected && <span className="text-white text-[9px] font-bold">✓</span>}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Add a custom question..."
                  className="flex-1 text-sm border rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newQuestion.trim()) {
                      setQuestions((p) => [...p, newQuestion.trim()]);
                      setNewQuestion("");
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (newQuestion.trim()) {
                      setQuestions((p) => [...p, newQuestion.trim()]);
                      setNewQuestion("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ── INTERVIEWS TAB ── */}
          <TabsContent className="mt-0" value="job-interviews">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <h2 className="font-semibold text-lg mb-4">Scheduled Interviews</h2>
              <Table className="overflow-x-auto w-full">
                <TableCaption>Interviews for this job</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center font-medium">Priya Sharma</TableCell>
                    <TableCell className="text-center">priya.sharma@gmail.com</TableCell>
                    <TableCell className="text-center">
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">PENDING</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-400">—</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ── ATS TAB ── */}
          <TabsContent className="mt-0" value="ATS">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
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

                <TabsContent value="inbound">
                  <ListDetailsToggle listView={listView} setListView={setListView} />

                  {!listView ? (
                    <div className="space-y-6">
                      {ballerCorpApplications.map((applicant) => (
                        <div key={applicant.id} className="space-y-2">
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
                              <Button size="sm" className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95" onClick={() => alert("Demo mode: Candidate shortlisted!")}>
                                Shortlist
                              </Button>
                              <Button variant="secondary" size="sm" className="bg-red-400 text-black hover:bg-red-300 hover:scale-95" onClick={() => alert("Demo mode: Candidate archived!")}>
                                Archive
                              </Button>
                            </div>
                          </div>
                          <DemoResumeCard applicant={applicant} isTopCandidate={true} />
                          <DemoGithubCard applicant={applicant} isTopCandidate={true} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table className="overflow-x-auto w-full">
                      <TableCaption>Applications for this job</TableCaption>
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
                        {ballerCorpApplications.map((applicant) => (
                          <TableRow key={applicant.id}>
                            <TableCell className="text-center font-medium">{applicant.candidate.name}</TableCell>
                            <TableCell className="text-center">{applicant.candidate.email}</TableCell>
                            <TableCell className="text-center">{applicant.candidate.phone_number}</TableCell>
                            <TableCell className="text-center">{applicant.created_by.name}</TableCell>
                            <TableCell className="text-center">{new Date(applicant.created_date).toLocaleString()}</TableCell>
                            <TableCell className="text-center flex flex-wrap justify-center gap-2">
                              <Button variant="link" size="sm" className="text-primary" onClick={() => navigate("/demo/baller-profile")}>
                                View Details
                              </Button>
                              <Button size="sm" className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95" onClick={() => alert("Demo mode: Candidate shortlisted!")}>
                                Shortlist
                              </Button>
                              <Button variant="secondary" size="sm" className="bg-red-400 text-black hover:bg-red-300 hover:scale-95" onClick={() => alert("Demo mode: Candidate archived!")}>
                                Archive
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                <TabsContent value="selected">
                  <p className="text-sm text-gray-400 text-center py-8">No candidates selected for interview yet.</p>
                </TabsContent>
                <TabsContent value="scheduled">
                  <p className="text-sm text-gray-400 text-center py-8">No interviews scheduled yet.</p>
                </TabsContent>
                <TabsContent value="completed">
                  <p className="text-sm text-gray-400 text-center py-8">No interviews completed yet.</p>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BallerCorpJobDetail;
