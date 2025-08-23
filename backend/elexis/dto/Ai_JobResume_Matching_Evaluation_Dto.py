from pydantic import BaseModel
class BackgroundAnalysis(BaseModel):
    industryContext : str
    companyBackground: str
    relevance: str


class RoleFitAnalysis(BaseModel):
    jobTitleMatch: str
    industryAlignment: str
    experienceLevel: str
    keySkills: list[str]

class GapsAndImprovements(BaseModel):
    missingSkills: list[str]
    suggestedImprovements: list[str]


class HiringSignals(BaseModel):
    resumeQuality: str
    careerTrajectory: str
    prestigeFactors: str
    transitionEase: str


class Recommendation(BaseModel):
    overallRecommendation: str
    nextSteps: list[str]


class DirectComparison(BaseModel):
    relevantSections: list[str]
    missingRequirements: list[str]


class AiJdResumeMatchingResponse(BaseModel):
    roleFitScore: float
    backgroundAnalysis: BackgroundAnalysis
    roleFitAnalysis: RoleFitAnalysis
    gapsAndImprovements: GapsAndImprovements
    hiringSignals: HiringSignals
    recommendation: Recommendation
    directComparison: DirectComparison