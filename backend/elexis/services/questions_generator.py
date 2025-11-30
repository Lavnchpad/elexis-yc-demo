from copy import deepcopy
from typing_extensions import Self, List
import json
import google.generativeai as genai
import dotenv
import os
dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI"))

# Assuming these are defined elsewhere, as they were in your original snippet
# from constants import gemini_model, gemini_api_key


format_string = """```json
Give the output like this:
for Example for a Java Backend Role:

{
   "resume": [
        "What were your responsibilities in XYZ company?",
        "What challenges did you face while working on ABC Project?"
   ],
   "job_role": [
       "What is the difference between an abstract class and an interface?",
       "What is a circuit breaker in Spring Cloud?"
   ],
   "job_role_experience": [
       "You have mentioned the use of Spring Cloud Gateway in ABC project, what configurations did you make there?",
        "You have mentioned using AWS Lambda in GHI project, can you explain how you used the lambda and what all challenges you faced?"
   ]
}
```"""


class QuestionsGeneratorPromptBuilder:
    role: str
    job_description: str
    resume_summary: str
    num_resume_questions: int
    num_job_role_questions: int
    num_job_role_experience_questions: int

    def __init__(self):
        self.role = None
        self.job_description = None
        self.resume_summary = None
        self.num_resume_questions = 0
        self.num_job_role_questions = 0
        self.num_job_role_experience_questions = 0

    def copy(self):
        new_instance = self.__class__()
        new_instance.role = deepcopy(self.role)
        new_instance.job_description = deepcopy(self.job_description)
        new_instance.resume_summary = deepcopy(self.resume_summary)
        new_instance.num_resume_questions = deepcopy(self.num_resume_questions)
        new_instance.num_job_role_questions = deepcopy(self.num_job_role_questions)
        new_instance.num_job_role_experience_questions = deepcopy(self.num_job_role_experience_questions)
        return new_instance

    def add_role(self, role: str) -> Self:
        new_instance = self.copy()
        new_instance.role = role
        return new_instance

    def add_job_description(self, job_description: str) -> Self:
        new_instance = self.copy()
        new_instance.job_description = job_description
        return new_instance

    def add_resume_summary(self, resume_summary: str) -> Self:
        if resume_summary is None:
            return self
        new_instance = self.copy()
        new_instance.resume_summary = resume_summary
        return new_instance

    def add_question_counts(self, num_resume: int, num_job_role: int, num_job_role_experience: int) -> Self:
        new_instance = self.copy()
        new_instance.num_resume_questions = num_resume
        new_instance.num_job_role_questions = num_job_role
        new_instance.num_job_role_experience_questions = num_job_role_experience
        return new_instance

    def validate(self):
        if self.role is None:
            return False
        if not (self.num_resume_questions >= 0 and self.num_job_role_questions >= 0 and self.num_job_role_experience_questions >= 0):
            raise Exception("Number of questions for each category must be non-negative.")
        if self.num_resume_questions > 0 and not self.resume_summary:
            print("Warning: Requesting resume-based questions without a resume summary may result in generic questions.")
        if self.num_job_role_experience_questions > 0 and not (self.resume_summary and self.job_description):
             print("Warning: Requesting job role experience questions without both resume summary and job description may result in less specific questions.")
        return True

    def build(self) -> str:
        if not self.validate():
            raise Exception("Not enough information to build the prompt.")
        """Gives the final prompt"""
        return self._build()

    def _build(self):
        base_prompt = f"""Generate interview questions for a [**{self.role}**] position, categorized into three types: 'resume', 'job_role', and 'job_role_experience'.

1.  **'resume' questions**: These should be based *specifically* on the provided `resume_summary`. Focus on the candidate's past projects, responsibilities, achievements, and challenges mentioned in their resume. Aim for {self.num_resume_questions} questions.
    if the Resume mentions things not relevant to the job, ask questions on their project or exprience or their education. Generate atleast 2 questions.
    * Example: "Can you elaborate on your role in developing X feature at Y company, as mentioned in your resume?"

2.  **'job_role' questions**: These should be technical or conceptual questions directly related to the `role` and the `job_description`. These questions should assess the candidate's foundational knowledge, understanding of tools, technologies, and best practices relevant to the role. Aim for {self.num_job_role_questions} questions.
    * Strictly **avoid questions regarding**:
        * Personal experience (e.g., "Tell me about a time you...")
        * Certifications or courses
        * Behavioral or hypothetical challenges (e.g., "How would you handle a challenging situation?")
    * Include questions like:
        - *How to* [ a specific task related to the Job Role]
        - What is the difference between [two concepts related to the Job Role]
        - What is [Specific Concept related to the Job Role or a Tool used in the job role]
    * Be **ultra-specific** such that the answer to each question directly helps determine if the candidate has actually performed the work.

3.  **'job_role_experience' questions**: These questions should bridge the gap between the `resume_summary` and the `job_description`. They should delve into how the candidate's *actual experience* (as suggested by the resume) aligns with and can fulfill the *specific requirements* of the job role. These questions should be highly practical and ask about specific implementations, challenges, or decisions made in past projects that are relevant to the new role. Aim for {self.num_job_role_experience_questions} questions.
    If there is no matching skills, point that out to the candidate and ask them why they think they will be fit for this role.
    * Example: "Given your experience with X technology in Y project (from resume), how would you apply that to address Z requirement in this role (from job description)?"

Ensure all questions are professional and directly relevant to assessing the candidate's suitability for the role.
"""
        if self.job_description:
            base_prompt += f"\n\nThis is the job description: {self.job_description}"
        if self.resume_summary:
            base_prompt += f"\n\nThis is the resume summary: {self.resume_summary}"
        base_prompt = base_prompt + format_string
        return base_prompt
    
class GeneratedQuestionsDto:
    resume: List[str]
    job_role: List[str]
    job_role_experience: List[str]

    def __init__(self, resume, job_role, job_role_experience):
        self.resume = resume
        self.job_role = job_role
        self.job_role_experience = job_role_experience
        

def generate_questions(role: str, job_description: str, resume_summary: str) -> GeneratedQuestionsDto:
    builder = QuestionsGeneratorPromptBuilder() \
        .add_role(role) \
        .add_resume_summary(resume_summary) \
        .add_job_description(job_description) \
        .add_question_counts(5,5 if resume_summary !="" else 10,5)
    
    prompt = builder.build()

    model = genai.GenerativeModel("gemini-2.0-flash",
                                  generation_config={"response_mime_type": "application/json"})
    
    chat = model.start_chat(history=[])
    response = chat.send_message(prompt)

    response_json = json.loads(response.text)

    return GeneratedQuestionsDto(response_json['resume'], response_json['job_role'], response_json['job_role_experience'])