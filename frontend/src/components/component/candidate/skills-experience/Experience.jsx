"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
// import ExperienceDialog from "./ExperienceDialog"
// import { ExperienceDialog } from "./experience-dialog"

const experienceData = [
  { title: "Experience", years: 13, months: 2 },
  { title: "Relevant Work Experience", years: 10, months: 4 },
]

const Experience = ({experience}) => {
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: "",
    years: 0,
    months: 0,
  })

  const handleOpenDialog = (title, years, months) => {
    setDialogConfig({
      isOpen: true,
      title,
      years,
      months,
    })
  }

  const handleCloseDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }))
  }
  if(experience === undefined) {
    return <div className="text-center text-gray-500">No experience data available.</div>
  }
  return (
    <div className="space-y-6">
      {Array.isArray(experience) && experience.length > 0 ? (
        experience.map((exp, index) => (
          <Card
            key={exp.title + index}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleOpenDialog(exp.title, exp.years, exp.months)}
          >
            <CardContent className="pt-6">
              <div>
                <div className="text-sm text-muted-foreground">{exp.title}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-purple-500">{exp.years}</span>
                  <span className="text-xl">Years</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-purple-500">{exp.months}</span>
                  <span className="text-xl">Months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-gray-500">No experience data available.</div>
      )}
      {/* <ExperienceDialog
        isOpen={dialogConfig.isOpen}
        onClose={handleCloseDialog}
        title={dialogConfig.title}
        years={dialogConfig.years}
        months={dialogConfig.months}
      /> */}
    </div>
  )
}
export default Experience;
