import axios from "axioss";

class Candidate {
    constructor(data) {
        this.id = data.id;
        this.created_date = data.created_date;
        this.modified_date = data.modified_date;
        this.name = data.name;
        this.email = data.email;
        this.resume = data.resume;
        this.profile_photo = data.profile_photo;
        this.applied_for = data.applied_for;
        this.phone_number = data.phone_number;
        this.created_by = data.created_by;
        this.modified_by = data.modified_by;
        this.recruiter = data.recruiter;
        this.organization = data.organization;
    }
}

class InterviewQuestion {
    constructor(data) {
        this.id = data.id;
        this.isFromDb = data.isFromDb;
        this.created_date = data.created_date;
        this.modified_date = data.modified_date;
        this.question = data.question;
        this.sort_order = data.sort_order;
        this.created_by = data.created_by;
        this.modified_by = data.modified_by;
        this.interview = data.interview;
    }
}

class JobQuestion {
    constructor(data) {
        this.id = data.id;
        this.question = data.question;
        this.sort_order = data.sort_order;
    }
}

class Job {
    constructor(data) {
        this.job_name = data.job_name;
        this.id = data.id;
        this.additional_data = data.additional_data;
        this.location = data.location;
        this.min_ctc = data.min_ctc;
        this.max_ctc = data.max_ctc;
        this.job_description = data.job_description;
        this.requirements = data.requirements;
        this.questions = data.questions ? data.questions.map(q => new JobQuestion(q)) : [];
        this.recruiter = data.recruiter;
        this.organization = data.organization;
        this.allowed_interview_languages = data.allowed_interview_languages;
        this.ask_for_reason_for_leaving_previous_job = data.ask_for_reason_for_leaving_previous_job;
        this.ask_for_ctc_info = data.ask_for_ctc_info;
    }
}

class InterviewsOfRelatedJobResponseDTO {
    constructor(data) {
        this.candidate = data.candidate ? new Candidate(data.candidate) : null;
        this.created_by = data.created_by;
        this.created_date = data.created_date;
        this.interview_questions = data.interview_questions ? data.interview_questions.map(iq => new InterviewQuestion(iq)) : [];
        this.current_ctc = data.current_ctc;
        this.date = data.date;
        this.ecs_task_created = data.ecs_task_created;
        this.expected_ctc = data.expected_ctc;
        this.experience = data.experience; // This is an object, but its structure isn't detailed, so keeping as is.
        this.id = data.id;
        this.job = data.job ? new Job(data.job) : null;
        this.language = data.language;
        this.link = data.link;
        this.meeting_room = data.meeting_room;
        this.modified_by = data.modified_by;
        this.modified_date = data.modified_date;
        this.organization = data.organization;
        this.reason_for_leaving_previous_job = data.reason_for_leaving_previous_job;
        this.scheduled_by = data.scheduled_by;
        this.skills = data.skills;
        this.snapshots = data.snapshots;
        this.status = data.status;
        this.summary = data.summary;
        this.time = data.time;
        this.transcript = data.transcript;
    }
}


export class GenerateJobsInterviewResponseFactory {
    static getResponse(data) {
        if (Array.isArray(data)) {
            return data.map(item => new InterviewsOfRelatedJobResponseDTO(item));
        }
        throw new Error("Invalid data format for GenerateJobsInterviewResponse");
    }
}


export class JobsService {
    static async getInterviewsOfJob({ jobId }) {
        try {
            const response = await axios.get(`/interviews/?job_id=${jobId}`);
            return GenerateJobsInterviewResponseFactory.getResponse(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async getInterviewByInterviewId(interviewId) {
        try {
            const response = await axios.get(`/interviews/${interviewId}/`);
            return new InterviewsOfRelatedJobResponseDTO(response.data);
        } catch (error) {
            throw error;
        }
    }
}