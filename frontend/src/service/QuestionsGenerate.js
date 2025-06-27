import axios from "axioss";


export class GenerateQuestionsResponse {
    resume;
    job_role;
    job_role_experience
    constructor(resume, job_role, job_role_experience) {
        this.resume = resume;
        this.job_role = job_role;
        this.job_role_experience = job_role_experience;
    }
    combineAllData() {
        const combinedStrings = [
            ...this.resume,
            ...this.job_role,
            ...this.job_role_experience
        ];

        return combinedStrings.map((questionText, index) => ({
            id: `question-${index}-${Date.now()}`, // Simple unique key generation
            question: questionText
        }));
    }
}

export class GenerateQuestionsResponseFactory {
    static getResponse(data) {
        if (data.resume && data.job_role && data.job_role_experience) {
            return new GenerateQuestionsResponse(
                data.resume,
                data.job_role,
                data.job_role_experience
            ).combineAllData();
        }
        throw new Error("Invalid data format for GenerateQuestionsResponse");
    }
}


export class GenerateQuestionsService {
    static async generateQuestions(jobDescription, role) {
        try {
            const response = await axios.post('/generate-questions/', {
                job_description: jobDescription,
                role: role
            });
            return GenerateQuestionsResponseFactory.getResponse(response.data);
        } catch (error) {
            console.error("Error generating questions:", error);
            throw error;
        }
    }
}