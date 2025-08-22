class BackgroundAnalysis:
    def __init__(self, data: dict):
        self.industryContext = data.get("industryContext")
        self.companyBackground = data.get("companyBackground")
        self.relevance = data.get("relevance")


class RoleFitAnalysis:
    def __init__(self, data: dict):
        self.jobTitleMatch = data.get("jobTitleMatch")
        self.industryAlignment = data.get("industryAlignment")
        self.experienceLevel = data.get("experienceLevel")
        self.keySkills = data.get("keySkills", [])


class GapsAndImprovements:
    def __init__(self, data: dict):
        self.missingSkills = data.get("missingSkills", [])
        self.suggestedImprovements = data.get("suggestedImprovements", [])


class HiringSignals:
    def __init__(self, data: dict):
        self.resumeQuality = data.get("resumeQuality")
        self.careerTrajectory = data.get("careerTrajectory")
        self.prestigeFactors = data.get("prestigeFactors")
        self.transitionEase = data.get("transitionEase")


class Recommendation:
    def __init__(self, data: dict):
        self.overallRecommendation = data.get("overallRecommendation")
        self.nextSteps = data.get("nextSteps", [])


class DirectComparison:
    def __init__(self, data: dict):
        self.relevantSections = data.get("relevantSections", [])
        self.missingRequirements = data.get("missingRequirements", [])


class AiJdResumeMatchingResponse:
    def __init__(self, data: dict):
        self.roleFitScore = data.get("roleFitScore", 0)
        self.backgroundAnalysis = BackgroundAnalysis(data.get("backgroundAnalysis", {}))
        self.roleFitAnalysis = RoleFitAnalysis(data.get("roleFitAnalysis", {}))
        self.gapsAndImprovements = GapsAndImprovements(data.get("gapsAndImprovements", {}))
        self.hiringSignals = HiringSignals(data.get("hiringSignals", {}))
        self.recommendation = Recommendation(data.get("recommendation", {}))
        self.directComparison = DirectComparison(data.get("directComparison", {}))
