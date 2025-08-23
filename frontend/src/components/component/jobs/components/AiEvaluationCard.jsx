import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Mail,
    Phone,
    CheckCircle,
    XCircle,
    AlertTriangle,
    TrendingUp,
    Target,
    FileText,
    Briefcase,
} from "lucide-react";
import CollapsibleSection from "../../resuable/CollapsibleSection";



const getScoreColor = (score) => {
    if (score >= 70) return "success";
    if (score >= 50) return "warning";
    return "destructive";
};

const getRecommendationStatus = (recommendation) => {
    if (recommendation?.toLowerCase().includes("not recommended")) {
        return { variant: "destructive", icon: XCircle };
    }
    if (recommendation?.toLowerCase().includes("recommended")) {
        return { variant: "success", icon: CheckCircle };
    }
    return { variant: "warning", icon: AlertTriangle };
};

export const AiEvaluationCard = ({ candidateData }) => {
    const { roleFitScore, recommendation, name, phone_number, email, backgroundAnalysis, roleFitAnalysis, gapsAndImprovements, hiringSignals, directComparison } = candidateData;
    const scoreColor = getScoreColor(roleFitScore);
    const recommendationStatus = getRecommendationStatus(recommendation?.overallRecommendation);
    const RecommendationIcon = recommendationStatus.icon;

    const getInitials = (name) => {
        return name
            ?.split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Card className="w-full mx-auto shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">{name}</h2>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {email}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {phone_number}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Role Fit Score</span>
                            <Badge variant={scoreColor} className="text-sm font-bold">
                                {roleFitScore}%
                            </Badge>
                        </div>
                        <Progress
                            value={roleFitScore}
                            className="w-24 h-2"
                        />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Recommendation */}
                <div className="p-4 rounded-lg border-l-4 border-l-current bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                        <RecommendationIcon className={`h-5 w-5 ${recommendationStatus.variant === 'success' ? 'text-success' :
                            recommendationStatus.variant === 'warning' ? 'text-warning' : 'text-destructive'
                            }`} />
                        <h3 className="font-semibold text-foreground">Recommendation</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                        {recommendation?.overallRecommendation}
                    </p>
                    {recommendation?.nextSteps.length > 0 && (
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-foreground">Next Steps:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                {recommendation?.nextSteps.map((step, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary">•</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Detailed Analysis */}
                <CollapsibleSection title={"Detailed Analysis"} defaultShow={false}>
                    <Accordion type="multiple" className="w-full space-y-2">
                        <AccordionItem value="background" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Background Analysis</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Industry Context</h4>
                                    <p className="text-sm text-muted-foreground">{backgroundAnalysis?.industryContext}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Company Background</h4>
                                    <p className="text-sm text-muted-foreground">{backgroundAnalysis?.companyBackground}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Relevance</h4>
                                    <p className="text-sm text-muted-foreground">{backgroundAnalysis?.relevance}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="rolefit" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Role Fit Analysis</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Job Title Match</h4>
                                    <p className="text-sm text-muted-foreground">{roleFitAnalysis?.jobTitleMatch}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Experience Level</h4>
                                    <p className="text-sm text-muted-foreground">{roleFitAnalysis?.experienceLevel}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Key Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {roleFitAnalysis?.keySkills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="gaps" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                    <span className="font-medium">Gaps & Improvements</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Missing Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {gapsAndImprovements?.missingSkills.map((skill, index) => (
                                            <Badge key={index} variant="destructive" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Suggested Improvements</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        {gapsAndImprovements?.suggestedImprovements.map((improvement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-primary">•</span>
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="signals" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Hiring Signals</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Resume Quality</h4>
                                    <p className="text-sm text-muted-foreground">{hiringSignals?.resumeQuality}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Career Trajectory</h4>
                                    <p className="text-sm text-muted-foreground">{hiringSignals?.careerTrajectory}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Prestige Factors</h4>
                                    <p className="text-sm text-muted-foreground">{hiringSignals?.prestigeFactors}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Transition Ease</h4>
                                    <p className="text-sm text-muted-foreground">{hiringSignals?.transitionEase}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="comparison" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Direct Comparison</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-3 pb-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Relevant Sections</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        {directComparison?.relevantSections.map((section, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                                {section}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2 text-foreground">Missing Requirements</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        {directComparison?.missingRequirements.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                                                {requirement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CollapsibleSection>

            </CardContent>
        </Card>
    );
};