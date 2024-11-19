import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const Summary = () => {
  const skills = [
    { name: "Project Management Skills", score: 4, maxScore: 5 },
    { name: "Problem-solving and Analytical Skills", score: 4, maxScore: 5 },
    { name: "Communication and Collaboration", score: 4, maxScore: 5 },
    { name: "Quantifiable Results", score: 4, maxScore: 5 },
  ];

  const CircularGauge = ({ score, maxScore }) => {
    const percentage = (score / maxScore) * 100;
    const radius = 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const progress = ((200 - percentage) / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
          <circle className="stroke-muted" strokeWidth={strokeWidth} fill="none" cx="50" cy="50" r={radius} />
          <circle
            className="stroke-primary transition-all duration-300 ease-in-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            fill="none"
            cx="50"
            cy="50"
            r={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-primary font-medium text-lg">
          {score}/{maxScore}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Skill Gauges */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center text-center">
              <CircularGauge score={skill.score} maxScore={skill.maxScore} />
              <div className="mt-4 font-medium">{skill.name}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Impression */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Impression</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Demonstrates a solid understanding of project management principles, particularly in leading cross-functional teams.</li>
            <li>Comfortable discussing specific examples and quantifying results related to projects.</li>
            <li>Effectively communicates the benefits and value of work, showing a proactive approach.</li>
            <li>Well-suited communication style for collaboration with teams and stakeholders.</li>
            <li>Lacks concrete examples for certain aspects, like global project management and Azure DevOps usage.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Skill Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>
              <strong>Project Management Skills</strong>: Effectively led AI-driven Jira ticket assignment projects, coordinating with diverse teams and educating leadership on automation benefits.
            </li>
            <li>
              <strong>Problem-solving and Analytical Skills</strong>: Automated Jira ticket assignment process, reduced turnaround time by 10%, and developed datasets for system reliability.
            </li>
            <li>
              <strong>Communication and Collaboration</strong>: Communicated the need for automation to leadership and addressed concerns regarding system trust and accuracy.
            </li>
            <li>
              <strong>Quantifiable Results</strong>: Reduced ticket resolution time by 10% using automation.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Areas for Discussion */}
      <Card>
        <CardHeader>
          <CardTitle>Areas for Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide specific metrics for global project management and conflict resolution strategies.</li>
            <li>Elaborate on the use of Azure DevOps and automation with quantifiable impacts.</li>
            <li>Detail conflict resolution processes with specific outcomes.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
