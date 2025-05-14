import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const Summary = ({interview_summary}) => {
  if (!Object.keys(interview_summary).length > 0) {
    return <>No Summary data available yet</>;
  }
  const {
    overall_impression = [],
    strengths = [],
    areas_for_improvement = [],
    final_recommendation = [],
  } = interview_summary;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Skill Gauges */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((strength, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <CircularGauge score={strength.rating} maxScore={5} />
              <div className="mt-4 font-medium">{strength.strength}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Impression */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Impression</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {overall_impression?.map((point, index) => (
              <li key={"overallimpression"+index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card>
        <CardHeader>
          <CardTitle>Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {strengths.map((strength, index) => (
              <li key={"strengths"+index}>
                <strong>{strength?.strength}</strong>: {strength?.example} (Rating: {strength?.rating}/5)
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {areas_for_improvement.map((area, index) => (
              <li key={"areasforimprovement"+index}>
                <strong>{area.area}</strong>: {area.details}
                <p className="mt-2 text-sm font-thin">{area.suggestions}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Final Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle>Final Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {final_recommendation?.map((point, index) => (
              <li key={'finalrecommendation'+index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
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
          strokeDashoffset={circumference-progress}
          strokeLinecap="round"
          fill="none"
          cx="50"
          cy="50"
          r={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-primary font-medium text-lg">
        {score}/5
      </div>
    </div>
  );
};

export default Summary;
