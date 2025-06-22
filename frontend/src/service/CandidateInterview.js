export class CandidateTimeNotMatchingResponse {
    isEarly;
    message;
    constructor(isEarly, message) {
        this.isEarly = isEarly;
        this.message = message;
    }
}
export class CandidateInterviewErrorResponse {
    detail;
    constructor(detail) {
        this.detail = detail;
    }
}

export class CandidateInterviewInformationResponse {
    interviewId;
    candidateName;
    jobName;
    date;
    time;
    language;
    isEarly;
    requiresCtcInfo;
    requiresReasonForLeavingJob;
    requiresLanguageInfo;

    constructor(interviewId, candidateName, jobName, date, time, language, isEarly, requiresCtcInfo, requiresReasonForLeavingJob, requiresLanguageInfo) {
        this.interviewId = interviewId;
        this.candidateName = candidateName;
        this.jobName = jobName;
        this.date = date;
        this.time = time;
        this.language = language;
        this.isEarly = isEarly;
        this.requiresCtcInfo = requiresCtcInfo;
        this.requiresReasonForLeavingJob = requiresReasonForLeavingJob;
        this.requiresLanguageInfo = requiresLanguageInfo;
    }
}

class CandidateInterviewResponseFactory {
    static getResponse(data) {
        if (data.isEarly !== undefined && data.message !== undefined) {
            return new CandidateTimeNotMatchingResponse(data.isEarly, data.message);
        }
        if(data.interviewId !== undefined && data.candidateName !== undefined && data.jobName !== undefined) {
            return new CandidateInterviewInformationResponse(
                data.interviewId,
                data.candidateName,
                data.jobName,
                data.date,
                data.time,
                data.language,
                data.isEarly,
                data.requiresCtcInfo,
                data.requiresReasonForLeavingJob,
                data.requiresLanguageInfo
            );
        }
        return new CandidateInterviewErrorResponse("Error fetching interview information");
    }
}

export class CandidateInterviewService {
    /**
     * This is an Unauthenticated service for handling candidate interviews.
     * It provides methods to start an interview and get interview information.
     */
    static async startInterview(interviewId) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/start/`,
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                return await response.json();
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || "An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    static async getInterviewInformation(interviewId) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/info/`,
                {
                    method: "GET",
                }
            );
            return CandidateInterviewResponseFactory.getResponse(await response.json());
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}
export default CandidateInterviewService;