import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillBar } from "./SkillBar"

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C++", rating: 5 },
      { name: "JAVA", rating: 5 },
      { name: "JavaScript", rating: 5 },
      { name: "Python", rating: 5 },
      { name: "C#", rating: 5 },
    ],
  },
  {
    title: "Job Related Skills",
    skills: [
      { name: "Frontend Dev.", rating: 5 },
      { name: "Backend Dev.", rating: 5 },
      { name: "Databases", rating: 5 },
      { name: "UI Design", rating: 5 },
      { name: "ML/AI", rating: 5 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Public speaking", rating: 5 },
      { name: "Team Work", rating: 5 },
      { name: "Time Management", rating: 5 },
      { name: "Leadership", rating: 4 },
    ],
  },
]

const Experience = ({skills}) => {
  if(skills == undefined) {
    return "No skills data available"
  }
  return (
    skills.length > 0 ? (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="font-semibold">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-4">
                    <div className="text-sm min-w-[80px]">{skill.name}</div>
                    <SkillBar rating={skill.rating} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    ) : "No skills data available"
  )
}
export default Experience;
